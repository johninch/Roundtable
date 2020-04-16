# 对称的二叉树

[leetcode - 101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)
[leetcode - 100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

## 题目
请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

## 思路
二叉树的右子树是二叉树左子树的镜像二叉树。

镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置。

![](./images/is-symmetrical.png)
如图，1为对称二叉树，2、3都不是。

两个根结点相等
左子树的右节点和右子树的左节点相同。
右子树的左节点和左子树的右节点相同。
递归所有节点满足以上条件即对称二叉树。

## 代码

### Johninch
```js
const isSymmetric = (root) => {
    if (!root) {
        return true;
    }
    let walk = (left, right) => {
        if (!left && !right) {
            return true;
        }

        if (!left || !right) {
            return false;
        }

        if (left.val !== right.val) {
            return false;
        }

        return walk(left.left, right.right) && walk(left.right, right.left); // 注意，这里是镜像比较的递归，与isSameTree不同
    }

    return walk(root.left, root.right)
}
```
顺便提下，上面的walk，其实就是「判断两颗树是否是相同的树」的变体：
```js
const isSameTree = (left, right) => {
    if (!left && !right) {
        return true;
    }

    if (!left || !right) {
        return false;
    }

    if (left.val !== right.val) {
        return false;
    }

    return isSameTree(left.left, right.left) && isSameTree(left.right, right.right); // 注意这里的递归就是对应位置的比较
}
```

### niannings
```ts
function isSymmetric(tree: IBinaryTree) {
    if (tree.isEmpty()) return true; // 空树
    const L = [tree.root.left];
    const R = [tree.root.right];
    while (L.length) {
        const l = L.shift();
        const r = R.shift();
        if (l === null && r === null) break; // 只有根节点
        if (l === null || r === null || l.value !== r.value) return false; // 一方不平或值不等
        L.push(l.left, r.left);
        R.push(r.right, l.right);
    }
    return true;
}
```

### superwyk
树基本结构[参见](/Roundtable/Algorithm/Tree-and-Binary-Tree/inorder-traversal.html#%E6%A0%91%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84)
#### 代码实现
```js
// 判断是否是平衡二叉树
// 所有节点左右子树高度差不超过1
isSymmetrical(){
    if (!this.root) return false;
    return this._isSymmetrical(this.root.left, this.root.right);
}
_isSymmetrical(node1, node2){
    // console.log(node1, node2)
    if (node1 === null || node2 === null) {
        if (node1 === null && node2 === null) {
            return true;
        }
        return false;
    }
    
    if (node1.value !== node2.value){
        return false;
    }
    return this._isSymmetrical(node1.left, node2.right) && this._isSymmetrical(node1.right, node2.left);
}
```

#### 代码测试
```js
const t1 = new Tree([8, 6, 6, 5, 7, 7, 5, 1, 2, 3, 4, 4, 3, 2, 1]);
console.log(t1.isSymmetrical());
const t2 = new Tree([8, 6, 9, 5, 7, 7, 5]);
console.log(t2.isSymmetrical());
const t3 = new Tree([7, 7, 7, 7, 7, 7]);
console.log(t3.isSymmetrical());
```