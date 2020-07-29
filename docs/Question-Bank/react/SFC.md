# 无状态组件

## 无状态 VS 有状态

### 无状态组件
无状态函数式组件（Stateless Functional Component, SFC），顾名思义，无状态，也就是你无法使用State、生命周期方法，这就决定了函数组件都是展示性组件，接收Props，渲染DOM，而不关注其他逻辑。
- 写法上只需要return react元素即可，没有render()。
- 使用上组件内部没有this,内部可以使用ref,外部无法使用ref

#### 组件上不支持 `ref`
无状态组件不支持 "ref"。原因很简单，因为在 React 调用到无状态组件的方法之前，是**没有一个实例化的过程的，因此也就没有所谓的 "ref"**。
```jsx harmony
function SquareButton(props) {
  let nodeDom;   // 组价内部可以使用ref
  
  return (
    <button className="square" onClick={props.onClick} ref={node => nodeDom = node}>
      {props.value}
    </button>
  );
}
<SquareButton ref={node => node = node}/> // ❌❌无法使用ref获取组件实例
```

#### 声明方式
```js
// 注意，props需要传入。
function SquareButton(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// 只需要return element即可，没有render()
// 当然也可以直接通过箭头函数
```
### 无状态组件`调用方式差别`：组件式调用、函数式调用

> 假定已知 Demo组件 为无状态组件。父组件调用方式如下：
```js
// 方式一：组件式调用
render() {
    return <Demo someProps={123} />;
}
// 方式二：函数式调用
render() {
    return Demo({someProps: 123});
}
```

**差别**：
1. 首先明确一点，因为无状态组件只是一个方法而没有生命周期和state，所以相比于有状态组件来说性能更高；
2. 但如果以 `组件式调用` 无状态组件的话，性能的提高不明显可以忽略不计；这是因为以`组件式调用`，React会调用 createElement()生成这个无状态组件，还是会执行创建元素，挂载等等。
3. 无状态组件真正的性能提升，是以 `函数式调用` 时，此时React会直接以一个function替代createElement()，也就不会执行创建元素和挂载，因此性能可大幅度提升！


### 有状态组件

在无状态组件的基础上，如果组件内部包含状态（state）且状态随着事件或者外部的消息而发生改变的时候，这就构成了有状态组件（Stateful Component）。

有状态组件通常会带有生命周期（lifecycle），用以在不同的时刻触发状态的更新。

## PureComponent VS Component

React15.3 中新加了一个 `PureComponent` 类，它是优化 React 应用程序最重要的方法之一。

`PureComponent`的作用是**可以用来提升性能**，因为它减少了应用中的渲染次数。特别是在无状态的简单组件（纯展示组件）上的性能可以高出 React.Component 几十倍，所以性能还是很可观的。

React.`PureComponent` 与 React.Component 几乎完全相同，只是因为对 `shouldComponentUpdate()`的处理不同，使得React.`PureComponent`的性能更高。

### PureComponent原理（shallowEqual）

- 当定义了`shouldComponentUpdate()`时，React **会直接使用 `shouldComponentUpdate()` 的结果作为是否更新的依据**；
- 当没有定义`shouldComponentUpdate()`时，React 就会去判断是不是 `PureComponent`，如果是 `PureComponent`，会使用 `shallowEqual`(浅比较) 来实现`「比较更新」`。当组件更新时，如果组件的 props 和 state 都没发生改变，render 方法就不会触发，省去 Virtual DOM 的「生成」和「比对」过程，达到提升性能的目的。

**注意有个关键问题**：React.PureComponent 做了如下判断：
```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps)
  || !shallowEqual(inst.state, nextState);
}
```
这里的 shallowEqual 会比较 Object.keys(state | props) 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是`只比较了第一层的值`，确实很浅，所以`深层的嵌套数据是对比不出来的`。

::: danger 注意
**因此，虽然使用 PureComponent 可以少写 shouldComponentUpdate 函数，节省了点代码，但浅对比可能会在面对复杂数据结构时，没有办法正确判断深层的数据一致性，而导致界面得不到更新。**
:::

#### 参考链接

[Reac系列之--无状态组件你真的知道吗？](https://www.jianshu.com/p/980abadd8a18)

[React SFC 无状态组件及多种组件写法](https://blog.lbinin.com/frontEnd/React/React-SFC.html#%E5%8E%9F%E7%90%86)
