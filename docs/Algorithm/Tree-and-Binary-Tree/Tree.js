// 二叉树节点
class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

class Tree {
    // 此构造器用来将 层序遍历数组，转换成对应二叉树
    constructor(data) {
        // 顶部节点
        this.root = null;
        // 需要 将层序遍历的二叉树数组 构造成 二叉树
        if (data) {
            // 临时存储所有节点，方便寻找父节点
            let nodeList = [];
            for (let i = 0; i < data.length; i++) {
                let node = new Node(data[i])
                nodeList.push(node)
                if (i > 0) {
                    // 计算当前节点层级
                    let n = Math.floor(Math.sqrt(i+1))
                    // 记录当前层的起始点
                    let q = Math.pow(2, n) - 1;
                    // 记录上一层的起始点
                    let p = Math.pow(2, n-1) - 1;
                    // 找到当前节点的父节点
                    let parent = nodeList[p + Math.floor((i-q)/2)]
                    // 将当前节点和上一层节点做关联
                    if (parent.left) {
                        parent.right = node;
                    } else {
                        parent.left = node;
                    }
                }
            }
            this.root = nodeList.shift();
            nodeList.length = 0; // 释放临时数组
        }

        return this.root;
    }
}

export default Tree

export {
    Node
}
