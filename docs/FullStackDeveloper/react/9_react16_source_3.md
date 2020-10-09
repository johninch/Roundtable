# 9、react16源码解析3

- [React中文网](https://react.docschina.org/)
- [React源码](https://github.com/facebook/react)
- [Debug React](https://github.com/bubucuo/DebugReact)
- [源码指引](https://www.processon.com/view/link/5dd68342e4b001fa2e0c4697)

## 目录

本章主要讲Hook：
- Hook解决了什么问题
- Hook规则
- Hooks原理
- Hook API

## Hook是什么

- 在不编写class的情况下使用state以及其他的React特性（use all React features without a class）
- 通过自定义hook，在组件间复用状态逻辑（Reuse stateful logic between components）
- 可选的，且100%向后兼容（Opt-in and 100% backwards-compatible）

## Hook解决了什么问题

- **在组件之间复用状态逻辑很难**：react通过比如 render props 和 高阶组件 等方案来重新组织组件结构，但这会很麻烦，使代码难以理解（`props来源不清晰`，且`嵌套`无用层级）。在 React DevTools 观察组件树，会发现其形成了“嵌套地狱”。因此，React 需要为共享状态逻辑提供更好的原生途径。
- **复杂组件变得难以理解**：react通过生命周期，强制将状态逻辑和副作用整合起来，但因为同名生命周期不能重复定义，所以导致不相关逻辑无法解耦，使组件复杂难以理解和维护。因此，React Hook 将组件中相互关联的部分拆分成更小的函数。
- **难以理解的 class**：class是react学习的一大障碍，必须理解this的工作方式。另外，class 不能很好的压缩，并且会使热重载出现不稳定的情况，限制了组件预编译方面的潜能。因此，React Hook 使你在非 class 的情况下可以使用更多的 React 特性。

## Hook规则

- **只在最顶层使用 Hook**。不要在循环，条件或嵌套函数中调用 Hook。
- **只在 React 函数中调用 Hook**。不要在普通的 JavaScript 函数中调用 Hook。你可以：
    - ✅ 在 React 的函数组件中调用 Hook
    - ✅ 在自定义 Hook 中调用其他 Hook

## Hook API

### 基础Hook
- useState
- useEffect
- useContext

### 额外Hook
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect

**上述API在前面的章节中都讲到了，下面会单独拿出 useCallback、useMemo 这两个关于性能优化的Hook来讲述。**

### 自定义Hook

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

**自定义 Hook 是一个函数，其名称以 “use” 开头（必须），函数内部可以调用其他的 Hook。**

```js
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Q：在两个组件中使用相同的 Hook 会共享 state 吗？
A：不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

Q：自定义 Hook 如何获取独立的 state？
A：每次调用 Hook，它都会获取独立的 state。由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect。我们可以在一个组件中多次调用 useState 和 useEffect，它们是完全独立的。

## useMemo和useCallback原理

### useMemo使用

expensive代表高昂开销的计算过程，当add时，因为count变化，expensive重新执行，这是符合预期的。但是，当input输入值变化，触发value改变，而value值改变会导致整个UseMemoPage组件重新执行，所以expensive函数会重新执行，这是不必要的运算。expensive应该只在count变化时才重新执行计算。所以可以使用useMemo包裹expensive，缓存其计算值，只在依赖项count改变时才重新计算。
```js
import React, { useMemo, useState } from 'react';

export default function UseMemoPage(props) {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState("")

    // const expensive = () => {
    //     console.log('执行计算')
    //     let sum = 0
    //     for (let i = 0; i < count; i++) {
    //         sum += i
    //     }

    //     return sum
    // }
    const expensive = useMemo(() => {
        console.log('执行计算')
        let sum = 0
        for (let i = 0; i < count; i++) {
            sum += i
        }

        return sum
        // 只有在count改变时，才重新执行
    }, [count])

    return (
        <div>
            <h3>UseMemoPage</h3>
            {/* <p>expensive:{expensive()}</p> */}
            <p>expensive:{expensive}</p>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onClick={event => setValue(event.target.value)} />
        </div>
    )
}
```

### useMemo原理

::: danger 渲染期间执行
记住，传入 useMemo 的函数会在`渲染期间执行`。请不要在这个函数内部执行与渲染无关的操作，诸如**副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo**。
:::

在ReactFiberHooks.js中：
```js
function mountMemo<T>(
    nextCreate: () => T,
    deps: Array<mixed> | void | null,
): T {
    const hook = mountWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    const nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps]; // 缓存的是value
    return nextValue;
}

function updateMemo<T>(
    nextCreate: () => T,
    deps: Array<mixed> | void | null,
): T {
    const hook = updateWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    const prevState = hook.memoizedState;
    if (prevState !== null) {
        // Assume these are defined. If they're not, areHookInputsEqual will warn.
        if (nextDeps !== null) {
            const prevDeps: Array<mixed> | null = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
            }
        }
    }
    const nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps]; // 缓存的是value
    return nextValue;
}
```

### useCallback使用

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。**当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用**。

这里提到的`引用相等性去避免非必要渲染`，是指类组件中的`SCU`或者`PureComponent`，以及函数组件中的`React.memo`，这些使用`浅比较`来避免不必要的组件重渲的性能优化API。如果不使用useCallback去包裹，那么当callback作为props传递给子组件时，由于callback重新生成导致的引用改变，则这些性能优化API会判定其为props改变，而重新渲染子组件。

```js
import React, { useState, useCallback, PureComponent } from "react";

export default function UseCallbackPage(props) {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    // const addClick = () => {
    //     let sum = 0;
    //     for (let i = 0; i < count; i++) {
    //         sum += i;
    //     }
    //     return sum;
    // };
    const addClick = useCallback(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return (
        <div>
            <h3>UseCallbackPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={event => setValue(event.target.value)} />
            <Child addClick={addClick} />
        </div>
    );
}

// 这里子组件是类组件，使用PureComponent演示，使用SCU或者是函数组件的React.memo是同样的道理
class Child extends PureComponent {
    render() {
        console.log("child 渲染");
        const { addClick } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        );
    }
}
```


### useCallback原理

在ReactFiberHooks.js中：
```js
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
    const hook = mountWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    hook.memoizedState = [callback, nextDeps]; // 缓存的是callback
    return callback;
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
    const hook = updateWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    const prevState = hook.memoizedState;
    if (prevState !== null) {
        if (nextDeps !== null) {
            const prevDeps: Array<mixed> | null = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
            }
        }
    }
    hook.memoizedState = [callback, nextDeps]; // 缓存的是callback
    return callback;
}
```

### useMemo替换useCallback

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

```js
const addClick = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += i;
    }
    return sum;
}, [count]);

