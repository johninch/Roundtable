---
title: 任务队列 与 Event Loop
tags: [任务队列, 事件循环, Macro Task, Micro Task]
categories: execution
---

# 任务队列 与 Event Loop

## 如何理解 JS 的单线程

传送门[两个问题](/Question-Bank/browser/browser-mechanism.md#两个问题)

## 什么是 Event Loop（事件循环）

- js 分为两种任务，一种是`同步任务`（synchronous），另一种是`异步任务`（asynchronous）。
- 同步任务都在`JS引擎线程`上执行，形成一个`执行栈`；
- js 通过「任务队列」来实现异步回调，`事件触发线程`管理一个`任务队列`（task queue）；
- 异步任务触发条件达成，会由`定时器线程`或`异步http请求线程`将`回调事件`放到任务队列中；
- 执行栈中所有同步任务执行完毕，此时**JS 引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中**，开始执行。这个过程不断重复。

### 从事件循环的角度简述：setTimeout/setInterval 和 XHR/fetch 到底做了什么事

- 不管是`setTimeout/setInterval`和`XHR/fetch`代码，在这些代码执行时，本身是同步任务，而其中的回调函数才是异步任务。
- 当代码执行到`setTimeout/setInterval`时，实际上是`JS引擎线程`通知`定时器线程`，间隔一个时间后，会触发一个回调事件，而定时器线程在接收到这个消息后，会在等待的时间后，**将回调事件放入到由事件触发线程所管理的事件队列中**。
- 当代码执行到`XHR/fetch`时，实际上是`JS引擎线程`通知`异步http请求线程`，发送一个网络请求，并制定请求完成后的回调事件，而异步 http 请求线程在接收到这个消息后，会在请求成功后，**将回调事件放入到由事件触发线程所管理的事件队列中**。
- 当我们的同步任务执行完，JS 引擎线程会询问事件触发线程，在事件队列中是否有待执行的回调函数，如果有就会加入到执行栈中交给 JS 引擎线程执行。

### 宏任务 与 微任务

- Call Stack（主线程调用栈）的执行单位是 Task。Task 分两类 `Macro Task（宏任务）` 和 `Micro Task（微任务）`。
- 宏任务：每次执行栈执行的代码当做是一个宏任务，无论是同步任务还是从任务队列中拿取的异步回调。
- 微任务：可以理解成在当前宏任务执行结束时，立即执行的任务，这些微任务是在当前宏任务执行期间所产生的。

#### 常见宏任务

- setTimeout
- setInterval
- setImmediate
- UI rendering（比如一些改变页面 css 的 js 代码任务）
- script
- I/O

#### 常见微任务

- Promise.then()或 catch()
- Promise 为基础开发的其它技术，比如 fetch API
- process.nextTick（Node 独有的）
- V8 的垃圾回收过程
- MutationObserver

#### JS 引擎线程(宏任务微任务) 与 GUI 渲染线程 的互斥执行顺序

::: tip 顺序
宏任务-->(可能由当前宏任务所产生的微任务)-->渲染-->宏任务-->(可能由当前宏任务所产生的微任务)-->渲染-->...
:::

::: details 栗子们

1. 例子 1

```js
document.body.style = "background:black";
document.body.style = "background:red";
document.body.style = "background:blue";
document.body.style = "background:grey";
```

- 现象：页面背景会在瞬间变成灰色。
- 解释：因为以上代码属于`同一次宏任务`，全部执行完再一次性渲染。

2. 例子 2

```js
document.body.style = "background:blue";
setTimeout(function() {
	document.body.style = "background:black";
}, 0);
```

- 现象：页面背景先变为蓝色，然后瞬间变为黑色。
- 解释：因为以上代码属于`两次宏任务`，第一次宏任务执行完就会先渲染一次，再执行下一次宏任务，然后第二次渲染。

3. 例子 3

```js
document.body.style = "background:blue";
console.log(1);
Promise.resolve().then(() => {
	console.log(2);
	document.body.style = "background:black";
});
console.log(3);

// print 1 3 2
```

- 现象：控制台输出 1 3 2，页面背景直接变为黑色。
- 解释：因为以上代码属于`一次宏任务，且有微任务`，blue、log(1)、promise.resolve、log(3)本身都是同步任务，属于一次宏任务，执行完后，紧接着要执行异步的 promise.then 这个微任务，输出 2 且执行 black，最后才执行渲染。

4. 例子 4

```js
setTimeout(() => {
	console.log(1);
	Promise.resolve(3).then(data => console.log(data));
}, 0);

setTimeout(() => {
	console.log(2);
}, 0);

// print 1 3 2
```

- 现象：控制台输出 1 3 2。
- 解释：因为以上代码属于`两个宏任务，且第一个宏任务产生了微任务`，所以执行顺序是 宏任务->微任务->宏任务，分别输出 1 3 2。
  :::

### Promise.then 为什么早于 setTimeout 执行

```js
// 例子1
setTimeout(() => console.log("a"), 0);

let p = new Promise(resolve => {
	console.log("b");
	resolve();
});

p.then(() => console.log("c"));
p.then(() => console.log("d"));

console.log("e");

// b e c d a
```

**解释**：首先 new Promise 和 console.log 都是同步任务，是在执行栈同步执行的，所以输出 b e，且在创建实例 p 时，就 resolve()了，因此宏任务产生了与其对应的微任务（p.then），在此次宏任务执行完时会立即执行微任务输出 c d，最后执行第二个宏任务 settimeout 的回调，输出 a。

```js
// 例子2
(function test() {
	setTimeout(() => console.log(4), 0);
	new Promise(resolve => {
		console.log(1);
		for (var i = 0; i < 10000; i++) {
			i === 9999 && resolve();
		}
		console.log(2);
	}).then(() => {
		console.log(5);
	});
	console.log(3);
})();

// 1 2 3 5 4
```

**解释**：与例子 1 类似，注意 for 循环与 2、3 输出都是同步任务，虽然 for 循环先执行到 resolve，但 then 是异步任务，是在第一次宏任务执行完后才执行的微任务，所以是 1235，最后是第二个宏任务定时器回调。

#### setTimeout(fn, 0)的含义

指定某个任务在主线程最早可得的空闲时间执行，也就是说，`尽可能早得执行`。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。0 不是 0 秒，之前最小是 10 毫秒，现在最小是 4 毫秒。

> 对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。

###

参考链接：
[从多线程到 Event Loop 全面梳理](https://juejin.im/post/5d5b4c2df265da03dd3d73e5#heading-11)
