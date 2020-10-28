// - 如何用await和async写一个睡眠函数？
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

async function run(time) {
    const res = await sleep(time)
    console.log(res)
}

run(3000);



// - 请实现一个cacheRequest方法，保证当使用ajax(请求相同资源时，此题中相同资源的判断是以url为判断依据)，真实网络层中，实际只发出一次请求（假设已存在request方法用于封装ajax请求，调用格式为：``request(url, successCallback, failCallback)``）
// 比如调用方代码（并行请求）如下

// cacheRequest('/user', data => {
//     console.log('我是从A中请求的user，数据为' + data);
// })

// cacheRequest('/user', data => {
//     console.log('我是从B中请求的user，数据为' + data);
// })
function request(url, successCallback, failCallback) {
    return fetch(url).then(successCallback).catch(failCallback)
}

function cacheRequest(url, successCallback, failCallback) {
    cacheRequest.cache = cacheRequest.cache || {}
    cacheRequest.clear = cacheRequest.clear || function() {
        cacheRequest.cache = undefined
    }


    if (cacheRequest.cache[url]) {
        return cacheRequest.cache[url].then(successCallback).catch(failCallback)
    }

    let success, fail
    cacheRequest.cache[url] = new Promise((resolve, reject) => {
        success = resolve
        fail = reject
    })

    return request(
        url,
        (res) => {
            successCallback()
            success(res)
        },
        (err) => {
            failCallback()
            fail(err)
        }
    )
}

// - 三次重试：假设有一个函数名为job,调用job后会执行一些异步任务，并返回一个Promise,但job执行的异步任务有可能会失败
//     请实现函数retry,把job作为retry函数的参数传入，当retry执行后会尝试调用job,如果job返回成功（即Promise fulfilled），则retry函数返回job函数的返回内容；
//     如果job返回失败（即Promise rejected）,retry函数会再次尝试调用job函数。
//     如果job连续三次均返回失败，retry则不再尝试调用，并返回其最后一次失败的内容。

// 可以再attempt中每次new一个Promise对象
let count = 0
function job() {
    return new Promise((resolve, reject) => {
        count++
        setTimeout(() => {
            if (count === 6) {
                resolve('成功')
            } else {
                reject('失败')
            }
        }, 1000)
    })
}
function retry(job, times, delay) {
    let count = 0
    const attempt = () => {
        count++
        return new Promise((resolve, reject) => {
            job().then(res => {
                resolve(res)
            }).catch(err => {
                if (count === times) {
                    return reject(new Error('chong shi times shi bai'))
                } else {
                    setTimeout(() => {
                        resolve(attempt())
                    }, delay)
                }
            })
        })
    }

    attempt()
}

retry(job, 3, 1000)


// 也可以将attempt放在一个Promise之中

let count = 0
function job() {
    return new Promise((resolve, reject) => {
        count++
        setTimeout(() => {
            if (count === 6) {
                resolve('成功')
            } else {
                reject('失败')
            }
        }, 1000)
    })
}

function retry(job, times, delay) {
    let count = 0
    return new Promise((resolve, reject) => {
        const attempt = () => {
            count++
            job().then(res => {
                resolve(res)
            }).catch(err => {
                if (count === times) {
                    return reject('chongshi shibai:', err)
                } else {
                    setTimeout(() => {
                        attempt()
                    }, delay)
                }
            })
        }

        attempt()
    })
};

retry(job, 3, 1000)


// - 异步最大并发请求并按顺序组成结果
//     虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。

async function asyncInOrder(urls) {
    const promises = urls.map(async url => {
        const res = await fetch(url)
        return res
    })

    for (let p of promises) {
        console.log(await p)
    }
}
asyncInOrder(['xxx', 'yyyy'])



