# 前端工程化部署deploy

> 本文记录了ESOP-FED 项目工程化部署方案，分别涉及 线上部署流程，nginx原理，cdn原理，CI/CD配置...

----
## 一、前端项目工程化部署流程

1. 提交代码，push 到 git 远程仓库；
2. 触发 gitlab-ci 的 runners，构建.gitlab-ci.yml中配置的 job；
3. .gitlab-ci.yml中配置的job，大致会做：从仓库拉取项目代码到nginx服务器，运行 npm run build，运行 npm run cdn；
4. 使用nginx作为静态服务器，代理静态服务，将前端构建好的静态资源dist文件包，都托管到指定服务目录，通过listen配置好的端口（默认80），即可访问静态服务；
5. npm run build 会把构建好的代码输出到dist目录中，放到nginx静态资源服务器的指定目录里。为了优化，将大部分的静态资源托管到第三方cdn平台上，而在nginx服务器上只托管dist下的index.html入口文件就好了；
6. npm run cdn 把静态资源（除入口文件外所有的 js，css，img，font等等）上传到 cdn。每次上传都会在项目根目录下生成静态资源清单文件（static.config.json），以输出比较本次构建与之前构建的静态资源文件列表日志；
7. 通过浏览器，访问网站前端域名，网站通过index.html入口文件的script标签记录的链接，加载app.xxx.js（同步模块代码）、vendor.xxx.js（依赖包代码）、manifest.xxx.js（异步模块清单），当路由切换时动态获取异步模块；

## 二、CI/CD相关知识
CI/CD系统：持续集成和持续部署是微服务架构下的必要组成部分， `Jenkins`、Github 默认支持的 `Travis` 以及 `GitLab CI` 都是常用的 CI 工具。
CI/CD持续集成和持续部署 就是指测试和发布环节，如果能够做到自动化，那么就可以大大加快开发迭代的速度。

### GitLab CI 相关术语

- `Pipeline`：流水线。一次 Pipeline 其实相当于一次构建任务。任何提交或者 MR 的合并都可以触发 Pipeline；
```
+------------------+           +----------------+
|                  |  trigger  |                |
|   Commit / MR    +---------->+    Pipeline    |
|                  |           |                |
+------------------+           +----------------+
```
- `Stage`：构建阶段。一次 Pipeline 中可以定义多个 Stages，所有 Stages 会按照顺序运行，只有当所有 Stages 完成后，该构建任务 (Pipeline) 才会成功，任何一个 Stage 失败，那么后面的 Stages 不会执行，该构建任务 (Pipeline) 失败；
```
+--------------------------------------------------------+
|  Pipeline                                              |
|                                                        |
|  +-----------+     +------------+      +------------+  |
|  |  Stage 1  |---->|   Stage 2  |----->|   Stage 3  |  |
|  +-----------+     +------------+      +------------+  |
|                                                        |
+--------------------------------------------------------+
```
- `Jobs`，构建工作。是最小的任务单元，每个job只负责一件事情，要么编译，要么测试等。可以在 Stages 里面定义多个 Jobs，一个Stage中的 Jobs 会并行执行，一个Stage中的 Jobs 都执行成功时，该 Stage 才会成功，任何一个 Job 失败，那么该 Stage 失败，即该构建任务 (Pipeline) 失败；
```
+------------------------------------------+
|  Stage 1                                 |
|                                          |
|  +---------+  +---------+  +---------+   |
|  |  Job 1  |  |  Job 2  |  |  Job 3  |   |
|  +---------+  +---------+  +---------+   |
|                                          |
+------------------------------------------+
```
- `GitLab Runner`，是实际处理 Job 的，每个 Runner 可以单独配置，Runner 支持多种类型的 Job，同一时间单个 runner 只能处理一个 Job；
- `GitLab Multi Runner`，是一个 GitLab 的开源项目，用来统一管理 Runner；
- `Executor`，每个 Runner 都需要指定一个 Executor，来决定 runner 最终使用哪个执行器进行处理。

### CI/CD流程
一个典型的 Pipeline，一共有 5 个阶段，Build，Test，Release， Staging， Production，每个阶段里都至少有一个 Job，Test 中有两个 Job。

GitLab 会从左往右依次把任务给到 Runner 处理，如果中途有一个任务没有处理成功的话，整个 Pipeline 就会退出。这就是持续集成（CI）、持续发布（CD） 的一个流程。

