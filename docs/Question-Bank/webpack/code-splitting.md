# Code Spliting

## 什么是 code splitting

代码分割（code splitting）是指将项目代码构建打包（bundling）后根据指定规则分割成多个 bundles（输出文件），这些模块文件可以被按需动态加载或者并行加载。最要用来优化代码加载时的资源大小、以及优先级。正确使用代码分割，可以优化提升资源加载效率。
通过 webpack，一般可以从以下三个方面去配置代码分割：

- 入口文件方式：通过手动指定 webpack 打包入口文件（entry），可以配置多个入口文件，打包不同的代码，然后根据业务需求，实现代码块的加载。
- 动态引入 lazy-load：通过使用例如 es6 的[ import() ](http://webpack.js.org/api/module-methods/#import-1)、[require.ensure](https://webpack.js.org/api/module-methods#requireensure)、[AMD](https://webpack.js.org/api/module-methods#amd)等方法来指定代码进行构建分割
- webpack 自动分割：通过[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)来配置代码构建的自动分割。

## 基本的分割方式

### 防止重复(prevent duplication)

`CommonsChunkPlugin` 已废弃。
[SplitChunksPlugin](https://www.webpackjs.com/plugins/commons-chunk-plugin/) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
无需安装，简单配置如下，详细配置看文档：

```json
{
  "output": {
    // ...
  },
  "optimization": {
    "splitChunks": {
      "chunks": "all"
    }
  }
}
```

### 动态导入

先移除配置中都`optimization.splitChunks`

```javascript
// config/webpack.common.js
{
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '../dist/',
        path: path.resolve(__dirname, '../dist')
     },
}
配置好了，试试吧：
function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash')
        .then(_ => {
            const element = document.createElement('div');
            element.innerHTML = _.join(['Hello', 'Webpack', ' ']);
            return element;
        })
        .catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
});
```

注意上面的注释`/* webpackChunkName: "lodash" */`和前面的配置`chunkFilename: '[name].bundle.js',`, 这里实现了动态导入，语意很明确，我们打包的时候会将 lodash 单独写入一个名为`lodash.chunk.js`的 chunk 文件。

### 懒加载

使用上面的动态加载，我们还可以通过触发了某个事件或交互来加载模块。
注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。

#### 各种框架实现懒加载

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Lazy Load in Vue using Webpack's code splitting](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/)
- AngularJS: [AngularJS + Webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)

### 预加载

[详细类容](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)

> webpack 4.6.0+ adds support for prefetching and preloading.

**LoginButton.js**

```javascript
//...
import(/* webpackPrefetch: true */ "LoginModal");
```

This will result in `<link rel="prefetch" href="login-modal-chunk.js">` being appended in the head of the page, which will instruct the browser to prefetch in **idle time** the `login-modal-chunk.js` file.

> webpack will add the prefetch hint once the parent chunk has been loaded.

Preload directive has a bunch of differences compared to prefetch:

<details>
    <summary>预加载的块会和父块并行下载。预取的块会等父块加载完成后。</summary>
    A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finishes loading.
</details>
<details>
    <summary>预加载的块拥有中等优先级，会立刻下载。预取块会等浏览器空闲时下载。</summary>
    A preloaded chunk has medium priority and is instantly downloaded. A prefetched chunk is downloaded while the browser is idle.
</details>
<details>
    <summary>父块应该立即请求预加载的块。预取的块可以在将来的任何时候使用。</summary>
    A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
</details>

- Browser support is different.

**ChartComponent.js**

```javascript
//...
import(/* webpackPreload: true */ "ChartingLibrary");
```

When a page which uses the ChartComponent is requested, the charting-library-chunk is also requested via `<link rel="preload">`. Assuming the page-chunk is smaller and finishes faster, the page will be displayed with a LoadingIndicator, until the already requested charting-library-chunk finishes. This will give a little load time boost since it only needs one round-trip instead of two. Especially in high-latency environments.

> Using webpackPreload incorrectly can actually hurt performance, so be careful when using it.

上面介绍了代码分割的各种方式，适当的分割可以提高加载效率，下面我们来看一下何时需要分割？如何分割？

## 考虑什么情况下开始使用代码分割

- 大项目、代码量庞大
- 代码首屏利用率低
- 持久化缓存，分割不经常变动的第三方库

## 优势与劣势

合理并且正确的使用代码分割，可以极大的提升代码庞大项目的资源加载效率：

- 实现按需加载，提高页面代码使用率
- 大文件分割成多个小文件，并行加载，提高低网速下的资源加载效率
- 有利用于构建出更适合持久化缓存的打包文件

但是，如果使用不当，也会带来方向负面影响：

- 过多的并行加载，挤占 http 线程，影响速度
- 影响代码复用，同样的代码块被重复构建进不同的分割后的文件中
- 非必要的分割，影响代码逻辑更快执行（小文件无需分割、首屏加载即会用到的代码无需分割）
- 分割后的文件由于重复代码块过大，导致分割后的文件体积庞大，拖慢加载效率

## code splitting 应该是基于路由还是基于组件？

在 SPA 项目中，我们一般都会基于路由组织不同的功能模块代码。所以，但我们考虑对现有代码进行代码分割时，首先要考虑的是基于路由来做代码分割。
但是这样存在一些弊端：

- 代码分割灵活性差，基于路由，也会受限于路由。网站的路由设计会极大影响代码分割。
- 代码块复用性差：不同路由页面中用到的相通的代码块会被重复打包进各个路由 bundle 中
- 某些复杂页面，bundle 后尺寸依然巨大

在 react 项目中，页面都是有大大小小各种组件组合而来。所以基于组件的代码分割，会带来更灵活以及精确的代码分割策略。
同时，由于路由渲染也是渲染到组件，所以基于组件去做代码分割，也同样适用于基于路由的代码按需加载实现。
基于组件的代码分割，可以让我们更精确、灵活的去控制要 split 的代码。
当然，除了以上两种思路，代码分割其实可以有其他的灵活配置方式，例如根据环境变量、根据服务器配置等。

## 优化代码分割与动态加载

- 利用 prefetch、preload 特性提前加载代码
- 避免对已经很小的文件作继续分割
- 考虑将公共代码单独分割
- 避免单次加载产生过多的小文件
