# webpack常用配置技巧

## 省略文件后缀及配置别名

> 如果项目中某些模块所属目录路径特别深(../../../../compoennts/User)，如何使用webpack配置优化？

使用 `extensions` 与 `alias`：
```js
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common.js'),
    }
  },
};
```

## 模块注入全局变量

> 如何无需导入模块即可全局使用jQuery的$ ？

使用 `ProvidePlugin` 配置全局注入：
```js
module.exports = {
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}
```


