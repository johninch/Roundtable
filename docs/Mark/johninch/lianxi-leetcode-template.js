// - 哈希表
//     - `E 1. 两数之和`
// - 相加
//     - `M 2. 两数相加`
//     - `M 445. 两数相加 II`
//     - `E 415. 字符串相加（处理加法精度）`
// - 相乘
//     - `M 43. 字符串相乘（大数相乘）`
// - 回溯与递归
//     - `M 46. 全排列`
//     - `M 22. 括号生成`
//     - `M 93. 复原IP地址`
//     - `E 汉诺塔问题`
// - 组合运算
//     - `求组合：从n个数组中各选一个元素，有多少种组合`
//     - `M 17. 电话号码的字母组合`
// - 滑动窗口
//     - `M 3. 无重复字符的最长子串`
// - 双指针
//     - `E 455. 分发饼干`
//     - `E 9. 回文数`
//     - `M 15. 三数之和`
//     - `M 11. 盛最多水的容器`
//     - `H 42. 接雨水`
// - 二分查找
//     - `M 33. 搜索旋转排序数组`
//     - `M 240. 搜索二维矩阵 II`
// - 贪心
//     - `E 121. 买卖股票的最佳时机（一笔交易）`
//     - `E 122. 买卖股票的最佳时机 II（多笔交易）`
// - 动态规划
//     - `M 120. 三角形最小路径和`
//     - `M 221. 最大正方形`
//     - `E 62. 不同路径`
//     - `M 63. 不同路径 II`
//     - `M 70. 爬楼梯`
//     - 🌰`M 5. 最长回文子串`
//     - `M 1143. 最长公共子序列`
//     - `E 198. 打家劫舍`
//     - 🌰`M 322. 零钱兑换（dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)）`
//     - `M 300. 最长上升子序列（dp[i] = Math.max(dp[i], dp[j] + 1)）`
// - 深度优先遍历
//     - `M 200. 岛屿数量`
//     - `M 695. 岛屿的最大面积`
// - 二叉树
//     - `M 102. 二叉树的层序遍历`
//     - `M 199. 二叉树的右视图`
//     - `M 103. 二叉树的锯齿形层次遍历`
//     - `M 958. 二叉树的完全性检验（index !== ++count）`
//     - `二叉树的前序遍历`
//     - `二叉树的中序遍历`
//     - `二叉搜索树的第k个节点（BST的中序遍历是升序）`
//     - `二叉树的后序遍历`
//     - `M 105. 从前序与中序遍历序列构造二叉树`
//     - `求二叉树的后序遍历`
//     - `E 统计节点个数`
//     - `E 111. 二叉树的最小深度（左或右子树为空的话是构不成子树的）`
//     - `E 104. 二叉树的最大深度`
//     - `E 543. 二叉树的直径（利用最大深度）`
//     - `E 110. 平衡二叉树`
//     - `M 236. 二叉树的最近公共祖先`
//     - `E 112. 路径总和`
//     - `判断树相同`
//     - `E 101. 对称二叉树`
//     - `求二叉树的镜像`
// - 链表
//     - `E 160. 相交链表`
//     - `E 141. 环形链表`
//     - `链表中环的入口结点`
//     - `M 19. 删除链表的倒数第N个节点`
//     - `E 21. 合并两个有序链表`
//     - `E 206. 反转链表`
//     - `M 92. 反转链表 II（---tmpHead tmpHead.next---prev cur---）`
//     - `M 143. 重排链表`
//     - `M 24. 两两交换链表中的节点（四指针）`
// - 字符串
//     - `E 14. 最长公共前缀`
//     - `E 696. 计数二进制子串`
//     - `E 557. 反转字符串中的单词 III`
// - 数组
//     - `E 53. 最大子序和`
//     - `E 674. 最长连续递增序列`
//     - `E 26. 删除排序数组中的重复项（返回移除后数组的新长度）`
//     - `M 442. 数组中重复的数据（不用空间，原地哈希）`
//     - `H 41. 缺失的第一个正数`
//     - `E 605. 种花问题`
//     - `M 56. 合并区间`
//     - `M 670. 最大交换`
//     - `E 扑克牌中的顺子`
//     - `E 169. 多数元素`
// - 栈
//     - `E 20. 有效的括号`
// - 正则
//     - `E 459. 重复的子字符串`
// - TopK问题
//     - `E 414. 第三大的数`
// - 设计
//     - `M 146. LRU缓存机制`





