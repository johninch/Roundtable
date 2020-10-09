# 10、react16源码解析4

- [React中文网](https://react.docschina.org/)
- [React源码](https://github.com/facebook/react)
- [Debug React](https://github.com/bubucuo/DebugReact)
- [源码指引](https://www.processon.com/view/link/5dd68342e4b001fa2e0c4697)

## 目录

- 如何调试源码
- React中的数据结构
    - Fiber
    - SideEffectTag
    - ReactWorkTag
    - Update & UpdateQueue
- 创建更新
    - ReactDOM.render
    - setState与forceUpdate
    - 协调
        - 比对不同类型的元素
        - 比对同类型的DOM元素
        - 比对同类型的组件元素
        - 对子节点进行递归
- 任务调度
- 合成事件
- setState机制
- react17rc

## 如何调试源码

```bash
git clone git@github.com:johninch/DebugReact.git

yarn # 安装
yarn start # 启动
```
方便查看逻辑，去webpack里把dev设置为false，参考上面的git地址。

## React中的数据结构

### Fiber
```ts
interface Fiber {
  /**
   * ⚛️ 节点的类型信息
   */
  // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
  tag: WorkTag,
  // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
  type: any,

  /**
   * ⚛️ 节点的状态
   */
  // 节点实例(状态)：
  //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
  //        对于类组件来说，这里保存类组件的实例
  //        对于函数组件说，这里为空，因为函数组件没有实例
  stateNode: any,
  // 新的、待处理的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any, // The props used to create the output.
  // 上一次渲染的组件状态
  memoizedState: any,

  /**
   * ⚛️ 结构信息
   */
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  // 子节点的唯一键, 即我们渲染列表传入的key属性
  key: null | string,

  /**
   * ⚛️ 副作用
   */
  // 当前节点的副作用类型，例如节点更新、删除、移动
  effectTag: SideEffectTag,
  // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
  nextEffect: Fiber | null,

  /**
   * ⚛️ 替身
   * 指向旧树中的节点
   */
  alternate: Fiber | null,
}
```
Fiber 包含的属性可以划分为 5 个部分:
- **节点类型信息**：tag 表示节点的分类、type 保存具体的类型值，如div、MyComp；
- **节点的状态**：节点的组件实例、props、state等，它们将影响组件的输出；
- :tada:**结构信息(新增)**：新增的 `上下文信息`，Fiber 依次通过 return、child 及 sibling 的顺序对 ReactElement 做处理，将之前简单的树结构，变成了`链表的形式`，维护了更多的节点关系。
- :tada:**副作用(新增)**：新增的，在 Reconciliation 过程中发现的 `副作用(变更需求) `就保存在节点的 effectTag 中(想象为打上一个标记)。也使用了链表结构，在遍历过程中React会将所有有`副作用`的节点都通过nextEffect连接起来，从而`收集本次渲染的所有节点副作用`。
- :tada:**替身(新增)**：新增的`WIP树`，React 在 Reconciliation 过程中会构建一颗新的树(官方称为workInProgress tree，`WIP树`)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的`旧树`，React就是一边和旧树比对，一边构建`WIP树`的。 alternate 指向旧树的同等节点。

### SideEffectTag
```js
export type SideEffectTag = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*                 */ 0b00000000000000;
export const PerformedWork = /*            */ 0b00000000000001;

// You can change the rest (and add more).
export const Placement = /*                */ 0b00000000000010;
export const Update = /*                   */ 0b00000000000100;
export const PlacementAndUpdate = /*       */ 0b00000000000110;
export const Deletion = /*                 */ 0b00000000001000;
export const ContentReset = /*             */ 0b00000000010000;
export const Callback = /*                 */ 0b00000000100000;
export const DidCapture = /*               */ 0b00000001000000;
export const Ref = /*                      */ 0b00000010000000;
export const Snapshot = /*                 */ 0b00000100000000;
export const Passive = /*                  */ 0b00001000000000;
export const PassiveUnmountPendingDev = /* */ 0b10000000000000;
export const Hydrating = /*                */ 0b00010000000000;
export const HydratingAndUpdate = /*       */ 0b00010000000100;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*      */ 0b00001110100100;

// Union of all host effects
export const HostEffectMask = /*           */ 0b00011111111111;

export const Incomplete = /*               */ 0b00100000000000;
export const ShouldCapture = /*            */ 0b01000000000000;
```

这里的effectTag都是二进制，这个和React中用到的`位运算`有关。

- 首先我们要知道，**位运算只能用于整数**，并且是直接对二进制位进行计算，直接处理每一个比特位，是非常底层的运算，运算**速度极快**。
- 比如说workInProgress.effectTag为132，那这个时候，workInProgress.effectTag & Update 和 workInProgress.effectTag & Ref在布尔值上都是true，这个时候就是既要执行 update effect ，还要执行 ref update。
- 还有一个例子如workInProgress.effectTag |= Placement；这里就是说给workInProgress添加一个 Placement的副作用。

这种处理不仅速度快，而且简洁方便，是非常巧妙的方式，很值得我们学习借鉴。

### ReactWorkTag

fiber的类型，即内部的tag字段。常见的是0 1 5：
```js
export type WorkTag =
  | 0
  | 1
// ...
  | 24

export const FunctionComponent = 0; // 函数组件
export const ClassComponent = 1;    // 类组件
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;     // 原生标签
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const FundamentalComponent = 20;
export const ScopeComponent = 21;
export const Block = 22;
export const OffscreenComponent = 23;
export const LegacyHiddenComponent = 24;
```

### Update & UpdateQueue

```js
export type Update<State> = {|
  // TODO: Temporary field. Will remove this by storing a map of
  // transition -> event time on the root.
  eventTime: number,
  lane: Lane,

  tag: 0 | 1 | 2 | 3,
  payload: any,
  callback: (() => mixed) | null,

  next: Update<State> | null,
|};

type SharedQueue<State> = {|
  pending: Update<State> | null,
|};

export type UpdateQueue<State> = {|
  baseState: State,
  firstBaseUpdate: Update<State> | null,
  lastBaseUpdate: Update<State> | null,
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,
|};

export const UpdateState = 0;
export const ReplaceState = 1;
export const ForceUpdate = 2;
export const CaptureUpdate = 3;
```

- tag标记不同类型，如执行forceUpdate的时候，tag值就是2。
- 这个的payload是参数，比如setState更新时候，payload就是partialState，render的时候，payload 就是第一个参数，即element。

### ExecutionContext

React执行栈(React execution stack)中，所处于几种环境的值，所对应的的全局变量是react-reconciler/src/ReactFiberWorkLoop.js文件中的 executionContext 。
```js
type ExecutionContext = number;

export const NoContext = /*             */ 0b0000000;
const BatchedContext = /*               */ 0b0000001;
const EventContext = /*                 */ 0b0000010;
const DiscreteEventContext = /*         */ 0b0000100;
const LegacyUnbatchedContext = /*       */ 0b0001000;
const RenderContext = /*                */ 0b0010000;
const CommitContext = /*                */ 0b0100000;
export const RetryAfterError = /*       */ 0b1000000;
```

### 过期时间计算

这里我们讨论两种类型的 ExpirationTime，一个是 Interactive 的，另一种是普通的异步。
- Interactive 的比如说是由事件触发的，那么他的响应优先级会比较高因为涉及到交互。
```js
// TODO: This corresponds to Scheduler's NormalPriority, not LowPriority. Update
// the names to reflect.
export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;

// 异步
export function computeAsyncExpiration(
  currentTime: ExpirationTime,
): ExpirationTime {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  );
}

export function computeSuspenseExpiration(
  currentTime: ExpirationTime,
  timeoutMs: number,
): ExpirationTime {
  // TODO: Should we warn if timeoutMs is lower than the normal pri expiration time?
  return computeExpirationBucket(
    currentTime,
    timeoutMs,
    LOW_PRIORITY_BATCH_SIZE,
  );
}

export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

// 比如说是事件触发的，他的响应优先级会比较高，因为涉及到交互
export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  );
}
```

## 创建更新

### ReactDOM.render

```js
export function render(
  element: React$Element<any>,
  container: Container,
  callback: ?Function,
) {
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );
  if (__DEV__) {
    const isModernRoot =
      isContainerMarkedAsRoot(container) &&
      container._reactRootContainer === undefined;
    if (isModernRoot) {
      console.error(
        'You are calling ReactDOM.render() on a container that was previously ' +
          'passed to ReactDOM.createRoot(). This is not supported. ' +
          'Did you mean to call root.render(element)?',
      );
    }
  }
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```
- 上面render调用legacyRenderSubtreeIntoContainer，可以看到parentComponent设置为null。
- 初次渲染，生成fiberRoot，以后每次update，都要使用这个fiberRoot。
- callback是回调，如果为function，则每次渲染和更新完成，都会执行，调用 originalCallback.call(instance)。

```js
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function,
) {
  if (__DEV__) {
    topLevelUpdateWarnings(container);
    warnOnInvalidCallback(callback === undefined ? null : callback, 'render');
  }

  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.
  let root: RootType = (container._reactRootContainer: any);
  let fiberRoot;
  if (!root) {
    // Initial mount 初次渲染
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    // 初次渲染的话 ， 尽快更新， 使用非批量
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    updateContainer(children, fiberRoot, parentComponent, callback);
  }

  // console.log('fiberRoot', fiberRoot.current); //sy-log
  return getPublicRootInstance(fiberRoot);
}
```
```js
// 最后依然要引起更新渲染
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): ExpirationTime {
  const current = container.current;
  const currentTime = requestCurrentTimeForUpdate();

  const suspenseConfig = requestCurrentSuspenseConfig();
  const expirationTime = computeExpirationForFiber(
    currentTime,
    current,
    suspenseConfig,
  );

  const context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  // 创建一个更新
  const update = createUpdate(expirationTime, suspenseConfig);
  // Caution: React DevTools currently depends on this property
  // being called "element".
  // 这个来自render，payload就是render的第一个参数（element）
  update.payload = {element};

  // 回调，更新完了要执行回调，所以呢，把callback要挂在update上
  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }
  // 把更新入队列，形成update链表
  enqueueUpdate(current, update);
  // 处理更新
  scheduleUpdateOnFiber(current, expirationTime);

  return expirationTime;
}
```
updateContainer中计算过期时间并做返回，同时创建update，并给update.payload赋值为 element，即这里的子元素，(这里可以setState做对比)。
```js
export function createUpdate(
  expirationTime: ExpirationTime,
  suspenseConfig: null | SuspenseConfig,
): Update<*> {
  const update: Update<*> = {
    expirationTime,
    suspenseConfig,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
  if (__DEV__) {
    update.priority = getCurrentPriorityLevel();
  }
  return update;
}
```


### setState与forceUpdate

setState调用updater的enqueueSetState，这里的payload就是setState的第一个参数partialState，是个对象或者function。 相应的forceUpdate调用updater.enqueueForceUpdate，并没有payload，而有一个标记为
ForceUpdate(2)的tag，对比上面createUpdate的tag是UpdateState(0)。
```js
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );
    const update = createUpdate(expirationTime, suspenseConfig);
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }
    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, expirationTime);
  },
  enqueueReplaceState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );
    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ReplaceState;
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }
    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, expirationTime);
  },
  enqueueForceUpdate(inst, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, expirationTime);

    if (__DEV__) {
      if (enableDebugTracing) {
        if (fiber.mode & DebugTracingMode) {
          const label = priorityLevelToLabel(
            ((update.priority: any): ReactPriorityLevel),
          );
          const name = getComponentName(fiber.type) || 'Unknown';
          logForceUpdateScheduled(name, label);
        }
      }
    }
  },
};
```

### 协调

- **比对不同类型的元素**
    - 当根节点为不同类型的元素时，React会卸载老树并创建新树。举个例子，从变成，从 《Article》变 成 《Comment》，或者从 《Button》变成 《div》，这些都会触发一个完整的重建流程。
    - 卸载老树的时候，老的DOM节点也会被销毁，组件实例会执行componentWillUnmount。创建新树的时候，也会有新的DOM节点插入DOM，这个组件实例会执行 componentWillMount() 和 componentDidMount() 。当然，老树相关的state也被消除。
- **比对同类型的组件元素**
    - 这个时候，React更新该组件实例的props，调用componentWillReceiveProps() 和 componentWillUpdate()。下一步，render被调用，diff算法递归遍历新老树。
- **比对同类型的DOM元素**
    - 当对比同类型的DOM元素时候，React会比对新旧元素的属性，同时保留老的，只去更新改变的属性。
    - 处理完DOM节点之后，React然后会去递归遍历子节点。
        - **对子节点进行递归**：当递归DOM节点的子元素时，React会同时遍历两个子元素的列表。

下面是遍历子节点的源码，解析这段源码得出以下思路:
- 首先判断当前节点是否是没有key值的顶层fragment元素，如果是的话，需要遍历的newChild就 是newChild.props.children元素。
- 判断newChild的类型，如果是object，并且$$typeof是REACT_ELEMENT_TYPE，那么证明这是一个单个的元素，则首先执行reconcileSingleElement函数，返回协调之后得到的fiber，placeSingleChild函数则把这个fiber放到指定位置上。
- REACT_PORTAL_TYPE同上一条。
- 如果newChild是string或者number，即文本，则执行reconcileSingleTextNode函数，返回协调之后得到的fiber，依然是placeSingleChild把这个fiber放到指定的位置上。
- 如果是newChild数组，则执行reconcileChildrenArray对数组进行协调（`diff核心`）。
```js
  function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    lanes: Lanes,
  ): Fiber | null {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    const isUnkeyedTopLevelFragment =
      typeof newChild === 'object' &&
      newChild !== null &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      newChild.key === null;
    if (isUnkeyedTopLevelFragment) {
      newChild = newChild.props.children;
    }

    // Handle object types
    const isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes,
            ),
          );
        case REACT_PORTAL_TYPE:
          return placeSingleChild(
            reconcileSinglePortal(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes,
            ),
          );
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(
        reconcileSingleTextNode(
          returnFiber,
          currentFirstChild,
          '' + newChild,
          lanes,
        ),
      );
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes,
      );
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes,
      );
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (__DEV__) {
      if (typeof newChild === 'function') {
        warnOnFunctionType(returnFiber);
      }
    }
    if (typeof newChild === 'undefined' && !isUnkeyedTopLevelFragment) {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent: {
          if (__DEV__) {
            const instance = returnFiber.stateNode;
            if (instance.render._isMockFunction) {
              // We allow auto-mocks to proceed as if they're returning null.
              break;
            }
          }
        }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionComponent: {
          const Component = returnFiber.type;
          invariant(
            false,
            '%s(...): Nothing was returned from render. This usually means a ' +
              'return statement is missing. Or, to render nothing, ' +
              'return null.',
            Component.displayName || Component.name || 'Component',
          );
        }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

```
当上文中的newChild是个数组的时候，执行reconcileChildrenArray函数进行协调，newChild也就是这里的newChildren，这里也是**diff的核心算法所在**。
```js
  function reconcileChildrenArray(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChildren: Array<*>,
    lanes: Lanes,
  ): Fiber | null {
    // This algorithm can't optimize by searching from both ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    if (__DEV__) {
      // First, validate keys.
      let knownKeys = null;
      for (let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
      }
    }

    let resultingFirstChild: Fiber | null = null;
    let previousNewFiber: Fiber | null = null;

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      const newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        lanes,
      );
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      // newChildren已经更新完毕，这个时候把oldFiber及siblings删除就行了
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      // oldFiber已经没了，但是newChildren还有元素，直接插入就行了
      for (; newIdx < newChildren.length; newIdx++) {
        const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
        if (newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    // 把children做成一个可以根据key值索引的map，可快速查询
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes,
      );
      if (newFiber !== null) {
        if (shouldTrackSideEffects) {
          if (newFiber.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(
              newFiber.key === null ? newIdx : newFiber.key,
            );
          }
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      // 更新阶段， 还有副作用未被处理， 那就只能是删除的节点了
      existingChildren.forEach(child => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
  }
```

由于 React 依赖探索的算法，因此当以下假设没有得到满足，性能会有所损耗。
1. 该算法不会尝试匹配不同组件类型的子树。如果你发现你在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。在实践中，我们没有遇到这类问题。
2. Key 应该具**有稳定，可预测，以及列表内唯一的特质**。不稳定的 key(比如通过 Math.random() 生成的)会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。


## 任务调度

全局变量 isCommitting 用来标志是否处于commit阶段。commitRoot 开头设置为 true ，结束之后设置为 false

代码略。。。。。。。


## React合成事件系统

React为了实现跨平台兼容性，对于事件处理有自己的一套代码。可以看到ReactDOM.js中注入了 import './ReactDOMClientInjection'; 。

React中有自己的事件系统模式，即通常被称为`React合成事件`。之所以采用这种自己定义的合成事件：
- 一方面是为了`抹平差异性，更好的兼容性和跨平台`，使得React开发者不需要自己再去关注浏览器事件兼容性问题；
- 另一方面是为了`统一管理事件，提高性能`，这主要体现在：
    - **React内部实现事件委托，挂载到document，减少内存消耗，避免频繁解绑**
    - **并且记录当前事件发生的状态，方便事件的统一管理（如事务机制）**。

**事件委托**，也就是我们通常提到的事件代理机制，这种机制不会把时间处理函数直接绑定在真实的节点上，而是把所有的事件绑定到结构的最外层，使用一个统一的事件监听和处理函数。当组件加载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象;当事件放生时，首先被这个统一的事件监听器处理，然后在映射表里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

记录当前事件发生的状态，即记录事件执行的上下文，这便于React来处理不同事件的优先级，达到**谁优先级高先处理谁的目的**，这里也就实现了React的增量渲染思想，可以预防掉帧，同时达到页面更顺滑的目的，提升用户体验。

## setState

setState 会对一个组件的 state 对象安排一次更新。当 state 改变了，该组件就会重新渲染。class组件的特点，就是拥有特殊状态并且可以通过setState更新状态并重新渲染视图，是React中最重要的api。

setState的运行机制，同步还是异步，请走[传送门查看](/Question-Bank/react/setState.html)

React中理论上有三种模式可选，默认的 legacy 模式、blocking 模式和 concurrent模式，legacy 模式在合成事件中有自动批处理的功能，但仅限于一个浏览器任务。非 React 事件想使用这个功能必须使用
unstable_batchedUpdates 。在 blocking 模式和 concurrent 模式下，所有的setState在默认情况下都是批处理的，但是这两种模式目前仅实验版本可用。

在目前的版本中，事件处理函数内部的setState是异步的，即批量执行，这样是为了避免子组件被多次渲染，这种机制可以在大型应用中得到很好的性能提升。但是React官网也提到这只是一个实现的细节，所以请不要直接依赖于这种机制。在以后的版本当中，React 会在更多的情况下默认地使用 state 的批更新机制。


## react17rc

react17 与去年的路线图演进计划不一致，之前的默认启用concurrent render和删除deprecated lifecycles计划被推迟了。

- **无新特性**：React 17 的版本是非比寻常的，因为它没有添加任何面向开发人员的新功能。而主要侧重于升级简化 React 本身。
- **逐步升级**：React 17 开始支持逐步升级 React 版本。首选还是像以前一样，一次升级整个应用程序。但你也可以选择逐步升级你的应用程序。例如，你可能会将大部分应用程序迁移至 React 18，但在 React 17 上保留一些延迟加载的对话框或子路由。
- **更改事件委托**：事件的`委托绑定不再是document`，而是rootNode（即将事件处理器附加到渲染 React树的 `根DOM容器`中）；
    - react中事件委托，17之前的版本都是放在document上的，而17版本将事件委托放在container上。之所以这样做，是为了微服务，方便复用，如果多个版本都委托在document上，可能会产生冲突，而如果每个版本都委托在自己的container上，就可以相互隔离。
- **去除事件池**：取消了SyntheticEvent事件池，`可以延迟访问event`了；
    - 因为 React 在旧浏览器中重用了不同事件的事件对象，以提高性能，并将所有事件字段在它们之前设置为 null。在 React 16 及更早版本中，使用者必须调用 e.persist() 才能正确的使用该事件，或者正确读取需要的属性。
    - 而在 React 17 中，此代码可以按照预期效果执行。旧的事件池优化操作已被完成删除，因此，使用者可以在需要时读取事件字段。
- **副作用清理时间**：useEffect的`清理函数运行也变成异步`了；
    - 当组件被卸载时，副作用清理函数（类似于在 class 组件中同步调用 componentWillUnmount）同步运行。我们发现，对于大型应用程序来说，这不是理想选择，因为同步会减缓屏幕的过渡（例如，切换标签）。
    - 在 React 17 中，副作用清理函数会异步执行 —— 如果要卸载组件，则清理会在屏幕更新后运行。

