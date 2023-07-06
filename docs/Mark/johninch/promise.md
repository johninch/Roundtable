## promise 专题

### 目录

::: details

- 如何用 await 和 async 写一个睡眠函数？
- 请实现一个 cacheRequest 方法
- 三次重试：请实现函数 retry,把 job 作为 retry 函数的参数传入
- 异步最大并发请求并按顺序组成结果
- 同时处理请求并发数，一次并发一组 n 个请求，有一个执行完成，就能并发下一组 n
- 串行 Promise 控制，一个请求执行完再执行下一个
- Promise 每隔一秒打印数字
- 使用 Promise 实现红绿灯交替重复亮
- 实现 mergePromise 函数
- 封装一个异步加载图片的方法
- 限制异步操作的并发个数并尽可能快的完成全部
- 实现 finally
- 实现 Promise.all
- 根据 promiseA+实现 promise
  - 步骤一：实现成功和失败的回调方法
  - 步骤二：then 方法链式调用

* Promise 的错误捕获
* 终值与拒因
  终值：指的是 promise 被解决时传递给解决回调的值
  拒因：拒绝原因，指在 promise 被拒绝时传递给异常回调的拒绝原因
* 终值和拒因的穿透（忽略它）特性
  - 如果 promise 的状态变为 fulfilled，then 方法没有注册 onFulfilled
  - 如果 promise 的状态变为 rejected，then 方法没有注册 onRejected
  - 另外，.then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传（忽略该值）
    - 怎么理解值穿透？（https://blog.csdn.net/u013448372/article/details/110863799）

```js
Promise.resolve(1)
	.then(2)
	.then(Promise.resolve(3))
	.then(console.log)
	.then(console.log("lll"));

// 1
// resolve(1)过去，then只接受2个函数，console.log 函数传进去，接收了1，于是打印1

// 这里有个问题，console.log('lll')为什么先于1输出
Promise.resolve(1)
	.then(2)
	.then(Promise.resolve(3))
	.then(console.log)
	.then(console.log("lll"));
```

- Promise.resolve

```js
let p = Promise.resolve(x);
// 等价于
let p = new Promise(resolve => {
	resolve(x);
});
```

- Promise 的问题
  无法取消 Promise，若没有状态变更，也无法停止 promise 的等待
  不设定 then 或 catch 方法，构造函数(excutor 函数)错误，无法捕获
  未完成状态时，无法得知是刚开始，还是即将完成

- .all 与 .race
  - Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
  - .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
  - Promise.all().then()结果中数组的顺序和 Promise.all()接收到的数组顺序一致。
  - all 和 race 传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被 then 的第二个参数或者后面的 catch 捕获；但并不会影响数组中其它的异步任务的执行。
- async 与 await
  - 「紧跟着 await 后面的语句相当于放到了 new Promise 中，下一行及之后的语句相当于放在 Promise.then 中，await 会阻塞下一行及之后代码的执行」
  - async 处理错误
    - 如果在 async 函数中抛出了错误，则终止错误结果，不会继续向下执行。
    - 想要使得错误的地方不影响 async 函数后续的执行的话，可以使用 try catch

:::

### details

::: details 例题

- 如何用 await 和 async 写一个睡眠函数？

```js
function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("sleep for " + ms + " ms");
		}, ms);
	});
}

async function run(time) {
	let result = await sleep(time);
	console.log(result);
}

run(3000);
```

- 请实现一个 cacheRequest 方法，保证当使用 ajax(请求相同资源时，此题中相同资源的判断是以 url 为判断依据)，真实网络层中，实际只发出一次请求（假设已存在 request 方法用于封装 ajax 请求，调用格式为：`request(url, successCallback, failCallback)`）
  比如调用方代码（并行请求）如下

```js
cacheRequest("/user", data => {
	console.log("我是从A中请求的user，数据为" + data);
});

cacheRequest("/user", data => {
	console.log("我是从B中请求的user，数据为" + data);
});
```

```js
function request(url, successCallback, failCallback) {
    return fetch(url).then(successCallback).catch(failCallback)
}

function cacheRequest(url, successCallback, failCallback) {
    cacheRequest.cache = cacheRequest.cache || {};
    cacheRequest.clear = cacheRequest.clear || () => (cacheRequest.cache = undefined);

    if (cacheRequest.cache[url]) {
        return cacheRequest.cache[url].then(successCallback).catch(failCallback);
    }

    // 缓存请求
    let success, fail;
    cacheRequest.cache[url] = new Promise((resolve, reject) => {
        success = resolve;
        fail = reject;
    });
    // return fetch(url)
    //     .then(response => {
    //         success(response.clone())
    //         successCallback(response)
    //     })
    //     .catch(error => {
    //         failCallback(error)
    //         fail(error)
    //     })
    return request(
        url,
        response => {
            success(response.clone());
            successCallback(response);
        },
        error => {
            failCallback(error);
            fail(error);
        }
    );
}

```