// **************************** 哈希表 ****************************
// - 哈希表
//     - `E 1. 两数之和`：用一个对象注册，类似哈希表


// E 1. 两数之和
var twoSum = function(nums, target) {
    let res = {}
    for (let i = 0; i < nums.length; i++) { // 每个人报出自己想要配对的人
        if (res[nums[i]] !== undefined) { // 如果有人被登记过
            return [res[nums[i]], i] // 注意返回的是下标
        } else {  // 否则
            res[target - nums[i]] = i // 主持人记住他的需求
        }
    }
}




// **************************** 相加 ****************************
// - 相加
//     - `M 2. 两数相加`
//     - `M 445. 两数相加 II`
//     - `E 415. 字符串相加（处理加法精度）`


// M 2. 两数相加
// 这个题，链表head是个位：(2 -> 4 -> 3) 342
var addTwoNumbers = function(l1, l2) {
    let head = new ListNode('head');
    let dummy = head; // 哑结点，用于移动操作，最后返回head.next即可
    let add = 0; // 是否进一
    let sum = 0; // 新链表当前未取余的值 = 链表1值 + 链表2值 + add;

    // 遍历，直到最长的都为空
    while (l1 || l2) {
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
    while (node) {
        stack1.push(node.val)
        node = node.next
    }

    node = l2
    while (node) {
        stack2.push(node.val)
        node = node.next
    }

    let a, b, add = 0
    while (stack1.length || stack2.length) {
        a = stack1.pop() || 0
        b = stack2.pop() || 0

        stack.push((a + b + add) % 10)
        add = (a + b + add) >= 10 ? 1 : 0
    }

    add && stack.push(1)

    let dummy = {}
    current = dummy
    while (stack.length) {
        current.next = new ListNode(stack.pop())
        current = current.next
    }

    return dummy.next
};


// - E 415. 字符串相加（处理加法精度）
var addStrings = function(num1, num2) {
    let l1 = num1.length
    let l2 = num2.length

    let str = '' // str是字符串，计算时是字符串拼接
    let add = 0 // add代表进位
    let tmp // 计算临时值
    while (l1 || l2) {
        tmp = (l1 ? +num1[--l1] : 0) + (l2 ? +num2[--l2] : 0) + add
        str = tmp % 10 + str // 拼接，当前计算值拼在前面，想想列竖式
        add = tmp > 9 ? 1 : 0
    }

    if (add) {
        str = 1 + str
    }

    return str
};

// 处理加法精度
var addStrings = function(num1, num2) {
    let xiaoshuLen = Math.max(num1.split('.')[1].length, num2.split('.')[1].length)
    let mult = Math.pow(10, xiaoshuLen)
    num1 = num1 * mult
    num2 = num2 * mult
    num1 = num1.toString()
    num2 = num2.toString()

    let l1 = num1.length
    let l2 = num2.length

    let str = '' // str是字符串，计算时是字符串拼接
    let add = 0 // add代表进位
    let tmp // 计算临时值
    while (l1 || l2) {
        tmp = (l1 ? +num1[--l1] : 0) + (l2 ? +num2[--l2] : 0) + add
        str = tmp % 10 + str // 拼接，当前计算值拼在前面，想想列竖式
        add = tmp > 9 ? 1 : 0
    }

    if (add) {
        str = 1 + str
    }

    return Number(str) / mult
};
addStrings('110.3', '2000.45')






// **************************** 相乘 ****************************
// - 相乘
//     - `M 43. 字符串相乘（大数相乘）`


// - M 43. 字符串相乘（大数相乘）
var multiply = function(num1, num2) {
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

    while (res[0] === 0) {
        res.shift()
    }

    return res.join('') || '0'
};

// **************************** 回溯与递归 ****************************
// - 回溯与递归
//     - `M 46. 全排列`
//     - `M 22. 括号生成`
//     - `M 93. 复原IP地址`
//     - `E 汉诺塔问题`



// M 46. 全排列
// 回溯：不停的试探。放一下，尝试一个结果，再撤销，走下一步。
// 回溯的公式：
// 终止条件
// 循环
//     tmpList设置值
//     backtrack递归，tmpList已经变了，透传参数即可
//     tmpList撤销上次设置
var permute = function(nums) {
    const res = [] // 保存所有排列的结果

    const backtrack = (res, tmpList, nums) => {
        if (tmpList.length === nums.length) {
            // 终止条件
            res.push([...tmpList])
        } else {
            for (let i = 0; i < nums.length; i++) {
                if (tmpList.includes(nums[i])) continue
                tmpList.push(nums[i])
                backtrack(res, tmpList, nums)
                tmpList.pop()
            }
        }
    }

    backtrack(res, [], nums) // 执行回溯

    return res
};
// 方法二
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
            for (let i = p; i <= q; i++) {
                swap(arr, p, i)
                perm(arr, p + 1, q)
                swap(arr, p, i)
            }
        }
    }

    perm(nums, 0, nums.length - 1)

    return res
};


