- 哈希表
    - `E 1. 两数之和`
- 相加
    - `M 2. 两数相加`
    - `M 445. 两数相加 II`
    - `E 415. 字符串相加（处理加法精度）`
- 相乘
    - `M 43. 字符串相乘（大数相乘）`
- 回溯与递归
    - `M 46. 全排列`
    - `M 22. 括号生成`
    - `M 93. 复原IP地址`
    - `E 汉诺塔问题`
- 组合运算
    - `求组合：从n个数组中各选一个元素，有多少种组合`
    - `M 17. 电话号码的字母组合`
- 滑动窗口
    - `M 3. 无重复字符的最长子串`
- 双指针
    - `E 9. 回文数`
    - `M 15. 三数之和`
    - `M 11. 盛最多水的容器`
    - `H 42. 接雨水`
- 二分查找
    - `M 33. 搜索旋转排序数组`
    - `M 240. 搜索二维矩阵 II`
- 贪心
    - `E 121. 买卖股票的最佳时机（一笔交易）`
    - `E 122. 买卖股票的最佳时机 II（多笔交易）`
    - `E 455. 分发饼干`
- 动态规划
    - `M 120. 三角形最小路径和`
    - `M 221. 最大正方形`
    - `E 62. 不同路径`
    - `M 63. 不同路径 II`
    - `M 70. 爬楼梯`
    - 🌰`M 5. 最长回文子串`
    - `M 1143. 最长公共子序列`
    - `E 198. 打家劫舍`
    - 🌰`M 322. 零钱兑换（dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)）`
    - `M 300. 最长上升子序列（dp[i] = Math.max(dp[i], dp[j] + 1)）`
- 深度优先遍历
    - `M 200. 岛屿数量`
    - `M 695. 岛屿的最大面积`
- 二叉树
    - `M 102. 二叉树的层序遍历`
    - `M 199. 二叉树的右视图`
    - `M 103. 二叉树的锯齿形层次遍历`
    - `M 958. 二叉树的完全性检验（index !== ++count）`
    - `二叉树的前序遍历`
    - `二叉树的中序遍历`
    - `二叉搜索树的第k个节点（BST的中序遍历是升序）`
    - `二叉树的后序遍历`
    - `M 105. 从前序与中序遍历序列构造二叉树`
    - `求二叉树的后序遍历`
    - `E 统计节点个数`
    - `E 111. 二叉树的最小深度（左或右子树为空的话是构不成子树的）`
    - `E 104. 二叉树的最大深度`
    - `E 543. 二叉树的直径（利用最大深度）`
    - `E 110. 平衡二叉树`
    - `M 236. 二叉树的最近公共祖先`
    - `E 112. 路径总和`
    - `判断树相同`
    - `E 101. 对称二叉树`
    - `求二叉树的镜像`
- 链表
    - `E 160. 相交链表`
    - `E 141. 环形链表`
    - `链表中环的入口结点`
    - `M 19. 删除链表的倒数第N个节点`
    - `E 21. 合并两个有序链表`
    - `E 206. 反转链表`
    - `M 92. 反转链表 II（---tmpHead tmpHead.next---prev cur---）`
    - `M 143. 重排链表`
    - `M 24. 两两交换链表中的节点（四指针）`
- 字符串
    - `E 14. 最长公共前缀`
    - `E 696. 计数二进制子串`
    - `E 557. 反转字符串中的单词 III`
- 数组
    - `E 53. 最大子序和`
    - `E 674. 最长连续递增序列`
    - `E 26. 删除排序数组中的重复项（返回移除后数组的新长度）`
    - `M 442. 数组中重复的数据（不用空间，原地哈希）`
    - `H 41. 缺失的第一个正数`
    - `E 605. 种花问题`
    - `M 56. 合并区间`
    - `M 670. 最大交换`
    - `E 扑克牌中的顺子`
    - `E 169. 多数元素`
- 栈
    - `E 20. 有效的括号`
- 正则
    - `E 459. 重复的子字符串`
- TopK问题
    - `E 414. 第三大的数`
- 设计
    - `M 146. LRU缓存机制`



未补全

- `生成二叉搜索树`
- `二叉搜索树的后序遍历`
- `从尾到头打印链表`
- `设计循环队列`
- `M 71. 简化路径`
    - 遇到正常的字母时，推入 stack 中
    - 遇到 .. 时，stack 弹出最近一个路径
    - 遇到 . 或者为空时，不修改当前 stack。
    - 最后返回 '/' + stack.join('/') 为新的路径
- `M 6. Z 字形变换`
- `E 437. 路径总和 III`
    - 此题不需要从根节点到叶子节点，但必须是向下遍历求和，返回路径数
- `H 25. K 个一组翻转链表`*（没掌握）*
- `E 7. 整数反转`
    - 取余数，最后判断正负号及是否越界
- `排序链表`
- `M 98. 验证二叉搜索树`
    - 传递上下界
- `E 88. 合并两个有序数组`
    - 这个题主要是要注意在nums1上做改动，不用返回任何值
- `M 8. 字符串转换整数 (atoi)`

























