# johninch 复习清单
::: details lc
```js

// E 1. 两数之和
// 用一个对象注册，类似哈希表
var twoSum = function (nums, target) {
    let res = {}
    for (let i = 0; i < nums.length; i++) { // 每个人报出自己想要配对的人
        if (res[nums[i]] !== undefined) { // 如果有人被登记过
            return [nums[i], res[nums[i]]] // 就是他
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

// M 2. 两数相加
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

// 添加了dummy节点，用于指向head节点，完美解决了头节点的操作问题。


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


// M 105. 从前序与中序遍历序列构造二叉树



```
:::

## 写程序

### new的时候加1


### 数组中map和reduce，如何用reduce实现map
<!-- x -->
```js
Array.prototype._map = function(fn, callbackThis) {

}

```


### 统计字符串中出现最多的字母和次数
```js
function findMaxChar(str) {

}

```


### 实现队列函数（先进先出），以实现一次100秒后打印出1，200秒后打印2，300秒后打印3这样
- setInterval有两个缺点
```js
const moniInterval = (time, callback) => {

}
```
```js
const queue = () => {

}
```




### 实现一个wait(1000, callback1).wait(3000, callback2).wait(1000, callback3)




### 实现成语接龙 wordschain('胸有成竹')('竹报平安')('安富尊荣') 输出 胸有成竹 -> 竹报平安 -> 安富尊荣




### add(1, 3, 4)(7)(5, 5).valueOf();



### 958. 二叉树的完全性检验
```js
// x
var isCompleteTree = function(root) {
    if (!root) return true

    let queue = [[root, 1]]
        count = 0
    
    // ...
}

```

### 414. 第三大的数
```js
var thirdMax = function(nums) {

}
```



### 手写双向绑定
<!-- x -->


### 防抖节流
```js
const debounce = (fn, time) => {
    
}
```

```js
const throttle = (fn, time) => {

}

```

### promise实现图片懒加载
```js
function lazyLoad(src) {

}

```



### 实现一个简单路由
```js
class Route {

}

```

### 125. 验证回文串  上海自来水来自海上
```js
var isPalindrome = function(str) {

}

```


### 5. 最长回文子串
```js
// x
var longestPalindrome = function(s) {

}


```


### 1143. 最长公共子序列
```js
// x
var longestCommonSubsequence = function(str1, str2) {

}
```


### 70. 爬楼梯
```js
var climbStairs = function(n) {

}
```


### 面试题 08.11. 硬币
```js
// x
 var waysToChange = function (n) {

 }
```

### 不同路径1
```js
var uniquePaths = function(m, n) {

};
```

### 不同路径2
```js
var uniquePathsWithObstacles = function(arr) {
    
}
```


### 汉诺塔问题
```js
// x
let hanota = function(A, B, C) {

}
```


### 二分查找
```js
function binarySearch(target, arr, start, end) {

}

```


### 封装类型判断函数
```js
function getType(data) {
    
}

```



### 如何效率的向一个ul里面添加10000个li
```js
// 方法1：使用fragment

```
```js
// 方法2：使用字符串拼接

```


### 计数二进制子串
```js
// x
const countBinarySubstrings = (str) => {

}

```


### 反转字符串中的单词iii
```js
const revertByWord = (str) => {

}

```

### 重复的子字符串（正则匹配模式）
```js
const repeatedSubstringPattern = (str) => {

}

```


### 缺失的第一个正数
```js
const firstMissingPositive = (arr) => {

}

```

### 快速排序
```js
const quickSort = (arr) => {

}

```

### 平衡二叉树
```js
// x
const isBalanced = (root) => {

}

```

### 二叉树的最小深度
```js
const minDepth = (root) => {

}
```

### 二叉树的最大深度
```js
const maxDepth = (root) => {

}

```

### 统计节点个数
```js
const sizeOfTree = (root) => {

}

```

### 二叉树的镜像
```js
const invertTree = (root) => {

}

```

### 判断树相同
```js
const isSameTree = (left, right) => {

}

```


### 判断对称二叉树
```js
const isSymmetric = (root) => {

}

```


### 二叉树的层序遍历
```js
// x
// 递归
const levelOrder = (root) => {

}


// 非递归
const levelOrder = (root) => {

}

```


### 二叉树的中序遍历
```js
// 非递归
const inorder = (root) => {

}


// 递归
const inorder = (root, arr = []) => {

}

```



### 二叉树的前序遍历
```js
// 非递归
const preorder = (root) => {

}

// 递归
const preorder = (root, arr = []) => {

}

```



### 二叉树的后序遍历
```js
// 非递归
const postorder = (root) => {

}


// 递归
const postorder = (root, arr = []) => {

}
```


### 重建二叉树
从前序与中序遍历序列构造二叉树
<!-- x -->
```js
function reConstruct(preorder, inorder) {

}

```

### 求二叉树的后序遍历
给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
```js
let rebulidPostTree = (preorder, inorder) => {

}

```

### 生成二叉搜索树
<!-- x -->
```js
const generateBST = (data) => {

}

```

### 验证二叉搜索树
```js
const isValidBST = (node) => {

}

```


### 二叉搜索树的第k个节点
```js
const kthSmallest = (root, k) => {

}

```

### 二叉搜索树的后序遍历
```js
const verifyPostorder = (postorder) => {

}

```


### 电话号码的字母组合（组合运算）
```js
function letterCombinations(str) {
    let num = str.split('');
    if (num.find(i => i < 2)) return;
    let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

    // ...

    // 分治合并函数
    let combine = (arr) => {
        if (arr.length < 2) return;

        // ...
    }

    return combine(code)
}

```


### 种花问题（筛选运算-贪心）
```js
const canPlaceFlowers = (flowerbed = [], num) => {

}

```


### 链表倒数第k个节点
```js
const findKthFromTail = (head, k) => {

}

```


### 两个链表的第一个公共节点
```js
const findCommon = (list1, list2) => {

}

```


### 链表中环的入口结点
```js
const detectCycleEntry = (head) => {

}

```


### 合并两个有序链表
```js
// 递归
const merge = (p1, p2) => {

}

// 非递归
const merge = (p1, p2) => {

}

```


### 反转链表
<!-- x -->
```js
const reverseList = (head) => {

}

```


### 从尾到头打印链表
```js
const printFromTailToHead = (node) => {

}

```

### 排序链表
```js
const sortList = (head) => {

}
```


### 创建链表
```js
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkList {
    constructor(arr) {
    }

    static toArray(list) {
    }

    find(index) {
    }

    insert(value, index) {
    }
}

```


### 设计循环队列
```js
class MyCircularQueue {

}

```


