---
{
    "title": "async/await 原理及执行顺序分析",
}
---
#### [原网页连连接](https://juejin.im/post/5d2d19ccf265da1b7f29b05f)

### async 是Generator函数的语法糖，并对Generator函数进行了改进。 

### Generator函数简介

Generator 函数是一个状态机，封装了多个内部状态。执行Generator函数会返回一个[遍历器对象](http://es6.ruanyifeng.com/#docs/iterator)，可以依次遍历Generator函数的每一个状态，
但是只有调用`next`方法才能遍历到下一个状态，所以其实提供了一种暂停执行函数，`yield`表达式就是暂停标志。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }
```
可以看出，helloWorldGenerator函数被调用时并没有执行，而是返回了一个遍历器对象，只有调用`next`方法、内部指针指向该语句时才执行，每次调用next方法，就回返回一个对象包含`value`和
`done`两个属性，`value`属性表示内部状态的值，是yield表达式后面表达式的值；`done`属性是个布尔值，表示是否遍历结束。即实现了`函数可以暂停，也可恢复执行`

### Generator暂停恢复执行原理

要懂得原理，得了解协程的概念

>一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），
>等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

协程是一种比线程更加轻量级的存在。

