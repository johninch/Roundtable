# 电话号码的字母组合（组合运算）

[leetcode - 17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](./images/17_telephone_keypad.png)

示例:
```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

## Johninch
```js
function letterCombinations(str) {
    let num = str.split('');
    if (num.find(i => i < 2)) return;
    let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    // 数字所对字母映射数组
    let code = num.map(i => map[i])

    // 分治合并函数
    let combine = (arr) => {
        if (arr.length < 2) return;

        let tmp = [];
        // 分治：先把前两个映射合并
        for (let i = 0, a0l = arr[0].length; i < a0l; i++) {
            for (let j = 0, a1l = arr[1].length; j < a1l; j++) {
                tmp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }

        // 合并后使用 tmp 替换已经合并完成的元素
        arr.splice(0, 2, tmp);

        if (arr.length > 1) {
            return combine(arr)
        } else {
            return arr[0]
        }
    }

    return combine(code)
}

export default letterCombinations
```

