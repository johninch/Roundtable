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

#### majun:

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 中序遍历(递归方式)：左-根-右
 */
var inorderTraversal = function(root) {
    let res = []
    ldr(root, res)
    function ldr(root, res) {
        if (root !== null) {
            ldr(root.left, res)
            res.push(root.val)
            ldr(root.right, res)
        }
    }
    return res
};
```

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 中序遍历(非递归方式)：左-根-右
 */

var inorderTraversal = function(root) {
    const result = []
    const stack = []
    while(stack.length || root) {
        if(root) {
            stack.push(root)
            root = root.left
        } else {
            const node = stack.pop()
            result.push(node.val)
            root = node.right
        }
    }
    return result
};
```



