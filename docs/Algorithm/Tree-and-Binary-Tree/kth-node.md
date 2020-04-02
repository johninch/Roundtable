
# 二叉搜索树的第k个节点

[leetcode - 230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

## 题目
给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路
本题考查BST的特性：`BST 的中序遍历是升序序列`。所以本题实际考察二叉树的遍历。

## 代码

### Johninch
```js
// 利用BST的中序遍历是升序
const kthSmallest = (root, k) => {
    const res = []
    const stack = []
    let current = root

    while(current || stack.length > 0) {
        while(current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        res.push(current.val)

        current = current.right
    }

    return res[k - 1]
}
```

### niannings
```ts
// 中序遍历的第k个
export function findKmin<N extends IBinarySearchTreeNode = IBinarySearchTreeNode>(
    tree: IBinarySearchTree,
    k: number
) {
    if (tree.isEmpty()) return null; // 空树
    if (k <= 0) return null;
    let i = 1;
    let target = null;
    middleEach<IBinarySearchTreeNode>(tree.root, (node) => {
        if (i++ === k) {
            target = node;
            return false;
        }
    });
    return target as N;
}
```

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
