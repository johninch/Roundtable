# React未归类知识点补充

## 什么叫做react「单向数据流」？

**“自上而下数据流”或是“单向数据流”**：即规范了数据的流向——由外层组件向内层组件进行传递和更新。任何的 state 总是所属于特定的组件，该组件只能通过props将数据状态state传递给子组件，不能由子组件向父组件传递数据，不能向上修改父组件的数据，也不能在自身组件中修改props的值。

React的编程思想是严谨且周密的，它约束了我们的花式操作，使应用中的数据流更加清晰易懂，确保我们在使用react构建复杂项目的时候不会出现太多问题。

另外，Vue在不同组件间也是强制使用“单向数据流”的。React、Vue都是单向数据流的框架。

### 为什么要限定 单向数据流？

几乎所有框架都是通过props往内层组件传参(props本质是函数执行的参数)，我们先考虑下函数传参的情形：
- 当往一个函数内传递复杂数据类型（对象参数），如果在这个函数里修改了这个对象，那么函数外的对象也是会随着改动的(因为本质是一个内存里的东西)；
- 类比到react当中组件间的数据传递，父组件的数据通过props传递给子组件，而子组件里更新了props，导致父组件更新。毫无疑问，这是会 **导致数据紊乱的、不可控的**操作。
因此绝大多数框架在这方面做了处理。

当然，除了使用props一层层往下传，react还提供了`context`，方便进行组件间的隔代通信，但react官方并不提倡使用。

###  如何在react中实现逆向通信？（子组件向父组件方向通信）

通过在父组件中定义方法，通过props参数将该方法传递给子组件，子组件调用这个方法并且把自己的data作为参数，那么父函数就可以通过形参拿到了子组件传来的data了。这样的逆向通信，实际`也是符合单向数据流`的概念，无非就是把函数当做参数传递下去而已。

另外，除开上面的 **"父组件中定义函数传递给子组件并被其调用"**，还可以使用 Refs，父组件也可以轻松拿到子组件的所有属性和方法。