- 三次重试：假设有一个函数名为 job,调用 job 后会执行一些异步任务，并返回一个 Promise,但 job 执行的异步任务有可能会失败
  请实现函数 retry,把 job 作为 retry 函数的参数传入，当 retry 执行后会尝试调用 job,如果 job 返回成功（即 Promise fulfilled），则 retry 函数返回 job 函数的返回内容；
  如果 job 返回失败（即 Promise rejected）,retry 函数会再次尝试调用 job 函数。
  如果 job 连续三次均返回失败，retry 则不再尝试调用，并返回其最后一次失败的内容。

```js
// 方法1. 可以在attempt中每次new一个新的Promise对象
let count = 0;
function job() {
	return new Promise((resolve, reject) => {
		count++;
		if (count === 6) {
			resolve("成功");
		} else {
			reject("失败");
		}
	});
}
function retry(job, times, delay) {
	let flag = 1;
	const attempt = () => {
		new Promise((resolve, reject) => {
			job()
				.then(response => {
					console.log(`第${flag}次成功`);
					resolve(response);
				})
				.catch(err => {
					console.log(`重试第${flag}次`);
					if (flag === times) {
						reject(err);
					} else {
						flag++;
						setTimeout(() => {
							resolve(attempt());
						}, delay);
					}
				});
		}).catch(err => {
			console.log(`重试${flag}次失败`, err);
		});
	};
	attempt();
}

// retry(job, 3, 1000);
retry(job, 7, 100);

// 方法2. 也可以将attempt放在一个Promise之中

let count = 0;
function job() {
	return new Promise((resolve, reject) => {
		count++;
		if (count === 6) {
			resolve("成功");
		} else {
			reject("失败");
		}
	});
}

function retry(job, times, delay) {
	let flag = 1;
	new Promise((resolve, reject) => {
		var attempt = function() {
			job()
				.then(response => {
					console.log(`第${flag}次成功`);
					resolve(response);
				})
				.catch(err => {
					console.log(`重试第${flag}次`);
					if (flag == times) {
						reject(err);
					} else {
						flag++;
						setTimeout(() => {
							attempt();
						}, delay);
					}
				});
		};
		attempt();
	}).catch(err => {
		console.log(`重试${flag}次失败`, err);
	});
}

retry(job, 3, 1000);
```

- 异步最大并发请求并按顺序组成结果
  虽然 map 方法的参数是 async 函数，但它是并发执行的，因为只有 async 函数内部是继发执行，外部不受影响。后面的 for..of 循环内部使用了 await，因此实现了按顺序输出。

```js
async function asyncInOrder(urls) {
	// 并发读取远程URL
	const promises = urls.map(async url => {
		const res = await fetch(url);
		return res.status; // 比如把状态码返回
	});

	// 按次序输出
	for (const p of promises) {
		console.log(await p);
	}
}
asyncInOrder(["xxx", "yyyy"]);
```

- 同时处理请求并发数，一次并发一组 n 个请求，有一个执行完成，就能并发下一组 n（这里用 race 的话，返回一个剩下的结果就被抛弃了）

