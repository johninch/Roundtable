# 不同路径 II

[leetcode - 63. 不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 1 和 0 来表示。

说明：m 和 n 的值均不超过 100。

示例 1:
```
输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
```
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
通过次数5

## 题解

### Johninch
使用 DP-table。与62. 不同路径-解法一一样，区别就是此题设置了障碍物而已。
    - 既然是障碍物，说明此路不通，即经过此节点的路径数为0，所以当遇到障碍物时，设置dp[i][j] = 0即可
    - 那么第一行第一列数据初始化的时候就不能都是1了，因为有的地方有障碍物存在
    - 初始化dp二维数组的时候各个节点都不可达，都为0
        - 这样dp递推的时候，只需要在62题的基础上加上arr[i][j]当前节点不为障碍物的条件即可
        - 而有障碍物的地方为0，加0也就等于没走

```js
var uniquePathsWithObstacles = function(arr) {
    let m = arr.length, n = arr[0].length

    // 初始化为不可达
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    // 检查起始或者目标元素是不是1（被占用了），如果起始或者最后那个格就是1，说明怎么都怎么不到那，直接返回0
    if (arr[0][0] == 1 || arr[m-1][n-1] == 1) return 0

    // 确定初始边界
    dp[0][0] = 1

    // 由初始边界确定 左边界（第一列）
    for (let i = 1; i < m; i++) {
        if (arr[i][0] != 1) {
            dp[i][0] = dp[i-1][0];
        }
    }

    // 由初始边界确定 上边界（第一行）
    for (let j = 1; j < n; j++) {
        if (arr[0][j] != 1) {
            dp[0][j] = dp[0][j-1];
        }
    }

    // 动态规划推导
    for (let i = 1; i < m ; i++) {
        for (let j = 1; j < n; j++) {
            if (arr[i][j] != 1) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }

    return dp[m-1][n-1]
};
```

递归，超时：(都动态规划了，就不要考虑结合递归去做了)
```js
var uniquePathsWithObstacles = function(arr) {
    let m = arr.length; n = arr[0].length;
    let dp = (m, n) => {
        // 检查起始或者目标元素是不是1（被占用了），如果起始或者最后那个格就是1，说明怎么都怎么不到那，直接返回0
        if (arr[0][0] === 1 || arr[m-1][n-1] === 1) return 0

        if (m === n === 2) {
            return (arr[0, 1] === 1 || arr[1, 0] === 1) ? 0 : 1
        } else if (m < 2) {
            return (arr[m - 1].includes(1)) ? 0 : 1
        } else if (n < 2) {
            for (let i = 0; i < m - 1; i++) {
                if (arr[i][n - 1] === 1) {
                    return 0
                }
            }
            return 1
        } else {
            return dp(m - 1, n) + dp(m, n - 1)
        }
    }

    return dp(m, n)
};
```