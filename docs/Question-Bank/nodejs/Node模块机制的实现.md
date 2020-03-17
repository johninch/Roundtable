# Node模块机制的实现

## CommonJS规范
_希望js能运行在任何地方是commonJS规范制定的初衷。_
CommonJS对模块的定义非常简单，包括：**模块引用、模块定义、模块标识**；
```javascript
const 模块引用 = require('模块标识')
/** 模块定义 */
exports.add = (...args) => {
	// ...
}
```
符合规范的**模块标识**应该是小驼峰命名的字符串（如：my-module），或者路径。
## Node模块的实现
前面了解了**CommonJS**规范，现在再来Node对该规范的实现。
`node`在实现该规范时做了一些取舍，同时也增加了部分自身需要的特性。我们知道规范的模块中有`exports`、`require`、`module`看起来十分简单，但我们需要了解**node**在实现它们的时候经历了什么：
### Node如何加载模块？
在Node中引入模块需要经历三个步骤：路径分析、文件定位、编译执行。
#### 模块的分类
模块分为：核心模块（Node自带的）、文件模块（用户写的）
核心模块：在node源代码编译过程中编译成二进制，node进程启动时直接装载在内存中执行，为何快？
文件模块：属于动态加载，需要完成上述三个步骤才能完成加载。因此相对较慢。
#### 缓存优先
当然了Node与浏览器类似，为了减少二次引入的开销，对引入过的模块都会进行缓存。不同的是，浏览器只缓存文件，Node缓存的是编译和执行后的对象。
#### 路径分析


- 模块标识符分析

模块标识符存在多种形式，对于不同形式查找和定位是有差异的。
先了解一下模块标识符的分类：核心模块、相对路径的文件模块、绝对路径文件模块、非路径形式的文件模块（这里主要指包）。

- 提前看一下模块加载的优先级吧

缓存 > 核心模块 > 路径形式的文件模块（以 `.` 、`..`和`/`开头的标识符）> 自定义模块（非路径形式文件模块）。
为何会存在这样的优先级呢，前面两个毋庸置疑，自定义模块最慢是为什么呢？

- 先了解一下自定义模块的路径查找策略：

`module.paths`属性可以追踪模块的查找过程：首先在当前目录下的`node_modules`下查找，然后父目录...直到根目录，因此对于自定义模块路径越深查找越慢。
#### 文件定位
在文件定位的过程中包括：文件扩展名分析、目录和包的处理。

- 文件扩展名分析

由于标识符可以不带扩展名，此时`Node`会按照`.js`、`.json`、`.node` 逐个尝试。在尝试的过程中，需要调用fs模块的同步阻塞式地判断文件是否存在。因为Node是单线程的，所以这里会引起性能问题。小诀窍1：如果是.json、.node 请带上扩展名。小诀窍2：同步配合缓存，可以大幅缓解Node单线程中阻塞式调用的缺陷。

- 目录分析和包

文件扩展名分析后如果没有找到相应文件，却得到一个目录，此时会将此目录当作包处理：首先查找**package.json**（**CommonJS**包规范定义的包描述文件），并通过`JSON.parse()`解析，取出`main`属性指定的文件名进行定位。当`main`指定的文件名错误，或者根本不存在**package.json**，**Node**会将`index`作为默认文件名然后查找**index.js 、index.json、index.node**。
当模块路径数组遍历完毕后依然没找到，则会抛出查找失败的异常。
#### 模块编译
当定位到具体文件后，Node会创建一个模块对象，然后根据路径载入并编译。
对于不同文件扩展名，加载方式一不一样：

- .js 文件：通过fs模块同步读取后编译执行；
- .node文件：这是C/C++编写的扩展文件，通过dlopen()方法加载最后编译生成的文件。
- ,json 文件：fs同步读取，JSON.parse()解析返回；
- 其余扩展名：都会被当作 .js 处理。

每编译成功一个模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入性能。
根据不同文件扩展名，Node会调用不同的读取方式，如.json文件的调用如下：

```javascript
// Native extensions for .json
Module._extensions['json'] = function(module, filename) {
	var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
  try {
  	module.exports = JSON.parse(content);
  } catch (err) {
  	err.message = filename + ': ' + err.message;
    throw err;
  }
};
```
其中，Module._extensions会赋值给require的extensions属性，不妨尝试：`console.log(require.extensions);`
也可以像上面的方式自定义扩展加载方式，v0.10.6后官方不鼓励这么做，而是期望先将其他语言转换为js文件后再加载，这样就避免了将繁琐的编译加载等过程引入到Node的执行过程中。
##### 1. Javascript模块编译
回到**CommonJS**规范，我们知道每个文件都存在 `require`、`exports`、`module`三个变量，它们从何而来？Node每个模块中还有`__filename`、`__dirname`，它们又从何而来。
事实上在编译过程中，**Node**会对获取的**Javascript**文件内容进行头尾包装，如下：

