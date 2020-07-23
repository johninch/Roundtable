## leetcode部分


### 目录
::: details
- :rocket:`E 674. 最长连续递增序列`
- `E 面试题61. 扑克牌中的顺子`
- :rocket:`H 42. 接雨水`
    - for(let i = 0; i < height.length; i++) {
        area += (h[i] - height[i]) * 1; // h为下雨之后的水位
    }
    - h[i] = Math.min(左边柱子最大值, 右边柱子最大值)
- `H 25. K 个一组翻转链表`*（没掌握）*
**- `E 1. 两数之和`**
    - 用一个对象注册，类似哈希表
**- :rocket:`M 15. 三数之和`**
    - 双指针法
- :rocket:`M 43. 字符串相乘（大数相乘）`
- `E 字符串相加（处理加法精度）`
**- :rocket:`M 2. 两数相加`**
    - 这个题，链表head是个位：(2 -> 4 -> 3) 342
- `M 445. 两数相加 II`
    - 链表尾部是个位：(2 -> 4 -> 3) 243
    - 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
- :rocket:`M 3. 无重复字符的最长子串`
    - 维护一个数组作为滑动窗口，
    - 如果数组中已经有了字符a，则删除a包括自己在内及之前的所有元素
**- `M 5. 最长回文子串`**
- :rocket:`E 21. 合并两个有序链表`
- `E 53. 最大子序和`
    - 这道题用动态规划的思路并不难解决，比较难的是后文提出的用分治法求解，但由于其不是最优解法，所以先不列出来
    - 动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans
    - 如果 sum > 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字
    - 如果 sum <= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字
    - 每次比较 sum 和 ans的大小，将最大值置为ans，遍历结束返回结果
**- `M 11. 盛最多水的容器`**
    - 左右双指针，每次都 向内移动短板，直到相撞
- :rocket:`M 146. LRU缓存机制`
    - Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
    - Map.prototype.keys() 返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
    - 因此，需要拿到第一个key也就是最少使用的项时，需要使用 next().value 即 Map.keys().next().value
- :rocket:`E 121. 买卖股票的最佳时机`
    - 只需要找到最低价格，每次找出最大利润
- `E 122. 买卖股票的最佳时机 II`
- :rocket:`M 33. 搜索旋转排序数组`
    - 直接用nums.indexOf来做，复杂度是O(n)，而题目要求复杂度为O(nlogn)，则需要用二分法
    - ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )
    - 将数组一分为二，其中一定有一个是有序的，另一个可能是有序，也能是部分有序。此时有序部分用二分法查找。无序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环.
    - 先找出mid，然后根据mid来判断，mid是在有序的部分还是无序的部分
        - 假如mid小于start，则mid一定在右边有序部分。
        - 假如mid大于等于start， 则mid一定在左边有序部分。
- `M 240. 搜索二维矩阵 II`
- :rocket:`M 56. 合并区间`
- `M 46. 全排列`
- :rocket:`M 面试题38. 字符串的排列`
**- `E 20. 有效的括号`**
    - 利用栈。
    - 遇到左括号，一律推入栈中，
    - 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。
**- `E 7. 整数反转`**
    - 取余数，最后判断正负号及是否越界
- `M 102. 二叉树的层序遍历`
- `M 199. 二叉树的右视图`
    - 层序遍历改用对象保存各层的最后一项
- :rocket:`M 103. 二叉树的锯齿形层次遍历`
    - 偶数时，push进队列；奇数时，unshift进队列
- `M 70. 爬楼梯`
**- `M 22. 括号生成`**
    - 递归，记录当前字符以及字符中左右括号的个数
- :rocket:`M 93. 复原IP地址`
    - 递归分成四部分
- `M 200. 岛屿数量`
    - 对于一个为 1 且未被访问过的位置，我们递归进入其上下左右位置上为 1 的数，将其 visited 变成 true（即设置为0）
    - 重复上述过程，找完相邻区域后，我们将结果 res 自增1，然后我们在继续找下一个为 1 且未被访问过的位置，直至遍历完.
- :rocket:`M 695. 岛屿的最大面积`
**- `E 9. 回文数`**
**- `M 19. 删除链表的倒数第N个节点`**
    - 注意使用哑结点解决head问题
- `M 322. 零钱兑换`
    - dp[n] 为组成n的最少硬币数
- `E 160. 相交链表`
    - 与找到两条链表的第一个公共子节点一样
- `E 88. 合并两个有序数组`
    - 这个题主要是要注意在nums1上做改动，不用返回任何值
- `M 8. 字符串转换整数 (atoi)`
- :rocket:`E 14. 最长公共前缀`
- `E 141. 环形链表`
- :rocket:`E 206. 反转链表`
    - 每一层干的事情：得到一个指针，判断是否是最后一个，如果是则把指向最后一个数的指针当做新头指针发回去；
    - 如果不是，则把从上层得到的新头指针传递下去，并且把当前指针和后一个指针调换指向。
- `M 92. 反转链表 II`
- `M 143. 重排链表`
    - 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
    - 步骤一: 找到链表中点后分割其为 left 链表、right 链表两部分;
    - 步骤二: 翻转 right 链表, 翻转链表思路同 206.Reverse_Linked_List;
    - 步骤三: 接着从 left 链表的左侧, 翻转后的 right 链表的左侧各取一个值`
- `排序链表`
- `E 198. 打家劫舍`
    - 设f(x)为打劫前x家房子所能得到的最大的资金
    - f(n)=max(nums[n]+f(n-2),f(n-1))
- `E 111. 二叉树的最小深度`
- `E 104. 二叉树的最大深度`
- `E 543. 二叉树的直径`
    - 二叉树的直径不一定过根节点，因此需要去搜一遍所有子树(例如以root，root.left, root.right...为根节点的树)对应的直径，取最大值。
    - root的直径 = root左子树高度 + root右子树高度
    - root的高度 = max {root左子树高度, root右子树高度} + 1
    - 这里的maxDepth比起上面来说，只是需要用lNum与rNum来更新全局max
- `判断树相同`
- `E 101. 对称二叉树`
- :rocket:`M 236. 二叉树的最近公共祖先`
    - 递归查找当前root中的左右子树是否有p节点或者q节点，有则返回p或q，没有返回null
- `E 112. 路径总和`
    - 此题必须从根节点到叶子节点，判断是否存在和
- `E 437. 路径总和 III`
    - 此题不需要从根节点到叶子节点，但必须是向下遍历求和，返回路径数
**- `M 24. 两两交换链表中的节点`**
    - 使用四指针
- H 41. 缺失的第一个正数
- `M 300. 最长上升子序列`
    - 由于一个子序列一定会以一个数结尾，于是将状态定义成：dp[i] 表示以 nums[i] 结尾的「上升子序列」的长度
- `M 98. 验证二叉搜索树`
    - 传递上下界
- `M 105. 从前序与中序遍历序列构造二叉树`
    - 注意一开始的边界判断
- `M 221. 最大正方形`
    - 若某格子值为 1，则以此为右下角的正方形的、最大边长为：上面的正方形、左面的正方形或左上的正方形中，最小的那个，再加上此格。
    - 状态定义：dp[i][j] 以 matrix[i][j] 为右下角的正方形的最大边长
    - dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
**- `E 26. 删除排序数组中的重复项`**
    - 需要再原数组上操作
    - 双指针法 i，j
    - 当且仅当遇到下一个不相同即不重复的元素时，更新指针位置为下一个元素
**- `M 17. 电话号码的字母组合`**
**- `求组合：从n个数组中各选一个元素，有多少种组合`**
- :rocket:`M 71. 简化路径`
    - 遇到正常的字母时，推入 stack 中
    - 遇到 .. 时，stack 弹出最近一个路径
    - 遇到 . 或者为空时，不修改当前 stack。
    - 最后返回 '/' + stack.join('/') 为新的路径
- `E 169. 多数元素`
    - 因为大于一半, 所以排序后的 中间那个数必是所求
**- `M 6. Z 字形变换`**
- `E 455. 分发饼干`
    - 使用双指针
- `M 442. 数组中重复的数据`
    - 这种题，其实看见不用空间、o(n)时间，通常潜台词就是，用原地哈希来做。
- `E 696. 计数二进制子串`
- :rocket:`E 557. 反转字符串中的单词 III`
- `E 459. 重复的子字符串`
- `E 414. 第三大的数`
- `M 1143. 最长公共子序列`
- `E 62. 不同路径`
- `M 63. 不同路径 II`
- `E 面试题 08.06. 汉诺塔问题`
- `M 958. 二叉树的完全性检验`
- `E 110. 平衡二叉树`
- `E 统计节点个数`
- `二叉树的镜像`
- `二叉树的层序遍历`
- `二叉树的中序遍历`
- `二叉树的前序遍历`
- `二叉树的后序遍历`
- `重建二叉树`
- `求二叉树的后序遍历`
- `生成二叉搜索树`
- `验证二叉搜索树`
- `二叉搜索树的第k个节点`
- `二叉搜索树的后序遍历`
- `电话号码的字母组合（组合运算）`
- `种花问题（筛选运算-贪心）`
- `链表倒数第k个节点`
- `链表中环的入口结点`
- `从尾到头打印`
- `创建链表`
- `设计循环队列`

:::


### details
::: details lc
```js
// - `E 674. 最长连续递增序列`
var findLengthOfLCIS = function(nums) {
    if (!nums.length) return 0;
    let res = 1, count = 1;

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < nums[i + 1]) {
            count++;
        } else {
            count = 1;
        }
        res = Math.max(res, count)
    }
    return res;
}


