# 声明一个类

要求使用ES5语法声明一个Stock类，符合以下定义：
```js
const stock = new Stock('AAPL', '苹果公司');
 
stock instanceof Stock; // true
stock.constructor === Stock; // true
stock.symbol; // 返回初始化时传入的股票代码
stock.getMarket(); // 返回该股票所属市场code；假设已知美股(US)股票代码为2到8位字母，港股(HK)为5位数字，沪深(A)为6位数字
stock.setPrice(192.80); // 设置股票最新价格
```


