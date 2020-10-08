# 3、React-Redux 与 Hooks API

## Hooks API

React 16.8开始提供的官方Hooks如下：
- 基础Hook：
    - useState
    - useEffect
    - useContext
- 额外的Hook：
    - useReducer
    - useCallback
    - useMemo
    - useRef
        - 返回的ref对象在组件的整个生命周期内保持不变
    - useImperativeHandle
        - 与forwardRef一起使用，使用ref时，自定义暴露给父组件的实例值
    - useLayoutEffect
        - 函数签名与useEffect是完全一样的
        - 只有一点不同：useLayoutEffect中执行订阅subscribe
    - useDebugValue

之前大部分都涉及到了，这里补充使用两个useReducer、useLayoutEffect。

### useReducer
```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
`useReducer` 是 useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。(如果你熟悉 Redux 的话，就已经知道它如何工作了。)
- 第三个参数init，是用来修改第二个参数initialArg的
- 那useState与useReducer如何取舍呢？
    - 单一state使用useState
    - state的改变规则比较复杂时，就使用useReducer，通过reducer来管理state的变化规则

*题外话：为什么要用数组 const [state, dispatch] = useXXX，而不是对象解构呢？因为数组形式只与顺序有关，方便改名，而对象解构必须保持名字一致。*

### useLayoutEffect 与 useEffect

useLayoutEffect要结合useEffect来比较学习。

首先明确一点：**在函数体内**，即组件主体内(这里指在 React 渲染阶段)，改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含**副作用的操作都是不被允许的**，因为这可能会影响之后的return渲染，产生莫名其妙的 bug 并破坏 UI 的一致性。这也是为什么，在Hooks出现之前，函数式组件没有大量被运用的原因之一，即函数式组件没有生命周期，如果直接写在函数体内，异步副作用延迟执行时，已经return渲染了。

- `useEffect`：useEffect(didUpdate)，接收一个包含命令式、且可能有副作用代码的函数。
    - 使用 useEffect 完成副作用操作。赋值给 useEffect 的函数**会在组件渲染到屏幕`之后延迟执行`**。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。
    - 默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它在只有某些值改变的时候才执行。
        - 因此，设置不同的依赖数组，可以分别模拟didMount、didUpdate、willUnMount
- `useLayoutEffect`：其函数签名与 useEffect 相同。
    - 但它**会在所有的 DOM 变更之后`同步调用`effect**。
    - 可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
    - 尽可能使用标准的 useEffect 以避免阻塞视觉更新。


## React-Redux

Redux 官方提供的 React 绑定库。具有高效且灵活的特性。React-Redux 一般会和 Redux 一起使用，但它并不是 Redux 内置，需要单独安装。

之所以需要React-Redux，是因为如果每次都需要引入store，getState，dispatch，subscribe的话，开发起来非常麻烦，想用更react的方式来写，就需要React-Redux的支持。

React-Redux是一个桥梁，更方便的使用 Redux。


### Provider 与 connect

- **Provider 为后代组件提供store**：`<Provider store={store}>`使组件层级中的`connect()`方法能够获得Redux store。正常情况下，你的根组件应该嵌套在`<Provider>`中才能使用`connect()`方法。
- **connect 为组件提供数据和变更方法**：`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`，连接React组件与Redux store，返回一个新的已与Redux store连接的组件类。
    ::: details 参数
    - [mapStateToProps(state, [ownProps]): stateProps] (Function):
        - 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
        - 如果定义该参数，组件将会监听 Redux store 的变化，否则不监听。
        - ownProps是当前组件自身的props，如果指定了，那么只要组件接收到新的 props，就会被调用，mapStateToProps 都会被重新计算，mapDispatchToProps 也会被调用。注意性能!
    - [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function):
        - 如果你省略这个参数，默认情况下，dispatch也会注入到你的组件 props中。
        - 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator的返回值作为参数执行。这些属性会被合并到组件的 props 中。
        - 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象。
        - ownProps是当前组件自身的props，如果指定了，那么只要组件接收到新的 props，mapDispatchToProps 就会被调用。注意性能!
    - [mergeProps(stateProps, dispatchProps, ownProps): props] (Function):
        - 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。如果你省略这个参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。
    :::

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/";

// 把Provider放在根组件外层，使子组件能获得store
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```
```js
// ReactReduxPage.js
import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

@connect(
    // 1、mapStateToProps 返回function，把state放到props上一份
    // ({count}) => ({count}),
    state => {
        return { count: state.count };
    },

    // 2、mapDispatchToProps 返回object|function 把dispatch放到props上一份，如果省略这个参数，dispatch默认也会注入到你的组件props中
    // - object形式
    {
        add: () => ({ type: "ADD" }),
        minus: () => ({ type: "MINUS" })
    }
    // // - function形式
    // dispatch => {
    //     const add = () => dispatch({type: "ADD"})
    //     const minus = () => dispatch({type: "MINUS"})

    //     return {dispatch, add, minus}
    // }
    // // - 使用bindActionCreators
    // dispatch => {
    //   let creators = {
    //     add: () => ({type: "ADD", payload: 100}),
    //     minus: () => ({type: "MINUS", payload: 100})
    //   };

    //   creators = bindActionCreators(creators, dispatch);

    //   return {dispatch, ...creators};
    // }
    // 3、mergeProps 返回function，合并所有props
    // (stateProps, dispatchProps, ownProps) => {
    //   return {
    //     // ...stateProps,
    //     // ...dispatchProps,
    //     // ...ownProps,
    //     omg: "omg"
    //   };
    // }
)
class ReactReduxPage extends Component {
    render() {
        const { count, dispatch, add, minus } = this.props;

        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>
                <button onClick={() => dispatch({ type: "ADD", payload: 100 })}>
                    dispatch add
        </button>
                <button onClick={add}> add</button>
                <button onClick={minus}> minus</button>
            </div>
        );
    }
}
export default ReactReduxPage;
```


