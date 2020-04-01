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

### Johninch

本部分是三序遍历的实现，主要分为两类：递归和迭代。

三序遍历的递归方式非常简单，而对应的迭代法，本质上是在模拟递归，因为在递归的过程中使用了系统栈，所以在迭代的解法中常用Stack来模拟系统栈。

*其实三序遍历都有一种莫里斯遍历解法，但这种方法会破坏原树结构，且不易理解，感兴趣的话去leetcode研究下。*

#### 后序遍历 - 递归
```js
const postorder = (root, arr = []) => {
    if (root) {
        postorder(root.left, arr)
        postorder(root.right, arr)
        arr.push(root.val)
    }

    return arr
}
```
#### 后序遍历 - 迭代 - 栈遍历 (后续是对前序的修改)
后序迭代的方法都是以前序迭代修改而来的：

- 第一种写法就是采用 根右左 的遍历方法，最后再将结果翻转
```js
const postorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            res.push(current.val);
            stack.push(current);
            current = current.right; // 相比前序遍历，修改，先遍历右子树
        }

        current = stack.pop();

        current = current.left; // 相比前序遍历，修改，后遍历左子树
    }
    return res.reverse(); // 因为是 根右左，所以需要翻转成 左右根
}
```

- 第二种写法是建立一个指向前一节点的指针，标记右孩子是否被访问
```js
const postorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    let last = null; // 修改1，指针，标记上一个访问的节点

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        current = stack[stack.length - 1];
        if (!current.right || current.right == last) { // 修改二，增加判断是否该输出结点
            current = stack.pop();
            res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改
            last = current;
            current = null; // 继续弹栈
        } else {
            current = current.right;
        }
    }
    return res;
}
```

## niannings
```ts
/**
 * 后续遍历算法：
 * 1. 初始化两个栈s1，s2
 * 2. 将root放入s1
 * 3. s1弹出一个node，把node压入s2，把node的左右子节点压入s1
 * 4. 重复步骤2、3直到s1被清空
 * 5. 这样s2中的序列就是按照后续遍历的顺序排列的了，直接pop直到s2清空
 * @param handler 处理节点
 */
export function backEach<N extends IBinaryTreeNodeBase = IBinaryTreeNodeBase>(
    root: N,
    handler: (node: N) => void
) {
    if (root === null) return;
    const [s1, s2] = [[root], []];
    while (s1.length) {
        const node = s1.pop();
        s2.push(node);
        if (node.left) {
            s1.push(node.left as N);
        }
        if (node.right) {
            s1.push(node.right as N);
        }
    }
    while (s2.length) {
        handler(s2.pop());
    }
}
```

