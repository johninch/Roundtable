## 业务小代码

### 目录
::: details
- 私有属性实现，ES5、ES6
- 实现 fill(3, 4) 为 [4,4,4]
- 模拟实现instanceof
- one(add(two())) 或 two(add(one())) 等于3
- 斐波那契数列，使用memo做缓存，减少运算量
- new的时候加1
- 数组中map和reduce，如何用reduce实现map
- 统计字符串中出现最多的字母和次数
- 实现队列函数（先进先出），以实现一次100秒后打印出1，200秒后打印2，300秒后打印3这样
- setInterval有两个缺点
- 实现一个wait(1000, callback1).wait(3000, callback2).wait(1000, callback3)
- 实现成语接龙 wordschain('胸有成竹')('竹报平安')('安富尊荣').valueOf() 输出 胸有成竹 -> 竹报平安 -> 安富尊荣
- add(1, 3, 4)(7)(5, 5).valueOf();
- 实现JSONP
- 手写双向绑定
- 手写vue observe数据劫持
- 防抖节流
- promise实现图片懒加载
- 二分查找
- 封装类型判断函数
- 如何效率的向一个ul里面添加10000个li
- 快速排序
- Object.create
- 模拟实现new操作符
- 数组扁平化
- 简单版EventEmitter实现
- 优化版组合继承
- 创建Ajax
- 实现字符串模板
- 深拷贝
- 事件代理
- 手写bind函数
- 实现一个函数trim(str) 字符串前后去空格
- 如何用ES5实现promise
:::


