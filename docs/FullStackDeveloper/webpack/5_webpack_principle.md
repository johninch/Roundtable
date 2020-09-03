# 5、webpack打包原理（bundler实现）

本节我们来自己实现一个bundler.js，理解webpack打包原理。

node bundler.js之后，发生了什么：
- 1. 分析入口模块，parser.parse后那大AST，并得到模块内的依赖
- 2. 转换代码，将AST转换成目标code
- 3. 生成依赖图谱，从入口递归得到所有依赖关系
- 4. 提供生成函数generate，将依赖图谱graph转换成字符串，并提供启动器函数webpackBootstrap，内含自执行闭包函数，使用eval来执行工程代码
- 5. 执行generate，生成bundle文件，输出到output指向的文件夹

## part1：模块分析（先对入口模块分析）

首先使用 `@babel/parser` 对入口模块进行分析，拿到模块内的依赖：
```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const moduleAnalyser = (filename) => {
    // 读取入口文件的内容
    const content = fs.readFileSync(filename, "utf-8")
    //! 分析内容，得到AST
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependencies = {}
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename)
            const newPath = './' + path.join(dirname, node.source.value)

            dependencies[node.source.value] = newPath
        }
    })
    // console.log(dependencies) // { './a.js': './src/a.js' }

    return {
        filename, // 入口文件
        dependencies // 依赖路径表
    }
}

moduleAnalyser('./src/index.js')
```


## part2：代码转换（AST => 浏览器可运行code）

在拿到入口模块的依赖列表dependencies之后，要使用`@babel/core`里的`transformFromAst`，将AST，转换成浏览器可以运行的代码。

转换代码标准为`@babel/preset-env`：

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

const moduleAnalyser = (filename) => {
    // 读取入口文件的内容
    const content = fs.readFileSync(filename, "utf-8")
    //! 分析内容，得到AST
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependencies = {}
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename)
            const newPath = './' + path.join(dirname, node.source.value)

            dependencies[node.source.value] = newPath
        }
    })
    // console.log(dependencies) // { './a.js': './src/a.js' }

    const { code } = transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })

    return {
        filename, // 入口文件
        code, // 浏览器可以运行的代码
        dependencies // 依赖路径表
    }
}

moduleAnalyser('./src/index.js')
```
模块分析后的输出内容为：
```js
{
  filename: './src/index.js',
  code: '"use strict";\n' +
    '\n' +
    'var _messsge = _interopRequireDefault(require("./messsge.js"));\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }',
  dependencies: { './messsge.js': './src/messsge.js' }
}
```


## part3：生成依赖图谱（dependencies graph）

在前两部分，只是对工程的入口文件做了分析，我们的目标是对工程中所有的模块做分析，因此需要递归所有的模块依赖，形成依赖图谱（dependencies graph）。

使用队列的方式，实现递归的效果：

```js
// 得到依赖图谱
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser(entry)
    const graphArr = [entryModule]

    // 以循环的方式，实现递归的效果
    for(let i = 0; i < graphArr.length; i++) {
        const item = graphArr[i]
        const { dependencies } = item

        if (dependencies) {
            for(let j in dependencies) {
                graphArr.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }

    // 数组结构转换为对象
    const graph = {}
    graphArr.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })

    return graph // 最后返回图谱对象
}
```

## part4：提供生成代码函数（generate）

有了 模块分析函数（moduleAnalyser或者叫parse）和 建立依赖图谱函数（makeDependenciesGraph）后，我们就可以考虑生成打包函数了。提供一个generate函数，接收项目入口为参数。还有如下几个问题要注意：
- 建立依赖图谱后，要将其转换为字符串，传入webpack启动函数中
- 这里的启动器函数，即webpackBootstrap
    - 因为 在依赖图谱中，有require函数，有exports对象，但这些在浏览器中并不存在
    - 也就是说，得到的代码字符串，其实并不能直接在浏览器中执行，所以需要在启动器函数中，构造require函数，创建exports对象
- generate函数返回模板字符串，生成一个自执行函数`(function(){})()`，之所以建立闭包是避免污染浏览器环境
- 在内部的自执行函数中，使用eval执行传入的工程代码

```js
const generate = (entry) => {
    const graph = makeDependenciesGraph(entry)
    const graphStr = JSON.stringify(graph) // 将转换后的代码转为字符串，传入webpack启动函数中

    // 在依赖图谱中，有require函数，有exports对象，但这些在浏览器中并不存在
    // 因此，其实其并不能直接在浏览器中执行，所以需要构造require函数，创建exports对象

    // 生成一个要在浏览器中执行的闭包函数，避免污染浏览器环境
    // const bundle = `(function(){})()`
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    // 其实是用相对路径找到真实的绝对路径，再require
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {}; // 注意：一定要加分号，因为后面跟着自执行函数

                (function(require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code)

                return exports
            }
            require('${entry}')
        })(${graphStr})
    `
}
```
::: danger 自执行函数前加分号
这里扩展一个小知识点（坑）：即自执行函数前要加上分号，来应对代码合并压缩时，由于缺少分号而导致的错误。
```js
;(function(){
    // 具体功能代码。。。
})();
```
> 以 “（”、“[”、“/”、“+”、或 “-” 开始，那么它极有可能和前一条语句合在一起解释。 ——《JavaScript 权威指南》
:::

## part5：得到 bundle.js
```js
const { entry, output } = require('./webpack.config.js');

const filePath = path.join(output.path, output.filename)
const bundle = generate(entry)

fs.writeFileSync(filePath, bundle, 'utf-8') // 写入dist文件夹目录
```
```bash
node bundler.js
```
执行后得到bundle.js：
```js
// bundle.js
(function(graph) {
    function require(module) {
        function localRequire(relativePath) {
            // 其实是用相对路径找到真实的绝对路径，再require
            return require(graph[module].dependencies[relativePath])
        }
        var exports = {}; // 注意：一定要加分号，因为后面跟着自执行函数

        (function(require, exports, code) {
            eval(code)
        })(localRequire, exports, graph[module].code)

        return exports
    }
    require('./src/index.js')
})({"./src/index.js":{"dependencies":{"./messsge.js":"./src/messsge.js"},"code":"\"use strict\";\n\nvar _messsge = _interopRequireDefault(require(\"./messsge.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_messsge[\"default\"]);"},"./src/messsge.js":{"dependencies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _word = require(\"./word.js\");\n\nvar message = \"say \".concat(_word.word);\nvar _default = message;\nexports[\"default\"] = _default;"},"./src/word.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\nvar word = \"hello\";\nexports.word = word;"}})
```