// - 串行Promise控制，一个请求执行完再执行下一个
// （1）通过在 then 方法里面递归传递下一次异步方法（递归的方法catch后就不会再递归调用迭代了，即p3报错后p4不再执行）
function iteratorPromise1(pArr) {
    const iter = () => {
        if (pArr.length) {
            p = pArr.shift()
            p().then(res => {
                iter()
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    iter()
}

// （2）利用 Promise.resolve()，循环赋值（循环调用的方法会执行每一个p，当p3报错后，p4也会执行不过是直接拿到穿透的p3报错）
function iteratorPromise2(pArr) {
    let resolve = Promise.resolve()
    pArr.forEach(p => {
        resolve = resolve.then(() => p()).catch(err => console.log(err))
    })
}
function iteratorPromise2(pArr) {
    pArr.reduce((resolve, p) => {
        resolve.then(() => p()).catch(err => console.log(err))
    }, Promise.resolve())
}




iteratorPromise1([p1, p2, p3, p3])
iteratorPromise2([p1, p2, p3, p3])



// - Promise每隔一秒打印数字，arr = [1, 3, 4, 5]
//     - 也是串行输出，只是需要结合setTimeout
function delayPromise(arr) {

}

// 同理可以用Promise配合着reduce不停的在promise后面叠加.then
function delayPromise(arr) {

}


// - 使用Promise实现红绿灯交替重复亮（依然考察Promise.resolve().then(() => return new Promise())的串行输出）
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

function light(timer, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer)
    })
}

function run() {
    Promise.resolve().then(() => {
        return light(1000, red)
    }).then(() => {
        return light(2000, green)
    }).then(() => {
        return light(3000, yellow)
    }).then(() => {
        return run()
    })
}

run()



// - 实现mergePromise函数
//     - 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
//     - 有点类似于Promise.all()，不过.all()不需要管执行顺序，只需要并发执行就行了。但是这里需要等上一个执行完毕之后才能执行下一个

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

const time = (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}
const ajax1 = () => time(2000).then(() => {
    console.log(1);
    return 1
})
const ajax2 = () => time(1000).then(() => {
    console.log(2);
    return 2
})
const ajax3 = () => time(1000).then(() => {
    console.log(3);
    return 3
})

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});

// 完成mergePromise函数
async function mergePromise(arr) {

}

// 2
// 3
// 1
// done
// [1, 2, 3]

// 显然，这里使用map异步并发请求是错误的，虽然最后的data是按顺序组成的，但因为map是并发的，所以会按照定时器执行输出231，而不是题目要求的123

// 因此，依然需要使用`Promise.resolve()`来实现串行执行：
// 第一次的then为了用来调用ajax
// 第二次的then是为了获取ajax的结果
function mergePromise(arr) {
    const data
    const res = arr.reduce((resolve, ajax) => {
        resolve.then(ajax).then(res => {
            data.push(res)
            return data
        }).catch(err => console.log(err))
    }, Promise.resolve())

    return res
}

// - 根据promiseA+实现promise
//     - 步骤一：实现成功和失败的回调方法
//     - 步骤二：then方法链式调用


// 面试版
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise {
    constructor(executor) {
        // 三个状态
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined

        let resolve = function(value) {
            if (this.state === 'pending') {
                this.state = 'resolved'
                this.value = value
            }
        }
        let reject = function(reason) {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
            }
        }

        // 自动执行函数
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    // then
    then(onFulfilled, onRejected) {
        switch (this.state) {
            case 'resolved':
                onFulfilled(this.value)
                break
            case 'rejected':
                onRejected(this.reason)
                break
            default:
            //
        }
    }
}


// - 封装一个异步加载图片的方法
function loadImg(url) {
    return new Promise((resolve, reject) => {

    })
};


// - 限制异步操作的并发个数并尽可能快的完成全部
//     - 以每次并发请求的数量为3为例：先请求urls中的前面三个(下标为0,1,2)，并且请求的时候使用Promise.race()来同时请求，三个中有一个先完成了(例如下标为1的图片)，我们就把这个当前数组中已经完成的那一项(第1项)换成还没有请求的那一项(urls中下标为3)。
//     - 直到urls已经遍历完了，然后将最后三个没有完成的请求(也就是状态没有改变的Promise)用Promise.all()来加载它们。
function limitLoad(urls, handler, limit) {
    let sequence = [].concat(urls); // 复制urls

    // 这一步是为了初始化 promises 这个"容器"
    let promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index
        })
    })

    // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
    return sequence.reduce((resolve, url) => {
        return resolve.then(() => {
            return Promise.race(promises)
        }).then(fastIndex => {
            promises[fastIndex] = handler(url).then(() => fastIndex)
        }).catch(err => { throw new Error(err) })
    }, Promise.resolve())
        .then(() => {
            return Promise.all(promises)
        })
}
limitLoad(urls, loadImg, 3)
    .then(res => {
        console.log("图片全部加载完毕");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });



// - 实现finally
Promise.prototype.finally = function(onFinally) {
    this.then(
        (res) => Promise.resolve(onFinally()).then(() => res),
        (err) => Promise.resolve(onFinally()).then(() => { throw err })
    )
};


// - 实现Promise.all
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        var promisesNum = promises.length;
        var resolvedValues = new Array(promisesNum)
        var resolveCount = 0

        for (var i = 0; i < promisesNum; i++) {
            ; (function(i) {
                Promise.resolve(promises[i]).then(value => {
                    resolvedValues[i] = value
                    resolveCount++
                    if (resolveCount === promisesNum) {
                        return resolve(resolvedValues)
                    }
                }, (reason) => {
                    reject(reason)
                })
            })(i)
        }
    })
}

