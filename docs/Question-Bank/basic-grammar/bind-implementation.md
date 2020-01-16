---
title: bind方法实现
date: 2019-01-14 10:30:00
tags: [js, 算法]
categories: javascript
---

# bind方法实现

> 要求实现Function.prototype.bind方法（注意，该方法要求实现到函数对象原型上，并且支持额外参数传递）

## 方法一
```js
// es5 实现
Function.prototype.bind = function () {
    const args = Array.prototype.slice.call(arguments);
    const context = args[0];
    args.splice(0, 1);
    const _this = this;
    return function () {
        const newArgs = args.concat(Array.prototype.slice.call(arguments));
        console.log(context, args, arguments, newArgs)
        return _this.apply(context, newArgs);
    }
}
```

## 方法二
```js
// es6 实现
Function.prototype.bind = function (...args) {
    const [context, ...rest] = args;
    const _this = this;
    return function (...additionArgs) {
        const newArgs = [...rest, ...additionArgs];
        return _this.apply(context, newArgs);
    }
}
```

## 方法（mtd）
### 模拟实现apply

```js
Function.prototype._apply = function(ctx) {
  const context = ctx || window;
  const fn = Symbol();

  // 首先要获取调用call的函数，用this可以获取
  context[fn] = this;
  var args = arguments[1]; //获取传入的数组参数
  if (!args) {
    return context[fn]();
  }
  let value = context[fn](...args);
  delete context[fn];

  return value;
};
```

### 模拟实现call

```js
Function.prototype._call = function(context) {
  // [].shift._apply(arguments) 拿到第一个参数
  return this._apply(([].shift._apply(arguments)), arguments)
};
```

### 模拟实现bind

```js
Function.prototype._bind = function (context) {
  let me = this;

  let args = Array.prototype.slice._call(arguments, 1);

  /**
   * bind() 方法会创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数和其原本的参数，
   * bind返回的绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数
   *
   */
  let F = function () {};
  F.prototype = this.prototype;

  let bound = function () {
    let innerArgs = Array.prototype.slice._call(arguments);
    let finalArgs = args.concat(innerArgs);
    return me._apply(this instanceof F ? this : context || this, finalArgs);
  };

  bound.prototype = new F();
  return bound;
};
```

### 使用
```js
let obj = {
  name: "xiaohong",
  sayHello: function (age) {
    console.log(this.name, age);
  }
};

let ming = {
  name: "xiaoming",
};

obj.sayHello._apply(ming, [23]);  // xiaoming 23
obj.sayHello._call(ming, 23);  // xiaoming 23

let fn = obj.sayHello._bind(ming, 23);
fn();       // xiaoming 23

let bound = new fn();  // undefined 23

```