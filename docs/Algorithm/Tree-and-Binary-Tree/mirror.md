# 二叉树的镜像

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

### mtd
```js
// 二叉树镜像递归
  mirro: function(root) {
    if (root) {
      let treeNodeLeft = root.left;
      root.left = root.right;
      root.right = treeNodeLeft;
      this.mirro(root.left);
      this.mirro(root.right);
    }
  },
  // 二叉树镜像非递归
  mirro2: function(root) {
    if (!root) {
      return;
    }

    let arr = [];
    while (arr.length) {
      let node = arr.pop();
      let nodeleft = node.left;
      node.left = node.right;
      node.right = nodeleft;

      if (node.left) {
        arr.push(node.left);
      }
      if (node.right) {
        arr.push(node.right);
      }
    }
  },
```

