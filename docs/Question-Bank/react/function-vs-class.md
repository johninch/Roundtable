
# Function VS Class 组件（最大区别 - Capture Value）

function components 和 class components 之间有什么本质的区别吗？

答案就是 function components 所拥有的 **捕获渲染值(Capture Value)**特性。

思维上的不同：Function Component 是更彻底的状态驱动抽象，甚至没有 Class Component 生命周期的概念，只有一个状态，而 React 负责同步到 DOM。 

既然是状态同步，那么每次渲染的状态都会固化下来，这包括 state props useEffect 以及写在 Function Component 中的所有函数。

注意：*下文中所描述的，全部都是在 React 中 function 和 class 的差别，差异本身和React Hooks无关。*

## 什么是Capture Value

对比下面两段代码。（[在线demo](https://codesandbox.io/s/pjqnl16lm7)）

- Class Component:
    ```jsx
    class ProfilePage extends React.Component {
        showMessage = () => {
            alert("Followed " + this.props.user);
        };

        handleClick = () => {
            setTimeout(this.showMessage, 3000);
        };

        render() {
            return <button onClick={this.handleClick}>Follow</button>;
        }
    }
    ```
- Function Component:
    ```jsx
    function ProfilePage(props) {
        const showMessage = () => {
            alert("Followed " + props.user);
        };

        const handleClick = () => {
            setTimeout(showMessage, 3000);
        };

        return <button onClick={handleClick}>Follow</button>;
    }
    ```
通常认为这两段代码是等效的，然而，其实这两段代码是有细微的差别的：

尝试顺序操作：点击一个Follow按钮 -> 改变select选项然后等待3秒 -> 查看alert的文字

你会发现一个问题：
- 在function components中，在Dan的主页点击follow然后切换到Sophie，alert仍然会展示“Followed Dan”。即 **`Function Component` 展示的是`修改前`的值**。
    ![](./images/Function-VS-Class-01.gif)
- 在class components中，alert的却是“Followed Sophie”。即 **`Class Component` 展示的是`修改后`的值**。
    ![](./images/Function-VS-Class-02.gif)


那么 React 文档中描述的 props 不是不可变（Immutable）数据吗？为啥在运行时还会发生变化呢？
::: tip 什么叫「Capture Value」特性
我们知道，在 React中，每次 Render 都有自己的 Props 与 State，可以认为**每次 Render 的内容都会形成一个`快照`并保留下来**，因此当状态变更而 Rerender 时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 Props 与 State。这就是 **Capture Value 特性**。

不过，虽然 props 是不可变的，但在 Class Component 中使用了 this.props 来获取 props，而**因为 this 是可变的**，所以 this.props 的调用会导致每次都访问最新的 props。与类组件相对的，Function Component 不存在 this.props 的语法，因此 props 总是不可变的。
:::

## 如何使class组件也有 Capture Value
::: details 拓展：如何使类组件也有 Capture Value 特性
1、之所以在类组件中使用this会失去Capture Value特性，本质上就是因为 **拿到this.props太晚了**，简单的方式就是**更早地拿到this.props**的值，然后显式的将它传递到超时处理函数中：
```jsx {7}
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
但上述方式并不解决所有问题，因为如果ShowMessage调用另一个方法，而该方法读取this.props.something或this.state.something，我们必须通过在ShowMessage调用的每个方法，将this.props和this.state作为参数传递。这破坏了class的解构，代码冗长，不易维护。

2、如果我们**依赖于js的闭包**，问题就会得到解决。闭包通常是被避免的，因为它很难考虑一个随时间变化的值。但是在React中，props和state应该是不可变的：
```jsx {3,4,6,7}
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

3、上面2的方式是正确的，但看起来很奇怪。因为如果只是在render中定义函数而不是使用类方法，那么使用 class还有什么意义呢？可以直接简化点使用 function组件了呀！我们可以通过移除class来简化代码：
```jsx
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
props仍然可以被捕获到，React将它作为一个参数传递。但 props对象本身不会因React而发生变化了。
```
:::

## Capture Value 存在范围

- 每次 Render 都有自己的 Props 与 State；
- 每次 Render 都有自己的事件处理；
- 每次 Render 都有自己的 Effects（即 hooks 也有 Capture Value 特性）；

## function组件如何绕过 Capture Value
利用 useRef 就可以绕过 Capture Value 的特性。可以认为 **ref 在所有 Render 过程中保持着唯一引用，因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态**，而不会在每个 Render 间存在隔离。

传送门：[如何获取上一轮的 props 或 state](./black-magic-of-hooks.html#如何获取上一轮的-props-或-state)


## 参考链接

- [how-are-function-components-different-from-classes](https://overreacted.io/how-are-function-components-different-from-classes/)
- [【译】函数组件和类组件有什么不同？](https://juejin.im/post/5c99bd42f265da61156099c5)
- [精读《Function VS Class 组件》](https://github.com/dt-fe/weekly/blob/master/95.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20VS%20Class%20%E7%BB%84%E4%BB%B6%E3%80%8B.md)

