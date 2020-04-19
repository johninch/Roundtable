---
title: 运行JS
tags: [预处理阶段, 执行上下文, 变量对象和活动对象, 作用域链, this指向]
categories: execution
---

# 运行JS

运行JS的过程，主要包括【预处理阶段】和【执行阶段】：

- 预处理阶段：预处理阶段会做一些事情，确保JS可以正确执行，比如分号补全，变量和函数的声明提升等（由于自动分号补全机制的问题，可能会导致出错，所以虽然有这个预处理阶段，但还是提倡要写分号）；
- 执行阶段：执行阶段要涉及【执行上下文、变量对象和活动对象、作用域链、this机制】等知识点。

## 作用域（执行上下文，执行环境）

### 作用域概念
- JS中的执行上下文，又称为作用域，或执行环境。
- JS没有块级作用域，而是通过函数来划分作用域的。只有全局作用域和函数作用域。

### 作用域的作用
每个函数的执行都会创建其对应的函数作用域，作用是：`作用域决定了内部变量的生命周期(即何时被释放)，以及哪一部分代码可以访问其中的变量`。

### 作用域的工作流程
1. 浏览器在首次载入脚本时，会创建全局执行上下文（`全局作用域`），并压入**执行栈**栈顶（`全局执行上下文是永远不会被弹出的`）；
2. 然后每进入其它作用域（即`函数作用域`）就创建对应的执行上下文并把它压入执行栈的顶部，一旦对应的上下文执行完毕，就从栈顶弹出，并将上下文控制权交给当前的执行栈。
3. 这样依次执行（最终都会回到全局执行上下文）。
4. 当前执行上下文执行完毕时，被弹出执行栈，然后如果其没有被引用（没有形成闭包），那么这个函数中用到的内存就会被垃圾处理器*自动回收*。


#### 例题：函数与变量提升
::: details 例题：函数与变量提升
这题就像脑筋急转弯：
```js
function Foo() {
    getName = function() {
        console.log(1)
    }
    return this
}

Foo.getName = function() {
    console.log(2)
}

Foo.prototype.getName = function() {
    console.log(3)
}

var getName = function() {
    console.log(4)
}

function getName() {
    console.log(5)
}

// 请写出如下输出结果：
Foo.getName()               // (1)
getName()                   // (2)
Foo().getName()             // (3)
getName()                   // (4)
new Foo.getName()           // (5)
new Foo().getName()         // (6)
new new Foo().getName()     // (7)
```
要解出这道题，关键要搞懂两个知识点：函数变量提升 与 运算优先级。
首先，输出4与5的两处是有变量提升的，提升后如下：
```js
// 提升到顶部
var getName;
function getName() {
    console.log(5)
}

function Foo() {
    getName = function() {
        console.log(1)
    }
    return this
}

Foo.getName = function() {
    console.log(2)
}

Foo.prototype.getName = function() {
    console.log(3)
}

// 声明提升到顶部，但函数体还在原处
getName = function() {
    console.log(4)
}

// 声明与函数体整体提升到顶部
// function getName() {
//     console.log(5)
// }
```
因此，(1)到(4)输出如下：
```js
Foo.getName()               // (1)：输出2，直接调用Foo的静态方法
getName()                   // (2)：输出4，由于赋值为4的函数体在最后执行，给getName最终赋值为4
Foo().getName()             // (3)：输出1，调用函数Foo，返回this，其中打印1的getName前面无var，这不是局部函数，而是对全局函数变量getName的重写赋值，所以这里输出的是全局的this。getName，输出1
getName()                   // (4)：输出1，由于前一步中对全局getName变量重新赋值为1，因此这里还是打印1
```
再考虑第二个关键知识点，运算符优先级：**`()` > `.` > `带参数New` > `无参数New`**，因此(5)到(7)输出如下：
```js
new Foo.getName()           // (5)：输出2，因为.的优先级大于new，先得出2，new 2，最终输出2
new Foo().getName()         // (6)：输出3，因为()的优先级大于. ，因此new Foo()先实例化得到foo，再计算foo.getName()，则会从原型上找到方法，输出3
new new Foo().getName()     // (7)：输出3，因为第二个new是带参数的new操作符，所以new Foo()先实例化得到foo，原式等价于new foo.getName()，先计算.操作符得到3，new 3，得到最终3
```
至此，最终结果为：
```js
// 请写出如下输出结果：
Foo.getName()               // (1)：2
getName()                   // (2)：4
Foo().getName()             // (3)：1
getName()                   // (4)：1
new Foo.getName()           // (5)：2
new Foo().getName()         // (6)：3
new new Foo().getName()     // (7)：3
```
:::
### 怎样理解“父作用域”
**注意**：函数的父级作用域是指函数定义的时候的父级作用域，不是指执行时候的父级作用域。
- 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含(父)环境，乃至全局环境;
- 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据;

## 作用域的重要属性（3个：变量对象VO，作用域链，this）：

### VO与AO
`变量对象VO`（Variable object，VO）是执行上下文的属性，`活动对象AO`（activation object）是当函数被调用者激活时创建的。
可以理解为：
- 在函数作用域中：VO === AO
- 在全局作用域中：VO === this === global

