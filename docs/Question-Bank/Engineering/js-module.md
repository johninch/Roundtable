---
title: JS模块化规范(5种)
tags: [AMD, CMD, UMD, CommonJS, ES6Module, 循环引用, define, nodejs]
categories: Engineering
---

# JS模块化规范(5种)

由于ES5没有模块化规范，所以产生了CommonJS、AMD、CMD这三种规范（还有UMD这种融合规范）。在ES6中又新增了ES6Module。因此JS模块化规范共有5种：CommonJS、AMD、CMD、UMD、ES6Module。

这些方案大致分为 `同步` 与 `异步` 两类：除了CommonJS是同步，其余规范都是异步的。
- 因为服务端模块都存储在本地，所以服务端资源是同步加载的；
- 但是对于客户端浏览器而言，加载的时间还取决于网速的快慢等因素，可能会由于网络原因陷入“假死”状态。如果使用同步加载，那么大概率会阻塞加载，所以浏览器资源是异步加载的。



## 1、CommonJS
`同步加载`、require/module.exports、以**node.js**为代表。

CommonJS定义的模块分为三种：模块引用(require)；模块定义(exports)；模块标识(module)
```js
// 导入
require("module");
require("../app.js");
// 导出
exports.getStoreInfo = function() {};
module.exports = someValue;
```
## 2、AMD
`异步加载`、`依赖前置`、所有依赖模块的语句，都定义在一个回调函数中，等到加载完成之后，回调函数才执行；以**require.js**为代表.
```js
// 定义
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好  
   a.doSomething()    
   // 此处略去 100 行    
   b.doSomething()    
   ...
});
// 加载模块
require(["module", "../app"], function(module, app) {...});
```
## 3、CMD
`异步加载`、`依赖就近`、以**sea.js**为代表。
```js
define(function(require, exports, module) {
  var a = require('./a');
  a.doSomething();
  // 依赖就近书写，什么时候用到什么时候引入
  var b = require('./b');
  b.doSomething();
});
```
## 4、UMD
UMD是AMD和CommonJS的糅合：
- AMD 以浏览器第一原则发展异步加载模块。
- CommonJS 模块以服务器第一原则发展，选择同步加载，它的模块无需包装。

**UMD先判断是否支持Node.js(即CommonJS)的模块（就是判断exports是否存在），存在则使用CommonJS模块模式；再判断是否支持AMD（就是判断define是否存在），存在则使用AMD方式加载模块。**
```js
(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```

## 5、ES6Module

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，**成为浏览器和服务器通用的模块解决方案**。

ES6 模块设计思想：尽量的静态化、使得编译时就能确定模块的依赖关系，以及输入和输出的变量（CommonJS和AMD模块，都只能在运行时确定这些东西）。

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

### 静态import函数：
```js
import { lastName } from './profile.js';
// 或重命名
import { lastName as surname } from './profile.js';

import { getArea, getRadius } from './circle';

getArea()
getRadius()

// 或整体引入
import * as circle from './circle';

circle.getArea()
circle.getRadius()
```

**因为是`在编译阶段执行`，所以import命令会有提升效果，提升到模块的头部**：
```js
//假设webpack的入口文件是```main.js```

//main.js
import moduleA from 'moduleA'
console.log(1)

import moduleB from 'moduleB'
console.log(2)

//moduleA.js
console.log(3)

//moduleB.js
console.log(4)

//最终在浏览器控制台中打印出的数字顺序是: 3 4 1 2
```

### export
export default 默认暴露或者export 函数名来暴露某函数名。
```js
// 第一组
export default function crc32() { // 输出
    // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
    // ...
};

import {crc32} from 'crc32'; // 输入
```

### 动态import()函数
ES2020提案 引入import()函数，支持动态加载模块。import()返回一个 Promise 对象。
```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`).then(module => {
    module.loadPageInto(main);
}).catch(err => {
    main.textContent = err.message;
});
```
- import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
- import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。

### import 与 export语句 复合写法
复合写成一行，foo和bar实际上并没有被导入当前模块，只是相当于`对外转发了这两个接口`，导致当前模块不能直接使用foo和bar。
```js
export { foo, bar } from 'my_module';
```

模块的`接口改名`和`整体输出`，也可以采用这种写法。
```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

### ES6 Module 与 CommonJS 两种模块化规范的比较

本标题又可以视作 *“require与import的区别”*、*“module.exports与export的使用区别”*。

**注意一点**：require/exports 是通用的，为什么这么说呢？因为事实上，目前你所编写的 import/export 最终都是编译为 require/exports 来执行的。

#### CommonJS：
1. **输出类型不同**：CommonJS 模块输出的是一个`值的拷贝`副本。
    - 对于基本数据类型，属于值复制。即会被模块缓存一份；也正由于是值的拷贝缓存副本，所以可以对其重新赋值。
    - 对于引用数据类型，属于浅拷贝。由于两个模块引用的对象或函数指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
2. **执行时机不同**：CommonJS 模块是`运行时加载`。
    - *CommonJS 模块就是对象*；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
    - 当使用require命令加载某个模块时，就会运行整个模块的代码。
    - 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
3. **循环加载时处理不同**：CommonJS 模块是运行时加载。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就**只输出已经执行的部分，还未执行的部分不会输出**。

#### ES6模块：
1. **输出类型不同**：ES6Module 模块输出的是`值的引用`。
    - import命令可被视作一种“符号连接”，当模块遇到import命令时，就会生成一个`只读引用`。因为是`只读引用`，所以不论基本数据类型还是引用类型，都不能重新赋值。
2. **执行时机不同**：ES6Module 模块是`编译时输出接口`。
    - *ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式*。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。
    - import命令在编译时建立“符号连接”，等到脚本真正执行时，再根据这个`只读引用`，`动态`地到被加载的那个模块里面去取值。因为是`动态`加载，所以当原始值变化时，不论基本数据类型还是引用类型，import加载的值也会发生变化。
3. **循环加载时处理不同**：ES6Module是`动态`引用，import的变量不会被缓存，而是成为一个指向被加载模块的引用，**需要开发者自己保证，真正取值的时候能够取到值**。

::: details 循环引用的例子
```js
// a.js
exports.done = false
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = true
console.log('a.js-2', '执行完毕')

// b.js
exports.done = false
let a = require('./a.js')
console.log('b.js-1', a.done)
exports.done = true
console.log('b.js-2', '执行完毕')

// c.js
let a = require('./a.js')
let b = require('./b.js')

console.log('c.js-1', '执行完毕', a.done, b.done)
// 运行node c.js
usr:~ usr$  node c.js
// b.js-1 false
// b.js-2 执行完毕
// a.js-1 true
// a.js-2 执行完毕
// c.js-1 执行完毕 true true
```
:::


## 参考链接
- [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
- [import 和require的区别(超级无敌详细版)](https://juejin.im/post/5d52ce465188253e85604c3d)