```js
let p1 = () => {
	return new Promise(resolve => {
		console.log("do p1");
		setTimeout(() => {
			resolve("success p1 2s");
		}, 2000);
	});
};

let p2 = () => {
	return new Promise(resolve => {
		console.log("do p2");
		setTimeout(() => {
			resolve("success p2 2.5s");
		}, 2500);
	});
};

let p3 = () =>
	new Promise((resolve, reject) => {
		console.log("do p3");
		setTimeout(() => {
			reject("error p3 3s");
		}, 3000);
	});
let p4 = () => {
	return new Promise(resolve => {
		console.log("do p4");
		setTimeout(() => {
			resolve("success p4 1s");
		}, 1000);
	});
};

let p5 = () => {
	return new Promise(resolve => {
		console.log("do p5");
		setTimeout(() => {
			resolve("success p5 2s");
		}, 2000);
	});
};

let p6 = () =>
	new Promise((resolve, reject) => {
		console.log("do p6");
		setTimeout(() => {
			reject("error p6 3s");
		}, 3000);
	});
let p7 = () => {
	return new Promise(resolve => {
		console.log("do p7");
		setTimeout(() => {
			resolve("success p7 3s");
		}, 3000);
	});
};

let p8 = () => {
	return new Promise(resolve => {
		console.log("do p8");
		setTimeout(() => {
			resolve("success p8 3s");
		}, 3000);
	});
};

let p9 = () =>
	new Promise((resolve, reject) => {
		console.log("do p9");
		setTimeout(() => {
			reject("error p9 2.5s");
		}, 2500);
	});

let p10 = () =>
	new Promise((resolve, reject) => {
		console.log("do p10");
		setTimeout(() => {
			reject("error p10 4s");
		}, 4000);
	});

// 并发promise控制，分组然后递归
function promiseConcurrent(pArr, n) {
	const iteratorPromise = arr => {
		const iter = () => {
			if (arr.length) {
				let sub = arr.shift();
				Promise.race(sub.map(item => item()))
					.then(res => {
						console.log(res);
						iter();
					})
					.catch(err => {
						console.log(err);
					});
			}
		};

		iter();
	};

	let pArrList = [];
	if (n > pArr.length) {
		Promise.all(pArr.map(p => p()))
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		while (pArr.length > n) {
			let sub = pArr.splice(0, n);
			pArrList = pArrList.concat([sub]);
		}

		pArrList = pArrList.concat([pArr]);

		iteratorPromise(pArrList);
	}
}

// promiseConcurrent([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10], 3);
// promiseConcurrent([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10], 15);

// 因为promise.race一个p返回后其他的结果都拿不到了，所以这里提供一种思路，把所有请求实例都收集起来
// 不过这样只能在执行完成后才能拿到全部结果，因此应该采用race替换index的思路来做，即“限制异步操作的并发个数并尽可能快的完成全部”
const myCollector = collector();

promiseConcurrent(
	[p1, p2, p3, p4, p5, p6, p7, p8, p9, p10].map(item =>
		myCollector.collect(item)
	),
	3
);

setTimeout(() => {
	console.log(myCollector.results);
	console.log(myCollector.errors);
}, 6000); // 不过这样只能在执行完成后才能拿到全部结果，

function collector() {
	const results = new Proxy([], {
		set(...args) {
			return Reflect.set(...args);
		}
	});
	const errors = new Proxy([], {
		set(...args) {
			return Reflect.set(...args);
		}
	});

	return {
		results,
		errors,
		collect: asyncFn => () =>
			asyncFn()
				.then(results.push.bind(results))
				.catch(errors.push.bind(errors))
	};
}
```

- 串行 Promise 控制，一个请求执行完再执行下一个

```js
let p1 = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('p1', Date.now())
            resolve('success p1')
        }, 1000)
    })
}

let p2 = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('p2', Date.now())
            resolve('success p2')
        }, 2000)
    })
}

let p3 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p3', Date.now())
        reject('error p3')
    }, 3000)
})

let p4 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log('p4', Date.now())
        resolve('success p4')
    }, 4000)
})

（1）通过在 then 方法里面递归传递下一次异步方法（递归的方法catch后就不会再递归调用迭代了，即p3报错后p4不再执行）
function iteratorPromise1(pArr) {
    const iter = () => {
        if (pArr.length) {
            let p = pArr.shift()
            p().then(res => {
                console.log(res)
                iter()
            }).catch(e => {
                console.log(e)
            })
        }
    }

    iter()
}

（2）利用 Promise.resolve()，循环赋值（循环调用的方法会执行每一个p，当p3报错后，p4也会执行不过是直接拿到穿透的p3报错）
function iteratorPromise2(pArr) {
    let resolve = Promise.resolve()
    pArr.forEach(p => {
        resolve = resolve.then(() => p())
            .catch(e => {
                console.log(e)
            })
    })
}

iteratorPromise1([p1, p2, p3, p3])
iteratorPromise2([p1, p2, p3, p3])
```

- Promise 每隔一秒打印数字
  - 也是串行输出，只是需要结合 setTimeout

```js
function delayPromise(arr) {
	let resolve = Promise.resolve();
	arr.forEach(x => {
		resolve = resolve.then(
			() =>
				new Promise(resolve => setTimeout(() => resolve(console.log(x)), 1000))
		);
	});
}

// 同理可以用Promise配合着reduce不停的在promise后面叠加.then
function delayPromise(arr) {
	arr.reduce((resolve, x) => {
		return resolve.then(
			() =>
				new Promise(resolve => setTimeout(() => resolve(console.log(x)), 1000))
		);
	}, Promise.resolve());
}

delayPromise([1, 2, 3]);
```

