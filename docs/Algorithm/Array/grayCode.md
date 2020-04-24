# 格雷编码（二进制运算）

[leetcode - 89. 格雷编码](https://leetcode-cn.com/problems/gray-code/)

格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。

示例 1:
```
输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
```
示例 2:
```
输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
```
## Johninch
```js
// 进制转换：parseInt(s,m).toString(n); 
// 将m进制字符串s，转成10进制整数。再将此10进制整数转换为n进制字符串
/**
 * @param {number} n
 * @return {number[]}
 */
let grayCode = function(n) {
    // 递归函数，用来算输入为 n 的格雷编码序列
    let make = (n) => {
        if (n === 0) {
            return [0]
        } else if (n === 1) {
            return ['0', '1'];
        } else {
            let prev = make(n-1);
            let result = [];
            let len = Math.pow(2, n) - 1; // 索引减一
            for (let i = 0; i < prev.length; i++) {
                result[i] = `0${prev[i]}`;
                result[len - i] = `1${prev[i]}`;
            }
            return result;
        }
    }

    // result数组是二进制字符串，需要转换为10进制数字数组才是格雷编码
    return make(n).map(s => parseInt(s+'', 2));
};

export default grayCode;

// 规律：输入每增加1，都是用prev上下镜像对称，并前面补0和1各一半
// 输入 1
// 输出
//     0
//     1
//         输入 2
//         输出
//             0 0
//             0 1
//             1 1
//             1 0

//                 输入 3
//                 输出
//                     0 0 0
//                     0 0 1
//                     0 1 1
//                     0 1 0
//                     1 1 0
//                     1 1 1
//                     1 0 1
//                     1 0 0
```


