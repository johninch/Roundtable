---
title: 异步编程（4）：async、await
tags: [async&await]
categories: execution
---

# 异步编程（4）：async、await

它最受欢迎的地方：**能让异步代码写起来像同步代码，并且方便控制顺序。**

## 1、async/await 概念解释

- async
    > async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行，async 函数返回的是一个promise 对象。

- await
   > await的含义为等待。意思就是代码需要等待await后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。

## 2、async函数是Generator函数的语法糖，并对Generator进行了改进

async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

### async的改进

async彻底告别了执行器和生成器，实现更加直观简洁的代码，async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
                              
async函数对 Generator 函数的改进，体现在以下四点：

1. `内置执行器`。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。
2. `更好的语义`。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
3. `更广的适用性`。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
4. `返回值是 Promise`。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。

## 3、async/await 与 promise 相比的优势

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
    - async/await基于协程的机制，是真正的“`保存上下文，控制权切换……控制权恢复，取回上下文`”这种机制，是对异步过程更精确的一种描述；

5. ✨**这点并不是优势也不算劣势（只能串行）**:
    它不能取代 Promise，尤其是我们可以很方便地`用Promise.all()来实现并发`，而`async/await只能实现串行`。

## 4、async关键字的特性

1. **非阻塞，无等待：**
    - async函数里面如果有异步过程会等待，但是```async函数本身会马上返回```，不会阻塞当前线程;
    - 可以简单认为，async函数工作在主线程，同步执行，不会阻塞界面渲染，async函数内部由await关键字修饰的异步过程，工作在相应的协程上，会阻塞等待异步任务的完成再返回；
    - 在没有await的情况下执行async函数，它会立即执行，返回一个Promise对象，并且绝对不会阻塞后面的语句，这和普通返回Promise对象的函数并无二致；

2. **async函数返回类型为Promise对象：**
    这是和普通函数本质上不同的地方，也是使用时重点注意的地方；
    - （1）return newPromise()；这个符合async函数本意；
    - （2）return data；这个是同步函数的写法，这里是要特别注意的，这个时候，其实就相当于Promise.resolve(data)；还是一个Promise对象，但是在调用async函数的地方通过简单的=是拿不到这个data的，因为返回值是一个Promise对象，所以需要用.then(data => { })函数才可以拿到这个data；
    - （3）如果没有返回值，相当于返回了Promise.resolve(undefined)；

3. **async统一catch，await不处理异步error：**
    async函数返回的这个Promise对象的catch函数负责统一抓取内部所有异步过程的错误，await是不管异步过程的reject(error)消息的；

4. 表明程序里面可能有异步过程：
    - async关键字表明程序里面可能有异步过程，里面可以有await关键字；
    - 当然全部是同步代码也没关系，但是这样async关键字就显得多余了；


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

## 5、await关键字的特性

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
## 使用场景实践

::: details 使用场景实践
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
:::

参考链接：

[async/await的基础用法](https://www.jianshu.com/p/73b070eebf50)

[async/await 原理及执行顺序分析](https://juejin.im/post/5dc28ea66fb9a04a881d1ac0)
