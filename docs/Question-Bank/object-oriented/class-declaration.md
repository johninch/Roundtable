---
title: 类的声明与实例
tags: [类, 实例]
categories: class
---

# 类的声明与实例

## 类的声明方式

### ES5方式，构造函数式
```js
function M() {
    this.name = 'name'
}
```

### ES6方式，class类
```js
class M2 {
    constructor() {
        this.name = 'name';
    }
}
```

### 实例化
```js
console.log(new M(), new M2)
// 当不传参数时，()可以省略，无论是构造函数创建还是类创建
```

## 测试题
> 要求使用ES5语法声明一个Stock类，符合以下定义：

```js
const stock = new Stock('AAPL', '苹果公司');
 
stock instanceof Stock; // true
stock.constructor === Stock; // true
stock.symbol; // 返回初始化时传入的股票代码
stock.getMarket(); // 返回该股票所属市场code；假设已知美股(US)股票代码为2到8位字母，港股(HK)为5位数字，沪深(A)为6位数字
stock.setPrice(192.80); // 设置股票最新价格
```

::: details 点击查看代码
```js
function Stock(symbol, name) {
    this.symbol = symbol;
    this.name = name;
    this.price = undefined;
    this.getMarket = function() {
        var regUS = /^[a-zA-Z]{2,8}$/;
        var regHK = /^\d{5}$/;
        var regA = /^[0-9]{6}$/;
        if (regUS.test(this.symbol)) {
            return '美股US'
        } else if (regHK.test(this.symbol)) {
            return '港股HK'
        } else if (regA.test(this.symbol)) {
            return '沪深A股'
        } else {
            return '未知'
        }
    }
    this.setPrice = function(price) {
        this.price = price;
        console.log(this.price)
    }
}

const stock = new Stock('AAPL', '苹果公司');
 
console.log(stock instanceof Stock);
console.log(stock.__proto__.constructor === Stock);
console.log(stock.constructor === Stock); // 原理同上，都是在原型链中找
console.log(stock.symbol);
console.log(stock.getMarket());
console.log(stock.setPrice(192.80));
```

::: danger
注意这里不能把getMarket与setPrice方法作为原型链上的方法，重新覆盖原型对象：
```js
Stock.prototype = {
    this.getMarket: function() {
        var regUS = /^[a-zA-Z]{2,8}$/;
        var regHK = /^\d{5}$/;
        var regA = /^[0-9]{6}$/;
        if (regUS.test(this.symbol)) {
            return '美股US'
        } else if (regHK.test(this.symbol)) {
            return '港股HK'
        } else if (regA.test(this.symbol)) {
            return '沪深A股'
        } else {
            return '未知'
        }
    },
    this.setPrice: function(price) {
        this.price = price;
        console.log(this.price)
    }
}

```
覆盖后`stock.constructor === Stock`则不等，因为此时构造器就是Object
:::