总的来说，VO中会存放一些变量信息（如声明的变量，函数，arguments参数等等）

### 作用域链有什么作用
- 当代码在一个环境中执行时，会创建关于变量对象的一个作用域链(scope chain)。
- 作用域链的用途，是`保证对执行环境有权访问的所有变量和函数的有序访问`。
    - 作用域链的前端，始终都是当前执行的代码所在环境的变量对象。
    - 如果这个环境是函数，则将其活动对象(activation object)作为变量对象。活动对象在最开始时只包含一个变量，即arguments 对象(这个对象在全局环境中是不存在的)。
    - 作用域链中的下一个变量对象来自包含(外部父)环境，而再下一个变量对象则来自下一个包含环境。
    - 这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。
- **解析标识符**的过程，是沿着作用域链一级一级地搜索标识符。搜索过程始终从作用域链的前端开始， 然后逐级地向上查找，直至找到标识符为止，如果在全局作用域依然没有找到，则报错。

### this指向问题
this是在运行时基于函数的执行环境绑定的，是由其调用方式决定的。

#### 绑定规则
1. `默认绑定`：绑定到全局对象window或global，在严格模式下绑定到undefined。
2. `隐式绑定`：由上下文对象调用，绑定到那个上下文对象（`谁调用，指向谁`）。
3. `主动绑定`：由call或者apply(或者bind)调用，绑定到指定的对象。
4. 由new调用：绑定到新创建的实例对象。

#### 例子及回退机制
1. 默认绑定
```js
function display(){
 console.log(this); // 'this' 将指向全局变量
}

display();
```
解析：这是一个普通的函数调用。在这种情况下，
display() 方法中的 this 在非严格模式下指向 window 或 global 对象。
在严格模式下，this 指向 undefined。

2. 隐式绑定
```js
var obj = {
 name: 'Saurabh',
 display: function(){
   console.log(this.name); // 'this' 指向 obj
  }
};

obj.display(); // Saurabh 
```
以上就是常规调用规则：谁调用，指向谁。

但是，当将这个函数引用赋值给其他变量，并使用这个新函数引用去调用该函数时，我们在 display() 中获得了不同的this值。
```js
var name = "uh oh! global";
var outerDisplay = obj.display;
outerDisplay(); // uh oh! global
```
当调用 outerDisplay() 时，我们没有指定一个具体的上下文对象。这是一个没有所有者对象的纯函数调用。在这种情况下，display() 内部的 this 值回退到默认绑定。现在这个 this 指向全局对象，在严格模式下，它指向 undefined。

::: warning 回退机制：隐式绑定 => 默认绑定
在将隐式绑定的函数**以回调的形式传递给**另一个`自定义函数`、`第三方库函数`或者像 `setTimeout 这样的内置JavaScript函数`时，都适用于上述情况，**回退到默认绑定规则**，例如：
```js
var name = "uh oh! global";

var obj = {
 name: 'Saurabh',
 display: function(){
   console.log(this.name); // 'this' 指向 obj
  }
};

setTimeout( obj.display, 1000 ); // uh oh! global
```
分析：当调用 setTimeout 时，JavaScript 在内部将 obj.display 赋给 setTimeout的回调参数 callback。这种**赋值操作会导致 display() 函数丢失其上下文**。当此函数最终在 setTimeout 函数里面被调用时，display()内部的 this 的值会退回至默认绑定。
:::

3. 主动绑定
```js
var name = "uh oh! global";
var obj = {
    ...
};

obj.display = obj.display.bind(obj); 
var outerDisplay = obj.display;

outerDisplay(); // Saurabh
```
分析：将 this 的值通过 bind() 方法绑定到对象上。即使我们将 obj.display 直接作为 callback 参数传递给函数，display() 内部的 this 也会正确地指向 obj。


#### 忘记使用new
如果你不是使用new来调用构造函数，那其实你就是在使用一个实函数。因此this就不会是你预期的值。this指向的就是window，而你将会创建全局变量（不过如果使用的是strict模式，那你还是会得到警告（this===undefined））。
```js
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// 此处忘记使用 new 了
var p = Point(7, 5);

console.log(p === undefined) // true
// 此时创建了全局变量
console.log(x); // 7
console.log(y); // 5
```

#### 例题1
```js
var name = 'tiger'

var handle = function() {
    var name = 'fintech'
    return `${name}-${this.name}`
}

var departments = {
    name: 'trade',
    getName: function() {
        return `${name}-${this.name}`
    },
    esop: {
        name: 'fe',
        getName: function() {
            return `${name}-${this.name}`
        },
    },
    other: {
        name: 'dev',
        getName: function() {
            return `${name}-${this.name}`
        },
    }
}

var getName = departments.getName;

console.log(handle()) // fintech-tiger
console.log(getName()) // tiger-tiger
console.log(departments.getName()) // tiger-trade，注意隐式绑定回退到默认
console.log(departments.esop.getName()) // tiger-fe
console.log(departments.other.getName()) // tiger-tiger
```

## 闭包

