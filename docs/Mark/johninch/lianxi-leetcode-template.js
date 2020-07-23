// - `E 674. 最长连续递增序列`
var findLengthOfLCIS = function(nums) {

}


// - `E 面试题61. 扑克牌中的顺子`
var isStraight = function(nums) {

};


// H 42. 接雨水
    // for(let i = 0; i < height.length; i++) {
    //     area += (h[i] - height[i]) * 1; // h为下雨之后的水位
    // }
    // h[i] = Math.min(左边柱子最大值, 右边柱子最大值)
var trap = function(height) {

};

// H 25. K 个一组翻转链表
var reverseKGroup = function(head, k) {

};


// E 1. 两数之和
// 用一个对象注册，类似哈希表
var twoSum = function (nums, target) {

}

// M 15. 三数之和
// 双指针法
var threeSum = function(nums) {

};

// - M 43. 字符串相乘（大数相乘）
var multiply = function (num1, num2) {

};



// - E 字符串相加（处理加法精度）
var addStrings = function(num1, num2) {

};

// 处理加法精度
var addStrings = function(num1, num2) {

};
addStrings('110.3', '2000.45')

// M 2. 两数相加
// 这个题，链表head是个位：(2 -> 4 -> 3) 342
var addTwoNumbers = function(l1, l2) {

};


// M 445. 两数相加 II
// 链表尾部是个位：(2 -> 4 -> 3) 243
// 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
var addTwoNumbers = function(l1, l2) {

};






// M 3. 无重复字符的最长子串
// 维护一个数组作为滑动窗口，
// 如果数组中已经有了字符a，则删除a包括自己在内及之前的所有元素
var lengthOfLongestSubstring = function(s) {

}


// M 5. 最长回文子串
var longestPalindrome = function(s) {

}


// E 21. 合并两个有序链表
var mergeTwoLists = function(l1, l2) {

};


// E 53. 最大子序和
// 这道题用动态规划的思路并不难解决，比较难的是后文提出的用分治法求解，但由于其不是最优解法，所以先不列出来
// 动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans
// 如果 sum > 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字
// 如果 sum <= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字
// 每次比较 sum 和 ans的大小，将最大值置为ans，遍历结束返回结果
var maxSubArray = function(nums) {
    // 这里的遍历，其实是遍历出以某个节点为结束的所有子序列

};




// M 11. 盛最多水的容器
// 左右双指针，每次都 向内移动短板，直到相撞
var maxArea = function(height) {

};


// M 146. LRU缓存机制
// Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
// Map.prototype.keys() 返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
// 因此，需要拿到第一个key也就是最少使用的项时，需要使用 next().value 即 Map.keys().next().value
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
var LRUCache = function(capacity) {

};

LRUCache.prototype.get = function(key) {

};

LRUCache.prototype.put = function(key, value) {

};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


// E 121. 买卖股票的最佳时机
// 只需要找到最低价格，每次找出最大利润
var maxProfit = (prices) => {

}

// E 122. 买卖股票的最佳时机 II
var maxProfit = (prices) => {

}


// M 33. 搜索旋转排序数组
// 直接用nums.indexOf来做，复杂度是O(n)，而题目要求复杂度为O(nlogn)，则需要用二分法
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )
// 将数组一分为二，其中一定有一个是有序的，另一个可能是有序，也能是部分有序。此时有序部分用二分法查找。无序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环.
// 先找出mid，然后根据mid来判断，mid是在有序的部分还是无序的部分
    // 假如mid小于start，则mid一定在右边有序部分。
    // 假如mid大于等于start， 则mid一定在左边有序部分。
var search = function(nums, target) {

};


// M 240. 搜索二维矩阵 II
var searchMatrix = function(matrix, target) {

};


// M 56. 合并区间
var merge = function (intervals) {

};


// M 46. 全排列
var permute = function(nums) {

};

// - M 面试题38. 字符串的排列
var permutation = function(s) {

};

// E 20. 有效的括号
// 利用栈。
// 遇到左括号，一律推入栈中，
// 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。
var isValid = function(s) {

};

// E 7. 整数反转
// 取余数，最后判断正负号及是否越界
var reverse = function(x) {

};

// M 102. 二叉树的层序遍历
const levelOrder = (root) => {

}

// M 199. 二叉树的右视图
// 层序遍历改用对象保存各层的最后一项
var rightSideView = function(root) {

};

// M 103. 二叉树的锯齿形层次遍历
// 偶数时，push进队列；奇数时，unshift进队列
var zigzagLevelOrder = function(root) {

};


// M 70. 爬楼梯
var climbStairs = function(n) {

};


// M 22. 括号生成
// 递归，记录当前字符以及字符中左右括号的个数
var generateParenthesis = function (n) {

};

// M 93. 复原IP地址
// 递归分成四部分
const restoreIpAddresses = function(str) {

};
// 这道题不要用正则，因为不容易处理贪婪匹配与非贪婪匹配的问题
// let restoreIpAddresses = function(str) {
//     let res = str.replace(/^(\d{1,3}?)(\d{1,3}?)(\d{1,3}?)(\d{1,3}?)$/g, (match, $0, $1, $2, $3) => {
//         console.log($0, $1, $2, $3)
//     })

