# 重建二叉树

## 题目
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

## 思路
- 前序遍历：跟节点 + 左子树前序遍历 + 右子树前序遍历
- 中序遍历：左子树中序遍历 + 跟节点 + 右字数中序遍历
- 后序遍历：左子树后序遍历 + 右子树后序遍历 + 跟节点

根据上面的规律：
- 前序遍历找到根结点root
- 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

## 代码

## niannings

```ts
export function rebuildTree(frontEachList: any[], middleEachList: any[]) {
    const tree = new BinaryTree();
    if (frontEachList.length === 0) return tree;
    tree.root = rebuild(frontEachList, middleEachList);

    function rebuild(f: any[], m: any[]) {
        const v = f[0];
        const newNode = new BinaryTreeNode(v);
        const sliceIndex = m.indexOf(v);
        const l = f.slice(1, sliceIndex + 1);
        const r = f.slice(sliceIndex + 1);
        if (l.length) {
            newNode.left = rebuild(l, m.slice(0, sliceIndex));
        }
        if (r.length) {
            newNode.right = rebuild(r, m.slice(sliceIndex + 1));
        }
        return newNode;
    }
    return tree;
}
```