// - `E 面试题61. 扑克牌中的顺子`
var isStraight = function(nums) {
    if (nums.length <= 1) return true

    nums = nums.sort((a, b) => a - b) // 先排序
    let zeroCount = nums.filter(item => !item).length // 找到万能牌 0的个数

    for (let i = zeroCount; i < nums.length - 1; i++) {
        let gap = nums[i+1] - nums[i] // 找到相邻两数间的差值
        if (gap === 1) { // 差值为1继续循环
            continue
        } else if (gap === 0) { // 如果有除0外的重复数字则直接false
            return false
        } else {
            zeroCount = zeroCount - (gap-1) // 拿万能0去补
            if (zeroCount < 0) {
                return false
            }
        }
    }

    return true
};


// H 42. 接雨水
    // for(let i = 0; i < height.length; i++) {
    //     area += (h[i] - height[i]) * 1; // h为下雨之后的水位
    // }
    // h[i] = Math.min(左边柱子最大值, 右边柱子最大值)
var trap = function(height) {
    let volumn = 0;
    const leftMax = [];
    const rightMax = [];

    for(let i = 0, max = 0; i < height.length; i++) { // 注意max赋初值0
        max = Math.max(height[i], max);
        leftMax[i] = max
    }

    for(let i = height.length - 1, max = 0; i >= 0; i--) { // 反向遍历，注意max赋初值0
        max = Math.max(height[i], max);
        rightMax[i] = max
    }

    for(let i = 0; i < height.length; i++) {
        volumn = volumn +  Math.min(leftMax[i], rightMax[i]) - height[i]
    }

    return volumn;
};

// H 25. K 个一组翻转链表
var reverseKGroup = function(head, k) {
  // 标兵
  let dummy = new ListNode()
  dummy.next = head
  let [start, end] = [dummy, dummy.next]
  let count = 0
  while(end) {
    count++
    if (count % k === 0) {
      start = reverseList(start, end.next)
      end = start.next
    } else {
      end = end.next
    }
  }
  return dummy.next

  // 翻转start -> end的链表
  function reverseList(start, end) {
    // 用一个start 记录当前分组的起始节点位置的前一个节点
    // 用一个end 变量记录要翻转的最后一个节点位置
    let [pre, cur] = [start, start.next]
    const first = cur
    while(cur !== end) {
      let next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }
    start.next = pre
    first.next = cur
    return first
  }
};


// E 1. 两数之和
// 用一个对象注册，类似哈希表
var twoSum = function (nums, target) {
    let res = {}
    for (let i = 0; i < nums.length; i++) { // 每个人报出自己想要配对的人
        if (res[nums[i]] !== undefined) { // 如果有人被登记过
            // return [nums[i], res[nums[i]]] // 就是他
            return [i, nums.indexOf(res[nums[i]])] // 注意返回的是下标
        } else {  // 否则
            res[target - nums[i]] = nums[i] // 主持人记住他的需求
        }
    }
}

// M 15. 三数之和
// 双指针法
var threeSum = function(nums) {
    let res = []
    let length = nums.length
    nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
    if (nums[0] <= 0 && nums[length - 1] >= 0) { // 优化1: 整个数组同符号，则无解
        for (let i = 0; i < length - 2;) {
            if (nums[i] > 0) {
                // 优化2: 最左值为正数则一定无解
                break
            }
            let first = i + 1
            let last = length - 1
            do {
                if (first >= last || nums[i] * nums[last] > 0) {
                    // 两人选相遇，或者三人同符号，则退出
                    break
                }
                let result = nums[i] + nums[first] + nums[last]

                if (result === 0) { // 可以组队
                    res.push([nums[i], nums[first], nums[last]])
                }

                if (result <= 0) { // 实力太弱，把中间的菜鸟右移一位
                    while(first < last && nums[first] === nums[++first]) { }
                } else { // 实力太强，把大神那边左移一位
                    while(first < last && nums[last] === nums[--last]) { }
                }
            } while(first < last)

            while(nums[i] === nums[++i]) {}
        }
    }

    return res
};

// - M 43. 字符串相乘（大数相乘）
var multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') return '0'

    let len1 = num1.length,
        len2 = num2.length,
        res = new Array(len1 + len2).fill(0)

    // 结果最多为 m + n 位数
    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            // 从个位数开始，逐步相乘
            const mul = num1[i] * num2[j]
            // 乘积在结果数组中对应的位置
            const p1 = i + j, p2 = i + j + 1 // p2是当前位，p1是进位（因为最高位索引是0，低位索引更大啊）
            // 对结果进行累加
            const sum = mul + res[p2]
            res[p2] = sum % 10
            res[p1] = res[p1] + Math.floor(sum / 10)
        }
    }
    if (res[0] === 0) res.shift()
    return res.join("")
};



// - E 字符串相加（处理加法精度）
var addStrings = function(num1, num2) {
    let a = num1.length, 
        b = num2.length,
        result = '',
        tmp = 0

    while(a || b) {
        a ? tmp += +num1[--a] : ''
        b ? tmp += +num2[--b] : ''

        result = tmp % 10 + result
        if(tmp > 9) tmp = 1
        else tmp = 0
    }
    if (tmp) result = 1 + result

    return result
};

// 处理加法精度
var addStrings = function(num1, num2) {
    let xiaoshuLen = Math.max(num1.split('.')[1].length, num2.split('.')[1].length)
    let mult = Math.pow(10, xiaoshuLen)
    num1 = num1 * mult
    num2 = num2 * mult
    num1 = num1.toString()
    num2 = num2.toString()

    let a = num1.length, b = num2.length, result = '', tmp = 0
    while(a || b) {
        a ? tmp += +num1[--a] : ''
        b ? tmp += +num2[--b] : ''

        result = tmp % 10 + result
        tmp = tmp > 9 ? 1 : 0
    }
    if (tmp) result = 1 + result

    return result / mult
};
addStrings('110.3', '2000.45')