// M 22. 括号生成
// 递归，记录当前字符以及字符中左右括号的个数
var generateParenthesis = function(n) {
    let res = [];
    // cur :当前字符
    // left：当前字符中左括号个数
    // right:当前字符中右括号个数
    const help = (cur, left, right) => {
        if (cur.length === 2 * n) {
            // 终止条件
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

        if (cur.length === 4 && cur.join('') === str) {
            // 终止条件
            result.push(cur.join('.'))
        } else {
            for (let i = 0, len = Math.min(3, sub.length), temp; i < len; i++) {
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



// E. 汉诺塔问题
let hanota = function(A, B, C) {
    let move = (A, B, C, n) => {
        if (n === 0) return
        move(A, C, B, n - 1)  // n-1从A到B
        C.push(A.pop())     // 第n从A到C
        move(B, A, C, n - 1)  // n-1从B到C

        return C
    }

    return move(A, B, C, A.length)
};


// **************************** 组合运算 ****************************
// - 组合运算
//     - `求组合：从n个数组中各选一个元素，有多少种组合`
//     - `M 17. 电话号码的字母组合`

// 求组合：从n个数组中各选一个元素，有多少种组合
const combine = (arr) => {
    if (arr.length < 2) return arr[0].split('')

    let tmp = []
    for (let i = 0; i < arr[0].length; i++) {
        for (let j = 0; j < arr[1].length; j++) {
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
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr[1].length; j++) {
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






// **************************** 滑动窗口 ****************************
// - 滑动窗口
//     - `M 3. 无重复字符的最长子串`

// M 3. 无重复字符的最长子串
// 维护一个数组作为滑动窗口，
// 如果数组中已经有了字符a，则删除a包括自己在内及之前的所有元素
var lengthOfLongestSubstring = function(s) {
    let window = [], max = 0
    for (let i = 0; i < s.length; i++) {
        const index = window.indexOf(s[i])
        if (index !== -1) {
            // 变异方法，删除找到的元素及之前的所有元素
            window.splice(0, index + 1)
        }
        window.push(s[i])
        max = Math.max(window.length, max)
    }

    return max
}






// **************************** 双指针 ****************************
// - 双指针
//     - `E 455. 分发饼干`
//     - `E 9. 回文数`
//     - `M 15. 三数之和`
//     - `M 11. 盛最多水的容器`
//     - `H 42. 接雨水`



// E 455. 分发饼干
var findContentChildren = function(g, s) {
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


// E 9. 回文数
var isPalindrome = function(x) {
    if (x < 0) return false
    let str = x.toString()
    let left = 0
    let right = str.length - 1

    while (left < right) {
        if (str[left] !== str[right]) {
            return false
        } else {
            left++
            right--
        }
    }

    return true
};

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
                    while (first < last && nums[first] === nums[++first]) { }
                } else { // 实力太强，把大神那边左移一位
                    while (first < last && nums[last] === nums[--last]) { }
                }
            } while (first < last)

            while (nums[i] === nums[++i]) { }
        }
    }

    return res
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


// H 42. 接雨水
// for(let i = 0; i < height.length; i++) {
//     area += (h[i] - height[i]) * 1; // h为下雨之后的水位
// }
// h[i] = Math.min(左边柱子最大值, 右边柱子最大值)
var trap = function(height) {
    let volumn = 0;
    const leftMax = [];
    const rightMax = [];

    for (let i = 0, max = 0; i < height.length; i++) { // 注意max赋初值0
        max = Math.max(height[i], max);
        leftMax[i] = max
    }

    for (let i = height.length - 1, max = 0; i >= 0; i--) { // 反向遍历，注意max赋初值0
        max = Math.max(height[i], max);
        rightMax[i] = max
    }

    for (let i = 0; i < height.length; i++) {
        volumn = volumn + Math.min(leftMax[i], rightMax[i]) - height[i]
    }

    return volumn;
};





// **************************** 二分查找 ****************************
// - 二分查找
//     - `M 33. 搜索旋转排序数组`
//     - `M 240. 搜索二维矩阵 II`

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
    while (start <= end) {
        let mid = start + end >> 1

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
    for (let row of matrix) {
        if (target < row[0]) return false

        let left = 0, right = row.length - 1, mid
        while (left <= right) {
            mid = (left + right) >> 1
            if (target === row[mid]) {
                return true
            }

            if (target < row[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
    }

    return false
};



// **************************** 贪心 ****************************
// - 贪心
//     - `E 121. 买卖股票的最佳时机（一笔交易）`
//     - `E 122. 买卖股票的最佳时机 II（多笔交易）`

// E 121. 买卖股票的最佳时机（一笔交易）
// 只需要找到最低价格，每次找出最大利润
var maxProfit = (prices) => {
    let profit = 0
    let minPrice = Number.MAX_SAFE_INTEGER // 初始化为最大安全数字

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        } else {
            profit = Math.max(profit, prices[i] - minPrice)
        }
    }

    return profit
}

// E 122. 买卖股票的最佳时机 II（多笔交易）
var maxProfit = (prices) => {
    let profit = 0, gap;
    for (var i = 1; i < prices.length; i++) {
        gap = prices[i] - prices[i - 1]
        if (gap > 0) {
            profit += gap;
        }
    }

    return profit
}


// **************************** 动态规划 ****************************
// - 动态规划
//     - `M 120. 三角形最小路径和`
//     - `M 221. 最大正方形`
//     - `E 62. 不同路径`
//     - `M 63. 不同路径 II`
//     - `M 70. 爬楼梯`
//     - 🌰`M 5. 最长回文子串`
//     - 🌰`M 1143. 最长公共子序列`
//     - `E 198. 打家劫舍`
//     - 🌰`M 322. 零钱兑换（dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)）`
//     - `M 300. 最长上升子序列（dp[i] = Math.max(dp[i], dp[j] + 1)）`


// `M 120. 三角形最小路径和`
var minimumTotal = function(triangle) {
    var dp = triangle
    for (var i = dp.length - 2; i >= 0; i--) {
        for (var j = 0; j < dp[i].length; j++) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
        }
    }
    return dp[0][0];
};


// M 221. 最大正方形
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
    for (let j = 0; j < cols + 1; j++) {
        dp[0][j] = 0
    }
    for (let i = 0; i < rows + 1; i++) {
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



// E 62. 不同路径
var uniquePaths = function(m, n) {
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0) {
                // 确定上边界
                dp[0][j] = 1
            } else if (j == 0) {
                // 确定左边界
                dp[i][0] = 1
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }

    return dp[m - 1][n - 1]
};



// M 63. 不同路径 II
var uniquePathsWithObstacles = function(arr) {
    let m = arr.length, n = arr[0].length

    // 初始化为不可达
    let dp = Array.from(new Array(m), () => new Array(n).fill(0))

    // 检查起始或者目标元素是不是1（被占用了），如果起始或者最后那个格就是1，说明怎么都怎么不到那，直接返回0
    if (arr[0][0] == 1 || arr[m - 1][n - 1] == 1) return 0

    // 确定初始边界
    dp[0][0] = 1

    // 由初始边界确定 左边界（第一列）
    for (let i = 1; i < m; i++) {
        if (arr[i][0] != 1) {
            dp[i][0] = dp[i - 1][0];
        }
    }

    // 由初始边界确定 上边界（第一行）
    for (let j = 1; j < n; j++) {
        if (arr[0][j] != 1) {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // 动态规划推导
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (arr[i][j] != 1) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }

    return dp[m - 1][n - 1]
};


// M 70. 爬楼梯
var climbStairs = function(n) {
    let dp = []
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
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


// M 5. 最长回文子串
var longestPalindrome = function(s) {
    let n = s.length
    let res = ''
    // dp[i,j]：字符串s从索引i到j的子串是否是回文串
    let dp = Array.from(new Array(n), () => new Array(n).fill(0))

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (s[i] == s[j]) {
                if (j - i < 2) {
                    // j - i < 2：意即子串是一个长度为0或1的回文串
                    dp[i][j] = 1
                } else {
                    dp[i][j] = dp[i + 1][j - 1]
                }
            }
            // 如果s[i,j]是回文串，且长度大于现有长度，则更新
            if (dp[i][j] && j - i + 1 > res.length) {
                res = s.substring(i, j + 1)
            }
        }
    }

    return res
};



// M 1143. 最长公共子序列
var longestCommonSubsequence = function(str1, str2) {
    let m = str1.length,
        n = str2.length

    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str[i - 1] === str[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) // i是str1长度，j是str2长度，
            }
        }
    }

    return dp[m][n]
}


// E 198. 打家劫舍
// 设f(x)为打劫前x家房子所能得到的最大的资金
// f(n)=max(nums[n]+f(n-2),f(n-1))
var rob = function(nums) {
    const dp = Array.from(nums.length + 1)
    dp[0] = 0
    dp[1] = nums[0]
    // dp[2] = Math.max(dp[1], dp[0] + nums[1])
    // dp[3] = Math.max(dp[2], dp[1] + nums[2])
    for (let i = 2; i <= nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
    }

    return dp[nums.length]
};


// M 322. 零钱兑换
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
// ----------------开始解题，拿实例来说话----------------------

// - 假设给出的不同面额的硬币是[1, 2, 5]，目标是 120，问最少需要的硬币个数？

// - 我们要分解子问题，分层级找最优子结构，看到这又要晕了哈，憋急~~ 下面马上举例。

// - 这里我们使用「自顶向下」思想来考虑这个题目，然后用「自底向上」的方法来解题，
//   体验算法的冰火两重天。

// - dp[i]: 表示总金额为 i 的时候最优解法的硬币数

// - 我们想一下：求总金额 120 有几种方法？下面这个思路关键了 !!!
//   一共有 3 种方式，因为我们有 3 种不同面值的硬币。
//   1.拿一枚面值为 1 的硬币 + 总金额为 119 的最优解法的硬币数量
//     这里我们只需要假设总金额为 119 的最优解法的硬币数有人已经帮我们算好了，
//     不需要纠结于此。(虽然一会也是我们自己算，哈哈)
//     即：dp[119] + 1
//   2.拿一枚面值为 2 的硬币 + 总金额为 118 的最优解法的硬币数
//     这里我们只需要假设总金额为 118 的最优解法的硬币数有人已经帮我们算好了
//     即：dp[118] + 1
//   3.拿一枚面值为 5 的硬币 + 总金额为 115 的最优解法的硬币数
//     这里我们只需要假设总金额为 115 的最优解法的硬币数有人已经帮我们算好了
//     即：dp[115] + 1

//   - 所以，总金额为 120 的最优解法就是上面这三种解法中最优的一种，也就是硬币数最少
//     的一种，我们下面试着用代码来表示一下：

//   - dp[120] = Math.min(dp[119] + 1, dp[118] + 1, dp[115] + 1);

//   - 推导出「状态转移方程」：
//     dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)
//     其中 coin 有多少种可能，我们就需要比较多少次，那么我们到底需要比较多少次呢？
//     当然是 coins 数组中有几种不同面值的硬币，就是多少次了~ 遍历 coins 数组，
//     分别去对比即可

//   - 上面方程中的 dp[119]，dp[118]，dp[115] 我们继续用这种思想去分解，
//     这就是动态规划了，把这种思想，思考问题的方式理解了，这一类型的题目
//     问题都不会太大。

// 作者：ignore_express
// 链接：https://leetcode-cn.com/problems/coin-change/solution/js-xiang-jie-dong-tai-gui-hua-de-si-xiang-yi-bu-da/



// M 300. 最长上升子序列
// 由于一个子序列一定会以一个数结尾，于是将状态定义成：dp[i] 表示以 nums[i] 结尾的「上升子序列」的长度
var lengthOfLIS = function(nums) {
    if (!nums.length) return 0

    const len = nums.length
    const dp = new Array(len + 1).fill(1) // 初始化为1，因为子序列最少包含自己，即1

    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                // 加1为在nums[j]的最长递增子序列dp[j]基础上加上当前元素nums[i]所得的最长递增子序列
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }

    dp.sort((a, b) => b - a)

    return dp[0]
};






// **************************** 深度优先遍历 ****************************
// - 深度优先遍历
//     - `M 200. 岛屿数量`
//     - `M 695. 岛屿的最大面积`











// **************************** 二叉树 ****************************
// - 二叉树
//     - `M 102. 二叉树的层序遍历`
//     - `M 199. 二叉树的右视图`
//     - `M 103. 二叉树的锯齿形层次遍历`
//     - `M 958. 二叉树的完全性检验（index !== ++count）`
//     - `二叉树的前序遍历`
//     - `二叉树的中序遍历`
//     - `二叉搜索树的第k个节点（BST的中序遍历是升序）`
//     - `二叉树的后序遍历`
//     - `M 105. 从前序与中序遍历序列构造二叉树`
//     - `求二叉树的后序遍历`
//     - `E 统计节点个数`
//     - `E 111. 二叉树的最小深度（左或右子树为空的话是构不成子树的）`
//     - `E 104. 二叉树的最大深度`
//     - `E 543. 二叉树的直径（利用最大深度）`
//     - `E 110. 平衡二叉树`
//     - `M 236. 二叉树的最近公共祖先`
//     - `E 112. 路径总和`
//     - `判断树相同`
//     - `E 101. 对称二叉树`
//     - `求二叉树的镜像`












// **************************** 链表 ****************************
// - 链表
//     - `E 160. 相交链表`
//     - `E 141. 环形链表`
//     - `链表中环的入口结点`
//     - `M 19. 删除链表的倒数第N个节点`
//     - `E 21. 合并两个有序链表`
//     - `E 206. 反转链表`
//     - `M 92. 反转链表 II（---tmpHead tmpHead.next---prev cur---）`
//     - `M 143. 重排链表`
//     - `M 24. 两两交换链表中的节点（四指针）`








// **************************** 字符串 ****************************
// - 字符串
//     - `E 14. 最长公共前缀`
//     - `E 696. 计数二进制子串`
//     - `E 557. 反转字符串中的单词 III`











// **************************** 数组 ****************************
// - 数组
//     - `E 53. 最大子序和`
//     - `E 674. 最长连续递增序列`
//     - `E 26. 删除排序数组中的重复项（返回移除后数组的新长度）`
//     - `M 442. 数组中重复的数据（不用空间，原地哈希）`
//     - `H 41. 缺失的第一个正数`
//     - `E 605. 种花问题`
//     - `M 56. 合并区间`
//     - `M 670. 最大交换`
//     - `E 扑克牌中的顺子`
//     - `E 169. 多数元素`







// **************************** 栈 ****************************
// - 栈
//     - `E 20. 有效的括号`





// **************************** 正则 ****************************
// - 正则
//     - `E 459. 重复的子字符串`








// **************************** TopK问题 ****************************
// - TopK问题
//     - `E 414. 第三大的数`






// **************************** 设计 ****************************
// - 设计
//     - `M 146. LRU缓存机制`

















