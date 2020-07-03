# 二叉树的层序遍历

[leetcode - 102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal)

## 题目
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

#### 示例：
二叉树：[3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其层次遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```
请分别以 `递归`、`非递归` 方法实现？

## 代码

### Johninch
BFS：

1. 递归（增加层级参数）：
```js
var levelOrder = function(root) {
    if (!root) return []

    let res = []
    let walk = (res, root, level) => {
        if (!root) return

        res[level] ? res[level].push(root.val) : res[level] = [root.val]
        walk(res, root.left, level + 1)
        walk(res, root.right, level + 1)
    }

    walk(res, root, 0)

    return res
};
```
2. 迭代（增加层级参数，使用队列辅助，循环迭代）：
```js
const levelOrder = function(root) {
    if (!root) return []

    let res = []
        queue = [[root, 0]]
    while (queue.length) {
        let [cur, level] = queue.shift()
        res[level] ? res[level].push(cur.val) : res[level] = [cur.val]

        if (cur.left) queue.push([cur.left, level + 1])
        if (cur.right) queue.push([cur.right, level + 1])
    }

    return res
}
```

3. 非递归（迭代）：
    - 使用队列存放每一层的节点
    - 外循环负责遍历层级结构, 内循环负责遍历每一层的子节点
    - 在内循环中记录当前值, 并且把子节点添加到temp中
    - 当本层遍历完时，退到外循环，并把temp下一层的节点, 再赋给queue, 直到queue为空则表示全部遍历完毕
```js
const levelOrder = root => {
    if (!root) return []

    let res = [],
        queue = [root]
    while (queue.length) { // 外循环遍历层级
        let arr = [],
            temp = []
        while (queue.length) { // 内循环遍历每一层的子节点
            let cur = queue.shift()
            arr.push(cur.val)

            if (cur.left) temp.push(cur.left)
            if (cur.right) temp.push(cur.right)
        }
        queue = temp
        res.push(arr)
    }
    return res
}
```
