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

### niannings
```ts
function minDepth(tree: IBinaryTreeBase) {
    if (tree.isEmpty()) return 0; // 空树
    const Q: [IBinaryTreeNodeBase, number][] = [[tree.root, 1]];
    let h = 0;
    while (Q.length) {
        const p = Q.shift();
        const n = p[1];
        const l = p[0].left;
        const r = p[0].right;
        h = Math.max(p[1], h);
        if (l === null || r === null) break;
        Q.push([l, n + 1]);
        Q.push([r, n + 1]);
    }
    return h;
}
```

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 二叉树最大深度
// 二叉树最小深度
min_depth(node = this.root){
    if(node){
        const leftDepth = this.max_depth(node.left) + 1;
        const rightDepth = this.max_depth(node.right) + 1;
        return rightDepth > leftDepth ? leftDepth : rightDepth;
    } else {
        return 0;
    }
}
```

#### 代码测试
```js
const tree = new Tree([1,2,3,4,5,null,6,7,null,null,8]);
console.log(tree.min_depth());
```