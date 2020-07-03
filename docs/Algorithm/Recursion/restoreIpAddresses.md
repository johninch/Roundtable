# 复原IP地址

[leetcode - 93.复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:
```
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

## Johninch
```js
const restoreIpAddresses = function(str) {
    let result = []
    let helper = (cur, sub) => {
        if (sub.length > 12) {
            return
        }

        if (cur.length === 4 && cur.join('') === str) {
            result.push(cur.join('.'))
        } else {
            for(let i = 0, len = Math.min(3, sub.length), temp; i < len; i++) {
                temp = sub.slice(0, i + 1)

                if (temp < 256) {
                    helper(cur.concat([temp * 1]), sub.slice(i + 1)) // 转换下数据类型，如 01为1（LeetCode测试用例）
                }
            }
        }
    }

    helper([], str)

    return result
};
```
