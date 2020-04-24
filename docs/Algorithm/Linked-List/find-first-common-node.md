---
{
  "title": "[双指针]两个链表的第一个公共结点",
}
---

# 两个链表的第一个公共结点

## 1、题目描述
输入两个链表，找出它们的第一个公共结点。

## 2、思路
方法一：**借助辅助栈**。我们可以把两个链表的结点依次压入到两个辅助栈中，这样两个链表的尾结点就位于两个栈的栈顶，接下来比较两个栈顶的结点是否相同。如果相同，则把栈顶弹出继续比较下一个，直到找到最后一个相同的结点。此方法也很直观，时间复杂度为O(m+n)，但使用了O(m+n)的空间，相当于用空间换取了时间效率的提升。

方法二：**快慢指针（将两个链表设置成一样长）**。具体做法是先求出两个链表各自的长度，然后将长的链表的头砍掉，也就是长的链表先走几步，使得剩余的长度与短链表一样长，这样同时向前遍历便可以得到公共结点。时间复杂度为O(m+n)，不需要额外空间。

![](./images/find-first-common-node.png)

## Johninch
```js
// 方法1：栈实现 时间为O(m+n)，空间为O(m+n)
// 在第一个公共节点前的节点都是不相同的，因此只要倒序遍历两个链表，找出最后一个出现的相同节点即可。
// 因为链表不能倒序遍历，所以借助栈实现。
function findCommon(list1, list2) {
  const stack1 = [],
        stack2 = [];

  let node = list1;
  while (node) {
    stack1.push(node);
    node = node.next;
  }

  node = list2;
  while (node) {
    stack2.push(node);
    node = node.next;
  }

  node = null;
  while (stack1.length && stack2.length) {
    let top1 = stack1.pop(),
        top2 = stack2.pop();
    if (top1 === top2) {
      node = top1;
    } else {
      break;
    }
  }

  return node;
}
```

## Caleb
``` js
function getFirstCommonNode(head1, head2) {
  if (head1 === null || head2 === null) {
    return null
  }
  var current = head1;
  var stack1 = putNodeIntoStack[head1];
  var stack2 = putNodeIntoStack[head2];
  for(var i=0, len = stack1.length; i<len; i++) {
    var node = current.next;
    if (stack1[i] === stack2[i]) {
      current.next = node;
      current = current.next;
    } else {
      if (i === 0){
        current = null
      }
      break;
    }
  }

}

function putNodeIntoStack(head) {
  var stack = [];
  while(head) {
    stack.unshift(head.val);
    head = head.next
  }

  return stack;
}
```

