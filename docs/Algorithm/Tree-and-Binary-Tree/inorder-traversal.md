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

### niannings

```ts
/**
 * 中序遍历算法：
 * 1. 初始化一个指针node指向根节点，初始化一个栈stack，并将node压入；
 * 2. 如果node存在便将node压入stack并将其左子节点赋给node，如果不存在则从stack弹出一个赋给node，**并访问node**，然后将node的右子节点赋给node；
 * 3. 重复步骤2，直到stack清空
 * @param handler 处理函数
 */
export function middleEach<N extends IBinaryTreeNodeBase = IBinaryTreeNodeBase>(
    root: N,
    handler: (node: N) => void
) {
    if (root === null) return;
    let node = root;
    const stack = [];
    while (stack.length || node) {
        if (node) {
            stack.push(node);
            node = node.left as N;
        } else {
            node = stack.pop();
            // 提供退出遍历能力
            if (isFalse(handler(node as N))) {
                break;
            }
            node = node.right as N;
        }
    }
}
```

### febcat
```js
inorderTraversal(node = this.root) {
    let inorderTraverArr = [];

    const loop = (node) => {
        if (!node) {
            return;
        }

        loop(node.left);
        inorderTraverArr.push(node.data);
        loop(node.right);
    }

    loop(node);

    console.log("中序排列:", inorderTraverArr);
    return inorderTraverArr;
}

inorderTraversal2(node = this.root) {
    if (!node) {
      return;
    }

    let stack = [];
    let inorderTraversalArr = [];

    while (stack.length || node) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        inorderTraversalArr.push(node.data);
        node = node.right;
      }
    }

    console.log("中序遍历迭代：", inorderTraversalArr);
    return inorderTraversalArr;
  }
```
