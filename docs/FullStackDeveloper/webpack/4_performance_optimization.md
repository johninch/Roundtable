# 4、webpack性能优化

- 优化开发体验
  - 提升效率
  - 优化构建速度
  - 优化使⽤体验
- 优化输出质量
  - 优化要发布到线上的代码，减少⽤户能感知到的加载时间
  - 提升代码性能，性能好，执⾏就快


## 缩⼩搜索Loader的文件范围

优化loader配置：使用`test include exclude`3个配置项，来缩⼩loader的处理范围，推荐include。

```js
{
    // test: /\.s[ac]ss$/i,
    test: /\.less$/,
    // include: ["", "", ""],
    include: path.resolve(__dirname, "./src"), //推荐使用include
    // exclude: path.resolve(__dirname, "./node_modules"),
    use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
},
```

## 定位第三方依赖位置：resolve.modules配置

resolve.modules⽤于配置webpack去哪些⽬录下寻找第三⽅模块，默认是['node_modules']
- 寻找第三⽅模块，默认是在当前项⽬目录下的node_modules里⾯去找，如果没有找到，就会去上一级⽬录../node_modules找，再没有会去../../node_modules中找，以此类推，和Node.js的模块寻找机制很类似。
- 如果我们的第三⽅模块都安装在了项⽬根⽬录下，就可以直接指明这个路径。
```js
module.exports={
  resolve:{
    modules: [path.resolve(__dirname, "./node_modules")]
  }
}
```

## 配置别名：resolve.alias配置

resolve.alias配置通过别名来将原导入路径映射成⼀个新的导入路径。

比如给图片文件夹设置别名：
```js
resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/images/"),
    },
},
```
「加波浪线」：**html、css**中使用时，路径`@前要加波浪形~`:（*"~@dir"*）
```css
/* html、css中使用时，路径@前要加波浪形~ */
.sprite3 {
    background: url("~@assets/s3.png");
}
```
在js中不需要加波浪线。

## 后缀列表：resolve.extensions配置

resolve.extensions在导⼊语句没带⽂件后缀时，webpack会⾃动带上后缀后，去尝试查找⽂件是否存在。

默认值：extensions:['.js','.json','.jsx','.ts']。
```js
resolve: {
    extensions: ['.js','.jsx','.ts']，这个列表越长，需要匹配的就越久，推荐加上后缀
},
```

## 使用静态资源路径publicPath(CDN)

给输出的静态资源，添加定向到CDN的url前缀。在生产模式使用，一般通过CI/CD或者手动将dist目录下的静态资源代码上传到CDN服务器上。
```js
// webpack.config.js
output:{
    publicPath: 'http://cdn.xxx.com/assets/', // 指定存放JS文件的CDN地址
}
```


## 持久化：文件指纹
- 指纹类别
    - Hash：即每次编译都不同。可以在测试环境打包的JS文件中使用'[name].[hash]'
    - `Chunkhash`：不同的 entry 会生出不同的 chunkhash。适用于`生产环境`打包后的JS文件'[name].[chunkhash]'，最大限度利用浏览器缓存。
    - Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。
- [chunkhash]不能和 HMR 一起使用，即开发环境因为不需要持久化缓存，故不要用[chunkhash]、[contenthash]、[hash]，直接用[name]
- 占位符指定长度 [chunkhash:8]
- 各类别适用文件
    - JS文件的指纹设置'[name][chunkhash:8].js'
        - （*js文件为什么不用contenthash呢*？）
        - 因为js引入了css模块，如果css改变，css使用的contenthash，css的指纹变了，但对于引入它的js模块来说，如果使用contenthash，则js模块指纹不变。这样就会出错了，因为js无法引入更新后的css文件。
    - CSS文件的指纹设置'[name][contenthash:8].css'
        - （*css文件为什么不用chunkhash呢*？）
        - 因为js引入了css模块，如果js改变，js使用的是chunkhash，则chunkhash会改变，那么其引入的css模块也会跟着改变指纹，但这是不合理的，因为css自身内容根本没变。
        - 所以css要使用contenthash，只与自身内容有关，无视被哪个js模块引用。
    - Images/Fonts的指纹设置'[name][hash:8].[ext]', 注意，图片字体的hash与和css或js的hash概念不一样，是按内容生成的，不是按编译生成的。