// M 2. 两数相加
// 这个题，链表head是个位：(2 -> 4 -> 3) 342
var addTwoNumbers = function(l1, l2) {
    let head = new ListNode('head');
    let dummy = head; // 哑结点，用于移动操作，最后返回head.next即可
    let add = 0; // 是否进一
    let sum = 0; // 新链表当前未取余的值 = 链表1值 + 链表2值 + add;

    // 遍历，直到最长的都为空
    while(l1 || l2){
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add;
        dummy.next = new ListNode(sum % 10); // 取余则为新链表的值
        dummy = dummy.next;
        add = sum >= 10 ? 1 : 0;
        l1 && (l1 = l1.next);
        l2 && (l2 = l2.next);
    }
    add && (dummy.next = new ListNode(add));
    return head.next;
};


// M 445. 两数相加 II
// 链表尾部是个位：(2 -> 4 -> 3) 243
// 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
var addTwoNumbers = function(l1, l2) {
    const stack1 = []
    const stack2 = []
    const stack = []

    let node = l1
    while(node) {
        stack1.push(node.val)
        node = node.next
    }

    node = l2
    while(node) {
        stack2.push(node.val)
        node = node.next
    }

    let a, b, add = 0
    while(stack1.length || stack2.length) {
        a = stack1.pop() || 0
        b = stack2.pop() || 0

        stack.push((a+b+add)%10)
        add = (a+b+add) >= 10 ? 1 : 0
    }

    add && stack.push(1)

    let dummy = {}
    current = dummy
    while(stack.length) {
        current.next = new ListNode(stack.pop())
        current = current.next
    }

    return dummy.next
};






// M 3. 无重复字符的最长子串
// 维护一个数组作为滑动窗口，
// 如果数组中已经有了字符a，则删除a包括自己在内及之前的所有元素
var lengthOfLongestSubstring = function(s) {
    let arr = [], max = 0
    for (let i = 0; i < s.length; i++) {
        const index = arr.indexOf(s[i])
        if (index !== -1) {
            // 变异方法，删除找到的元素及之前的所有元素
            arr.splice(0, index + 1)
        }
        arr.push(s[i])
        max = Math.max(arr.length, max)
    }

    return max
}


// M 5. 最长回文子串
var longestPalindrome = function(s) {
    let n = s.length
    let res = ''
    // dp[i,j]：字符串s从索引i到j的子串是否是回文串
    let dp = Array.from(new Array(n), () => new Array(n).fill(0))

    for(let i = n-1; i>=0; i--) {
        for(let j = i; j<n; j++) {
            // j - i < 2：意即子串是一个长度为0或1的回文串
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]); // 这里一定要把j-i<2写在前面，否则后面的dp取值会报错
            // 如果s[i,j]是回文串，且长度大于现有长度，则更新
            if (dp[i][j] && j - i + 1 > res.length) {
                res = s.substring(i, j+1)
            }
        }
    }

    return res
}


// E 21. 合并两个有序链表
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode('head')
    let dummy = head // 哑结点便于操作移动
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            dummy.next = l1
            l1 = l1.next
        } else {
            dummy.next = l2
            l2 = l2.next
        }
        dummy = dummy.next
    }


    if (l1) {
        dummy.next = l1
    }

    if (l2) {
        dummy.next = l2
    }

    return head.next
};


// E 53. 最大子序和
// 这道题用动态规划的思路并不难解决，比较难的是后文提出的用分治法求解，但由于其不是最优解法，所以先不列出来
// 动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans
// 如果 sum > 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字
// 如果 sum <= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字
// 每次比较 sum 和 ans的大小，将最大值置为ans，遍历结束返回结果
var maxSubArray = function(nums) {
    // 这里的遍历，其实是遍历出以某个节点为结束的所有子序列
    let ans = nums[0];
    let sum = 0;
    for(let num of nums) {
        // if(sum > 0) { 可以写成这样
        if(sum + num > num ){
            sum = sum + num;
        } else {
            sum = num;
        }
        ans = Math.max(ans, sum);
    };
    return ans;
};




// M 11. 盛最多水的容器
// 左右双指针，每次都 向内移动短板，直到相撞
var maxArea = function(height) {
    let i = 0
    let j = height.length - 1
    let area = 0

    while (i < j) {
        if (height[i] < height[j]) {
            area = Math.max(area, height[i] * (j - i))
            i++
        } else {
            area = Math.max(area, height[j] * (j - i))
            j--
        }
    }

    return area
};


// M 146. LRU缓存机制
// Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
// Map.prototype.keys() 返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
// 因此，需要拿到第一个key也就是最少使用的项时，需要使用 next().value 即 Map.keys().next().value
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
var LRUCache = function(capacity) {
    this.cap = capacity
    this.cache = new Map()
};

LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)

        return value
    } else {
        return -1
    }
};

LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key)
    } else {
        if (this.cap === this.cache.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
    }
    this.cache.set(key, value)
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
    let profit = 0
    let minPrice = Number.MAX_SAFE_INTEGER // 初始化为最大安全数字

    for(let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        } else {
            profit = Math.max(profit, prices[i] - minPrice)
        }
    }

    return profit
}

// E 122. 买卖股票的最佳时机 II（尽可能地完成更多的交易）
var maxProfit = (prices) => {
    let profit = 0, gap;
    for (var i = 1; i < prices.length; i++) {
        gap = prices[i] - prices[i-1]
        if (gap > 0) {
            profit += gap;
        }
    }

    return profit
}


// M 33. 搜索旋转排序数组
// 直接用nums.indexOf来做，复杂度是O(n)，而题目要求复杂度为O(nlogn)，则需要用二分法
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )
// 将数组一分为二，其中一定有一个是有序的，另一个可能是有序，也能是部分有序。此时有序部分用二分法查找。无序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环.
// 先找出mid，然后根据mid来判断，mid是在有序的部分还是无序的部分
    // 假如mid小于start，则mid一定在右边有序部分。
    // 假如mid大于等于start， 则mid一定在左边有序部分。
var search = function(nums, target) {
    let start = 0
    let end = nums.length - 1
    while(start <= end) {
        let mid = start + ((end - start) >> 1)

        if (nums[mid] === target) {
            return mid
        }

        // ️⚠️注意这里，mid小于start判断没有等号
        if (nums[start] > nums[mid]) {
            // mid属于右边有序部分，要判断target是否在[mid, end]
            if (target >= nums[mid] && target <= nums[end]) {
                start = mid + 1
            } else {
                end = mid - 1
            }
        } else {
            // mid属于左边有序部分，要判断target是否在[start, mid]
            if (target >= nums[start] && target <= nums[mid]) {
                end = mid - 1
            } else {
                start = mid + 1
            }
        }
    }

    return -1
};


