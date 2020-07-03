# 种花问题（筛选运算-贪心）

[leetcode - 605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

示例 1:
```s
输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
```
示例 2:
```
输入: flowerbed = [1,0,0,0,1], n = 2
输出: False

注意:
数组内已种好的花不会违反种植规则。
输入的数组长度范围为 [1, 20000]。
n 是非负整数，且不会超过输入数组的大小。
```

## Johninch
```js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
// let canPlaceFlowers = (flowerbed, n) => {
//     let i = 0, count = 0;
//     // 只考虑 f[i] 为0的情况下，左右是否也都为0，是则赋值为1，并计数器加1
//     // 注意首位边界为0的处理
//     while(i < flowerbed.length) {
//         if (flowerbed[i] === 0 && (flowerbed[i - 1] === 0 || i === 0) && (flowerbed[i + 1] === 0 || i === flowerbed.length - 1)) {
//             flowerbed[i] = 1;
//             count++;
//         }
//         i++;
//     }
//     return count >= n;
// }
const canPlaceFlowers = (flowerbed = [], num) => {
    // 为了方便处理边界问题，前后补0
    flowerbed.push(0)
    flowerbed.unshift(0)
    let result = 0
    for (let i = 1; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0 && flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
            flowerbed[i] = 1
            result++
        }
    }
    return result >= num
}

export default canPlaceFlowers;
```