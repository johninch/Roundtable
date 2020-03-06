---
title: 奇偶打印
date: 2019-01-14 10:21:00
tags: [js, 算法]
categories: javascript
---

# 编写js代码，实现奇数次调用时，打印1，偶数次调用时打印2
```js
foo(); // 1
foo(); // 2
foo(); // 1
foo(); // 2
```

## superwyk
### 方法一
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

### 方法二
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

### 方法三
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

## johninch

### 方法一
> 思路：使用自执行函数在定义时就执行，return之后的闭包函数才是foo的实际函数体这样每次调用foo就会自增闭包作用域中的count变量，从而判断奇偶不同输出
```js
const foo = (() => {
    let counter = 1;
    return () => {
        if (counter % 2 === 0) {
            console.log(2)
        } else {
            console.log(1)
        }
        counter++
    }
})()

foo() // 1
foo() // 2
foo() // 1
foo() // 2
foo() // 1
foo() // 2
```
### 方法二
```js
let foo = () => {
  console.log(foo.counter++ % 2 ? 1 : 2);
};

foo.counter = 1;

foo();
foo();
foo();
foo();
foo();
foo();
```

### 方法三
使用Proxy代理一个`匿名函数`，通过实例的apply方法 拦截函数的调用；
```js
const foo = new Proxy(function() {}, {
  counter: 1,
  apply: function(target, ctx, args) {
    console.log(this.counter++ % 2 ? 1 : 2);
    return Reflect.get(target, ctx, args);
  }
}
);

foo();
foo();
foo();
foo();
foo();
foo();
```

> - Proxy对象的拦截操作（如上为apply，其他还有如get、delete、has...），内部调用对应的Reflect方法，保证原生行为能够正常执行。添加的额外工作，就是将每一次操作输出一行日志而已。
> - Reflect对象的方法与Proxy对象的方法一一对应，这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

### 方法四
使用Proxy代理一个`空对象`，通过实例的get方法 对象的属性访问；
```js
const bar = new Proxy({}, {
      counter: 1,
      get: function(target, propKey, receiver) {
        console.log(this.counter++ % 2 ? 1 : 2);
        return Reflect.get(target, propKey, receiver);
      }
    }
  );

const foo = () => bar.counter

foo();
foo();
foo();
foo();
foo();
foo();
```

## Mtd

```js
// 匿名函数
let foo = (
  function () {
    let counter = 0;
    return function () {
      let _counter = ++counter % 2 === 0 ? 2 : 1;
      console.log(_counter)
    }
  }
)()

// 代理
let foo = new Proxy(function () {}, {
  counter: 0,
  apply: function () {
    let counter = ++this.counter % 2 === 0 ? 2 : 1;
    console.log(counter)
  }
});


```

## Wlxm

```js
function log12() {
  console.log(log12.counter++ % 2 === 0 ? 2 : 1);
}

log12.counter = 1;
```
