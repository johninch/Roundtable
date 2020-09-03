# 2、webpack高级用法

## 目标

从零开始，逐步搭建项目框架，落地工程化思想
- 技术选型：
    - 项目是什么端的，移动还是PC
    - 项目是MPA还是SPA
    - html 是用原生的还是模板引擎
    - 图片：jpg、jpeg、webp，第三方字体 svg。。。
    - css 原生的还是预处理器
    - js ES6+，是否要用ts
    - 本地开发服务（数据模拟）
    - 框架 React Vue
    - 是多人项目还是单人项目，需不需要指定语法规范
    - 是否要加单元测试
    - 是否要加提交规范
    - ...
    以上的问题通过构建工具帮助我们解决

css-loader依赖于postcss，postcss会处理css成ast抽象语法树

如何把这个ast转换成相应的css，就需要借助postcss 的插件机制


## 处理css

在pkg中，其实有一个浏览器类型，叫Browserslist，是告诉项目要兼容哪些浏览器的。使用postcss时，它有一个自己的配置文件，通过require插件autoprefixer的方式，设置overrideBrowserslist来覆盖pkg的浏览器支持选项。具体参数意义见代码：
```js
//webpack.config.js
{
  test: /\.less$/,
  use: ["style-loader", "css-loader", "postcss-loader", "less-loader"] // loader有顺序，从右到左，从下到上
},

//postcss.config.js
module.exports = {
    plugins: [
        require("autoprefixer") ({
            overrideBrowserslist: ["last 2 versions", ">1%"] // "last 2 versions"兼容到浏览器最新两个版本，">1%"代表，只要是浏览器全球市场占有率大于1%的都要做兼容
        })
    ]
}
```
*另外提一句，常用的postcss插件还有 postcss-plugin-px2rem，做移动端响应式的。*

最终效果，比如css3中的display: flex，使用`autoprefixer`之后，就能自动增加前缀：
```html
<style>html body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: red;
}
</style>
```

## 处理图片

`file-loader`专门处理加载静态文件，比如 .txt .md .png .jpg .word .pdf等等等等。。。。不需要对文件进行加工，只需要将其挪到dist目录中。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                // file-loader .txt .md .png .jpg .word .pdf
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash:6].[ext]",
                        outputPath: "images/" // 输出路径
                    }
                }
            }
        ]
    }
}
```

`url-loader`是file-loader的加强版。url-loader内部使用了file-loader，所以可以处理file-loader所有的事情。它强在有配置项`limit`，遇到图片格式的模块，会把该图⽚转换成base64格式字符串，并打包到js⾥，从而减少http请求。

这对于`⼩体积的图片⽐较合适`，**⼤图⽚转换成base64之后，字符很长，打到bundle.js里还是会极大增加代码体积，不合适。**

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash:6].[ext]",
                        outputPath: "images/", // 输出路径
                        // ⼩于1024，才转换成base64
                        limit: 1024
                    }
                }
            }
        ]
    }
}
```

## 处理第三方字体
```css
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("webfont.woff2") format("woff2");
}

body {
    display: flex;
    font-family: "webfont" !important;
    font-size: 24px;
    color: black;
    background-color: red;
}
```
```js
//webpack.config.js
{
  test: /\.(eot|ttf|woff|woff2|svg)$/,
  use: "file-loader"
}
```


## 增加插件
```bash
npm i html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin -D
```


## 多页面应用配置

index、list、detail：通过webapck，打包出3个html，每个html对应加载相应的bundle文件
- index.html 加载main.js
- list.html 加载list.js
- detail.html 加载detail.js

通过配置多个 new HtmlWebpackPlugin()，使用chunks数组选项，指定引入的bundle（这里设置不了顺序，引入的先后顺序是依据entry中的key来引入的）。
业界通用的配置其实是通过遍历来生成的。

```js
module.exports = {
    entry: {
        main: "./src/index.js",
        list: "./src/list.js",
        detail: "./src/detail.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "index.html",
          chunks: ["main"],
        }),
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "list.html",
          chunks: ["list"],
        }),
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "detail.html",
          chunks: ["detail", "list"], // 指定引入的bundle，这里设置不了顺序，引入的先后顺序是依据entry中的key来引入的
        }),
    ],
}
```

## 扩展：MPA多页面打包通用方案

动态生成entry，以及HtmlWebpackPlugin

全局通配路径
```bash
npm install glob -D
```
```js
const setMPA = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  //   console.log(entryFiles);
  //   [
  //     "/Users/kele/Desktop/webpack17/webpack-17-2/src/detail/index.js",
  //     "/Users/kele/Desktop/webpack17/webpack-17-2/src/home/index.js",
  //     "/Users/kele/Desktop/webpack17/webpack-17-2/src/list/index.js",
  //   ];
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    // console.log(pageName);
    entry[pageName] = entryFile;
    htmlwebpackplugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });
  // ....
  return {
    entry,
    htmlwebpackplugins,
  };
};

const { entry, htmlwebpackplugins } = setMPA();

module.exports = {
    entry,
      //   entry: {
      //     main: "./src/index.js",
      //     list: "./src/list.js",
      //     detail: "./src/detail.js",
      //   },
    plugins: [
        ...htmlwebpackplugins,
        // new htmlWebpackPlugin({
        //   template: "./src/index.html",
        //   filename: "index.html",
        //   chunks: ["main"],
        // }),
        // new htmlWebpackPlugin({
        //   template: "./src/index.html",
        //   filename: "list.html",
        //   chunks: ["list"],
        // }),
        // new htmlWebpackPlugin({
        //   template: "./src/index.html",
        //   filename: "detail.html",
        //   chunks: ["detail", "list"],
        // }),
    ],
};
```


## sourceMap

源代码与打包后的代码的映射关系，通过sourceMap定位到源代码。

在dev模式中，默认开启，关闭的话。可以在配置⽂件⾥devtool:"none"。

[devtool的介绍](https://webpack.js.org/configuration/devtool#devtool)：
- eval: 速度最快，使⽤eval包裹模块代码。
- source-map: 会产⽣ .map ⽂件。
- cheap: 较快，会告知出错行信息，但是不显示列信息。因此一般都会加上`cheap-`。
- Module: 第三⽅模块，包含loader的sourcemap(⽐如jsx to js ，babel的sourcemap)。
- inline: 将 .map 作为DataURI嵌⼊打包后的bundle中，不单独生成 .map 文件。

**配置推荐:**
- 开发环境使用
    - cheap-module-eval-source-map
- 生产环境使用source map（线上其实不推荐开启）
    - map文件只要不打开开发者工具，浏览器是不会加载的。
    - 3种处理方案：
        - hidden-source-map：借助第三方错误监控平台 Sentry 使用。
        - nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高。
        - sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)。
    - 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积，并降低整体性能。



