
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

### niannings
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

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 二叉搜索树，查找第K小的节点
find_k_node(k){
    const stack = []; // 用来保存中间节点的堆栈
    const leftStack = []; // 用来保存左边节点的堆栈
    let node = this.root;
    if(node){
        stack.push(node);
        if(node.left){
            leftStack.push(node.left);
        }
        while(leftStack.length > 0 || stack.length > 0){
            if (leftStack.length > 0) {
                node = leftStack.pop();
                if(node.left){
                    leftStack.push(node.left);
                }
                stack.push(node);
            } else {
                node = stack.pop();
                k--;
                if(k === 0) {
                    return node.value;
                }
                if(node.right){
                    leftStack.push(node.right);
                }
            }
        }
    }
}
```

#### 代码测试
```js
const tree = new Tree([5, 3, 7, 2, 4, 6, 8]);
console.log(tree.find_k_node(3));
```