// - Promise 的错误捕获
//     当 promise 的状态为 rejected 且未对 promise 对象使用 catch 方法，此时的异常信息会被 promise 对象吃掉 可以通过监听 `unhandledRejection` 事件，专门监听未捕获的reject错误。

// 浏览器下
// window.addEventListener('unhandledrejection', (e) => {
//     e.preventDefault();
//     console.log(e);
// });


new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}).then((arg) => {
    console.log(arg);
});
console.log(4);

// 3 7 4 1 2 5

Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
});
const timer1 = setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)
console.log('start');

// 'start'
// 'promise1'
// 'timer1'
// 'promise2'
// 'timer2'


const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
const promise2 = promise1.then(() => {
    throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
}, 2000)

// 'promise1' Promise{<pending>}
// 'promise2' Promise{<pending>}
// test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
// 'promise1' Promise{<resolved>: "success"}
// 'promise2' Promise{<rejected>: Error: error!!!}

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
        console.log("timer1");
    }, 1000);
    console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
    throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
    console.log("timer2");
    console.log("promise1", promise1);
    console.log("promise2", promise2);
}, 2000);

// 'promise1里的内容'
// 'promise1' Promise{<pending>}
// 'promise2' Promise{<pending>}
// 'timer1'
// test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
// 'timer2'
// 'promise1' Promise{<resolved>: "success"}
// 'promise2' Promise{<rejected>: Error: error!!!}

Promise.resolve().then(() => {
    return new Error('error!!!')
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})

// "then: " "Error: error!!!"

// 返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
// 当然如果你抛出一个错误的话，可以用下面👇两的任意一种：
// return Promise.reject(new Error('error!!!'));
// 或者
// throw new Error('error!!!')

async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1')
    })
    console.log('async1 success');
    return 'async1 end'
}
console.log('script start')
async1().then(res => console.log(res))
console.log('script end')

// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'

// 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，所以在await之后的内容是不会执行的，也包括async1后面的 .then。

async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1')
        resolve('promise1 resolve')
    }).then(res => console.log(res))
    console.log('async1 success');
    return 'async1 end'
}
console.log('script start')
async1().then(res => console.log(res))
console.log('script end')

// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
// 'promise1 resolve'
// 'async1 success'
// 'async1 end

async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function() {
    console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
    console.log("promise1");
    resolve();
}).then(function() {
    console.log("promise2");
});
console.log('script end')

// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'async1 end'
// 'promise2'
// 'setTimeout'

async function async1() {
    await async2();
    console.log('async1');
    return 'async1 success'
}
async function async2() {
    return new Promise((resolve, reject) => {
        console.log('async2')
        reject('error') // 如果改为throw new Error也是一样的
    })
}
async1().then(res => console.log(res))

// 'async2'
// Uncaught (in promise) error




const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);

// 3
// 7
// 4
// 1
// 2
// 5
// Promise{<resolved>: 1}


const async1 = async () => {
    console.log('async1');
    setTimeout(() => {
        console.log('timer1')
    }, 2000)
    await new Promise(resolve => { // await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，await之下的语句都不会执行
        console.log('promise1')
    })
    console.log('async1 end')
    return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .catch(4)
    .then(res => console.log(res))
setTimeout(() => {
    console.log('timer2')
}, 1000)

// 'script start'
// 'async1'
// 'promise1'
// 'script end'
// 1
// 'timer2'
// 'timer1'
// 注意定时器的延迟时间


// 注意这道题最后p1的返回值！！！！！！！！！！！！
// .finally()方法不管Promise对象最后的状态如何都会执行
// .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
// 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('resolve3');
        console.log('timer1')
    }, 0)
    resolve('resovle1');
    resolve('resolve2');
}).then(res => {
    console.log(res)
    setTimeout(() => {
        console.log(p1)
    }, 1000)
}).finally(res => {
    console.log('finally', res)
})


// 'resolve1'
// 'finally' undefined
// 'timer1'
// Promise{<resolved>: undefined} // 这里最后输出的返回值，就是finally的返回值undefined



// 变量提升部分：

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

// 要解出这道题，关键要搞懂两个知识点：函数变量提升 与 运算优先级。
// 首先，输出4与5的两处是有变量提升的，提升后如下：

// // 提升到顶部
// var getName;
// function getName() {
//     console.log(5)
// }

// function Foo() {
//     getName = function() {
//         console.log(1)
//     }
//     return this
// }

