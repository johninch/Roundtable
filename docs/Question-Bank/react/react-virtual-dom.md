# React虚拟DOM相关

## 虚拟Dom是什么？
![](./images/react-VDOM.png)

- 在原生的 JS中，我们直接对 DOM进行创建和更改，而 DOM元素通过我们监听的事件和我们的应用程序进行通讯。
- 而 React会先将代码转换成一个 JS对象（即虚拟DOM），然后这个 JS对象再转换成真实 DOM。
- 虚拟DOM只不过是真实 DOM 的 JS对象表示。当我们需要创建或更新元素时，React首先会让这个 Vitrual Dom对象进行创建和更改，然后再将 Vitrual Dom对象渲染成真实DOM。当我们需要对 DOM进行事件监听时，首先对 Vitrual Dom进行事件监听，Vitrual Dom 会代理原生的 DOM事件从而做出响应。

## 虚拟Dom如何工作？

1. React将整个DOM副本保存为虚拟DOM；
2. 每当有更新时，它都会维护两个虚拟DOM，以比较之前的状态和当前状态，并确定哪些对象已被更改；
3. 它通过比较两个虚拟DOM 差异（Diff算法），并将这些变化更新到实际DOM；
4. 一旦真正的DOM更新，它也会更新UI。

## 简述react diffing算法思路

传统的diff算法，是通过循环递归对节点进行依次对比，算法复杂度达到 `O(n^3) `，n是树的节点数，效率极低！而 React diff算法是一种`调和`实现，即将Virtual DOM树转换成最少操作的actual DOM树。

React 通过 **三大策略** 进行优化，将`O(n^3)复杂度 转化为 O(n)复杂度`:

1. 策略一（**tree diff**）：两棵树 只对同层次节点 进行比较。Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计（如果是跨层级的话，只有创建节点和删除节点的操作，不考虑其他）。
2. 策略二（**component diff**）：
    - 拥有相同类的两个组件 生成相似的树形结构，
    - 拥有不同类的两个组件 生成不同的树形结构。
3. 策略三（**element diff**）：对于同一层级的一组子节点，通过`唯一key`区分。

## 虚拟Dom比普通Dom更快吗？

**Vitrual Dom 可以提升性能，这一说法实际上是很片面的。**

- 直接操作 DOM是非常耗费性能的，这一点毋庸置疑。但是 React使用 Vitrual Dom 也是无法避免操作 DOM的。
- 如果是首次渲染， Vitrual Dom 不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
- Vitrual Dom 的优势在于 React的 `Diff算法`和`批处理策略`，React在页面更新之前，提前计算好了如何进行更新和渲染 DOM（实际上，这个计算过程我们在直接操作 DOM时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如 React好的），所以，在这个过程中 React帮助我们"提升了性能"。

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





