---
title: async/await 用法整理
date: 2019-10-29 21:04:44
tags: [ES6, 异步]
categories: javascript
---

# async/await 用法整理

它最受欢迎的地方：**能让异步代码写起来像同步代码，并且方便控制顺序。**

## 1、async/await 概念解释

- async
    > async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行，async 函数返回的是一个promise 对象。

- await
   > await的含义为等待。意思就是代码需要等待await后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。



## 2、async函数是Generator函数的语法糖，并对Generator函数进行了改进。

### Generator函数

#### *简介*

- Generator 函数是一个状态机，封装了多个内部状态。执行Generator函数会返回一个[遍历器对象](http://es6.ruanyifeng.com/#docs/iterator)，可以依次遍历Generator函数的每一个状态，
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
`done`两个属性，`value`属性表示内部状态的值，是yield表达式后面表达式返回的值；`done`属性是个布尔值，表示是否遍历结束。即实现了`函数可以暂停，也可恢复执行`

#### *Generator暂停恢复执行原理*

要懂得原理，得了解协程的概念

>一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），
>等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

协程是一种比线程更加轻量级的存在。普通线程是抢先式的，会争夺cpu资源，而协程是合作的，可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程。它的运行流程大致如下：

1. 协程A开始执行
2. 协程A执行到某个阶段，进入暂停，执行权转移到协程B
3. 协程B执行完成或暂停，将执行权交还A
4. 协程A恢复执行

协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

#### *执行器*

通常，我们把执行生成器的代码封装成一个函数，并把这个执行生成器代码的函数称为执行器,`co` 模块就是一个著名的执行器。

Generator 是一个异步操作的容器。它是需要手动执行的，它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。两种方法可以做到这一点：

    1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
    2. Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权
    
   
一个基于 Promise 对象的简单自动执行器：

```javascript
function run(gen) {
  var g = gen();
  
  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(() => {
      next(data)
    })
  }
  
  next()
}

使用：
function* foo() {
    let response1 = yield fetch('https://xxx') //返回promise对象
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://xxx') //返回promise对象
    console.log('response2')
    console.log(response2)
}
run(foo);
```
上面代码中，只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。

#### *async的改进*

async彻底告别了执行器和生成器，实现更加直观简洁的代码，async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。可以说async 是Generator函数的语法糖，并对Generator函数进行了改进。
                              
async函数对 Generator 函数的改进，体现在以下四点：

    1. 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。
    2. 更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
    3. 更广的适用性。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
    4. 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

## 2、async/await 与 promise 相比的优势

1. **同步代码编写方式**:
    - 用同步的思维来解决异步问题的方案。
    - Promise使用then函数进行链式调用，一直点点点，是一种从左向右的横向写法；
    - async/await从上到下，顺序执行，就像写同步代码一样，更符合代码编写习惯。

2. **多个参数传递**:
    - Promise的then函数只能传递一个参数，虽然可以通过包装成对象来传递多个参数，但是会导致传递冗余信息，比较麻烦；
    - async/await没有这个限制，可以当做普通的局部变量来处理，用let或者const定义的块级变量想怎么用就怎么用，完全没有限制；

3. **同步代码和异步代码可以一起编写**:
    - 使用Promise的时候最好将同步代码和异步代码放在不同的then节点中，这样结构更加清晰；
    - async/await整个书写习惯都是同步的，不需要纠结同步和异步的区别，当然，异步过程需要包装成一个Promise对象放在await关键字后面；

4. **基于协程**:
    - Promise是根据函数式编程的范式，对异步过程进行了一层封装；
    - async/await基于协程的机制，是真正的“保存上下文，控制权切换……控制权恢复，取回上下文”这种机制，是对异步过程更精确的一种描述；

5. ✨**这点并不是优势也不算劣势（只能串行）**:
    它不能取代 Promise，尤其是我们可以很方便地用Promise.all()来实现并发，而async/await只能实现串行。

## 3、async关键字

> async函数执行和普通函数一样，函数名带个()就可以了，参数个数随意，没有限制，也需要有async关键字；只是返回值是一个Promise对象，可以用then函数得到返回值，用catch抓整个流程中发生的错误；

```js
async function testAsync() {
    return "hello async";
}

const result = testAsync(); // 返回一个Promise对象
console.log(result);
// async函数返回的是一个Promise对象，async函数（包括函数语句、函数表达式、Lambda表
// 达式）会返回一个Promise对象，如果在函数中return一个直接量，async会把这个直接量通
// 过Promise.resolve() 封装成 Promise 对象；


// async函数返回的是一个Promise对象，所以在最外层不能用await获取其返回值的情况，
// 应该使用原始的方式：then()链来处理这个Promise对象
testAsync().then(v => {
    console.log(v);    // 输出 hello async
});
```

1. **表明程序里面可能有异步过程：**
    - async关键字表明程序里面可能有异步过程，里面可以有await关键字；
    - 当然全部是同步代码也没关系，但是这样async关键字就显得多余了；

2. **非阻塞，无等待：**
    - async函数里面如果有异步过程会等待，但是```async函数本身会马上返回```，不会阻塞当前线程;
    - 可以简单认为，async函数工作在主线程，同步执行，不会阻塞界面渲染，async函数内部由await关键字修饰的异步过程，工作在相应的协程上，会阻塞等待异步任务的完成再返回；
    - 在没有await的情况下执行async函数，它会立即执行，返回一个Promise对象，并且绝对不会阻塞后面的语句，这和普通返回Promise对象的函数并无二致；

3. **async函数返回类型为Promise对象：**
    这是和普通函数本质上不同的地方，也是使用时重点注意的地方；
    - （1）return newPromise()；这个符合async函数本意；
    - （2）return data；这个是同步函数的写法，这里是要特别注意的，这个时候，其实就相当于Promise.resolve(data)；还是一个Promise对象，但是在调用async函数的地方通过简单的=是拿不到这个data的，因为返回值是一个Promise对象，所以需要用.then(data => { })函数才可以拿到这个data；
    - （3）如果没有返回值，相当于返回了Promise.resolve(undefined)；

4. **async统一catch，await不处理异步error：**
    async函数返回的这个Promise对象的catch函数负责统一抓取内部所有异步过程的错误，await是不管异步过程的reject(error)消息的；

## 4、await关键字

1. **await只能在async函数内部使用：**
    不能放在普通函数里面，否则会报错；

2. **await后面也可以跟同步代码：**
    不过系统会自动将其转化成一个Promsie对象，比如：
    ```js
    const a = await 'hello world'

    // 相当于
    const a = await Promise.resolve('hello world');

    // 跟同步代码是一样的，还不如省事点，直接去掉await关键字
    const a = 'hello world';
    ```
3. ✨**await对于失败消息的处理：**
    await只关心异步过程成功的消息resolve(data)，拿到相应的数据data，至于失败消息reject(error)，不关心不处理；对于错误的处理有以下几种方法供选择：
    1. 让await后面的Promise对象自己catch；
    2. 也可以让外面的async函数返回的Promise对象统一catch；
    3. 像同步代码一样，放在一个try...catch结构中；
    ```js
    // 这是React Native的回调函数，加个async关键字，没有任何影响，但是可以用await关键字
    async componentDidMount() {
        // 将异步和同步的代码放在一个try..catch中，异常都能抓到
        try {
            let array = null;
            let data = await asyncFunction();  // 这里用await关键字，就能拿到结果值；否则，没有await的话，只能拿到Promise对象
            if (array.length > 0) {  // 这里会抛出异常，下面的catch也能抓到
                array.push(data);
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }
    ```
## 5、使用方式实践

### （1）像写同步代码那样，定义异步流程

```js
// 异步过程封装
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('sleep for ' + ms + ' ms');
        }, ms);
    });
}

// 定义异步流程，就像写同步代码那样
async function asyncFunction() {
    console.time('asyncFunction total executing:');
    const sleep1 = await sleep(2000);
    console.log('sleep1: ' + sleep1);
    const [sleep2, sleep3, sleep4]= await Promise.all([sleep(2000), sleep(1000), sleep(1500)]);
    console.log('sleep2: ' + sleep2);
    console.log('sleep3: ' + sleep3);
    console.log('sleep4: ' + sleep4);
    const sleepRace = await Promise.race([sleep(3000), sleep(1000), sleep(1000)]);
    console.log('sleep race: ' + sleepRace);
    console.timeEnd('asyncFunction total executing:');
    
    return 'asyncFunction done.'  // 这个可以不返回，这里只是做个标记，为了显示流程
}

// 像普通函数调用async函数，在then函数中获取整个流程的返回信息，
// 在catch函数统一处理出错信息
asyncFunction().then(data => {
    // asyncFunction return 的内容在这里获取: 'asyncFunction done.'
    console.log(data);
}).catch(error => {
    // asyncFunction 的错误统一在这里抓取
    console.log(error);
});

// 这个代表asyncFunction函数后的代码，
// 显示asyncFunction本身会立即返回，不会阻塞主线程
console.log('after asyncFunction code executing....');

```

```js
// 执行结果
after asyncFunction code executing....
sleep1: sleep for 2000 ms
sleep2: sleep for 2000 ms
sleep3: sleep for 1000 ms
sleep4: sleep for 1500 ms
sleep race: sleep for 1000 ms
asyncFunction total executing:: 5006.276123046875ms
asyncFunction done.

// console输出：
Promise {<pending>}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: "asyncFunction done."
VM12229:5 sleep1: sleep for 2000 ms
VM12229:7 sleep2: sleep for 2000 ms
VM12229:8 sleep3: sleep for 1000 ms
VM12229:9 sleep4: sleep for 1500 ms
VM12229:11 sleep race: sleep for 1000 ms
VM12229:12 asyncFunction total executing:: 5004.796875ms
```
代码分析：
- after asyncFunction code executing....代码位置在async函数asyncFunction()调用之后，反而先输出，这说明async函数asyncFunction()调用之后会马上返回，不会阻塞主线程；
- sleep1: sleep for 2000 ms这是第一个await之后的第一个异步过程，最先执行，也最先完成，说明后面的代码，不论是同步和异步，都在等他执行完毕；
- sleep2 ~ sleep4这是第二个await之后的Promise.all()异步过程，这是“比慢模式”，三个sleep都完成后，再运行下面的代码，耗时最长的是2000ms；
- sleep race: sleep for 1000 ms这是第三个await之后的Promise.race()异步过程，这是“比快模式”，耗时最短sleep都完成后，就运行下面的代码，耗时最短的是1000ms；
- asyncFunction total executing:: 5006.276123046875ms这是最后的统计总共运行时间代码，三个await之后的异步过程之和：
    > 1000（独立的） + 2000（Promise.all） + 1000（Promise.race） = 5000ms
- 这个和统计出来的5006.276123046875ms非常接近，说明上面的异步过程，和同步代码执行过程一致，协程真的是在等待异步过程执行完毕；
- asyncFunction done.这个是async函数返回的信息，在执行时的then函数中获得，说明整个流程完毕之后参数传递的过程；

### （2）顺序执行，结果作为下一次输入

```js
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}

```

```js
// Promise方式调用
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

```js
// async/await方式调用
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```

### （3）中间参数需要保留

```js
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}
```

```js
// Promise方式调用
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// step1 with 300
// step2 with 300 and 500
// step3 with 300, 500 and 1000
// result is 2000
// doIt: 2913.488037109375ms
```
> 注意：这里为什么不能直接这样写promise式调用，因为中间参数 time2、time3都没有办法保存
```js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time1, time2))
        .then(time3 => step3(time1, time2, time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
```

```js
// async/await方式调用
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();

// step1 with 300
// step2 with 300 and 500
// step3 with 300, 500 and 1000
// result is 2000
// doIt: 2913.488037109375ms
```

## 6、关于协程

<details>
<summary>关于协程</summary>

- 进程>线程>协程

- 协程的第一大优势是具有极高的执行效率，因为子程序切换不是线程切换，而是由程序自身控制，因此没有线程切换的开销，和多线程比，线程数量越多，协程的性能优势就越明显；

- 协程的第二大优势是不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多；

- 协程看上去也是子程序，但执行过程中，在子程序内部可中断，然后转而执行别的子程序，在适当的时候再返回来接着执行，需要注意的是：在一个子程序中中断，去执行其他子程序，这并不是函数调用，有点类似于CPU的中断；
    > 用汽车和公路举个例子：js公路只是单行道（主线程），但是有很多车道（辅助线程）都可以汇入车流（异步任务完成后回调进入主线程的任务队列）；generator把js公路变成了多车道（协程实现），但是同一时间只有一个车道上的车能开（依然单线程），不过可以自由变道（移交控制权）；

- 协程意思是多个线程互相协作，完成异步任务，运行流程大致如下：
    1）协程A开始执行；
    2）协程A执行到一半，进入暂停，执行权转移到协程B；
    3）一段时间后，协程B交还执行权；
    4）协程A恢复执行；

- 协程是一个无优先级的子程序调度组件，允许子程序在特定的地点挂起恢复；

- 线程包含于进程，协程包含于线程，只要内存足够，一个线程中可以有任意多个协程，但某一个时刻只能有一个协程在运行，多个协程分享该线程分配到的计算机资源；

- 就实际使用理解来说，协程允许我们写同步代码的逻辑，却做着异步的事，避免了回调嵌套，使得代码逻辑清晰；

- 何时挂起，唤醒协程：协程是为了使用异步的优势，异步操作是为了避免IO操作阻塞线程，那么协程挂起的时刻应该是当前协程发起异步操作的时候，而唤醒应该在其他协程退出，并且他的异步操作完成时；

- 单线程内开启协程，一旦遇到io，从应用程序级别（而非操作系统）控制切换对比操作系统控制线程的切换，用户在单线程内控制协程的切换，优点如下：
1）协程的切换开销更小，属于程序级别的切换，操作系统完全感知不到，因而更加轻量级；
2）单线程内就可以实现并发的效果，最大限度地利用cpu；
```js
// 传统的生产者-消费者模型是一个线程写消息，一个线程取消息，通过锁机制控制队列和等待，但一不小心就可能死锁。

// 如果改用协程，生产者生产消息后，直接通过yield跳转到消费者开始执行，待消费者执行完毕后，切换回生产者继续生产，效率极高：
import time

def consumer():
    r = ''
    while True:
        n = yield r
        if not n:
            return
        print('[CONSUMER] Consuming %s...' % n)
        time.sleep(1)
        r = '200 OK'

def produce(c):
    c.next()
    n = 0
    while n < 5:
        n = n + 1
        print('[PRODUCER] Producing %s...' % n)
        r = c.send(n)
        print('[PRODUCER] Consumer return: %s' % r)
    c.close()

if __name__=='__main__':
    c = consumer()
    produce(c)
```
```js
[PRODUCER] Producing 1...
[CONSUMER] Consuming 1...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 2...
[CONSUMER] Consuming 2...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 3...
[CONSUMER] Consuming 3...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 4...
[CONSUMER] Consuming 4...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 5...
[CONSUMER] Consuming 5...
[PRODUCER] Consumer return: 200 OK
```

注意到consumer函数是一个generator（生成器），把一个consumer传入produce后：

- 首先调用c.next()启动生成器；
- 然后，一旦生产了东西，通过c.send(n)切换到consumer执行；
- consumer通过yield拿到消息，处理，又通过yield把结果传回；
- produce拿到consumer处理的结果，继续生产下一条消息；
- produce决定不生产了，通过c.close()关闭consumer，整个过程结束。

整个流程无锁，由一个线程执行，produce和consumer协作完成任务，所以称为“协程”，而非线程的抢占式多任务。

</details>

参考链接：[async/await的基础用法](https://www.jianshu.com/p/73b070eebf50)
[async/await 原理及执行顺序分析](https://juejin.im/post/5dc28ea66fb9a04a881d1ac0)
