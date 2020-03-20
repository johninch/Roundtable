# 对称的二叉树

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
递归所有节点满足以上条件即二叉树对称。

## 代码

### mtd
```js
function isSymmetrical(root) {
  let isSymmetricalTree = function(left, right) {
    if (!left && !right) {
      return true;
    }

    if (!left || !right) {
      return false;
    }

    if (left.val !== right.val) {
      return false;
    }

    return (
      isSymmetricalTree(left.left, right.right) &&
      isSymmetricalTree(left.right, right.left)
    );
  };

  return isSymmetricalTree(root.left, root.right);
}
```