// M 240. 搜索二维矩阵 II
var searchMatrix = function(matrix, target) {
    for(let item of matrix) {
        if (target < item[0]) return false

        let left = 0, right = item.length - 1, mid
        while(left <= right) {
            mid = (left + right) >> 1
            if (target === item[mid]) {
                return true
            }

            if (target < item[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
    }

    return false
};


// M 56. 合并区间
var merge = function (intervals) {
    let length = intervals.length
    if (!length) {
        return []
    }
    let res = []
    // 先按左边界排序
    intervals.sort((a, b) => a[0] - b[0])

    res.push(intervals[0])
    for (let i = 1; i < length; i++) {
        if (intervals[i][0] > res[res.length - 1][1]) {
            // 无交集
            res.push(intervals[i])
        } else {
            // 有交集
            if (intervals[i][1] > res[res.length - 1][1] ) {
                res[res.length - 1][1] = intervals[i][1]
            }
        }
    }

    return res
};


// M 46. 全排列
var permute = function(nums) {
    const res = []
    const swap = (arr, i, j) => {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

    // 求数组arr从p到q的子数组全排列
    const perm = (arr, p, q) => {
        if (p === q) {
            // 注意！！！ 这里不能直接将arr push进数组，因为将原数组传进去，arr之后会改变的，应该push值副本进去
            res.push([...arr])
        } else {
            for(let i = p; i <= q; i++) {
                swap(arr, p, i)
                perm(arr, p+1, q)
                swap(arr, p, i)
            }
        }
    }

    perm(nums, 0, nums.length-1)

    return res
};

// - M 面试题38. 字符串的排列
var permutation = function(s) {
    s = s.split('') // 转成数组
    let res = []
    const swap = (arr, i, j) => {
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    const perm = (arr, p, q) => {
        if (p === q) {
            res.push(arr.slice().join('')) // 副本，连成字符串
        } else {
            for(let i = p; i <= q; i++) {
                swap(arr, p, i)
                perm(arr, p+1, q)
                swap(arr, p, i)
            }
        }
    }

    perm(s, 0, s.length - 1)

    return [...new Set(res)] // 去重
};

// E 20. 有效的括号
// 利用栈。
// 遇到左括号，一律推入栈中，
// 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。
var isValid = function(s) {
    const stack = []
    const len = s.length
    if (len % 2) return false

    for(let i = 0; i < len; i++) {
        let letter = s[i]
        switch(letter) {
            case '(':
            case '{':
            case '[':
                stack.push(letter);
                break;
            case ')':
                if (stack.pop() !== '(') return false;
                break;
            case '}':
                if (stack.pop() !== '{') return false;
                break;
            case ']':
                if (stack.pop() !== '[') return false;
                break;
            default:
                return false;
        }
    }

    return !stack.length
};

// E 7. 整数反转
// 取余数，最后判断正负号及是否越界
var reverse = function(x) {
    let value = Math.abs(x)
    let now = 0
    while(value > 0) {
        now = now * 10 + value % 10
        value = Math.floor(value / 10)
    }
    if (x > 0) {
        return now > Math.pow(2, 31) ? 0 : now
    } else {
        return now > Math.pow(2, 31) ? 0 : -now
    }
};

// M 102. 二叉树的层序遍历
const levelOrder = (root) => {
    if (!root) return []

    const res = []
    const queue = [[root, 0]]
    while(queue.length) {
        let [cur, level] = queue.shift()

        res[level] ? res[level].push(cur.val) : res[level] = [cur.val]

        if (cur.left) queue.push([cur.left, level + 1])
        if (cur.right) queue.push([cur.right, level + 1])
    }

    return res
}

// M 199. 二叉树的右视图
// 层序遍历改用对象保存各层的最后一项
var rightSideView = function(root) {
    if (!root) return []

    const res = {} // 这里改成对象，保存各level的数组
    const queue = [[root, 0]]
    while(queue.length) {
        let [cur, level] = queue.shift()

        res[level] = cur.val

        if (cur.left) queue.push([cur.left, level + 1])
        if (cur.right) queue.push([cur.right, level + 1])
    }

    return Object.values(res)
};

// M 103. 二叉树的锯齿形层次遍历
// 偶数时，push进队列；奇数时，unshift进队列
var zigzagLevelOrder = function(root) {
    if (!root) return []

    let res = []
    const queue = [[root, 0]]

    while(queue.length) {
        let [cur, level] = queue.shift()

        if (level % 2 === 0) { // 偶数时，push进队列；奇数时，unshift进队列
            res[level] ? res[level].push(cur.val) : res[level] = [cur.val]
        } else {
            res[level] ? res[level].unshift(cur.val) : res[level] = [cur.val]
        }

        if (cur.left) queue.push([cur.left, level + 1])
        if (cur.right) queue.push([cur.right, level + 1])
    }

    return res
};


// M 70. 爬楼梯
var climbStairs = function(n) {
    let dp = []
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n]
};
// 假设要跳3级台阶，只要把最后跳一阶（即前面跳2阶楼梯的方法数） 加上 最后跳2阶（即前面跳1阶楼梯的方法数）
// dp[3] = dp[2] + dp[1]

// 如果每次能跳1阶、2阶、3阶，状态转移方程又是怎样的？
// dp[1] = 1  (1)
// dp[2] = 2  (11 2)
// dp[3] = 4  (3 111 12 21)
// dp[4] = 7  (13 \ 112 22 \ 31 1111 121 211)
// dp[4] = dp[1] + dp[2] + dp[3]
// dp[n] = dp[n-3] + dp[n-2] + dp[n-1]



// M 22. 括号生成
// 递归，记录当前字符以及字符中左右括号的个数
var generateParenthesis = function (n) {
    let res = [];
    // cur :当前字符
    // left：当前字符中左括号个数
    // right:当前字符中右括号个数
    const help = (cur, left, right) => {
        if (cur.length === 2 * n) { // 终止条件
            res.push(cur);
        } else {
            if (left < n) {
                // left小于n就能还能继续插入
                help(cur + "(", left + 1, right)
            }
            if (right < left) {
                // 因为先插入左括号，所以右括号个数小于左括号个数就能继续插入
                help(cur + ")", left, right + 1);
            }
        }
    };
    help("", 0, 0);
    return res;
};

// M 93. 复原IP地址
// 递归分成四部分
const restoreIpAddresses = function(str) {
    let result = []
    let helper = (cur, sub) => {
        if (sub.length > 12) {
            return
        }

        if (cur.length === 4 && cur.join('') === str) { // 终止条件
            result.push(cur.join('.'))
        } else {
            for(let i = 0, len = Math.min(3, sub.length), temp; i < len; i++) {
                temp = sub.slice(0, i + 1)

                if (temp < 256) {
                    helper(cur.concat([temp * 1]), sub.slice(i + 1)) // 转换下数据类型，如 01为1（LeetCode测试用例）
                }
            }
        }
    }

    helper([], str)

    return result
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
    // 当前坐标ij，及grid的行列数
    const helper = (grid, i, j, rows, cols) => {
        if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === "0")
            return;

        grid[i][j] = "0";

        helper(grid, i + 1, j, rows, cols);
        helper(grid, i, j + 1, rows, cols);
        helper(grid, i - 1, j, rows, cols);
        helper(grid, i, j - 1, rows, cols);
    }

    const rows = grid.length
    if (rows === 0) {
        return 0
    }
    const cols = grid[0].length
    let res = 0

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                // 如果是1就未被访问过，递归进入其上下左右位置上为 1 的数，并置为0
                helper(grid, i, j, rows, cols);
                res++;
            }
        }
    }
    return res;
};


// M 695. 岛屿的最大面积
var maxAreaOfIsland = function(grid) {
    // 当前坐标ij，及grid的行列数
    const helper = (grid, i, j, rows, cols) => {
        if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === 0)
            return 0;

        grid[i][j] = 0;

        // 注意这里要 1 加上 4部分
        return 1 + helper(grid, i + 1, j, rows, cols)
            + helper(grid, i, j + 1, rows, cols)
            + helper(grid, i - 1, j, rows, cols)
            + helper(grid, i, j - 1, rows, cols)
    }

    const rows = grid.length
    if (rows === 0) {
        return 0
    }
    const cols = grid[0].length
    let res = 0

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                // 如果是1就未被访问过，递归进入其上下左右位置上为 1 的数，并置为0
                let area = helper(grid, i, j, rows, cols);
                if (area > res) {
                    res = area
                }
            }
        }
    }
    return res
};



// E 9. 回文数
var isPalindrome = function(x) {
    if (x < 0) return false
    let str = x.toString()
    let left = 0
    let right = str.length - 1

    while(left < right) {
        if (str[left] !== str[right]) {
            return false
        } else {
            left++
            right--
        }
    }

    return true
};


