# 从多线程到 Event Loop 全面梳理

## 浏览器内核（渲染进程）

渲染进程包含以下线程：

- **GUI 渲染线程**

  - 负责渲染页面，布局和绘制;
  - 页面需要重绘和回流时，该线程就会执行;
  - 与 js 引擎线程互斥，防止渲染结果不可预期;

- **JS 引擎线程**

  - 负责处理解析和执行 javascript 脚本程序
  - 只有一个 JS 引擎线程（单线程）
  - 与 GUI 渲染线程互斥，防止渲染结果不可预期

- **事件触发线程**

  - 用来控制事件循环（鼠标点击、setTimeout、ajax 等）
  - 当事件满足触发条件时，将事件放入到 JS 引擎所在的执行队列中

- **定时触发器线程**

  - setInterval 与 setTimeout 所在的线程
  - 定时任务并不是由 JS 引擎计时的，是由定时触发线程来计时的
  - 计时完毕后，通知事件触发线程

- **异步 http 请求线程**
  - 浏览器有一个单独的线程用于处理 AJAX 请求
  - 当请求完成时，若有回调函数，通知事件触发线程

## 从 Event Loop 看 JS 的运行机制

- JS 分为同步任务和异步任务
- 同步任务都在 JS 引擎线程上执行，形成一个执行栈
- 事件触发线程管理一个任务队列，异步任务触发条件达成，将回调事件放到任务队列中
- 执行栈中所有同步任务执行完毕，此时 JS 引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行

## 宏任务、微任务

#### 什么是宏任务

- 我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。
- 主代码块，setTimeout，setInterval 等，都属于宏任务。

- 举个例子

```js
document.body.style = "background:black";
document.body.style = "background:red";
document.body.style = "background:blue";
document.body.style = "background:grey";
```

![](https://user-gold-cdn.xitu.io/2019/8/20/16caca3e44d7d357?imageslim)
页面背景会在瞬间变成灰色，以上代码属于同一次宏任务，所以全部执行完才触发页面渲染，渲染时 GUI 线程会将所有 UI 改动优化合并，所以视觉效果上，只会看到页面变成灰色。

- 第二个例子

```js
document.body.style = "background:blue";
setTimeout(function() {
	document.body.style = "background:black";
}, 0);
```

![](https://user-gold-cdn.xitu.io/2019/8/20/16caca3ed44e6b16?imageslim)

- 页面先显示成蓝色背景，然后瞬间变成了黑色背景，这是因为以上代码属于两次**宏任务**；
- 第一次宏任务执行的代码是将背景变成蓝色，然后触发渲染，将页面变成蓝色；
- 再触发第二次宏任务将背景变成黑色。

#### 什么是微任务

- 微任务可以理解成在当前宏任务执行后立即执行的任务。
- 当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完。
- Promise，process.nextTick 等，属于微任务。

- 第一个例子

```js
document.body.style = "background:blue";
console.log(1);
Promise.resolve().then(() => {
	console.log(2);
	document.body.style = "background:black";
});
console.log(3);
```

![](https://user-gold-cdn.xitu.io/2019/8/20/16cad85d2378ccb5?imageslim)
页面的背景色直接变成黑色，没有经过蓝色的阶段，是因为，我们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，然后才执行的渲染

- 第二个例子

```js
setTimeout(() => {
	console.log(1);
	Promise.resolve(3).then(data => console.log(data));
}, 0);

setTimeout(() => {
	console.log(2);
}, 0);

// print : 1 3 2
```

- 上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有**两个宏任务**，
- 其中第一个宏任务执行中，输出 1 ，并且创建了微任务队列，
- 所以在下一个宏任务队列执行前，先执行微任务，在微任务执行中，输出 3 ，
- 微任务执行后，执行下一次宏任务，执行中输出 2

## 总结

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

参考链接：[从多线程到 Event Loop 全面梳理](https://juejin.im/post/5d5b4c2df265da03dd3d73e5#heading-11)