// Foo.getName = function() {
//     console.log(2)
// }

// Foo.prototype.getName = function() {
//     console.log(3)
// }

// // 声明提升到顶部，但函数体还在原处
// getName = function() {
//     console.log(4)
// }

// // 声明与函数体整体提升到顶部
// // function getName() {
// //     console.log(5)
// // }
// ```
// 因此，(1)到(4)输出如下：

// Foo.getName()               // (1)：输出2，直接调用Foo的静态方法
// getName()                   // (2)：输出4，由于赋值为4的函数体在最后执行，给getName最终赋值为4
// Foo().getName()             // (3)：输出1，普通调用函数 Foo()返回的 this 指向的是全局对象 window（谁调用指向谁），所以调用的是全局对象的 getName()。其中打印1的getName前面无var，这不是局部函数，而是对全局函数变量getName的重写赋值，所以这里输出的是全局的this。getName，输出1
// getName()                   // (4)：输出1，由于前一步中对全局getName变量重新赋值为1，因此这里还是打印1

// 再考虑第二个关键知识点，运算符优先级：**`()` > `.` > `带参数New` > `无参数New`**，因此(5)到(7)输出如下：

// new Foo.getName()           // (5)：输出2，因为.的优先级大于new，先得出2，new 2，最终输出2
// new Foo().getName()         // (6)：输出3，因为()的优先级大于. ，因此new Foo()先实例化得到foo，再计算foo.getName()，则会从原型上找到方法，输出3
// new new Foo().getName()     // (7)：输出3，因为第二个new是带参数的new操作符，所以new Foo()先实例化得到foo，原式等价于new foo.getName()，先计算.操作符得到3，new 3，得到最终3
// ```
// 至此，最终结果为：

// 请写出如下输出结果：
Foo.getName()               // (1)：2
getName()                   // (2)：4
Foo().getName()             // (3)：1
getName()                   // (4)：1
new Foo.getName()           // (5)：2
new Foo().getName()         // (6)：3   注意这里！！！！
new new Foo().getName()     // (7)：3   注意这里！！！！



// 变量提升部分第二题：
console.log(a)
function a() {
    console.log('a')
}
var a = 1
console.log(a)
function b() {
    console.log(a)
    let a = 2
}
b()


// 相当于
var a
function a() {
    console.log('a')
}
function b() {
    console.log(a)
    let a = 2
}
console.log(a) // function a() {console.log('a')}
a = 1
console.log(a) // 1
b() // Uncaught ReferenceError: Cannot access 'a' before initialization

// 解释：
// - 变量提升到最顶部
// - 最后b()执行，内部用let声明a，使得函数b内部成为块级作用域，let a之上是暂时性死区


// 比较下面两个变体：
console.log(a)
function a() {
    console.log('a')
}
var a = 1
console.log(a)
function b() {
    console.log(a)
    var a = 2 // 这里改用var声明a
}
b() // 输出undefined


console.log(a)
function a() {
    console.log('a')
}
var a = 1
console.log(a)
function b() {
    console.log(a)
    var b = 2 // 这里改成声明b
}
b() // 输出1，b里的console输出的是全局作用域的a







// 实现usePrevious
function usePrevious(val) {
    const ref = useRef()

    useEffect(() => {
        ref.current = val
    }, [val])

    return ref.current
}
// useEffect很重要的一点是：它是在每次渲染之后才会触发的，是延迟执行的。而return语句是同步的，所以return的时候，ref.current还是旧值。

// eg.
function Component() {
    const [count, setCount] = useState(0);
    const previousCount = usePrevious(count);

    return (
        <div>
            <button onClick={() => setCount(p => p + 1)}>add</button>
            {count} | { previousCount}
        </div>
    )
}





// 深度查询
function get(source, path, defaultValue = undefined) {
    // a[3].b -> a.3.b
    let paths = path.replace(/\[(\S+)\]/g, '.$1').split('.').filter(item => item)

    let result = source
    for (let p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
            return defaultValue
        }
    }

    return result
}

get(object, 'a[3].b', undefined);







// - 私有属性实现
// ES6
var Person = (() => {
    const _name = Symbol()
    class Person {
        constructor(name) {
            this[_name] = name
        }
        get name() {
            return this[_name]
        }
    }

    return Person
})()
// ES5
var Person = (() => {
    const _name = '_siyou' + Math.random()
    function Person(name) {
        this[_name] = name
    }

    Object.defineProperty(Person.prototype, 'name', {
        get() {
            return this[_name]
        }
    })

    return Person
})()


