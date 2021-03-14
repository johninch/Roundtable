# React Hooks + Context 作状态管理（useContext + useReducer）

![context-vs-redux](./images/context-vs-redux@2x.png)

## 参考文章写在最前（墙裂推荐阅读）

- [[译] Redux vs. React 的 Context API](https://juejin.cn/post/6844903856053157901)
- [原文地址：Redux vs. The React Context API](https://daveceddia.com/context-api-vs-redux/)
- [useContext + useReducer 实现 store-provider](https://codesandbox.io/s/simplecounter-n4rwt?file=/src/store-provider.js)
- [使用 React Context API 和 Hooks 实现全局状态管理和【性能优化（避免只调用 dispatch 的组件重渲）】](https://sanonz.github.io/2020/state-management-and-performance-optimization-for-react-context-api-with-hooks/)
- [如何解读 react 16.3 引入的新 context api？(老的 context api 的两大致命缺陷) - 知乎](https://www.zhihu.com/question/267168180/answer/319754359)
- [React Hooks + Context 作状态管理，能否取代 Redux？ - 知乎](https://www.zhihu.com/question/335901795/answer/759025502)

## Context API 的进化

### 旧的 Context API 的缺点

- 1. **旧的 Context API 破坏了【分形架构】**
  - Context 作为一个实验性质的 API，直到 React v16.3.0 版本前都一直不被官方所提倡去使用，其主要原因就是因为`在子组件中使用 Context 会破坏 React 应用的分形架构`。
  - 这不利于代码解耦，违背了 react 的思想。

> 【分形架构】：Context 作为一个实验性质的 API，直到 React v16.3.0 版本前都一直不被官方所提倡去使用，其主要原因就是因为在子组件中使用 Context 会破坏 React 应用的。但如果根组件树中有任意一个组件使用了支持 props 透传的 Context API，那么如果把包含了这个组件的子组件树单独拿出来，因为缺少了提供 Context 值的根组件树，这时的这个子组件树是无法直接运行的。

- 2. **值更新后可能被中间组件【截断透传】**

  - 在 Context 值更新后，顶层组件向目标组件 props 透传的过程中，如果中间某个组件的 SCU 函数返回了 false，因为无法再继续触发底层组件的 rerender，新的 Context 值将无法到达目标组件。这样的不确定性对于目标组件来说是完全不可控的，也就是说目标组件无法保证自己每一次都可以接收到更新后的 Context 值。

- 3. **用法很奇怪**
  - 使用 旧 Context API 的方法非常不 React，目标组件中的 this.context 非常 magic，顶层组件中 getChildContext() 也与 React 本身所推崇的声明式写法背道而驰。

### 新的 Context API 的优缺点

```
useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
```

- [新的 Context API](https://github.com/facebook/react/pull/11818) 采用`声明式的写法`，并且`可以透过 SCU 返回false 的组件`继续向下传播，以保证目标组件一定可以接收到顶层组件 Context 值的更新，一举解决了现有 Context API 的两大弊端，也终于成为了 React 中的第一级（first-class）API。

- 不过新的 Context API，Consumer 取值依然需要在对应 Context.Provider 的作用域下，因此依然是破坏【分形架构】的。

## useContext + useReducer 做状态管理器

> 请注意：即使在官方示例中，也只提倡用 context 保存 主题色，国际化语言标识 等不会经常变化的全局状态。所以使用 Context 做全局状态管理当前看来还不能完全替代 Redux 和 mobx 等真正意义上的状态管理器。

> 但对于简单应用，这样用完全没有问题。[store-provider](https://codesandbox.io/s/simplecounter-n4rwt?file=/src/store-provider.js)

### 如何使用？

```jsx
// index.js
import React from "react";
import { render } from "react-dom";
import { StoreProvider } from "./store-provider";
import Counter from "./counter";
import StateView from "./state-view";

const App = () => (
	<StoreProvider>
		<Counter />
		<StateView />
	</StoreProvider>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

```jsx
// store-provider.js
import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
	counter: 0
};

function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case "COUNTER_INC":
			return { ...state, counter: state.counter + 1 };
		case "COUNTER_DEC":
			return { ...state, counter: state.counter - 1 };
		case "COUNTER_RESET":
			return { ...state, counter: 0 };
		default:
			return state;
	}
}

const DispatchContext = createContext(null);
const StoreContext = createContext(null);

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, defaultState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{props.children}
		</StoreContext.Provider>
	);
}

export const useStore = () => useContext(StoreContext);
```

```jsx
// counter.js
import React from "react";
import { useStore } from "./store-provider";

export default function Counter() {
	const { state, dispatch } = useStore();

	return (
		<section className="counter">
			<div className="count">{state.counter}</div>
			<div className="buttons">
				<button onClick={() => dispatch({ type: "COUNTER_INC" })}>
					Increment
				</button>
				<button onClick={() => dispatch({ type: "COUNTER_DEC" })}>
					Decrement
				</button>
				<button onClick={() => dispatch({ type: "COUNTER_RESET" })}>
					Reset
				</button>
			</div>
		</section>
	);
}
```

```jsx
import React from "react";
import { useStore } from "./store-provider";

export default function StateView() {
	const { state } = useStore();
	const json = JSON.stringify(state, null, 2);

	return (
		<section className="state-view">
			<h2>App State</h2>
			<pre>
				<code>{json}</code>
			</pre>
		</section>
	);
}
```

### 性能优化？

有个很明显的问题是：**【无意义的重渲】**。

- 在实际开发中，我们可能会在很多组件中使用 const [, dispatch] = useStore() 这种方式，只是使用了 useStore() 的 dispatch 方法，`React 的机制是只要有组件调用了 useStore() 钩子，state 变化时此组件都会重绘，和是否使用 state 没有关系`。而组件 A 只是触发状态更新，而不使用状态，所以是不应该重渲的。
- **优化方式**：

```diff js
    import React, { createContext, useReducer, useContext } from 'react';

    const initialState = {count: 0};

    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }

-   const Context = createContext();

-   function useStore() {
-     return useContext(Context);
-   }

+   const StateContext = createContext();
+   const DispatchContext = createContext();

+   function useStateStore() {
+     return useContext(StateContext);
+   }

+   function useDispatchStore() {
+     return useContext(DispatchContext);
+   }

    function StoreProvider({ children }) {
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
-       <Context.Provider value={[state, dispatch]}>
-         {children}
-       </Context.Provider>
+       <StateContext.Provider value={state}>
+         <DispatchContext.Provider value={dispatch}>
+           {children}
+         </DispatchContext.Provider>
+       </StateContext.Provider>
      );
    }

-   export { useStore, StoreProvider };
+   export { useStateStore, useDispatchStore, StoreProvider };
```

```diff
    import React from 'react';
-   import { useStore } from './store';
+   import { useDispatchStore } from './store';

    function Header() {
-     const [/* state */, dispatch] = useStore();
+     const dispatch = useDispatchStore();

      return (
        <>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
      );
    }

    export default Header;
```

```diff
    import React from 'react';
-   import { useStore } from './store';
+   import { useStateStore } from './store';

    function Footer() {
-     const [state] = useStore();
+     const state = useStateStore();
      console.log('footer udpate');

      return (
        <p>{state.count}</p>
      );
    }

    export default Footer;
```

这样，可以做到只使用 state，和只触发更新，不会无意义的渲染。

### 多个 context 如何使用呢？

- [Apps with many containers](https://github.com/jamiebuilds/unstated-next/issues/10)
- [The best practice to combine containers to have it as "global" state #55](https://github.com/jamiebuilds/unstated-next/issues/55)

你最先想到的应该就是下面这种。来源清晰，其实也没啥问题：

```jsx
<ContainerA.Provider>
	<ContainerB.Provider>
		<ContainerC.Provider>
			<ContainerD.Provider>
				<ContainerE.Provider>
					<ContainerF.Provider>
						<App />
					</ContainerF.Provider>
				</ContainerE.Provider>
			</ContainerD.Provider>
		</ContainerC.Provider>
	</ContainerB.Provider>
</ContainerA.Provider>
```

当然如果你嫌丑，可以用 reduce 封装个 combine 函数：

```jsx
const useA = () => {//...}
const useB = () => {//...}

const composeHooks = (...hooks) => () => hooks.reduce((acc, hook) => ({ ...acc, ...hook() }), {})

const Store = createContainer(composeHooks(useA, useB))

const App = () => (
  <Store.Provider>
    //...
  </Store.Provider>
)
```

## 为什么现在还无法完全替代 redux 和 mobx？

对于 useContext + useReducer，在其基础上为了整体性，业界也有几个比较简单的封装：

- https://github.com/jamiebuilds/unstated-next
- https://github.com/diegohaz/constate

但是其本质都没有解决一个问题：【**如果 context 太多，那么如何维护这些 context**】。也就是说在大量组件通信的场景下，用 context 进行组件通信代码的可读性很差。这个类组件的场景一致，context 不是一个新的东西，虽然用了 useContext 减少了 context 的使用复杂度。

另外，其实还有一个【脏读】的问题：

> [知乎匿名用户回答](https://www.zhihu.com/question/335901795/answer/756082346)。redux 是 dispatch 一个 action，被 reducer 处理，产生一个新的 state，然后通知订阅者，并提供状态拉取接口。（getState 对 state 惰性求值或者是异步求值，也可以利用指针，总之就是 getState 总是能得到最新的状态）react 里的 useReducer 返回一个 dispatch，接受一个 action，被 reducer 处理得到新的 state 然后传给 setState 并执行，setState 执行会调用 ReactDispatcher，从当前 hook fiber 开始向后遍历所有 fiber，并执行每个 hook fiber 节点的实例，得到 hook fiber 的 children fibers，然后 reconcile、链接 alternate、标记 effectTag、向上链接 effectFiberList、最后 commit...。这个过程中执行 hook fiber 的实例就相当于通知订阅者，hook fiber 的实例（instance）就是你的函数组件！所以，目前的 react 距离 redux 只差一个全局状态共享，显然就是 context，可以使用 createContext 定义一个全局 state，在 reducers 执行后，将新的全局 state 赋值给 context（可看作一个用于访问全局 state 的指针，其实就是一个对象），然后在函数组件中使用 useContext 访问 context 指针，拿到全局 state。这样基本实现了 redux 的核心 feature。

> 比较难解决的是 thunk，redux 中在 dispatch 执行前对 action 做判断，如果是异步 action 则传入 middlewareAPI 并执行，如果是同步 action 则立即 dispatch。react 中的 dispatcher 是一个用于启动 performWork 的 scheduler（用于安排调度任务到任务队列）。redux 的 dispatch 是原子操作，只有当所有 reducers 执行完毕才会通知订阅者进行下一步操作（redux 理念中 reducers 是纯函数，subscriptions 是副作用），确保 getState 不会脏读 state，但是 react 是吗？`ReactDispatcher 执行单元是一个 fiber，每个 hook fiber 实例（使用了 useReducer）执行 reducer 后进行 setState 操作，组件实例执行的同时也等于通知订阅，它并不会关心（或者等）其他组件是否执行完毕，也就是在 reducers 没有全部执行完就去读全局 state，造成脏读`。（如果此时往全局 state 写入新值就更加错误了，也可以说没有保证事务隔离。）这也是 concurrent 并发调度模式所存在的难题。所以，既然难以保证 IO 操作拥有足够的隔离性，所以可以使用惰性求值（或者异步）来进行 IO 操作，即将所有组件 pure 纯化（访问全局 context 就不纯），将所有 IO 操作推迟到纯函数执行之后。譬如 ReactDOM.render 的第三个参数表示在一次完整的 render 之后执行一次操作，此时进行副作用 IO。

> 总之，全局变量共享是一个复杂的问题，在并发访问时尤为突出。不过只要保证组件足够纯，再隔离副作用就好了。纯函数的优势就是并发，副作用 IO 可以交给异步任务队列执行，或者是用 Monad 来处理 IO，保证 IO 操作次序，IO 操作是需要保证先后顺序的，纯函数不需要。扯的有点远，总之，如果是 createContext 然后 useContext 再立即重写 context，肯定有问题。（如果 context 写入顺序不会因为并发调度机制打乱的话，应该也行..吧，不过你要保证是“读已提交”，知道哪些操作已经提交哪些还在等待执行。）
