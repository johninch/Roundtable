# Node.js 从零开发 web server博客项目 前端晋升全栈工程师必备

Nodejs 一个js运行环境

运行在服务器，作为web server

运行在本地，作为打包、构建工具


### 困惑

Nodejs运行在服务端，不在浏览器

前端和服务端套路不同

做什么？
- nodejs入门到实战，开发个人博客系统

哪些部分？
- API、数据存储、登录、日志、安全

技术？
- http、stream、session、mysql、redis、nginx、pm2...


原生实现：
- API和数据存储
- 登录和redis
- 安全和日志

使用框架：
- express
- koa2
- 中间件和插件
- 中间件原理

线上环境：
- pm2介绍和配置
- pm2多进程模型
- 服务端运维

### 课程准备

- nodejs和js的区别
- 服务端特点，服务端和前端的区别
- 博客项目的需求分析和技术方案设计


#### 下载安装

使用nvm：brew install nvm

#### nodejs和js的区别

- ES只是一种语法规范，定义了语法。写js和nodejs都必须遵守的，包括变量定义，循环，判断，函数，原型原型链，作用域和闭包，异步。
- 但ES不能操作DOM，不能监听click事件，不能发送ajax请求；不能处理http请求，不能操作文件。

- 而JS是使用了ES的语法规范，外加 Web API，二者缺一不可，相互结合才可完成浏览器端的所有操作。
- JS = ES + Web API
- Web API：DOM操作，BOM操作，事件绑定，Ajax等。。

- 而nodejs是使用了ES的语法规范，外加 nodejs API，二者缺一不可，相互结合才可完成服务器端的所有操作。
- nodejs = ES + nodejs API
- nodejs API：处理http，处理文件等。。


#### commonjs模块化

#### nodejs debugger（vscode）


#### server开发和前端开发的区别

- 服务稳定性
    - server端可能会遭受各种恶意攻击和误操作
    - 单个客户端可以以外挂掉，但是服务端不能
    - 解决：使用pm2做进程守候

- 考虑内存和CPU（优化，扩展）
    - 客户端独占一个浏览器，内存和CPU都不是问题
    - server端要承载很多请求，CPU和内存都是稀缺资源
    - 解决：使用stream写日志（节省CPU和内存），使用redis存session

- 日志记录
    - 前端也会参与写日志，但只是日志的发起方，不关系后续
    - server端要记录日志、存储日志、分析日志，前端不关心
    - 解决：多种日志记录方式，及如何分析日志

- 安全
    - server端随时准备接收各种恶意攻击，前端则少很多
    - 如 越权操作，数据库攻击等
    - 解决：讲解登录验证，预防xss攻击和sql注入

- 集群和服务拆分
    - 产品发展速度快，流量可能会迅速增加
    - 如何通过扩展机器和服务拆分来承载大流量
    - 解决：


### 目标

- 开发一个博客系统，具有博客的基本功能
- 值开发server端，不关心前端

- 需求
    - 首页
    - 作者主页
    - 博客详情页
- 登录页
- 管理中心
    - 新建页
    - 编辑页



#### 开发接口（不用任何框架）

nodejs处理http请求

搭建开发环境

开发接口（暂时不连接数据库，暂不考虑登录）


#### 搭建开发环境

使用nodemon监测文件变化，自动重启node

拆分成4层：
- 1. bin/wwww.js：执行server的设置，createServer，port，listen
- 2. app.js：只是应用基本设置的聚集地，设置返回类型，获取path，解析query，处理路由，处理404，涉及不到业务代码
- 3. src/router：只处理路由，匹配相关路由返回数据格式
- 4. src/controller：只关心数据，筛选处理


接口开发（假数据）


### 数据存储（连数据库）

Q：为何用mysql而不是mogondb？
- mysql是且业内最常用的存储工具，一般都有专人运维
- mysql也是社区内最常用的存储工具
- web server中最流行的关系型数据库

#### 操作数据库
- 建库
    - 创建
    - show Databases
- 建表
    - 常用类型
        - int
        - bigint
        - varchar
        - longtext
- 表操作
    - sql实现增删改查
    ```sql
    select version(); -- 查询版本

    use myblog; -- 使用某个库

    show tables; -- 显示所有表

    insert into users (username, `password`, realname) values ('zhangsan','123','张三'); -- 减减 用来注释
    insert into users (username, `password`, realname) values ('lisi','123','李四'); -- password是sql保留字段，需要反斜杠包裹

    select * from users; -- 实际使用中，要避免全量查找
    select id, username from users;

    select * from users where username='zhangsan' and password='123'; -- 取交集
    select * from users where username='zhangsan' or password='123'; -- 取并集
    select * from users where username like '%zhang%'; -- 模糊匹配
    select * from users where password like '%1%';
    select * from users where password like '%1%' order by id; -- 升序排序
    select * from users where password like '%1%' order by id desc; -- 降序排序

    SET SQL_SAFE_UPDATES=0; -- 设置是否可安全更新，否则更新和删除操作不能成功执行

    update users set realname='李四2' where username='lisi';

    delete from users where username='lisi'; -- 实际工作中不直接使用delete删除
    update users set state='0' where username='lisi'; -- 软删除，通过增加一个state列，1代表可用，0代表不可用，设置为0即为删除

    select * from users where state <> 0 -- <>表示不等于
    ```

#### nodejs操作mysql

