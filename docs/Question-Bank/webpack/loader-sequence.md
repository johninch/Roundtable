# loader执行顺序

loader具有**职责单一**，**组合使用**的原则，所以loader处理的顺序很重要。

::: tip 以「样式loader」为例
- `sass-loader`：把sass编译成css。
- `css-loader`：让webpack能识别处理css，转化成 CommonJS 模块。
- `style-loader`：把css识别处理后转成的js字符串，生成为 style节点，插入到 html中。
:::

- 1、默认情况下，会按照配置文件中的书写顺序**从下往上**处理；
```js
module: {
    rules: [
      {
        test: /\.less$/,
        use: 'style-loader'
      },
     {
        test: /\.less$/,
        use: 'css-loader'
      },
     {
        test: /\.less$/,
        use: 'less-loader'
      }
    ]
}
```

- 2、但在实际工程中，配置文件上百行是常事，为保证各个loader按照预想方式工作：可以使用 `enforce` **强制执行 loader 的作用顺序**：
    - `pre` 代表在所有正常 loader 之前执行；
    - `post` 是所有 loader 之后执行；
    - `inline` 官方不推荐使用。
```js
module: {
    rules: [
      {
        test: /\.less$/,
        use: 'less-loader',
        enforce: 'pre'
      },
     {
        test: /\.less$/,
        use: 'css-loader'
      },
     {
        test: /\.less$/,
        use: 'style-loader',
        enforce: 'post'
      }
    ]
}
```


