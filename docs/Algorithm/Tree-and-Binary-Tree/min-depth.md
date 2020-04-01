# 二叉树的最小深度

[leetcode - 111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

## 题目
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

#### 示例
```
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度 2
```

## 思路
深度优先 + 分治
- 左树为空：右子树最小深度的最小值 + 1
- 右树为空：左子树最小深度 + 1
- 左右子树都不为空：左子树深度和右子树最小深度的最小值 + 1

## 代码

### Johninch
```js
const minDepth = (root) => {
    if (!root) {
        return 0;
    }
    if (!root.left) {
        return 1 + minDepth(root.right);
    }
    if (!root.right) {
        return 1 + minDepth(root.left);
    }
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
};
```