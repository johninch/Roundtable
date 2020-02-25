---
title: JS专题-变量与类型-(3)JS 其他引用类型
date: 2019-11-18 15:10:11
tags: [前端基础, 变量, 数据类型, 装箱拆箱]
categories: javascript
---

> 本文是在 ConardLi的“[【JS 进阶】你真的掌握变量和类型了吗](https://juejin.im/post/5cec1bcff265da1b8f1aa08f)”文章上的总结和扩展，集中记述了js中的变量和数据类型的相关知识点及应用场景，共分为5部分。

> 本文为“JS专题-变量与类型”的第3篇，3）JS 其他引用类型，主要关注常用的引用类型（Object、Array、Date、RegExp、Function）之外，三种包装类型（Boolean、Number、String）。

<!-- more -->

# 引用类型细分

在ES标准定义中，Object代表了引用类型，其实它的背后代表了很多引用类型变量，它们并不是由Object构造的，但是它们原型链的终点都是Object。

## 普通引用类型

- Object 对象
- Array 数组
- Date 日期
- RegExp 正则
- Function 函数

## 特殊引用类型：包装类型

- Boolean
- Number
- String

```js
true === new Boolean(true); // false
123 === new Number(123); // false
'ConardLi' === new String('ConardLi'); // false
console.log(typeof new String('ConardLi')); // object
console.log(typeof 'ConardLi'); // string
```

### 为什么要有包装类型（包装类型和原始类型的区别）？

> 引用类型和包装类型的主要区别就是**对象的生存期**。
> 使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而基本类型则只存在于一行代码的执行瞬间，然后立即被销毁，这意味着我们不能在运行时为基本类型添加属性和方法。

既然原始类型不能扩展属性和方法，为了便于操作基本类型值，ES就提供了上述3种包装类型。那么我们是如何使用原始类型调用方法的呢？这就要引出装箱与拆箱了。

### 装箱与拆箱

- 装箱转换：把基本类型转换为对应的包装类型
- 拆箱操作：把引用类型转换为基本类型

每当我们操作一个基础类型时，后台就会自动创建一个包装类型的对象，从而让我们能够调用一些方法和属性，例如下面的代码：

```js
var name = "ConardLi";
var name2 = name.substring(2);
```
实际上发生了以下几个过程：
1. 创建一个String的包装类型实例
2. 在实例上调用substring方法
3. 销毁实例

也就是说，我们使用基本类型调用方法，就会自动进行装箱和拆箱操作，相同的，我们使用Number和Boolean类型时，也会发生这个过程。

从引用类型到基本类型的转换，也就是拆箱的过程中，会遵循ECMAScript规范规定的`toPrimitive`原则来进行`抽象操作`，一般会调用引用类型的`valueOf`和`toString`。

### 自动拆箱规则（`toPrimitive` 转换规则）
- **默认情况下，执行这个抽象操作时会`先执行valueOf`方法，如果返回的不是原始值，会`继续执行toString`方法，如果返回的还不是原始值，那么会报错**;
- 如果有指定转换类型时，情况又会有所不同：
    - 引用类型转换为Number类型，先调用valueOf，再调用toString
    - 引用类型转换为String类型，先调用toString，再调用valueOf
    - 若valueOf和toString都不存在，或者没有返回基本类型，则抛出TypeError异常。
- 注意：valueOf和toString方法在Date，array等对象中有些是被重写过的，所以不同对象调用此方法可能产生的操作不同，如果没有这些方法，会调用最原始的Object.prototype上的valueOf和toString方法

### 主动拆箱装箱（显式类型转换）
除了上述程序中自动的拆箱装箱操作，我们也可以手动拆箱装箱：
```js
var num = new Number("123");  
console.log( typeof num.valueOf() ); //number
console.log( typeof num.toString() ); //string
```