```javascript
(function (exports, require, mudule, __filename, __dirname) {
	var math = require('math');
  exports.area = function (radius) {
  	return Math.PI * Math.pow(radius, 2);
  }
})
```
这样就保证了模块文件之间作用域隔离。包装后的代码通过vm原生模块的`runInThisContext()`方法执行（类似`eval`，只是具有明确的上下文，不污染全局），返回一个具体的**function**对象。
以上，`require`、`exports`、`module`的流程已经完整，这就是**Node**对**CommonJS**模块规范的实现。
##### 2. C/C++模块编译
调用process.dlopen()方法加载执行。在Node的架构中，dlopen()方法在Windows和*nix平台分别有不同的实现，通过libuv兼容层进行封装。
实际上.node模块不需要编译，只需要加载和执行，执行过程中exports对象与.node模块产生联系。
### 核心模块
核心模块分为两类：C/C++写的，JavaScript写的。其中C/C++放在src目录下，JavaScript放在lib目录下。
#### JavaScript核心模块编译过程

1. 转存为C/C++代码，代码字符串放到c++数组中，Node进程启动时直接加载到内存中。
1. 编译JavaScript核心模块：

与文件模块的区别在于：获取源代码的方式以及缓存执行保存结果的位置。
Javascript核心模块源代码通过process.binding('natives')取出，编译成功后存放到NativeModule._cache对象上，文件模块则放在Module._cache对象上：

