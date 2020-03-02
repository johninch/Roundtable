---
title: 判断数组的方法
date: 2019-01-14 10:04:00
tags: [js, 算法]
categories: javascript
---

# 判断数组的方法

## superwyk
### 方法一
```js
// 最常用方法
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]';
}
```

### 方法二
```js
// es6方法
function isArray(arr){
    return Array.isArray(arr);
}
```

### 方法三
```js
function isArray(arr){
    return arr.constructor === Array;
}
```

### 方法四
```js
function isArray(arr){
    return arr instanceof Array;
}
```

## johninch
### 方法一
```js
// es5 方法
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]';
}
```

### 方法二
```js
// es6 方法
function isArray(arr){
    return Array.isArray(arr);
}
```

### 方法三
有误差，不推荐：
```js
function isArray(arr){
    return arr.constructor === Array;
}
```

### 方法四
有误差，不推荐：
```js
function isArray(arr){
    return arr instanceof Array;
}
```

### 方法五
比较麻烦，不推荐：通过判断数组的属性来间接判断 有length属性且不可枚举(因为也可以为对象添加属性)，有splice
```js
function isArray(arr){
    return arr && typeof arr === "object" &&
        typeof arr.splice === "function" &&
        typeof arr.length === "number" && !arr.propertyIsEnumerable("length")
}
```

## Mtd
```js

function isArray(arr) {
  if (Array.isArray) {
    return Array.isArray(arr);
  } else {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}
```

