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

## niannings

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
