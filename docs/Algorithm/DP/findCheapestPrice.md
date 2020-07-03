# K 站中转内最便宜的航班

[leetcode - 787. K 站中转内最便宜的航班](https://leetcode-cn.com/problems/cheapest-flights-within-k-stops/)

有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。

现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 如果没有这样的路线，则输出 -1。

示例 1：
```
输入: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
输出: 200
```

## 代码

### Johninch
递归，超时（动态规划不要用递归来做）
```js
// F(src, dst, k) = Min(F(src, dst-1, k-1) + F(dst-1, dst, 1))
let findCheapestPrice = function(n, flights, src, dst, k) {
    let cheap = (flights, src, dst, k) => {
        let prev = flights.filter(item => item[1] === dst)
        let min = Math.min.apply(null, prev.map(item => {
            if (k > -1 && item[0] === src) {
                // 边界1：从dst往回找到了src，且中转次数不为-1，返回当前价格
                return item[2]
            } else if (k == 0 && item[0] !== src) {
                // 边界2：中转次数已经为0，但从dst往回找没有找到src，设一个无限大的价格
                return Number.MAX_SAFE_INTEGER
            } else {
                // 状态转移方程
                return item[2] + cheap(flights, src, item[0], k-1)
            }
        }))

        return min
    }

    // 增加返回值是不是Number.MAX_SAFE_INTEGER，如果是返回-1
    let min = cheap(flights, src, dst, k)
    return min >= Number.MAX_SAFE_INTEGER ? -1 : min
};
```
