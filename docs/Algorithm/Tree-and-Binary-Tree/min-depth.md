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
```
注意：求最大深度递归到底时必然是叶子节点 但是求最小深度如果单单把Math.max改成Math.min, 返回的最小值并非是到达的叶子节点的最小值, 画个图就明白了

         3
     /       \
   9        20
  / \      / 
2   4   5
上面这棵树如果使用求最大深度的方法求得的结果就是 3->20的深度 为2 但是20这个节点并非是一个叶子节点, 所以这样求得的结果是不对的 递归结束的条件必须还得判断左右子树是否为空的情况 
```
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
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
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
