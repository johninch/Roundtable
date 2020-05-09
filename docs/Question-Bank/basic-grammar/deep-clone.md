---
{
    "title": "完美实现深拷贝",
}
---

# 完美实现深拷贝

深复制和浅复制只针对像 Object, Array 这样的复杂对象的。简单来说，浅复制只复制一层对象的属性，而深复制则递归复制了所有层级。
- **浅复制**：由于浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JS 存储对象都是存地址的，所以浅复制会导致 `obj.arr `和 `shallowObj.arr` 指向同一块内存地址。
    - 导致的结果就是给shallowObj.arr[1]=5赋值，同时也改变了obj.arr[1]的值(也变为5)。
    - 因为浅复制比深复制简单得多，ES6定义了`Object.assign(...)`方法来实现`浅复制`。它会遍历一个或多个源对象的所有可枚举的自有键并把它们复制到目标对象，最后返回目标对象。`var newObj = Object.assign( {}, obj )`
- **深复制**：深复制不仅将源对象的各个属性逐个复制出去，而且将源对象各个属性所包含的对象也**逐一递归**复制到新对象上，这就不会导致 `obj.arr` 和 `deepObj.arr` 属性指向同一个对象的问题。
    - `最简单的深拷贝`，利用JSON全局对象的parse和stringify方法：`var b = JSON.parse(JSON.stringify(a))`。这种简单方式的**缺点是**：
        - 无法复制函数，只能处理如 Number，String，Boolean，Array 等那些**能够被json直接表示的**数据结构。即`JSON安全的数据结构`。
        - 会抛弃对象的constructor，所有的构造函数会指向Object；
        - 对象有循环引用，会报错。

## 推荐答案
::: details 推荐答案-完美深拷贝
```js
// 可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
// 不可继续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 可继续遍历类型合集
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 工具函数-通用while循环，性能更好
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// 工具函数-判断是否为引用类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// 工具函数-获取实际类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

// 工具函数-初始化被克隆的对象
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

// 工具函数-克隆Symbol
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

// 工具函数-克隆正则
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

// 工具函数-克隆函数
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

// 工具函数-克隆不可遍历类型
function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型（即非包装类型的基础数据类型）
    if (!isObject(target)) {
        return target;
    }

    // 初始化-根据不同类型进行操作
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 处理 循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

module.exports = {
    clone
};

```
***相关知识点链接：***
- [本文链接 - 如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1#heading-6)
- [类型转换之装箱操作 - toObject](https://juejin.im/post/5cbaf130518825325050fb0a "装箱")
- [类型转换之拆箱操作 - ToPrimitive](https://juejin.im/post/5ccfb58f518825405a198fcd "拆箱")
- [原来JS还可以这样拆箱转换详解](http://www.cppcns.com/wangluo/javascript/251632.html)
:::

## Johninch
Array也属于能够被JSON直接表示的数据结构，所以可以利用JSON来完成深复制。

总的来说，现在**没有一个统一的标准解决办法**来实现深复制。上述有提供`相对完美的深复制方案`。
```js
function deepClone(obj) {
    var newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    // 接下来都是用 typeof来判断object，因为判断的是广义上的对象类型
    if (typeof obj !== 'object') {
        return
    }

    if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for(var i in obj) {
            newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }

    return newObj
}
```

## febcat
```javascript
const deepClone = obj => {
    if (typeof obj !== 'object') {
      console.info(`deepClone: not object, is ${typeof obj}`)
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.reduce((arr, item) => arr.concat(deepClone(item)), [])
    }

    return Object.entries(obj).filter(item => obj.hasOwnProperty(item[0])).reduce((newObj, [key, value]) => {
      newObj[key] = deepClone(value)

      return newObj
    }, {})
  }
```


## Caleb
``` javascript
function deepClone(origin){
	let target = Array.isArray(origin) ? [] : {};

	if (typeof origin !== 'object'){
		return origin;
	}

	for(let i in origin){
		if(origin.hasOwnProperty(i)) {
			if(typeof origin[i] === 'object' && origin[i] !== 'null'){
				target[i] = origin[i]
		} else {
				target[i] = deepClone(origin[i])
			}
		}
	}

	return target
}

```

## Xmtd
```js
function cloneDeep(target) {
    if (!target || typeof target !== 'object') {
        return target;
    }
    
    let result = Array.isArray(target) ? [] : {};
    
    for (let name in target) {
        if (target.hasOwnProperty(name)) {
            if (typeof target[name] === 'object') {
                result[name] = cloneDeep(target[name]);
            } else {
                result[name] = target[name]
            }
        }
    }
    
    return result;
}
```

## niannings
```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

const canTraverse = o => {
  const checkSet = new Set(['array', 'object']);

  return checkSet.has(getType(o));
};

const clone = obj => {
  let ret = new obj.constructor();
  let stack = [obj];
  let refMap = new WeakMap();
  let traverseObj;

  refMap.set(obj, ret);

  while (traverseObj = stack.pop()) {
    let entries = Object.entries(traverseObj);
    let len = entries.length;
    let cur = refMap.get(traverseObj);

    for (let i = 0; i < len; i++) {
      let [k, v] = entries[i];

      if(canTraverse(v) && !refMap.has(v)) {
        cur[k] = new v.constructor();

        refMap.set(v, cur[k]);
        stack.push(v);
      } else if (refMap.has(v)) {
        cur[k] = refMap.get(v);
      } else {
        cur[k] = v;
      }
    }
  }

  return ret;
}

// 测试用例
// 普通对象
let a = {
  b: {
    c: []
  },
  d: 1,
  e: /\w/,
  f: null,
  g: undefined,
  h: "hello niannings"
};

let b = clone(a);

console.log("---测试对象---");
console.log(a, b);
console.log("a === b: ", a === b); // false
console.log("a.b === b.b", a.b === b.b); // false
console.log("a.b.c === b.b.c", a.b.c === b.b.c); // false

// 测试循环引用

b.r = b;
b.s = b.b;

let bb = clone(b);

console.log("---测试循环引用---");
console.log(b, bb);
console.log("b.r === bb.r: ", b.r === bb.r);

// 数组
let c = [1, a, "hello"];

let d = clone(c);

console.log("---测试数组---");
console.log(c, d);
console.log("d === c: ", d === c);
console.log("c[1] === d[1]: ", c[1] === d[1]);
console.log("c[1].b === d[1].b: ", c[1].b === d[1].b);
```

## superwyk
```js
// 只考虑基本数据类型、数组、plain Object的复制
function deepCopy(o) {
    // 判断是否为数组
    if (Object.prototype.toString.call(o) === '[object Array]') {
        let array = [];
        for (let i = 0; i < o.length; i++) {
            array[i] = deepCopy(o[i]);
        }
        return array;
    } else if (Object.prototype.toString.call(o) === '[object Object]') {
        let object = {};
        let keys = Object.keys(o);
        for (let i = 0; i < keys.length; i++) {
            object[keys[i]] = deepCopy(o[keys[i]]);
        }
        return object;
    } else {
        return o;
    }
}
```