// - 实现 fill(3, 4) 为 [4,4,4]
function fill(n, m) {
    if (n) {
        return [m].concat(fill(n - 1, m))
    } else {
        return []
    }
}

fill(3, 4)




// - 模拟实现instanceof
// left是对象，right是原型对象
function myInstanceof(left, right) {
    //基本数据类型直接返回false

    //getPrototypeOf是Object对象自带的一个方法，能够拿到参数的原型对象

    if (typeof left !== 'object' || left === null) {
        return false
    }

    let proto = Object.getPrototypeOf(left)

    while (true) {
        if (proto === null) {
            return false
        }

        if (proto === right.prototype) {
            return true
        }

        proto = Object.getPrototypeOf(left)
    }
}

console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String)); //true


// - one(add(two())) 或 two(add(one())) 等于3
console.log(one(add(two()))); // 3
console.log(two(add(one()))); // 3

function add(val) {
    return x => {
        return x + val
    }
}

function one(cb) {
    if (cb) {
        return cb(1)
    }

    return 1
}

function two(cb) {
    if (cb) {
        return cb(2)
    }

    return 2
}

// - 斐波那契数列，使用memo做缓存，减少运算量
// 动态规划的题也能使用这种方法做优化
const fib4 = (function() {
    var memo = [1, 1];
    return function _fib4(n) {
        if (memo[n] !== undefined) {
            return memo[n];
        }
        memo[n] = _fib4(n - 1) + _fib4(n - 2)

        return memo[n]
    }
})();

console.log(fib4(9)); // 34


// 尾递归实现fibonacci (尾调用优化)
// 函数最后一步操作是 return 另一个函数的调用，函数不需要保留以前的变量
function fib3(n, n1 = 1, n2 = 1) {
    if (n < 2) {
        return n2
    } else {
        return fib3(n - 1, n2, n1 + n2)
    }
}

console.log(fib3(9));

// ### new的时候加1
; (function fn() {
    let count = 0
    return function _fn() {
        // if (this.constructor === _fn)
        if (new.target) {
            console.log(++count)
        } else {
            console.log(0)
        }
    }
})()

// ### 数组中map和reduce，如何用reduce实现map

arr1.map((cur, index, sourceArr) => {

}, callbackThis)

arr1.reduce((prev, cur, index, sourceArr) => {

}, initial)

Array.prototype._map = function(fn, callbackThis) {
    const CBThis = callbackThis || null
    const res = []
    this.reduce((prev, cur, index, sourceArr) => {
        res.push(fn.call(CBThis, cur, index, sourceArr))
    }, null)

    return res
}



// ### 统计字符串中出现最多的字母和次数
function findMaxChar(str) {

}


// ### 实现队列函数（先进先出），以实现一次100秒后打印出1，200秒后打印2，300秒后打印3这样
// #### setInterval有两个缺点
//   - 某些间隔会被跳过
//   - 可能多个定时器会连续执行
//   这是因为每个 setTimeout 产生的任务会直接 push 到任务队列中，而 setInterval 在每次把任务 push 到任务队列时，都要进行一次判断（判断 上次的任务是否仍在队列中，是则跳过）。所以通过用 setTimeout 模拟 setInterval 可以规避上面的缺点。
const moniInterval = (fn, time) => {
    const interval = () => {
        setTimeout(interval, time)
        fn()
    }

    setTimeout(interval, time)
}

const queue = () => {
    let count = 0
    const interval = () => {
        setTimeout(interval, ++count * 1000)
        console.log(count)
    }

    setTimeout(interval, count * 1000)
}

queue()



// ### 实现一个wait(1000, callback1).wait(3000, callback2).wait(1000, callback3)
const wait = (time, callback) => {
    let timeout = 0
    const createChain = (t, cb) => {
        timeout += t
        setTimeout(() => {
            callback()
        }, timeout)
        return {
            wait: createChain
        }
    }

    return createChain(time, callback)
}

// ### 实现成语接龙 wordschain('胸有成竹')('竹报平安')('安富尊荣').valueOf() 输出 胸有成竹 -> 竹报平安 -> 安富尊荣
const wordschain = (...args) => {
    let total = []
    const createChain = (...args) => {
        total = [...total, ...args]

        return createChain
    }

    createChain.valueOf = () => {
        return total.join(' -> ')
    }

    return createChain(...args)
}

wordschain('胸有成竹')('竹报平安')('安富尊荣', 'lallalal').valueOf()

// ### add(1, 3, 4)(7)(5, 5).valueOf();
const add = (...args) => {
    let total = []
    const createChain = (...args) => {
        total = [...total, ...args]

        return createChain
    }

    createChain.valueOf = () => {
        return total.reduce((a, b) => a + b, 0)
    }

    return createChain(...args)
}

