# 使用正则处理字符串

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


