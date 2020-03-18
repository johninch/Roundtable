---
{
  "title": "[基本]从尾到头打印链表",
}
---

# 从尾到头打印链表

## 1、题目描述
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

## 2、思路
(三种方法：借助栈、递归、列表的首位插入)

  从头到尾打印链表比较简单，从尾到头很自然的可以想到先将链表进行反转，然后再打印。但是，通常我们不希望改变原链表的结构，这是一个只读操作。

  因此，我们进一步分析，可以发现排在后面的先输出，这是一个典型的“后入先出”的思想，因此很自然的可以想到用栈来实现，每遍历一个结点，可以将其压入栈中，遍历结束后再逐个弹栈，将结点值存入ArrayList，这样就实现了从尾到头的打印。

  更进一步，既然想到了用栈，那一定可以通过递归来实现。每访问到一个结点，先递归输出其后的结点，在输出该结点自身即可。

  另外，当我们使用Java或者python语言时，有一种比较巧妙的方法就是使用列表的插入方法，每次插入数据，都总是插入到首位，这样得到的List就是从尾到头的链表序列。

## 3、代码实现

#### majun:

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
  if(head === null) return [];
  let res = reversePrint(head.next);
  res.push(head.val);
  return res;
};
```
</details>

