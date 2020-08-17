# 编写一个webpack插件

- [writing-a-plugin](https://webpack.docschina.org/contribute/writing-a-plugin/)
- [compiler-hooks](https://webpack.docschina.org/api/compiler-hooks/)
- [🔥Webpack 插件开发如此简单！](https://juejin.im/post/6844904070868631560)

## 上手：生成版权信息文件 CopyrightWebpackPlugin

插件编写，实际上是事件驱动，或者说发布订阅设计模式。下面实现一个生成版权文件的插件：
```js
// plugins/copyright-webpack-plugin
class CopyrightWebpackPlugin {
    constructor(options) {
        console.log('插件被使用了', options)
    }

    apply(compiler) {
        // compiler.hooks，常用如下：
            // compile: SyncHook同步的，一个新的编译(compilation)创建之后，钩入(hook into) compiler
            // compilation: SyncHook同步的， 编译(compilation)创建之后，执行插件
            // emit: AsyncSeriesHook异步的， 生成资源到 output 目录之前
            // done: SyncHook同步的， 编译(compilation)完成
        // 同步hook用tap，异步hook用tapAsync
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
            console.log('compile是同步hook')
        })
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // debugger;
            // compiler 存放了所有配置和打包的内容
            // compilation 只存放当前这次打包相关的内容
            // compilation.assets 存放了所有打包生成的内容
            compilation.assets['copyright.txt'] = {
                source: () => {
                    return 'copyright by John Inch'
                },
                size: () => {
                    return 21; // source return 的字符长度
                }
            }
            cb() // 使用tapAsync异步方式，必须触发下回调
        })
    }
}

module.exports = CopyrightWebpackPlugin;
```

```js
// webpack.config.js
const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    plugins: [
        new CopyRightWebpackPlugin({
            name: 'Inch'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```

```json
// pkg.json
{
  "name": "create-a-plugin",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  },
  "dependencies": {},
  "description": ""
}
```


## 巩固：生成骨架屏插件

- [webpack自定义插件](https://zxljack.com/2019/03/webpack-plugin/)

骨架屏为了尽快展现，要求快速和简单，所以骨架屏多数使用静态的图片。而且把图片编译成 base64 编码格式可以节省网络请求，使得骨架屏更快展现，更加有效。

骨架屏的实现方案
目前生成骨架屏的技术方案大概有三种：

- 1、使用图片，svg 或者手动编写骨架屏代码： 使用 HTML + CSS 的方式可以很快的完成骨架屏效果， 但是面对视觉设计的改变及需求的更迭， 对骨架屏的跟进修改会非常被动， 这种机械化重复劳作的方式就显得机动性不足；
- 2、通过预渲染手动书写的代码生成相应的骨架屏： 该方案做的比较成熟的是 vue-skeleton-webpack-plugin ， 通过vueSSR 结合 webpack 在构建时渲染写好的vue 骨架屏组件， 将预渲染生成的Dom 节点和相关样式插入到最终输出的 HTML 中；
（该方案与vue 技术直接关联， 在当今前端架构三分天下的环境下，不是一个很灵活，可控的方案）
- 3、饿了么内部的生成骨架页面工具： 该方案通过一个webpack 插件 page-skeleton-webpack-plugin 的方式与项目开发无缝集成， 属于自动生成骨架屏方面做得非常完善的一种。并且可以启动UI界面专门调整骨架屏， 但是在面对复杂的页面也会有不尽人意的地方，他生成的骨架屏节点是基于页面本身的结构和css, 存在嵌套比较深的情况， 体积不会太小， 并且只支持history 模式。



监听html-webpack-plugin-before-html-processing事件，在事件的回调函数中，插件会传入当前待处理的 HTML 内容供我们进一步修改。

我们知道骨架屏组件最终的渲染结果包含 HTML 和样式两部分，样式部分可以直接插入 head 标签內，而 HTML 需要插入挂载点中。插件使用者可以通过参数设置这个挂载点位置，默认将使用<div id="app">。




