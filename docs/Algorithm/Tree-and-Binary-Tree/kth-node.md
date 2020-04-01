
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