add(1, 3, 4)(7)(5, 5).valueOf()




// 实现JSONP
function JSONP(url, params = {}, callbackKey = 'cb', callback) {

}

JSONP({
    url: 'http://localhost:8080/api/jsonp',
    params: {
        id: 1
    },
    callbackKey: 'cb',
    callback(res) {
        console.log(res)
    }
})
// 后端会将数据传参到拿来的函数，赋值给响应体。。。前端拿到的就是一个'JSONP.callbacks[1](data)'这样的字符串，script加载完脚本后立即执行，就能拿到数据了
this.body = `${callback}(${JSON.stringify(callbackData)})`

// 返回promise的JSONP封装
function JSONP(url, params = {}, callbackKey = 'cb') {
    return new Promise((resolve, reject) => {
        JSONP.callbacks = JSONP.callbacks || []
        JSONP.callbackId = JSONP.callbackId || 1

        let callbackId = JSONP.callbackId
        // JSONP.callbacks[callbackId] = callback

        params[callbackKey] = `JSONP.callbacks[${callbackId}]`

        const paramString = Object.keys(params).map(key => {
            return `${key}=${encodeURIComponent(params[key])}`
        }).join('&')

        const script = document.createElement('script')
        script.setAttribute('src', `${url}?${paramString}`)

        JSONP.callbacks[callbackId] = function(result) {
            delete JSONP.callbacks[callbackId]
            document.body.removeChild(script)

            if (result) {
                resolve(result)
            } else {
                reject(new Error('没有返回数据'))
            }
        }

        script.addEventListener('error', (err) => {
            delete JSONP.callbacks[callbackId]
            document.body.removeChild(script)

            reject('资源加载错误：' + err)
        }, false)


        document.body.appendChild(script)

        JSONP.callbackId++
    })
}

// - 1、回调函数在主函数中的参数位置必须是最后一个；
// - 2、回调函数参数中的第一个参数必须是 error。
// var func = function(a, b, c, callback) {
//     callback(null, a+b+c);
// }

