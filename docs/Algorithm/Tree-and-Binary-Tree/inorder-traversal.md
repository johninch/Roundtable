# 二叉树的中序遍历

## 题目
给定一个二叉树，返回它的 `中序` 遍历。

#### 示例
```js
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```
请分别以 `递归`、`非递归` 方法实现？

## 代码

### mtd

```js
  // 先遍历输出左结点，再输出当前结点的数据，再遍历输出右结点
  middleOrder: function(node) {
    if (node) {
      this.middleOrder(node.left);
      node.show();
      this.middleOrder(node.right);
    }
  },
  // 中序遍历非递归
  middleOrder2: function(root) {
    let arr = [];
    while (true) {
      while (root !== null) {
        arr.push(root);
        root = root.left;
      }
      // 循环的结束条件是数组长度为0，遍历完成
      if (arr.length === 0) {
        break;
      }
      let temp = arr.pop();
      temp.show();
      root = temp.right; // 左子树的右子节点
    }
  }
```



