---
{
  "title": "树和二叉树概述",
}
---

# 数据结构-树和二叉树

树是用来模拟具有树状结构性质的数据集合。而二叉树是树最简单、应用最广泛的种类。二叉树是每个节点最多有两个子树的树结构，通常将当前节点称作“根节点”，子树被称作“左子树”和“右子树”。

## 二叉树基础

### 完全二叉树的一些公式
1. 第n层的节点数最多为2n个节点

2. n层二叉树最多有20+...+2n=2n+1-1个节点

3. 第一个非叶子节点：length/2

4. 一个节点的孩子节点：2n、2n+1

### 基本结构

插入，遍历，深度

::: details 基本结构
```js
        function Node(data, left, right) {
            this.data = data;
            this.left = left;
            this.right = right;
        }

        Node.prototype = {
            show: function () {
                console.log(this.data);
            }
        }

        function Tree() {
            this.root = null;
        }

        Tree.prototype = {
            insert: function (data) {
                var node = new Node(data, null, null);
                if (!this.root) {
                    this.root = node;
                    return;
                }
                var current = this.root;
                var parent = null;
                while (current) {
                    parent = current;
                    if (data < parent.data) {
                        current = current.left;
                        if (!current) {
                            parent.left = node;
                            return;
                        }
                    } else {
                        current = current.right;
                        if (!current) {
                            parent.right = node;
                            return;
                        }
                    }

                }
            },
            preOrder: function (node) {
                if (node) {
                    node.show();
                    this.preOrder(node.left);
                    this.preOrder(node.right);
                }
            },
            middleOrder: function (node) {
                if (node) {
                    this.middleOrder(node.left);
                    node.show();
                    this.middleOrder(node.right);
                }
            },
            laterOrder: function (node) {
                if (node) {
                    this.laterOrder(node.left);
                    this.laterOrder(node.right);
                    node.show();
                }
            },
            getMin: function () {
                var current = this.root;
                while(current){
                    if(!current.left){
                        return current;
                    }
                    current = current.left;
                }
            },
            getMax: function () {
                var current = this.root;
                while(current){
                    if(!current.right){
                        return current;
                    }
                    current = current.right;
                }
            },
            getDeep: function (node,deep) {
                deep = deep || 0;
                if(node == null){
                    return deep;
                }
                deep++;
                var dleft = this.getDeep(node.left,deep);
                var dright = this.getDeep(node.right,deep);
                return Math.max(dleft,dright);
            }
        }

```

```js
        var t = new Tree();
        t.insert(3);
        t.insert(8);
        t.insert(1);
        t.insert(2);
        t.insert(5);
        t.insert(7);
        t.insert(6);
        t.insert(0);
        console.log(t);
        // t.middleOrder(t.root);
        console.log(t.getMin(), t.getMax());
        console.log(t.getDeep(t.root, 0));
        console.log(t.getNode(5,t.root));
```
:::

### 树查找
::: details 树查找
```js
getNode: function (data, node) {
    if (node) {
        if (data === node.data) {
            return node;
        } else if (data < node.data) {
            return this.getNode(data,node.left);
        } else {
            return this.getNode(data,node.right);
        }
    } else {
        return null;
    }
}
```
:::


### 二分查找

二分查找的条件是必须是有序的线性表。

和线性表的中点值进行比较，如果小就继续在小的序列中查找，如此递归直到找到相同的值。
::: details 二分查找
```js
function binarySearch(data, arr, start, end) {
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (data == arr[mid]) {
        return mid;
    } else if (data < arr[mid]) {
        return binarySearch(data, arr, start, mid - 1);
    } else {
        return binarySearch(data, arr, mid + 1, end);
    }
}
var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
console.log(binarySearch(1, arr, 0, arr.length-1));
```
:::

## 1、二叉树遍历
> 重点中的重点，最好同时掌握递归和非递归版本，递归版本很容易书写，但是真正考察基本功的是非递归版本。

 - [二叉树的中序遍历](/Algorithm/Tree-and-Binary-Tree/inorder-traversal)
 - [二叉树的前序遍历](/Algorithm/Tree-and-Binary-Tree/preorder-traversal)
 - [二叉树的后序遍历](/Algorithm/Tree-and-Binary-Tree/postorder-traversal)
 - [✔️重建二叉树](/Algorithm/Tree-and-Binary-Tree/reconstruct-binary-tree)
 - [求二叉树的遍历](/Algorithm/Tree-and-Binary-Tree/get-HRD)

## 2、二叉树的对称性

 - [✔️对称的二叉树](/Algorithm/Tree-and-Binary-Tree/is-symmetrical)
 - [二叉树的镜像](/Algorithm/Tree-and-Binary-Tree/mirror)

## 3、二叉搜索树
> 二叉搜索树是特殊的二叉树，考察二叉搜索树的题目一般都是考察二叉搜索树的特性，所以掌握好它的特性很重要。

1. 若任意节点的左⼦子树不不空，则左⼦子树上所有结点的值均⼩小于它的 根结点的值;
2. 若任意节点的右⼦子树不不空，则右⼦子树上所有结点的值均⼤大于它的 根结点的值;
3. 任意节点的左、右⼦子树也分别为⼆二叉查找树。

 - [二叉搜索树的第k个节点](/Algorithm/Tree-and-Binary-Tree/kth-node)
 - [二叉搜索树的后序遍历](/Algorithm/Tree-and-Binary-Tree/verify-squence-of-BST)

## 4、二叉树的深度
> 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

> 平衡二叉树：左右子树深度之差大于1。

 - [二叉树的最大深度](/Algorithm/Tree-and-Binary-Tree/max-depth)
 - [二叉树的最小深度](/Algorithm/Tree-and-Binary-Tree/min-depth)
 - [平衡二叉树](/Algorithm/Tree-and-Binary-Tree/is-balanced)

