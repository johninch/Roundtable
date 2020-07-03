# webpack基础

## 什么是webapck
Webpack是一个现代Javascript应用的模块打包器 (module bundler)，能够将任何资源如 JavaScript 文件、CSS 文件、图片等打包成一个或少数文件。这是最核心的功能。
- 这意味着与以往的发起多个 HTTP 请求来获得资源相比，现在只需要发起少量的 HTTP 请求。
- 它采用`tool+plugins`的结构。tool提供基础能力，即文件依赖管理和资源加载管理；在此基础上通过一系列的plugins来丰富打包工具的功能。
- 在webpack里，所有的文件都是模块。但是`webpack只认识js模块`，所以要通过一些loader把css、图片等文件转化成webpack认识的模块。


## webpack的工作步骤
1. 从入口文件开始递归地建立一个依赖关系图。
2. 把所有文件都转化成模块函数。
3. 根据依赖关系，按照配置文件把模块函数分组打包成若干个bundle。
4. 通过script标签把打包的bundle注入到html中，通过manifest文件来管理bundle文件的运行和加载。

### 打包的规则
- 一个入口文件对应一个bundle，该bundle包括入口文件模块和其依赖的模块。（`app.js`：团队编写的源码入口文件）
- 第三方依赖模块bundle集合。（`vendor.js`：源码依赖的第三方vendor代码）
- 按需加载的模块或需单独加载的模块则分开打包成其他的bundle。（`n.js`：按数字索引的团队源码拆分部分）
- runtime解析和加载模块所用的指引数据模块bundle。（`manifest.js`，有些项目也直接命名为`runtime.js`：这个manifest文件是*最先加载的，runtime通过其记录的模块标识符，处理和加载其他bundle文件，使其按要求进行加载和执行。*）。

```html
<!-- 加载顺序： -->
<!-- index.html -->
<script src="./runtime.79f17c27b335abc7aaf4.js"></script>
<script src="./vendor.26886caf15818fa82dfa.js"></script>
<script src="./main.00bab6fd3100008a42b0.js"></script>
```

::: tip Manifest
`Manifest`：webpack manifest文件**用来引导所有模块的交互**。manifest文件包含了加载和处理模块的逻辑。当webpack编译器处理和映射应用代码时，它把模块的详细的信息都记录到了manifest文件中。当模块被打包并运输到浏览器上时，`runtime`就会根据`manifest`文件来处理和加载模块。利用manifest就知道从哪里去获取模块代码。
:::

### webpackBootstrap
webpack打包后的文件，只含一个**立即执行函数（IIFE）**，称它为 **webpackBootstrap(模块函数)**，它仅接收一个未加载的 模块集合（modules）对象。指引文件`manifest.js`记录了各个模块的`webpackBootstrap`。

webpackBootstrap模块函数主要做了两件事：
1. 定义一个模块加载函数 `__webpack_require__`：无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 webpack_require 方法，此方法指向模块标识符(module identifier)。通过使用 `manifest` 中的数据，`runtime` 将能够查询模块标识符，检索出背后对应的模块。
2. 使用加载函数加载入口模块 `"./src/index.js"`。

::: details
```js
// webpackBootstrap
(function(modules){

  // 缓存 __webpack_require__ 函数加载过的模块
  var installedModules = {};

  /**
   * Webpack 加载函数，用来加载 webpack 定义的模块
   * @param {String} moduleId 模块 ID，一般为模块的源码路径，如 "./src/index.js"
   * @returns {Object} exports 导出对象
   */
  function __webpack_require__(moduleId) {
    // ...
  }

  // 在 __webpack_require__ 函数对象上挂载一些变量及函数 ...

  // 传入表达式的值为 "./src/index.js"
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})(/* modules */);
```
:::

## Webpack构建流程

Webpack构建流程是一个`串行`的过程：
- **初始化参数**：从配置文件和 Shell 语句中`读取与合并参数`，得出最终的参数；
- **实例化编译器**：用上一步得到的参数`初始化 Compiler 对象`，加载所有配置的`插件Plugin`，执行对象的 `run` 方法开始`执行编译`；
- **确定入口**：根据配置中的 `entry` 找出所有的`入口文件`；
- **编译模块**：从入口文件出发，调用所有配置的 `Loader对模块进行翻译`，再找出该模块依赖的模块，再`递归本步骤直到所有入口依赖的文件都经过了本步骤的处理`；`得到`每个模块被翻译后的`最终内容以及它们之间的依赖关系`；
- **输出资源**：根据入口和模块之间的依赖关系，`组装成一个个包含多个模块的 Chunk`，再把每个 Chunk 转换成`一个单独的文件加入到输出列表`，这步是可以修改输出内容的最后机会；
- **输出完成**：在确定好输出内容后，`根据配置确定输出的路径和文件名，把文件内容写入到文件系统`；

