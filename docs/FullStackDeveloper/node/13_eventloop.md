# 13、EventLoop

## 为什么是事件循环

- JavaScript 的标准定义中，并没有事件循环的相关定义。Eventloop 其实是定义在 HTML 标准文档中的，用来协调浏览器端的多种事件源的，JavaScript 其实是需要遵守 eventloop 的定义，与其他事件源一起，在浏览器中工作的。即`JavaScript是被事件循环的`。
- 因此，与其说是 JavaScript 提供了事件循环，不如说是嵌入 JavaScript 的 user agent 需要通过事件循环来与多种事件源交互。

## 事件循环是什么

- 浏览器控制的，`外部队列（宏任务队列，Task Queue）`
- JavaScript 内部执行的，`内部队列（微任务队列，Microtask Queue）`
  - promise.then()与.catch()
  - MutationObserver 注册监听 dom 改变的回调
- **微任务是基于语言本身的，宏任务是基于宿主语言本身的。比如 Nodejs 中宿主是 libuv，而浏览器端宿主是 HTML。**

顺序就是：宏任务 =》微任务 =》渲染 =》下一个宏任务...

具体原理参考题库部分的知识就可以了。

## 浏览器与 Nodejs 的事件循环差异（`重点`）

根据本⽂开头我们讨论的事件循环起源，很容易理解为什么浏览器与 Node.js 的事件循环会存在差异。

- 如果说**浏览器端是将 JavaScript 集成到 HTML 的事件循环**之中，
- 那么 **Node.js 则是将 JavaScript 集成到 libuv 的 I/O 循环**之中。
  简⽽言之，⼆者都是把 JavaScript 集成到他们各⾃的环境中，但是 HTML (浏览器端) 与 libuv (服务端) ⾯对的场景有很⼤的差异。

::: tip `直观差异`

1. Nodejs 事件循环的过程没有 HTML 渲染。只有 外部队列 和 内部队列 两个部分。
2. Nodejs 事件循环外部队列的事件源不同。Node.js 端没有了鼠标等外设，但是新增了文件等 IO。
3. Nodejs 事件循环内部队列的事件仅剩下 Promise 的 then 和 catch。
   :::

至于`内在的差异`，有一个很重要的地⽅是：
::: warning 内在的差异
Node.js (libuv)在最初设计的时候，是允许执行多次外部事件再切换到内部队列的，而浏览器端一次事件循环只允许执行⼀次外部事件。
:::

这个经典的内在差异，可以通过⼀一个例子来观察：

```js
setTimeout(() => {
	console.log("1");
	Promise.resolve().then(function() {
		console.log("2");
	});
});
setTimeout(() => {
	console.log("3");
	Promise.resolve().then(function() {
		console.log("4");
	});
});
```

执行分析：

- 在浏览器端，输出为 1234；
- 而在 Node@11 及之前，输出为 1324。即在 Node@11 及以前的版本环境中，外部队列事件可以一次执行多个（即外部事件先全执行完，再去执行内部队列）。

这个问题是 Nodejs 的设计者有意为之，但是却导致了很多既能在浏览器端，又能在 Nodejs 端运行的第三方库执行出错。所以 Nodejs 在 Version 11 之后的版本（v12 就修复了）修复了这个问题。

另外，`Nodejs的外部队列`中是有自己的顺序的：

```js
// 外部队列包括以下部分，从上到下顺序循环
   ┌───────────────────────────┐
┌─>│       timers（setTimeout） │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll 轮询阶段    │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │       check（setImmediate）│
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

**setImmediate 这个外部队列宏任务，目前是 Node.js 独有的，浏览器端没有。**

```js
setTimeout(() => {
	console.log("1");
	Promise.resolve().then(() => console.log("2"));
});
setImmediate(() => {
	console.log("3");
	Promise.resolve().then(() => console.log("4"));
});
setTimeout(() => {
	console.log("5");
	Promise.resolve().then(() => console.log("6"));
});
setImmediate(() => {
	console.log("7");
	Promise.resolve().then(() => console.log("8"));
});
```

执行分析：

- 在浏览器端，会报错，因为浏览器没有 setImmediate；
- 而在 Nodejs@11 及之前，输出为 15263748；
- 在 Nodejs@12，输出为 12563478（这个也是不准的，有可能 setImmediate 比 setTimeout 早执行，比如输出 12347856）。

::: warning 为什么`有可能`setImmediate 比 setTimeout 早执行？

- setImmediate 是立即执行的意思，在 check 阶段。setTimeout 是定时器，是在 timer 阶段。
- setImmediate 的引⼊是为了解决 setTimeout 的精度问题： - 由于 setTimeout 指定的延迟时间是毫秒(ms)，但对于计算机来说，1ms 内可以做非常多的事情，setImmediate 就可以在微秒或纳秒级执行。 - 简单讲就是：setImmediate 可以更快执行。 - 因此： - 当大于 1ms 时，setTimeout 肯定是先于 setImmediate 执行的。 - 但是当小于 1ms 时，也就是 setTimeout 0 时，是有一定的概率，setImmediate 会先执行的。
  :::

待探究的知识点：_process.nextTick()从技术上讲不是事件循环的一部分，process.nextTick() 比 setImmediate() 触发得更快。建议开发人员在所有情况下都使用 setImmediate()，因为它更容易理解。_

nextTick 队列是会优先于微任务队列清空的。
