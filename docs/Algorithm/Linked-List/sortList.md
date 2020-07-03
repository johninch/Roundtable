# 排序链表

[leetcode - 148. 排序链表](https://leetcode-cn.com/problems/sort-list/)

在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。（按题的要求，只能使用堆排序或归并排序才能满足复杂度要求，这里可以忽略空间复杂度要求，使用快排来做）。

示例 1:
```
输入: 4->2->1->3
输出: 1->2->3->4
```
示例 2:
```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```

## Johninch
如果不考虑复杂度，这道题可考虑 **链表**和**快排**的结合：

- 首先复习下快排：[快排传送门](../Sort/fast-sort.md)
- 创建链表结构：
::: details 链表结构与基础方法
```js
class Node {
	constructor(val) {
		this.val = val
		this.next = null
	}
}

class LinkList {
	constructor(arr) {
		let head = new Node(arr.shift())
		let next = head
		arr.forEach(item => {
			next.next = new Node(item)
			next = next.next
		})
		return head // this绑定到了返回的对象上
	}

	static toArray(list) {
		const arr = []
		while (list.next) {
			arr.push(list.val)
			list = list.next
		}
		return arr
	}

	// 交换两个节点的值
	static swap(p, q) {
		let tmp = p.val
		p.val = q.val
		q.val = tmp
	}

	// 寻找基准元素的节点
	static partion(begin, end) {
		let val = begin.val
		let p = begin
		let q = begin.next
		while (q !== end) {
			if (q.val < val) {
				p = p.next
				swap(p, q)
			}
			q = q.next
		}
		// 让基准元素跑到中间去
		swap(p, begin)
		return p
	}

	find(index) {
		let cur = this.head
		for (let i = 0; i < index; ++i) {
			cur = cur.next
		}

		return cur;
	}

	insert(value, index) {
        let prev = this.find(index)
        let node = new Node(value)
        node.next = prev.next
        prev.next = node
	}
}

const list = new LinkList([6, 1, 2, 7, 9, 3, 4, 5, 10, 8])
```
:::
- 本题：链表快排
```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const sortList = function(head) {
	// 保持链表结构不改变，只交换值
	const swap = (p, q) => {
		const val = p.val
		p.val = q.val
		q.val = val
	}

	// 寻找基准元素的节点
	const partion = (begin, end = null) => {
		const val = begin.val
		let p = begin
		let q = begin.next
		// 保证 p左小，p右大
		while (q !== end) {
			if (q.val < val) {
				// 遍历小于基准时，要跟p的下一个节点交换
				p = p.next
				swap(p, q)
			}
			q = q.next
		}
		// 让基准元素跑到中间去
		swap(p, begin)

		return p
	}

	const sort = (begin, end = null) => {
		if (begin !== end && begin !== null) {
			const part = partion(begin, end)
			sort(begin, part)
			sort(part.next, end)
		}
		return begin
	}

	return sort(head)
}
```


