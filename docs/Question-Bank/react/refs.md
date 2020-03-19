# React Refs相关

## ref主要用于
1. **获取对dom的引用**，用以操作dom、执行动画以及调用适配第三方库等；
2. **访问类组件实例**，直接调用一些组件实例方法。

**注意**：*但是不要过度使用ref。很多可以通过合理定义state所在组件层级，来用组件方式解决的情况，避免用ref。*

## Refs 3种使用方式（字符串、回调refs、creatRef()）

字符串、回调refs、creatRef() 这三种ref方法比较：

### 1. 不要再使用字符串方式。

因为string类型的refs存在一些问题，该方式**已被官方deprecate**了。使用模式是定义"textInput"名称，通过 this.refs.textInput 来访问 DOM 节点。

### 2. 函数式回调refs

回调refs **可以方便的监听组件、dom的销毁和重建**，在一些条件渲染中非常有用。但是使用很繁琐，需要定义函数，定义绑定实例变量。

```tsx
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.setTextInputRef = element => {
            this.textInput = element;
        };

        this.focusTextInput = () => {
            // 使用原生 DOM API 使 text 输入框获得焦点
            if (this.textInput) this.textInput.focus();
        };
    }

    componentDidMount() {
        // 组件挂载后，让文本框自动获得焦点
        this.focusTextInput();
    }

    render() {
        // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
        // 实例上（比如 this.textInput）
        return (
            <div>
                <input type="text" ref={this.setTextInputRef} />
            </div>
        );
    }
}
```

### 3. react16.3新增的createRef()方式

- 使用**更加简洁**方便，但是**没有监听组件重建和销毁的能力**。
- ref 的值根据节点的类型而有所不同：
    - 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
    - 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
    - **你不能在函数组件上使用 ref 属性，因为他们没有实例**。
- 注意要通过 "current" 来访问 DOM节点 或 类组件实例。
    - DOM节点 绑定 ref
    ```tsx
    class CustomTextInput extends React.Component {
        constructor(props) {
            super(props);

            // 创建一个 ref 来存储 textInput 的 DOM 元素
            this.textInput = React.createRef();

            this.focusTextInput = this.focusTextInput.bind(this);
        }

        focusTextInput() {
            // 直接使用原生 API 使 text 输入框获得焦点
            // 注意：我们通过 "current" 来访问 DOM 节点
            this.textInput.current.focus();
        }

        render() {
            // 告诉 React 我们想把 <input> ref 关联到
            // 构造器里创建的 `textInput` 上
            return (
                <div>
                    <input type="text" ref={this.textInput} />
                </div>
            );
        }
    }
    ```
    - 类组件 绑定 ref
    ```tsx
    // CustomTextInput必须是类组件，不能是函数组件
    class AutoFocusTextInput extends React.Component {
        constructor(props) {
            super(props);
            this.textInput = React.createRef();
        }

        componentDidMount() {
            this.textInput.current.focusTextInput();
        }

        render() {
            return (
                <CustomTextInput ref={this.textInput} />
            );
        }
    }
    ```

综上，应该根据具体需求选择 函数回调refs 与 createRef() 方式。

## Refs 转发（forwardRef()）

有一些场景下，我们在父组件中可能希望能访问子组件中的dom或者节点。`forwardRef` 就是用来**将父组件的ref传递给子组件**。这样我们在对该组件添加ref时，将可以直接获取到其内部的dom节点，或者任意我们希望对方能获取到的值！！

在之前版本中，我们可以通过props将ref callback或者createRef实例传递给子组件方式来变相实现forawardRef效果（**本质上就是类似props回调传值**）。或者通过findDOMNode()来对指定的组件实例获取其渲染的dom节点。这种用法只能获取到dom引用。

### 使用
使用 `FancyButton` 的组件可以获取底层 `DOM节点 button的ref` ，并在必要时访问，就像其直接使用 DOM button 一样：
```tsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
逐步解释：
1. 通过调用 `React.createRef` 创建了一个 React `ref` 并将其赋值给 `ref` 变量。
2. 通过指定 `ref` 为 **JSX属性**，将其向下传递给 `<FancyButton ref={ref}>`。
3. React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其**第二个参数**。
4. 向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 **JSX 属性**。
5. 当 `ref` 挂载完成，`ref.current` 将指向 `<button> DOM节点`。

### 在 高阶组件HOC 中转发ref

注意**在高阶组件传递props的动作中，refs将不会透传下去**。`这是因为 ref 不是 prop 属性。就像 key 一样，其被 React 进行了特殊处理`。如果你对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。

此时，可以使用 **React.forwardRef** 明确地将 `refs作为常规prop属性传递给包裹组件`，`然后此ref就可以被挂载到被包裹的内部子组件上了`。
```tsx
function logProps(Component) {
  class LogProps extends React.Component {
    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

## 参考链接

[Refs and the Dom](https://reactjs.org/docs/refs-and-the-dom.html)

[Refs 转发](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
