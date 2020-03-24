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