//     return res
// };

// restoreIpAddresses("25525511135")




// M 200. 岛屿数量
// 对于一个为 1 且未被访问过的位置，我们递归进入其上下左右位置上为 1 的数，将其 visited 变成 true（即设置为0）
// 重复上述过程，找完相邻区域后，我们将结果 res 自增1，然后我们在继续找下一个为 1 且未被访问过的位置，直至遍历完.
var numIslands = function (grid) {

};


// M 695. 岛屿的最大面积
var maxAreaOfIsland = function(grid) {

};


// E 9. 回文数
var isPalindrome = function(x) {

};


// M 19. 删除链表的倒数第N个节点
var removeNthFromEnd = function(head, n) {

};




// M 322. 零钱兑换 ————————————————————————————————————————————》好好理解下
// dp[n] 为组成n的最少硬币数
var coinChange = function(coins, amount) {

};


// E 160. 相交链表
// 与找到两条链表的第一个公共子节点一样
var getIntersectionNode = function(headA, headB) {

};


// E 88. 合并两个有序数组
// 这个题主要是要注意在nums1上做改动，不用返回任何值
var merge = function(nums1, m, nums2, n) {

};



// M 8. 字符串转换整数 (atoi)
var myAtoi = function(str) {

};
// myAtoi("   -42")
// myAtoi("4193 with words")
// myAtoi("words and 987")
// myAtoi("-91283472332")


// E 14. 最长公共前缀
var longestCommonPrefix = function(strs) {

};


// E 141. 环形链表
var hasCycle = function(head) {

};


// E 206. 反转链表
// 每一层干的事情：得到一个指针，判断是否是最后一个，如果是则把指向最后一个数的指针当做新头指针发回去；
// 如果不是，则把从上层得到的新头指针传递下去，并且把当前指针和后一个指针调换指向。
function reverseList(head) {

}
// 或者不用递归：
var reverseList = (head) => {

}


// M 92. 反转链表 II
var reverseBetween = function(head, m, n) { 

};


// M 143. 重排链表
// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
// 步骤一: 找到链表中点后分割其为 left 链表、right 链表两部分;
// 步骤二: 翻转 right 链表, 翻转链表思路同 206.Reverse_Linked_List;
// 步骤三: 接着从 left 链表的左侧, 翻转后的 right 链表的左侧各取一个值进行交替拼接;
var reorderList = function (head) {

}


const sortList = function(head) {

}


// E 198. 打家劫舍
// 设f(x)为打劫前x家房子所能得到的最大的资金
// f(n)=max(nums[n]+f(n-2),f(n-1))
var rob = function(nums) {

};


// E 111. 二叉树的最小深度
const minDepth = (root) => {

};


// E 104. 二叉树的最大深度
var maxDepth = (root) => {

}

// E 543. 二叉树的直径
// 二叉树的直径不一定过根节点，因此需要去搜一遍所有子树(例如以root，root.left, root.right...为根节点的树)对应的直径，取最大值。
// root的直径 = root左子树高度 + root右子树高度
// root的高度 = max {root左子树高度, root右子树高度} + 1
// 这里的maxDepth比起上面来说，只是需要用lNum与rNum来更新全局max
var diameterOfBinaryTree = function(root) {

};


// 判断树相同
const isSameTree = (left, right) => {

}

// E 101. 对称二叉树
var isSymmetric = (root) => {

}

// M 236. 二叉树的最近公共祖先
// 递归查找当前root中的左右子树是否有p节点或者q节点，有则返回p或q，没有返回null
var lowestCommonAncestor = function(root, p, q) {

};

// E 112. 路径总和
// 此题必须从根节点到叶子节点，判断是否存在和
var hasPathSum = function (root, sum) {

};

// E 437. 路径总和 III
// 此题不需要从根节点到叶子节点，但必须是向下遍历求和，返回路径数
var pathSum = function(root, sum) {

};

// M 24. 两两交换链表中的节点
// 使用四指针
var swapPairs = function(head) {

};


// H 41. 缺失的第一个正数
var firstMissingPositive = function(arr) {

};


// M 300. 最长上升子序列
// 由于一个子序列一定会以一个数结尾，于是将状态定义成：dp[i] 表示以 nums[i] 结尾的「上升子序列」的长度
var lengthOfLIS = function(nums) {

};


// M 98. 验证二叉搜索树
// 传递上下界
var isValidBST = (node) => {

}

// M 105. 从前序与中序遍历序列构造二叉树
// 注意一开始的边界判断
var buildTree = (preorder, inorder) => {

}


// M 221. 最大正方形  ————————————————————————————————————————————》好好理解下
// 若某格子值为 1，则以此为右下角的正方形的、最大边长为：上面的正方形、左面的正方形或左上的正方形中，最小的那个，再加上此格。
// 状态定义：dp[i][j] 以 matrix[i][j] 为右下角的正方形的最大边长
// dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
var maximalSquare = function(matrix) {

};


