# JS 模块规范与演进

> 在 ES6 之前，社区自发的生产了一些模块加载方案，最主流的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器（借助第三方库）。而 ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，能满足绝大部分 CommonJS 和 AMD 的需求，目标是成为浏览器和服务器通用的模块解决方案（不过现状是还不能完全替代，比如动态同步 require 还没替代方案）。

## JS 的两种模块规范

到 2021 年，你可以忘记前面章节中的 5 种模块规范，只需要知道 JS 有两种格式的模块：

- Nodejs 专用的 CommonJS 模块（cjs）；
- ESM 模块（esm）；

### esm 与 cjs 的差异

- CommonJS 模块使用 require()加载和 module.exports 输出，ESM 模块使用 import 和 export。
- 用法上面，require()是同步加载，后面的代码必须等待这个命令执行完，才会执行。import 命令则是异步加载，或者更准确地说，ESM 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

### Nodejs 如何区分两种模块

- .mjs 文件总是以 ESM 模块加载；.cjs 文件总是以 CommonJS 模块加载；.js 文件和无拓展名文件的处理方式，取决于 package.json 里面 type 字段的设置（type = 'module' 或者 type = 'commonjs'）。
- 如果 package.json 没有定义 type 字段，node 默认是按照 commonJs 规范处理。不过，node 官方建议包的开发者明确指定 package.json 中 type 字段的值。
- 注意：ESM 模块与 CommonJS 模块尽量不要混用。require 命令不能加载.mjs 文件，会报错，只有 import 命令才可以加载.mjs 文件。反过来，.mjs 文件里面也不能使用 require 命令，必须使用 import。

### 两种模块互相引用

#### CommonJS 模块加载 ESM 模块

require()命令不能加载 ESM 模块，会报错，只能使用 import()这个方法加载：

```js
// 在 CommonJS 模块中运行
(async () => {
	await import("./my-app.mjs");
})();
```

require()不支持 ESM 模块的一个原因是，它是同步加载，而 ESM 模块内部可以使用顶层 await 命令，导致无法被同步加载。

#### ESM 模块加载 CommonJS 模块

```js
// 在 ESM 模块中运行
import { method } from "commonjs-package"; // 报错
import packageMain from "commonjs-package"; // 正确
const { method } = packageMain; // 加载单一的输出项
```

import 命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

这是因为 ESM 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是 module.exports，是一个对象，无法被静态分析，所以只能整体加载。

#### 同时支持加载两种模块

1. 原始模块是 ESM 时，需要整体`export default obj`输出，使得 CommonJS 可以用 import()进行加载。
2. 原始模块是 CommonJS 格式，需要包装一层：

```js
// wrapper.js
import cjsModule from "../index.js"; // 整体引入 CommonJS 模块
export const foo = cjsModule.foo; // 按需输出具名接口
```

有 3 种方式可以表明这个包装层导出的是一个可以被 ESM 加载的模块：

1. 文件后缀设为.mjs；
2. 将包装层放在一个子目录，并添加一个单独的 package.json 文件，指明{ type: "module" }；
3. 将包装层放在一个子目录，并添加一个单独的 package.json 文件，使用 exports 字段，指明两种格式模块各自的加载入口：

```json
"exports"：{
    "require": "./index.js",
    "import": "./esm/wrapper.js"
}
```

::: danger 注意！
ESM 模块规范是 JS 官方提出的，所以浏览器和 Nodejs 都原生支持了这一模块规范。

但 CommonJS 并不是 JS 官方提出的，而是 Nodejs 的开发者实现的，因此浏览器并没有支持 CommonJS。

这两种模块不兼容。
:::

## 演进：Nodejs 为什么不放弃 CommonJS 而全面转向 ESM 呢？（兼容问题）

Q：在 JS 官方将 ESM 写进标准后，Nodejs 必然要实现 ESM。那为什么 Nodejs 不全面转向 ESM 呢？

A：因为在 ESM 之前，有大量的基于 CommonJS 模块规范实现的包，所以 Nodejs 不可能完全转向 ESM，而只能选择兼容。

但是，二者存在很多底层的设计冲突，所以在兼容层的实现上存在诸多问题 [Node Modules at War: Why CommonJS and ES Modules Can’t Get Along](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1)。

::: tip 最终兼容的方案

