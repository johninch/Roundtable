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

### Johninch

本部分是三序遍历的实现，主要分为两类：递归和迭代
三序遍历的递归方式非常简单，而对应的迭代法，本质上是在模拟递归，因为在递归的过程中使用了系统栈，所以在迭代的解法中常用Stack来模拟系统栈。
其实三序遍历都有一种莫里斯遍历解法，但这种方法会破坏原树结构，且不易理解，感兴趣的话去leetcode研究下。

#### 中序遍历 - 递归
```js
const inorder = (root, arr = []) => {
    if (root) {
        inorder(root.left, arr)
        arr.push(root.val)
        inorder(root.right, arr)
    }

    return arr
}
```
#### 中序遍历 - 迭代 - 栈遍历 (中序出栈再输出)
```js
const inorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改

        current = current.right;
    }

    return res;
};
```
