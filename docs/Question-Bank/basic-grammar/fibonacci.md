---
title: 实现斐波那契数列
date: 2019-01-14 10:38:00
tags: [js, 算法]
categories: javascript
---

# 实现斐波那契数列
## 方法一
```js
// es5 实现
function fibonacci(startValue, maxValue) {
    let result = []

    let beforeAgain = startValue;
    let before = startValue + 1;
    let current = before + beforeAgain;
    if (current < maxValue) {
        result = [beforeAgain, before];
    }
    while (current < maxValue) {
        result.push(current);
        beforeAgain = before;
        before = current;
        current = before + beforeAgain;
    }

    return result;
}
```

## 方法二
```js
// es6 generator实现
function* genFibonacci(startValue, maxValue) {
    let before = startValue + 1;
    let current = startValue + before;

    if (current < maxValue) {
        yield startValue;
        yield before;
    }
    console.log(before, current);
    while (current < maxValue) {
        yield current;
        [before, current] = [current, before + current];
    }
}
const fibonacci = [...genFibonacci(200, 2000)];
```