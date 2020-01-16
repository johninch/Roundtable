---
title: 实现斐波那契数列
date: 2019-01-14 10:38:00
tags: [js, 算法]
categories: javascript
---

# 实现斐波那契数列

实现指定区间内的斐波那契数列。斐波那契是指从第三项开始，每一项都为其前两项的值之和：1 2 3 5 8 13 21 34 ...
例如，给定 100, 2000，需要打印 100 101 201 302 503 805 1308


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

### Johninch
```js
// 推荐答案：
function fib_interval(min, max) {
    var n1 = min, n2 = min+1, n3
    var arr = [n1, n2]

    console.log(n1, n2)

    for(var i = 3; i <= max+1; i++){
        n3 = n1 + n2
        n1 = n2
        n2 = n3

        if (n3 < max) {
            arr.push(n3)
            console.log(n3)
        } else {
            break
        }
    }
    return arr
}

console.log(fib_interval(100, 2000))




// 一、基本的 fibonacci 循环实现
function fib(n) {
    var n1 = 1, n2 = 2, n3
    var arr = [n1, n2]

    for(var i = 3; i <= n; i++) {
        n3 = n1 + n2
        n1 = n2
        n2 = n3
    }
    return arr
}

// 二、使用递归实现 fibonacci，由于用到堆栈，数字过大内存不足浏览器会有假死现象，且会有重复计算性能较差
function fib(n) {
    if(n==1 || n==2) {
        return 1
    };
    return fib(n-2) + fib(n-1);
}

// 三、可以使用“记忆”方法减少运算量。在一个数组里保存我们的储存结果，储存结果隐藏在闭包中.
var fibonacci = function(x) {
    console.log('x:'+x)
    var memo = [0,1];
    return function fib(n) {
        var result = memo[n];
        if(typeof result !== 'number') {
            result = fib(n-1)+fib(n-2);
        };
        return result;
    };
}(1);

// 这里传入1实际上只是为了说明其是x接收的，而4实际是返回的闭包函数fib接收的参数n
console.log(fibonacci(4)) // x:1  3

// 四、使用ES6中的generator
    function* fib(x){
        let a=1;
        let b=1;
        let n=0;
        while(n<=x){
            yield a;
            [a,b]=[b,a+b];
            n++;
        }
    }
    console.log(fib(5));
```

