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
 * 后序遍历(递归方式)：左-右-根
 */
var postorderTraversal = function(root) {
    var result = [];
    function ldr(node){
        if(node != null){
            if(node.left != null) ldr(node.left);
            if(node.right != null) ldr(node.right);
            result.push(node.val);
        }
    }
    ldr(root);
    return result;
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
 * 后序遍历(非递归方式)：左-右-根
 */
var postorderTraversal = function(root) {
   let res = [];
    if(!root) return res;
    let stack = [];
    let curr = root
    while(curr != null || stack.length > 0){
        if(curr){
            res.unshift(curr.val);
            stack.push(curr);
            curr = curr.right;
        }else{
            let node = stack.pop();
            curr = node.left;
        }
    }
    return res;
};
```




