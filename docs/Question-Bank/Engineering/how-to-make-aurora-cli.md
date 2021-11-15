# 如何实现 aurora-cli

## 零碎知识点

Semver(语义化版本号)

ensureDir 创建目录
确保目录的存在。如果目录结构不存在,就创建一个。
**同步: **

ensureDirSync()

process.chdir(toDir) 方法变更 Node.js 进程的当前工作目录为 toDir，如果变更目录失败会抛出异常

pathExistsSync

existsSync

就是从那个接力模式到援助模式就长在我们技术领域他也有一个范式转移，就我们把他称呼为较传统外剥到开发到现在外部开发这样一个范式转移。

就是桌面互联网就只有浏览器这样一种超级 app，然后到移动互联网超级 app 更多了。但它相对的数量还是很少的因为它是想让他更适合聚焦在最上层的这个入口上。

现在的前沿已经不是 react、vue 了，是相对稳定的领域了，现在的前沿是 meta framework，即元框架，框架的框架（nextjs、gasby）

统一工程方案——案例：春节活动，4 个项目都是用同一个脚手架搭建的，但传统脚手架其实只提供了创建的能力，之后随着项目的发展，每个项目都不一样了，这时再想将同一个活动需求加进去，就不容易
之前春节活动的方法是 copy 一份春节活动代码的过渡板，然后在每个项目里再进行修改。。。。

脚手架是「一用即抛」

是「优雅降级」而不是「渐进增强」的

MWA (Modern Web App)

不要全局安装 Jupiter 生成器（@jupiter/create），用 npx 按需运行，可以始终运行最新版：npx @jupiter/create proj-name

传统脚手架通常提供整个项目级别的生成器，基于模板，一用即抛，生成完项目之后就没有用处了，对后续的业务迭代没有帮助。
而微生成器（micro-generator）不是只在最初创建项目的时候使用，而是伴随项目后续迭代过程的工具箱。也可以支持业务项目添加自己业务专用的微生成器。

使用指令 cp 将当前目录 test/ 下的所有文件复制到新目录 newtest 下，输入如下命令：

\$ cp –r test/ newtest

TS 还不支持 Pipeline Operator 语法

SSG（Static Site Generation）

BFF（Backends for Frontends）

面向对象编程(OOP) 、 函数式编程(FP)

components/ 里的『视图组件』，都是目录形式（比如 Avatar/index.jsx），而 containers/ 里的『容器组件』，都是单文件形式（比如 contacts.jsx），这是我们推荐的一种最佳实践

在启用 SSR 的情况下，useEffect 在服务器端的执行过程中是无效的

ts 里面别名设置的话，需要在 tsconfig.json 里面设置下 paths
