

// 返回promise的JSONP封装
function JSONP(url, params = {}, callbackKey = 'cb') {
    return new Promise((resolve, reject) => {
        // 定义本地的唯一callbackId，若是没有的话则初始化为1
        JSONP.callbackId = JSONP.callbackId || 1;
        JSONP.callbacks = JSONP.callbacks || [];

        // 把要执行的回调加入到JSON对象中，避免污染window
        let callbackId = JSONP.callbackId;
    
        params[callbackKey] = `JSONP.callbacks[${callbackId}]` // 把设定的函数名称放入到参数中，'cb=JSONP.callbacks[1]'

        const paramString = Object.keys(params).map(key => {
            return `${key}=${encodeURIComponent(params[key])}`
        }).join('&')
    
        const script = document.createElement('script')
        script.setAttribute('src', `${url}?${paramString}`)
        
        // 注册全局函数，等待执行
        JSONP.callbacks[callbackId] = result => {
            // 一旦执行，就要删除js标签和注册的函数
            delete JSONP.callbacks[callbackId]
            document.body.removeChild(script)
            if (result) {
                resolve(result);
            } else {
                reject(new Error('没有返回数据'))
            }
        }

        // js加载异常的情况
        script.addEventListener('error', () => {
            delete JSONP.callbacks[callbackId]
            document.body.removeChild(script)

            reject(new Error('JavaScript资源加载失败'))
        }, false)

        // 添加js节点到document上时，开始请求
        document.body.appendChild(script)
        
        JSONP.callbackId++ // id自增，保证唯一
    })
}


function JSONP({url, params = {}, callbackKey = 'cb', callback}) {
    JSONP.callbackId = JSONP.callbackId || 1
    JSONP.callbacks = JSONP.callbacks || []

    let callbackId = JSONP.callbackId
    JSONP.callbacks[callbackId] = callback

    params[callbackKey] = `JSONP.callbacks[${callbackId}]`

    const paramString = Object.keys(params).map(key => {
        return `${key}=${encodeURIComponent(params[key])}`
    }).join('&')

    const script = document.createDocument('script')
    script.setAttribute('src', `${url}?${paramString}`)
    document.body.appendChild(script)

    JSONP.callbackId++
}

const input = document.getElementById('input')
let obj = {val: ''}

Object.defineProperties(obj, 'val', {
    get() {
        return input.value
    },
    set(value) {
        input.value = value
    }
})

input.addEventListener('input', (ev) => {
    obj.val = ev.target.value
})



function findPath(a, obj) {
    for(var key in obj) {                                         // for each key in the object obj
        if(obj.hasOwnProperty(key)) {                             // if it's an owned key
            if(a === obj[key]) return key;                        // if the item beign searched is at this key then return this key as the path
            else if(obj[key] && typeof obj[key] === "object") {   // otherwise if the item at this key is also an object
                var path = findPath(a, obj[key]);                 // search for the item a in that object
                if(path) return key + "." + path;                 // if found then the path is this key followed by the result of the search
            }
        }
    }
}

var obj = {
  "a": [1, 2, {"o": 5}, 7],
  "b": [0, [{"bb": [0, "str"]}]]
};

console.log(findPath(5, obj)); // a.2.o
console.log(findPath("str", obj).split(".")); // ["b", "1", "0", "bb", "1"]

var arr = [
    {
        "id": 1,
        "department_code": "XIAOMI",
        "department_name": "小米",
        "children": [
            {
                "id": 2,
                "department_code": "HR",
                "department_name": "人力资源部",
                "children": [
                    {
                        "id": 4,
                        "department_code": "dubin",
                        "department_name": "杜冰"
                    },
                    {
                        "id": 6,
                        "department_code": "yuchi",
                        "department_name": "ESOP"
                    }
                ]
            },
            {
                "id": 3,
                "department_code": "BUSINESS",
                "department_name": "商务部"
            }
        ]
    }
]

findPath('yuchi', arr)