- 使用 Promise 实现红绿灯交替重复亮（依然考察 Promise.resolve().then(() => return new Promise())的串行输出）

```js
function red() {
	console.log("red");
}
function green() {
	console.log("green");
}
function yellow() {
	console.log("yellow");
}

function light(timer, cb) {
	return new Promise(resolve => {
		setTimeout(() => {
			cb();
			resolve();
		}, timer);
	});
}

function run() {
	Promise.resolve()
		.then(() => {
			return light(3000, red);
		})
		.then(() => {
			return light(2000, green);
		})
		.then(() => {
			return light(1000, yellow);
		})
		.then(() => {
			return run();
		});
}

run();
```

- 实现 mergePromise 函数
  - 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
  - 有点类似于 Promise.all()，不过.all()不需要管执行顺序，只需要并发执行就行了。但是这里需要等上一个执行完毕之后才能执行下一个

```js
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
    let data = []
    let promises = arr.map(async (req) => {
        return await req()
    })

    for(let promise of promises) {
        let res = await promise
        data.push(res)
    }

    return data // async 直接返回data
}

// 2
// 3
// 1
// done
// [1, 2, 3]

显然，这里使用map异步并发请求是错误的，虽然最后的data是按顺序组成的，但因为map是并发的，所以会按照定时器执行输出231，而不是题目要求的123

因此，依然需要使用`Promise.resolve()`来实现串行执行：
// 第一次的then为了用来调用ajax
// 第二次的then是为了获取ajax的结果
function mergePromise(arr) {
    const data = []
    let resolve = Promise.resolve()
    arr.forEach(ajax => {
        resolve = resolve.then(ajax).then(res => {
            data.push(res)

            return data // 把每次的结果返回
        })
    })

    return resolve // resolve就拿到了所有data
}

// 或用reduce，注意每次迭代返回data给resolve，最后返回res
function mergePromise(arr) {
    let data = []
    let res = arr.reduce((resolve, ajax) => {
        return resolve.then(ajax).then(res => {
            data.push(res)

            return data
        })
    }, Promise.resolve())

    return res
}
```

- 根据 promiseA+实现 promise
  - 步骤一：实现成功和失败的回调方法
  - 步骤二：then 方法链式调用

```js
// 面试版
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise {
	constructor(executor) {
		// 三个状态
		this.state = "pending";
		this.value = undefined;
		this.reason = undefined;
		let resolve = value => {
			if (this.state === "pending") {
				this.state = "fulfilled";
				this.value = value;
			}
		};
		let reject = value => {
			if (this.state === "pending") {
				this.state = "rejected";
				this.reason = value;
			}
		};
		// 自动执行函数
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}
	// then
	then(onFulfilled, onRejected) {
		switch (this.state) {
			case "fulfilled":
				onFulfilled(this.value);
				break;
			case "rejected":
				onRejected(this.reason);
				break;
			default:
		}
	}
}
```

```js
class Promise {
	constructor(executor) {
		this.status = "pending";
		this.value = undefined;
		this.reason = undefined;
		// 存放回调
		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];

		let resolve = value => {
			if (this.status === "pending") {
				this.value = value;
				this.status = "resolved";
				this.onResolvedCallbacks.forEach(cb => cb());
			}
		};

		let reject = reason => {
			if (this.status === "pending") {
				this.reason = reason;
				this.status = "rejected";
				this.onRejectedCallbacks.forEach(cb => cb());
			}
		};

		// 如果executor执行报错，直接执行reject
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	then(onFulfilled, onRejected) {
		let promise2 = new Promise((resolve, reject) => {
			if (this.status === "resolved") {
				let x = onFulfilled(this.value);
				resolvePromise(promise2, x, resolve, reject);
			}
			if (this.status === "rejected") {
				let x = onRejected(this.reason);
				resolvePromise(promise2, x, resolve, reject);
			}
			// 当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
			if (this.status === "pendding") {
				this.onResolvedCallbacks.push(() => {
					let x = onFulfilled(this.value);
					resolvePromise(promise2, x, resolve, reject);
				});
				this.onRejectedCallbacks.push(() => {
					let x = onRejeced(this.reason);
					resolvePromise(promise2, x, resolve, reject);
				});
			}
		});

		// 返回promise，完成链式
		return promise2;
	}
}

// 完成resolvePromise函数: 让不同的promise代码互相套用
function resolvePromise(promise2, x, resolve, reject) {
	if (x === promise2) {
		return reject(new TypeError("循环引用了少年！！！"));
	}

	let called; // 防止多次调用
	if (x != null && (typeof x === "object" || typeof x === "function")) {
		try {
			// 声明then = x的then方法
			let then = x.then;
			// 如果then是函数，就默认是promise了
			if (typeof then === "function") {
				then.call(
					x,
					y => {
						if (called) return;
						called = true;
						resolvePromise(promise2, x, resolve, reject);
					},
					err => {
						if (called) return;
						called = true;
						reject(err);
					}
				);
			} else {
				resolve(x);
			}
		} catch (e) {
			if (called) true;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}
```

