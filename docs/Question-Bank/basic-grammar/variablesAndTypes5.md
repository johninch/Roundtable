---
title: JS专题-变量与类型-(5)JS的类型判断方法
date: 2019-11-21 19:33:29
tags: [前端基础, 变量, 数据类型, 类型判断]
categories: javascript
---

> 本文是在 ConardLi的“[【JS 进阶】你真的掌握变量和类型了吗](https://juejin.im/post/5cec1bcff265da1b8f1aa08f)”文章上的总结和扩展，集中记述了js中的变量和数据类型的相关知识点及应用场景，共分为5部分。

> 本文为“JS专题-变量与类型”的第5篇，5）JS的类型判断方法，推荐使用 `typeof`、`Object.prototype.toString.call()`，不要用`instanceof`。

<!-- more -->

# JS的类型判断方法

推荐使用 `typeof`、`Object.prototype.toString.call()`，不要用`instanceof`。

## typeof

**typeof可以用来准确判断**
- 除`null以外的原始类型`
- 以及`function`这种引用类型
```js
typeof 'ConardLi'  // string
typeof 123  // number
typeof true  // boolean
typeof Symbol()  // symbol
typeof undefined  // undefined

typeof function(){}  // function
```
**typeof不适用于判断**
- 大部分引用类型（除了上面的function类型）
- 原始类型 null
```js
typeof [] // object
typeof {} // object
typeof new Date() // object
typeof /^\d*$/; // object

typeof null // object  初版Js就留下来的bug
```

::: warning null不是一个对象，但为什么typeof null === object?
原理是这样的，不同的对象在底层都会表示为二进制，在`js中如果二进制的前三位都为0`，就会被判断为**object类型**，`null的二进制全为0`，自然前三位也是0，所以typeof null === objcet。
:::

## instanceof

::: warning
首先要明确一点的是：**使用instanceof来检测数据类型不是它的设计初衷**，它`不能检测原始数据类型`，且`对于引用类型的判断也不准确`。
:::

它可以判断一些引用类型，原理是通过原型链：
```js
[] instanceof Array // true
new Date() instanceof Date // true
new RegExp() instanceof RegExp // true
```
简单回顾下原型链的规则：
- 1.`所有引用类型都具有对象特性`，即可以自由扩展属性
- 2.所有引用类型都具有一个`__proto__（隐式原型）`属性，是一个普通对象
- 3.所有的**函数**都具有`prototype（显式原型）`属性，也是一个普通对象
- 4.所有引用类型`__proto__`值指向它构造函数的`prototype`
- 5.当试图得到一个对象的属性时，如果变量本身没有这个属性，则会去他的`__proto__`中去找

`[] instanceof Array`是用来判断 对象[] 是否是构造函数 Array 的实例。其原理是根据 实例对象[] 的__proto__属性 与 构造函数 Array 的prototype属性 `是否引用的是同一个原型对象地址来判断`的。

`[] instanceof Array`实际上是判断`Array.prototype`是否在`[]`的原型链上，但在这条原型链上的构造函数都是实例对象的构造函数，因此通过原型来判断就会造成误差：
```js
[] instanceof Object // true
function(){}  instanceof Object // true
```

> 顺便想一下：怎样判断一个实例对象的直接构造函数是谁呢？
>> 只能通过原型对象的constructor属性来判断是否：`o.__proto__.constructor === M`
>>> 注意：o.__proto__.constructor与o.constructor是一样的，其实本质就是通过原型链找到constructor属性。

## toString

- 在拆箱操作中提到了toString函数，我们可以调用它实现从引用类型的转换。
- 每一个引用类型都有toString方法，默认情况下，toString()方法被每个Object对象继承。`如果此方法在自定义对象中未被覆盖`，toString() 返回 **"[object type]"**，其中type是对象的类型。
- 上面提到了`如果此方法在自定义对象中未被覆盖`，toString才会达到预想的效果，事实上，大部分引用类型比如`Array、Date、RegExp`等**都重写了toString方法**。
- 我们可以直接调用Object原型上未被覆盖的toString()方法，使用`call来改变this`指向来达到我们想要的效果。

![Object.prototype.toString.call()](./images/variablesAndTypes/Object.prototype.toString.call.png)

