---
title: 异步编程（2）：Promise对象
tags: [Promise]
categories: execution
---

# 异步编程（2）：Promise对象

## 定义及使用
- Promise就是‘承诺’在某个逻辑时间点执行异步操作。有三种状态：pending(进行中)、fulfilled (已完成)、rejected(已失败)。
- Promise状态改变只有两种情况：pending => fulfilled (初始态到成功态)、pending => reject (初始态到失败态度)

new Promise()实例需要传一个function，包含两个参数，类型都是function，分别是resolve函数和reject函数。Promise实例状态为成功时会调用`resolve方法`；状态为失败时调用`reject方法`。

## 特点

- 即只有异步操作的结果可以决定当前是哪一种状态，任何外界操作都无法改变这个状态；
- 状态一经改变就凝固了，不会再变，之后任何时候都可以得到这结果，即使添加更多的回调函数也会立即得到这结果。

- promise一旦建立就无法取消，并会立即执行；
- 如果不设置回调函数，promise内部抛出的错误外边无法获取到；
- promise处于pending状态时，不知道promise执行的具体进度（刚开始执行还是快要执行结束）

## 核心方法
1. `Promise.prototype.then()`：
    - 作用是为 Promise 实例添加状态改变时的回调函数。then()接受两个参数，第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
    - then方法返回的是一个**新的Promise实例**（注意，不是原来那个Promise实例）。因此可以实现Promise的链式调用，即then方法后面再调用另一个then方法。链式调用的特点是无论第一个then是成功还是失败，都将它的返回值作为下一次成功回调函数的参数。（注意：如果只完成链式调用，其本质上只需将this返回出去即可。这里实现的是链式Promise调用，所以每次then都会返回一个新的promise）。

2. `Promise.prototype.catch()`
    - Promise.prototype.catch()方法是.then(null, rejection)的别名，指定错误发生时的回调函数。

3. Promise.all()
    - Promise.all用于将多个Promise实例包装成新的Promise实例p。接收的参数数组[p1, p2, p3]均为Promise实例，如果不是就转换成Promise实例。
    - 只有数组中所有实例状态都变为Fulfilled，总的实例p的状态才会变为Fulfilled；
    只要数组中有一个实例状态被Rejected，总的实例p的状态就变为Rejected。
4. Promise.race()
    - 与all()相对应的方法。Promise.race用于将多个Promise实例包装成一个新的实例。
    只要有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的实例返回值，就传递给p的回调函数。
5. Promise.resolve()
    - 将现有对象转换为Promise对象。如果Promise.resolve方法的参数不是具有then方法的对象，则返回一个新的Promise，其状态为Resolved。
6. Promise.reject()
    - Promise.reject(reason)也会返回一个新的Promise实例，状态为Rejected。Promise.reject方法的参数reason会被传递给实例的回调函数。

## 实现 Promise.finally

> finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作，使用方法如下
```js
Promise
    .then(res => {...})
    .catch(err => {...})
    .finally(() => {...})
```
> finally不接收任何参数；finally本质上是then的特例。

```js
Promise.prototype.finally = function(callback) {
    let P = this.constructor

    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason;
        })
    )
}
```

## Promise本质
- Promise的概念并不是ES6新出的，而是ES6统一了用法，写进了语言标准，原生提供了Promise对象。
- Promise的写法只是回调函数的改进，使用then()之后，异步任务的两段执行看得更清楚，除此之外`并无新意`。撇开优点，Promise的最大问题就是代码冗余，原来的任务被Promise包装一下，不管什么操作，一眼看上去都是一堆then()，原本的语意变得很不清楚。