### 抽离runtime（manifest）

对于老版本webpack，会把包的内置关联逻辑部分manifest，默认会打包进main.js和vendors.js中，所以对于老版本来说，当包与包之间的关系改变，manifest改变，则即使main.js和vendors.js本身没有改变，其contenthash也会发生变化。所以将manifest单独配置抽离出来，避免不必要的hash改变，导致缓存失效。

```js
optimization: {
    runtimeChunk: {
        name: 'runtime' // 即 manifest，包含了业务入口代码main.js和vendors之间的关系
    },
},
```

## 抽离css：MiniCssExtractPlugin

如果不做抽取配置，css 是直接打包进 bundle.js 里⾯的，这就是常说的Css in JS。我们希望能单独⽣成 css ⽂件。因为单独⽣成css，css可以和js并行下载，提⾼⻚⾯加载效率。

如果要将Css单独打包进dist目录中的话，就要借助插件`MiniCssExtractPlugin`。不过这个插件有个不足，就是不支持HMR，因此**只推荐在生产环境打包使用**。

```bash
npm install mini-css-extract-plugin -D
```

`MiniCssExtractPlugin`既要在plugin中配置，也要在loader中配置。

不再需要style-loader，⽤`MiniCssExtractPlugin.loader`代替：
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    modules: {
        rules: [
            {
                test: /\.scss$/,
                    use: [
                        // "style-loader", // 不再需要style-loader，⽤MiniCssExtractPlugin.loader代替
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 注意这里的publicPath与output里的不是一个意义
                                publicPath: "../", // 解决css抽离后，css内引入其他资源的路径层级问题
                            },
                        },
                        "css-loader", // 编译css
                        "postcss-loader",
                        "sass-loader" // 编译scss
                    ]
            },
        ]
    }
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash:6].css",
            chunkFilename: "[id].css"
        })
    }
}
```

## 压缩CSS

借助`optimize-css-assets-webpack-plugin`，借助cssnano。

cssnano，是一种css压缩配置规范，还有一种叫css-next，作用都是一样的。

```bash
npm i cssnano -D
npm i optimize-css-assets-webpack-plugin -D
```
```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

plugins: [
    new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
        cssProcessorOptions: {
            discardComments: { removeAll: true }
        }
    })
}
```



## 压缩HTML

借助html-webpack-plugin
```js
plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["main"],
        minify: {
            // 压缩HTML⽂件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空⽩符与换⾏符
            minifyCSS: true // 压缩内联css
        }
    }),
]
```

## 压缩图片

在 Webpack 中可以借助`img-webpack-loader`来对使用到的图⽚进行优化。它支持 JPG、PNG、GIF 和 SVG 格式的图⽚，因此我们在碰到所有这些类型的图⽚都会使用它。
```bash
npm install image-webpack-loader --save-dev
```
其配置，直接使用官网推荐的即可（如下）：
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                // file-loader .txt .md .png .jpg .word .pdf
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:6].[ext]",
                            outputPath: "images/" // 输出路径
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            }
        ]
    }
}
```

## 环境区分：development vs production
```bash
npm install webpack-merge -D
```

### 通过使用不同的配置文件打包
```js
// webpack.dev.js
const merge = require("webpack-merge")
const baseConfig =  require("./webpack.base.js")

const devConfig = {
    // ...
}

module.exports = merge(baseConfig,devConfig)
```
```js
// package.js
"scripts":{
  "dev": "webpack-dev-server --config ./build/webpack.dev.js",
  "build": "webpack --config ./build/webpack.prod.js"
}
```

