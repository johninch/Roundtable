---
title: 判断数组的方法
date: 2019-01-14 10:04:00
tags: [js, 算法]
categories: javascript
---

# 判断数组的方法
## 方法一
```js
// 最常用方法
function isArray(arr){
    return Object.prototype.toString.call(arr) === 'object Array';
}
```

## 方法二
```js
// es6方法
function isArray(arr){
    return Array.isArray(arr);
}
```

## 方法三
```js
function isArray(arr){
    return arr.constructor === Array;
}
```

## 方法四
```js
function isArray(arr){
    return arr instanceof Array;
}
```