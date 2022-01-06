# package.json 详解

https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies

peerDependencies：https://segmentfault.com/a/1190000022435060

版本号：https://github.com/npm/node-semver#versions

https://www.bilibili.com/video/av47853431

## JS 库（组件库）构建工具选择

我们写的组件源代码就是 esm 格式，而做组件打包，一般都会提供 esm 的版本，因此在选择打包工具时，要优先考虑支持输出 esm 的工具。

- Webpack 目前不支持输出 ES module，可能在 Webpack 5 会支持。所以先排除 Webpack。
- Rollup 和 Babel 是可行的两种方案。

Rollup 是目前最流行 JS 库打包工具，React，Vue 之类的开源项目都在使用 Rollup。Rollup 支持输出 CommonJS，UMD，ES Module 在内的主流格式，并可以通过插件支持 CSS 等静态资源的处理。Rollup 和 Webpack 的主要区别就是 Rollup 是以构建 JS 为核心的，并且从一开始就是基于 ES Module 的，如果要兼容 CommonJS 代码，需要引入额外的插件。Webpack 更关注的是所有资源的构建，并且强调 Code Splitting 的能力，专注于 Web 应用的打包。Rollup 更轻量和专注，而且支持 ES Module 的输出，所以在 JS 库打包这个方面 Rollup 是首选。

Babel 其实本身只是一个转译工具。但 Babel 可以通过插件支持 TS 代码的转译，还有 JSX 的转译（老本行），所以如果是简单的 TS 库，可以直接用 Babel 进行转译，输出的就是原汁原味的 ES Module（因为 Babel 压根没有去解析模块，只是单纯的转译代码）。需要注意的是 Babel 的 TS 转译只是转译，不是编译，所以类型错误是不会报出的，需要额外跑 tsc 来对 TS 代码进行类型校验。其他的静态资源也是一样的，需要单独跑 task。

上面两种工具都可以用，但这里不打算讲如何配置，因为现在的趋势就是构建工具链下沉，封装为一个统一的入口。只要跑一个命令就可以构建，并且只需要配置一些简单的必要的参数。底下的工具链升级也只要更新一个入口工具就行，不用花时间去维护整个构建体系。Umijs，Create React App，和 Vue-cli 都是这样的例子。

这里向大家安利一款专注于 JS 库打包的工具：Father。Father 可以简单理解为是 JS 库领域的 CRA 或者 Umi。Father 封装了 Rollup 和 Babel 两套工具链。

在最简单的情况下：我们只需要告诉 Father 需要什么格式的输出就可以构建成功，比如：

```bash
father build --esm --cjs --umd --file bar src/foo.js
```

mono-repo 管理：Lerna
Lerna 是用于管理拥有多个 npm package 的 mono repo 的工具。mono repo 就是指多个项目的源码放在同一个仓库下进行管理。

简单的说，Lerna 的功能就是一键在多个 package 中同时运行一些命令。而且运行的时候还会根据 package 之间的依赖拓扑关系，对命令的启动顺序进行编排。同时 Lerna 的 bootstrap 命令可以把 package 之间相互的依赖，自动 link 到 package 自己的 node_modules 里面。这可以说是最大的一个卖点。Lerna 之前如果要在本地开发多个相互依赖的 npm 包，那就要敲一堆的 npm link，而且还容易出问题。

mono-repo 这种方式本身也是为了提升多个 npm package 的情况下，管理源代码的效率，以及共享基础设施。因此 Lerna 其实是提升了开发者开发基于 mono repo 的前端项目的体验。

前端的组件库一类的项目，用 Lerna 是非常合适的。

## 三种格式

一般来说，写完一个第三方库需要打包出三个文件夹的文件，对应三种不同模块类型

```bash
# outputpath
├── dist  # umd module
├── es    # es module
├── lib   # commonjs module
```

UMD（Universal Module Definition）是 AMD 和 CommonJS 的糅合，跨平台的解决方案
UMD 打包出来的文件可以直接通过 script 插件 html 中使用
我们的代码会被这样一段代码包裹起来

```js
// webpack 会判断不同的环境，并以不同的方式去访问react
(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === "object" && typeof module === "object")
		module.exports = factory(require("react"));
	else if (typeof define === "function" && define.amd)
		define(["react"], factory);
	else if (typeof exports === "object")
		exports["MyLibrary"] = factory(require("react"));
	else root["MyLibrary"] = factory(root["React"]);
});
```

umd 为了支持使用者通过各种不同的模块类型引用，包括通过 script 使用第三方库
commonjs 支持使用者在 commonjs 模块类型下引用，而且可以部分使用第三方库，不会引入整个库
es module 支持使用者在 es module 模块类型下引用, 如果使用者需要对第三方库再打包时，webpack、rollup 都对 es module 有 treeShaking 优化，只打包使用到的方法

