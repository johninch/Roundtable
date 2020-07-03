# React Hooks 概述

Hooks本质上就是一类特殊的函数，它们可以为你的函数型组件（function component）注入一些特殊的功能。

这些hooks的目标就是让你不再写class，让function一统江湖。

钩子 | 用法 | 作用
|:-- |:-- |:-- |
useState | const [state, changeState] = useState(initialValue) | 用于生成状态以及改变状态的方法
useEffect | useEffect(fn, [...relativeState]) | 用于生成与状态绑定的副作用
useContext | useContext(MyContext) | 用于接收context对象并返回当前值
useReducer | const [state, dispatch] = useReducer(reducer, initialArg, init) | useState的变体，类似于redux
useCallback | useCallback(fn, [...relativeState]) | 用于生成与状态绑定的回调函数
useMemo | useMemo(fn, [...relativeState]) | 用于生成与状态绑定的组件/计算结果
useRef | const newRef = useRef(initialValue) | 用于 获取节点实例 / 数据保存

## 为什么要搞一个Hooks
### 1、复用一个有状态的组件太麻烦

class的组件，它们本身包含了状态（state），所以复用这类组件就变得很麻烦。官方推荐怎么解决这个问题呢？答案是：**渲染属性（Render Props）** 和 **高阶组件（Higher-Order Components）**。

以上这两种模式看上去都挺不错的，很多库也运用了这种模式，比如我们常用的 React Router。但我们仔细看这两种模式，会发现它们会增加我们代码的层级关系。最直观的体现，打开devtool看看你的组件层级嵌套是不是很夸张吧。但使用 hooks，没有多余的层级嵌套。把各种想要的功能写成一个一个可复用的自定义hook，当你的组件想用什么功能时，直接在组件里调用这个hook即可。

### 2、生命周期钩子函数里的逻辑太乱
我们通常希望一个函数只做一件事情，但我们的生命周期钩子函数里通常同时做了很多事情，有时候在不同的钩子中还会写同样的事情。

### 3、class 的使用让人困惑
绑定this的指向问题很麻烦，而无状态function组件由于需求变动需要有自己的state时，还需要将function组件改成class组件，很麻烦。

## useState
```jsx
import { useState } from 'React';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
声明了一个状态变量count，把它的初始值设为0，同时提供了一个可以更改count的函数setCount。

数组解构实际上是一件开销很大的事情，用下面这种写法，或者改用对象解构，性能会有很大的提升。
```js
let _useState = useState(0);
let count = _useState[0];
let setCount = _useState[1];
```

### 如何记住之前的状态
> function component 本质上也是一个普通的函数，而普通函数中声明的变量，当函数运行完成后，变量就销毁了（不考虑闭包等情况），那为什么它可以记住之前的状态呢？

React是通过 类似单链表形式的memoizedStates变量，通过 next 按顺序串联所有的 hook的：
```js
type Hooks = {
	memoizedState: any, // 指向当前渲染节点 Fiber
  baseState: any, // 初始化 initialState， 已经每次 dispatch 之后 newState
  baseUpdate: Update<any> | null,// 当前需要更新的 Update ，每次更新完之后，会赋值上一个 update，方便 react 在渲染错误的边缘，数据回溯
  queue: UpdateQueue<any> | null,// UpdateQueue 通过
  next: Hook | null, // link 到下一个 hooks，通过 next 串联每一 hooks
}
 
type Effect = {
  tag: HookEffectTag, // effectTag 标记当前 hook 作用在 life-cycles 的哪一个阶段
  create: () => mixed, // 初始化 callback
  destroy: (() => mixed) | null, // 卸载 callback
  deps: Array<mixed> | null,
  next: Effect, // 同上 
};
```

useState是可以多次调用的，useState接收的初始值既可以是简单数据类型，也可以接收对象或者数组作为参数：
```js
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

::: danger 注意：状态更新方式的不同
**this.setState()**做的是**合并**状态后返回一个新状态，而**useState**是直接**替换**老状态后返回新状态。
:::

hook的“形态”类似被否定掉的Mixins方案：都是提供一种「插拔式的功能注入」的能力。而mixins之所以被否定，是因为Mixins机制是**让多个Mixins共享一个对象的数据空间**，这样就**很难确保不同Mixins依赖的状态不发生冲突**。但Hook是使用在function中的，且每一个hook都是相互独立的，不同组件调用同一个hook也能保证各自状态的独立性。


### React是怎么保证多个useState的相互独立的？

React当中使用 memoizedStates数组，来解决 Hooks 的复用问题。
- 初次渲染时，React根据useState出现的顺序，依次将相互独立的state收集到memoizedStates当中，保证多个useState间的相互独立。
- 更新的时候，按照顺序，从 memoizedStates 中把上次记录的值拿出来。因此，React规定我们**必须把hooks写在函数的最外层**，**不要写在循环、条件语句当中，也不要在子函数中调用**，从而确保hooks的执行顺序一致（显然，memoizedStates 数组是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedStates 并不会感知到，就会错误匹配更新，造成错误）。
也就是说，多个hook，共享同一个 memoizedStates，共享同一个状态顺序。

*以上原理同样适用于 useEffect。*

## useEffect

### 什么是useEffect
```js
useEffect(callback [, deps]);
```
useEffect是用来处理副作用函数的。它以一抵三（componentDidMount、componentDidUpdate、componentWillUnmount），在使用中合理的做法是，给每一个副作用一个单独的useEffect钩子。关键点如下：
1. **频率**：react的每次渲染，都会调用传给useEffect的副作用函数。
2. **时机**：当react要渲染时，会先记住useEffect中的副作用函数，等react更新DOM之后，它才会依次地执行我们所定义的副作用函数。
3. **异步**：useEffect中的副作用函数是异步执行的（不会阻碍浏览器更新视图），而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。这种安排对大多数副作用说都是合理的（*但也有特殊情形，比如我们有时候需要先根据DOM计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生*）。

