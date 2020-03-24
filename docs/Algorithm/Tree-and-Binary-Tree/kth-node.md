
# 二叉搜索树的第k个节点

## 题目
给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路
二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

## 代码

## niannings

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
