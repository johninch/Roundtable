---
title: 奇偶打印
date: 2019-01-14 10:21:00
tags: [js, 算法]
categories: javascript
---

# 编写js代码，实现奇数调用时，打印1，偶数调用时打印2
## 方法一
```js
// 闭包实现
function foo(){
    let flag = false; // 基数打印标记
    return function(){
        if(flag){
            console.log(2);
        } else{
            console.log(1);
        }
        flag = !flag;
    }
}
var print = foo();
print();
```

## 方法二
```js
// es6 iterator实现
var foo = {
    [Symbol.iterator]: function (){
        let flag = false; // 基数打印标记
        return {
            next: function(){
                let value = flag ? 2 : 1;
                flag = !flag;
                console.log(value);
                return {
                    value,
                    done: false
                }
            }
        }
    }
}

var print = foo[Symbol.iterator]().next;
print();
```

## 方法三
```js
// es6 generator实现
function* gen() {
    let flag = false; // 基数打印标记
    for (; ;) {
        if (flag) {
            console.log(2);
            flag = !flag;
            yield 2;
        } else {
            console.log(1);
            flag = !flag;
            yield 1;
        }
    }
}
var generator = gen();
var print = generator.next.bind(generator);
print();
```