# webpack文件监听原理

在发现源码发生变化时，自动重新构建出新的输出文件。

## 开启监听模式(两种方式)

#### 1. 启动 webpack 命令时，带上 --watch 参数

缺点：每次需要手动刷新浏览器。
```json
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch" // 新增配置
  }
}
```
```s
npm run watch
```
修改文件，保存后，会自动打包，到浏览器刷新，才能看到变化。

原理分析：`轮询`判断文件的**最后编辑时间**是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。
```js
module.export = {
	//默认 false，也就是不不开启
	watch: true,
	//只有开启监听模式时，watchOptions才有意义
	wathcOptions: {
		//默认为空，不监听的文件或者文件夹，支持正则匹配
		ignored: /node_modules/,
		//监听到变化发生后会等300ms再去执行，默认300ms
		aggregateTimeout: 300,
		//判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
		poll: 1000
	}
}
```

#### 2. 热更新: WDS使用HotModuleReplacementPlugin
`热更新: WDS(webpack-dev-server)`：使⽤ `HotModuleReplacementPlugin` 插件，在配置 **webpack.config.js** 中设置 `watch:true`。WDS中间件**webpack-dev-middleware** 调用 webpack 的 api 对文件系统 watch。*具体原理见传送门：[]()*
- 优点1：WDS（webpack-dev-server）**不刷新浏览器**；
- 优点2：WDS 不输出文件，⽽是**放在内存中**；
```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --open" // 新增配置，运行 npm run dev 会自动打开浏览器
  }
}
```
```js
// webpack.config.js
'use strict'
 
const path = require('path');
var webpack = require('webpack');  // 引进 webpack
module.exports = {
    // ...
    mode:'development', // production 改为开发环境，因为只有开发环境才用到热更新
    module:{
        // ...
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot: true
    }
}
```