### 副作用函数callback的执行次数
副作用函数callback的执行有如下3种情况：
1. 如果 deps 不存在，那么 callback 每次 render 都会执行；
2. 如果 deps 存在，只有当它发生了变化，callback 才会执行；
3. 如果 deps 为[]，则只在 首次render 后执行；

#### 1、为什么不传deps时，副作用函数每次组件render都执行

考虑在类组件的模式下，如果在副作用函数中依赖的状态改变后，就需要在 componentDidUpdate 中清除之前的注册，并重新注册。而useEffect每次组件更新后都会重新执行一遍，则不会有上述问题。
::: details 副作用函数依赖改变，需componentDidUpdate清除注册和重新注册
```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  // 比如 props.friend.id 改变了，就需要：
  componentDidUpdate(prevProps) {
    // 先把上一个friend.id解绑
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 再重新注册新但friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
:::


#### 2、跳过副作用函数
useEffect的第二个参数deps依赖列表，**只有当deps的值发生`改变`时**，才执行我们传的副作用函数（第一个参数）。
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句
```

#### 3、只在首次渲染执行一次
当第二个参数传**空数组[]**时，则相当于只有`componentDidMount`，副作用函数**只在首次渲染的时候执行**。这是因为deps依赖列表一直不变化，callback 不会二次执行。（*不过这种用法可能带来bug，少用*）。


### useEffect解绑副作用
- 场景：避免内存泄漏，在componentDidMount注册，就需要在componentWillUnmount中，也就是组件被注销之前清除掉我们添加的注册。
- 方法：使useEffect的副作用函数A返回一个清理函数B即可。
    ```js
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });
    ```
- 注意：
    1. 返回的这个清理函数B，将会在组件下一次重新渲染之后，在副作用函数A之前执行；
    2. 与componentWillUnmount只会在组件销毁前执行一次不同的是，副作用函数A及其可选的清理函数B在每次组件渲染都会执行。


### 自定义的 Effect Hooks

所谓的自定义hook，就是把可以复用的逻辑抽离出来，变成一个个可以随意插拔的“插销”，哪个组件要用，就插进哪个组件里。
```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## useContext
```js
const value = useContext(MyContext);
```
- useContext(MyContext) 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。
- 接收一个 context 对象（React.createContext 的返回值），并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。
- useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件提供 context。
- 当组件上层最近的 `<MyContext.Provider> `更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

## useReducer
useReducer 类似于 redux 中的功能，相较于 useState，它**更适合一些逻辑较复杂且包含多个子值**，**或者下一个 state 依赖于之前的 state** 等等的特定场景，useReducer 总共有三个参数：
```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
- 第一个参数是 一个 **reducer**，就是一个函数类似 `(state, action) => newState` 的函数，传入 上一个 state 和本次的 action；
- 第二个参数是 **初始state**，也就是默认值，是比较简单的方法；
- 第三个参数是 **惰性初始化**，这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为对重置 state 的 action 做处理提供了便利。

```jsx
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## useCallback
```js
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```
返回一个 **memoized 回调函数**。`useCallback(fn, deps) 相当于 useMemo(() => fn, deps)`。

- 用于对不同 useEffect 中存在的相同逻辑的封装，减少代码冗余，配合 useEffect 使用。
- 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

::: tip useMemo与useCallback的唯一区别
useMemo 和 useCallback 几乎是99%相似的，`useCallback(fn, deps) 相当于 useMemo(() => fn, deps)`。

他们的唯一区别就是：**useCallback是根据依赖(deps)缓存第一个入参的(callback)。useMemo是根据依赖(deps)缓存第一个入参(callback)执行后的值**。
:::

## useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
返回一个 **memoized 值**。

- 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

::: danger useMemo不要包含副作用
记住，传入 useMemo 的函数会在**渲染期间执行**，这与useEffect在渲染之后执行不同。因此，不要在 useMemo 内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。
:::

## useRef
```js
const refContainer = useRef(initialValue);
```
- useRef 返回一个 **可变的 ref 对象**，其 **.current** 属性被初始化为传入的参数（initialValue）。本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。
- 返回的 ref 对象在组件的整个生命周期内保持不变。
- 使用场景：
    - 可以用于 DOM refs。
    ```jsx
    function TextInputWithFocusButton() {
        const inputEl = useRef(null);
        const onButtonClick = () => {
            // `current` 指向已挂载到 DOM 上的文本输入元素
            inputEl.current.focus();
        };
        return (
            <>
                <input ref={inputEl} type="text" />
                <button onClick={onButtonClick}>Focus the input</button>
            </>
        );
    }
    ```
    - 一个属性容器，类似于 class 的实例属性，ref 对象是一个 current 属性可变且可以容纳任意值的通用容器。
    ```jsx
    function Timer() {
        const intervalRef = useRef();

        useEffect(() => {
            const id = setInterval(() => {
                // ...
            });

            intervalRef.current = id;
            return () => {
                clearInterval(intervalRef.current);
            };
        });

        // ...
    }
    ```


## 参考链接：
- [30分钟精通React Hooks](https://juejin.im/post/5be3ea136fb9a049f9121014#heading-6)
- [React Hooks 原理](https://github.com/brickspert/blog/issues/26)