// 等价于
const addClick = useMemo(() =>() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += i;
    }
    return sum;
}, [count]);
```

不过不建议这样使用，因为毕竟官方提供了两个，满足各自不同的使用场景。





## Hooks原理

```js
function FunctionComponent(props) {
    const [count, setCount] = useState(0);
    return (
        <div className="border">
            FunctionComponent-{props.name}
            <button
                onClick={() => {
                    count % 2 && console.log("ooo", count); //sy-log
                    setCount(count + 1);
                }}>
                {count}
            </button>
            {count % 2 ? <button>click</button> : <span>omg</span>}
        </div>
    );
}
```
```js
function FunctionalComponent() {
    const [state1, setState1] = useState(1)
    const [state2, setState2] = useState(2)
    const [state3, setState3] = useState(3)
}

hook1 => Fiber.memoizedState
state1 === hook1.memoizedState
hook1.next => hook2
state2 === hook2.memoizedState
hook2.next => hook3
state3 === hook2.memoizedState
```

### 实现useState

```js
// work in progress fiber  （正在执行的fiber）
let wipFiber = null;

export function useState(init) {
    // 上一次的hook，如果存在的话，证明现在是更新阶段
    const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hooksIndex]

    // 定义当前的hook函数
    const hook = {
        state: oldHook ? oldHook.state : init, // 存储当前状态值
        queue: oldHook ? oldHook.queue : [] // 存储要更新的值
    }

    // 模拟批量更新
    hook.queue.forEach(action => (hook.state = action))

    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            node: currentRoot.node,
            props: currentRoot.props,
            base: currentRoot
        }
        nextUnitOfWork = wipRoot;
        deletions = [];
    }

    // 把定义好的hook存入fiber，指向hook的游标往后移动一位
    wipFiber.hooks.push(hook);
    wipFiber.hooksIndex++;

    return [hook.state, setState]
}