后缀为 .mjs 的文件 以及 后缀为 .js 但是在 package.json 中声明了 "type": "module" 的模块（Nodejs >= v13），都会在 Nodejs 中被解析为 ESM 模块

:::

## 演进：是否可以浏览器上直接加载基于 CommonJS 开发的 npm 包呢？（依赖困境）

Q：既然 Nodejs 的已经兼容了 CommonJS 和 ESM 规范，并且主流浏览器（除了 IE）也已经基于 ESM 规范实现了原生的模块系统，那么是不是可以在浏览器上直接加载此前基于 CommonJS 开发的 npm 包了呢？

A：答案是`不行`。这是因为模块解析机制的差异所导致的第三方依赖的困境。

**接下来我们分析下 Nodejs、Webpack、浏览器 3 者的模块解析机制的差异：**

### Nodejs 的模块解析机制

在 Nodejs 中，引入第三方依赖不需要写相对路径，只需要依赖名，而且也不需要指定入口文件。

这是 Nodejs 模块系统所做的兼容处理，包括但不限于：

1. 自动拼接 node_modules 中第三方依赖的完整路径；
2. 自动解析 package.json 中的入口字段，拼接入口路径到上一步的完整路径中；
3. 自动解析是否需要添加后缀或者补全 index 路径；

```js
const axios = require("axios");
// => 自动拼接 node_modules 路径
const axios = require("/User/xxxx/workspace/node_modules/axios");
// => 自动解析 package.json，拼接入口
const axios = require("/User/xxxx/workspace/node_modules/axios/axios.js");
```

### Webpack 的模块解析机制

Webpack 是基于 bundle 的开发模式，即将所有的依赖最终打包成一个大的 bundle.js。Webpack 为了`使得开发 web app 时使用的 CommonJS 语法与开发 Nodejs app 时保持一致`，会在 webpack bundle 的过程中自动注入 Nodejs 的 CommonJS 模块处理逻辑。但其实，二者的底层实现完全不同：

- Nodejs 的 CommonJS 实现是基于内置的 Module 等模块，在 Nodejs core 层实现底层逻辑；
- Webpack 的 CommonJS 实现则是 Webpack 自己实现的一套逻辑：
  - 编译时借助 enhanced-resolve（扩展自定义 mainfield、extension 和 alias）；
  - 运行时通过 webpack-runtime 支持 cjs 的运行；
  - 从而保证暴露给用户的顶层接口与 Nodejs 是一致的。

### 浏览器 的模块解析机制

Nodejs 和 Webpack 之所以能加载 CommonJS 的依赖插件，是因为它们各自做了大量的底层实现。但浏览器是没有原生实现 CommonJS 模块加载机制的，因此，虽然浏览器已经原生支持了 ESM，但并不能直接使用 CommonJS 模块。

## 演进：下一代 Web App 开发模式

浏览器原生实现了 ESM 规范，那么如何在 ESM 的标准下使用第三方依赖呢？对于巨大存量的 CommonJS 模块，社区依然是想设法将其直接通过浏览器来加载，从而变革传统 Web App 的开发模式。当前社区有两种思路：

- CommonJS to ESModule；
- Snowpack & Vite；

### CommonJS to ESModule

浏览器无法使用 CommonJS 模块的本质，就是浏览器本身并没有实现任何 CommonJS 模块加载机制。结合当前主流浏览器支持 ESM 模块的背景，最好的办法就是将 CommonJS 模块转成 ESM 模块。

社区主流的转换方案有：

