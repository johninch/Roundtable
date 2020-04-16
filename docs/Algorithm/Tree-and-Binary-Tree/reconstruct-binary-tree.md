# 重建二叉树

[leetcode - 105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

## 题目
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

## 思路
- 前序遍历：根-左-右
- 中序遍历：左-根-右

因此
- 对于preorder，每个首元素即为一个子树的根元素
- 对于inorder，查找preorder中的根元素
    - 左边为preorder当前根元素的左子树
    - 右边为preorder当前根元素的右子树

据此 递归 构造出一颗二叉树即可：
    - 终止条件: 前序和中序数组为空
    - 通过前序数组第一个元素找到根节点root，找到root在中序遍历的位置，再将前序数组和中序数组分成两半，递归的处理前序数组左边和中序数组左边，递归的处理前序数组右边和中序数组右边。

## 代码

### Johninch
```js
function Node(val) {
    this.val = val;
    this.left = this.right = null;
}

function reConstruct(preorder, inorder) {
    if(preorder.length === 0){
        return null;
    }
    if(preorder.length === 1){
        return new Node(preorder[0]);
    }
    const value = preorder[0];
    const root = new Node(value);
    const index = inorder.indexOf(value);

    // slice 包含从 start 到 end（不包括该元素）
    const inLeft = inorder.slice(0, index);
    const inRight = inorder.slice(index + 1); // 去掉根
    const preLeft = preorder.slice(1, index + 1); // 去掉根
    const preRight = preorder.slice(index + 1);

    root.left = reConstruct(preLeft, inLeft);
    root.right = reConstruct(preRight, inRight);

    return root;
}
```

### niannings
```ts
export function rebuildTree(frontEachList: any[], middleEachList: any[]) {
    const tree = new BinaryTree();
    if (frontEachList.length === 0) return tree;
    tree.root = rebuild(frontEachList, middleEachList);

    function rebuild(f: any[], m: any[]) {
        const v = f[0];
        const newNode = new BinaryTreeNode(v);
        const sliceIndex = m.indexOf(v);
        const l = f.slice(1, sliceIndex + 1);
        const r = f.slice(sliceIndex + 1);
        if (l.length) {
            newNode.left = rebuild(l, m.slice(0, sliceIndex));
        }
        if (r.length) {
            newNode.right = rebuild(r, m.slice(sliceIndex + 1));
        }
        return newNode;
    }
    return tree;
}
```

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 输入二叉树的前序遍历和中序遍历，重建该二叉树；假设前序遍历和中序遍历结果中都不含重复的数字
reconstructionTree(preOrder, inOrder){
    this.root = this._reconstructionTree(preOrder, inOrder);
}
_reconstructionTree(preOrder, inOrder) {
    if (!preOrder || preOrder.length === 0 || !inOrder || inOrder.length === 0) return null;
    const value = preOrder.shift();
    const node = new TreeNode(value);
    const index = inOrder.indexOf(value)
    const leftInOrder = inOrder.slice(0, index);
    const rightInOrder = inOrder.slice(index + 1, inOrder.length);
    const leftPreOrder = preOrder.slice(0, leftInOrder.length);
    const rightPreOrder = preOrder.slice(leftInOrder.length, preOrder.length);
    
    node.left = this._reconstructionTree(leftPreOrder, leftInOrder);
    node.right = this._reconstructionTree(rightPreOrder, rightInOrder);

    return node;
}
```

#### 代码测试
```js
const tree = new Tree();
tree.reconstructionTree(['B', 'A', 'D', 'E', 'C', 'F', 'G'], ['D', 'A', 'E', 'B', 'F', 'C', 'G']);
tree.LRD_recursive()
```