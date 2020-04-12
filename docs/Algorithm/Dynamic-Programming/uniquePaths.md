# 不同路径

[leetcode - 62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

示例 1:
```
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

## 题解

### Johninch
令`dp[i][j]`为到坐标`i，j`的路径数，`dp[m-1][n-1]`则为到右下角终点的路径数：
```js
var uniquePaths = function(m, n) {
    // 构建 DP table，m行，n列，坐标为从 0 ~ m-1， 0 ~ n-1
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    // 确定左边界
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    // 确定上边界
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1
    }
    // 动态规划推导
    for(let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }

    return dp[m-1][n-1]
};
```
将上面写法合在一个循环体中：
```js
var uniquePaths = function(m, n) {
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    for(let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0) {
                // 确定上边界
                dp[0][j] = 1
            } else if (j == 0) {
                // 确定左边界
                dp[i][0] = 1
            } else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }

    return dp[m-1][n-1]
};
```