- 封装一个异步加载图片的方法

```js
function loadImg(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = function() {
			console.log("一张图片加载完成");
			resolve(img);
		};
		img.onerror = function() {
			reject(new Error("Could not load image at" + url));
		};
		img.src = url;
	});
}
```

- 限制异步操作的并发个数并尽可能快的完成全部
  - 以每次并发请求的数量为 3 为例：先请求 urls 中的前面三个(下标为 0,1,2)，并且请求的时候使用 Promise.race()来同时请求，三个中有一个先完成了(例如下标为 1 的图片)，我们就把这个当前数组中已经完成的那一项(第 1 项)换成还没有请求的那一项(urls 中下标为 3)。
  - 直到 urls 已经遍历完了，然后将最后三个没有完成的请求(也就是状态没有改变的 Promise)用 Promise.all()来加载它们。

```js
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  // 这里的sequence是已经被截去前三个后剩下的数组
  return sequence.
    .reduce((resolve, url) => {
      return resolve.then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then(fastestIndex => { // 获取到已经完成的下标
        	// 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
              return fastestIndex; // 要继续将这个下标返回，以便下一次变量
            }
          );
        })
        .catch(err => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => { // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });







// 关键
let promises = sequence.splice(0, limit).map((url, index) => {
  return handler(url).then(() => {
    return index
  })
})


sequence.reduce(((resolve, url) => {
  return resolve.then(() => {
    return Promise.race(promises)
  }.then(finishIndex => {
    promises[finishIndex] = handler(url).then(() => {
      return finishIndex
    })
  }))
}, Promise.resolve()).then(() => Promise.all(promises))

```

- 实现 finally

```js
Promise.prototype.finally = function(onFinally) {
	return this.then(
		/* onFulfilled */
		res => Promise.resolve(onFinally()).then(() => res),
		/* onRejected */
		err =>
			Promise.resolve(onFinally()).then(() => {
				throw err;
			})
	);
};
```

- 实现 Promise.all

```js
Promise.all = function(promises) {
	return new Promise(function(resolve, reject) {
		var resolvedCounter = 0;
		var promiseNum = promises.length;
		var resolvedValues = new Array(promiseNum);
		for (var i = 0; i < promiseNum; i++) {
			// 自执行函数传入i
			(function(i) {
				Promise.resolve(promises[i]).then(
					function(value) {
						resolvedCounter++;
						resolvedValues[i] = value;
						if (resolvedCounter == promiseNum) {
							return resolve(resolvedValues);
						}
					},
					function(reason) {
						return reject(reason);
					}
				);
			})(i);
		}
	});
};
```

- Promise 的错误捕获
  当 promise 的状态为 rejected 且未对 promise 对象使用 catch 方法，此时的异常信息会被 promise 对象吃掉 可以通过监听 `unhandledRejection` 事件，专门监听未捕获的 reject 错误。

```js
// 浏览器下
window.addEventListener("unhandledrejection", e => {
	e.preventDefault();
	console.log(e);
});
```

:::

::: details 基础输出顺序题

```js
new Promise((resolve, reject) => {
	console.log(3);
	let p = new Promise((resolve, reject) => {
		console.log(7);
		setTimeout(() => {
			console.log(5);
			resolve(6);
		}, 0);
		resolve(1);
	});
	resolve(2);
	p.then(arg => {
		console.log(arg);
	});
}).then(arg => {
	console.log(arg);
});
console.log(4);

// 3 7 4 1 2 5
```

```js
Promise.resolve().then(() => {
	console.log("promise1");
	const timer2 = setTimeout(() => {
		console.log("timer2");
	}, 0);
});
const timer1 = setTimeout(() => {
	console.log("timer1");
	Promise.resolve().then(() => {
		console.log("promise2");
	});
}, 0);
console.log("start");

// 'start'
// 'promise1'
// 'timer1'
// 'promise2'
// 'timer2'
```

