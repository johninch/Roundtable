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

let arr = [1, 'a', 'a', 2, 2, 3];

### 方法一
```js
function unique1(arr) {
  return Array.from(new Set(arr))
}

console.log(unique1(arr))
```

### 方法二
```js
function unique2(arr) {
  return [...new Set(arr)]
}

console.log(unique2(arr))
```

### 方法三
```js
function unique3(arr) {
  return arr.filter((item, index, array) => array.indexOf(item) === index)
}

console.log(unique3(arr))
```

### 方法四
```js
function unique4(arr) {
  return arr.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : [...prev, cur]
  }, [])
}

console.log(unique4(arr))
```

### 方法五
```js
function unique5(arr) {
  const seen = new Map()
  return arr.filter(item => {
    return !seen.has(item) && !!seen.set(item, 1)
  })
}

console.log(unique5(arr))
```

## mtd

## febcat

## niannings

## Caleb
``` js
[...new Set(arr)]

```

## Xmtd