// M 19. 删除链表的倒数第N个节点
var removeNthFromEnd = function(head, n) {
    let dummyHead = new ListNode(0); // 添加哑结点防止head被删掉
    dummyHead.next = head;
    let fast = dummyHead
    let slow = dummyHead
    // 快指针先走 n 步
    while(n--) {
        fast = fast.next
        if (!fast) {
            return null
        }
    }

    while(fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next

    return dummyHead.next
};




// M 322. 零钱兑换 ————————————————————————————————————————————》好好理解下
// dp[n] 为组成n的最少硬币数
var coinChange = function(coins, amount) {
    // 因为每次都要取最小的值，所以一开始用正无穷初始化
    const dp = new Array(amount + 1).fill(Infinity)
    // 组成0元钱只需要0个硬币
    dp[0] = 0
    for (let coin of coins) {
        for (let i = 1; i <= amount; i++) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
};


// E 160. 相交链表
// 与找到两条链表的第一个公共子节点一样
var getIntersectionNode = function(headA, headB) {
    const stack1 = []
    const stack2 = []

    let node = headA
    while(node) {
        stack1.push(node) // 注意比较的是节点，不是值，所以把node push进去
        node = node.next
    }

    node = headB
    while(node) {
        stack2.push(node)
        node = node.next
    }

    node = null
    let top1, top2
    while(stack1.length && stack2.length) {
        top1 = stack1.pop()
        top2 = stack2.pop()
        if (top1 === top2) {
            node = top1
        } else {
            break
        }
    }

    return node
};


// E 88. 合并两个有序数组
// 这个题主要是要注意在nums1上做改动，不用返回任何值
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m)
    nums2.splice(n, nums2.length - n)
    Object.assign(nums1, [...nums1,...nums2].sort((a,b) => a - b))
};



// M 8. 字符串转换整数 (atoi)
var myAtoi = function(str) {
    str = str.trim()
    let arr = str.match(/^([+-])?(\d+)/)

    const max = Math.pow(2, 31) - 1
    const min = -Math.pow(2, 31)

    let num = arr ? arr[0] : 0

    if (num < min) {
        return min
    } else if (num > max) {
        return max
    } else {
        return num
    }
};
// myAtoi("   -42")
// myAtoi("4193 with words")
// myAtoi("words and 987")
// myAtoi("-91283472332")


// E 14. 最长公共前缀
var longestCommonPrefix = function(strs) {
    if(!strs || strs.length === 0) return ''

    let ans = strs[0] // 将第一个字符串初始化为所求前缀

    for(let i = 1; i < strs.length; i++) {
        let j = 0 // 注意这里要把j提出for，因为之后还要使用
        for(len = Math.min(ans.length, strs[i].length); j < len; j++) {
            if (ans[j] !== strs[i][j]) {
                break
            }
        }

        ans = ans.substr(0, j)
        if (ans === '') {
            return ans
        }
    }

    return ans
};


// E 141. 环形链表
var hasCycle = function(head) {
    let fast = head
    let slow = head
    let firstMeet
    while(fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (fast === slow) {
            firstMeet = fast
            break
        }
    }

    return Boolean(firstMeet)
};


// E 206. 反转链表
// 每一层干的事情：得到一个指针，判断是否是最后一个，如果是则把指向最后一个数的指针当做新头指针发回去；
// 如果不是，则把从上层得到的新头指针传递下去，并且把当前指针和后一个指针调换指向。
function reverseList(head) {
    if (!head) {
        return null
    }

    if (head && !head.next) {
        return head
    }

    let acc = head.next
    let newHead = reverseList(acc)

    acc.next = head
    head.next = null

    return newHead
}
// 或者不用递归：
var reverseList = (head) => {
    let prev = null
    let cur = head

    while (cur) {
        let next = cur.next
        cur.next = prev

        prev = cur
        cur = next
    }

    return prev
}


// M 92. 反转链表 II
var reverseBetween = function(head, m, n) {
    let dummyHead = new ListNode(0)
    dummyHead.next = head
    let tmpHead = dummyHead

    let pos = 0;
    while(pos++ < m-1) {
        tmpHead = tmpHead.next
    }

    let prev = null
    let cur = tmpHead.next

    while(pos++ <= n) {
        let next = cur.next
        cur.next = prev

        prev = cur
        cur = next
    }

    // 将原链表与区间反转的链表拼接
    console.log(cur.val, prev.val, tmpHead.val)
    tmpHead.next.next = cur //  ————————————————————————————————————————————》好好理解下
    tmpHead.next = prev

    return dummyHead.next
};


// M 143. 重排链表
// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
// 步骤一: 找到链表中点后分割其为 left 链表、right 链表两部分;
// 步骤二: 翻转 right 链表, 翻转链表思路同 206.Reverse_Linked_List;
// 步骤三: 接着从 left 链表的左侧, 翻转后的 right 链表的左侧各取一个值进行交替拼接;
var reorderList = function (head) {
    const dummy = new ListNode(0)
    dummy.next = head // 头结点前增加哑结点

    let slow = dummy
    let fast = dummy

    // 用快慢指针，二分链表
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }

    let right = slow.next
    slow.next = null // 注意，这里很重要，只有这里断链，才能使left只保留链表前半部分
    let left = dummy.next


    const reverseList = (list) => {
        let prev = null
        let cur = list

        while (cur) {
            let next = cur.next
            cur.next = prev

            prev = cur
            cur = next
        }

        return prev
    }

    right = reverseList(right)

    while (left && right) { // ————————————————————————————————————————————》好好理解下
        let lNext = left.next
        let rNext = right.next

        right.next = left.next
        left.next = right

        left = lNext
        right = rNext
    }

    return dummy.next
}

// 排序链表
const sortList = function(head) {
	// 保持链表结构不改变，只交换值
	const swap = (p, q) => {
		const val = p.val
		p.val = q.val
		q.val = val
	}

	// 寻找基准元素的节点
	const partion = (begin, end = null) => { // ————————————————————————————————————————————》好好理解下
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

		return p // 返回得到的基准元素
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


// E 198. 打家劫舍
// 设f(x)为打劫前x家房子所能得到的最大的资金
// f(n)=max(nums[n]+f(n-2),f(n-1))
var rob = function(nums) {
    let len = nums.length
    if (len === 0) {
        return 0
    }

    const dp = new Array(len + 1)

    dp[0] = 0
    dp[1] = nums[0]
    for(let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i-1], dp[i - 1])
    }

    return dp[len]
};


