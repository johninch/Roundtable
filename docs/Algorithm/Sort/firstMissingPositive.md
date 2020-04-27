# 缺失的第一个正数

[leetcode - 41. 缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

示例 1:
```
输入: [1,2,0]
输出: 3
```
示例 2:
```
输入: [3,4,-1,1]
输出: 2
```
示例 3:
```
输入: [7,8,9,11,12]
输出: 1
```

## Johninch
思路：
- 找出原数组中大于0且小于等于数组长度的值，以**值-1**作为**索引**放入新数组中，如2放到索引为1的位置
- 因此可得到新数组形如[1, 2, 3, ...]
- 遍历新数组，找出第一个 **索引+1 !== 值** 的元素，返回 **索引+1** 即为所求，如果遍历完没有返回，则返回 **新数组长度+1**

注意：这里之所以用新数组而不用在原数组上swap操作，是考虑到swap操作可能会有数字交换后没有遍历到的情况，为了算法简单
```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var firstMissingPositive = function(arr) {
    let newArr = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        let value = arr[i];
        if (value > 0 && value <= len) {
            newArr[value-1] = value;
        }
    }

    for (let i = 0, len = newArr.length; i < len; i++) {
        if (newArr[i] !== i + 1) {
            return i + 1;
        }
    }

    return newArr.length + 1;
};

export default firstMissingPositive;
```