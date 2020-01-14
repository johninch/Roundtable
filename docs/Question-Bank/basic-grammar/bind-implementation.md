---
title: bind方法实现
date: 2019-01-14 10:30:00
tags: [js, 算法]
categories: javascript
---

# bind方法实现
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