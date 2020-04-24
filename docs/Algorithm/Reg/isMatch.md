# 正则表达式匹配

[leetcode - 10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching)

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

- '.' 匹配任意单个字符
- '*' 匹配零个或多个前面的那一个元素
- 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

## Johninch
```js

// /**
//  * @param {string} s
//  * @param {string} p
//  * @return {boolean}
//  */
// var isMatch = function(s, p) {
//     const formatToReg = (item, index, source) => {
//         if (/[a-z]/.test(item)) {
//             return item
//         } else if (item === ".") {
//             return '[a-z]'
//         } else if (item === "*") {
//             if (!source[index-1]) {
//                 return ''
//             }

//             return '*'
//         }
//     }

//     const pArr = p.split('');
//     const regArr = pArr.map((item, index) => formatToReg(item, index, pArr));

//     // 匹配，是要涵盖 整个 字符串 s的，而不是部分字符串，所以要添加边界元字符
//     let reg = '^' + regArr.join('') + '$';

//     var realReg = new RegExp(reg, 'g');

//     return realReg.test(s)
// };

var isMatch = function(s, p) {
    return new RegExp(['^', ...p, '$'].join('')).test(s);
}

// 当然这道题本质不应该使用正则引擎来做，而需要自己实现简单的正则引擎

export default isMatch;
```