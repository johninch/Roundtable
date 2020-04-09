# 平衡二叉树

[leetcode - 110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

## 题目
输入一棵二叉树，判断该二叉树是否是平衡二叉树。

平衡二叉树：*一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1。*

## 思路
判断当前节点的左右子树深度插值的绝对值是否是小于等于1的，且此节点的左右子树是否都是平衡的。

## 代码

### Johninch
```js
const isBalanced = function(root) {
    const Depth = (root) => {
        return !root ? 0 : Math.max(Depth(root.left), Depth(root.right)) + 1
    }

    if (!root) {
        return true
    }

    return (Math.abs(Depth(root.left) - Depth(root.right)) <= 1) && isBalanced(root.left) && isBalanced(root.right)
};
```

### niannings
```ts
function isBalanced(tree: IBinaryTreeBase) {
    return maxDepth(tree) - minDepth(tree) <= 1;
}
```