// E 26. 删除排序数组中的重复项
// 需要再原数组上操作
// 双指针法 i，j
// 当且仅当遇到下一个不相同即不重复的元素时，更新指针位置为下一个元素
var removeDuplicates = function(nums) {

};



// M 17. 电话号码的字母组合
function letterCombinations(str) {

}

// 求组合：从n个数组中各选一个元素，有多少种组合
const combine = (arr) => {

}
// combine([[1,3,4], [5,6,7]])
// ["15", "16", "17", "35", "36", "37", "45", "46", "47"]
// combine(['abc', 'def'])
// ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
// combine(['abc', 'def', 'ghig'])
// ["adg", "adh", "adi", "adg", "aeg", "aeh", "aei", "aeg", "afg", "afh", "afi", "afg", "bdg", "bdh", "bdi", "bdg", "beg", "beh", "bei", "beg", "bfg", "bfh", "bfi", "bfg", "cdg", "cdh", "cdi", "cdg", "ceg", "ceh", "cei", "ceg", "cfg", "cfh", "cfi", "cfg"]

// M 71. 简化路径
    // 遇到正常的字母时，推入 stack 中
    // 遇到 .. 时，stack 弹出最近一个路径
    // 遇到 . 或者为空时，不修改当前 stack。
    // 最后返回 '/' + stack.join('/') 为新的路径
var simplifyPath = function(path) {

};


// E 169. 多数元素
// 因为大于一半, 所以排序后的 中间那个数必是所求
var majorityElement = function(nums) {

};
// 如果不用排序，可以使用 ”投票算法“，当投票计数为0时，替换为当前数值
var majorityElement = function(nums) {

};


// M 6. Z 字形变换
var convert = function(s, numRows) {

};


// 455. 分发饼干
    // - 使用双指针
var findContentChildren = function (g, s) {

};


// M 442. 数组中重复的数据
    // 这种题，其实看见不用空间、o(n)时间，通常潜台词就是，用原地哈希来做。
    // [4,3,2,7,8,2,3,1]
    // 当i = 1时，此时n=3，把nums[3-1] *= -1 变成负数，结果 [4,3,-2,7,8,2,3,1]
    // 当i = 6时，此时n=3，发现nums[3-1]这个位置已经为负数说明之前已经被改过，也就是n=3这个数字出现过，就把3数字添加到arr里
    // 这里i=1改的是nums[2], i=6改的也是nums[2]，这里nums[2]只是用来记录状态
var findDuplicates = function (nums) {

};



// - E 696. 计数二进制子串
const countBinarySubstrings = (s) => {

}


// E 557. 反转字符串中的单词 III
function revertByWord(str) {

}


// E 459. 重复的子字符串
var repeatedSubstringPattern = function(s) {

};


// E 414. 第三大的数
var thirdMax = function(nums) {

}


// M 1143. 最长公共子序列
var longestCommonSubsequence = function(str1, str2) {

}

// E 62. 不同路径
var uniquePaths = function(m, n) {

};



// M 63. 不同路径 II
var uniquePathsWithObstacles = function(arr) {

};


// 面试题 08.06. 汉诺塔问题
let hanota = function(A, B, C) {

};


// M 958. 二叉树的完全性检验
var isCompleteTree = function(root) {

};


// E 110. 平衡二叉树
const isBalanced = function(root) {

};

// E 统计节点个数
const sizeOfTree = (root) => {

}


// - 二叉树的镜像
var invertTree = function(root) {

};



// - 二叉树的层序遍历
const levelOrder = function(root) {

}

// - 二叉树的中序遍历
const inorderTraversal = (root) => {

};



// - 二叉树的前序遍历
const preorderTraversal = (root) => {

};



// - 二叉树的后序遍历
const postorderTraversal = (root) => {

}



// - 重建二叉树
function reConstruct(preorder, inorder) {

}



// - 求二叉树的后序遍历
var getHRD = () => {

}



// - 生成二叉搜索树
const generateBST = (data) => { // ————————————————————————————————————————————》好好理解下

}



// - 二叉搜索树的第k个节点
// 利用BST的中序遍历是升序 // ————————————————————————————————————————————》好好理解下
const kthSmallest = (root, k) => {

}



// - 二叉搜索树的后序遍历
const verifyPostorder = (postorder) => {

}


// - 种花问题（筛选运算-贪心）
const canPlaceFlowers = (flowerbed = [], num) => {

}



// - 链表倒数第k个节点
// 快慢指针
function findKthFromTail(head, k) {

}




// - 链表中环的入口结点
    // 环形链表的入口节点
    // 方法：分两步
    // 阶段一 快慢指针判断是否成环，相遇必定成环，快指针走到链尾指向null则无环；
    // 阶段二 如果成环，记录第一次相遇的节点firstMeet，使用两个慢指针(即步频为1的)一个从head，一个从firstMeet出发，相遇时从head出发的指针则为入环点
function detectCycle(head) {

}



// - 从尾到头打印链表
function printFromTailToHead(node) {

}




// - 设计循环队列
class MyCircularQueue {

}

