# 验证二叉搜索树

[leetcode - 98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

## 题目
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：
    - 节点的左子树只包含小于当前节点的数。
    - 节点的右子树只包含大于当前节点的数。
    - 所有左子树和右子树自身必须也是二叉搜索树。

## 代码

### Johninch
需要在遍历树的同时，保留节点的上界与下界，在比较时不仅比较子节点的值，也要与上下界比较。
```js
// 递归法实现
const isValidBST = (node) => {
    let walk = (node, lower, upper) => {
        if (!node) return true

        let val = node.val
        if (lower !== null && val <= lower) return false
        if (upper !== null && val >= upper) return false

        if (!walk(node.right, val, upper)) return false
        if (!walk(node.left, lower, val)) return false

        return true
    }

    return walk(node, null, null)
}
```


