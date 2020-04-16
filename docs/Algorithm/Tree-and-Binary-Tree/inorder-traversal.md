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

### Johninch

本部分是三序遍历的实现，主要分为两类：递归和迭代
三序遍历的递归方式非常简单，而对应的迭代法，本质上是在模拟递归，因为在递归的过程中使用了系统栈，所以在迭代的解法中常用Stack来模拟系统栈。
其实三序遍历都有一种莫里斯遍历解法，但这种方法会破坏原树结构，且不易理解，感兴趣的话去leetcode研究下。

#### 中序遍历 - 递归
```js
const inorder = (root, arr = []) => {
    if (root) {
        inorder(root.left, arr)
        arr.push(root.val)
        inorder(root.right, arr)
    }

    return arr
}
```
#### 中序遍历 - 迭代 - 栈遍历 (中序出栈再输出)
```js
const inorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改

        current = current.right;
    }

    return res;
};
```

### niannings

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

### superwyk
#### 树基本结构
```js
// 树节点
class TreeNode{
    constructor(value){
        // 节点值
        this.value = value;
        // 左节点、右节点初始化为空
        this.left = this.right = null;
    }
}
// 树
class Tree{
    constructor(data){
        this.root = null;
        if (Object.prototype.toString.call(data) !== '[object Array]' || data.length === 0) {
            return;
        }
        
        this.init(data);
    }
    // data数据源是按照水平顺序遍历得到的数组数据
    // https://support.leetcode-cn.com/hc/kb/article/1194353/
    init(data){
        // 保存所有叶子节点
        const leafs = []; // 队列的数据结构，遵循先进先出
        const value = data.shift();
        if (value !== null){
            const node = new TreeNode(value);
            this.root = node;
            leafs.push(node);
        }
        while(leafs.length > 0){
            const parentNode = leafs.shift();
            const leftValue = data.shift();
            const rightValue = data.shift();

            // data已经shift空了，leftValue、rightValue为undefined
            if (leftValue !== null && leftValue !== undefined){
                const leftNode = new TreeNode(leftValue);
                parentNode.left = leftNode;
                leafs.push(leftNode);
            }
            if (rightValue !== null && rightValue !== undefined){
                const rightNode = new TreeNode(rightValue);
                parentNode.right = rightNode;
                leafs.push(rightNode);
            }
        }
    }
    // 水平顺序遍历打印树
    print(){
        if (!this.root) return;
        // 保存所有叶子节点
        let leafs = [this.root]; // 队列的数据结构，遵循先进先出
        while(leafs.length > 0){
            const newLeafs = [];
            // 遍历所有叶子节点
            for (let i = 0; i < leafs.length; i++) {
                const node = leafs[i];
                if (!node) {
                    console.log(null);
                    continue;
                }
                console.log(node.value);
                if (node.right === null) {
                    // 后序节点是否有子节点标志
                    let haveNextNodeFlag = false;
                    // 判断后续叶子节点，是否有子节点点，有的话，需要插入两个null
                    for (let j = i + 1; j < leafs.length; j++){
                        const nextNode = leafs[j];
                        if(nextNode && (nextNode.left || nextNode.right)) {
                            haveNextNodeFlag = true;
                            break;
                        }
                    }
                    if (haveNextNodeFlag || newLeafs.length > 0) {
                        newLeafs.push(node.left);
                        newLeafs.push(node.right);
                    } else if(node.left){
                        newLeafs.push(node.left);
                        if (!haveNextNodeFlag && (node.left.left || node.left.right)) {
                            newLeafs.push(null);
                        }
                    }
                } else {
                    newLeafs.push(node.left);
                    newLeafs.push(node.right);
                }
            }
            leafs = newLeafs;
        }
    }
}
```
#### 树测试
```js
const tree = new Tree([5,1,4,null,null,3,6]);
tree.print();
console.log('---------');
const tree2 = new Tree([1,null,2,3]);
tree2.print();
console.log('---------');
const tree3 = new Tree([1, 2, 3, 4, 5, 6, null, 7, null, null, null, null, null, 8]);
tree3.print()
```
#### 中序遍历，递归实现
```js
// 中序遍历，使用递归
LDR_recursive(node = this.root){
    if(node){
        this.LDR_recursive(node.left);
        console.log(node.value);
        this.LDR_recursive(node.right);
    }
}
```
#### 中序遍历，非递归实现
```js
// 中序遍历，使用非递归-堆栈
LDR_stack(){
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
                console.log(node.value);
                if(node.right){
                    leftStack.push(node.right);
                }
            }
        }
    }
}
```
#### 中序遍历，测试
```js
// const tree = new Tree([1,null,2,3]);
const tree = new Tree([1,2,3,4,5,null,6,7,null,null,8]);
tree.LDR_recursive();
tree.LDR_stack();
```