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

## Johninch
- ”递归“：每层改变一个，先改变1和2之间的指向，不过在这之前，这个“2”要确保右侧都已翻转完毕，就是说，这一层的“2”是上一层的“1”。
- 每一层干的事情：
	- 得到一个指针，判断是否是最后一个，如果是则把指向最后一个数的指针当做新头指针发回去；
	- 如果不是，则把从上层得到的新头指针传递下去，并且把当前指针和后一个指针调换指向。
```js
function reverseList(head) {
  if (head === null) {
    return null;
  }

  if (head.next === null) {
    // 如果到最后一个数，就返回它
    return head;
  }

  var acc = head.next; // 建立指向下一个的指针
  var newHead = reverseList(acc);  // 使下一个的右侧（上层）全部翻转，返回新头指针

  acc.next = head; // 使后一个元素指向前一个元素
  head.next = null; // 使前一个元素指空

  return newHead;
}
```

## Caleb
``` js
function reverseList(head){
	let currentNode = null;
	let headNode = head;
	while(head && head.next){
		currentNode = head.next;
		head.next = currentNode.next;
		currentNode.next = headNode;
		headNode = currentNode;
	}
	return headNode
}
```