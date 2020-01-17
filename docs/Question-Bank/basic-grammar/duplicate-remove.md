---
title: 数组去重
date: 2019-01-14 10:30:00
tags: [js, 算法]
categories: javascript
---

# 数组去重

## superwyk
### 方法一
```js
function duplicateRemove(arr) {
    return [... new Set(arr)]
}
```

### 方法二
```js
function duplicateRemove(arr) {
    const result = [];
    arr.forEach(item => {
        if (!~result.indexOf(item)) {
            result.push(item)
        }
    });
    return result;
}
```

## johninch

### 方法一

## mtd

## febcat

## niannings

## Caleb

## Xmtd