### 如何使用 GitLab CI
- Gitlab-CI 是GitLab Continuous Integration（`Gitlab持续集成`）的简称。从Gitlab的8.0版本开始，gitlab就全面集成了Gitlab-CI,并且对所有项目默认开启。只要在项目仓库的根目录添加.`gitlab-ci.yml文件`，并且配置了Runner（运行器），那么每一次合并请求（MR）或者push都会触发CI pipeline。
- GitLab 中提供了两种 `Runner` 的类型，`特定的 Specific Runner（只能供部分项目使用）`，`共享的 Shared Runner（所有 GitLab 中的项目都可以使用）`；
- 比如注册一个 Specific Runner：
  - 第一步安装 GitLab Mutli Runner，直接采用二进制安装即可。
  ```
  # For Debian/Ubuntu
  sudo apt-get install gitlab-ci-multi-runner

  # For CentOS
  sudo yum install gitlab-ci-multi-runner
  ```
  - 第二步注册Runner，`输入 Gitlab 地址、项目token、runner名称、runner描述、选择执行器类型（shell, docker, docker-ssh, ssh...）等`。注册好了，由于 Multi Runner 支持动态加载配置，所以 Runner 就立即生效了。
  ```
  $sudo gitlab-ci-multi-runner register
  Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/ci )
  http://gitlab.###.io/ci
  Please enter the gitlab-ci token for this runner
  ########################
  Please enter the gitlab-ci description for this runner
  my-runner
  INFO[0034] fcf5c619 Registering runner... succeeded
  Please enter the executor: shell, docker, docker-ssh, ssh?
  shell
  INFO[0037] Runner registered successfully. Feel free to start it, but if it's
  running already the config should be automatically reloaded!
  ```
  - 最后，在项目根目录中添加 .gitlab-ci.yml 文件（此文件就是定义了Pipeline的执行方式），具体配置[gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/README.html)。gitlab-ci.yml文件配置的script，使用基本的shell脚本命令，[linux Shell教程](https://www.runoob.com/linux/linux-shell.html)。gitlab-ci.yml文件中的变量，如 $CI_PROJECT_ID，$CI_COMMIT_SHA，$CI_COMMIT_REF_NAME 等变量为 GitLab CI 变量，可以在 CI 流程中直接使用这些变量，具体参考 [GitLab CI Variables](https://docs.gitlab.com/ce/ci/variables/)。

### 为什么不是 GitLab CI 来运行那些构建任务？
- 构建任务都会占用很多的系统资源 (譬如编译代码)，而 GitLab CI 又是 GitLab 的一部分，如果由 GitLab CI 来运行构建任务的话，在执行构建任务的时候，GitLab 的性能会大幅下降。
- GitLab CI 最大的作用是`管理各个项目的构建状态`，因此，运行构建任务这种浪费资源的事情就交给 GitLab Runner 去做。Gitlab-runner 是.gitlab-ci.yml脚本的运行器，Gitlab-runner是基于Gitlab-CI的API进行构建的`相互隔离的机器（或虚拟机）`。
- GitLab Runner 不需要和Gitlab安装在同一台机器上，考虑到GitLab Runner的资源消耗问题和安全问题，GitLab Runner应该安装到不同的机器上。

### 具体到我们的项目：
- 我们的项目选用的runner执行器是 shell，比较简单，如果选择 docker的话，需要额外指定镜像。
- 目前我们主要共享172.30.xx.xx这台广州机房的测试机，其上面部署了tag为"fed-shell-ci-cd"的runnner。
- 目前位于GZ_GZJF_xxxx上的测试服务（fed-shell-ci-cd）和gz_gzjf_xxxx 的线上发布服务（ci-fed-publish）的runner均已注册为Shared Runner，默认对所有项目启用生效。所以不再需要特地关联启用Specific Runner。

## 三、CDN相关知识

### 什么是 CDN？
CDN（Content Delivery Network）即内容分发网络。其目的是通过在现有的 Internet 中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。可以简单理解成：`CDN 就是一个能让用户以最快速度访问到相应资源的网盘。`

### 使用CDN平台
- SPA框架常用webpack来进行打包，最无脑的操作是 将打包后的dist文件整体扔到服务器上，但是用户在访问网站时，从哪个服务器拉取资源非常慢，且还要考做后端缓存。
- 更科学的方式是`将dist打包文件做“动静分离”`：借助CDN加速，并且云平台的CDN还自带前端缓存，非常方便。很多平台都有云服务提供，如腾讯云、阿里云...在云平台的控制台开启“对象存储”服务后，开启对应的“加速域名”，此时，针对这个存储桶，就开启了 CDN 加速。“加速域名”就是 CDN 域名。执行npm run build后，打包后的项目文件都放在了/dist/文件下。可以配置webpack，将/dist/static/文件夹直接上传到云平台的对应存储桶的根目录下即可。
- 具体上传cdn的方式，可以查看项目中的cdn.js文件。通过nodejs的rsync工具，同步文件到CDN上，每次上传都会在项目根目录下生成静态资源清单文件（static.config.json），以输出比较本次构建与之前构建的静态资源文件列表日志。
```js
// webpack打包输出的
output: {
    path: outputPath, // dist目录
    publicPath: publicPath // 浏览器引用的资源文件公共path路径，即 CDN加速路径
},
```

## 四、Nginx静态资源相关知识

在前后端分离端项目里，前端的代码会被打包成为纯静态文件。使用 Nginx的目的就是`让静态文件运行起服务`，由于后端的接口也是分离的，直接请求可能会产生跨域问题，此时就需要Nginx转发代理后端接口。
- 将前端代码打包后的dist文件放入指定服务目录
- 将服务目录指定到spa-project/dist目录下即可代理静态服务
- 配置里开启了gzip压缩，可以很大程度上减小文件体积大小
- 将404错误页面重定向到index.html，可以解决前端history路由模式由于刷新页面访问不到服务出现404的问题
- location为代理接口，可以转发代理后端的请求接口域名或者ip，即可解决接口跨域问题
```s
// 示例
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/

user nginx;
worker_processes auto; #启动进程
error_log /var/log/nginx/error.log; #全局错误日志
pid /run/nginx.pid; #PID文件

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024; #单个后台worker process进程的最大并发链接数 
}

http {
    gzip on; #开启gzip压缩
    gzip_min_length 1k; #设置对数据启用压缩的最少字节数
    gzip_buffers    4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6; #设置数据的压缩等级,等级为1-9，压缩比从小到大
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml; #设置需要压缩的数据格式
    gzip_vary on;

    #虚拟主机配置
    server {
        listen       80;
        server_name  mark.binlive.cn;
        root /home/spa-project/dist; #定义服务器的默认网站根目录位置
        index index.html; #定义index页面
        error_page    404         /index.html; #将404错误页面重定向到index.html可以解决history模式访问不到页面问题
        location ^~ /api/{
            proxy_pass http://127.0.0.1:7000;
            proxy_send_timeout 1800;
            proxy_read_timeout 1800;
            proxy_connect_timeout 1800;
            client_max_body_size 2048m;
            proxy_http_version 1.1;  
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "Upgrade"; 
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
        }
        location ^~ /auth/{
            proxy_pass http://127.0.0.1:7000;
            proxy_send_timeout 1800;
            proxy_read_timeout 1800;
            proxy_connect_timeout 1800;
            client_max_body_size 2048m;
            proxy_http_version 1.1;  
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "Upgrade"; 
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
        }
    }    
}
```
```
nginx -h // 查看Nginx的帮助
nginx -v // 查看Nginx的版本
nginx -t // 测试Nginx的配置
nginx -T // 测试Nginx的配置，并打印配置信息
nginx // 启动nginx
nginx -s reload // 重新加载配置文件，平滑启动nginx
nginx -s stop // 停止nginx的命令
ps -ef |grep nginx // 查看nginx进程
```


## 参考文章

[GitLab-CI 从安装到差点放弃](https://segmentfault.com/a/1190000007180257)

[用 GitLab CI 进行持续集成](https://segmentfault.com/a/1190000006120164)

[当谈到 GitLab CI 的时候，我们该聊些什么（上篇）](https://xiaozhuanlan.com/topic/3529176084)

[CDN使用心得：加速双刃剑](https://www.cnblogs.com/geyouneihan/p/9741021.html)

[Node.js 实现静态文件增量上传CDN](https://juejin.im/post/5d0c4021f265da1ba431f4d4)

[Nginx部署前后端分离服务以及配置说明](https://juejin.im/post/5b04d775f265da0b807117b1)

[手把手搭建nginx服务器，部署前端代码](https://segmentfault.com/a/1190000017940311?utm_source=tag-newest)


