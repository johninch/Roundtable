# 二叉树的后续遍历

[leetcode - 面试题33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

## 题目
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

## 思路
1. 后序遍历：分成三部分，最后一个节点为根节点。BST的特性是左子树的值比根节点都小，右子树的值比根节点都大。
2. 先划分左右子树，左侧比根节点小的值都判定为左子树。
3. 除最后一个节点外和左子树外的其他值为右子树，`判断右子树中是否有一个比根节点小，如果有则返回false`。
4. 若不存在，则递归检测左、右子树是否复合规范。

## 代码

### Johninch
```js
const verifyPostorder = (postorder) => {
    const len = postorder.length
    if (len < 2) {
        return true
    }

    const root = postorder[len -1];
    const index = postorder.findIndex(item => item > root)

    const leftTree = postorder.slice(0, index)
    const rightTree = postorder.slice(index, len - 1)

    const res = rightTree.some(item => item < root)

    return res ? false : verifyPostorder(leftTree) && verifyPostorder(rightTree)
}
```