```js
const promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("success");
	}, 1000);
});
const promise2 = promise1.then(() => {
	throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
	console.log("promise1", promise1);
	console.log("promise2", promise2);
}, 2000);

// 'promise1' Promise{<pending>}
// 'promise2' Promise{<pending>}
// test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
// 'promise1' Promise{<resolved>: "success"}
// 'promise2' Promise{<rejected>: Error: error!!!}
```

```js
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
```

```js
Promise.resolve()
	.then(() => {
		return new Error("error!!!");
	})
	.then(res => {
		console.log("then: ", res);
	})
	.catch(err => {
		console.log("catch: ", err);
	});

// "then: " "Error: error!!!"

// 返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
// 当然如果你抛出一个错误的话，可以用下面👇两的任意一种：
// return Promise.reject(new Error('error!!!'));
// 或者
// throw new Error('error!!!')
```

```js
async function async1() {
	console.log("async1 start");
	await new Promise(resolve => {
		console.log("promise1");
	});
	console.log("async1 success");
	return "async1 end";
}
console.log("script start");
async1().then(res => console.log(res));
console.log("script end");

// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'

// 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，所以在await之后的内容是不会执行的，也包括async1后面的 .then。
```

```js
async function async1() {
	console.log("async1 start");
	await new Promise(resolve => {
		console.log("promise1");
		resolve("promise1 resolve");
	}).then(res => console.log(res));
	console.log("async1 success");
	return "async1 end";
}
console.log("script start");
async1().then(res => console.log(res));
console.log("script end");

// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
// 'promise1 resolve'
// 'async1 success'
// 'async1 end
```

```js
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
console.log("script end");

// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'async1 end'
// 'promise2'
// 'setTimeout'
```

```js
async function async1() {
	await async2();
	console.log("async1");
	return "async1 success";
}
async function async2() {
	return new Promise((resolve, reject) => {
		console.log("async2");
		reject("error"); // 如果改为throw new Error也是一样的
	});
}
async1().then(res => console.log(res));

// 'async2'
// Uncaught (in promise) error
```

:::

::: details 综合输出顺序题

```js
const first = () =>
	new Promise((resolve, reject) => {
		console.log(3);
		let p = new Promise((resolve, reject) => {
			console.log(7);
			setTimeout(() => {
				console.log(5);
				resolve(6);
				console.log(p);
			}, 0);
			resolve(1);
		});
		resolve(2);
		p.then(arg => {
			console.log(arg);
		});
	});
first().then(arg => {
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
	console.log("async1");
	setTimeout(() => {
		console.log("timer1");
	}, 2000);
	await new Promise(resolve => {
		// await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，await之下的语句都不会执行
		console.log("promise1");
	});
	console.log("async1 end");
	return "async1 success";
};
console.log("script start");
async1().then(res => console.log(res));
console.log("script end");
Promise.resolve(1)
	.then(2)
	.then(Promise.resolve(3))
	.catch(4)
	.then(res => console.log(res));
setTimeout(() => {
	console.log("timer2");
}, 1000);

// 'script start'
// 'async1'
// 'promise1'
// 'script end'
// 1
// 'timer2'
// 'timer1'
// 注意定时器的延迟时间

// 注意这道题最后p1的返回值！！！！！！！！！！！！
const p1 = new Promise(resolve => {
	setTimeout(() => {
		resolve("resolve3");
		console.log("timer1");
	}, 0);
	resolve("resolve1");
	resolve("resolve2");
})
	.then(res => {
		console.log(res);
		setTimeout(() => {
			console.log(p1);
		}, 1000);
	})
	.finally(res => {
		console.log("finally", res);
	});

// 'resolve1'
// 'finally' undefined
// 'timer1'
// Promise{<resolved>: undefined} // 这里最后输出的返回值，就是finally的返回值undefined
```

:::

```js
const arr = [1, 2, 3];
arr.reduce(
	(p, x) =>
		p.then(
			() =>
				new Promise(resolve => {
					setTimeout(() => resolve(console.log(x), 1000));
				})
		),
	Promise.resolve()
);
```

[【建议星星】要就来 45 道 Promise 面试题一次爽到底(1.1w 字用心整理)](https://juejin.im/post/5e58c618e51d4526ed66b5cf)
[「ES6 系列」彻底弄懂 Promise](https://juejin.im/post/5d06e9c76fb9a07ee4636235)
