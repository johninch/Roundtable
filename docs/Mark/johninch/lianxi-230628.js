/*
 * @Author: zhangyuchi.inch zhangyuchi.inch@bytedance.com
 * @Date: 2023-06-28 19:17:23
 * @LastEditors: zhangyuchi.inch zhangyuchi.inch@bytedance.com
 * @LastEditTime: 2023-07-06 20:59:01
 * @FilePath: /Roundtable/docs/Mark/johninch/lianxi-230628.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ************************************************************************************ 算法题 ************************************************************************************
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

// - `E 62. 不同路径`
const uniquePaths1 = (m, n) => {
	let dp = Array.from(new Array(m), () => new Array(n).fill(0));

	// 确定左边界
	for (let i = 0; i < m; i++) {
		dp[i][0] = 1;
	}

	// 确定上边界
	for (let j = 0; j < n; j++) {
		dp[0][j] = 1;
	}

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
		}
	}

	return dp[m - 1][n - 1];
};

// - `M 63. 不同路径 II` 有障碍物的情况
// https://leetcode.cn/problems/unique-paths-ii/solution/si-chong-shi-xian-xiang-xi-tu-jie-63-bu-0qyz7/
const uniquePaths2 = arr => {
	const m = arr.length,
		n = arr[0].length;

	const dp = Array.from(new Array(m), () => new Array(n).fill(0));

	// 处理起点
	dp[0][0] = arr[0][0] === 1 ? 0 : 1;

	// 第1列
	for (let i = 1; i < m; i++) {
		if (arr[i][0] === 1 || dp[i - 1][0] === 0) {
			dp[i][0] = 0;
		} else {
			dp[i][0] = 1;
		}
	}

	// 第1行
	for (let j = 1; j < n; j++) {
		if (arr[0][j] === 1 || dp[0][j - 1] === 0) {
			dp[0][j] = 0;
		} else {
			dp[0][j] = 1;
		}
	}

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (arr[i][j] === 1) {
				dp[i][j] = 0;
			} else {
				dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
			}
		}
	}

	return dp[m - 1][n - 1];
};

//  - `M 70. 爬楼梯`
const climbStairs = n => {
	const dp = new Array(n);
	dp[0] = 1;
	dp[1] = 1;
	for (let i = 2; i < n; i++) {
		dp[n] = dp[n - 1] + dp[n - 2];
	}
	return dp[n];
};

// M 322. 零钱兑换
// dp[n] 为组成n的最少硬币数
const coinExchange = (coins, n) => {
	const dp = new Array(n + 1).fill(Infinity);

	dp[0] = 0;
	for (let coin of coins) {
		for (let i = 1; i <= n; i++) {
			if (i - coin >= 0) {
				dp[i] = Math.min(dp[i], dp[i - coin] + 1);
			}
		}
	}

	return dp[n] === Infinity ? -1 : dp[n];
};

// M 300. 最长上升子序列
const lengthOfLIS = nums => {
	if (nums.length === 0) return 0;

	// 令 dp[i] 为以 nums[i] 为结尾的最长上升子序列
	const dp = new Array(nums + 1).fill(1);
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1);
			}
		}
	}

	dp.sort((a, b) => b - a);

	return dp[0];
};

// **************************** 双指针 ****************************
// - 双指针
//     - `E 455. 分发饼干`
//     - `E 9. 回文数`
//     - `M 15. 三数之和`
//     - `M 11. 盛最多水的容器`
//     - `H 42. 接雨水`

// - `E 9. 回文数`
const isPalindrome = x => {
	if (x < 0) return false;

	let str = x.string();
	let left = 0,
		right = str.length - 1;

	while (left < right) {
		if (str[left] !== str[right]) {
			return false;
		} else {
			left++;
			right++;
		}
	}

	return true;
};

// - `H 42. 接雨水`
const trap = height => {
	let leftMax = [],
		rightMax = [],
		v = 0;

	for (i = 0, max = 0; i < height.length; i++) {
		max = Math.max(height[i], max);
		leftMax = max;
	}

	for (i = height.length - 1, max = 0; i > 0; i--) {
		max = Math.max(height[i], max);
		rightMax = max;
	}

	for (i = 0; i < height.length; i++) {
		v = v + Math.min(leftMax[i], rightMax[i]) - height[i];
	}

	return v;
};

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

// E 141. 环形链表
// 环形链表的入口节点
// 方法：分两步
// 阶段一 快慢指针判断是否成环，相遇必定成环，快指针走到链尾指向null则无环；
// 阶段二 如果成环，记录第一次相遇的节点firstMeet，使用两个慢指针(即步频为1的)一个从head，一个从firstMeet出发，相遇时从head出发的指针则为入环点
const detectCycle = head => {
	let fast = head,
		slow = head,
		firstMeet = null;

	while (fast && slow && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast === slow) {
			firstMeet = slow;
			break;
		}
	}

	if (!firstMeet) {
		return null;
	}

	while (firstMeet && head) {
		if (firstMeet === head) {
			return firstMeet;
		}
		firstMeet = firstMeet.next;
		head = head.next;
	}
	return null;
};

// E 206. 反转链表
const reverseList = head => {
	let cur = head,
		prev = null;
	while (cur) {
		let next = cur.next;
		cur.next = prev;

		prev = cur;
		cur = next;
	}

	return prev;
};

// E 21. 合并两个有序链表
const mergeList = (l1, l2) => {
	let head = new ListNode("head");
	let dummy = head;

	while (l1 && l2) {
		if (l1.val <= l2.val) {
			dummy.next = l1;
			l1 = l1.next;
		} else {
			dummy.next = l2;
			l2 = l2.next;
		}
		dummy = dummy.next;
	}

	if (l1) {
		dummy.next = l1;
	}

	if (l2) {
		dummy.next = l2;
	}

	return head.next;
};

// **************************** 栈 ****************************
// - 栈
//     - `E 20. 有效的括号`

// E 20. 有效的括号
// 利用栈。
// 遇到左括号，一律推入栈中，
// 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。
const isValid = str => {
	const stack = [];
	const len = str.length;
	if (len % 2 !== 0) return false;

	for (i = 0; i < len; i++) {
		let letter = str[i];
		switch (letter) {
			case "{":
			case "[":
			case "(":
				stack.push(letter);
				break;
			case "}":
				if (stack.pop() !== "{") return false;
				break;
			case "]":
				if (stack.pop() !== "[") return false;
				break;
			case ")":
				if (stack.pop() !== "(") return false;
				break;
			default:
				return false;
		}
	}

	return !stack.length;
};

// **************************** TopK问题 ****************************
// - TopK问题
//     - `E 414. 第三大的数`

// 不用set，空间O(1)复杂度
var thirdMax = function(nums) {
	if (nums.length < 3) return Math.max(...nums);
	let max1 = -Infinity; // 存储最大 置为最小值
	let max2 = -Infinity; // 存储第二大 置为最小值
	let max3 = -Infinity; // 存储第三大 置为最小值
	for (let n of nums) {
		if (n > max1) {
			// 先比较最大的，成功就把值向后传递，把第三大的丢掉
			max3 = max2;
			max2 = max1;
			max1 = n;
			continue;
		}
		if (n !== max1 && n > max2) {
			// 第一个判断没中，判断是不是第二大的，注意值不能等于最大，这是为了防止重复
			max3 = max2;
			max2 = n;
			continue;
		}
		if (n !== max1 && n !== max2 && n > max3) {
			// 同上，多了个判断条件
			max3 = n;
			continue;
		}
	}

	if (max3 === -Infinity || max2 === -Infinity || max1 === -Infinity) {
		return Math.max(max1, max2, max3); // 这里其实就是判断，在去重后的长度是不是小于3，不是的话三个max肯定都不是-Infinity
	}

	return max3; //直接返回正确答案
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
const permute = nums => {
	const res = [];
	const backtrack = (res, templist, nums) => {
		if (templist.length === res.length) {
			return res.push([...templist]);
		} else {
			for (i = 0; i < nums.length; i++) {
				if (templist.includes(nums[i])) continue;
				templist.push(nums[i]);
				backtrack(res, templist, nums[i]);
				templist.pop();
			}
		}
	};

	backtrack(res, [], nums);
	return res;
};

// E 汉诺塔问题
const hanota = (A, B, C) => {
	const move = (A, B, C, n) => {
		if (n === 0) return;
		move(A, C, B, n - 1);
		C.push(A.pop());
		move(B, A, C, n - 1);
	};

	return move(A, B, C, A.length);
};

// **************************** 贪心 ****************************
// - 贪心
//     - `E 121. 买卖股票的最佳时机（一笔交易）`
//     - `E 122. 买卖股票的最佳时机 II（多笔交易）`

// E 121. 买卖股票的最佳时机（一笔交易）
const maxProfit = prices => {
	let profit = 0;
	let minPrice = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < minPrice) {
			minPrice = prices[i];
		} else {
			profit = Math.max(prices[i] - minPrice, profit);
		}
	}
	return profit;
};

// E 122. 买卖股票的最佳时机 II（多笔交易）
const maxProfit2 = prices => {
	let profit = 0;
	let gap;
	for (let i = 1; i < prices.length; i++) {
		gap = prices[i] - prices[i - 1];
		if (gap > 0) {
			profit = profit + gap;
		}
	}

	return profit;
};

// **************************** 字符串 ****************************
// - 字符串
//     - `E 14. 最长公共前缀`
//     - `E 696. 计数二进制子串`
//     - `E 557. 反转字符串中的单词 III`

// E 14. 最长公共前缀
const longestCommonPrefix = strs => {
	if (!strs || strs.length === 0) return "";

	let ss = strs[0];
	for (let i = 1; i < strs.length; i++) {
		let j = 0;
		for (let len = Math.min(ss.length, strs[i].length); j < len; j++) {
			if (ss[j] !== strs[i][j]) {
				break;
			}
		}
		ss = ss.subStr(0, j);
		if (ss === "") return "";
	}

	return ss;
};

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

// E 674. 最长连续递增序列
const lenOfLongestSubString = nums => {
	const n = nums.length;
	if (!n) return 0;
	let res = 1,
		count = 1;
	for (let i = 1; i < n; i++) {
		if (nums[i] > nums[i - 1]) {
			count++;
		} else {
			count = 1;
		}
		res = Math.max(res, count);
	}

	return res;
};

// E 26. 删除排序数组中的重复项（返回移除后数组的新长度）
const findDuplicates = nums => {
	const n = nums.length;
	if (!n) return 0;
	let fast = 1,
		slow = 1;
	while (fast < n) {
		if (nums[fast] !== nums[fast - 1]) {
			nums[slow] = nums[fast];
			slow++;
		}
		fast++;
	}

	return slow;
};

// E 605. 种花问题
const placeFlowers = (bed, num) => {
	const len = bed.length;
	if (num && !len) return false;
	bed.push(0);
	bed.unshift(0);
	let res = 0;
	for (let i = 1; i < n; i++) {
		if (bed[i] === 0 && bed[i + 1] === 0 && bed[i - 1] === 0) {
			bed[i] = 1;
			res++;
		}
	}

	return res > num;
};

// **************************** 深度优先遍历 ****************************
// - 深度优先遍历
//     - `M 200. 岛屿数量`
//     - `M 695. 岛屿的最大面积`

// M 200. 岛屿数量
const numsOfIslands = grid => {
	const rows = grid.length;
	const cols = grid[0].length;
	if (!rows) return 0;

	let res = 0;
	const helper = (grid, i, j, rows, cols) => {
		if (
			i < 0 ||
			j < 0 ||
			i > rows.length - 1 ||
			j > cols.length - 1 ||
			grid[i][j] === 0
		) {
			return;
		}

		grid[i][j] = 0;

		helper(grid, i + 1, j, rows, cols);
		helper(grid, i, j + 1, rows, cols);
		helper(grid, i - 1, j, rows, cols);
		helper(grid, i, j - 1, rows, cols);
	};

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < cols.length; j++) {
			if (grid[i][j] === 1) {
				helper(grid, i, j, rows, cols);
				res++;
			}
		}
	}

	return res;
};

// ************************************************************************************ 编码题 ************************************************************************************
// ### 二分查找
function binarySearch(target, arr, start, end) {
	if (!arr.length) return null;

	let mid = Math.floor((start + end) / 2);

	if (arr[mid] === target) {
		return mid;
	} else if (arr[mid] > target) {
		binarySearch(target, arr, start, mid - 1);
	} else {
		binarySearch(target, arr, mid + 1, end);
	}
}

// ### 快速排序
const quickSort = arr => {
	return arr.length <= 1
		? arr
		: quickSort(
				arr
					.slice(1)
					.filter(n => n < arr[0])
					.concat(arr[0], quickSort(arr.slice(1).filter(n => n >= arr[0])))
		  );
};

// ### 防抖节流
const debounce = (fn, time) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);

		let that = this;
		timer = setTimeout(() => {
			fn.apply(that, [...args]);
		}, time);
	};
};

const throttle = (fn, time) => {
	let canDo = true;
	return (...args) => {
		if (!canDo) return;
		canDo = false;
		setTimeout(() => {
			fn.apply(that, [...args]);
			canDo = true;
		}, timeout);
	};
};

// ### 数组扁平化
function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat([...arr]);
	}

	return arr;
}

function flatten(arr) {
	const res = [];
	arr.forEach(item => {
		if (Array.isArray(item)) {
			res = res.concat(flatten(item));
		} else {
			res.push(item);
		}
	});

	return res;
}

function flatten(arr) {
	return arr.reduce((prev, item) => {
		if (Array.isArray(item)) {
			prev = prev.concat(flatten(item));
		} else {
			prev.push(item);
		}

		return prev;
	}, []);
}

[1, [2, [3, 4]]];

// ### 数组去重
// Array.from(new Set(arr))
// [...new Set(arr)]

// ### add(1, 3, 4)(7)(5, 5).valueOf();
const add = (...args) => {
	let total = [];
	const createChain = (...args) => {
		total = [...total, ...args];

		return createChain;
	};

	createChain.valueOf = () => {
		return total.reduce((res, item) => res + item, 0);
	};

	return createChain(...args);
};

// 实现promisify
// 只有nodeCallback方法可以通过 promisify 变成 promise，nodeCallback需满足两个条件
const promisify = func => {
	return (...args) => {
		return new Promise((resolve, reject) => {
			func(...args, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	};
};

// 实现usePrevious
function usePrevious(val) {
	const ref = useRef();

	useEffect(() => {
		ref.current = val;
	}, [val]);

	return ref.current;
}

// ### 简单版EventEmitter实现
class EventEmitter {
	constructor() {
		this._eventBus = {};
	}

	on(type, cb) {
		if (!this._eventBus[type]) {
			this._eventBus[type] = [];
		}

		this._eventBus[type].push(cb);
	}

	off(type, cb) {
		if (this._eventBus[type]) {
			const index = this._eventBus[type].indexOf(_cb => _cb === cb);

			index > -1 && this._eventBus[type].splice(index, 1);
		}
	}

	once(type, cb) {
		this.on(type, (...args) => {
			cb(...args);
			this.off(type, cb);
		});
	}

	emit(type, ...args) {
		if (this._eventBus[type]) {
			this._eventBus[type].forEach(_cb => _cb(...args));
		}
	}
}

// 实现字符串模板
const template = "I am {{name }}, {{ age}} years old";
var context = { name: "xiaoming", age: 2 };

function templateStr(template, context) {
	return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
		return context[key.replace(/\s/g, "")];
	});
}

// 千分位题
function toThousands(num) {
	const strs = (num || 0).toString().split(".");
	return strs[0].replace(/\(\d)(?:(?=\d{3}))+$/g, "$1,") + "." + strs[1];
}
toThousands(123456789011);

// 写一个方法,实现字符串从后往前每三个插入|,得到"ad|abc|def|ghi"
const str = "adabcdefghi";
str.replace(/\(\w)(?:(?=\d{3}))+$/g, "$1|");

// 深拷贝
// 浅拷贝与深拷贝的区别
// 深拷贝
// - 最简单版本：只对JSON安全的数据结构有效；且会抛弃对象的constructor，所有的构造函数会指向Object；遇到对象有循环引用，会报错。
// - 只能写出简单版本，即只实现到区分array与Object的引用类型
//     - 如果考虑全面类型的话，对Date、RegExp、甚至function都是要考虑的（当然这里的function其实考虑了也没意义，两个对象使用在内存中处于同一个地址的函数也是没有任何问题的，而比如lodash在碰到函数深拷贝时就直接返回了）
//     - 另外还应考虑循环引用的问题
//         - 解决循环引用问题，需额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
//     这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构。
function deepClone(obj) {
	if (typeof obj !== "object" || obj === null) return obj;

	const res =
		Object.prototype.toString.call(obj) === "[object Object]" ? {} : [];

	if (Window.JSON) {
		res = JSON.parse(JSON.stringify(obj));
	} else {
		for (let key of obj) {
			res[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
		}
	}
	return res;
}

// 写一个 DOM2JSON(node) 函数，node 有 tagName 和 childNodes 属性
`
<div>
    <span>
        <a></a>
    </span>
    <span>
        <a></a>
        <a></a>
    </span>
</div>

{
    tag: 'DIV',
    children: [{
        tag: 'SPAN',
        children: [
            { tag: 'A', children: [] }
        ]
    }, {
    tag: 'SPAN',
    children: [
            { tag: 'A', children: [] },
            { tag: 'A', children: [] }
        ]
    }]
}
`;
function DOM2JSON(node) {
	const obj = {};
	obj["tag"] = node.tagName;
	obj["children"] = [];
	const child = node.children;
	for (let i = 0; i < child.length; i++) {
		obj["children"].push(DOM2JSON(child[i]));
	}

	return obj;
}

// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有limit个。完善下面代码的Scheduler类，使得一下程序能正确输出
class Scheduler {
	add(promiseCreator) {
		//...
	}
}

function timeout(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

var scheduler = new Scheduler();

function addTask(time, order) {
	scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
// 2
// 3
// 1
// 4
// 这里说明传入的limit是2，并发执行2个

class Scheduler {
	constructor() {
		this.limit = 2;
		this.currentNum = 0;
		this.queue = [];
	}
	add(fn) {
		return new Promise((resolve, reject) => {
			this.queue.push([fn, resolve]);
			this.run();
		});
	}

	run() {
		if (this.currentNum < this.limit && this.queue.length) {
			const [fn, resolve] = this.queue.pop();
			this.currentNum++;
			Promise.resolve(fn()).then(res => {
				resolve(res);
				this.currentNum--;
				this.run();
			});
		}
	}
}

// ************************************************************************************ promise题 ************************************************************************************
// - 如何用 await 和 async 写一个睡眠函数？
const sleep = (handler, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(handler());
		}, delay);
	});
};

// - 请实现一个 cacheRequest 方法，保证当使用 ajax(请求相同资源时，此题中相同资源的判断是以 url 为判断依据)，真实网络层中，实际只发出一次请求
// （假设已存在 request 方法用于封装 ajax 请求，调用格式为：`request(url, successCallback, failCallback)`）
//   比如调用方代码（并行请求）如下
```js
cacheRequest("/user", data => {
	console.log("我是从A中请求的user，数据为" + data);
});

cacheRequest("/user", data => {
	console.log("我是从B中请求的user，数据为" + data);
});
```;

const cacheRequest = (url, successCallback, failCallback) => {
	cacheRequest.cache = cacheRequest.cache || [];
	cacheRequest.clear = cacheRequest.clear || (() => (cacheRequest.cache = []));

	if (cacheRequest.cache[url]) {
		return cacheRequest.cache[url]
			.then(res => successCallback(res))
			.catch(err => failCallback(err));
	}

	let success, fail;
	cacheRequest.cache[url] = new Promise((resolve, reject) => {
		success = resolve;
		fail = reject;
	});

	return request(
		url,
		res => {
			success(res);
			successCallback(res);
		},
		error => {
			fail(error);
			failCallback(error);
		}
	);
};

// - 三次重试：假设有一个函数名为 job,调用 job 后会执行一些异步任务，并返回一个 Promise,但 job 执行的异步任务有可能会失败
//   请实现函数 retry,把 job 作为 retry 函数的参数传入，当 retry 执行后会尝试调用 job,如果 job 返回成功（即 Promise fulfilled），则 retry 函数返回 job 函数的返回内容；
//   如果 job 返回失败（即 Promise rejected）,retry 函数会再次尝试调用 job 函数。
//   如果 job 连续三次均返回失败，retry 则不再尝试调用，并返回其最后一次失败的内容。
const count = 6;
const job = flag => {
	return new Promise((resolve, reject) => {
		if (flag === count) {
			resolve();
		} else {
			reject();
		}
	});
};

// 方法1. 可以在attempt中每次new一个新的Promise对象
const retry = (handler, num, delay) => {
	let flag = 1; // 调用次数
	const attempt = () => {
		new Promise((resolve, reject) => {
			console.log(`第${flag}次调用`);
			handler(flag)
				.then(res => {
					resolve("成功");
				})
				.catch(err => {
					if (flag - 1 === num) {
						reject("失败");
					} else {
						flag++;
						setTimeout(() => {
							attempt();
						}, delay);
					}
				});
		})
			.then(res => {
				console.log(`第${flag}次调用成功`);
			})
			.catch(err => {
				console.log(`重试${flag - 1}次调用失败`);
			});
	};

	attempt(handler);
};

retry(job, 3, 1000);

// 方法2. 也可以将attempt放在一个Promise之中
const count2 = 6;
const job2 = flag => {
	return new Promise((resolve, reject) => {
		if (flag === count2) {
			resolve();
		} else {
			reject();
		}
	});
};
const retry2 = (handler, num, delay) => {
	let flag = 1; // 调用次数
	new Promise((resolve, reject) => {
		const attempt = () => {
			console.log(`第${flag}次调用`);
			handler(flag)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					if (flag - 1 === num) {
						reject();
					} else {
						flag++;
						setTimeout(() => {
							attempt();
						}, delay);
					}
				});
		};
		attempt();
	})
		.then(res => {
			console.log(`第${flag}次调用成功`);
		})
		.catch(err => {
			console.log(`重试${flag - 1}次调用失败`);
		});
};
retry2(job2, 3, 1000);

// - 异步最大并发请求并按顺序组成结果
//   虽然 map 方法的参数是 async 函数，但它是并发执行的，因为只有 async 函数内部是继发执行，外部不受影响。后面的 for..of 循环内部使用了 await，因此实现了按顺序输出。
const asyncInOrder = async arr => {
	const pArr = arr.map(async url => {
		const res = await fetch(url);
		return res;
	});

	for (let p of pArr) {
		console.log(await p);
	}
};

// - 串行 Promise 控制，一个请求执行完再执行下一个
// iteratorPromise([p1, p2, p3, p3])
// （1）通过在 then 方法里面递归传递下一次异步方法（递归的方法catch后就不会再递归调用迭代了，即p3报错后p4不再执行）
const iteratorPromise = arr => {
	const iter = () => {
		if (arr.length) {
			let p = arr.shift();
			p()
				.then(res => iter())
				.catch(err => console.log(err));
		}
	};

	iter();
};

// （2）利用 Promise.resolve()，循环赋值（循环调用的方法会执行每一个p，当p3报错后，p4也会执行不过是直接拿到穿透的p3报错）
const iteratorPromise2 = arr => {
	let resolve = Promise.resolve();
	arr.forEach(p => {
		resolve = resolve.then(() => p()).catch(err => console.log(err));
	});
};

const iteratorPromise3 = arr => {
	arr.reduce((resolve, p) => {
		return resolve.then(() => p()).catch(err => console.log(err));
	}, Promise.resolve());
};

// - Promise 每隔一秒打印数字
//   1. 也是串行输出，只是需要结合 setTimeout
const delayPromise = arr => {
	arr.forEach(num => {
		let resolve = Promise.resolve();
		return (resolve = resolve.then(() => {
			new Promise(resolve =>
				setTimeout(() => {
					resolve(console.log(num));
				}, 1000)
			);
		}));
	});
};
//   2. 同理可以用Promise配合着reduce不停的在promise后面叠加.then
const delayPromise2 = arr => {
	arr.reduce((resolve, num) => {
		return resolve.then(() => {
			new Promise(resolve =>
				setTimeout(() => {
					resolve(console.log(num));
				}, 1000)
			);
		});
	}, Promise.resolve());
};
// - 使用 Promise 实现红绿灯交替重复亮（依然考察 Promise.resolve().then(() => return new Promise())的串行输出）
```js
function red() {
	console.log("red");
}
function green() {
	console.log("green");
}
function yellow() {
	console.log("yellow");
}
```;
const light = (timer, cb) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cb();
			resolve();
		}, timer);
	});
};

const run = () => {
	Promise.resolve()
		.then(() => {
			return light(1000, red);
		})
		.then(() => {
			return light(1000, green);
		})
		.then(() => {
			return light(1000, yellow);
		})
		.then(() => {
			return run();
		});
};

run();

// - 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中
// - 有点类似于 Promise.all()，不过.all()不需要管执行顺序，只需要并发执行就行了。但是这里需要等上一个执行完毕之后才能执行下一个
```js
const time = (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve()
        }, timer)
    })
}
const ajax1 = () => time(2000).then(() => {
    console.log(1);
    return 1
})
const ajax2 = () => time(1000).then(() => {
    console.log(2);
    return 2
})
const ajax3 = () => time(1000).then(() => {
    console.log(3);
    return 3
})

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// 2
// 3
// 1
// done
// [1, 2, 3]
```;

const mergePromise1 = async arr => {
	const data = [];
	// 因为在map阶段是并发的，所以输出为231，按照定时器输出
	const pArr = arr.map(async ajax => {
		const res = await ajax();
		return res;
	});

	for (const p of pArr) {
		const res = await p;
		data.push(res);
	}

	return data;
};

const mergePromise2 = async arr => {
	const data = [];
	return arr.reduce((resolve, ajax) => {
		// 串行输出，输出123，按ajax顺序输出
		return resolve
			.then(async () => {
				const res = await ajax();
				data.push(res);
				return data;
			})
			.catch(err => console.log(err));
	}, Promise.resolve());
};

// - 限制异步操作的并发个数并尽可能快的完成全部
//   - 以每次并发请求的数量为 3 为例：先请求 urls 中的前面三个(下标为 0,1,2)，并且请求的时候使用 Promise.race()来同时请求，三个中有一个先完成了(例如下标为 1 的图片)，我们就把这个当前数组中已经完成的那一项(第 1 项)换成还没有请求的那一项(urls 中下标为 3)。
//   - 直到 urls 已经遍历完了，然后将最后三个没有完成的请求(也就是状态没有改变的 Promise)用 Promise.all()来加载它们。
```js
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```;

const limitLoad = (urls, handler, limitNum) => {
	let arr = urls.slice();
	let pArr = arr.splice(0, limitNum).map((url, index) => {
		return handler(url).then(() => index);
	});

	return arr
		.reduce((resolve, url) => {
			return resolve
				.then(() => Promise.race(pArr))
				.then(
					fastIndex => (pArr[fastIndex] = handler(url).then(() => fastIndex))
				)
				.catch(err => console.log(err));
		}, Promise.resolve())
		.then(() => Promise.all(pArr));
};
