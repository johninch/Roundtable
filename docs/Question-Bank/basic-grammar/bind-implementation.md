---
title: bind方法实现
date: 2019-01-14 10:30:00
tags: [js, 算法]
categories: javascript
---

# bind方法实现

> bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。bind的作用与call和apply相同，区别是call和apply是立即调用函数，而bind是返回了一个函数，需要调用的时候再执行。

> 要求实现Function.prototype.bind方法（注意，该方法要求实现到函数对象原型上，并且支持额外参数传递）

## johninch

模拟实现bind的关键点是如下几点：
1. `返回一个函数`；
2. `可以分开传入参数`: 函数需要传name和age两个参数，竟然还可以在bind的时候，只传一个 name，在执行返回的函数的时候，再传另一个参数age。
```js
var foo = {
  value: 1
}
function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}

var bindFoo = bar.bind(foo, 'Amy')
bindFoo('26')
// 1
// Amy
// 26
```
3. `实现构造函数`效果：当bind返回的函数作为构造函数的时候，把原函数当成构造器，bind时指定的this值会失效，但传入的参数依然生效。

### 只实现“返回函数”和“分开传入参数”
```js
Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1);
    let self = this;

    return function() {
        // 注意这里的arguments是指_bind返回的函数所接收的参数
        const bindArgs = Array.prototype.slice.call(arguments);
        self.apply(ctx, args.concat(bindArgs));
    }
}
```
### 完全模拟实现3条规则
```js
Function.prototype._bind = function(ctx) {
    const args = Array.prototype.slice.call(arguments, 1);
    let self = this;

    let result = function() {
        const bindArgs = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : ctx, args.concat(bindArgs));
    }

    let tmp = function () {}

    tmp.prototype = this.prototype;
    result.prototype = new tmp();

    return result;
}
```
> - 当_bind作为构造函数时，`this instanceof self`中的this指向实例，self指向绑定的原函数，此时判断条件为`true`，_bind指定的上下文ctx应失效，而应该是this；
> - 当_bind作为普通函数时，`this instanceof self`中的this指向window，self指向绑定的原函数，此时判断条件为`false`，_bind指定的上下文对象ctx应成立；
> - 在return前，需要`修改返回函数的原型对象为绑定函数（原函数）的原型对象`，从而`实现实例继承原函数的原型`；
> - 但有个问题，如果直接赋值会导致修改返回函数的prototype时，原函数的原型对象也会被改变，因此使用一个`中间的函数做中转`；

## superwyk
### 方法一
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

### 方法二
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

## mtd
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

## Caleb

``` js
Function.prototype.newBind = function(context) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArg = Array.prototype.slice.call(arguments);
    return self.apply(context, args.contact(newArg))
  }
}

```