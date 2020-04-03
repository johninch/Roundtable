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

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 判断是否是平衡二叉树
// 所有节点左右子树高度差不超过1
isBalancedTree(node = this.root){
    if (node === null) {
        return { flag: true, depth: 0 };
    }
    const leftResult = this.isBalancedTree(node.left);
    const rightResult = this.isBalancedTree(node.right);

    const result = {
        flag: leftResult.flag && rightResult.flag && Math.abs(leftResult.depth - rightResult.depth) <= 1,
        depth: Math.max(leftResult.depth, rightResult.depth) + 1
    }
    return result;
}
```

#### 代码测试
```js
const tree = new Tree([1, 2, 3, 4, 5, 6, null, 7]);
console.log(tree.isBalancedTree().flag);
const tree2 = new Tree([1, 2, 3, 4, 5, 6, null, 7, null, null, null, null, null, 8]);
console.log(tree2.isBalancedTree().flag);
```