function findPath(target, arr) {
    function _findPath(target, arr) {
        if (arr && arr.length) {
            for(let i = 0; i < arr.length; i++) {
                if (target === arr[i].department_code) {
                    return arr[i].department_code
                } else if (arr[i] && JSON.stringify(arr[i]) !== '{}') {
                    var path = _findPath(target, arr[i].children)
                    if (path) return `${arr[i].department_code}.${path}`
                }
            }
        }
    }

    let result = _findPath(target, arr)
    if (result) {
        return result.split('.')
    } else {
        return []
    }
}



var Person = (() => {
    const _name = Symbol()
    class Person {
        constructor(name) {
            this[_name] = name
        }
        get name() {
            return this[_name]
        }
        set name(name) {
            this[_name] = name
        }
    }

    return Person
})()

var Person = (() => {
    const _name = '00' + Math.random()

    function Person(name) {
        this[_name] = name
    }

    Object.defineProperty(Person.prototype, 'name', {
        get() {
            return this[_name]
        },
        set(name) {
            this[_name] = name
        }
    })

    return Person
})()




console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String)); //true

function myInstanceof(left, right) {
    if (typeof left !== "object" || left === null) {
        return false
    }

    while(true) {
        let proto = Object.getPrototypeOf(left)
        if (!proto) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto.prototype)
    }
}


function one(cb) {
    let num = 1
    if (cb) {
        return cb(num)
    }

    return num
}
function two(cb) {
    let num = 2
    if (cb) {
        return cb(num)
    }

    return num
}
function add(num) {
    return function(a) {
        return num + a
    }
}

const fib = (() => {
    let memo = [0, 1]
    return function _fib(n) {
        let res = memo[n]
        if (typeof res !== 'number') {
            memo[n] = _fib(n - 1) + _fib(n - 2)
            res = memo[n]
        }
        return res
    }
})()


const fn = (() => {
    let count = 0
    return function _fn() {
        if (this.constructor == _fn) { // es5中判断是new调用
        // if (new.target) { // es6中判断是new调用
            console.log(`new了${++count}次`)
        } else {
            console.log('普通函数执行')
        }
    }
})()


arr1.map((cur, index, sourceArr) => {}, callbackThis)

arr1.reduce((prev, cur, index, sourceArr) => {}, initial)

Array.prototype._map = function(cb, callbackThis) {
    let res = []
    let CBThis = callbackThis || null

    this.reduce((prev, cur, index, sourceArr) => {
        res.push(cb.call(CBThis, cur, index, sourceArr))
    }, null)

    return res
}


function moniInterval(fn, time) {
    const interval = () => {
        setTimeout(interval, time)
        fn()
    }

    setTimeout(interval, time)
}

function timeQueue() {
    let count = 1
    const interval = () => {
        console.log(count++)
        setTimeout(interval, count * 10 * 1000)
    }

    setTimeout(interval, count * 10 * 1000)
}


function wordschain(...args) {
    let res = []
    const createChain = (...args) => {
        res = [...res, ...args]

        return createChain
    }

    createChain.valueOf = function() {
        console.log(res.join(' => '))
    }

    return createChain(...args)
}

wordschain('胸有成竹')('竹报平安')('安富尊荣', '荣华富贵').valueOf()
wordschain('胸有成竹')('竹报平安')('安富尊荣').valueOf()


function add(...args) {
    let res = []

    const createChain = (...args) => {
        res = [...res, ...args]

        return createChain
    }

    createChain.valueOf = function() {
        console.log(res.reduce((a, b) => a + b, 0))
    }

    return createChain(...args)
}

add(1, 3, 4)(7)(5, 5).valueOf();


function wait(fn, time) {
    let delay = 0
    function createChain(fn, time) {
        delay += time
        setTimeout(() => {
            fn()
        }, delay * 1000)

        return {
            wait: createChain
        }
    }

    return createChain(fn, time)
}

wait(() => {console.log(3)}, 3).wait(() => {console.log(5)}, 5).wait(() => {console.log(10)}, 10)