function updateFunctionComponent(fiber) {
    // const { type, props } = vnode
    // const vvnode = type(props) // 函数组件直接执行返回虚拟dom

    // const node = createNode(vvnode)
    // return node

    // 初始化hook
    wipFiber = fiber
    wipFiber.hooks = []
    wipFiber.hooksIndex = 0

    const { type, props } = fiber
    const children = [type(props)]
    reconcileChildren(fiber, children)
}
```

遍历子节点，判断删除更新
```js
// 协调子节点
// 1. 给workInProgressFiber添加一个child节点，就是children的第一个子节点形成的fiber；
// 2. 形成fiber架构，把children里节点遍历下，形成fiber链表状；
function reconcileChildren(workInProgressFiber, children) {
    let prevSibling = null;
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let newFiber = null;
        const sameType = child && oldFiber && child.type === oldFiber.type;
        if (sameType) {
            // 类型相同，节点可以复用
            newFiber = {
                type: child.type,
                props: child.props,
                node: oldFiber.node,
                base: oldFiber,
                return: workInProgressFiber,
                effectTag: UPDATE
            }
        }

        if (!sameType && child) {
            // 类型不同，child存在，新增节点插入
            newFiber = {
                type: child.type,
                props: child.props,
                node: null,
                base: null,
                return: workInProgressFiber,
                effectTag: PLACEMENT
            }
        }

        if (!sameType && oldFiber) {
            // 删除
            oldFiber.effectTag = DELETION;
            deletions.push(oldFiber);
        }

        // ! 这么写是有很大问题的，先不考虑顺序
        // 123
        // 234
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }


        // 形成链表结构
        if (i === 0) {
            workInProgressFiber.child = newFiber;
        } else {
            // i>0
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
    }
}
```

Commit阶段加上删除更新
```js
function commitRoot() {
    deletions.forEach(commitWorker);
    commitWorker(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

function commitWorker(fiber) {
    if (!fiber) {
        return;
    }

    // parentNode是fiber的离得最近的dom父或祖先节点，因为有些节点是没有真实dom节点的，比如Provider，Consumer，Fragment等等
    let parentNodeFiber = fiber.return
    while (!parentNodeFiber.node) {
        parentNodeFiber = parentNodeFiber.return
    }

    const parentNode = parentNodeFiber.node
    // fiber有node节点
    if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
        parentNode.appendChild(fiber.node);
    } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
        updateNode(fiber.node, fiber.base.props, fiber.props)
    } else if (fiber.effectTag === DELETION && fiber.node !== null) {
        commitDeletions(fiber, parentNode)
    }

    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}

function commitDeletions(fiber, parentNode) {
    if (fiber.node) {
        parentNode.removeChild(fiber.node);
    } else {
        commitDeletions(fiber.child, parentNode);
    }
}
```

节点更新
```js
import { TEXT, PLACEMENT, UPDATE, DELETION } from './const'

// fiber
    // type：标记当前节点的类型；
    // props：属性；
    // key：标记唯一性；
    // child：第一个子节点；
    // sibling：下一个兄弟节点；
    // return：指向父节点；
    // node：真实的dom节点；
    // base：记录下当前的旧fiber

// 下一个要执行的fiber，数据结构就是fiber
let nextUnitOfWork = null;
// work in progress 正在进行中的，结构类型是fiber
let wipRoot = null;
// 当前的根fiber
let currentRoot = null;
// 正在进行的fiber
let wipFiber = null;

let deletions = [];

function render(vnode, container) {
    wipRoot = {
        node: container,
        props: {
            children: [vnode]
        },
        base: null
    }

    nextUnitOfWork = wipRoot
    deletions = []
}

function updateNode(node, prevVal, nextVal) {
    Object.keys(prevVal).filter(k => k !== 'children').forEach(k => {
        //! 因为没有自己实现react事件，所以这里瞎写一下
        // 只要是on开头，我就判断是事件
        if (k.slice(0, 2) === 'on') {
            let eventName = k.slice(2).toLowerCase();
            node.addEventListener(eventName, prevVal[k])
        } else {
            if (!(k in nextVal)) {
                node[k] = ""
            }
        }
    })

    Object.keys(nextVal).filter(k => k !== 'children').forEach(k => {
        // 只要是on开头，我就判断是事件
        if (k.slice(0, 2) === 'on') {
            let eventName = k.slice(2).toLowerCase();
            node.addEventListener(eventName, nextVal[k])
        } else {
            node[k] = nextVal[k]
        }
    })
}
```
