# 正则例题

## 数字转成千分位制
注意使用了`x(?=y)先行断言`与`(?:)非捕获括号`，以及`替换模式$n`：
```js
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
```

## 去除字符串首尾空格trim
```js
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '')
}
```

## 输出字符串中所有字符的个数
```js
function countChar(str) {
    let obj = {};
    for (let i = 0; i < str.length; i++) {
        if (!Obj[str.charAt(i)]) {
            Obj[str.charAt(i)] = 1
        } else {
            Obj[str.charAt(i)]++
        }
    }
}
```

## 实现大驼峰字符串转换

例如，给定this-is-a-string，将其转换为 ThisIsAString

```js
//连接符转成驼峰写法
function toCamel(str) {
    var reg = /-(\w)/g;
    str = '-' + str
    return str.replace(reg, function() {
        return arguments[1].toUpperCase()
    });
}
console.log(toCamel("this-is-a-string")); // ThisIsAString

//连接符转成驼峰写法
function toCamel(str) {
    var reg = /-(\w+)/g;
    str = '-' + str
    return str.replace(reg, (match, letter) => {
        return letter.substring(0, 1).toUpperCase() + letter.substring(1);
    });
}
console.log(toCamel("this-is-a-string")); // ThisIsAString
```

## 判断给定的股票代码所属市场

假设已知美股(US)股票代码为2到8位字母，港股(HK)为5位数字，沪深(A)为6位数字

```js
function witchMarket(symbol) {
    var regUS = /^[a-zA-Z]{2,8}$/;
    var regHK = /^\d{5}$/;
    var regA = /^[0-9]{6}$/;
    if (regUS.test(symbol)) {
        console.log(symbol + ': 美股')
    } else if (regHK.test(symbol)) {
        console.log(symbol + ': 港股')
    } else if (regA.test(symbol)) {
        console.log(symbol + ': A股')
    } else {
        console.log(symbol + ': 未知')
    }
}

console.log(witchMarket('AAPL'))
console.log(witchMarket('00600'))
console.log(witchMarket('123456'))
```

## 验证给定字符串是否是中国居民身份证

已知中国居民身份证为18位，其中第7-14位出生年月日期，其中年份为四位数字表示；最后一位校验数字可以是罗马数字X。
要求根据以上条件，编写正则验证是否是符合19xx-20xx间出生的人的有效身份证，不符合该区间的出生日期判定为非法身份证。

非法值示例：
    110111308803052064
    110111198820222064
    110111198802362064
    11011119890222064A

```js
function checkIdCard(str) {
    var reg = /^\d{6}(19|20)\d{9}(X|\d)$/;
    if (reg.test(str)) {
        console.log(str + "  是合法身份证");
    } else {
        console.log("非法身份证");
    }
}

console.log(checkIdCard("00000020990000000X")); // 合法
console.log(checkIdCard("11011119890222064A")); // 非法
```