### 通过使用环境变量打包
```js
// webpack.base.js
const merge = require("webpack-merge")
const devConfig =  require("./webpack.dev.js")
const prodConfig =  require("./webpack.prod.js")

const baseConfig = {
    // ...
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(baseConfig, prodConfig)
    } else {
        return merge(baseConfig, devConfig)
    }
}
```
--env.production注入全局变量：
```js
// package.js
"scripts":{
  "dev": "webpack-dev-server --config ./build/webpack.base.js",
  "build": "webpack --env.production --config ./build/webpack.base.js"
}
```

对于扩平台注入全局变量，需要使用 `cross-env`：
```bash
npm i cross-env -D
```
比如test环境使用线上的配置，在其基础上，通过传入的 NODE_ENV=test 环境变量，来做差异化的配置处理。在webpack.config.js里拿到参数`process.env.NODE_ENV`：
```js
// package.js
"scripts":{
  "dev": "webpack-dev-server --config ./build/webpack.dev.js",
  "test": "cross-env NODE_ENV=test webpack --config ./webpack.prod.js",
  "build": "webpack --config ./build/webpack.prod.js"
}
```


## library打包

### libraryTarget和library
```js
output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'library', // 使自定义库可以被开发者以script标签的形式引入，通过 全局变量library 来访问
    libraryTarget: 'umd' // 使自定义库满足通用模块化定义，即可以被开发者按照cmd、esm、amd的多种方式引用
},
```
### externals
externals，表示在打包时，忽略某些第三方库依赖，不将其打包进我们生成的bundle.js中。

使⽤externals，可以优化cdn静态资源

//公司有cdn我的bundle⽂件里，就不用打包进去这个依赖了，体积会小，可以将一些JS⽂件存储在 CDN 上（减少 Webpack 打包出来的 js 体积)，在 index.html 中通过标签引入。如我们希望在使⽤时，仍然可以通过 import 的方式去引用(如 import $ from 'jquery')，并且希望 webpack 不会对其进行打包，此时就可以配置 externals。
```js
// webpack.config.js
module.exports = {
    // ...
    externals: {
        // jquery通过script引⼊之后，全局中即有了 jQuery 变量
        'jquery': 'jQuery'
    }
}
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root">root</div>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
</body>
</html>
```



## 使用DllPlugin，提高打包速度

对于第三方模块，其实代码一般是不会经常变动的，在这里以 'react', 'react-dom', 'lodash' 为例：
- 1、首先，再新建一个单独的配置文件**webpack.dll.js**，将['react', 'react-dom', 'lodash']打包成一个bundle，指定输出到**dll目录**下，命名为 **vendors.dll.js**，并且，像打包library一样，指定`output.library为vendors`，**暴露一个全局变量**，给未来的浏览器。
- 2、使用 `webpack.DllPlugin` 插件，对暴露的dll代码做分析，在dll目录下生成一个 **vendors.manifest.json** 映射文件。
```js
// webpack.dll.js
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
}
```
- 3、单独使用命令，执行dll打包
```js
"build:dll": "webpack --config ./build/webpack.dll.js"
```
- 4、在基础打包配置 **webpack.base.js** 中，使用 `AddAssetHtmlWebpackPlugin` 插件，为打包出的html文件，添加对 **vendors.dll.js** 这一单独bundle的引用，配合之前暴露的library声明，则html会使用script加载执行这个单独的bundle.js，给浏览器添加一个全局变量vendors。
- 5、至此还没完，还需要再使用 `webpack.DllReferencePlugin` **指定dll的bundle.js的manifest所在位**置，否则，webpack找不到指引文件，就还是会从node_modules中去引用这些依赖。找到manifest文件后，当发现 'react'、'react-dom'、'lodash'时，就不再对其打包，从而提升打包速度。
```js
// webpack.base.js
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
        }),
        new webpack.DllReferencePlugin({
            manifest: path.res(__dirname, '../dll/vendors.manifest.json)
        })
    ]
}
```





