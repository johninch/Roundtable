---
{
  "title": "[基本]删除链表中重复的结点",
}
---

# 删除链表中重复的结点

## 1、题目描述
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5。

## 2、思路
关于链表的大多数题目还是比较简单的，本题也并不太难。

删除重复结点，也就是如果当前结点和下一个结点的值相同，那么就是重复的结点，都可以被删除，为了保证删除之后的链表的连通性，在删除之后，要把当前结点前面的结点和下一个没有重复的结点链接起来，为此，程序需要记录当前的最后一个不重复结点，即程序中的pre。重点在于：一定要确保当前链接到链表中的一定是不会再重复的结点，具体见代码实现。

  关于第一个结点如果重复怎么办的问题，我们不用单独考虑，可以使用链表中一贯的做法，加一个头结点即可。

  具体思路看代码比较直观，参考如下的代码实现。

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
var deleteDuplicates = function(head) {
    let current = head;
    while(current && current.next) {
      if (current.val === current.next.val) {
        current.next = current.next.next;      
      } else {
        current = current.next;
      }
    }
    return head;
};
```
