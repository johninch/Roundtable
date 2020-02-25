---
title: 实现斐波那契数列
date: 2019-01-14 10:38:00
tags: [js, 算法, 尾调用]
categories: javascript
---

# 实现斐波那契数列

实现指定区间内的斐波那契数列。斐波那契是指从第三项开始，每一项都为其前两项的值之和：1 2 3 5 8 13 21 34 ...
例如，给定 100, 2000，需要打印 100 101 201 302 503 805 1308

## superwyk
### 方法一
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

### 方法二
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

## Johninch

接下来按各种方法实现fibonacci数列，而这道题的目标是输出fib数组的范围，其中只有迭代方法和generator方法适合做。

### 迭代实现 fibonacci
```js
// 基本fibonacci循环
function fib(n) {
  let n1 = 1, n2 = 1, sum
  let arr = [n1, n2]
  for(let i = 3; i <= n; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
    arr.push(sum)
  }

  console.log(arr) // fib(9): [1, 1, 2, 3, 5, 8, 13, 21, 34]
  return sum
}

console.log(fib(9)) // 34
```
#### 输出fib范围：
```js
// 基本fibonacci循环
function fibRange(start, end) {
  let n1 = 1, n2 = 1, sum
  let arr = [n1, n2]
  for(let i = 3; i <= end; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
    arr.push(sum)
  }

  console.log(arr.slice(start))
  return sum
}

fibRange(6, 9)) // [8, 13, 21, 34]
```


### 递归实现 fibonacci
递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow），数字过大内存不足浏览器会`有假死现象`。
```js
// 递归实现fibonacci (n太大会使浏览器假死)
function fib2(n) {
  if (n <= 2) {
    return 1
  }
  return fib2(n-2) + fib2(n-1)
}

console.log(fib2(9)) // 34
```

### 使用尾递归实现 fibonacci
- 使用尾调用优化，详见[es6-函数的扩展-尾调用优化](http://es6.ruanyifeng.com/?search=%E5%B0%BE%E8%B0%83%E7%94%A8&x=0&y=0#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)
- 尾调用由于是函数的最后一步操作，不需要保留外层函数的调用帧（因为调用位置、内部变量等信息都不会再用到了），所以`直接用内层函数的调用帧取代外层函数的调用帧`即可。做到每次执行时，调用帧只有一项。
- 尾调用自身，就称为尾递归。对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
```js
// 尾递归实现fibonacci (尾调用优化)
function fib3(n, n1 = 1, n2 = 1){
  if (n <= 2) {
      return n2;
  } else {
      return fib3(n-1, n2, n1 + n2);
  }
}

console.log(fib3(9)) // 34
```

注意：如何区分是否是尾调用
```js
// 是尾调用：某个函数的最后一步是调用另一个函数
function f(x){
  return g(x);
}

// 不是：调用g(x)之后，还有赋值操作
function f(x){
  let y = g(x);
  return y;
}

// 不是：调用g(x)之后，还有加法操作
function f(x){
  return g(x) + 1;
}

// 不是：并没有将g(x)调用返回
function f(x){
  g(x);
}

// 是尾调用：尾调用不一定出现在函数尾部，只要是最后一步操作即可
// 函数m和n都属于尾调用，因为它们都是函数f的最后一步操作
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```

### 使用“记忆”方法减少运算量。
> 在一个数组里保存我们的储存结果，储存结果隐藏在闭包中.
```js
const fib4 = (function() {
  var memo = [0, 1];
  return function _fib(n) {
    var result = memo[n];
    if (typeof result !== "number") {
      memo[n] = _fib(n - 1) + _fib(n - 2);
      result = memo[n];
    }
    return result;
  };
})();

console.log(fib4(9)); // 34
```

### generator实现fib
```js
function* fib5(x) {
  let a = 1, b = 1, n = 1;
  while (n <= x) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
}
console.log([...fib5(9)]);
```

#### 输出fib范围：
```js
function* fibRange5(start, end) {
  let a = 1, b = 1, n = 1;
  while (n <= end) {
    if (n >= start) {
      yield a;
    }
    [a, b] = [b, a + b];
    n++;
  }
}
console.log([...fibRange5(6, 9)]); // [8, 13, 21, 34]
```

## febcat
```js
const fibonacci = (start, maxValue) => {
  let variate = 1,
    oldStart;

  while (start <= maxValue) {
    console.log("fibonacci", start);

    oldStart = start;
    start += variate;
    variate = oldStart;
  }
};

fibonacci(5, 1000);
```