## dumi 配置选项

rollup 方式打包和 babel 方式打包

rollup 方式打包：会打包到 dist 目录下；
babel 方式打包：是一种文件到文件的打包方式，cjs 的格式会输出到 lib 目录下，esm 的格式会输出到 es 目录下；

如果在 esm 格式下指定一个 mjs 为 true，则会输出一个 index.mjs 为后缀的文件，类似于 umd 包，会把所有依赖都打进去，因此像 umd 格式包一样，可以直接用。用法就是一些现代浏览器，可以通过 script 标签指定 type 为"module"，浏览器就可以直接加载使用该文件。

umd 格式打包：umd 把所有的文件和依赖都打包成一个文件，通过 script 的方式来引用，需要指定一个 output.name，来指定一个文件露出的名字，比如 foo，然后通过 script 标签引入后，通过 window.foo 使用

如果 target 是 nodejs，那么通常只需要输出 cjs 格式的模块就好了；如果 target 是 browser，那么 cjs 和 esm 格式的模块都需要，为什么也需要输出 cjs 格式的模块呢，因为还要考虑到 SSR 和跑测试的场景（有些测试工具是无法主动识别 esm 的格式的）。

- dist：对应的是 umd 格式的包，分为 foo.js 和 foo.min.js（压缩版）；
- es：对应的是 esm 格式的包，分为 foo.js 和 foo.mjs（类似于 umd，可被高级浏览器直接使用）；
- lib：对应的是 cjs 格式的包，也是把所有的文件都打包在一起 foo.js，通过 exports 去暴露出去，通常是给 nodejs 端使用；通常用于 SSR，或者跑测试时使用；

pkg 中的字段：

- name：需要指定 scope
- version：需要每次更新版本号；
- main：指向 cjs 格式的入口；
- module：指向 esm 格式的入口；构建工具会优先识别 module，以输出 esm 格式，只在没有配置 module 时，才会识别 main 字段输出 cjs。
- unpkg：指向 umd 格式未压缩的版本；
- files[package-json#files](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files)：指定需要打包发布的文件夹。注意这里是要发布的列表，而 .gitignore 中的列表是要忽略 push 到仓库的文件夹列表，二者的意义是不同的。

## 要不要 lock 版本

什么是 lock 版本：比如 yarn 默认提供了 lock 功能。也就是说在通过 yarn 安装了一次依赖之后，如果不执行 yarn upgrade，删除后再重新安装模块的版本不会发生变化。

::: tip lock 与否对应的正确做法

`无论是否使用 lock，package-lock.json 都不应写进 .gitignore。`

1.  如果你**使用** lock 机制，则应该将 package-lock.json 提交到 repo 中。比如 Vue 采取了该策略。
    - 例外是，如果你使用 yarn 并且不打算使用 npm，则可以把 package-lock.json 列入 .gitignore（比如 Babel）；
    - 反之如果你使用 npm 并且不打算使用 yarn，则可以把 yarn.lock 列入 .gitignore （比如 TypeScript）。
2.  如果你**不使用** lock 机制，则应该加入 .npmrc 文件，内容为 package-lock=false ，并提交到 repo 中。比如 ESLint 采取了该策略。
    - 有一些不使用 lock 机制的库，已经使用了 .npmrc ，但也把 package-lock.json 列入了 .gitignore，这是没有必要的。

:::

- [package-lock.json 需要写进 .gitignore 吗？ - 贺师俊的回答 - 知乎](https://www.zhihu.com/question/264560841/answer/286682428)
- [透过 js-beautify@1.7.0 的 Bug 来看，npm 默认的 lock 机制是否重要？ - 知乎](https://www.zhihu.com/question/65536076)
- [为什么我不使用 shrinkwrap（lock）](https://zhuanlan.zhihu.com/p/22934066)

## 参考链接

- [React + Typescript 工程化治理实践](https://zhuanlan.zhihu.com/p/91754525)
- [手摸手，打造属于自己的 React 组件库 03 — 打包篇](https://juejin.cn/post/6844904054351462413)
- [开发 npm 模块实践开发及使用 dumi 的坑记录一下](https://blog.csdn.net/weixin_44070105/article/details/119377295)
- [lerna + dumi + eslint 多包管理实践 - 徐小夕的文章 - 知乎](https://zhuanlan.zhihu.com/p/417555553)

## 引入 lerna

```bash
➜  aurora-comp git:(dev) ✗ lerna init --independent
lerna notice cli v4.0.0
lerna info Updating package.json
lerna info Updating lerna.json
lerna info Creating packages directory
lerna success Initialized Lerna files
```