### React-Redux 中的 hook API：useSelector 与 useDispatch

- `useSelector`：获取store state
- `useDispatch`：获取dispatch
```js
// ReactReduxHookPage.js
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ReactReduxHookPage(props) {
    const count = useSelector(({ count }) => count);
    const dispatch = useDispatch();

    const add = useCallback(() => {
        dispatch({ type: "ADD" });
    }, []);

    return (
        <div>
            <h3>ReactReduxHookPage</h3>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    );
}
```

## 原理实现

### bindActionCreator（Redux中提供）
```js
function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    let obj = {};

    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }

    return obj;
};
```


### Provider、connect
::: tip 有类似 forceUpdate 的东西吗？
如果前后两次的值相同，useState 和 useReducer Hook 都会放弃更新。原地修改 state 并调用 setState 不会引起重新渲染。

**注意**：这与类组件中不同。
- `类组件`中setState`不管`前后两次state是否相同，`都会执行更新`。
- 而`函数式组件`中，`相同就会放弃更新`。

通常，你不应该在 React 中修改本地 state。然而，作为一条出路，你可以用一个增长的计数器来在 state 没变的时候依然强制一次重新渲染：
```js
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

function handleClick() {
    forceUpdate();
}
```
可能的话尽量避免这种模式。
:::

```js
import React, { useLayoutEffect, useReducer } from 'react';

const Context = React.createContext();
export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

// mapStateToProps: function
// mapDispatchToProps: object|function
export const connect = (mapStateToProps = state => state, mapDispatchToProps) => WrappedComponent => props => {
    // 获取store
    const store = React.useConnect(Context);
    const { dispatch, getState, subscribe } = store;

    // todo 给新返回的组件的props上加上store state 和 dispatch，这个dispatch不是特指dispatch方法
    const stateProps = mapStateToProps(getState());

    // 默认dispatchProps
    let dispatchProps = {
        dispatch
    }
    if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    } else if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    }

    // hook中获取forceUpdate
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // 这里不用useEffect
    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            // 执行组件更新 forceUpdate
            forceUpdate();
        })

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [store])

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
}
```
::: danger 为什么用useLayoutEffect而不用useEffect
如果用useEffect，它中的副作用函数执行，发生在组件渲染之后延迟执行，延迟，代表两件事中间有一小段间隙（渲染 _间隙_ 订阅）。这里副作用函数执行的是订阅，如果渲染到订阅之间的间隙，store state发生了改变，那么订阅就不准确了，所以这里应该用useLayoutEffect，在渲染前，同步执行订阅。
```js
useEffect(() => {
    const unsubscribe = subscribe(() => {
        // 执行组件更新 forceUpdate
        forceUpdate();
    })

    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    }
}, [store])
```
:::




