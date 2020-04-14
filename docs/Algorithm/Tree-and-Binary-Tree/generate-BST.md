# 构造二叉搜索树

## 题目
输入一串数字的数组，数组中的数字唯一且没有空值，构造一颗二叉搜索树。

## 代码

### Johninch
将一串数字，构造成二叉搜索树：
```js
const generateBST = (data) => {
    let root = new Node(data.shift())

    let insert = (node, data) => {
        if (node.val > data) {
            if (!node.left) {
                node.left = new Node(data)
            } else {
                this.insert(node.left, data)
            }
        } else {
            if (!node.right) {
                node.right = new Node(data)
            } else {
                this.insert(node.right, data)
            }
        }
    }

    // 遍历所有的数据，逐渐插入到当前这颗搜索树中
    data.forEach(item => insert(root, item))

    return root
}
```