### 什么是闭包
是指有权访问另外一个函数作用域中的变量的函数。解决的问题是在局部作用域中的变量无法被外部访问，这时就可以通过在局部作用域（即这个函数）中创建另一个函数来访问原来这个函数中的变量。

### 创建闭包的常见方式（2种）
1. 在一个函数内部创建另外一个函数（通常通过return返回这个函数）；
2. 通过参数传递将一个函数传入另一个函数中；

### 闭包的缺点
1. 滥用闭包会造成内存的大量消耗；消耗内存是因为：
    - 正常情况，一个函数在调用开始执行时，创建其执行上下文及相应的作用域链，在函数执行结束后释放函数执行上下文及相应作用域链所占的空间。
    - 但是由于闭包函数可以访问外层函数中的变量，所以外层函数在执行结束后，其作用域活动对象并不会被释放（注意，外层函数执行结束后执行环境和对应的作用域链就会被销毁，但活动对象不能被销毁），而是被闭包函数的作用域链所引用，直到闭包函数被销毁后，外层函数的作用域活动对象才会被销毁（`原始数据是保存在栈内存中的，为什么会被闭包保存引用呢？实际上，被闭包引用的原始数据也被存在了堆内存中`）。这也正是闭包要占用内存的原因。
2. 使用闭包还有其他的副作用，可以说是bug，也可以说不是：这个副作用是闭包函数只能取到外层函数变量的最终值。这个问题可以通过立即执行函数解决。

## 模拟块级作用域
JS没有块级作用域，在其他类C的语言中，由花括号封闭的代码块都有自己的作用域，花括号的代码块执行完毕后，内部定义的变量随即被销毁。而JS中，花括号的外部依然能访问到花括号内部的变量，这会导致一些问题的出现。这就有了模拟块级作用域的方式：立即执行函数表达式IIFE（或者叫自执行匿名函数）。
以下两种方式都是IIFE的有效写法，其本质就是匿名函数的调用。
```js
(function() { /* code */ } ());
(function() { /* code */ })();
```
- 用圆括号()将匿名函数包裹，js的解释器就会把圆括号()中的内容当做表达式来解释，而后面的第二个圆括号()是执行函数调用的，它写在匿名函数圆括号外部和内部都可以达到同样的目的。
- IIFE可以用来解决闭包只能取到最终值的问题：
```js
function foo() {
    var res = new Array();
    for (var i = 0; i < 5; i++) {
        res[i] = function() {
            return i;
        };
    }

    return res;
}

foo() // 5 5 5 5 5
```
**闭包函数，只能取到i的最终值**：
- 函数在预解释阶段，都被当成字符串存入堆内存，在真正执行时，才会被拿出来执行。
- 数组中存储的，其实只是指向这个堆内存的指针，i并没有传进去，执行的时候i才被传进去。
- 每次循环中的函数都会在父层执行环境中寻找i，他们都保有这个变量 i的引用。
- 在预解释阶段执行结束（即循环结束），变量i的值自增为5，才到达函数执行阶段，此时每个函数返回的都是这个最终值5。

```js
function foo() {
    var res = new Array();
    for (var i = 0; i < 5; i++) {
        res[i] = (function(index) {
            return index;
        })(i)
    }

    return res;
}

foo() // 0 1 2 3 4
```

**通过IIFE解决闭包bug**：
- 用立即执行匿名函数包裹起原先的闭包函数，并在第二个()中传入i值，这里的i就是外部执行环境中的i；
- 由于`函数参数`是`按值传递`的，所以就会将变量 i 的当前值复制给形参index。
- 闭包引用的变量不会因为垃圾回收机制销毁，所以内部的匿名函数可以返回对应的index值。


## 垃圾回收机制
JS有垃圾处理器，所以无需开发者手动回收内存，而是由`垃圾处理器自动处理`。垃圾处理器对于那些执行完毕的函数，如果没有外部引用（被引用的话会形成闭包），则会回收。（当然一般会把回收动作切割到不同的时间段执行，防止影响性能）。
### 常用的两种垃圾回收规则
【标记清除】、引用计数
`js引擎基础垃圾回收机制是标记清除`。
- 标记清除：遍历所有可访问的对象并回收已不可访问的对象。
- 引用计数：记录对象被引用的次数，引用时+1，减持时-1，下次垃圾回收器会回收次数为0的对象的内存（容易出循环引用的bug造成内存泄漏）。

### 垃圾回收的时候有个难以避免的问题
垃圾回收时**停止响应其他操作**。JS的停止响应时间在100ms以上，对于游戏动画影响很大。

#### 优化：【分代回收】
避免垃圾回收造成长时间停止响应。区分“临时”与“持久”对象，多回收临时对象，少回收持久对象，减少每次需遍历的对象，从而缩短每次的垃圾回收耗时。Node V8引擎就是采用【分代回收】的，与Java一样。

### 什么会导致内存泄漏
内存泄漏指任何对象在你不再拥有或不再需要它之后仍然存在。【`循环引用`】和【`闭包`】会导致内存泄漏。只要闭包函数不被销毁，此对象就无法被垃圾回收。

