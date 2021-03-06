# React 组件分类（不同角度）

- [非受控组件](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)
- [受控和非受控组件真的那么难理解吗？(React 实际案例详解)](https://juejin.cn/post/6858276396968951822#heading-8)

## 函数组件与类组件

传送门：[函数组件与类组件](./element-component-instance-node.html#react组件-分3类（函数组件与类组件）)

## 有状态组件与无状态组件

传送门：[有状态与无状态组件](./element-component-instance-node.html#构建-react组件-的方法（3种：包括有状态与无状态组件）)

##  受控组件与非受控组件

### 定义

1. **受控组件**：受控组件是在 React 中处理输入表单的一种技术。表单元素通常维护它们自己的状态，而 react 则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。这称为受控组件。因此，在受控组件表单中，数据由 React 组件处理。大多数情况下，**建议使用受控组件**。
2. **非受控组件**：有一种称为非受控组件的方法可以通过使用 Ref 来处理表单数据。在非受控组件中，Ref 用于直接从 DOM 访问表单值，而不是事件处理程序。

### 区别

| 受控组件                                           | 非受控组件                                      |
| -------------------------------------------------- | ----------------------------------------------- |
| 1. 没有维持自己的状态                              | 1. 保持着自己的状态                             |
| 2. 数据由父组件控制                                | 2. `数据保存在 DOM 中`                          |
| 3. **通过 props 获取当前值，然后通过回调通知更改** | 3. **通过 refs 来操作真实的 DOM，获取其当前值** |

### 应用场景

官方：绝大部分时候推荐使用受控组件来实现表单，因为在受控组件中，因为状态由 React 掌控，可以基于组件重渲实时控制做操作；如果选择非受控组件的话，表单数据就由 DOM 本身处理。但对于 file 标签，只能使用非受控组件。

::: danger 特殊的文件 file 标签

在 input 中还有一个比较特殊的情况，那就是 **file 类型的表单控件**。

对于 file 类型的表单控件它始终是一个不受控制的组件，`因为它的值只能由用户设置，而不是以编程方式设置`。

:::