// E 111. 二叉树的最小深度
const minDepth = (root) => {
    if (!root) {
        return 0;
    }
    if (!root.left) {
        return 1 + minDepth(root.right);
    }
    if (!root.right) {
        return 1 + minDepth(root.left);
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
};


// E 104. 二叉树的最大深度
var maxDepth = (root) => {
    if (!root) return 0

    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

// E 543. 二叉树的直径
// 二叉树的直径不一定过根节点，因此需要去搜一遍所有子树(例如以root，root.left, root.right...为根节点的树)对应的直径，取最大值。
// root的直径 = root左子树高度 + root右子树高度
// root的高度 = max {root左子树高度, root右子树高度} + 1
// 这里的maxDepth比起上面来说，只是需要用lNum与rNum来更新全局max
var diameterOfBinaryTree = function(root) {
    let max = 0
    const maxDepth = (root) => {
        if (!root) return 0

        const lNum = maxDepth(root.left)
        const rNum = maxDepth(root.right)

        max = Math.max(lNum + rNum, max)

        return 1 + Math.max(lNum, rNum)
    }

    maxDepth(root)

    return max
};


// 判断树相同
const isSameTree = (left, right) => {
    if (!left && !right) {
        return true
    }

    if (!left || !right) {
        return false
    }

    if (left.val !== right.val) {
        return false
    }

    return isSameTree(left.left, right.left) && isSameTree(left.right, right.right)
}

// E 101. 对称二叉树
var isSymmetric = (root) => {
    if (!root) {
        return true;
    }
    let walk = (left, right) => {
        if (!left && !right) { // 先判断 都不存在的情况
            return true;
        }

        if (!left || !right) {
            return false;
        }

        if (left.val !== right.val) {
            return false;
        }

        return walk(left.left, right.right) && walk(left.right, right.left);
    }

    return walk(root.left, root.right)
}

// M 236. 二叉树的最近公共祖先
// 递归查找当前root中的左右子树是否有p节点或者q节点，有则返回p或q，没有返回null
var lowestCommonAncestor = function(root, p, q) {
    // 递归终止条件，查找的临界条件
    if(root === null || root === p || root === q) { //  ————————————————————————————————————————————》好好理解下
        return root
    }
    // 没到临界条件时，递归查找左右子树
    // 从左右子树分别递归查找，看是否找到
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)

    if(left && right){
        // 左右子树都找到了，说明就是当前root，返回root
        return root
    } else {
        // 否则返回找到的子树结果
        return left || right
    }
};

// E 112. 路径总和
// 此题必须从根节点到叶子节点，判断是否存在和
var hasPathSum = function (root, sum) {
    if (!root) return false

    // 递归终止条件
    if (!root.left && !root.right && root.val === sum) {
        return true
    }

    // 没到终止条件时，递归查找左右子树
    let left = hasPathSum(root.left, sum - root.val)
    let right = hasPathSum(root.right, sum - root.val)

    // 返回能够把sum最终减完的子树结果
    return left || right
};

// E 437. 路径总和 III
// 此题不需要从根节点到叶子节点，但必须是向下遍历求和，返回路径数
var pathSum = function(root, sum) {
    const pathSumRoot = (root, cur) => {
        if(!root) return 0;
        let ret = 0
        if(root.val === cur){
            // 如果求和成功，则返回结果加1且继续递归左右子树
            ret = 1 + pathSumRoot(root.left, cur - root.val) + pathSumRoot(root.right, cur - root.val)
        }else{
            // 没求和成功，也继续递归左右子树
            ret = pathSumRoot(root.left, cur - root.val) + pathSumRoot(root.right, cur - root.val)
        }
        return ret
    }

    let num = 0

    if (root) {
        // 遍历每个节点
        num = pathSumRoot(root, sum)
        if (root.left) {
            num = num + pathSum(root.left, sum)
        }
        if (root.right) {
            num = num + pathSum(root.right, sum)
        }
    }

    return num
};

// M 24. 两两交换链表中的节点
// 使用四指针
var swapPairs = function(head) {
    const dummy = new ListNode(0)
    dummy.next = head
    let prev = dummy
    let first = prev.next

    while(first && first.next) {
        let second = first.next
        let next = second.next

        second.next = first
        first.next = next
        prev.next = second

        prev = first
        first = prev.next
    }

    return dummy.next
};


// H 41. 缺失的第一个正数
var firstMissingPositive = function(arr) {
    let newArr = []
    for(let i = 0, len = arr.length; i < len; i++) {
        let value = arr[i]
        if (value > 0 && value <= len) {
            newArr[value - 1] = value
        }
    }

    for(let i = 0, len = newArr.length; i < len; i++) {
        if (newArr[i] !== i + 1) {
            return i + 1
        }
    }

    return newArr.length + 1
};


// M 300. 最长上升子序列
// 由于一个子序列一定会以一个数结尾，于是将状态定义成：dp[i] 表示以 nums[i] 结尾的「上升子序列」的长度
var lengthOfLIS = function(nums) {
    let len = nums.length
    if (len === 0) return 0
    if (len === 1) return 1
    const dp = new Array(len + 1).fill(1)

    for(let i = 1; i < len; i++) {
        for(let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1) // ————————————————————————————————————————————》好好理解下
            }
        }
    }

    dp.sort((a, b) => b - a)

    return dp[0]
};


// M 98. 验证二叉搜索树
// 传递上下界
var isValidBST = (node) => {
    const walk = (node, lower, upper) => {
        if (!node) return true

        let value = node.val

        if (lower !== null && value <= lower) return false // 注意这里有0的情况，所以需要与null判断
        if (upper !== null && value >= upper) return false

        if (!walk(node.left, lower, value)) return false
        if (!walk(node.right, value, upper)) return false

        return true
    }

    return walk(node, null, null)
}

// M 105. 从前序与中序遍历序列构造二叉树
// 注意一开始的边界判断
var buildTree = (preorder, inorder) => {
    if(preorder.length === 0){
        return null;
    }
    if(preorder.length === 1){
        return new TreeNode(preorder[0]);
    }
    const value = preorder[0];
    const root = new TreeNode(value);
    const index = inorder.indexOf(value);

    const inLeft = inorder.slice(0,index);
    const inRight = inorder.slice(index+1);
    const preLeft = preorder.slice(1,index+1);
    const preRight = preorder.slice(index+1);

    root.left = buildTree(preLeft, inLeft);
    root.right = buildTree(preRight, inRight);

    return root;
}


