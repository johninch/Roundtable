# 二叉树的最大深度

[leetcode - 104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

## 题目
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

#### 示例
```
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```

## 思路
深度优先遍历 + 分治：一棵二叉树的最大深度等于左子树深度和右子树最大深度的最大值` + 1`

## 代码

### Johninch
二叉树的深度就是指其最大深度。
```js
const maxDepth = (root) => {
    if (!root) {
        return 0
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 // 要加1
}
```

顺便提下求二叉树节点个数：
```js
const sizeOfTree = (root) => {
    if (!root) {
        return 0
    }

    return 1 + sizeOfTree(root.left) + sizeOfTree(root.right);
}
```

### niannings
```ts
function maxDepth(tree: IBinaryTreeBase) {
    if (tree.isEmpty()) return 0; // 空树
    const Q: [IBinaryTreeNodeBase, number][] = [[tree.root, 1]];
    let h = 0;
    while (Q.length) {
        const p = Q.pop();
        const n = p[1];
        const l = p[0].left;
        const r = p[0].right;
        h = Math.max(p[1], h);
        if (l !== null) Q.push([l, n + 1]);
        if (r !== null) Q.push([r, n + 1]);
    }
    return h;
}
```

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 二叉树最大深度
max_depth(node = this.root){
    if(node){
        const leftDepth = this.max_depth(node.left) + 1;
        const rightDepth = this.max_depth(node.right) + 1;
        return rightDepth > leftDepth ? rightDepth : leftDepth;
    } else {
        return 0;
    }
}
```

#### 代码测试
```js
const tree = new Tree([1,2,3,4,5,null,6,7,null,null,8]);
console.log(tree.max_depth());
```