function JSONP({url, params = {}, callbackKey = 'cb', callback}) {
    JSONP.callbackId = JSONP.callbackId || 1
    JSONP.callbacks = JSONP.callbacks || []

    let callbackId = JSONP.callbackId
    JSONP.callbacks[callbackId] = callback

    params[callbackKey] = `JSONP.callbacks[${callbackId}]`

    let paramString = Object.keys(params).map(k => {
        return `${k}=${encodeURIComponent(params[k])}`
    }).join('&')

    const script = document.createElement('script')
    script.setAttribute('src', `${url}?${paramString}`)
    document.body.appendChild(script)

    JSONP.callbackId++
}


const input = document.createElement('input')
const obj = { val: '' }

Object.defineProperties(obj, 'val', {
    enumerable: false,
    configurable: false,
    get() {
        return input.value
    },
    set(value) {
        input.value = value
    }
})

input.addEventListener('input', function(ev) {
    obj.val = ev.target.value
})


class Vue {
    constructor(options) {
        this.$data = options.data
        this.observe(this.$data)
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return 
        }

        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object') {
                this.observe(data[key])
            }
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            get() {
                return val
            },
            set(newValue) {
                if (newValue === val) {
                    return 
                }
                val = newValue
            }
        })
    }
}

function debounce(fn, time) {
    let timer
    return function(...args) {
        clearTimeout(timer)
        let that = this
        timer = setTimeout(() => {
            fn.apply(that, [...args])
        }, time)
    }
}

function throttle(fn, time) {
    let canDo = true
    return function(...args) {
        if (!canDo) {
            return
        }
        canDo = false
        let that = this
        setTimeout(() => {
            fn.apply(that, [...args])
            canDo = true
        }, time)
    }
}

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function() {
            resolve('chenggong' + url)
        }
        img.onerror = function() {
            reject(new Error('err from' + url))
        }
        img.src = url
    })
}

function binarySearch(target, arr, start, end) {
    if (start > end) return -1

    let mid = start + ((end - start) >> 1)

    if (target === arr[mid]) {
        return mid
    } else if (target > arr[mid]) {
        return binarySearch(target, arr, mid, end)
    } else {
        return binarySearch(target, arr, start, mid)
    }
}


function isType(value) {
    if (typeof value !== 'object') {
        return typeof(value)
    }

    return Object.prototype.toString.call(value).replace(/^\[object (\w+)\]$/, "$1").toLowerCase()
}


let ul = document.createElement('ul')
let fragment = document.createDocumentFragment()

for(let i = 0, li; i < 10000; i++) {
    li = document.createElement('li')
    li.innerHTML = `第${i}个li标签`
    fragment.appendChild(li)
}

ul.appendChild(fragment)


let ul = document.createElement('ul')
let str = ''

for(let i = 0, li; i < 10000; i++) {
    li = document.createElement('li')
    str += `<li>第${i}个li标签</li>`
}

ul.innerHTML = str(str)




function quickSort(arr) {
    return arr.length <= 1 ? arr : quickSort(arr.slice(1).filter(item => item < arr[0])).concat(arr[0], quickSort(arr.slice(1).filter(item => item >= arr[0])))
}


Object.create = Object.create || function(obj) {
    function Fn() {}
    Fn.prototype = obj

    return new Fn()
}


var thisNew = function(M) {
    // Object.create()返回空对象o，并关联M的原型对象
    var o = Object.create(M.prototype);
    // 执行构造函数M，并绑定作用域到o上
    var res = M.call(o);
    // 判断res是否是广义上的对象，是则返回res，否则返回o
    if (res instanceof Object) { // 使用typeof不行，因为需要排除null的情况
        return res;
    } else {
        return o;
    }
}


function flattenArr(arr) {
    let res = []
    for(let item of arr) {
        if (Array.isArray(item)) {
            res = res.concat(flattenArr(item))
        } else {
            res.push(item)
        }
    }
    return res
}



flattenArr([1, [2, [3, 4]]])

[1, [2, [3, 4]]].toString().split(',').map(i => Number(i))



Array.from(new Set(arr))

function unique(arr) {
    return [...new Set(arr)]
}


