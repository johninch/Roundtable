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

## niannings

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


