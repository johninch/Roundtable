# JSX 语法

## 什么是JSX语法

JSX（JavaScript XML）是JS的语法扩展，是使用 XML 语法编写 JavaScript 的一种语法糖。在 React 中，所有的组件的渲染功能都依靠 JSX，它利用 JS 的表现力和类似 HTML 的模板语法。JSX 可以生成 React “元素”。

## 为什么JSX代码中一定要引入React？

JSX只是为 `React.createElement(component,props,...children)方法提供的语法糖`。所有的 JSX代码最后都会转换成 React.createElement(...)，`Babel帮助我们完成了这个转换的过程`。所以使用了 JSX的代码都必须引入 React。

## JSX 中可以渲染出false、true、null、undefined、''、0、[]、{}等值么？

- `{}`：jsx 无法直接渲染对象，会报对象不是一个合法的react子节点，如果想要渲染一些子节点，最好用数组替代；
- `[]`：可以正常渲染，如果数组中没有任何元素，则页面是空白的；
- `false, true, null, ''`：可以渲染，页面不展示任何元素；
- `undefined`：不能，因为render函数必须要有返回值；
- `0`：可以正常渲染，页面显示0；

只有 {}、undefined 不能正常渲染。