// 实现promisify
const promisify = (func) => (...args) => {
    return new Promise((resolve, reject) => {
        func(...args, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

// function func(a, b, c, callback) {
//     callback(err, a + b + c)
// }

// 或者 写成函数表达式形式
const promisify = function(func) {
    return function(...args) {
        let that = this
        return new Promise((resolve, reject) => {
            func.call(that, ...args, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

// nodeCallback方法func1
var func1 = function(a, b, c, callback) {
    callback(null, a + b + c);
}
// promise化后的func2
var func2 = promisify(func1);
// 调用后输出6
func1(1, 2, 3, (err, result) => {
    if (!err) {
        console.log(result); //输出6
    }
})
func2(1, 2, 3).then(console.log); //输出6


// 原有的callback调用方式
fs.readFile('test.js', function(err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log(err);
    }
});

// promisify后调用方式
var readFileAsync = promisify(fs.readFile);
readFileAsync('test.js').then(data => {
    console.log(data);
}, err => {
    console.log(err);
});

// 只有nodeCallback方法可以通过 promisify 变成 promise，nodeCallback需满足两个条件
// - 1、回调函数在主函数中的参数位置必须是最后一个；
// - 2、回调函数参数中的第一个参数必须是 error。
// var func = function(a, b, c, callback) {
//     callback(null, a+b+c);
// }
// [Callback 与 Promise 间的桥梁 —— promisify](https://juejin.im/post/59f99d916fb9a0450b65b538)



// ### 手写双向绑定
const input = document.createElement('input')
const obj = {}

Object.defineProperty(obj, 'value', {
    configurable: false,
    enumerable: false,
    get() {
        return input.value
    },
    set(newVal) {
        if (newVal === input.value) {
            return
        }

        input.value = newVal
    }
})

input.addEventListener('input', ev => {
    obj.value = ev.target.value
}, false)



// 手写vue observe数据劫持
class Vue {
    constructor(options) {
        this.$options = options
        this.$data = this.$options.data
        this.observe(this.$data)
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return
        }

        for (let key in data) {
            if (typeof data[key] === 'object') {
                this.observe(data[key])
            } else {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(data, key, val) {
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: false,
            writable: false,
            get() {
                return val
            },
            set(newVal) {
                if (newVal == val) {
                    return
                }

                val = newVal
            }
        })
    }
}


// 用JS模拟DOM结构（手写vnode）
// <template >
// <div id="div1" class="container">
//     <p>vdom</p>
// </div>
// </template >

// {
//     tag: 'div',
//     props: {
//         className: 'container',
//         id: 'div1'
//     },
//     children: [{
//         tag: 'p',
//         children: 'vdom'
//     }]
// }





// ### 防抖节流
const debounce = (fn, time) => {
    let timer

    return (...args) => {
        clearTimeout(timer)
        let self = this
        timer = setTimeout(() => {
            fn.call(self, ...args)
        }, time)
    }
}

const throttle = (fn, time) => {
    let canRun = true

    return (...args) => {
        if (!canRun) {
            return
        }
        canRun = false
        let self = this
        setTimeout(() => {
            fn.call(self, ...args)
            canRun = true
        }, time)
    }
}


// ### promise实现图片懒加载
function loadImg(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject('xxxx')
        }

        img.src = url
    })
}


// ### 二分查找
function binarySearch(target, arr, start, end) {
    if (start >= end) return -1

    let mid = (start + end) >> 1
    if (arr[mid] === target) {
        return mid
    }

    if (arr[mid] < target) {
        return binarySearch(target, arr, mid + 1, end)
    } else {
        return binarySearch(target, arr, start, mid - 1)
    }
}



// ### 封装类型判断函数
function getType(arg) {
    const type = typeof (arg)
    if (type !== 'object') {
        return type
    }

    return Object.prototype.toString.call(arg).replace(/^\[object (\w+)\]$/, '$1').toLowerCase()
}


// ### 如何效率的向一个ul里面添加10000个li
// 方法1：使用fragment


// 方法2：使用字符串拼接



// ### 快速排序
function quickSort(arr) {
    return arr.length < 2 ? arr : quickSort(arr.slice(1).filter(i => i < arr[0])).concat(arr[0], quickSort(arr.slice(1).filter(i => i >= arr[0])))
}


// ### 实现Object.create
Object._create = Object.create || function(obj) {
    var F = function() { }

    F.prototype = obj

    return new F()
}



// ### 模拟实现new操作符
function thisNew(M) {
    const o = Object.create(M.prototype);
    const res = M.call(o)

    if (res instanceof Object) {
        return res
    } else {
        return o
    }
}




// ### 数组扁平化




// ### 数组去重




// ### 简单版EventEmitter实现


// 优化版


// 进阶版
class EventEmitter {
    constructor() {
        this._eventBus = {}
    }
    on(type, cb) {
        let handler = this._eventBus[type]
        if (!handler) {
            this._eventBus[type] = cb
        } else if (typeof handler === 'function') {
            this._eventBus[type] = [handler, cb]
        } else {
            this._eventBus[type].push(cb)
        }
    }
    emit(type, ...args) {
        let handler = this._eventBus[type]
        if (handler) {
            if (typeof handler === 'function') {
                args.length > 0 ? handler.apply(this, args) : handler.call(this)
            } else {
                handler.forEach(_cb => {
                    args.length > 0 ? cb.apply(this, args) : cb.call(this)
                })
            }
        }
    }
    off(type, cb) {
        let handler = this._eventBus[type]
        if (handler && Array.isArray(handler)) {
            let index = handler.findIndex(_cb => _cb === cb)
            if (index > -1) {
                this._eventBus[type].splice(index, 1)

                if (this._eventBus[type].length === 1) {
                    this._eventBus[type] = this._eventBus[type][0]
                }
            }
        } else if (handler && typeof handler === 'function') {
            delete this._eventBus[type]
        }
    }
    once(type, cb) {
        this.on(type, (...args) => {
            args.length > 0 ? cb.apply(this, args) : cb.call(this)
            this.off(type)
        })
    }
}



// ### 优化版组合继承
function Parent() {
    this.type = 'parent'
    this.hanbit = [1, 2, 3]
}

Parent.prototype.say = function() {
    console.log('chichicheheh')
}

function Child() {
    Parent.call(this)
    this.type = 'child'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child






// 创建Ajax
var Ajax = {
    get(url, fn) {
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304 || xhr.status === 206)) {
                fn.call(this, xhr.responseText)
            }
        }
        xhr.send()
    },
    post(url, data, fn) {
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304 || xhr.status === 206)) {
                fn.call(this, xhr.responseText)
            }
        }
        xhr.send(data)
    }
}


// 实现字符串模板
const template = "I am {{ name }}, {{ age }} years old";
var context = { name: "xiaoming", age: 2 };

function formatStr(str) {
    return str.replace(/\{\{(.*?)\}\}/g, (match, key) => {
        return context[key.trim()]
    })
}

formatStr(template)