class EventEmitter {
    constructor() {
        this._eventbus = {}
    }
    on(type, cb) {
        if (!this._eventbus[type]) {
            this._eventbus[type] = []
        }
        this._eventbus[type].push(cb)
    }
    emit(type, ...args) {
        if (this._eventbus[type]) {
            this._eventbus.forEach(cb => {
                cb(...args)
            })
        }
    }
    off(type, cb) {
        if (this._eventbus[type]) {
            if (cb) {
                const index = this._eventbus[type].indexOf(_cb => _cb === cb)
                index > -1 && this._eventbus[type].splice(index, 1)
            } else {
                delete this._eventbus[type]
            }
        }
    }
    once(type, cb) {
        this.on(type, (...args) => {
            cb(...args)
            this.off(type)
        })
    }
}


class EventEmitter {
    constructor() {
        this._eventbus = {}
    }
    on(type, cb) {
        let handler = this._eventbus[type]
        if(!handler) {
            this._eventbus[type] = handler
        } else if (handler && typeof handler === 'function') {
            this._eventbus[type] = [handler, cb]
        } else {
            this._eventbus[type].push(cb)
        }
    }
    emit(type, ...args) {
        let handler = this._eventbus[type]
        if(handler && Array.isArray(handler)) {
            handler.forEach(cb => {
                args.length > 0 ? cb.apply(this, args) : cb.call(this)
            })
        } else {
            args.length > 0 ? handler.apply(this, args) : handler.call(this)
        }
    }
    off(type, cb) {
        let handler = this._eventbus[type]
        if (handler && typeof handler === 'function') {
            delete this._eventbus[type]
        } else {
            const index = this._eventbus[type].indexOf(_cb => _cb === cb)
            if (index > -1) {
                this._eventbus[type].splice(index, 1)
                if (handler.length === 1) {
                    this._eventbus[type] = handler[0]
                }
            }
        }
    }
    once(type, cb) {
        this.on(type, (...args) => {
            args.length > 0 ? cb.apply(this, args) : cb.call(this)
            this.off(type, cb)
        })
    }
}

function Parent() {
    this.type = 'laoba'
    this.habit = [1, 2, 3]
}

Parent.prototype.say = function() {
    console.log('wo shi ni die')
}

function Child() {
    Parent.call(this)
    this.type = 'xiaozi'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

let s1 = new Child()
let s2 = new Child



const template = "I am {{name }}, {{ age}} years old";
var context = { name: "xiaoming", age: 2 };
console.log(templateStr(template, context));

function templateStr(template, context) {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        console.log(match, key)
        return context[key.trim()]
    })
}

// 与千分位题
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
}

toThousands(123456789011)

// 写一个方法,实现字符串从后往前每三个插入|,得到"ad|abc|def|ghi"
const str = "adabcdefghi"
var newStr = str.replace(/(\w)(?=(?:\w{3})+$)/g, '$1|')
console.log(newStr);


function deepClone(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj
    }

    let newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {}

    if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for(let key in obj) {
            newObj[key] = (typeof obj[key] === 'object' && obj[key] !== null) ? deepClone(obj[key]) : obj[key]
        }
    }

    return newObj
}


const ul = document.createElement('ul')

ul.addEventListner('click', (ev) => {
    if (ev.target && ev.target.tagName.toLowerCase() === 'li') {
        // zhixing
    }
}, false)

function trim(str) {
    return str.replace(/^(\s*)|(\s*)$/g, '')
}

trim('   lalal  ')


Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1)
    let self = this
    return function() {
        const bindArgs = Array.prototype.slice.call(arguments)
        self.apply(ctx, args.concat(bindArgs))
    }
}

Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1)
    let self = this
    let res = function() {
        const bindArgs = Array.prototype.slice.call(arguments)
        self.apply(this instanceof self ? this : ctx, args.concat(bindArgs))
    }

    function Foo() {}

    Foo.prototype = this.prototype
    res.prototype = new Foo()

    return res
}


function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`睡眠${time}毫秒`)
        }, time)
    })
}

async function run(tm) {
    let res = await sleep(tm)
    console.log(res)
}
run()


