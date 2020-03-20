
# 二叉搜索树的第k个节点

## 题目
给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路
二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

## 代码

### mtd
```js
 // 第k个几点
  KthNode: function(root, k) {
    if (!root || !k) {
      return null;
    }
    return KthCore(root);

    function KthCore(node) {
      let target = null;
      if (node.left) {
        target = KthCore(node.left);
      }
      if (!target) {
        if (k === 1) {
          target = node;
        }
        k--;
      }
      if (!target && node.right) {
        target = KthCore(node.right);
      }
      return target;
    }
  },
```