// M 221. 最大正方形  ————————————————————————————————————————————》好好理解下
// 若某格子值为 1，则以此为右下角的正方形的、最大边长为：上面的正方形、左面的正方形或左上的正方形中，最小的那个，再加上此格。
// 状态定义：dp[i][j] 以 matrix[i][j] 为右下角的正方形的最大边长
// dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
var maximalSquare = function(matrix) {
    if (matrix.length === 0) return 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    let max = Number.MIN_VALUE;

    const dp = Array.from(new Array(rows + 1), () => new Array(cols + 1))

    // 为了代码简便，在matrix的最左和最上补0
    for(let j = 0; j < cols + 1; j++) {
        dp[0][j] = 0
    }
    for(let i = 0; i < rows + 1; i++) {
        dp[i][0] = 0
    }

    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < cols + 1; j++) {
            if (matrix[i - 1][j - 1] === "1") {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
                max = Math.max(max, dp[i][j]);
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // max是边长，求面积
    return max * max;
};


// E 26. 删除排序数组中的重复项
// 需要再原数组上操作
// 双指针法 i，j
// 当且仅当遇到下一个不相同即不重复的元素时，更新指针位置为下一个元素
var removeDuplicates = function(nums) {
    const n = nums.length
    let j = 0

    for(let i = 1; i < n; i++) {
        if (nums[i] !== nums[i-1]) {
            j++
            nums[j] = nums[i]
        }
    }

    return j + 1 // 求长度，索引加1
};



// M 17. 电话号码的字母组合
function letterCombinations(str) {
    if (!str) return []
    let nums = str.split('')
    let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    // 数字所对字母映射数组
    let codes = nums.map(i => map[i])

    const combine = (arr) => {
        if (arr.length < 2) return arr[0].split('')

        let tmp = []
        for(let i = 0; i < arr[0].length; i++) {
            for(let j = 0; j < arr[1].length; j++) {
                tmp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        // 合并后使用 tmp 替换已经合并完成的元素
        arr.splice(0, 2, tmp)

        if (arr.length > 1) {
            return combine(arr)
        } else {
            return arr[0]
        }
    }

    return combine(codes)
}

// 求组合：从n个数组中各选一个元素，有多少种组合
const combine = (arr) => {
    if (arr.length < 2) return arr[0].split('')

    let tmp = []
    for(let i = 0; i < arr[0].length; i++) {
        for(let j = 0; j < arr[1].length; j++) {
            tmp.push(`${arr[0][i]}${arr[1][j]}`)
        }
    }

    arr.splice(0, 2, tmp)

    if (arr.length > 1) {
        return combine(arr)
    } else {
        return arr[0]
    }
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
    const arr = path.split('/')
    const stack = []

    for(let item of arr) {
        if (item === '' || item === '.') {
            continue
        } else if (item === '..') {
            stack.pop()
        } else {
            stack.push(item)
        }
    }

    return '/' + stack.join('/')
};


// E 169. 多数元素
// 因为大于一半, 所以排序后的 中间那个数必是所求
var majorityElement = function(nums) {
    nums.sort((a, b) => a - b)
    return nums[Math.floor(nums.length / 2)]
};
// 如果不用排序，可以使用 ”投票算法“，当投票计数为0时，替换为当前数值
var majorityElement = function(nums) {
    let count = 1
    let more = nums[0]
    for(let i = 1; i < nums.length; i++) {
        if (count === 0) {
            more = nums[i]
        }

        if (nums[i] === more) {
            count++
        } else {
            count--
        }
    }

    return more
};


// M 6. Z 字形变换
var convert = function(s, numRows) {
    if (numRows === 1) return s // 如果只有1行，则直接返回字符串

    let len = Math.min(s.length, numRows)
    let rows = []
    // 初始化 len 行
    for(let i = 0; i < len; i++) {
        rows[i] = ''
    }

    let index = 0    // 行索引
    let down = false // 移动方向

    for(let c of s) {
        rows[index] += c

        if (index === 0 || index === numRows - 1) {
            down = !down
        }
        index += down ? 1 : -1
    }

    // 最后遍历把多行拼接起来
    let res = ''
    for(let r of rows) {
        res += r
    }

    return res
};


// 455. 分发饼干
    // - 使用双指针
var findContentChildren = function (g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    var gLen = g.length;
    var sLen = s.length;
    var i = 0;
    var j = 0;
    var maxNum = 0;
    while (i < gLen && j < sLen) {
        if (s[j] >= g[i]) {
            i++;
            j++;
            maxNum++;
        } else {
            j++;
        }
    }
    return maxNum;
};


// M 442. 数组中重复的数据
    // 这种题，其实看见不用空间、o(n)时间，通常潜台词就是，用原地哈希来做。
    // [4,3,2,7,8,2,3,1]，均为正整数
    // 当i = 1时，此时n=3，把nums[3-1] *= -1 变成负数，结果 [4,3,-2,7,8,2,3,1]
    // 当i = 6时，此时n=3，发现nums[3-1]这个位置已经为负数说明之前已经被改过，也就是n=3这个数字出现过，就把3数字添加到arr里
    // 这里i=1改的是nums[2], i=6改的也是nums[2]，这里nums[2]只是用来记录状态
var findDuplicates = function (nums) {
    let arr = []
    for (let i = 0; i < nums.length; i++) {
        let n = Math.abs(nums[i]) // 在原数组nums上改变符号，所以要取绝对值
        if (nums[n - 1] < 0) {
            arr.push(n)
        } else {
            // 出现一次，就把坐标对应的数字改成负数，这里索引对应的数字符号只是记录状态
            nums[n - 1] *= -1
        }
    }
    return arr;
};



// - E 696. 计数二进制子串
const countBinarySubstrings = (s) => {
    let result = []
    let helper = (str) => { // ————————————————————————————————————————————》好好理解下
        let left = str.match(/^(0+|1+)/)[0]
        let right = (str[0]^1).toString().repeat((left.length))

        let reg = new RegExp(`^(${left}${right})`)
        if (reg.test(str)) {
            return RegExp.$1
        } else {
            return ''
        }
    }

    for(let i = 0; i < s.length - 1; i++) {
        let sub = helper(s.slice(i))
        if (sub) {
            result.push(sub)
        }
    }

    return result.length
}


// E 557. 反转字符串中的单词 III
function revertByWord(str) {
    // 对字符串方法可以使用正则匹配空格
    let arr = str.split(/\s/g);
    // 注意item需要先转成数组再使用reverse方法
    let res = arr.map(item =>
        item.split('').reverse().join('')
    )

    return res.join(' ');
}


// E 459. 重复的子字符串
var repeatedSubstringPattern = function(s) {
    if (s.length > 10000) return false;

    return /^(\w+)\1+$/.test(s)
};


// E 414. 第三大的数
var thirdMax = function(nums) {
    var sets = new Set(nums)
    // 注意这里要将 set类型转回 array
    nums = Array.from(sets).sort((a, b) => b - a)
    if (nums.length < 3) {
        return Math.max(...nums)
    }

    return nums[2]
}

// 不用set，空间O(1)复杂度
var thirdMax = function(nums) {
    if (nums.length < 3) return Math.max(...nums);
    let max1 = -Infinity; // 存储最大 置为最小值
    let max2 = -Infinity; // 存储第二大 置为最小值
    let max3 = -Infinity; // 存储第三大 置为最小值
    for (let n of nums) {
        if (n > max1) { // 先比较最大的，成功就把值向后传递，把第三大的丢掉
            max3 = max2;
            max2 = max1;
            max1 = n;
            continue;
        }
        if (n !== max1 && n > max2) { // 第一个判断没中，判断是不是第二大的，注意值不能等于最大，这是为了防止重复
            max3 = max2;
            max2 = n;
            continue;
        }
        if (n !== max1 && n !== max2 && n > max3) { // 同上，多了个判断条件
            max3 = n;
            continue;
        }
    }

    if (max3 === -Infinity || max2 === -Infinity || max1 === -Infinity) {
        return Math.max(max1, max2, max3); // 这里其实就是判断，在去重后的长度是不是小于3，不是的话三个max肯定都不是-Infinity
    }

    return max3; //直接返回正确答案
};


// M 1143. 最长公共子序列
var longestCommonSubsequence = function(str1, str2) {
    let m = str1.length,
        n = str2.length

    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str[i-1] === str[j-1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) // ————————————————————————————————————————————》好好理解下
            }
        }
    }

    return dp[m][n]
}

// E 62. 不同路径
var uniquePaths = function(m, n) {
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    for(let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0) {
                // 确定上边界
                dp[0][j] = 1
            } else if (j == 0) {
                // 确定左边界
                dp[i][0] = 1
            } else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }

    return dp[m-1][n-1]
};



// M 63. 不同路径 II
var uniquePathsWithObstacles = function(arr) {
    let m = arr.length, n = arr[0].length

    // 初始化为不可达
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    // 检查起始或者目标元素是不是1（被占用了），如果起始或者最后那个格就是1，说明怎么都怎么不到那，直接返回0
    if (arr[0][0] == 1 || arr[m-1][n-1] == 1) return 0

    // 确定初始边界
    dp[0][0] = 1

    // 由初始边界确定 左边界（第一列）
    for (let i = 1; i < m; i++) {
        if (arr[i][0] != 1) {
            dp[i][0] = dp[i-1][0];
        }
    }

    // 由初始边界确定 上边界（第一行）
    for (let j = 1; j < n; j++) {
        if (arr[0][j] != 1) {
            dp[0][j] = dp[0][j-1];
        }
    }

    // 动态规划推导
    for (let i = 1; i < m ; i++) {
        for (let j = 1; j < n; j++) {
            if (arr[i][j] != 1) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }

    return dp[m-1][n-1]
};


// 面试题 08.06. 汉诺塔问题
let hanota = function(A, B, C) {
    let move = (A, B, C, n) => {
        if (n === 0) return
        move(A, C, B, n-1)  // n-1从A到B
        C.push(A.pop())     // 第n从A到C
        move(B, A, C, n-1)  // n-1从B到C

        return C
    }

    return move(A, B, C, A.length)
};


// M 958. 二叉树的完全性检验
var isCompleteTree = function(root) {
    if (!root) {
        return true
    }

    const queue = [[root, 1]]
    let count = 0

    while (queue.length) {
        let [cur, index] = queue.shift()
        // 用来判断索引位置节点是否存在，如果index !== ++count代表左右子树层级相差超过1层，或者最后一层没有左节点却有右节点 // ————————————————————————————————————————————》好好理解下
        if (index !== ++count) {
            return false
        }
        // 层序遍历过程中，用index来维护节点索引，如果根节点index为1，那么一个节点索引是index,那他的左孩子索引是index * 2,右孩子索引是index * 2 +1
        cur.left && queue.push([cur.left, index * 2])
        cur.right && queue.push([cur.right, index * 2 + 1])
    }

    return true
};


// E 110. 平衡二叉树
const isBalanced = function(root) {
    const depth = (root) => {
        return !root ? 0 : Math.max(depth(root.left), depth(root.right)) + 1
    }

    if (!root) {
        return true
    }

    return (Math.abs(depth(root.left) - depth(root.right)) <= 1) && isBalanced(root.left) && isBalanced(root.right)
};

// E 统计节点个数
const sizeOfTree = (root) => {
    if (!root) {
        return 0
    }

    return 1 + sizeOfTree(root.left) + sizeOfTree(root.right)
}


// - 二叉树的镜像
var invertTree = function(root) {
    if (!root) {
        return null
	}

	[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]

	return root
};



// - 二叉树的层序遍历
const levelOrder = function(root) {
    if (!root) return []

    let res = []
        queue = [[root, 0]]
    while (queue.length) {
        let [cur, level] = queue.shift()
        res[level] ? res[level].push(cur.val) : res[level] = [cur.val]

        if (cur.left) queue.push([cur.left, level + 1])
        if (cur.right) queue.push([cur.right, level + 1])
    }

    return res
}

// - 二叉树的中序遍历
const inorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改

        current = current.right;
    }

    return res;
};