- [jspm](https://jspm.dev/@babel/core)
- [skypack（前身是 pika）](http://cdn.skypack.dev/@babel/core)
  - pika 将第三方依赖的 commonjs 代码经过转化变成了 esm 模块，同时做了缓存；
  - pika 提供了 cdn 服务，用来直接在项目中引用第三方依赖；
  - pika 实现了 npm 上大部分 commonjs 模块的直接复用
- [esm.sh](http://esm.sh/@babel/core)

上述工具的处理方案大致都是利用转换（构建）工具，比如 Rollup、EsBuild 等，将 CommonJS 的语法升级为 ESModule 语法，同时将其中引入其他三方依赖的路径转化拼接为对应的 ESModule 路径：

```js
const axios = require("axios");
module.exports = axios;
// =>
import axios from "/esm/axios.js";
export default axios;
```

比如 pika cdn 服务，能够实现类似于之前 npm 的功能，即提供单个依赖的使用和管理。

```html
<script type="module">
	import axios from "http://cdn.skypack.dev/axios";
	// TODO...
</script>
```

但这种开发模式在实际使用中，会有诸多问题，最明显的就是`「请求爆炸💥」`。比如加载一个 UI 组件库，其中使用到的第三方依赖有成百上千个，由于没有 bundle，加载这些依赖变成了独立的网络请求，加载组件库需要发送上千个网络请求，不仅加重了首屏渲染压力，对整个开发链路也造成了严重负担。

基于上述原因，下一代 Web App 开发工具也随之产生。

### ESM 开发工具：Snowpack & Vite

从项目的角度讲，「请求爆炸 💥」的产生是由于，pika cdn 虽然提供了依赖管理的能力，但是还缺乏了类似之前 webpack 打包整个项目的功能。这说明`bundle 的过程是必不可少的`。

在原先 Webpack 的理念中，所有文件都是模块，这些模块最终都会被打包进 bundle.js 中。这就导致了整个 bundle 的过程几乎是不可复用的，每次启动 devServer 都需要重新 bundle（非常耗费时间和性能）。但其实第三方依赖代码不会经常改变，且浏览器已经支持 ESM 规范模块的加载，因此，`开发工具可以将依赖的加载全部交由浏览器本身接管，而自身只负责 cjs 模块到 esm 模块的转换，以及 bundle 的过程（只需要将依赖 bundle 一次，后续就不用再多做处理）`。

#### Snowpack

基于上述原因，pika 提供了 snowpack（一个 ESM 的构建工具），`将文件编译成 ESM` 并`打到 web_modules 目录`（整个目录下的文件全是符合 ESM 规范的 js 文件，这个用法也是 ESM 规范所提倡的）。

```
/web_modules
    /common
        /index.hash.js
    /index.js
    /react.js
    /react-dom.js
```

snowpack 还做了其他工作，比如处理样式文件，处理 css 预处理器等其他功能。这些工作虽然 webpack 已经有很好的实践，但是由于生态不同，因此，几乎不可复用，需重复开发，所以还有些坑，并不推荐用于生产环境。

#### Vite

略

### 开发模式（DevServer）

- Create-snowpack-app（react）
- Create-vite-app（vue3）

1. 起一个 proxy dev 服务器；
2. 将 src 目录下的文件编译一下（rollup，加个自定义插件处理一下第三方依赖的引入路径）；
3. rollup 打包第三方依赖（处理 vendor），放入 web_modules 目录；
4. 文件代理。

模块的引入完全是浏览器实现的 ESM 规范。

### 具备优势，但推进困难

这种新的开发模式一方面降低了开发工具的复杂性（利用浏览器原生的模块加载机制，开发工具不再接管依赖的加载），另一方面大大提升的应用的启动速度，和本地开发的调试体验（不用在每次启动 dev server 时去重新处理 node_modules）。

但是，从整个生态环境来看，新一代开发模式的推进不容乐观，有一些通病：

- **生态不完善**， Webpack 已经支持很好的功能还没有得到官方的支持。
- **CommonJS 向 ESModule 的转换不完善**，缺失完善的解决机制。
  1. 动态引入与静态解析
  - CommonJS 中，模块的引入与导出是动态的语法，因此要想拿到一个模块完整的导入或者导出，必须得等到那个模块具体执行的时候才能确认。
  - 而 ESModule 中，模块语法是需要被解释器静态解析的，这就要求导出语法必须声明在作用域的最顶层。
  2. 具名导出与默认导出
  - 在 CommonJS 中，对具名导出和默认导出是没有具体做限定的，Node.js 的一个模块中，全局的 exports === module.exports。
  - 而在 ESModule 中，对具名导出和默认导出做出了一个具体的限定，而且在导入语法中也有明显的区别。

## 参考链接

- [Nodejs 如何处理 ES6 模块 - 阮一峰](https://www.ruanyifeng.com/blog/2020/08/how-Nodejs-use-es6-module.html)
- [ESModule 系列 ㈠ ：演进](https://jishuin.proginn.com/p/763bfbd5b452)
- [为什么 CommonJS 和 ES Modules 无法相互协调](https://blog.csdn.net/weixin_39843414/article/details/108945706)
