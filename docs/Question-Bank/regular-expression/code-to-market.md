# 使用正则判断给定的股票代码所属市场

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
