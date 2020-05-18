## 框架关键点

### 框架
::: details
- MVC
    - Model、View（很厚，全是逻辑）、Controller（很薄，只起到路由的作用）
    - backbone
- MVVM
    - MVVM的本质是指双向数据绑定
    - View和Model之间并没有直接的联系，而是通过一个绑定器ViewModel对象进行交互
    - Vue、Angular都是MVVM的框架，但React不是
    - 双向绑定原理
        - 「数据劫持」结合「发布订阅模式」
        - 正向绑定M->V：通过Object.defineProperty()来为数据添加getter/setter
        - 反向绑定V->M：通过绑定input或change事件，框架内部自动执行完成。
    - 关系：双向绑定 = 单向绑定 + UI事件监听。
        - 单向绑定：没有 View -> Model 这一步，需要手动绑定UI事件监听（添加onChange事件）。
    - 观察者模式（发布订阅）
        Data -》Observer(观察者）-》Dep(订阅者列表) -》 Watcher(订阅者) -》 View
- 既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff检测差异？
    - 有两种方式进行「变化侦测」，一种是pull，一种是push。
- Vue为什么没有像React一样引入SCU？
:::

### React
::: details
我们使用react16.9，也是从这个版本开始，有了hooks

- React中函数组件和类组件的区别。
    - 这里描述的是在 React 中 function 和 class 的差别，差异本身和React Hooks无关。
    - 本质区别就在于：**function components 所拥有的 捕获渲染值(Capture Value) 特性**
        - Function Component 是更彻底的状态驱动抽象，甚至没有生命周期的概念，只有一个状态，而 React 负责同步到 DOM。
        - 既然是状态同步，那么每次渲染的状态都会固化下来。
    - 「Capture Value」具体是啥意思？
        - 函数式组件，每次 Render 都有自己的 Props 与 State，可以认为每次 Render 的内容都会形成一个`快照`并保留下来，因此当状态变更而 Rerender 时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 Props 与 State。这就是 Capture Value 特性。即函数式组件中的props是不可变的。
        - 而类组件，因为使用this.props来访问状态，且this是可变的（每次渲染都不同），所以this.props总是访问最新的props。

- React中为什么需要绑定this？有几种绑定方法？

- React生命周期
    - 15（*16*）
        - 初始化阶段
        - 挂载
            - **componentWillMount**（替换为*getDerivedStateFromProps*）
            - componentDidMount
        - 更新
            - **componentWillReceiveProps**（替换为*getDerivedStateFromProps*）
            - shouldComponentUpdate
            - **componentWillUpdate**（删掉）
            - （*getSnapshotBeforeUpdate*）
            - componentDidUpdate
        - 卸载
            - componentWillUnmount
        - *错误处理*
            - （*componentDidCatch*）
    - 由于Fiber在新版本中会支持`异步渲染的特性`，而componentWillMount、componentWillReceiveProps、componentWillUpdate这3个生命周期钩子，在异步渲染模式下会有一些潜在的问题，因此被弃用。

- 如何避免组件的重新渲染？
    - 直接用PureComponent，就自带了 shallowEqual 的 shouldComponentUpdate。
    - 使用 React.memo()：也会实现浅比较
    - 在hooks中，使用useMemo
        - Only re-rendered if `a` changes: const child1 = `useMemo(() => <Child1 a={a} />, [a])`;

- Refs 3种使用方式（字符串、回调refs、creatRef()）

- Vitrual Dom 的「优势」在于
    - 无需手动操作dom
    - 保证性能下限
    - 可跨平台

- setState

- hooks的好处是啥？
    - 从类组件的一些弊端说起：
        - 1、复用一个有状态的组件太麻烦，虽然有 渲染属性（Render Props） 和 高阶组件（Higher-Order Components），但这些方式会增加很多组件层级嵌套；而使用 hooks，没有多余的层级嵌套，把各种想要的功能写成一个一个可复用的自定义hook，直接在组件里调用这个hook即可。
        - 2、生命周期钩子函数里的逻辑太乱。我们希望的是，一个函数只做一件事，但生命周期钩通常做了很多不同的事，甚至在不同的钩子中还会做相同的事。
        - 3、class 的使用让人困惑，要繁琐的处理this绑定问题；另外，如果一个无状态function组件需要有自己的state时，又需要改成class组件。。而hooks没有这样的烦恼
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
        - 这也是为什么，hooks必须卸载函数的最外层，而不能写在循环或条件语句中。
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

- key
    - 准确复用、快速

- diff
    - tree diff：两棵树 只对同层次节点 进行比较，不考虑跨层级
    - component diff：拥有相同类的两个组件 生成相似的树形结构，拥有不同类的组件....
    - element diff：对于同一层级的一组子节点，通过唯一key区分。

- setState
    - 同步还是异步的
        - 本身是同步的，是因为react的批处理策略，会先添加到队列中批量执行，才看起来像异步的
        - 可以立刻拿到变化后值的场景：
            - 如果是在异步事件中，添加到异步队列的事件晚于批处理策略执行，所以可以拿到最新的
            - 在原生事件中，setState不会触发批处理策略，因此也能拿到最新值
        - 可通过第二个参数返回一个回调函数，此回调总是在批处理策略后执行，所以肯定能拿到更新后的值
    - 多次传入对象来更新，会合并为一次更新
    - 多次传入函数来更新，每次都会立即更新，后执行的函数会以前一次的函数更新结果为输入值

- fiber
    - fiber的出现，是React为了解决`「主线程阻塞」`的问题
    - `「主线程阻塞」`是因为JS引擎与GUI引擎互斥执行，当react对较大的组件树进行**协调算法**时，会持续占用主线程，且协调过程一气呵成不能被打断。
    - Vue得益于其可以精确定位节点更新，所以采用的策略是，把更新做得足够快，理论上就不需要时间分片了。
    - 而React采用的策略是，时间分片，通过某种调度，合理分配CPU资源，从而提高浏览器的用户响应速录，同时兼顾任务执行。
        - React@15使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。即不能被打断。
        - React@16 的 Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，让协调 过程变成可中断的，适时地让出CPU执行权。
    - 综上：
        - Fiber 也称「协程」，是一种控制流程的让出机制；
        - Fiber 也称「纤维」，是一种数据结构或者说执行单元。
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
            - 1、React的生命周期和合成事件中，React仍然处于它的批处理更新机制中，这时无论调用多少次 setState，都不会立即执行更新
            - 2、异步代码中调用 setState时，React的批处理机制已经走完，这时再调用完后就能立刻拿到更新后的结果。
            - 3、在原生事件中调用 setState并不会触发 React的批处理机制，所以立即能拿到最新结果
            - 最佳实践，使用回调拿到更新
        - 连续多次setState只有一次生效？（队列合并机制）
            - 以对象形式更新时，React会将批处理机制中存储的多个setState进行合并
            - 以函数形式更新时，每次都立即计算
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
- 

:::
### Vue
::: details
- Vue
    - Vue2 Object.defineProperty
        - 只能对属性进行数据劫持，不能对整个对象、数组进行劫持；
        - 通过「遍历数组」和「递归遍历对象」
        - object.defineProperty 与 reflect.defineProperty 区别
        - 不能检测到添加或删除的属性，解决：
            - vm.$set(obj, propertyName, value)
            - vm.profile = Object.assign({}, vm.profile, { age: 27 });
            - vm.$delete(obj, key)
        - 数组方面不能检测 根据索引改变元素，以及直接改变数组长度，解决：
            - vm.$set(vm.items, index, newValue)
            - vm.items.splice(newLength)
        - 用Proxy代替Object.defineProperty的优势？
            - Object.defineProperty 通过递归遍历 data对象；而Proxy能劫持一个完整的对象
            - Object.defineProperty 无法监控到数组方面的某些变动，虽然vue特殊处理了8个数组方法；但Proxy提供了13种劫持方法
            - Object.defineProperty只能遍历对象属性直接修改；而Proxy返回的是一个新对象，可以只操作新的对象达到目的
        - Vue没有完全遵循MVVM设计规则，提供了$refs这个属性，让Model可以直接操作View，这意味着在实例之外去访问实例状态。
    - Vue虽然是双向数据绑定，但也是 单向数据流 的，即状态只能从上向下传，不能改变props
    - Vue2.x组件通信有哪些方式
        - 1、父子组件通信
            - props，$on、$emit；
            - $refs
            - $parent, $children
        - 2、兄弟组件通信
            - EventBus，一个空的 Vue 实例作为中央事件中心，Vue.prototype.$bus = new Vue
            - Vuex
        - 3、跨级组件通信
            - Vuex
            - Provide、inject
            - 根实例$root
            - $attrs、$listeners
    - 非prop特性
        - 以HTML特性形式，自动添加到组件的根元素上，将已有的同名特性进行 替换 或 与其进行智能合并
    - nextTick 实现原理
        - 在下次 DOM 更新循环结束后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。
            - 优先以 micro-task 方式执行，检查是否支持promise
            - 降级的话到 macro-task：setImmediate -》 MessageChannel -》 setTimeout 0
    - Vue的生命周期
        - 4组8个 + keep-alive的2个
        - 父子组件生命周期执行顺序
            - 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
            - 父beforeUpdate->子beforeUpdate->子updated->父updated
        - 接口请求一般放在哪个生命周期中？
            - created和mouted差别不大，
            - 不过推荐放在created，更早获取数据，且ssr没有mount钩子，使用created有助于一致
        - 父组件如何监听子组件的生命周期？
            - @hook:mounted="doSomething"
    - this.$refs为什么会是undefined
        - $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
    - Computed 和 Watch
        - 缓存与命令式
    - v-if和v-show的区别
        - v-if 是真正意义上的条件渲染，控制销毁与重建
        - v-show 始终都会渲染的，只是通过display: none来控制显示，在Dom tree中 不在render tree中
    - v-if和v-for能不能写在同一个标签中？
        - （能，但会造成性能问题，v-for优先级高，循环判断，此场景可使用computed先过滤）
    - 组件中的data为什么是一个函数？
        - 保证组件不同的实例之间data不冲突
    - Vue模版编译原理（compiler）
        - 1、parse过程（生成AST树）
        - 2、optimize过程（优化，标记静态节点diff跳过）
        - 3、generate过程（生成render字符串）
    - v-model的原理
        - value + input方法的语法糖
    - Vue双向绑定原理实现
        - 1、实现一个监听器 Observer
        - 2、实现一个解析器 Compile
        - 3、实现一个订阅者 Watcher
        - 4、实现一个订阅器 Dep
    - Vue2.x和Vue3.x渲染器的diff算法
        - Vue2.x的核心Diff算法采用了 双端比较 的算法，也将O(n^3)复杂度 转化为 O(n)复杂度，相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。
        - Vue3.x 在创建VNode时就确定其类型，在patch过程中使用位运算判断Vnode类型，结合核心diff算法，提升性能
    - Vue中的key到底有什么用（3点）
        - 复用: 新旧 children 中的节点**只有顺序是不同的时候**，「最佳实践」应该是通过**移动元素**
        - 准确: 如果不加key，那么vue会选择复用节点(Vue的**就地更新策略**)，会出bug
        - 快速: key的唯一性，相比于遍历查找的时间复杂度O(n)，**Map**的时间复杂度仅仅为**O(1)**.
    - keep-alive：组件缓存
- Vuex
    - 组成
        - State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
        - Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
        - Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
        - Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
        - Module
    - dispatch和commit提交mutation的区别
        - commit => mutations，用来触发同步操作的方法。
        - dispatch => actions，用来触发异步操作的方法。actions还可以封装多个mutations提交。
    - 为什么Vuex中mutation不能执行异步操作？
        - 为了 devtools 实现 time-travel

:::



<!-- *********************************************************************************************************** -->
### details
::: details
- 框架
    - MVC
        - Model、View（很厚，全是逻辑）、Controller（很薄，只起到路由的作用）
        - backbone
    - MVVM
        - MVVM的本质是指双向数据绑定
        - View和Model之间并没有直接的联系，而是通过一个绑定器ViewModel对象进行交互
        - Vue、Angular都是MVVM的框架，但React不是
        - 双向绑定原理
            - 「数据劫持」结合「发布订阅模式」
            - 正向绑定M->V：通过Object.defineProperty()来为数据添加getter/setter
            - 反向绑定V->M：通过绑定input或change事件，框架内部自动执行完成。
        - 关系：双向绑定 = 单向绑定 + UI事件监听。
            - 单向绑定：没有 View -> Model 这一步，需要手动绑定UI事件监听（添加onChange事件）。
        - 观察者模式（发布订阅）
            Data -》Observer(观察者）-》Dep(订阅者列表) -》 Watcher(订阅者) -》 View

    - 既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff检测差异？
        - 有两种方式进行「变化侦测」，一种是pull，一种是push。
        - pull
            - 即 系统不知道数据是否已改变，需要进行 pull
            - 以 React 为代表，setState显式更新，react知道变化了但是不知道哪里变了，所以会比较暴力的一层层对VDom进行diff，并patch到dom上
        - push
            - 即 在数据变动时会立刻知道哪些数据改变，这就是push，不过push模式还有个 粒度控制问题（更细的粒度意味着 付出更多相应内存开销、建立依赖追踪开销的代价）
            - 以 Vue 为例，当 Vue 初始化时，就会对数据data进行依赖收集，每此数据绑定都要实例化一个watcher，如果粒度过细，开销就非常大
            - 因此，Vue 采用混合式：「push + pull」：
                - Vue在组件级别选择 push方式，每个组件都是 Watcher，一旦某个组件发生变化Vue立刻就能知道；
                - 而在组件内部选择 pull方式，使用 VDOM Diff 进行比较。
            - 这也回答了问题，为什么数据劫持了还需要diff，因为不是彻底的push方式
    - Vue为什么没有像React一样引入SCU？
        - React 提供SCU（shouldComponentUpdate）来避免对那些肯定不会变化的组件进行Diff检测。
        - Vue 本身就是push+pull的侦测模式，在组件级别无需SCU，而在组件内部diff的工作量也不大，合理划分的话就没必要引入SCU了

    - Vue
        - Vue2 Object.defineProperty
            - 只能对属性进行数据劫持，不能对整个对象、数组进行劫持；
            - 通过「遍历数组」和「递归遍历对象」
            - object.defineProperty 与 reflect.defineProperty 区别
            - 不能检测到添加或删除的属性，解决：
                - vm.$set(obj, propertyName, value)
                - vm.profile = Object.assign({}, vm.profile, { age: 27 });
                - vm.$delete(obj, key)
            - 数组方面不能检测 根据索引改变元素，以及直接改变数组长度，解决：
                - vm.$set(vm.items, index, newValue)
                - vm.items.splice(newLength)
            - 用Proxy代替Object.defineProperty的优势？
                - Object.defineProperty 通过递归遍历 data对象；而Proxy能劫持一个完整的对象
                - Object.defineProperty 无法监控到数组方面的某些变动，虽然vue特殊处理了8个数组方法；但Proxy提供了13种劫持方法
                - Object.defineProperty只能遍历对象属性直接修改；而Proxy返回的是一个新对象，可以只操作新的对象达到目的
            - Vue没有完全遵循MVVM设计规则，提供了$refs这个属性，让Model可以直接操作View，这意味着在实例之外去访问实例状态。
        - Vue虽然是双向数据绑定，但也是 单向数据流 的，即状态只能从上向下传，不能改变props
        - Vue2.x组件通信有哪些方式
            - 1、父子组件通信
                - props，$on、$emit；
                - $refs
                - $parent, $children
            - 2、兄弟组件通信
                - EventBus，一个空的 Vue 实例作为中央事件中心，Vue.prototype.$bus = new Vue
                - Vuex
            - 3、跨级组件通信
                - Vuex
                - Provide、inject
                - 根实例$root
                - $attrs、$listeners
        - 非prop特性
            - 以HTML特性形式，自动添加到组件的根元素上，将已有的同名特性进行 替换 或 与其进行智能合并
        - nextTick 实现原理
            - 在下次 DOM 更新循环结束后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。
                - 优先以 micro-task 方式执行，检查是否支持promise
                - 降级的话到 macro-task：setImmediate -》 MessageChannel -》 setTimeout 0
        - Vue的生命周期
            - 4组8个 + keep-alive的2个
            - 父子组件生命周期执行顺序
                - 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
                - 父beforeUpdate->子beforeUpdate->子updated->父updated
            - 接口请求一般放在哪个生命周期中？
                - created和mouted差别不大，
                - 不过推荐放在created，更早获取数据，且ssr没有mount钩子，使用created有助于一致
            - 父组件如何监听子组件的生命周期？
                - @hook:mounted="doSomething"
        - this.$refs为什么会是undefined
            - $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
        - Computed 和 Watch
            - 缓存与命令式
        - v-if和v-show的区别
            - v-if 是真正意义上的条件渲染，控制销毁与重建
            - v-show 始终都会渲染的，只是通过display: none来控制显示，在Dom tree中 不在render tree中
        - v-if和v-for能不能写在同一个标签中？
            - （能，但会造成性能问题，v-for优先级高，循环判断，此场景可使用computed先过滤）
        - 组件中的data为什么是一个函数？
            - 保证组件不同的实例之间data不冲突
        - Vue模版编译原理（compiler）
            - 1、parse过程（生成AST树）
            - 2、optimize过程（优化，标记静态节点diff跳过）
            - 3、generate过程（生成render字符串）
        - v-model的原理
            - value + input方法的语法糖
        - Vue双向绑定原理实现
            - 1、实现一个监听器 Observer
            - 2、实现一个解析器 Compile
            - 3、实现一个订阅者 Watcher
            - 4、实现一个订阅器 Dep
        - Vue2.x和Vue3.x渲染器的diff算法
            - Vue2.x的核心Diff算法采用了 双端比较 的算法，也将O(n^3)复杂度 转化为 O(n)复杂度，相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。
            - Vue3.x 在创建VNode时就确定其类型，在patch过程中使用位运算判断Vnode类型，结合核心diff算法，提升性能
        - Vue中的key到底有什么用（3点）
            - 复用: 新旧 children 中的节点**只有顺序是不同的时候**，「最佳实践」应该是通过**移动元素**
            - 准确: 如果不加key，那么vue会选择复用节点(Vue的**就地更新策略**)，会出bug
            - 快速: key的唯一性，相比于遍历查找的时间复杂度O(n)，**Map**的时间复杂度仅仅为**O(1)**.
        - keep-alive：组件缓存
    - Vuex
        - 组成
            - State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
            - Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
            - Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
            - Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
            - Module
        - dispatch和commit提交mutation的区别
            - commit => mutations，用来触发同步操作的方法。
            - dispatch => actions，用来触发异步操作的方法。actions还可以封装多个mutations提交。
        - 为什么Vuex中mutation不能执行异步操作？
            - 为了 devtools 实现 time-travel





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
                - 1、React的生命周期和合成事件中，React仍然处于它的批处理更新机制中，这时无论调用多少次 setState，都不会立即执行更新
                - 2、异步代码中调用 setState时，React的批处理机制已经走完，这时再调用完后就能立刻拿到更新后的结果。
                - 3、在原生事件中调用 setState并不会触发 React的批处理机制，所以立即能拿到最新结果
                - 最佳实践，使用回调拿到更新
            - 连续多次setState只有一次生效？（队列合并机制）
                - 以对象形式更新时，React会将批处理机制中存储的多个setState进行合并
                - 以函数形式更新时，每次都立即计算
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




:::

