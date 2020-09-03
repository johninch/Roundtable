# 6、自定义loader

> 本节开始，不属于全栈课程，全栈课程中的webpack部分因为课时原因，遗漏了很多内容，所以综合dell老师的webpack4课程，做一些补充。

[具体参考官网 loaders API](https://www.webpackjs.com/api/loaders/)

## loader编写

```js
// /src/index.js
console.log('Inch and Amy')
```

- loader，必须是`声明式函数`，不能是箭头函数，因为loader会对this做些变更，如果使用箭头函数，this指向就有问题，就没法调用本来this的方法了。
- 接收一个参数，即源代码source
- 变更之后，再把源代码`return`出去
```js
// /loaders/replaceLoader.js
module.exports = function(source) {
    // loader，必须是声明式函数，不能是箭头函数，因为loader会对this做些变更，如果使用箭头函数，this指向就有问题，就没法调用本来this的方法了。
    // 接收一个参数，即源代码source
    // 变更之后，再把源代码return出去

    return source.replace('Amy', 'xiao ke ai')
}
```

## loader使用

配置文件中，直接按照路径方式，use本地自定义的loader：
```js
// webpack.config.js
    module: {
        rules: [{
            test: /\.js/,
            use: [path.resolve(__dirname, './loaders/replaceLoader.js')]
        }]
    }
```

使用npx webpack打包后输出：可以看到“Amy”被替换为了“xiao ke ai”：
```js
// dist/bundle.js

(function(modules){ // webpackBootstrap
// ...
})
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('inch and xiao ke ai')\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```

### 传递options
```js
rules: [{
    test: /\.js/,
    use: [{
        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        options: {
            name: 'Amy酱'
        }
    }]
}]
```
loader中通过this.query属性，拿到options参数：
```js
module.exports = function(source) {
    console.log(this.query) // { name: 'Amy酱' }

    return source.replace('Amy', 'xiao ke ai')
}
```

### 如何return额外内容
`this.callback`
```
一个可以同步或者异步调用的可以返回多个结果的函数。预期的参数是：

this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
第一个参数必须是 Error 或者 null
第二个参数是一个 string 或者 Buffer。
可选的：第三个参数必须是一个可以被这个模块解析的 source map。
可选的：第四个选项，会被 webpack 忽略，可以是任何东西（例如一些元数据）。
```
return只能返回经过处理的源代码，如果要返回额外的内容，比如sourceMap等，就要使用this.callback来传递：
```js
module.exports = function(source) {
    console.log(this.query) // { name: 'Amy酱' }

    const result = source.replace('Amy', this.query.name)

    this.callback(null, result)
}
```

### 如何处理异步操作

使用 `this.async` api：
```js
module.exports = function(source) {
    const callback = this.async() // 这里返回callback依然接收同样的参数

    setTimeout(() => {
        const result = source.replace('Amy', this.query.name)
        callback(null, result)
    }, 1000)
}
```

### 使用多个loader

```js
// replaceLoaderAsync.js
module.exports = function(source) {
    const callback = this.async() // 这里返回callback依然接收同样的参数

    setTimeout(() => {
        const result = source.replace('Amy', '随便叫个啥')
        callback(null, result)
    }, 1000)
}
```

```js
// replaceLoader.js
module.exports = function(source) {
    console.log(this.query) // { name: 'Amy酱' }

    return source.replace('Inch', this.query.name)
}
```

顺序是从下往上：
```js
rules: [{
    test: /\.js/,
    use: [{
        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        options: {
            name: 'Amy酱'
        }
    },
    path.resolve(__dirname, './loaders/replaceLoaderAsync.js')]
}]
```
所以最终输出应该是：
```js
eval("console.log('Amy酱 and 随便叫个啥')\n\n//# sourceURL=webpack:///./src/index.js?");
```

### 优化loader的使用方式

默认情况下，查找loader只会去node_modules中去找，可以通过 resolveLoader 参数指定查找范围，在 node_modules找不到后，去我们自定义的loaders文件夹中加载loader：
```js
module.exports = {
    mode: 'development', // 为了打包后的bundle更易读
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders'] // 定义loader查找范围
    },
    module: {
        rules: [{
            test: /\.js/,
            use: [
                {
                    loader: 'replaceLoader',
                    options: {
                        name: 'Amy酱'
                    }
                },
                'replaceLoaderAsync'
            ]
        }]
    }
}
```

## 自定义loader场景距离

异常捕获
```js
try { function() {} } catch (err) {}

```


国际化
```js
if () {
    source.replace('{{title}}', "中文标题")
} else {
    // 
}

```