在以上过程中，Webpack 会在特定的时间点`广播出`特定的事件，插件Plugin 在监听到感兴趣的事件后会`执行特定的逻辑`，并且 插件Plugin 可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

::: tip 简单说
1. `初始化`：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
2. `编译`：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. `输出`：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中。
:::

## bundle、chunk、module
- `module` 在开发中的所有的资源(.js、.css、.png)都是module，是webpack打包前的概念。
- `chunk` 是webpack在进行模块的依赖分析的时候，代码分割出来的代码块。一个 chunk 可能包含若干 module。
- `bundle` 最终输出到用户端的chunk，被称之为bundle；一般一个chunk对应一个bundle，只有在配置了sourcemap时，才会出现一个chunk对应多个bundle的情况。

## entry、output、path、publicPath
- `entry`：入口文件是webpack建立依赖图的起点，有3种方式配置：**字符串、数组、对象**。
- `output`：output配置告诉webpack怎么处理打包的代码。
    - `path`：所有输出文件的目标路径，即打包后文件在硬盘中的存储位置（**dist文件夹**）。
    - `publicPath`：输出“解析文件的目录”，指定资源文件引用的目录，打包后浏览器访问服务时url 中的通用部分：
        - publicPath对于打包路径不会有任何影响，如果不设置，则有可能会导致静态资源，如图片找不到的情况。
        - publicPath的指，就是dist目录之后的路径。
            - path为'_dirname/dist/assets'，则publicPath为: '/assets/'。
            - path为'_dirname/dist'，则publicPath为: './'，也就是当前路径下。

## Loader和Plugin的区别

- `Loader` 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。
    - 因为 Webpack 只认识 JavaScript，所以 `Loader` 就成了翻译官，对其他类型的资源进行转译的预处理工作。
    - `Loader` 在 **module.rules** 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 **test(类型文件)**、**loader**、**options(参数)** 等属性。
- `Plugin` 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
    - `Plugin` 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。
```js
module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
    ]
},
devtool: config.build.productionSourceMap ? config.build.devtool : false,
output: {
    path: outputPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: publicPath
},
plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true // Use multi-process parallel running to improve the build speed.
    }),
]
```


#### Webpack常用loader和plugin：
- `sass-loader`, 把sass编译成css。
- `css-loader`, 让webpack能识别处理css，转化成 CommonJS 模块。
- `style-loader`, 把css识别处理后转成的js字符串，生成为 style节点，插入到 html中。
- `file-loader`，加载文件，webpack 以文件格式发出所需对象并返回文件的公共URL
- `babel-loader`，解析es6 成AST，生成新的AST再生成es5

- `define-plugin`，定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- `html-webpack-plugin`，自动生成新的html文件
- `clean-webpack-plugin`，构建项目时清空dist目录
- `webpack-dev-server`，起开发server，支持实时加载代码
- `uglifyjs-webpack-plugin`，代码压缩
- `CommonsChunkPlugin`，抽取相同代码形成单独的模块
- `HashedModuleIdsPlugin`，用hash代替id命名
- `LoaderOptionsPlugin`，代码迁移



## 如何提高webpack开发效率

- `webpack-merge`：提取公共配置，减少重复配置代码。
- `speed-measure-webpack-plugin`：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
- webpack-dashboard：可以更友好的展示相关打包信息。
- size-plugin：监控资源体积变化，尽早发现问题。
- `HotModuleReplacementPlugin`：模块热替换。

## 如何对bundle体积进行监控和分析

- VSCode 中有一个`插件 Import Cost` 可以帮助我们对引入模块的大小进行实时监测。
- 还可以使用 `webpack-bundle-analyzer` 生成 bundle 的模块组成图，显示所占体积。
- 另外，对打包速度分析用：`speed-measure-webpack-plugin` 插件

## 简述编写loader思路
略

## 简述编写plugin思路
略

## 参考链接

- [「吐血整理」再来一打Webpack面试题](https://juejin.im/post/5e6f4b4e6fb9a07cd443d4a5)
- [Webpack 是怎样运行的?](https://segmentfault.com/a/1190000019117897)



