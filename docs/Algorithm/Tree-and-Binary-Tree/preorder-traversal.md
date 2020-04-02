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

### Johninch

本部分是三序遍历的实现，主要分为两类：递归和迭代。

三序遍历的递归方式非常简单，而对应的迭代法，本质上是在模拟递归，因为在递归的过程中使用了系统栈，所以在迭代的解法中常用Stack来模拟系统栈。

*其实三序遍历都有一种莫里斯遍历解法，但这种方法会破坏原树结构，且不易理解，感兴趣的话去leetcode研究下。*

#### 前序遍历 - 递归
```js
const preorder = (root, arr = []) => {
    if (root) {
        arr.push(root.val)
        preorder(root.left, arr)
        preorder(root.right, arr)
    }

    return arr
}
```
#### 前序遍历 - 迭代 - 栈遍历 (前序入栈就输出)
1. 每拿到一个 节点 就把它 [压栈](保存在栈中)；
2. 继续对这个节点的 左子树 重复 过程1，直到左子树为 空；
3. 因为保存在 栈 中的节点都遍历了 左子树 但是没有遍历 右子树，所以对栈中节点 [出栈] 并对它的 右子树 重复 过程1
4. 直到遍历完所有节点
```js
const preorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();

        current = current.right;
    }
    return res;
};
```

### niannings
```ts
/**
 * 前序遍历算法：
 * 1. 初始化一个栈stack，并将根节点压入；
 * 2. 从stack中弹出一个node，**访问**它，并将node的右、左子节点依次压入stack（如果有的话）；
 * 3. 重复步骤2，直到stack清空；
 * @param handler 处理函数
 */
export function frontEach<N extends IBinaryTreeNodeBase = IBinaryTreeNodeBase>(
    root: N,
    handler: (node: N) => void
) {
    if (root === null) return;
    const stack = [root];
    while (stack.length) {
        const node = stack.pop();
        handler(node);
        if (node.right) {
            stack.push(node.right as N);
        }
        if (node.left) {
            stack.push(node.left as N);
        }
    }
}
```

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