```javascript
function NativeModule (id) {
	this.filename = id + '.js';
  this.id = id;
  this.exports = {};
  this.loaded = false;
}
NativeModule._source = process.binding('natives'); // 源代码缓存
NativeModule._cache = {}; // 编译结果缓存
```
#### C/C++核心模块的编译过程
以后再说
#### 核心模块的引入流程
下面时 os 模块的引入流程：
![](https://cdn.nlark.com/yuque/__puml/a79ab39945bc20ec6e695f0038eb6f0f.svg#lake_card_v2=eyJjb2RlIjoiQHN0YXJ0dW1sXG5cbjpOT0RFX01PRFVMRShub2RlX29zLCByZWdfZnVuYyk7XG46Z2V0X2J1aWx0aW5fbW9kdWxlKCdub2RlX29zJyk7XG46cHJvY2Vzcy5iaW5kaW5nKCdvcycpO1xuOk5hdGl2ZU1vZHVsZS5yZXF1aXJlKCdvcycpO1xuOnJlcXVpcmUoJ29zJyk7XG5cbkBlbmR1bWwiLCJ0eXBlIjoicHVtbCIsImlkIjoiQllZaksiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19wdW1sL2E3OWFiMzk5NDViYzIwZWM2ZTY5NWYwMDM4ZWI2ZjBmLnN2ZyIsImNhcmQiOiJkaWFncmFtIn0=)### C/C++扩展模块

![](https://cdn.nlark.com/yuque/__puml/57959b4e059dad9fc89f3ffd191838b7.svg#lake_card_v2=eyJjb2RlIjoiQHN0YXJ0dW1sXG5cbnwgKm5peHxcbjpDL0MrK-a6kOeggTtcbmlmICggKm5peClcblx0fCAqbml4fFxuXHQ6ZysrL2djYztcblx0LT4g57yW6K-R5rqQ56CBO1xuXHQ6LnNv5paH5Lu2O1xuXHQtPiDnlJ_miJAubm9kZeaWh-S7tjtcblx0OuWKoOi9vS5zb-aWh-S7tjtcblx0LT4gZGxvcGVuKCnliqDovb07XG5lbHNlXG5cdHwjQW50aXF1ZVdoaXRlfHdpbmRvd3N8XG5cdDpWQysrO1xuXHQtPiDnvJbor5HmupDnoIE7XG5cdDouZGxs5paH5Lu2O1xuXHQtPiDnlJ_miJAubm9kZeaWh-S7tjtcblx0OuWKoOi9vS5kbGzmlofku7Y7XG5cdC0-IGRsb3Blbigp5Yqg6L29O1xuZW5kaWZcbnwgKm5peHxcbjrlr7zlh7rnu5lKYXZhc2NyaXB0O1xuXG5AZW5kdW1sIiwidHlwZSI6InB1bWwiLCJpZCI6ImtuRVA1IiwidXJsIjoiaHR0cHM6Ly9jZG4ubmxhcmsuY29tL3l1cXVlL19fcHVtbC81Nzk1OWI0ZTA1OWRhZDlmYzg5ZjNmZmQxOTE4MzhiNy5zdmciLCJjYXJkIjoiZGlhZ3JhbSJ9)扩展模块不同平台的编译和加载过程
关于如何编写扩展模块，以及更多的相关信息，暂不深入了解。
## 包与NPM
包是在模块的基础上进一步组织代码。
### 包结构
包是一个存档文件，.zip或.tar.gz格式，安装后解压还原为目录。完全符合CommonJS规范的包目录应该包含如下文件：

- package.json：包描述
- bin: 存放可执行二进制文件的目录
- lib：存放JavaScript代码
- doc：文档
- test：单元测试
### 包描述文件
可以查看npm官方文档：[https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)
### 包安装
#### 全局安装
全局安装并不代表将包安装为一个全局包，并不意味可以在任意地方引入。实际上 -g 是将一个包安装为全局可用的执行命令。它根据package.json的bin属性配置，将实际脚本链接到与Node可执行文件相同的路径下：

```json
{
	"bin": {
  	"express": "./bin/exporess"
  }
}
```
事实上通过全局安装的包都被统一放到了一个目录下，如何知道这个目录呢？

```javascript
path.resolve(process.execPath, '..', '..', 'lib', 'node_modules');
```
通过上面的代码即可推算出。如果Node的可执行文件在`/usr/local/bin/node`，那么模块目录就是`/usr/local/lib/node_modules`。最后，通过软链接的方式将`bin`属性配置的可执行文件链接到**Node**的可执行目录下。
#### 本地安装
本地安装只需要告诉**NPM**包描述文件**package.json**文件在哪就行。具体如下：

```shell
npm install <tarball file>
npm install <tarball url>
npm install <folder>
```
#### 其他源安装

```shell
npm install react --registry=http://xxx.com
# 改变默认源
npm config set registry http://xxx.com
```
### NPM钩子命令
package.json中的scripts字段就是让包在安装或者卸载等过程中提供钩子机制，例如

```json
{
	"scripts": {
  	"preinstall": "preinstall.js",
    "install": "install.js",
    "uninstall": "uninstall.js",
    "test": "test.js"
  }
}
```
当我们执行`npm install <package>`时，`preinstall`指向的脚本将会被加载执行，接着执行`install`。`npm uninstall <package>`时，`uninstall`字段指向的脚本可以执行一些清理操作。
### 发布包
流程：编写模块 -> 初始化package.json -> 注册npm仓库账号（如果没有的话） -> 上传包。
一个优秀的包应该：

- 具备良好的测试
- 具备良好的文档
- 具备良好的测试覆盖率
- 具备良好的编码规范
- 更多条件
#### 注册仓库账号
可以取npm官网注册，也可以通过命令行注册

```shell
npm adduser
# 而后按照指引填写即可
```
#### 上传包

```shell
npm publish <folder>
```
#### 包权限管理
通常一个包只有一个人可以发布。如果需要多人发布，可以使用：

```shell
npm owner ls <package name>
npm owner add <user> <package name>
npm owner rm <user> <package name>
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/263240/1584441084190-4023bcec-dd64-4765-b4f9-48c1465b33ae.png#align=left&display=inline&height=38&name=image.png&originHeight=76&originWidth=384&size=7514&status=done&style=none&width=192)
#### 分析包
通过`npm ls` 可以查看当前目录下能否顺利引入想引入的包。这个命令可以分析出当前路径下能通过模块路径找到的所有包，并生成依赖树：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/263240/1584441385320-e2a5d15d-70ab-4b4d-8c4f-3bad79497c7b.png#align=left&display=inline&height=44&name=image.png&originHeight=87&originWidth=291&size=5408&status=done&style=none&width=145.5)
### 局域网NPM
如何搭载且看：稍后更新。。。
## 前后端共用模块
前端模块化主要有AMD、CMD、ES6+。相关知识不赘述了。
如何兼容多种规范，且看：

```javascript
(function (name, definition) {
	// 检查上下文是否为AMD或CMD
  var hasDefine = typeof define === 'function',
      // Node？
      hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
  	define(definition);
  } else if (hasExports) {
    module.exports = definition();
  } else {
  	// 挂到window上
    this[name] = definition();
  }
})('hello', function () {
	var hello = function () {};
  return hello;
});
```

## 相关疑问

- 包描述文件中**dependencies**和**devDependencies**的区别是什么？

**dependencies：**使用当前包所需要依赖的包列表，npm会通过这个属性帮助自动加载依赖包。
**devDependencies：**一些模块只在开发时需要依赖。配置这个属性可以提示包的后续开发者安装这些依赖。
所以对于包的使用者而言**devDependencies**列表的依赖是不需要加载的，如果这些也放在**dependencies**里边那么，使用者就会自动安装这些不想关的包。

- 如何编写好`package.json` ？

可以参考一下之名项目，例如：express：[https://github.com/expressjs/express/blob/master/package.json](https://github.com/expressjs/express/blob/master/package.json)

- 

