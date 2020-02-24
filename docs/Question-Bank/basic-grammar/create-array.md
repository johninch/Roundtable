---
title: 编写函数createArray(holder, length)
date: 2019-01-14 10:14:00
tags: [js, 算法]
categories: javascript
---

# 编写函数createArray(holder, length)返回长度为length，成员都是holder的数组

## superwyk
### 方法一
```js
function createArray(holder, length){
    const arr = new Array(length);
    arr.fill(holder);
    return arr;
}
```

### 方法二
```js
// es6方法
function createArray(holder, length){
    const arr = [];
    while(length--){
        arr.push(holder);
    }
    return arr;
}
```

## febcat
### 方法一
``` js
const createArray = (holder, length) => {
  let newHolder = [];

  while (length > 0) {
    newHolder.push(holder);
    length--;
  }

  return newHolder;
};

console.log("createArray", JSON.stringify(createArray(1, 5)));
```

### 方法二
``` js
const createArray2 = (holder, length) => {
  let holderType = Object.prototype.toString.call(holder);
  let holderStr = holder + "";
  let regStr = `(${holderStr})`;
  let holderInit = res => {
    switch (holderType) {
      case "[object Number]":
        return res.map(item => item - "");
      case "[object Null]":
        return res.map(() => null);
      case "[object Boolean]":
        return res.map(item => JSON.parse(item));
      default:
        return res;
    }
  };

console.log("createArray2", JSON.stringify(createArray2("true", 5)));
```