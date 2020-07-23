# React关键

我们使用react16.8，也是从这个版本开始，有了hooks

## 基础提纲
- React中函数组件和类组件的区别。
    - 这里描述的是在 React 中 function 和 class 的差别，差异本身和React Hooks无关。
    - 本质区别就在于：**function components 所拥有的 `捕获渲染值(Capture Value)` 特性**
        - Function Component 是更彻底的状态驱动抽象，甚至没有生命周期的概念，只有一个状态，而 React 负责同步到 DOM。
        - 既然是状态同步，那么每次渲染的状态都会固化下来。
    - 「Capture Value」具体是啥意思？
        - 函数式组件，每次 Render 都有自己的 Props 与 State，可以认为每次 Render 的内容都会形成一个`快照`并保留下来，因此当状态变更而 Rerender 时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 Props 与 State。这就是 Capture Value 特性。即函数式组件中的props是不可变的。
        - 而类组件，因为使用this.props来访问状态，且this是可变的（每次渲染都不同），所以this.props总是访问最新的props。
    - 另外，总得来说函数式组件：`没有实例，没有生命周期，没有state`

- React事件机制
    - 什么是合成事件
        - 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
        - 2. event.nativeEvent 是原生事件对象
        - 3. 所有的事件，都被挂载到 document 上
        - 4. 和 DOM 事件不一样，和 Vue 事件也不一样
    - event参数
        - 默认传参
        - 自定义参数：除额外参数外，最后追加一个event参数，即可接收
        - **「与vue对比」**
            - 这里的`event是封装的合成事件SyntheticEvent`
            - event.target：返回当前触发元素
            - event.currentTarget：返回当前触发元素
            - event.nativeEvent.target：返回当前触发元素
            - event.nativeEvent.currentTarget：返回document，说明`事件是被注册到document上的`
    - 为什么要合成事件
        - 减少内存消耗，提升性能，不需要注册那么多的事件了，一种事件类型只在 document 上注册一次，避免频繁解绑
        - 统一规范，解决 ie 事件兼容问题，简化事件逻辑
        - 方便事件的统一管理（如事务机制）
    - 合成事件与原生事件的执行顺序，能否混用
    - 合成事件的注册和分发执行（`addEventListener`、`dispatchEvent`、`listenerBank`）
    - React中为什么需要绑定this？有几种绑定方法？
        - 源码的invokeGuardedCallback函数中，**事件处理函数作为回调函数是直接调用的**，`并没有指定调用的组件`，所以不进行手动绑定的情况下this会回退到默认绑定，所以我们需要手动将当前组件绑定到 this上。

