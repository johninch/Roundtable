# 如何优化 Webpack 的构建速度

## 分包构建

在项目打包构建中，会通过`CommonsChunkPlugin`或`SplitChunksPlugin`将第三方库依赖打包进vendor.js中，但是，**不经常更新的第三方库**（如vue，vue-router，axios）统统都打包进vendor.js，会造成包文件体积过大。不但**影响首页加载速度**，还**影响打包构建的速度**。其实，`不经常更新的第三方库，是不需要经常打包更新的`。

有两种方案可以从vendor.js中将不太变动的库依赖单独处理：
### 1、extenals外部扩展（CDN）
`extenals(外部扩展)`，通过**CDN外部引用**的方法，引入第三方库：
```html
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
```
```js
module.exports = {
   externals: {
     jquery: 'jQuery'
   }
};
```
```js
import $ from 'jquery';
$('.my-element').animate(...);
```
webpack打包时，发现jquery定义在`externals`，则不会打包jquery代码，从而减少打包时间，提升构建速度。

不过`externals`虽然解决了外部引用问题，但是无法解决以下问题：
```js
import xxx from 'react/src/xx';
```
webpack遇到此问题时，会重新打包react代码。

### 2、DLLPlugin && DllReferencePlugin

DLL：通过前置**不经常更新的第三方库依赖包**的构建，来提高真正的build和rebuild构建效率。也就是说只要第三方库没有变化，之后的每次build都**只需要去打包自己的业务代码**，解决Externals多次引用问题。

*Dll这个概念是借鉴了Windows系统的dll，一个dll包，就是一个纯纯的依赖库，它本身不能运行，是用来给你的app引用的。*

webpack通过`webpack.DllPlugin`与`webpack.DllReferencePlugin`两个内嵌插件实现此功能。
- `DllPlugin` 进行分包，生成两个文件（bundlejs、bundle.mainifest.json）；
- `DllReferencePlugin` 对 `bundle.manifest.json` 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

#### 1. 新建 webpack.dll.config.js
```js
// webpack.dll.config.js
const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            'react',
            'react-dom',
            //其他库
            ],
    },
    output: {
        path: './build',
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: './build/bundle.manifest.json',
            name: '[name]_library',
        })
    ]
};
```
webpack.DllPlugin选项：
- path：manifest.json文件的输出路径，这个文件会用于后续的业务代码打包；
- name：dll暴露的对象名，要跟output.library保持一致；
- context：解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。

生成两个文件，一个是打包好的bundlejs，另外一个是bundle.mainifest.json。

#### 2. 配置 webpack.config.js
```js
// webpack.config.js
const webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    main: './main.js',
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        include: path.join(__dirname, '.')
      }
    ]
  },
  plugins: [
     new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("./build/bundle.manifest.json"),
        }),
  ]
};
```
webpack.DllReferencePlugin的选项：
- context：需要跟之前保持一致，这个用来指导webpack匹配manifest.json中库的路径；
- manifest：用来引入刚才输出的manifest.json文件。

参考链接：
- [webpack dllPlugin 使用](http://www.chenchunyong.com/2017/01/10/webpack-dllPlugin-%E4%BD%BF%E7%94%A8/)
- [Webpack 打包太慢? 试试 Dllplugin](https://segmentfault.com/a/1190000012925212)


## 摇树优化 Tree shaking

`Tree shaking`，即 在打包过程中检测工程中**没有被引用过的模块**并进行标记，**在资源压缩时将它们从最终的bundle中去掉**（`只对ES6 Modlue生效`）：
- 开发中尽可能**使用ES6 Module的模块**，提高tree shaking效率。
- **禁用 babel-loader 的模块依赖解析**，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking。
- **去除无用 CSS 代码**，使用 PurifyCSS(不在维护) 或者 uncss。 
    - 建议将 purgecss-webpack-plugin 和 mini-css-extract-plugin配合使用。

## 作用域提升 Scope hoisting

正常来说 webpack 的引入都是把各个模块分开，通过`__webpack_require__`导入导出模块，但是使用 scope hoisting 后会**把需要导入的文件直接`移入导入者顶部`**，这就是所谓的 hoisting。

*注：在导入过程中，webpack 会适当的重命名一些变量以防止变量名冲突。*

#### Scope hoisting的收益
- 代码量明显减少：因为函数声明语句会产生大量代码，但模块合并后减少了函数声明语句。
- 减少了内存开销：因为代码在运行时因为创建的函数作用域减少了。
- 运行速度提升：因为不用多次使用`__webpack_require__`调用模块。

#### Scope hoisting的条件
- **必须使用ES6的语法**。因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的ES6模块化语法。如果不行，webpack会降级处理这些非ES6编写的代码，不使用 Scope Hoisting 优化。
- **如何开启**：Scope Hoisting 是 webpack 内置的功能，只要配置 `ModuleConcatenationPlugin插件` 即可，如下在 webpack.config.js 代码如下配置：
```js
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
```

::: warning 开启就一定打包在一起吗
即使开启了 scope hoisting，webpack 也不会一股脑地把所有东西都堆砌到一个模块。举个例子，在使用 `非 ES6 模块`或`使用异步 import() `时，不会应用作用域提升，模块依然会拆分开。
:::

参考链接：
- [webpack 的 scope hoisting 是什么？](https://segmentfault.com/a/1190000018220850)
- [深入浅出的webpack4构建工具---Scope Hoisting(十六)](https://www.cnblogs.com/tugenhua0707/p/9735894.html)


## 压缩代码
- 多进程并行压缩：
    - `webpack-paralle-uglify-plugin`：多进程执行代码压缩，提升构建速度。
    - `uglifyjs-webpack-plugin`：压缩JS，开启 parallel 参数 (不支持ES6)。
    - `terser-webpack-plugin`：压缩JS，开启 parallel 参数 (支持ES6)。
- 压缩CSS：
    - `mini-css-extract-plugin`：分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)。通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。


## 利用缓存提升二次构建速度

- **babel-loader** 开启缓存`（cacheDirectory：true）`：
    - 缓存 loader 的执行结果，默认的缓存目录 node_modules/.cache/babel-loader；
    - 之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。
- **terser-webpack-plugin**：`开启缓存（cache：true`）：
    - 缓存目录的默认路径：node_modules/.cache/terser-webpack-plugin。
- cache-loader 或 **hard-source-webpack-plugin**：引入插件开启缓存`new HardSourceWebpackPlugin()`：
    - 为模块提供中间缓存步骤，存在node_modules/.cache/hard-source下，能明显提升构建的速度。

参考链接：[webpack之利用缓存提高二次构建速度](https://segmentfault.com/a/1190000021008089)

## 多进程/多实例构建

HappyPack(不维护了)、thread-loader

略

## 动态Polyfill
- 建议采用 polyfill-service 只给用户返回需要的polyfill，社区维护。 
- (部分国内奇葩浏览器UA可能无法识别，但可以降级返回所需全部polyfill)