// - 二叉树的前序遍历
const preorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            res.push(current.val); // 前序入栈就输出，中序出栈再输出，后续是对前序的修改
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();

        current = current.right;
    }
    return res;
};



// - 二叉树的后序遍历
const postorderTraversal = (root) => {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            res.push(current.val);
            stack.push(current);
            current = current.right; // 相比前序遍历，修改，先遍历右子树
        }

        current = stack.pop();

        current = current.left; // 相比前序遍历，修改，后遍历左子树
    }
    return res.reverse(); // 因为是 根右左，所以需要翻转成 左右根
}



// - 重建二叉树
function reConstruct(preorder, inorder) {
    if(preorder.length === 0){
        return null;
    }
    if(preorder.length === 1){
        return new Node(preorder[0]);
    }
    const value = preorder[0];
    const root = new Node(value);
    const index = inorder.indexOf(value);

    // slice 包含从 start 到 end（不包括该元素）
    const inLeft = inorder.slice(0, index);
    const inRight = inorder.slice(index + 1); // 去掉根
    const preLeft = preorder.slice(1, index + 1); // 去掉根
    const preRight = preorder.slice(index + 1);

    root.left = reConstruct(preLeft, inLeft);
    root.right = reConstruct(preRight, inRight);

    return root;
}



// - 求二叉树的后序遍历
var getHRD = () => {
    let preorder, inorder;
    let rebulidPostTree = (preorder, inorder) => {
        if (!preorder.length) {
            return null;
        }

        if (preorder.length === 1) {
            return preorder[0];
        }

        const root = preorder[0];
        const index = inorder.findIndex(root);

        const inLeft = inorder.slice(0, index);
        const inRight = inorder.slice(index + 1);
        const preLeft = preorder.slice(1, index + 1);
        const preRight = preorder.slice(index + 1);

        return rebulidPostTree(preLeft, inLeft) + rebulidPostTree(preRight, inRight) + root;
    }

    while(preorder = readline()) {
        inorder = readline();
        console.log(rebulidPostTree(preorder, inorder))
    }
}



// - 生成二叉搜索树
const generateBST = (data) => { // ————————————————————————————————————————————》好好理解下
    let root = new Node(data.shift())

    let insert = (node, data) => {
        if (node.val > data) {
            if (!node.left) {
                node.left = new Node(data)
            } else {
                insert(node.left, data)
            }
        } else {
            if (!node.right) {
                node.right = new Node(data)
            } else {
                insert(node.right, data)
            }
        }
    }

    // 遍历所有的数据，逐渐插入到当前这颗搜索树中
    data.forEach(item => insert(root, item))

    return root
}



// - 二叉搜索树的第k个节点
// 利用BST的中序遍历是升序 // ————————————————————————————————————————————》好好理解下
const kthSmallest = (root, k) => {
    const res = []
    const stack = []
    let current = root

    while(current || stack.length > 0) {
        while(current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        res.push(current.val)

        current = current.right
    }

    return res[k - 1]
}



// - 二叉搜索树的后序遍历
const verifyPostorder = (postorder) => {
    const len = postorder.length
    if (len < 2) {
        return true
    }

    const root = postorder[len -1];
    const index = postorder.findIndex(item => item > root)

    const leftTree = postorder.slice(0, index)
    const rightTree = postorder.slice(index, len - 1)

    const res = rightTree.some(item => item < root)

    return res ? false : verifyPostorder(leftTree) && verifyPostorder(rightTree)
}


// - 种花问题（筛选运算-贪心）
const canPlaceFlowers = (flowerbed = [], num) => {
    // 为了方便处理边界问题，前后补0
    flowerbed.push(0)
    flowerbed.unshift(0)
    let result = 0
    for (let i = 1; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0 && flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
            flowerbed[i] = 1
            result++
        }
    }
    return result >= num
}



// - 链表倒数第k个节点
// 快慢指针
function findKthFromTail(head, k) {
  if (!head || k <= 0) {
    return null;
  }

  let fast = head,
      slow = head;

  // fast 从链表的头指针开始先向前走k步
  for (let i = 0; i < k; ++i) {
    fast = fast.next;
    if (!fast) {
      return null;
    }
  }

  // 两个指针间隔一直保持在k
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}




// - 链表中环的入口结点
    // 环形链表的入口节点
    // 方法：分两步
    // 阶段一 快慢指针判断是否成环，相遇必定成环，快指针走到链尾指向null则无环；
    // 阶段二 如果成环，记录第一次相遇的节点firstMeet，使用两个慢指针(即步频为1的)一个从head，一个从firstMeet出发，相遇时从head出发的指针则为入环点
function detectCycle(head) {
  // 阶段1：快慢指针，速度fast步频2，slow步频1，试图找出第一次相遇的点，判断是否成环
  let fast = head, slow = head, firstMeet = null
  while(slow && fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
      if(slow === fast) {
          // 相遇时，慢指针走的路程就是 相遇点firstMeet
          firstMeet = slow
          break
      }
  }

  if(!firstMeet) {
      // 没有相遇，不成环
      return null
  }

  // 阶段2：用 阶段1中找到的 相遇点firstMeet 来找到环的入口
  // 设定head到入环点为n，假设环路大于n，环内路被分为b与n。
  // 慢指针从入环处开始跑b步，距离入环处就剩下了n。
  // 此时，快指针则是从距离入环处n步远的位置开始跑了2b步，距离入环处也是剩下了n。
  // 慢指针在圈内b的位置，快指针在圈内n+2b（减去圈长n+b也是b的位置），位置相同
  // 所以他们相遇了，距离入环处都是n，这个点就是firstMeet
  // 所以最后，使用两个slow指针，一个从head出发，一个从firstMeet出发，都走n步，相遇，返回从head出发的slow即可
  // 另外，对于环路小于n的情况，则可将多个小环展开视为一个大环，情况是一样的
  while(firstMeet && head) {
      if(firstMeet === head) {
          return head
      }
      firstMeet = firstMeet.next
      head = head.next
  }
  return null
}



// - 从尾到头打印链表
function printFromTailToHead(node) {
  node.next && printFromTailToHead(node.next)
  node.value && console.log(node.value)
}




// - 设计循环队列
class MyCircularQueue {
    constructor(k) {
        // 用来保存数据长度为k的数据结构
        this.list = Array(k)
        // 队收尾指针
        this.front = 0
        this.rear = 0
        // 队列长度
        this.len = k
    }
    // 入队
    enQueue(num) {
        if (this.isFull()) {
            return false
        } else {
            this.list[this.rear] = num
            this.rear = [this.rear + 1] % this.len

            return true
        }
    }
    // 出队
    deQueue() {
        let num = this.list[this.front]

        this.list[this.front] = ''
        this.front = [this.front + 1] % this.len

        return num
    }
    isEmpty() {
        return this.front === this.rear && !this.list[this.front]
    }
    isFull() {
        return this.front === this.rear && !!this.list[this.front]
    }
    Front() {

        return isEmpty() ? -1 : this.list[this.front]
    }
    Rear() {
        let rear = this.rear - 1
        return isEmpty()
            ? -1
            : this.list[rear < 0 ? this.len - 1 : rear]
    }
}








```
:::



