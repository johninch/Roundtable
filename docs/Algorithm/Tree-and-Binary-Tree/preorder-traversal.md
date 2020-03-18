# 二叉树的前序遍历

## 题目
给定一个二叉树，返回它的 `前序` 遍历。

#### 示例
```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [1,2,3]
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
 * 前序遍历(递归方式)：根-左-右
 */
var preorderTraversal = function(root) {
    var dlr = function(root,arr){
        if(root == null) {return}
        arr.push(root.val)
        dlr(root.left,arr)
        dlr(root.right,arr)
        return arr
    }
    let arr = []
    dlr(root ,arr)    
    return arr
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
 * 前序遍历(非递归方式)：根-左-右
 */
var preorderTraversal = function (root) {
    let stack = [root]
    let arr = []
    while (stack.length > 0) {
        let node = stack.pop();
        node && arr.push(node.val); 
        node && node.right && stack.push(node.right); 
        node && node.left && stack.push(node.left); 
    }
    return arr
};
```

