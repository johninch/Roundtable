
# 合并两个有序链表

## 1、题目描述
输入两个递增排序的链表，合并这两个链表并使新链表中的结点仍然是按照递增排序的。

## 2、思路

首先需要判断几个特殊情况，即判断输入的两个指针是否为空。如果第一个链表为空，则直接返回第二个链表；如果第二个链表为空，则直接返回第一个链表。如果两个链表都是空链表，合并的结果是得到一个空链表。

两个链表都是排序好的，我们只需要从头遍历链表，判断当前指针，哪个链表中的值小，即赋给合并链表指针，剩余的结点仍然是排序的，所以合并的步骤和之前是一样的，所以这是典型的递归过程，用递归可以轻松实现。

## Johninch
- 递归：
```js
function merge(p1, p2) {
  if (!p1 || !p2) {
    return p1 || p2
  }

  let head = null // 头节点
  if (p1.value < p2.value) {
    head = p1
    head.next = merge(p1.next, p2)
  } else {
    head = p2
    head.next = merge(p1, p2.next)
  }

  return head
}
```
- 非递归：
```js
function merge(p1, p2) {
  if (!p1 || !p2) {
    return p1 || p2
  }

  let head = new Node() // 增加头节点
  let node = head

  while (p1 && p2) {
    if (p1.value < p2.value) {
      node.next = p1
      p1 = p1.next
    } else {
      node.next = p2
      p2 = p2.next
    }

    node = node.next
  }

  if (p1) {
    node.next = p1
  }

  if (p2) {
    node.next = p2
  }

  return head.next;
}
```



## Caleb
``` js
function mergeList(head1, head2) {

  if(head1 === null || head2 === null){
    return head1 || head2
  }
  const head = null;
  if(head1.val <= head2.val){
    head = head1;
    head.next = mergeList(head1.next, head2)
  }else{
    head = head2;
    head.next = mergeList(head1, head2.next)
  }
}
```

