# 买卖股票的最佳时机

[leetcode - 121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

示例 1:
```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

## 题解

### Johninch
只能交易一次（买入并卖出），买卖策略：
- 遍历
    - 如果是下跌日，则更新最低价；
    - 如果是上涨日，则更新交易利润；

```js
var maxProfit = (prices) => {
    let profit = 0, minPrice = Number.MAX_SAFE_INTEGER;

    for (var i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            profit = Math.max(profit, prices[i] - minPrice);
        }
    }

    return profit
}
```
