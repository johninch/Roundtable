# React虚拟DOM相关

## 虚拟Dom是什么
![](./images/react-VDOM.png)

- 在原生的 JS中，我们直接对 DOM进行创建和更改，而 DOM元素通过我们监听的事件和我们的应用程序进行通讯。
- 而 React会先将代码转换成一个 JS对象（即虚拟DOM），然后这个 JS对象再转换成真实 DOM。
- 虚拟DOM只不过是真实 DOM 的 JS对象表示。当我们需要创建或更新元素时，React首先会让这个 Vitrual Dom对象进行创建和更改，然后再将 Vitrual Dom对象渲染成真实DOM。当我们需要对 DOM进行事件监听时，首先对 Vitrual Dom进行事件监听，Vitrual Dom 会代理原生的 DOM事件从而做出响应。

## 虚拟Dom原理

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- patch 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 简述react diffing算法思路

传统的diff算法，是通过循环递归对节点进行依次对比，算法复杂度达到 `O(n^3) `，n是树的节点数，效率极低！而 React diff算法是一种`调和`实现，即将Virtual DOM树转换成最少操作的actual DOM树。

React 通过 **三大策略** 进行优化，将`O(n^3)复杂度 转化为 O(n)复杂度`:

1. 策略一（**tree diff**）：两棵树 只对同层次节点 进行比较。Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计（如果是跨层级的话，只有创建节点和删除节点的操作，不考虑其他）。
2. 策略二（**component diff**）：
    - 拥有相同类的两个组件 生成相似的树形结构，
    - 拥有不同类的两个组件 生成不同的树形结构。
3. 策略三（**element diff**）：对于同一层级的一组子节点，通过`唯一key`区分。

## 虚拟Dom比普通Dom性能更好吗？(虚拟DOM优劣势)

**Vitrual Dom 可以提升性能，这一说法实际上是很片面的。**

- 首先，直接操作 DOM是非常耗费性能的，这一点毋庸置疑。但是 React/vue使用了 Vitrual Dom，VDOM也还是要操作 DOM，这是无法避免的。
- 并且，如果是首次渲染的话，Vitrual Dom 甚至要进行更多的计算，消耗更多的内存。
- Vitrual Dom 的「优势」在于：
    1. **无需手动操作Dom**，提升开发效率：React/vue的 `Diff算法`和`批处理策略Patch` 会在一次更新中自动完成，不用开发者手动完成（*实际上，这个计算过程我们在直接操作 DOM时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，所以，在这个过程中 React/vue帮助我们 "提升了性能"*）。
    2. **保证性能下限**：第一点提到开发者实际是可以自己手动优化完成dom更新的，但这点依赖于开发者的水平，大部分情况下自己做的是不如 React/vue好的，所以VDOM保证了性能下限。
    3. **跨平台**: DOM与平台强相关，而虚拟DOM本质上是JavaScript对象，相比之下虚拟DOM可以进行更方便地跨平台操作，例如服务器渲染、移动端开发等等。
- Vitrual Dom 的「缺点」只有一个：
    1. **无法进行极致优化**: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化，比如VScode采用直接手动操作DOM的方式进行极端的性能优化。

所以，**Vitrual Dom 帮助我们提高了开发效率**，在**重复渲染时它帮助我们计算如何更高效的更新**，`而不是它比 DOM操作更快`。

## 虚拟Dom中的$$typeof属性的作用是什么？

ReactElement中有一个 `$$typeof`属性，它被赋值为 REACT_ELEMENT_TYPE：
```js
var REACT_ELEMENT_TYPE =  (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||  0xeac7;
```
`$$typeof`是一个 Symbol类型的变量，这个变量可以防止 XSS。如果你的服务器有一个漏洞，允许用户存储任意 JSON对象，而客户端代码需要一个字符串，这可能会成为一个问题：
```js
let expectedTextButGotJSON = {
    type: 'div',
    props: {
        dangerouslySetInnerHTML: {
            __html: '/* put your exploit here */'
        },
    },
};

let message = { text: expectedTextButGotJSON };

<p>{message.text}</p>
```
JSON中不能存储 Symbol类型的变量。

ReactElement.isValidElement函数用来判断一个 React组件是否是有效的，下面是它的具体实现：
```js
ReactElement.isValidElement = function(object) {
  return (
    typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```
React渲染时会把没有 `$$typeof`标识，以及规则校验不通过的组件过滤掉。当你的环境不支持 Symbol时，$$typeof被赋值为 0xeac7，至于为什么，React开发者给出了答案：0xeac7看起来有点像 React。