参考链接：[React精讲(一):单向数据流](https://www.bbsmax.com/A/Vx5MvM1LdN/)


## react官方为什么不实现双向绑定？react中如何实现双向绑定？

传送门：[双向绑定原理](/Question-Bank/MVVM/mvvm-base.html#双向绑定原理)

React的目标从来不是“让开发者写更少的代码”，而是让“代码结构更加清晰易于维护”，因此官方一直提倡`单向数据流的思想`，`推崇函数式，摈弃副作用`，所以没有实现双向绑定。

React的工作逻辑是：state变化就会执行render，这时需要你自己处理数据结构，完成绑定，更自由地渲染view。而view value的变化除了自己监听view事件，没有其他方式能够捕获这个变化了，因此，如果要react要实现双向绑定，只能在view上监听你需要的事件（绑定onChange事件），自由的决定要不要更新state，更新哪些state（通过setState()方法），此时就形成了闭环，state变化了又是新一轮的render。

## 什么是react组件的状态提升（Lifting State Up）

在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。当多个组件需要反映相同的数据源变化时，建议将共享状态提升到最近的共同父组件中去。形成「自上而下的数据流」。

## React 中的 Fragment
在React中，render()函数中返回的所有元素需要包裹在一个"根"元素里面，以前我们选择用一个`<div>`来包裹，但这回添加无意义的额外标签，而`React.Fragment组件`能够**在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素**：
```jsx
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
也可以使用其**简写语法** `<></>`。

## 简述react-redux中的Provider和connect的作用？

React-Redux 将所有组件分成两大类：UI组件（纯组件，没有状态，只由props参数提供数据）和容器组件（管理数据和处理业务逻辑，有内部状态）。

使用Redux和React应用连接时，需要使用react-redux提供的Provider和connect：
- connect：用于从 UI 组件生成容器组件，负责将store state注入容器组件，并选择特定状态作为容器组件props传递；
    ```jsx
    import { connect } from 'react-redux'

    const ContainerComponent = connect(
        mapStateToProps,
        mapDispatchToProps
    )(UIComponent)

    ```
- Provider：负责将Store注入React应用，让容器组件拿到state对象（它的原理是React的context属性）；
    ```jsx
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import todoApp from './reducers'
    import App from './components/App'

    let store = createStore(todoApp);

    render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('root')
    )
    ```

对于Mobx而言，同样需要两个步骤：
- Provider：使用mobx-react提供的Provider将所有stores注入应用；
- 使用inject将特定store注入某组件，store可以传递状态或action；然后使用observer保证组件能响应store中的可观察对象（observable）变更，即store更新，组件视图响应式更新。


## Context对象

Context 是解决react自上到下通过组件传递数据时，跨组件传递非常麻烦不便的问题。Context 可以让我们无须明确地传遍每一个组件，就能将值“广播式”地深入传递进组件树。

新版本ContextAPI：React.createContext、Context.Provider、Class.contextType、Context.Consumer、Context.displayName。

- **React.createContext**：创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
    ```jsx
    const MyContext = React.createContext(defaultValue);
    ```
- **Context.Provider**
    ```jsx
    <MyContext.Provider value={/* 某个值 */}>
    ```
- **Class.contextType**：挂载在 class 上的 contextType 属性是一个`静态属性`，会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
    ```jsx
    class MyClass extends React.Component {
        componentDidMount() {
            let value = this.context;
            /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
        }
        componentDidUpdate() {
            let value = this.context;
            /* ... */
        }
        componentWillUnmount() {
            let value = this.context;
            /* ... */
        }
        render() {
            let value = this.context;
            /* 基于 MyContext 组件的值进行渲染 */
        }
    }
    MyClass.contextType = MyContext;

    // -------------- 分割线 -----------------------------

    // 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。
    class MyClass extends React.Component {
        static contextType = MyContext;
        render() {
            let value = this.context;
            /* 基于这个值进行渲染工作 */
            return (
              <div>{value}</div>
            )
        }
    }
    ```
- **Context.Consumer**：在类组件与函数式组件中都可以通过 Consumer 订阅 context，但这需要`函数作为子元素（function as a child）`。这个函数接收当前的 context 值，返回一个 React 节点。
    ```jsx
    <MyContext.Consumer>
      { value => /* 基于 context 值进行渲染*/ }
    </MyContext.Consumer>
    ```
- **Context.displayName**：context 对象接受一个名为 displayName 的 property，类型为字符串。React **DevTools** 使用该字符串来确定 context 要显示的内容。
    ```jsx
    const MyContext = React.createContext(/* some value */);
    MyContext.displayName = 'MyDisplayName';
    ```

使用示例：
```jsx
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 挂载在 class 上的 contextType 属性会被重赋值为被创建的 Context 对象。
  // 这能让你使用 this.context 来消费最近的 Context.Provider。你可以在任何生命周期中访问到它的值，
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

### 三种Context的用法比较

分类 | 特点
|:--|:--|
consumer |	嵌套复杂，Consumer 第一个子节点必须为一个函数，无形增加了工作量
contextType |	只支持 类组件，无法在多 context 的情况下使用
useContext | 一种hooks，不需要嵌套，多 context 写法简单
```jsx
// 创建一个 context
const Context = createContext(0)

// 组件一, Consumer 写法
class Item1 extends PureComponent {
  render () {
    return (
      <Context.Consumer>
        {
          (count) => (<div>{count}</div>)
        }
      </Context.Consumer>
    )
  }
}
// 组件二, contextType 写法
class Item2 extends PureComponent {
  static contextType = Context
  render () {
    const count = this.context
    return (
      <div>{count}</div>
    )
  }
}
// 组件一, useContext 写法
function Item3 () {
  const count = useContext(Context);
  return (
    <div>{ count }</div>
  )
}

function App () {
  const [ count, setCount ] = useState(0)
  return (
    <div>
      点击次数: { count } 
      <button onClick={() => { setCount(count + 1)}}>点我</button>
      <Context.Provider value={count}>
        <Item1></Item1>
        <Item2></Item2>
        <Item3></Item3>
      </Context.Provider>
    </div>
    )
}
```

## react@16.6种的memo方法是做什么的？

React.memo：
- React.memo 作为性能优化的高阶组件。只适用于函数组件，但不适用于 class 组件。
- 说白了 memo 就是函数组件的 PureComponent，用来做性能优化的手段。
- 包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
- 默认情况下其只会对复杂对象做浅层对比，可通过第二个判断函数自定义。
```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

## react@16.6中的lazy方法是做什么的？

React.lazy：
React.lazy 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
```jsx
import React, { Suspense } from 'react';

// 这个组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
渲染 lazy 组件依赖该组件渲染树上层的 `<React.Suspense>` 组件。这是指定加载指示器（loading indicator）的方式。可以将 Suspense 组件置于懒加载组件之上的任何位置。甚至可以用一个 Suspense 组件包裹多个懒加载组件

### 代码分割路由组件
```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```
