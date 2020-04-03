# 二叉树的镜像（翻转二叉树）

[leetcode - 226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

## 题目
操作给定的二叉树，将其变换为源二叉树的镜像。
```
       源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9 11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7  5
```
## 思路
递归交换二叉树所有节点左右节点的位置。

## 代码

### Johninch
```js
var invertTree = function(root) {
    if (!root) {
        return null
	}
	
	[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]

	return root
};
```

### niannings
```ts
function toImage(tree: IBinaryTreeBase) {
    if (tree.isEmpty()) return tree; // 空树
    const Q = [tree.root];
    while (Q.length) {
        const p = Q.shift();
        const l = p.left;
        const r = p.right;
        if (l === null && r === null) break; // 只有根节点
        p.left = r;
        p.right = l;
        if (l !== null) Q.push(l);
        if (r !== null) Q.push(r);
    }
    return tree;
}
```

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 反转二叉树
reverseTree(tree = this.root){
    const temp = tree.left;
    tree.left = tree.right;
    tree.right = temp;
    if (tree.left) {
        this.reverseTree(tree.left)
    }
    if (tree.right) {
        this.reverseTree(tree.right);
    }
}
// 反转二叉树，没有副作用，即不影响原二叉树
reverseTreewithNoSideEffect(tree){
    if (tree === null) return null;
    const node = new TreeNode(tree.value);
    node.left = this.reverseTreewithNoSideEffect(tree.right);
    node.right = this.reverseTreewithNoSideEffect(tree.left);

    return node;
}
```

#### 代码测试
```js
const tree = new Tree([8, 6, 10, 5, 7, 9, 11]);
tree.reverseTree();
tree.print();
console.log('---------------');
const tree2 = new Tree();
tree2.root = tree2.reverseTreewithNoSideEffect(tree.root);
tree2.print()
console.log('---------------');
tree.print();
```