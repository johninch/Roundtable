# 二叉树的前序遍历

## 题目
给定一个二叉树，返回它的 `前序` 遍历。

#### 示例
```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [1,2,3]
```
请分别以 `递归`、`非递归` 方法实现？

## 代码

### mtd
```js
  // 前序遍历 递归
  // 先输出当前结点的数据，再依次遍历输出左结点和右结点
  preOrder: function(node) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  },
  preOrder2: function(root) {
    let arr = [];
    root && arr.push(root);

    while (arr.length) {
      let current = arr.pop();
      current.show();

      if (current.right) {
        arr.push(current.right);
      }

      if (current.left) {
        arr.push(current.left);
      }
    }
  },
```