// 千分位题
function toThousands(num) {
    let str = (num || 0).toString()
    if (str.indexOf('.') > -1) {
        strs = str.split('.')

    }
    return strs[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + strs[1]
}

toThousands(12334344532.2334)




// 写一个方法,实现字符串从后往前每三个插入|,得到"ad|abc|def|ghi"
function foo(str) {
    return str.replace(/(\w)(?=(?:\w{3})+$)/g, '$1|')
}

foo('adabcdefghi')




// 深拷贝
// 浅拷贝与深拷贝的区别
// 深拷贝
// - 最简单版本：只对JSON安全的数据结构有效；且会抛弃对象的constructor，所有的构造函数会指向Object；遇到对象有循环引用，会报错。
// - 只能写出简单版本，即只实现到区分array与Object的引用类型
//     - 如果考虑全面类型的话，对Date、RegExp、甚至function都是要考虑的（当然这里的function其实考虑了也没意义，两个对象使用在内存中处于同一个地址的函数也是没有任何问题的，而比如lodash在碰到函数深拷贝时就直接返回了）
//     - 另外还应考虑循环引用的问题
//         - 解决循环引用问题，需额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
//     这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构。
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    let newObj = Object.prototype.toString.call(obj) === '[object Object]' ? {} : []

    if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for (let key in obj) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }

    return newObj
}






// ### 事件代理
// - 事件代理利用两个js事件特性：事件冒泡、目标元素。
// - 使用事件代理的话我们可以把事件处理器添加到一个祖先元素上，等待事件从它的子级元素里冒泡上来，并且可以很方便地判断出这个事件是从哪个元素开始的。



// 手写bind函数
// 只实现返回函数 与 分开传参数
Function.prototype._bind = Function.prototype.bind || function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1)
    let self = this

    return function() {
        let bindArgs = Array.prototype.slice.call(arguments)
        self.apply(ctx, args.concat(bindArgs))
    }
}


// 还要模拟 当做构造函数使用


// Q：实现一个函数trim(str) 字符串前后去空格
// String._trim() = function(str) {
//     return str.replace(/(^\s+)|(\s+$)/g, '')
// }



// - 如何用ES5实现promise







// - 手写文件上传
const input = document.createElement('input')
document.body.appendChild(input)
input.click()
setTimeout(() => {
    input.remove()
}, 300)

input.onchange = function() {
    const fd = new FormData()
    const file = input.files[0]

    fd.append('file', file)
    fd.append('filename', file.name)

    const xhr = new XMLHttpRequest()
    action = 'https: .......'
    xhr.open('post', action, true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {

    }
}





// - 手写文件预览
const file = document.getElementById('file')
const img = document.getElementById('img')

file.addEventListener('change', function() {
    let obj = file.files[0]
    let url = window.URL.createObjectURL(obj)
    img.src = url
}, false)

const file = document.getElementById('file')
const img = document.getElementById('img')

file.addEventListener('change', function() {
    let obj = file.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(obj)

    reader.onloadend = function() {
        img.src = reader.result
    }
}, false)


// 写一个 DOM2JSON(node) 函数，node 有 tagName 和 childNodes 属性
//     `
// <div>
//     <span>
//         <a></a>
//     </span>
//     <span>
//         <a></a>
//         <a></a>
//     </span>
// </div>

// {
//     tag: 'DIV',
//     children: [{
//         tag: 'SPAN',
//         children: [
//             { tag: 'A', children: [] }
//         ]
//     }, {
//     tag: 'SPAN',
//     children: [
//             { tag: 'A', children: [] },
//             { tag: 'A', children: [] }
//         ]
//     }]
// }
// `

function DOM2JSON(node) {
    const obj = {}
    obj['tag'] = node.tagName
    obj['children'] = []

    let child = node.children
    for (let item of child) {
        obj['children'].push(DOM2JSON(item))
    }

    return obj
}






// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有limit个。完善下面代码的Scheduler类，使得一下程序能正确输出
class Scheduler {
    constructor(limit = 2) {
        this.limit = 2
        this.queue = []
        this.curTaskCount = 0
    }
    add(fn) {
        new Promise((resolve, reject) => {
            this.queue.push([fn, resolve])
            this.run()
        })
    }
    run() {
        if (this.curTaskCount < this.limit && this.queue.length) {
            const [fn, resolve] = this.queue.shift()
            this.curTaskCount++
            Promise.resolve(fn()).then(result => {
                resolve(result)
                this.curTaskCount--
                this.run()
            })
        }
    }
}

function timeout(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

var scheduler = new Scheduler()

function addTask(time, order) {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}


addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)
// 2
// 3
// 1
// 4

