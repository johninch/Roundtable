# 求二叉树的后序遍历

## 题目
给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

#### 示例
```
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

## 代码

### johninch
```js
var getHRD = () => {
    let preorder, inorder;
    let rebulidPostTree = (preorder, inorder) => {
        if (!preorder.length) {
            return null;
        }

        if (preorder.length === 1) {
            return preorder[0];
        }

        const root = preorder[0];
        const index = inorder.findIndex(root);

        const inLeft = inorder.slice(0, index);
        const inRight = inorder.slice(index + 1);
        const preLeft = preorder.slice(1, index + 1);
        const preRight = preorder.slice(index + 1);

        return rebulidPostTree(preLeft, inLeft) + rebulidPostTree(preRight, inRight) + root;
    }

    while(preorder = readline()) {
        inorder = readline();
        console.log(rebulidPostTree(preorder, inorder))
    }
}
```

### mtd
```js
// 先重建二叉树，在求后序遍历
function createLaterOrder(pre, vin) {
  let treeNode = reConstructTree(pre, vin);

  let laterOrder = function(root) {
    if (root) {
      laterOrder(root.left);
      laterOrder(root.right);
      console.log(root.data);
    }
  };

  laterOrder(treeNode);
}
```