- React生命周期
    - 15（*16*）
        - 初始化阶段
            - constructor
        - 挂载
            - **componentWillMount**（替换为*static getDerivedStateFromProps*）
            - render
            - componentDidMount
        - 更新
            - **componentWillReceiveProps**（替换为*static  getDerivedStateFromProps*）
            - shouldComponentUpdate
            - **componentWillUpdate**（删掉）
            - render
            - （*getSnapshotBeforeUpdate*）
            - componentDidUpdate
        - 卸载
            - componentWillUnmount
        - *错误处理*
            - （*componentDidCatch*）
    - 废弃的 componentWillMount() 可用componentDidMount()来代替，或者constructor替代；
        - 放在didMount里，是为了保证componentWillUnmount的在组件移除时执行，防止内存泄漏
    - 废弃的 componentWillReceiveProps() 可用 getDerivedStateFromProps(nextProps, prevState) 代替
    - 废弃的 componentWillUpdate() 可用 getSnapshotBeforeUpdate() 替代

    - 由于Fiber在新版本中会支持`异步渲染的特性`，而16 版本 render 之前的生命周期可能会被多次执行（componentWillMount、componentWillReceiveProps、componentWillUpdate这3个生命周期钩子，在异步渲染模式下会有一些潜在的问题）因此被弃用。

    - getDerivedStateFromProps
        - getDerivedStateFromProps接收最新的Props值nextProps、上一个state值prevState两个参数
        - 返回一个对象来更新state，或者返回null表示不需要更新state。
        - 要注意的是，getDerivedStateFromProps 是一个静态方法，纯函数，不能访问this，所以如果要跟上一个props值作比较，只能是把上一个props值存到state里

    - [参考文章](https://juejin.im/post/5b97abcaf265da0afa3dcb2e#heading-0)

- React的请求应该放在哪个生命周期中?
    - 官方推荐的异步请求是在**componentDidmount**中进行.
    - 如果有特殊需求需要提前请求，也可以在特殊情况下在**constructor**中请求
    - React的异步请求到底应该放在哪个生命周期里，有人认为在*componentWillMount*中可以提前进行异步请求，避免白屏，其实这个观点是有问题的.
        - 由于JavaScript中异步事件的性质，当启动API调用时，浏览器会在此期间返回执行其他工作。当React渲染一个组件时，它不会等待*componentWillMount*它完成任何事情
        - React继续前进并继续render，没有办法“暂停”渲染以等待数据到达。
        - 而且在*componentWillMount*请求会有一系列潜在的问题
            - 首先，在SSR端渲染时，如果在 *componentWillMount* 里获取数据，fetch data会执行两次，一次在SSR端，一次在CSR端，这造成了多余的请求；
            - 其次，在React 16进行React Fiber重写后，*componentWillMount*可能在一次渲染中多次被调用


- React 按需加载
    - 使用 react-loadable库，项目中对齐进行封装
    - 使用 React.lazy，返回一个 thenable 对象，拥有3个enum状态，分别对应 Promise 的3种状态。

- Refs 3种使用方式（字符串、回调refs、creatRef()）
    - **你不能在函数组件上使用 ref 属性，因为他们没有实例**。

- Vitrual Dom 的「优势」在于
    - 无需手动操作dom
    - 保证性能下限
    - 可跨平台

- hooks的好处是啥？
    - 从类组件的一些弊端说起：
        - 1、**「难以复用的状态逻辑」**复用一个有状态的组件太麻烦，虽然有 渲染属性（Render Props） 和 高阶组件（Higher-Order Components），但这些方式会增加很多组件层级嵌套；而使用 hooks，没有多余的层级嵌套，把各种想要的功能写成一个一个可复用的自定义hook，直接在组件里调用这个hook即可。
        - 2、**「混乱的生命周期、混乱的副作用」**生命周期钩子函数里的逻辑太乱。我们希望的是，一个函数只做一件事，但生命周期钩通常做了很多不同的事，甚至在不同的钩子中还会做相同的事。
        - 3、**「this指向困扰」**class 的使用让人困惑，要繁琐的处理this绑定问题；另外，如果一个无状态function组件需要有自己的state时，又需要改成class组件。。而hooks没有这样的烦恼
- hook的“形态”类似被否定掉的Mixins方案，二者有什么本质不同？
    - 二者都是提供一种「插拔式的功能注入」
    - 不同的是：
        - mixins是让多个Mixins共享一个对象的数据空间，会导致不同的Mixins依赖的状态产生冲突
        - 而hooks是用在function中的，每一个hook都是相互独立的。。。不同组件调用同一个hook也可以保证自己的状态独立性
- useState
    - 状态更新方式的不同
        - this.setState()做的是合并状态后返回一个新状态，而useState是直接替换老状态后返回新状态。
    - 如何记住之前的状态
        - React是通过 类似单链表形式的memoizedStates变量，通过 next 按顺序串联所有的 hook的：
    - 怎么保证多个useState的相互独立的？（同样适用于useEffect）
        - 使用 memoizedStates数组，来解决 Hooks 的复用问题
        - react根据useState出现的顺序，依次收集相互独立的state到memoizedStates数组中，从而保证相互间的独立性。
        - 这也是为什么，hooks必须写在函数的最外层，而不能写在循环或条件语句中。
- useEffect
    - 是用来处理副作用函数的，它相当于类组件的3个生命周期钩子（componentDidMount、componentDidUpdate、componentWillUnmount），以一抵三。
    - 使用中，应该给每一个副作用一个单独的useEffect钩子
        - 每次渲染，都会执行useEffect中的副作用函数
        - 且执行时机是在dom更新之后
        - useEffect中的副作用函数是异步执行的（不会阻碍浏览器更新视图），而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。
    - 副作用函数callback的执行次数（3种情况）：
        - 如果 deps 不存在，那么 callback 每次 render 都会执行；
        - 如果 deps 存在，只有当它发生了变化，callback 才会执行；
        - 如果 deps 为[]，则相当于只有componentDidMount，只在 首次render 后执行；
    - 传入的deps依赖，可以是变量也可以是函数。如果传入的是组件内的函数，每次渲染都会重新生成这个函数，如果订阅了它就会触发副作用函数的执行，这也是useCallback被使用的原因。
        - 如果订阅的函数F包含了变量A，那么副作用函数只需要订阅F就可以了，不需要订阅A，因为A的变化肯定会触发F的变化
    - useEffect解绑副作用
        - 场景：避免内存泄漏
        - 方法：使useEffect的副作用函数A返回一个清理函数B即可
            - 返回的这个清理函数B，将会在组件下一次重新渲染之后，在副作用函数A之前执行；
            - 与componentWillUnmount只会在组件销毁前执行一次不同的是，副作用函数A及其可选的清理函数B在每次组件渲染都会执行。
- useContext(MyContext)
    - 仍然需要配合 `<MyContext.Provider>` 来使用
    - 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`
- useReducer
    - 相较于 useState，它更适合一些逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等等的特定场景
    - const [state, dispatch] = useReducer(reducer, initialArg, init);
    - 第一个参数是 一个 reducer，就是一个函数类似 (state, action) => newState 的函数，传入 上一个 state 和本次的 action；
- useCallback(() => doSomething(a, b), [a, b]);
    - 返回一个 memoized 回调函数。useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
    - 用于对不同 useEffect 中存在的相同逻辑的封装
    - 仅在某个依赖项改变时才会更新
- useMemo
    - useMemo 和 useCallback 几乎是99%相似的
    - 仅有的不同点是：
        - useCallback是根据依赖(deps)缓存第一个入参的(callback)。useMemo是根据依赖(deps)缓存第一个入参(callback)执行后的值。
        - 即useCallback缓存的是cb，而useMemo缓存的是cb执行后的值的。
    - 传入 useMemo 的函数会在渲染期间执行，这与useEffect在渲染之后执行不同。因此 useMemo 内不要有与渲染无关的操作
- useRef
    - useRef 返回一个 可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    - 本质上，useRef 就像是可以在其 .current 属性中保存一个任意可变值的“盒子”。
    - 返回的 ref 对象在组件的整个生命周期内保持不变


- React 性能优化
    - 主要两个方向：
        - 减少重新render：
            - 类组件中使用 SCU、PureComponent
            - 函数式组件使用
                - React.memo（包裹子组件，props不变就不重新渲染），对标PureComponent
                - useCallback（解决props如果包含callback，函数式组件每次重渲都会重新生成callback，即callback的引用变化，即使用React.memo包裹还是会触发子组件重渲。。useCallback得到一个缓存的函数，同一个引用）
        - 减少重复计算：
            - 使用 useMemo包裹大计算量函数，缓存计算结果。类似于Vue的计算属性。
                - 默认是浅对比，注意当传入第二个参数来自定义比较时，与SCU返回的bool值刚好相反。

- SCU 跟 immutable 强相关，如何理解 react 的 immutable？
    - JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。因此，对象值改变时引用地址却不变，这时使用PureComponent进行浅比较，只比较一层，SCU无法正确做出判断。
    当然，可以在SCU中通过 深拷贝deepCopy 和 深层比较deepCompare来正确判断，但这些操作非常耗性能。
    - 综上，React社区推荐React和Immutable.js库配套使用。使用immutable可以生成不可变state。
        - immutable的state，即在改变state的时候，需要重新生成一个对象去代替原来的state，而不是直接改原来的。
            - 并且，目前的Immutable库，都实现了`结构共享`，即**如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享**，*避免了deepCopy把所有节点都复制一遍带来的性能损耗*。比较两个Immutable对象是否相同，只需要使用`===`就可以轻松判别。
        - immutable的state同样也决定了**不能直接修改state**
            - 直接修改state会导致state不可预期。要知道setState本质是通过`一个队列机制`实现`state的批处理更新的`。执行setState时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。
            - 如果不通过setState而直接修改this.state，那么这个state不会放入状态队列中，下次调用setState对状态队列进行合并时，会忽略之前直接被修改的state，这样我们就无法合并了，而且实际也没有把你想要的state更新上去。
            ```js
            saveOrderList(state, {payload: items}) {
                return Object.assign({}, state, orderList: Immutable(items));
            }

            saveOrderList(state, {payload: items}) {
                return {...state, orderList: Immutable(items)};
            }
            ```


- key
    - 准确复用、快速

- diff
    - tree diff：两棵树 只对同层次节点 进行比较，不考虑跨层级
    - component diff：拥有相同类的两个组件 生成相似的树形结构，拥有不同类的组件....
    - element diff：对于同一层级的一组子节点，通过唯一key区分。


- fiber
    - fiber的出现，是React为了解决`「主线程阻塞」`的问题
    - `「主线程阻塞」`是因为JS引擎与GUI引擎互斥执行，当react对较大的组件树进行**协调算法**时，会持续占用主线程，且协调过程一气呵成不能被打断。
    - Vue得益于其可以精确定位节点更新，所以采用的策略是，把更新做得足够快，理论上就不需要时间分片了。
    - 而React采用的策略是，时间分片，通过某种调度，合理分配CPU资源，从而提高浏览器的用户响应速录，同时兼顾任务执行。
    - fiber原理：
        - React@15使用的是 *JS 引擎自身的函数调用栈*，它会一直执行到栈空为止。即**不能被打断**。
        - React@16 的 Fiber实现了*自己的组件调用栈*，它以**链表的形式**遍历组件树，让协调 过程变成**可中断的**，适时地让出CPU执行权。
    - 综上：
        - Fiber 也称「协程」，是一种控制流程的让出机制；
        - Fiber 也称「纤维」，是一种数据结构或者说执行单元。
    - Fiber结构
        - 新增属性：
            - 结构信息（上下文信息）
            - 副作用（链表effectTag）
            - 替身（WIP树）
    - React@16 还是同步渲染的，因为没有开启并发模式 Concurrent。想要真正体会到 React Fiber 重构的效果（异步渲染），可能要等到 v17。v16 只是一个过渡版本。

- mobx
    - 事件触发action，在action中修改state => 通过computed拿到更新的state的计算值 => 自动触发对应的reactions（包含autorun，渲染视图，when，observer等）
    - 通过observable装饰器装饰一个属性，使用Object.defineProperty来拦截对数据的访问，一旦值发生变化，将会调用react的render方法来实现重新渲染视图的功能或者触发autorun等。
    - redux和mobx的对比：
        - mobx将数据保存在分散的多个store中；redux将数据保存在单一的store中
        - mobx使用@observable（Object.defineProperty来拦截），数据变化后自动处理响应的操作；redux使用plain object保存数据，需要手动处理变化后的操作；
        - mobx中的状态是可变的，可以直接对其进行修改；redux使用不可变状态，这意味着状态是只读的

- React 和 Vue 的区别
    - 相同点
        - 都支持组件化
        - 都是数据驱动视图
        - 都是用 vdom 操作 DOM
    - 不同点
        - React 使用 JSX 拥抱JS，Vue使用模板拥抱 html
        - React 函数式编程，Vue声明式编程，需要注册
        - React 更多需要自力更生，Vue把想要的都给你


- React
    - 只是一个函数 UI = render(data)，没有所谓的状态管理，而只是数据到视图的驱动
    - react diffing算法思路
        - 传统diff通过递归，算法复杂度达到O(n^3)，而React diff算法是一种 调和 实现，通过 三大策略 进行优化，将O(n^3)复杂度 转化为 O(n)复杂度:
            - 1、策略一（tree diff），只同层级比较
            - 2、策略二（component diff），相同类的两个组件 生成相似的树形结构，不同类的两个组件 生成不同的树形结构
            - 3、策略三（element diff）：对于同一层级的一组子节点，通过唯一key区分。
    - 虚拟Dom中的$$typeof属性的作用
        - $$typeof属性，它被赋值为 REACT_ELEMENT_TYPE。
        - ReactElement.isValidElement用来判断一个元素是否有效，其中会判断$$typeof。
    - setState的执行机制
        - 是异步的吗？（setState本身并不是异步的，而是 React的批处理机制给人一种异步的假象）
            - 1、React的`生命周期`和`合成事件`中，React仍然处于它的批处理更新机制中，这时无论调用多少次 setState，都不会立即执行更新
            - 2、`异步代码`中调用 setState时，React的批处理机制已经走完，这时再调用完后就能立刻拿到更新后的结果。
            - 3、在`原生事件`中调用 setState并不会触发 React的批处理机制，所以立即能拿到最新结果
            - 最佳实践：
                - 可通过第二个参数返回一个回调函数，此回调总是在批处理策略后执行，所以肯定能拿到更新后的值
        - 连续多次setState只有一次生效？（队列合并机制）
            - 多次传入对象来更新时，React会将批处理机制中存储的多个setState进行合并
            - 多次传入函数来更新时，每次都立即计算，后执行的函数会以前一次的函数更新结果为输入值
        - 几个钩子中注意：
            - componentDidMount直接调用 setState，会重复渲染过程
            - 在componentWillUpdate、componentDidUpdate中setState，需要条件控制，否则会死循环
    - react16新生命周期，有什么变化？
        - 16 弃用了3个钩子函数： componentWillMount、componentWillUpdate、componentWillReceiveProps；
            - 之所以移除，是因为Fiber在新版本中会支持异步渲染的特性，这几个钩子会有问题
            - 新增了 getDerivedStateFromProps、getSnapshotBeforeUpdate来代替；
        - 新增了错误处理阶段：componentDidCatch


- 虚拟Dom比普通Dom 性能更好吗？
    - VDOM也还是要操作 DOM，这是无法避免
    - 如果是首次渲染的话，Vitrual Dom 甚至要进行更多的计算，消耗更多的内存。
    - Vitrual Dom 的「优势」在于：
        - 1、无需手动操作Dom，Diff算法 和 批处理策略Patch 会在一次更新中自动完成
        - 2、保证性能下限
        - 3、跨平台，本质上是JS对象，可以服务端开发，移动端开发等
    - Vitrual Dom 的「缺点」只有一个：
        - 无法进行极致优化

### JSX基本使用（略）

- 事件
    - bind this
    - event参数
    - 传递自定义参数
- 表单
    - 受控组件（因为react中没有vue的v-model，所以需要自己控制表单状态）
    - 非受控组件
    - 常见表单项
        - 多行文本
            - 注意不允许这样
            ```html
            <textarea>{{this.state.desc}}</textarea>
            ```
            - 要这样
            ```html
            <textarea value={this.state.desc} onChange={this.onTextareaChange} />
            ```
- 组件使用
    - props传递数据
    - props传递函数
    - props类型检查

- setState
    - 不可变值（SCU对引用类型浅层比较无法得到正确判断，而深拷贝深比较耗性能，则state需要是不可变的，一般与immutable库配合使用）
    - 可能是异步更新
        - 合成事件和生命周期中，都是异步更新的
        - 异步事件中是同步更新的，因为批处理已经执行了
        - 原生事件中是同步的，因为没有批处理策略
    - 可能会被合并
        - 传对象是会被合并
        - 传函数的时候不会合并


### React高级特性

- 函数组件
    - 函数组件与类组件的区别
        - 函数组件具有：
            - 本质区别在于 capture values 捕获渲染值
            - 纯函数，输入props，输出JSX
            - 没有实例，没有生命周期，没有state
            - 不能扩展其他方法
- 非受控组件
    - 不使用value和onChange事件，而是用state作为 defaultValue defaultChecked
    - 并且通过refs，手动操作dom，this.nameInputRef.current手动拿到值的变化
    - 场景：必须操作DOM，setState实现不了时，只能使用非受控组件
        - 文件上传《input type="file"》
        - 富文本编辑器，需要传入DOM元素

- Portals
    - 组件默认会按照既定层次嵌套渲染，如何让组件渲染到父组件以外呢？
        - ReactDOM.createPortal(组件, 渲染到的目标节点(比如document.body))
    - 场景：
        - 父组件设了BFC，比如overflow:hidden，会影响子组件展示，可以使用portal逃离父组件
        - 父组件z-index太小，可以使用portal逃离父组件
        - fixed的元素需要放在body第一层级时，可以使用portal逃离父组件


- props.children

- context
    - 公共信息传给每个子组件（用props太繁琐，用redux小题大做）
    - React.createContext

- 异步组件（懒加载）
```jsx
const Demo = React.lazy(() => import('./demo'))
<React.Suspense fallback={<div>loading....</div>}>
    <Demo />
</React.Suspense>
```


- **性能优化**
    - **优化方向1**：减少不必要的渲染（react默认父组件更新，子组件也无条件也更新）
        - SCU(nextProps, nextState)
            - 默认返回true，重渲。通过条件判断 `nextProps.text !== this.props.text`，来跳过不必要的子组件更新
        - SCU与 “不可变值”强相关，必须配合 “不可变值” 使用！！！
            - 即对于state的操作，不能违背不可变值的特性。。
            - 怎样不违背不可变值？在setState前不能对state做修改，比如：先对state的list，push改变，之后再setState，此时在用SCU比较前后state时，state已经变了，则比较不出来就出现bug了
            ```js
            // 为了演示 SCU ，故意写的错误用法
            this.state.list.push({
                id: `id-${Date.now()}`,
                title
            })
            this.setState({
                list: this.state.list
            })
            // 这也是为什么不能直接改变state，而需要再setState的时候再使用新值来赋值


            // 不可变值（函数式编程，纯函数） - 数组
            const list5Copy = this.state.list5.slice()
            list5Copy.splice(2, 0, 'a') // 拷贝了一个副本后，无论怎么修改都没有改变state
            this.setState({
                list1: this.state.list1.concat(100), // 追加
                list2: [...this.state.list2, 100], // 追加
                list3: this.state.list3.slice(0, 3), // 截取
                list4: this.state.list4.filter(item => item > 100), // 筛选
                list5: list5Copy // 使用副本赋值，没有问题
            })
            // 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

            // 不可变值 - 对象
            this.setState({
                obj1: Object.assign({}, this.state.obj1, {a: 100}),
                obj2: {...this.state.obj2, a: 100}
            })
            // 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
            ```
            - SCU对于对象或数组时，需要用_.isEqual等深度比较方法，这个是很耗费性能的，不建议这么用（如果建议的话React自己就帮我们做了）
            - 有性能问题时再使用SCU，不是必须要用
        - React实现了浅比较，大部分情况下够用了（尽量不要设计过深的数据结构）
            - 类组件中使用
                - PureComponent，会默认增加SCU，而如果用户手动定义SCU后，以自己定义的SCU为准
            - 函数式组件使用
                - React.memo（包裹子组件，props不变就不重新渲染），对标PureComponent
                - useCallback（解决props如果包含callback，函数式组件每次重渲都会重新生成callback，即callback的引用变化，即使用React.memo包裹还是会触发子组件重渲。。useCallback得到一个缓存的函数，同一个引用）
        - immutable.js
            - 如果要 彻底拥抱“不可变值”，则开发人员需要每次都对数据做 深拷贝和深比较，这样非常非常耗费性能
            - 而immutable.js库就解决了这个问题，基于 共享数据（而不是深拷贝，只改变改变节点与其父节点），速度性能好
            - 但是！！有学习成本和迁移成本，推荐按需使用
                - 使用起来日常的js使用不是很一致，特别是和ES6的新的api是不一致的

    - **优化方向2**：减少重复计算：
        - 使用 useMemo包裹大计算量函数，缓存计算结果。类似于 Vue的computed。
            - 默认是浅对比，注意当传入第二个参数来自定义比较时，与SCU返回的bool值刚好相反。

- 公共逻辑抽离
    - mixin已被react弃用
    - 高阶组件HOC（类似于一个工厂模式，一个装饰器）
        - 比如redux connect是高阶组件
            ```js
            import { connect } from 'react-redux';

            const VisibleTodoList = connect(
                mapStateToProps,
                mapDispatchToProps
            )(TodoList)

            export default VisibleTodoList
            ```
    - Render Props：`使用一个值为函数的prop来传递需要动态渲染的nodes或组件`，属性名不一定是非叫render，其它命名依然有效
            ```jsx
            // 子组件依赖于父组件的某些数据时，需要将父组件的数据传到子组件，子组件拿到数据并渲染。
            // render是一个函数组件
            <DataProvider render={data => (
                <Cat target={data.target} />
            )}/>
            // Render Props，不是说非用一个叫render的props不可
            // 习惯上可能常写成下面这种
            <DataProvider>
                {data => (
                    <Cat target={data.target} />
                )}
            </DataProvider>
            ```
    - HOC vs Render Props
        - HOC模式简单，会增加组件层级
        - Render Props代码简洁，但学习理解成本稍高


Vue 如何实现高阶组件：https://www.jianshu.com/p/6b149189e035
    - 为什么在 Vue 中实现高阶组件比较难?
        - 前面说过要分析一下为什么在 Vue 中实现高阶组件比较复杂而 React 比较简单。这主要是二者的设计思想和设计目标不同，在 React 中写组件就是在写函数，函数拥有的功能组件都有。而 Vue 更像是高度封装的函数，在更高的层面 Vue 能够让你轻松的完成一些事情，但与高度的封装相对的就是损失一定的灵活，你需要按照一定规则才能使系统更好的运行。


### Redux使用

- 创建action时，需要使用不可变值，纯函数
- 基本概念
    - const store = createStore(reducer, applyMiddleware(thunk))
    - reducer，纯函数，接收action返回新的state
    - thunk中间件，可以逗号传入多个中间件
- 单向数据流
    - 点击button（callback）=> dispatch（action）=> reducer（newState，返回全新state，不可变值） -> view改变
    - subscribe 触发通知
- react-Redux
    - Provider
    - connect
        - 作为高阶组件，将 dispatch 作为props注入到 被包裹组件中
        - AddTodo = connect()(AddTodo)
    - mapStateToProps
    - mapDispatchToProps
- 异步action
    - 默认返回一个action对象
    - 当有异步操作时，需要返回一个函数，其中有dispatch参数。此时就需要用到 中间件，比如redux-thunk
- redux 中间件原理
    - 中间件就是在单向数据流中，在dispatch的位置插入一些逻辑
    - 点击button（callback）=> 【新的dispatch，增加mid1、mid2...】dispatch（action）=> reducer（newState，返回全新state，不可变值） -> view改变

- mobx
    - 事件触发action，在action中修改state => 通过computed拿到更新的state的计算值 => 自动触发对应的reactions（包含autorun，渲染视图，when，observer等）
    - 通过observable装饰器装饰一个属性，使用Object.defineProperty来拦截对数据的访问，一旦值发生变化，将会调用react的render方法来实现重新渲染视图的功能或者触发autorun等。
    - redux和mobx的对比：
        - mobx中的状态是可变的，可以直接对其进行修改；redux使用不可变值，这意味着状态是只读的
        - mobx将数据保存在分散的多个store中；redux将数据保存在单一的store中
        - mobx使用@observable（Object.defineProperty来拦截），数据变化后自动处理响应的操作；redux使用plain object保存数据，需要手动处理变化后的操作；

### React-router

基本与vue-router差不多的

- hash模式
    - HashRouter
- history模式
    - BrowserRouter
- 路由懒加载


### 原理

- vdom和diff，参考vue部分的要点，因为vue2、vue3、react的diff算法实现都不完全相同，所以只需要掌握基础原理

- JSX本质（结合Vue模板编译来学习）
    - JSX等同于Vue模板，Vue模板不是html，JSX也不是JS，JSX即createElement函数
    - 类似于vue的 h函数，返回vnode：
        - React.createElement(tag或组件, null, [child1, child2, child3, ...])
        - React.createElement('div', {...}, child1, child2, child3, ...)
        - React.createElement(List, 标签属性, child1, child2, '文本节点', ...)
        - 注意：
            - 为了区分tag和组件，需要把组件的首字母大写
    - 使用**babel转译JSX**（注意对比vue是使用vue-template-compiler插件转译的），为render函数，返回vnode，最后执行patch

- 事件机制


- setState 和 batchUpdate
        - 有时异步（react可以管理的“入口”，即合成事件和生命周期中），有时同步（react管不到的“入口”，即异步函数和原生自定义DOM事件中）
        - 有时合并（对象形式），有时不合并（函数形式）
    - setState主流程
        - 无所谓同步还是异步，关键是看能否命中 batchUpdate机制
        - setState（newState*存入pendding队列中*）-> **判断是否处于 batch update**（isBatchingUpdates） ->
                                                                            - Y（处于，即批处理执行完了） 则保存组件到dirtyComponents中
                                                                            - N（不处于，即批处理未执行完）遍历所有dirtyComponents，调用updateComponent，更新pendding state or props
    - batchUpdate机制
        ```jsx
        increase = () => {
            // 开始：处于batchUpdate
            // isBatchingUpdates = true

            // 任何其他操作

            // 结束
            // isBatchingUpdates = false
        }
        ```
    - transaction（事务）机制
        - 事务机制，即要完成某个操作，需要先定义一个开始逻辑，定义一个结束逻辑。
            - 执行时先执行开始逻辑，再执行操作，最后要执行结束逻辑。
        - 这个机制就服务于batchUpdate机制

- 渲染/更新过程
    - **初次渲染**
        - 有了props state
        - 解析JSX为render函数
        - 执行render函数，生成vnode，由patch(elem, vnode)渲染
            - react中的`patch被拆分为两个阶段`
                - *reconciliation*阶段：执行diff算法，纯js计算
                    - fiber，会将reconciliation阶段进行任务拆分（commit阶段dom渲染，无法拆分）
                - *commit*阶段：将diff结果渲染DOM
    - **更新渲染过程**
        - setState(newState) --> 生成dirtyComponents（可能包含子组件）
        - 重新执行render函数，生成newVnode，由patch(vnode, newVnode)渲染
    - 为什么没有说vue中的patch分为两个阶段？
        - 个人理解是vue中每个组件都是一个watcher，只针对组件内部进行diff比较，通过响应式来得知哪些组件需要diff
        - 因此，在合理划分组件的情况下，diff比较量不会很大，更新的较快，不太会出现js线程对gui线程的阻塞，所以，也就没有引入fiber，并且也没有引入SCU


## 真题

- 组件间如何通讯
    - 父子组件props，传数据，传函数
    - 自定义事件
    - context广播
    - Redux

- JSX本质是什么

- Context是什么，如何使用

- SCU的用途

- redux单向数据流（画图）

- setState场景题
```js
    componentDidMount() {
        // count 初始值为 0
        this.setState({ count: this.state.count + 1 })
        console.log('1', this.state.count) // 0
        this.setState({ count: this.state.count + 1 })
        console.log('2', this.state.count) // 0

        // 注意，前两步异步，并且合并了，即count等于1

        setTimeout(() => {
            this.setState({ count: this.state.count + 1 })
            console.log('3', this.state.count) // 2
        })
        setTimeout(() => {
            this.setState({ count: this.state.count + 1 })
            console.log('4', this.state.count) // 3
        })
    }
```

- 什么是纯函数
    - 不可变值
    - 返回一个新值，没有副作用
    - 输入与输出类型一致

- React组件生命周期

- React发起ajax应该在哪个生命周期
    - 同Vue，应该放在dom渲染完的生命周期上，componentDidMount

- 渲染列表，为什么要用key
    - 同Vue，必须用key，且不能是index或random
    - diff算法中通过tag和key来判断，是否是相同节点
    - 通过key判断相同，移动，减少渲染次数，提升性能

- 函数组件与类组件的区别
    - 函数组件具有：
        - 纯函数，输入props，输出JSX
        - 没有实例，没有生命周期，没有state
        - 不能扩展其他方法
        - ！！！本质区别在于 capture values 捕获渲染值

- 受控组件与非受控组件
    - 受控组件，表单的值受到state控制，因为没有v-model，需要自行监听onChange事件来更新state
    - 非受控组件，不使用value和onChange事件，表单只接收state作为默认初值，表单的值需要通过ref获取dom来得到

- 何时使用异步组件，如何使用react-router配置异步路由
    - 同Vue，加载大组件，路由懒加载
    - React.lazy
    - React.Suspense

- redux 如何进行异步请求
    - 使用异步action
        - 同步action会直接返回一个action对象
        - 异步action会在异步中dispatch一个action
    - 使用redux-thunk

- react事件和DOM事件的区别
    - 所有事件都挂载到document上
    - event不是原生的，是SyntheticEvent合成事件对象
    - dispatchEvent统一分发事件对象
    - listenerBank匹配

- react性能优化
    - 渲染列表时加key
    - 自定义事件、DOM事件及时销毁
    - 合理使用异步组件
    - 减少函数bind this的次数
    - 避免子组件重渲
        - 合理使用SCU、PureComponent、React.memo、useCallback
    - 避免重复计算
        - 使用useMemo缓存计算结果
    - 合理使用 Immutable.js


- React 和 Vue 的区别
    - 相同点：
        - 都是组件化
        - 都是数据驱动视图
        - 都是用vdom操作DOM
    - 区别：
        - React使用JSX拥抱JS；Vue使用模板拥抱html
        - React函数式编程；Vue声明式编程
        - React需要自力更生；Vue把想要的都给你





