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


