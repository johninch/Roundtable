# 二叉树的后序遍历

## 题目
给定一个二叉树，返回它的 `后序` 遍历。

#### 示例
```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [3,2,1]
```
请分别以 `递归`、`非递归` 方法实现？

## 代码

### mtd
```js
  // 后续遍历
  // 先遍历输出左结点，再遍历输出右结点，最后输出当前结点的数据
  laterOrder: function(node) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  },
  // 后续遍历非递归
  laterOrder2: function(root) {
    let arr = [];
    let res = [];
    root && arr.push(root);
    while (arr.length !== 0) {
      let temp = arr.pop();
      res.push(temp);
      if (temp.left !== null) {
        arr.push(temp.left);
      }
      if (temp.right !== null) {
        arr.push(temp.right);
      }
    }
    res.reverse();
    res.forEach(item => item.show());
  },
```