### details
::: details 业务小代码
```js
// - 私有属性实现
// ES6
var Person = (() => {
    let _name = Symbol()
    class Person {
        constructor(name) {
            this[_name] = name
        }
        get name() { // 使用 getter可以改变属性name的读取行为
            return this[_name]
        }
    }

    return Person
})()
// ES5
var Person = (() => {
    var _name = '00' + Math.random() // 用一个随机数来做 
    function Person(name) {
        this[_name] = name
    }
    Object.defineProperty(Person.prototype, 'name', {
        get: function() {
            return this[_name]
        }
    })

    return Person
})()


// - 实现 fill(3, 4) 为 [4,4,4]
function fill(n, m) {
    n--
    if(n) {
        return [m].concat(fill(n, m))
    } else {
        return m
    }
}




// - 模拟实现instanceof
    // left是对象，right是原型对象
function myInstanceof(left, right) {
	//基本数据类型直接返回false
	if (typeof left !== 'object' || left == null) return false;
	//getPrototypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
	let proto = Object.getPrototypeOf(left);
	while (true) {
		// 如果查找到尽头，还没找到，return false
		if (proto == null) return false;
		//找到相同的原型对象
		if (proto === right.prototype) return true;
		proto = Object.getPrototypeOf(proto);
	}
}

console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String)); //true


// - one(add(two())) 或 two(add(one())) 等于3
console.log(one(add(two()))); // 3
console.log(two(add(one()))); // 3

function add(val) {
    // console.log(val);
    let num = val;
    return x => {
        return x + num;
    };
}

function one(cb) {
    const num = 1;
    if (cb) {
        return cb(num);
    }
    return num;
}

function two(cb) {
    const num = 2;
    if (cb) {
        return cb(num);
    }
    return num;
}

// - 斐波那契数列，使用memo做缓存，减少运算量
    // 动态规划的题也能使用这种方法做优化
const fib4 = (function () {
    var memo = [0, 1];
    return function _fib(n) {
        var result = memo[n];
        if (typeof result !== "number") {
            memo[n] = _fib(n - 1) + _fib(n - 2);
            result = memo[n];
        }
        return result;
    };
})();

console.log(fib4(9)); // 34


// ### new的时候加1
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

// ### 数组中map和reduce，如何用reduce实现map

arr1.map((cur, index, sourceArr) => {

}, callbackThis)

arr1.reduce((prev, cur, index, sourceArr) => {

}, initial)

Array.prototype._map = function(fn, callbackThis) {
    let res = []

    let CBThis = callbackThis || null;
    this.reduce((prev, cur, index, sourceArr) => {
        res.push(fn.call(CBThis, cur, index, sourceArr))
    }, null)

    return res
}



// ### 统计字符串中出现最多的字母和次数
function findMaxChar(str) {
    let obj = {}
    for(let i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
            obj[str[i]]++
        } else {
            obj[str[i]] = 1
        }
    }

    let keys = Object.keys(obj)
    let maxKey = '', maxCount = -1;

    for(let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] > maxCount) {
            maxCount = obj[keys[i]]
            maxKey = keys[i]
        }
    }

    return {
        char: maxKey,
        count: maxCount
    }
    
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
    let count = 1
    const interval = () => {
        setTimeout(interval, 1000 * count * 100)
        console.log(count++)
    }

    setTimeout(interval, 1000 * count * 100)
}



// ### 实现一个wait(1000, callback1).wait(3000, callback2).wait(1000, callback3)
const wait = (time, callback) => {
    let timeout = 0
    const createChain = (t, cb) => {
        timeout += t
        setTimeout(cb, timeout)

        return {
            wait: createChain
        }
    }

    return createChain(time, callback)
}

// ### 实现成语接龙 wordschain('胸有成竹')('竹报平安')('安富尊荣').valueOf() 输出 胸有成竹 -> 竹报平安 -> 安富尊荣
const wordschain = (...args) => {
    let allArgs = []
    const createChain = (...args) => {
        allArgs = [...allArgs, ...args]

        return createChain
    }

    createChain.valueOf = () => {
        console.log(allArgs.join(' => '))
    }

    return createChain(...args)
}

// ### add(1, 3, 4)(7)(5, 5).valueOf();
const add = (...args) => {
    let total = []
    const createChain = (...args) => {
        total = [...total, ...args]

        return createChain
    }

    createChain.valueOf = () => {
        console.log(total.reduce((a, b) => a + b, 0))
    }

    return createChain(...args)
}




// 实现JSONP
function JSONP({url, params = {}, callbackKey = 'cb', callback}) {
    // 定义本地的唯一callbackId，若是没有的话则初始化为1
    JSONP.callbackId = JSONP.callbackId || 1;
    JSONP.callbacks = JSONP.callbacks || [];

    // 把要执行的回调加入到JSON对象中，避免污染window
    let callbackId = JSONP.callbackId;
    JSONP.callbacks[callbackId] = callback;

    params[callbackKey] = `JSONP.callbacks[${callbackId}]` // 把设定的函数名称放入到参数中，'cb=JSONP.callbacks[1]'

    const paramString = Object.keys(params).map(key => {
        return `${key}=${encodeURIComponent(params[key])}`
    }).join('&')

    const script = document.createElement('script')
    script.setAttribute('src', `${url}?${paramString}`)
    document.body.appendChild(script)

    JSONP.callbackId++ // id自增，保证唯一
}

JSONP({
    url: 'http://localhost:8080/api/jsonp',
    params: {
        id: 1
    },
    callbackKey: 'cb',
    callback (res) {
        console.log(res)
    }
})
// 后端会将数据传参到拿来的函数，赋值给响应体。。。前端拿到的就是一个'JSONP.callbacks[1](data)'这样的字符串，script加载完脚本后立即执行，就能拿到数据了
this.body = `${callback}(${JSON.stringify(callbackData)})`


// ### 手写双向绑定
const input = document.getElementById('input')
const obj = { val: '' }

Object.defineProperty(obj, 'val', {
    get() {
        return input.value
    },
    set(value) {
        input.value = value
    },
    enumerable: false,
    configurable: false
})

input.addEventListner('input', function(ev) {
    obj.val = ev.target.value
})


// 手写vue observe数据劫持
class Vue {
    constructor(options) {
        //缓存参数
        this.$options = options;
        //需要监听的数据
        this.$data = options.data;
        //数据监听
        this.observe(this.$data);
    }
    observe(value) {
        if (!value || typeof value !== 'object') {
            return;
        }
        /*
            取到每个key和value 调用definReactive 进行数据劫持
        */
        Object.keys(value).forEach(key => {
            //深度监听
            if (typeof value[key] === 'object') {
                this.observe(value[key]);
            }
            this.definReactive(value, key, value[key]);
        })
    }
    definReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            get() {
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                console.log(`${key}属性更新了:${val}`);

            }
        })
    }
}


// ### 防抖节流
const debounce = (fn, time) => {
    let timer
    return function(...args) {
        let that = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(that, [...args])
        }, time)
    }
}

const throttle = (fn, time) => {
    let canDo = true;
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


// ### promise实现图片懒加载
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function() {
    	reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  })
};

// ### 二分查找
function binarySearch(target, arr, start, end) {
    if (start > end) return -1

    let mid = Math.floor((start + end) / 2)

    if (target === arr[mid]) {
        return mid
    } else if (target >= arr[mid]) {
        binarySearch(target, arr, mid + 1, end)
    } else {
        binarySearch(target, arr, start, mid - 1)
    }
}


// ### 封装类型判断函数
function getType(data) {
    let type = typeof data
    if (type !== 'object') {
        return type
    }

    // return Object.prototype.toString.call(data).match(/\s(\w+)/)[1].toLowerCase()
    return Object.prototype.toString.call(data).replace(/^\[object (\w+)\]$/,"$1").toLowerCase()
}

"[object Array]".match(/\s(\w+)/)


// ### 如何效率的向一个ul里面添加10000个li
// 方法1：使用fragment
let ul = document.getElementById('ul')
let fragment = document.createDocumentFragment()
for(let i = 0, li; i < 10000; i++) {
    li = document.createElement('li')
    li.innerHTML = '是个li'
    fragment.appendChild(li)
}
ul.appendChild(fragment)

// 方法2：使用字符串拼接
let ul = document.getElementById('ul')
let str = ''
for(let i = 0; i < 10000; i++) {
    str += '<li>是个li</li>'
}
ul.innerHTML(str)


// ### 快速排序
const quickSort = (arr) => {
    return arr.length <= 1 ? arr : quickSort(arr.slice(1).filter(item => item < arr[0])).concat(arr[0], quickSort(arr.slice(1).filter(item => item >= arr[0])))
}

// ### 实现Object.create
Object.create = Object.create || function(obj) {
    var F = function() {};
    F.prototype = obj;
    return new F()
}


// ### 模拟实现new操作符
var thisNew = function(M) {
    // Object.create()返回空对象o，并关联M的原型对象
    var o = Object.create(M.prototype);
    // 执行构造函数M，并绑定作用域到o上
    var res = M.call(o);
    // 判断res是否是广义上的对象，是则返回res，否则返回o
    if (typeof res === "object") {
        return res;
    } else {
        return o;
    }
}




// ### 数组扁平化
function flatten(arr) {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i]))
        } else {
            newArr.push(arr[i])
        }
    }

    return newArr
}



// ### 数组去重
Array.from(new Set(arr))
[...new Set(arr)]

// ### 简单版EventEmitter实现
class EventEmitter {
    constructor() {
        this._eventBus = {}
    }

    on(type, cb) {
        if (!this._eventBus[type]) {
            this._eventBus[type] = []
        }
        this._eventBus[type].push(cb)
    }

    emit(type, ...args) {
        if (this._eventBus[type]) {
            this._eventBus[type].forEach(cb => {
                cb(...args)
            })
        }
    }

    off(type, cb) {
        if (this._eventBus[type]) {
            let index = this._eventBus[type].indexOf(_cb => _cb === cb)
            index > -1 && this._eventBus[type].splice(index, 1)
        }
    }

    once(type, cb) {
        this.on(type, (...args) => {
            cb(...args)
            this.off(type)
        })
    }
}

// 优化版
class EventEmitter {
    constructor() {
        this._eventBus = {}
    }

    on(type, cb) {
        let handler = this._eventBus[type]
        if (!handler) {
            this._eventBus[type] = cb
        } else if (handler && typeof handler === 'function') {
            this._eventBus[type] = [handler, cb]
        } else {
            this._eventBus[type].push(cb)
        }
    }

    emit(type, ...args) {
        let handler = this._eventBus[type]
        if (handler && Array.isArray(handler)) {
            this._eventBus[type].forEach(cb => {
                args.length > 0 ? cb.apply(this, args) : cb.call(this)
            })
        } else {
            // 单个函数直接触发
            args.length > 0 ? handler.apply(this, args) : handler.call(this)
        }
    }

    off(type, cb) {
        let handler = this._eventBus[type]
        if (handler && typeof handler === 'function') {
            delete this._eventBus[type]
        } else {
            let index = this._eventBus[type].findIndex(_cb => _cb === cb)
            if (index > -1) {
                this._eventBus[type].splice(index, 1)
                if (handler.length === 1) {
                    this._eventBus[type] = handler[0]
                }
            }
        }
    }

    once(type, cb) {
        this.on(type, (...args) => {
            args.length > 0 ? cb.apply(this, args) : cb.call(this)
            this.off(type)
        })
    }
}

// 进阶版
class EventEmitter {
    constructor() {
        this._eventBus = this._eventBus || new Map()
    }

    on(type, cb) {
        let handler = this._eventBus.get(type)
        if (!handler) {
            this._eventBus.set(type, cb)
        } else if (handler && typeof handler === 'function') {
            this._eventBus.set(type, [handler, cb])
        } else {
            handler.push(cb)
        }
    }

    emit(type, ...args) {
        let handler = this._eventBus.get(type)
        if (handler && Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                Reflect.apply(handler[i], this, args)
            }
        } else {
            Reflect.apply(handler, this, args)
        }
    }

    off(type, cb) {
        let handler = this._eventBus.get(type)
        if (handler && typeof handler === 'function') {
            this._eventBus.delete(type)
        } else {
            let index = handler.findIndex(_cb => _cb === cb)
            if (index > -1) {
                handler.splice(index, 1)
                if (handler.length === 1) {
                    this._eventBus.set(type, [handler[0]])
                }
            }
        }
    }

    once(type, cb) {
        let handler = this._eventBus.get(type)
        this.on(type, (...args) => {
            Reflect.apply(handler, this, args)
            this.off(type)
        })
    }
}



// ### 优化版组合继承
function Parent() {
    this.type = 'Parent';
    this.habit = [1, 2, 3]
}

Parent.prototype.say() = function() { // 这里
    console.log('chichihehe')
}

function Child() {
    Parent.call(this) // 这里
    this.type = 'Child';
}

Child.prototype = Object.create(Parent.prototype) // 这里
Child.prototype.constructor = Child // 这里




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
const template = "I am {{name }}, {{ age}} years old";
var context = { name: "xiaoming", age: 2 };

function templateStr(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return context[key.replace(/\s/g, '')];
  });
}

console.log(templateStr(template, context));

// 千分位题
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
toThousands(123456789011)


// 写一个方法,实现字符串从后往前每三个插入|,得到"ad|abc|def|ghi"
const str = "adabcdefghi"
let newStr = str.replace(/(\w)(?=(?:\w{3})+$)/g, "$1|");
console.log(newStr);


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

    let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}

    if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for(let k in obj) {
            newObj[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
        }
    }

    return newObj
}

// ### 事件代理
// - 事件代理利用两个js事件特性：事件冒泡、目标元素。
// - 使用事件代理的话我们可以把事件处理器添加到一个祖先元素上，等待事件从它的子级元素里冒泡上来，并且可以很方便地判断出这个事件是从哪个元素开始的。
var ul = document.getElementById("ul");

ul.addEventListener('click', function(e) {
  if (e.target && e.target.tagName.toLowrCase() === 'li') {
    //需要执行的代码
  }
}, false);


// 手写bind函数
// 只实现返回函数 与 分开传参数
Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1)
    let self = this
    return function() {
        const bindArgs = Array.prototype.slice.call(arguments)
        self.apply(ctx, args.concat(bindArgs))
    }
}

// 还要模拟 当做构造函数使用
Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1)
    let self = this
    let res = function() {
        const bindArgs = Array.prototype.slice.call(arguments)
        self.apply(this instanceof self ? this : ctx, args.concat(bindArgs))
    }

    const Foo = function() {}

    Foo.prototype = this.prototype
    res.prototype = new Foo()

    return res
}

// Q：实现一个函数trim(str) 字符串前后去空格
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '')
}

```
:::



