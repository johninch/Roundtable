# 文件指纹chunkhash 与 持久化缓存caching

## 文件指纹chunkhash
文件指纹：打包后输出的文件名的后缀。

### 指纹类别
- `Hash`：和整个项目的构建相关，build-specific，即每次编译都不同。
    - **可以在测试环境打包的JS文件中使用**`'[name].[hash]'`。
- `Chunkhash`：和 Webpack 打包的 chunk 有关，chunk-specific，是根据每个 chunk 的内容计算出的 hash，不同的 entry 会生出不同的 chunkhash。
    - **适用于生产环境打包后的JS文件**`'[name].[chunkhash]'`，最大限度利用浏览器缓存。
- `Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。

::: danger [chunkhash]不能和 HMR 一起使用
注意：开发环境应该直接用`[name]`，不要在开发环境使用`[chunkhash]、[hash]、[contenthash]`，因为**不需要在开发环境**做**持久缓存**，而且这样会增加编译时间。

这也是为什么常说”**[chunkhash]不能和 HMR 一起使用**“。
:::

::: tip 占位符指定长度
注意：hash都是比较长的，可以在占位符上指定我们要的长度，来生成我们想要的位数，如：`[hash:8]、[chunkhash:8]、[contenthash:8]`。
:::
### 各类别适用文件

- **JS文件**的指纹设置`[chunkhash]`；
    - 设置 output 的 filename。
```js
output: {
    filename: '[name][chunkhash:8].js',
    path: __dirname + '/dist'
}
```
- **CSS文件**的指纹设置`[contenthash]`；
    - 设置 MiniCssExtractPlugin 的 filename。
```js
// MiniCssExtractPlugin：将css资源提取到一个独立的文件
plugins: [
    new MiniCssExtractPlugin({
        filename: `[name][contenthash:8].css`
    }),
]
```
- **Images/Fonts**的指纹设置`[hash]`；
    - **注意：图片，字体文件的hash和css/js资源的hash概念不一样，图片，字体文件的hash是由内容决定的。**
    - 设置 file-loader 的 name。
```js
module: {
    rules: [
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name][hash:8].[ext] '
                }
            }]
        }
    ]
}
```

## 持久化缓存caching（注意id问题）

- 本质上就是通过指定：`output.filename: '[name].[chunkhash].js'`，因为`[chunkhash]`是内容相关的，只要内容发生了改变，构建后文件名的 hash 就会发生改变。
- 再配合代码分割：将vendor.js单独打包。因为它们是不太可能频繁发生改变的，所以无需多次加载这些模块。
- 最后注意模块id变化问题：
    - 默认情况下，异步模块id是计数器递增的，但这样有问题，如果在中间增加了新模块，那么之后所有模块的 ID 都会被改变，但其实它们的内容没变。
    - 可以使用 `HashedModuleIdsPlugin` 插件来改变模块 ID 的计算方式。这个插件用模块路径的哈希值代替了基于计数器的 ID：
```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
};
```
编译输出：
```
[3IRH] ./index.js 29 kB {1} [built]
[DuR2] (webpack)/buildin/global.js 488 bytes {2} [built]
[JkW7] (webpack)/buildin/module.js 495 bytes {2} [built]
[LbCc] ./webPlayer.js 24 kB {1} [built]
[lebJ] ./comments.js 58 kB {0} [built]
[02Tr] ./ads.js 74 kB {1} [built]
    + 1 hidden module
```

#### 如何将文件名发送到浏览器

可以使用 `HtmlWebpackPlugin` 或者 `WebpackManifestPlugin`：
- `HtmlWebpackPlugin`：是一个简单但扩展性不强的插件。在编译期间，它会生成一个 HTML 文件，文件包含了所有已经被编译的资源。
```html
<!-- index.html -->
<!doctype html>
<!-- ... -->
<script src="bundle.8e0d62a03.js"></script>
```
- `WebpackManifestPlugin`：是一个扩展性更佳的插件。在打包时，它会生成一个 JSON 文件，里面包含了原文件名和带哈希文件名的映射。在服务端，通过这个 JSON 就能方便的找到我们真正要执行的文件。
```json
// manifest.json
{
  "bundle.js": "bundle.8e0d62a03.js"
}
```

## 参考链接

- [【译】Google - 使用 webpack 进行 web 性能优化（二）：利用好持久化缓存](https://juejin.im/post/5b9b0fdfe51d450e7210892d#heading-16)
- [官网](https://doc.webpack-china.org/concepts)
