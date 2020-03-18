---
{
  "title": "[基本]反转链表",
}
---

# 反转链表

## 1、题目描述
输入一个链表，反转链表后，输出新链表的表头。

## 2、思路
本题比较简单，有两种方法可以实现：（1）三指针。使用三个指针，分别指向当前遍历到的结点、它的前一个结点以及后一个结点。将指针反转后，三个结点依次前移即可。（2）递归方法。同样可以采用递归来实现反转。将头结点之后的链表反转后，再将头结点接到尾部即可。

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
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null
    let next = head
    while(next) {
        let node = next.next
        next.next = prev
        prev = next
        next = node 
    }
    return prev
};
```