function cacheRequest(url, successCallback, errorCallback) {
    if (cacheRequest.cache[url]) {
        cacheRequest.cache[url].then(successCallback).catch(errorCallback)
    }

    let success
    let fail
    cacheRequest.cache[url] = new Promise((resolve, reject) => {
        success = resolve
        fail = reject
    })

    return request(
        url,
        response => {
            success(response.data)
            successCallback(response)
        },
        error => {
            fail(error)
            errorCallback(error)
        }
    )
}

cacheRequest.cache = {}
cacheRequest.clear = () => {cacheRequest.cache  = {}}



function retry(job) {
    let count = 0
    const walk = () => {
        count++
        new Promise((resolve, reject) => {
            job().then(response => {
                resolve(response)
            }).catch(err => {
                if (count === 4) {
                    reject(err)
                } else {
                    resolve(walk())
                }
            })
        })
    }

    walk()
}

async function asyncInOrder(urls) {
    const promises = urls.map(async url => {
        let res = await fetch(url)
        return res.status
    })

    for(const p of promises) {
        console.log(await p)
    }
}

asyncInOrder(['xxx', 'yyuyy'])


function iteratorPromise1(pArr) {
    const iter = () => {
        if (pArr.length) {
            let p = pArr.shift();
            p().then(response => {
                console.log(response);
                iter()
            }).catch(err => {
                console.log(err);
            })
        }
    }

    iter()
}

function iteratorPromise2(pArr) {
    let resolve = Promise.resolve()
    pArr.forEach(p => {
        resolve = resolve.then(() => p()).catch(err => console.log(err));
    })
}

function promiseDelay(arr) {
    let resolve = Promise.resolve()

    arr.forEach(item => {
        resolve = resolve.then(() => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(console.log(item))
            }, 1000);
        })).catch(err => {
            console.log(err, item)
        })
    })
}

promiseDelay([1, 2, 3, 4])

function promiseDelay2(arr) {
    arr.reduce((prev, cur) => 
        prev.then(() => {
            return new Promise((resolve, reject) => { // 注意new Promise一定要return
                setTimeout(() => {
                    resolve(console.log(cur))
                }, 1000)
            })
        })
    , Promise.resolve())
}

promiseDelay2([1, 2, 3, 4])



function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

function light(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
            fn()
        }, time)
    })
}

function run() {
    Promise.resolve().then(() => {
        return light(red, 1000)
    }).then(() => {
        return light(yellow, 2000)
    }).then(() => {
        return light(green, 3000)
    })
}

run()

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

// 如果按定时器先后打印
async function mergePromise(arr) {
    const data = [];
    const promises = arr.map(async ajax => {
        return await ajax()
    })

    for(const promise of promises) {
        let value = await promise
        data.push(value)
    }

    return data // async 直接返回data
}

// 如果是按顺序串行打印的话
function mergePromise(arr) {
    let resolve = Promise.resolve()
    const data = []
    arr.forEach(ajax => {
        resolve = resolve.then(ajax).then(res => {
            data.push(res)

            return data
        })
    })

    return resolve // promise 需要返回resolve
}



function limitLoad(urls, handler, limit) {
    let sequence = urls.slice()
    const promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(res => {
            console.log(res, url)
            return index
        })
    })

    return sequence.reduce((pCollect, url) => {
        return pCollect.then(() => Promse.race(promises))
            .then(finishedIndex => {
                promises[finishedIndex] = handler(url).then(res => {
                    console.log(res, url)
                    return index
                })
            })
            .catch(err => {
                console.log(err)
            })
        }, Promise.resolve())
    .then(() => {
        return Promise.all(promises)
    })
}


class Promise {
    constructor(executor) {
      // 三个状态
      this.state = 'pending'
      this.value = undefined
      this.reason = undefined
      let resolve = value => {
        if (this.state === 'pending') {
          this.state = 'fulfilled'
          this.value = value
        }
      }
      let reject = value => {
        if (this.state === 'pending') {
          this.state = 'rejected'
          this.reason = value
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
        case 'fulfilled':
          onFulfilled(this.value)
          break
        case 'rejected':
          onRejected(this.reason)
          break
        default:
      }
    }
  }





