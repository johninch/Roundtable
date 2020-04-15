# 深入javascript运行机制--部分

## 执行上下文
执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。
### 执行上下文的类型
执行上下文总共有三种类型

- **全局执行上下文**：只有一个，浏览器中的全局对象就是 window 对象，`this` 指向这个全局对象。

- **函数执行上下文**：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。

- **Eval 函数执行上下文**： 指的是运行在 `eval` 函数中的代码，很少用而且不建议使用。
### 执行上下文的创建
执行上下文分两个阶段创建：**1）创建阶段；** **2）执行阶段**
#### 创建阶段
创建阶段包含两个组件：词法环境、变量环境
```
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>, // 词法环境
  VariableEnvironment = <ref. to VariableEnvironment in  memory>, // 变量环境
}
```
##### 
##### 词法环境（Lexical Environment）
词法环境有三个**组成部分**

- 1、**环境记录**：包括**声明环境记录：**存储变量和函数声明的实际位置，**对象环境记录：**暂时理解为全局对象记录。

- 2、**对外部环境的引用**：可以访问其外部词法环境。
- 3、**this binding：**全局环境下指向全局对象，模块环境下指向模块对象，函数环境下取决于函数的执行方式（箭头函数除外，它取决与定义时所处的环境）。

词法环境有三种**类型**

- 1、**全局环境**：是一个没有外部环境的词法环境，其外部环境引用为 **null**。拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，`this` 的值指向这个全局对象。

- 2、**函数环境**：用户在函数中定义的变量被存储在**环境记录**中，包含了`arguments` 对象。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。
- 3、**模块环境**：可以理解为一个小型全局环境，拥有一个模块对象（本模块）this指向该模块对象。
##### 变量环境
变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。
在 ES6 中，**词法** 环境和 **变量** 环境的区别在于前者用于存储**函数声明和变量（ `let` 和 `const` ）**绑定，而后者****仅用于存储**变量（ `var` ）**绑定。


#### 执行阶段
此阶段，完成对所有变量的分配，最后执行代码。



#### 下面用一个例子分步解析JS执行上下文


```javascript
let a = 20;  
const b = 30;  
var c;
function multiply(e, f) {  
  var g = 20;  
  return e * f * g;  
}
c = multiply(20, 30);
```
创建阶段执行上下文如下伪代码所示：
```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```
在执行阶段，变量分配完成：
```javascript
GlobalExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```
当遇到对函数 `multiply(20，30)` 的调用时，将创建一个新的函数执行上下文来执行函数代码。因此，在创建阶段，函数执行上下文将如下所示：
```javascript
FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```
在此之后，执行上下文将经过执行阶段，这意味着对函数中变量的赋值已经完成。因此，在执行阶段，函数执行上下文将如下所示：
```javascript
FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```
函数完成后，返回的值存储在c中，因此全局词法环境将被更新。之后，全局代码完成，程序完成。
#### 笔记

1. 正如您可能注意到的，`let`和`const`定义的变量在创建阶段没有任何关联的值，但是`var`定义的变量被设置为`undefined`。这是因为，在创建阶段，会扫描代码以查找变量和函数声明，而函数声明则整体存储在环境中，变量最初设置为未定义（对于`var`）或保持未初始化（对于`let`和`const`）。这就是为什么可以在声明变量之前访问变量定义的变量（尽管未定义），但是在声明变量之前访问`let`和`const`变量时会得到引用错误。这就是我们所说的提升。
1. 如果 `Javascript` 引擎在源代码中声明的实际位置找不到 `let` 变量的值，那么将为其分配 `undefined` 值。



#### 

## 内存
JS内存空间分为**栈(stack)**、**堆(heap)**、**池(一般也会归类为栈中)**。 其中**栈**存放变量，**堆**存放复杂对象，**池**存放常量，所以也叫常量池。
⚠️注意：闭包中的变量并不保存中栈内存中，而是保存在`堆内存`中，这也就解释了函数之后之后为什么闭包还能引用到函数内的变量。
### 内存回收
JavaScript有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

- 局部变量和全局变量的销毁
  - **局部变量**：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
  - **全局变量**：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量**避免**使用全局变量。
- 以Google的V8引擎为例，V8引擎中所有的JS对象都是通过**堆**来进行内存分配的
  - **初始分配**：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
  - **继续申请**：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。
- V8引擎对堆内存中的JS对象进行**分代管理**
  - **新生代**：存活周期较短的JS对象，如临时变量、字符串等。
  - **老生代**：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。
#### 回收算法：引用计数、标记清除
##### 标记清除（常用）
标记清除算法将“不再使用的对象”定义为“**无法到达的对象**”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，**保留**。那些从根部出发无法触及到的对象被标记为**不再使用**，稍后进行回收。
### 内存泄漏
##### 1、浏览器方法

1. 打开开发者工具，选择 Memory
1. 在右侧的Select profiling type字段里面勾选 timeline
1. 点击左上角的录制按钮。
1. 在页面上进行各种操作，模拟用户的使用情况。
1. 一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。
##### 2、命令行方法
使用 `Node` 提供的 `process.memoryUsage` 方法。

```javascript
console.log(process.memoryUsage());
// 输出
{ 
  rss: 27709440,  // resident set size，所有内存占用，包括指令区和堆栈
  heapTotal: 5685248,   // "堆"占用的内存，包括用到的和没用到的
  heapUsed: 3449392,	// 用到的堆的部分
  external: 8772  	// V8 引擎内部的 C++ 对象占用的内存
}
```
判断内存泄漏，以`heapUsed`字段为准。
### 相关问题
#### 1. 从内存来看 null 和 undefined 本质的区别是什么？
#### 2. ES6语法中的 const 声明一个只读的常量，那为什么下面可以修改const的值？
```javascript
const foo = {}; 
foo = {}; // TypeError: "foo" is read-only
foo.prop = 123;
foo.prop // 123
```
#### 3. 哪些情况下容易产生内存泄漏？

1. 滥用全局变量
1. 滥用闭包
1. eval作用域
1. 变量引用了dom，但是dom后来从dom树移除了，该变量忘了解除引用
#### 4. 下面代码的执行结果是什么？为什么？
```javascript
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
```
```javascript
// 运行结果：
a.x 	// --> undefined
b.x 	// --> {n: 2}
```

- 1、优先级。`.`的优先级高于`=`，所以先执行`a.x`，堆内存中的`{n: 1}`就会变成`{n: 1, x: undefined}`，改变之后相应的`b.x`也变化了，因为指向的是同一个对象。
- 2、赋值操作是`从右到左`，所以先执行`a = {n: 2}`，`a`的引用就被改变了，然后这个返回值又赋值给了`a.x`，**需要注意**的是这时候`a.x`是第一步中的`{n: 1, x: undefined}`那个对象，其实就是`b.x`，相当于`b.x = {n: 2}`
## 参考链接
[https://github.com/yygmind/blog/issues/12](https://github.com/yygmind/blog/issues/12)
[https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
