---
{
  "title": "前端算法学习",
}
---

## 时间复杂度和空间复杂度

首先要搞懂时间复杂度和空间复杂度的概念，它们的高低共同决定着一段代码质量的好坏：

#### 1. 时间复杂度

一个算法的时间复杂度反映了程序运行从开始到结束所需要的时间。把算法中基本操作重复执行的次数（频度）作为算法的时间复杂度。

> 没有循环语句，记作O(1)，也称为常数阶。只有一重循环，则算法的基本操作的执行频度与问题规模n呈线性增大关系，记作O(n)，也叫线性阶。

常见的时间复杂度有：
- O(1): Constant Complexity: Constant 常数复杂度
- O(log n): Logarithmic Complexity: 对数复杂度
- O(n): Linear Complexity: 线性时间复杂度
- O(n^2): N square Complexity 平⽅方
- O(n^3): N square Complexity ⽴立⽅方
- O(2^n): Exponential Growth 指数
- O(n!): Factorial 阶乘

![Time-Complexity](./images/Time-Complexity.png)

#### 2. 空间复杂度

一个程序的空间复杂度是指运行完一个程序所需内存的大小。利用程序的空间复杂度，可以对程序的运行所需要的内存多少有个预先估计。

一个程序执行时除了需要存储空间和存储本身所使用的指令、常数、变量和输入数据外，还需要一些对数据进行操作的工作单元和存储一些为现实计算所需信息的辅助空间。



## 数据结构

> 数据结构即数据元素相互之间存在的一种和多种特定的关系集合。


一般你可以从两个维度来理解它，逻辑结构和存储结构。

#### 1. 逻辑结构

![数据结构的逻辑结构](./images/structure-two-type.png)

简单的来说逻辑结构就是数据之间的关系，逻辑结构大概统一的可以分成两种：线性结构、非线性结构。

- 线性结构：是一个有序数据元素的集合。 其中数据元素之间的关系是一对一的关系，即除了第一个和最后一个数据元素之外，其它数据元素都是首尾相接的。常用的线性结构有: 栈，队列，链表，线性表。
- 非线性结构：各个数据元素不再保持在一个线性序列中，每个数据元素可能与零个或者多个其他数据元素发生联系。常见的非线性结构有 二维数组，树等。

#### 2. 存储结构

存储结构是逻辑结构用计算机语言的实现。常见的存储结构有顺序存储、链式存储、索引存储以及散列存储。

例如：
- 数组在内存中的位置是连续的，它就属于顺序存储；
- 链表是主动建立数据间的关联关系的，在内存中却不一定是连续的，它属于链式存储；
- 还有顺序和逻辑上都不存在顺序关系，但是你可以通过一定的方式去放问它的哈希表，数据散列存储。


## 目录

#### 链表

 - [✔️从尾到头打印链表](/Algorithm/Linked-List/print-from-tail-to-head)
 - [✔️删除链表中重复的节点](/Algorithm/Linked-List/delete-repeat-node)
 - [✔️反转链表](/Algorithm/Linked-List/reverse-linked-list)
 - [✔️复杂链表的复制](/Algorithm/Linked-List/copy-complicated-linked-list)
 - [✔️链表中环的入口结点](/Algorithm/Linked-List/entry-node-of-loop)
 - [环形链表](/Algorithm/Linked-List/deep-clone)
 - [约瑟夫环](/Algorithm/Linked-List/deep-clone)
 - [✔️两个链表的第一个公共节点](/Algorithm/Linked-List/find-first-common-node)
 - [✔️链表倒数第k个节点](/Algorithm/Linked-List/find-Kth-to-tail)
 - [相交链表](/Algorithm/Linked-List/deep-clone)
 - [扁平化多级双向链表](/Algorithm/Linked-List/deep-clone)
 - [合并两个排序的链表](/Algorithm/Linked-List/deep-clone)

#### 数组
  - [✔️完美实现深拷贝](/Algorithm/Array/deep-clone)

#### 栈和队列
  - [完美实现深拷贝](/Algorithm/Stack-and-Queue/deep-clone)

#### 树和二叉树
  - [完美实现深拷贝](/Algorithm/Tree-and-Binary-Tree/deep-clone)

#### 字符串
  - [完美实现深拷贝](/Algorithm/String/deep-clone)

#### 递归与循环
  - [完美实现深拷贝](/Algorithm/Recursion-and-Loop/deep-clone)

#### 查找
  - [完美实现深拷贝](/Algorithm/Search/deep-clone)

#### 位运算
  - [完美实现深拷贝](/Algorithm/Bitwise/deep-clone)

#### 回溯法
  - [完美实现深拷贝](/Algorithm/Backtracking/deep-clone)

#### 数学
  - [完美实现深拷贝](/Algorithm/Math/deep-clone)

#### 哈希表
  - [完美实现深拷贝](/Algorithm/Hashtable/deep-clone)

#### 堆
  - [完美实现深拷贝](/Algorithm/Heap/deep-clone)

#### 其他
  - [完美实现深拷贝](/Algorithm/Other/deep-clone)
