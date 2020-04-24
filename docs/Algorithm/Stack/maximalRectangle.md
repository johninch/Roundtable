# 最大矩形

[leetcode - 85. 最大矩形](https://leetcode-cn.com/problems/maximal-rectangle)


给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
```
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]

输出: 6
```

## Johninch
```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    let reg = /1{2,}/g
    let arr = []
    // 把相邻的1提取出来，如 【0,1,1,1,0,0,1,1,1,1,0,0】 => [[1, 3], [6, 9]]
    arr = matrix.map(item => {
        let r, res = [];
        let str = item.join('')
        while(r = reg.exec(str)) {
            res.push([r.index, r.index + r[0].length - 1])
        }

        return res;
    })
    // 递归计算合并相邻的数组
    let maxRect = (arr, result, nRow) => {
        
    }
};
```
