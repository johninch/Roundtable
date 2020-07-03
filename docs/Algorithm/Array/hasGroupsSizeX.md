# 卡牌分组（归类运算-最大公约数）

[leetcode - 914. 卡牌分组](https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/)

给定一副牌，每张牌上都写着一个整数。

此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。

示例 1：
```
输入：[1,2,3,4,4,3,2,1]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
```
示例 2：
```
输入：[1,1,1,2,2,2,3,3]
输出：false
解释：没有满足要求的分组。
```

## Johninch
```js
/**
 * @param {number[]} deck
 * @return {boolean}
 */
const hasGroupsSizeX = (deck) => {
    if (deck.length < 2) return false

    deck = deck.sort();
    let arr = [],
        X = 0;

    arr[0] = []
    arr[0].push(deck[0])

    for (let i = 1; i < deck.length; i++) {
        if (arr[X][0] !== deck[i]) {
            X++;
            arr[X] = [deck[i]]
        } else {
            arr[X].push(deck[i])    
        }
    }

    // 求所有分组长度
    let lenArr = arr.map(item => item.length)

    // 工具函数，求两数间最大公约数 - 辗转相除法：gcd(a,b) = gcd(b,a mod b)
    let gcd = (a, b) => {
        return b === 0 ? a : gcd(b, a%b);
    }

    // 本质是判断所有分组长度间是否存在除1之外的最大公约数（多个数字求最大公约数）
    while (lenArr.length > 1) {
        let tmp = gcd(lenArr[0], lenArr[1])
        lenArr.splice(0, 2, tmp);
    }

    return lenArr[0] > 1 ? true : false
}

export default hasGroupsSizeX
```