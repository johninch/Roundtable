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