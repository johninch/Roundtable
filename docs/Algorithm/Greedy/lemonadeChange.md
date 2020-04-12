# 柠檬水找零

[leetcode - 860. 柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/)

在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意，一开始你手头没有任何零钱。

如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

示例 1：
```
输入：[5,5,5,10,20]
输出：true
解释：
前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
由于所有客户都得到了正确的找零，所以我们输出 true。
```

## 代码

### Johninch
应该区分具体面值处理，优先找零10元，再找零5元：
```js
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;
    for (let i = 0; i < bills.length; i++) {
        let money = bills[i], gap;
        if (money === 5) {
            five++
        } else if (money === 10) {
            ten++
            if (five > 0) {
                five--
            } else {
                return false
            }
        } else {
            if (ten > 0 && five > 0) {
                ten--
                five--
            } else if (!ten && five >= 3) {
                five = five - 3;
            } else {
                return false
            }
        }
    }

    return true
};
```

时间复杂度高，不区分具体面值：
```js
var lemonadeChange = function(bills) {
    let hand = [];
    for (let i = 0; i < bills.length; i++) {
        let money = bills[i], gap;

        hand.push(money);
        hand.length && hand.sort((a, b) => b - a);

        if (money > 5) {
            gap = money - 5;
            for (var j = 0; j < hand.length; j++) {
                if (hand[j] <= gap) {
                    gap = gap - hand[j]
                    hand.splice(j ,1)
                    j--;
                }
            }

            if (gap > 0) return false
        }
    }

    return true
};
```



