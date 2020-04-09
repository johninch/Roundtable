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

## Mtd

````js
function uniq(arr) {
  if (!arr || !arr.length) {
    return [];
  }

  let result = [];
  let i = 0;
  while (i < arr.length) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
    i++;
  }

  return result
}
````

## febcat
### 方法一
``` js
const duplicateRemove = arr => {
  // 正则\1以为重复第一个括号内的内容
  let arrToStr = arr.sort().join(",") + ",",
    newArr = [];

  newArr = arrToStr.replace(/(\d,)\1+/g, (match, p1, index, target) => p1);

  return newArr
    .split(",")
    .map(item => item && +item)
    .filter(i => i);
};

console.log(
  "duplicateRemove",
  JSON.stringify(
    duplicateRemove([2, 3, 1, 2, 1, 6, 3, 3, 13, 4, 5, 2, 3, 6, 6])
  )
);
```
### 方法二
``` js
const duplicateRemove2 = arr => {
  let newArr = [];

  arr.map(item => (!newArr.includes(item) ? newArr.push(item) : null));

  return newArr;
};

console.log(
  "duplicateRemove2",
  JSON.stringify(duplicateRemove2([1, 3, 2, 6, 3, 3, 13, 4, 5, 2, 3, 6, 6]))
);
```

## niannings

## Caleb
``` js
[...new Set(arr)]

```

