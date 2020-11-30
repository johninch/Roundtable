- 连等赋值
- 错误捕获
    - 捕获运行错误
    - 捕获资源加载错误
    - error事件捕获
    - 跨域js运行错误捕获
    - 错误上报
- 0.1+0.2 !== 0.3；toString(2)仅保存52位尾数
- Symbol特性
- 前端性能优化方向
    - 缓存
    - 发送请求（重定向、DNS预解析、优化DNS、preconnect）
    - 服务端响应（进程负载均衡、服务器负载均衡）
    - 页面解析与处理（引用位置、defer与async、白屏优化-webapck骨架屏插件-SSR同构）
    - 页面静态资源（CDN、预加载prefetch与preload、代码拆分与按需加载、Tree-Shaking、useBuiltIns、打包压缩、图片webp）
    - 运行时（强制同步布局rAF、长列表优化、rAF任务分帧、idleCallback、web-worker并行计算、减少重排重绘尤其是重排的发生率、开启硬件加速单独触发合成层transform:translateZ(0)、防抖节流、滚动优化passive以及pointer-event禁用hover效果）
- 正向代理与反向代理
- 前端鉴权
    - session-cookie
        - 关键缺点
    - 有状态token
        - 解决seesionId的缺点，共享
    - 无状态token：JWT
    - 前端存储和发送Token的两种方式
    - 单点登录SSO
    - OAuth2.0
- 前端安全
    - XSS
        - 存储型
        - 反射型
        - DOM型
        - 3种两类，分别如何防范
    - CSRF
    - 中间人劫持
- 网络基础
    - http报文组成
    - http方法
        - get与post区别
        - 状态码
        - 重定向跨域问题
        - 常用端口 80 443 53
        - 工作模式
            - 普通模式
            - 持久连接
                - 管线化
            - http1.0 http1.1 http2.0
                - 1.1与2.0的显著区别
                - 2.0特性
            - https
                - 混合加密方式，特点
                - https验证过程
                - 中间人劫持，防止
    - 五层网络协议
    - DNS查询
    - TCP、UDP
        - 二者区别（面向链接与无链接，可靠与不可靠，面向字节流与数据包、1对1与多对多）
        - TCP如何保证可靠交付（说一下）
    - 三次握手与四次挥手
- 浏览器
    - 浏览器渲染过程
        - 重排与重绘
        - js如何设置获取盒模型对应的宽和高
    - 浏览器多进程
    - 浏览器渲染进程（浏览器内核）
        - 5大类线程
            - 互斥
        - Event Loop，事件循环
            - 同步任务与异步任务，任务队列如何工作，5类线程如何相互配合
            - 宏任务、微任务
                - 任务列举
                - 执行顺序
    - 浏览器工作原理
        - 进程与线程的区别
        - 进程间通信
        - 线程间通信
    - 浏览器存储
- 跨域问题
    - 判断是否跨域
    - 跨域策略
        - 1、CORS
            - 简单请求
                - 鉴别简单请求
                - 流程
                - 默认cookie不包括在CORS请求中，如何开启
            - 非简单请求
                - 流程
                    - OPTIONS预检请求
                    - 指定预检请求发送频率
        - 2、服务器代理
        - 3、JSONP
            - 原理
            - 手写
            - 只能get
        - Hash、postMessage、WebSocket、document.domain、window.name
- ES
    - JS = ES + Web API
    - nodejs = ES + nodejs API
- ES6
    - let const
        - 6种声明变量方式
        - 块级作用域
        - 暂时性死区（没有变量提升）
        - 重复声明和赋值
    - 箭头函数
- ts
    - 优点
    - type和interface的区别
- 列举常用算法的优缺点及时间复杂度
    - O(n^2) 与 O(nlogn)
    - 稳定 与 不稳定
    - 快排手写
        - Array.prototype.sort()底层实现
        - topK问题问题
- js原型链与对象
    - 创建对象的3种方法
    - 构造函数、实例、原型对象 间的关系
    - 原型链的工作原理
    - 实现new操作符
- js基本数据类型
    - 6基本+1引用(5个)
    - 原始类型的特性——不可变性
    - 栈内存与堆内存
    - 基本类型与引用类型的 复制、比较、值传递与引用传递
        - ES中函数参数都是值传递
- 盒模型
    - box-sizing
        - offsetWidth 水平方向 width + 左右padding + 左右border-width
        - clientWidth 水平方向 width + 左右padding
    - JS如何设置获取盒模型对应的宽和高（4种）
    - 外边距重叠：垂直方向
    - BFC(块级格式化上下文)
        - 特性
        - 创建BFC
- CSS 3种定位机制：普通流、浮动和绝对定位
    - display
        - 行内元素
        - 块级元素
        - line-height：1.5，line-height：150%以及line-height：1.5em的区别
    - position
        - 相对定位
            - relative
        - 绝对定位
            - fixed
            - absolute
        - 奇技淫巧：fixed相对于父元素定位
    - 居中
        - 垂直居中
        - 水平居中
- PNG，JPG，GIF，WEBP的区别
- CSS
    - 选择器优先级
        - 样式表中定义在后面的会覆盖之前的
    - flex布局
        - flex：1 （1 1 0）
    - 多种方式实现三栏布局
    - 最后一行左对齐问题
        - flex
            - 案例：每一行列数是固定的
                - 根据个数最后一个元素动态margin
                ```css
                /* 如果最后一行是3个元素 */
                .list:last-child:nth-child(4n - 1) {
                    margin-right: calc(24% + 4% / 3);
                }
                /* 如果最后一行是2个元素 */
                .list:last-child:nth-child(4n - 2) {
                    margin-right: calc(48% + 8% / 3);
                }
                ```
            - 案例：子元素宽度不固定，最后一行左对齐
                - 方法1：最后一项margin-right: auto
                - 方法2：::after伪元素flex:auto 或 flex:1
                ```css
                /* 方法1 */
                .container:nth-of-type(1) > :last-child {
                    margin-right: auto;
                }
                /* 方法2 */
                .container:nth-of-type(2)::after {
                    content: '';
                    flex: auto;    /* 或者flex: 1 */
                }
                ```
            - 案例：每一行列数不固定
                - 使用足够的空白标签进行填充占位
        - Grid布局
            - 天然有gap间隙，且天然格子对齐排布，因此，实现最后一行左对齐可以认为是天生的效果。
            - 但是repeat()函数兼容性不好，IE不支持
    - 经典布局 Sticky Footer
        - 方法1：absolute（需指定 html、body 100% 的高度，wrapper的min且 content 的 padding-bottom 需要与 footer 的 height 一致。）
        - 方法2：Flexbox（指定flex容器为纵向，content flex 1自动占满可用空间）
- 移动端问题
    - JSBridge原理
        - 实现原理（异步双向）
            - JavaScript 调用 Native
                - 1. 注入 API（推荐）
                    - webView.window[funcName] = NativeSomeFunc
                - 2. 拦截 URL SCHEME
                    - 例如iframe.src，Native拦截后根据URL参数去做操作
            - Native 调用 JavaScript
                - 执行拼接 JavaScript 字符串，JavaScript 的方法必须在全局的 window 上
    - fastClick
        - 解决点击穿透现象
        - 原理：在检测到touchend事件的时候，会通过DOM自定义事件立即触发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉
        - 实现：`在 touchend 阶段 调用 event.preventDefault`，然后通过 `document.createEvent 创建一个 MouseEvents，然后 通过 event​Target​.dispatch​Event 触发对应目标元素上绑定的 click 事件。`
        - 除fastClick外，其他解决点击穿透的方案：
            - pointer-event
            - 蒙层mask延迟消失
    - 移动端适配
        - 设备像素比 ＝ 物理像素 / 设备独立像素(即CSS像素)；
        - 适配方案
            - lib-flexible
            - Viewport（vw）
                - 1vw等于window.innerWidth的1%
                - PostCSS的插件`postcss-px-to-viewport`
                - PostCSS插件`postcss-aspect-ratio-mini`
                - PostCSS插件`postcss-write-svg`
    - 1px border问题
        - 1px（css像素） * 2（dpr）=> 2px（设备物理像素）
        - PostCSS插件`postcss-write-svg`
        - 解决
            - viewport 设置rem基准
            - 伪类 + transform 实现
            - 使用border-image实现
            - 使用box-shadow模拟边框
            - 直接写0.5px边框
                - 这种方法有的浏览器不支持，会识别为0px
- 事件流
- 防抖和节流
    - 防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次。
        - 各自的原理
        - 各自的场景
            - 防抖：输入联想、点赞点击
            - 节流：滚动、上拉加载、下拉刷新
        - 各自的代码实现
- js作用域
    - 工作流程（全局执行上下文压入执行栈，永不弹出，函数作用域陆续压入栈，执行完出栈，内存垃圾回收，上下文控制权交替）
    - this绑定规则
    - 闭包
        - 创建
        - 闭包缺点
        - 清除闭包常驻内存
    - 垃圾回收机制
    - 内存泄漏的原因
    - 变量提升、函数声明提升
- 数据结构
    - 数组
        - 广义上数组和链表的区别
        - js中数组特点
    - Set和Map
- JS遍历对象的方法
    - for in for of
    - for in
    - Object.keys
    - Object.getOwnProperty
- 继承
    - ES5
    - ES6
    - 原理区别
- JS模块化规范
    - cjs
    - esm
    - ES6 Module 与 CommonJS 两种模块化规范的比较
        - 输出类型不同 - 执行时机不同 - 执行位置不同 - 性能差异 - 循环加载时处理不同
- web worker
    - 3种两类不同场景
- Webpack
    - 打包分包一般结果
    - module、chunk、bundle间的关系
    - 打包后文件
    - webpack构建流程
    - 关键词
    - 常用loader和plugin
    - 提高webpack开发效率
    - 对bundle体积进行监控和分析
    - loader执行顺序
        - enforce
    - 生产环境使用source map
    - 文件指纹chunkhash
    - 持久化缓存caching（注意id问题）
    - 如何将文件名发送到浏览器
    - webpack 动态加载就两种方式
    - code splitting
        - 代码分割入手点（如何分割）
    - 魔法注释
    - webpack4模式
    - webpack文件监听原理
    - 优化 Webpack 的构建速度
        - 1、分包构建
            - 1、extenals外部扩展（CDN）
            - 2、DLLPlugin && DllReferencePlugin
                - DllPlugin 进行分包，生成两个文件（bundlejs、bundle.mainifest.json）；
                - DllReferencePlugin 对 bundle.manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
        - 2、摇树优化 Tree shaking
        - 3、作用域提升 Scope hoisting
        - 4、多进程并行压缩代码
        - 5、利用 缓存提升二次构建速度
    - webpack常用配置技巧
    - babel转译过程
- 前端路由模式
    - SPA
    - 前端路由需要实现 2点
    - hash、history模式都可以实现上述两点
        - hash模式 原理
        - history模式 原理
            - history模式为什么需要后端支持？
    - 如何选择模式
- SSR 服务端渲染和同构原理
    - 为什么要服务端渲染（SSR）
    - 主流的SSR框架有
    - 传统SSR 与 CSR客户端渲染（SPA）
    - 前端同构应用（SSR + SPA）
    - 同构应用需要解决的3个问题
    - SSR 之所以能够实现的本质
    - SSR生命周期注意点：（*mount钩子都不支持ssr端*）
    - 其他要注意的问题
- git
    - git pull = git fetch + git merge
    - git rebase
- base64


- Vue组件化
    - 常用通信方式
    - 事件总线
    - 非prop特性，隔代透传
    - provide/inject
    - 插槽
        - 匿名插槽
        - 具名插槽
        - 作用域插槽
    - 通用表单组件
        - 属性继承
        - 触发校验
        - 监听校验
        - 校验规则和校验值传递
        - 校验规则如何对应（指定prop属性，相当于key）
        - 校验如何完成
        - 全局校验
    - 通用弹窗组件
        - 在当前vue实例之外独立存在，通常挂载于body
        - 通过JS动态创建的，不需要在任何组件中声明
        - 创建组件实例，如果没有组件实例，就无法实现挂载，也就不能转化为真实的dom元素出现在页面中
            - 使用Vue.extend得到组件实例
        - 一般 $mount() 需要指定挂载点，比如弹窗组件应挂载到body上，但这里的行为是覆盖的，所以应该之后追加到body上而不是直接挂载覆盖
            - $mount()会产生一个真实节点$el，可以手动追加到body上
- Vue全家桶
    - 开发vue插件
        - MyPlugin.install = function (Vue, options)
        - Vue.use()的作用，安装Vue插件，其实就是调用插件里的install方法
        - Vue.use() 必须在调用 new Vue() 之前调用
    - vue-router
        - 通过全局混入，beforeCreate()，将 router实例 挂载到 Vue的原型对象 上
        - 定义两个全局组件 router-link, router-view
    - vuex
        - 集中式
        - 可预测
        - 使用 Vue.util.defineReactive(this, 'prop', initialData)，给实例添加响应式属性state
- 手写Vue1
    - MVVM框架三要素
    - 数据响应式中需要处理的几个问题
        - 1. 解决嵌套对象问题：如果val是对象，需要递归，obj.baz.a = 10
        - 2. 解决赋值是对象的情况：如果newVal是对象，也要做响应式处理，obj.baz = { a: 20 }
        - 3. 解决添加/删除了新属性无法检测的问题：set(obj, key, val)
        - 4. defineProperty无法好的处理数组的length问题，因此必须有一套新的方案，即重写了数组的7个方法。
    - Vue1：data中的每个key都对应一个Dep，每个key可能出现多次，每次出现都对应一个watcher，所以Dep可能含有多个watcher
        - Observer：defineReactive，
            - Dep.target && dep.addDep(Dep.target)
        - watcher: 依赖收集，跟视图中的依赖一对一
            - Dep.target = this; this.vm[this.key] // 触发上面的get; Dep.target = null
        - dep：和某个key对应，管理多个watcher，数据更新时通知他们做更新
    - 其实这里实现的是Vue1版本，没有涉及虚拟dom，都是直接更新dom，那么为什么不需要虚拟dom呢？因为Vue1版本中，对每个视图依赖都对应一个watcher实例，我们清楚的知道该更新谁，该如何更新。我们的监听粒度非常细，根本不需要虚拟dom。
    - 实现数组响应式
        - Object.defineProperty()对数组无效，而改变数组的方法只有7个，因此，解决方法就是：替换数组实例的的7个原型方法，让他们在修改数组时，还可以通知更新
        - 找到数组原型
        - 覆盖那些能够修改数组的更新方法（7个），使其可以通知更新
        - 将得到的新的原型，设置到到数组实例原型上
- Vue2源码分析
    - 每个组件对应一个watcher，watcher执行updateComponent
    - Observer：new Observer()，返回ob实例，ob判断value类型，做响应式处理
        - 每个ob对传入value的不同类型，做不同方式的响应式处理
            - 对象：walk()遍历所有key，执行 defineReactive() 数据的拦截访问
                - defineReactive()，每个key生成一个dep（小管家）
            - 数组：处理 observerArray()
    - Dep：依赖管理，变更通知
        - 有两种dep：Object和Array都伴生Observer，每个ob都生成一个大管家dep（data、obj），每个key都生成一个小管家dep（obj、foo）
            - 大管家ob.dep，未来当前对象动态添加或删除属性，通知视图更新；如果是数组，如果有数据动态加入或移除，通知视图更新。
            - 小管家dep，负责对应key值的变化后，通知视图更新
        - dep依赖收集 dep.depend()
        - dep通知更新 ob.dep.notify()
    - Watcher：数据变更后执行更新
        - dep和watcher间的映射关系（其实是 N对N 的关系）
        - render watcher：组件watcher，每个组件一个
        - user watcher：用户定义的表达式watcher
    - 批量异步更新策略
        - Vue高效的 秘诀 ，是一套 批量、异步 的更新策略
        - nextTick中，定时器函数timerFunc的 回退规则
    - 虚拟DOM和diff算法
        - 优点：轻量快速，跨平台
        - 必要性：vue2相比于vue1，中等粒度的变化侦测
        - diff算法，树级别patch比较，同层比较，深度优先
            - 递归更新节点patchVnode()
            - updateChildren重排子节点
        - 不加key，会使用就地复用更新策略，会出错；且不推荐用index做key，不稳定
    - 模板编译
        - 解析、优化、生成
        - 在vue的optimize优化器中，主要就是做了一件事情
            - 在AST中找出静态子树并打上标记（静态子树是在AST中永远不变的节点，如纯文本节点）。
            - 标记静态子树 的好处:
                - 每次重新渲染，不需要为静态子树创建新节点
                - 虚拟DOM中patch时，可以跳过静态子树
    - 组件化机制
        - 组件实例化：自上而下创建，自下而上挂载
    - hookEvent钩子事件：@hook:updated
- vue ts
    - 函数重载：先声明，再实现。最后实现时需要同时兼容之前所有的重载
    - 泛型：不预先指定具体的类型，而 在使用的时候再指定类型 的一种特性
        - 可以使 接口返回的data类型，与调用getResult函数时，传入的泛型一致
    - 装饰器
        - 注意！ts里面使用装饰器，因为不是规范，所以是需要使用babel去转义
        - 装饰器分类
            - 类装饰器
            - 类装饰器工厂：返回一个装饰器函数，接收额外参数以对装饰器进行额外的配置
            - 方法装饰器
            - 属性装饰器
            - 属性装饰器工厂
- vue 最佳实践
    - svg icon的最佳实践
    - 配置策略
        - 环境变量和模式
    - 权限控制
        - 路由权限控制：路由守卫
        - 细粒度：按钮权限
            - 自定义指令v-permission="['admin', 'editor']
                - 该指令只能删除挂载指令的元素，对于那些额外生成的和指令无关的元素无能为力，此时只能使用v-if来实现
            - 直接使用v-if结合mixin的方式，匹配权限后决定是否渲染节点
    - 动态路由
    - 动态导航菜单
    - axios服务封装
    - 数据Mock
    - 请求代理解决跨域
    - 测试分类
        - 黑盒测试，比如 E2E测试（End To End，即端对端测试）
        - 白盒测试，比如单元测试，还有集成测试，就是集合多个测试过的单元一起测试
- vue3 + 响应式原理
    - 三大核心模块
        - @vue/reactivity，独立的响应式模块，可在任何地方将一个数据响应式
        - runtime，运行时模块
        - compile，编译器，重大变化
    - vue3中不会再有vue.xxx这种静态方法，api需要import进来，利于tree shaking
    - Composition API
        - 为了实现基于函数的逻辑复用而产生
        - Options API vs Composition API
        - 逻辑组合复用的优势
        - 使用
            - setup
            - 对象响应式，使用 reactive()
            - 单值响应式，使用 Ref 做包装
            - effect
            - watchEffect
    - vue3响应式原理
        - vue3看起来写法和react非常像，但实现原理是完全不同的
        - Proxy优缺点
            - 优点：
                - Vue3中不是一开始就递归到底响应化，而是一种「运行时的代理」
                - Proxy能劫持一个完整的对象，不像defineProperty需要递归遍历
                - Proxy提供了13种劫持方法
                - Proxy返回的是一个新对象，可以只操作新的对象达到目的
            - 缺点：
                - proxy缺点就是兼容性差，ie11都不好支持了（proxy又没法垫片），所以尤大说未来可能会出一个vue3降级版
        - proxy代理对象，如果存在嵌套对象的情况，则需要递归做代理
            - 递归代理只发生在嵌套对象属性 被读到时，才会执行，所以是一种「运行时的代理」
        - 依赖收集
            - 需要实现3个函数
                - effect：将回调函数保存起来备用，*立即执行一次回调函数触发它里面一些响应数据的getter* （此时触发getter中的track，track会将effectStack最新一个effect cb收集起来）
                - track：getter中调用track，把前面存储的回调函数和当前target，key之间建立映射关系
                - trigger：setter中调用trigger，把target，key对应的响应函数都执行一遍
        - Vue3为什么更快
            - Proxy取代defineProperty
            - 静态标记。可以做到真正意义上的按需更新
                - vue2也有静态标记，但做的比较粗糙，只对静态节点（子树）做了static标记
                - vue3中的静态标记，在vue2标记静态子树的基础上，对于动态节点做了非常精细的标记：
                        - 对于静态属性，是不用遍历的，不用diff的
                        - 对于文本，以及动态属性，动态id，动态class等等只要是动态的属性，都可以按位运算符，生成flag标记，详细标记哪些需要遍历diff
                        - 因此，有了vue3的静态标记，在做虚拟DOM的patch时，能够做到精确更新，极大提高了diff性能
        - Vue3为什么不引入fiber
- vite
    - 对标webpack
    - 现代浏览器都支持 type="module"，原生支持es6的import写法
    - vite解决的是开发体验，对于线上生产环境打包，还是需要使用rollup或者webpack


- React组件化
    - 组件的跨层级通信：Context
        - 创建：React.createContext
        - 提供：Context.Provider
        - 消费：
            - class.contextType
            - Context.Consumer
            - useContext
    - 高阶组件：HOC
        - 是一个函数，参数是一个组件，返回一个新组件
        - 高阶组件的链式调用
        - 装饰器写法
            - 装饰器只能用在class上
            - 装饰器的链式调用，执行顺序从下往上
        - 不要在 render 方法中使用 HOC
    - 表单组件实现
        - antd3 中 form 实现是基于 rc-form ，使用高阶组件的方式 ，存到form顶层的state当中，但是antd3的设计有个 缺点，就是一个局部表单项变化更新，会引起整个表单都更新，性能上不佳。antd4改进了这问题。
        - antd4 form 基于 rc-field-form（context, hook），相比于3的改进，antd4不将状态存在form顶层，而存在store当中
        - ref不能直接通过props传递，会被过滤掉，forwardRef转发
        - useImperativeHandle 可以让你在使用ref时，自定义暴露给父组件的实例值。useImperativeHandle 应当与forwardRef一起使用。
    - 弹窗组件实现
        - 弹窗内容在A处声明，却在B处展示
        - 传送门Portal，createPortal(MyCmp, 挂载点node)，从react-dom中导入
- Redux
    - Reducer 就是一个 纯函数，接收旧的 state 和 action，返回新的 state。
        - 保持 reducer 纯净，永远不要在 reducer 里执行有副作用的操作，或者调⽤非纯函数
        - 函数式编程
            - 函数组合compose
                - return funcs.reduce((a, b) => (...args) => a(b(...args)))
            - 柯里化currying
    - Redux原理
        1. 需要⼀个store来存储数据；
        2. store⾥的reducer初始化state并定义state修改规则；
        3. 通过dispatch⼀个action来提交对数据的修改；
        4. action提交到reducer函数⾥，根据传⼊的action的type，返回新的state；
    - Redux只是个纯粹的状态管理器，默认只⽀持同步action，即action必须是对象（plain object）。要实现 异步action，比如延迟，⽹络请求，就需要中间件的支持
        - 常用中间件
            - redux-thunk
            - redux-logger
            - redux-promise
        - 中间件就是⼀个函数，对 store.dispatch ⽅法进行改造，在发出 Action 和执⾏ Reducer 这两步之间，添加其他功能
        - const store = createStore(countReducer, applyMiddleware(thunk, promise, logger));
    - combineReducers
        - 在应用中，不可能只有一个reducer，面对多个reducer，redux提供了 combineReducers，合并多个reducer
- mobx
    - 事件触发action，在action中修改state => 通过computed拿到更新的state的计算值 => 自动触发对应的reactions（包含autorun，渲染视图，when，observer等）
    - 通过observable装饰器装饰一个属性，使用Object.defineProperty来拦截对数据的访问，一旦值发生变化，将会调用react的render方法来实现重新渲染视图的功能或者触发autorun等。
    - redux和mobx的对比：
        - mobx将数据保存在分散的多个store中；redux将数据保存在单一的store中
        - mobx使用@observable（Object.defineProperty来拦截），数据变化后自动处理响应的操作；redux使用plain object保存数据，需要手动处理变化后的操作；
        - mobx中的状态是可变的，可以直接对其进行修改；redux使用不可变状态，这意味着状态是只读的
- Hooks
    - React 16.8开始提供的官方Hooks如下：
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
    - useEffect 完成副作用操作。赋值给 useEffect 的函数 会在组件渲染到屏幕 之后 延迟执行
        - 设置不同的依赖数组，可以分别模拟didMount、didUpdate、willUnMount
    - useLayoutEffect：其函数签名与 useEffect 相同
        - 但！！它会在所有的 DOM 变更之后 同步调用 effect
        - 场景：
            - 副作用函数执行，发生在组件渲染之后延迟执行，两件事中间有一小段间隙
            - 如果副作用函数执行的是订阅，如果渲染到订阅之间的间隙，store state发生了改变，那么订阅就不准确了，所以这里应该用useLayoutEffect
- React-Redux
    - React-Redux是一个桥梁，更方便的使用 Redux
    - Provider 为后代组件提供store
        - 《Provider store={store}》
    - connect 为组件提供数据和变更方法
        - connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
    - React-Redux 中的 hook API：useSelector 与 useDispatch
        - useSelector：获取store state
        - useDispatch：获取dispatch
    - 模拟forceUpdate
        - const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    - 前后两次值相同时，是否更新
        - 类组件 中setState 不管 前后两次state是否相同，都会执行更新。
        - 而 函数式组件 中，相同就会放弃更新。
- React Router
    - 路由器-Router
    - 链接-Link
    - 路由-Route
        - Route渲染优先级：children > component > render
    - 独占-Switch
        - 匹配的第一个子 Route 或 Redirect
    - 重定向-Redirect
        - 跳转，不能在render函数里面做，因为render是返回 UI的，也就是当前组件的子节点，如果跳转走了，就没有children了
        - 应该在生命周期中跳转
    - React Router提供的Hooks API：
        - useRouteMatch
        - useHistory
        - useLocation
        - useParams
- React项目最佳实践
    - Generator惰性求值
    - 路由守卫
        - 创建高阶组件包装Route，使其具有权限判断功能
            - 跳转路由前加个判断
                - 以登录为例： 登录的话，直接走
                - 没有登录的话，去登录页面，同时把当前地址记录下来
    - redux异步方案：redux-saga
        - Sagas 都用 Generator函数实现
        - 更擅长解决复杂异步场景
            - 订阅saga（watcher saga）：`takeEvery`、`take`
            - 执行更新saga（worker saga）：
                - 同步的方式执行异步请求
                    - `call` 是**阻塞式**的，多个请求间有先后关系
                    - `fork` 是**非阻塞式**的，多个请求之间无先后关系，并行请求
                - 更新state
                    - `put`
    - 数据流方案 dva
        - 一个基于 redux 和 redux-saga 的数据流方案
    - 企业级应用框架 umi
        - 其实内置了dva
- React源码分析
    - 虚拟DOM
        - ReactDOM.render
            1. vnode => node，const node = createNode(vnode)
                - 区分节点类型：
                    - 文本节点
                    - html标签节点
                    - 哪种组件节点，isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
                    - 空节点，</>或Fragment
                - 遍历调和子节点
            2. container.appendChild(node)
    - JSX
        - Component实现
            - 定义setState
            - 定义forceUpdate
            - 定义isReactComponent
        - createElement
            - jsx被babel-loader编译后传入createElement(type, config, children)
            - return ReactElement
        - 特殊的 props
            - 大部分 JSX 元素上的 props 都会被传入组件，然而，有两个特殊的 props （ref 和 key）。已经被 React 所使用，因此不会被传入组件
        - isValidElement
            - object.$$typeof === REACT_ELEMENT_TYPE
        - 包裹多个子元素
            - div、</>、Fragment
    - reconciliation协调
        - 设计动力
        - diffing算法
        - diff策略
            1. **同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计**。
            2. **两个不同类型的元素会产生出不同的树**;
            3. **开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定**;
            - 即
                - 1、策略一（*tree diff*），只同层级比较
                - 2、策略二（*component diff*），相同类的两个组件，生成相似的树形结构，不同类的两个组件，生成不同的树形结构
                - 3、策略三（*element diff*）：对于同一层级的一组子节点，通过唯一key区分。
        - diff过程 - 同层比较，深度优先
            - **比对不同类型的元素**
                - 当根节点为不同类型的元素时，React会卸载老树并创建新树。举个例子，从变成，从 《Article》变 成 《Comment》，或者从 《Button》变成 《div》，这些都会触发一个完整的重建流程。
                - 卸载老树的时候，老的DOM节点也会被销毁，组件实例会执行componentWillUnmount。创建新树的时候，也会有新的DOM节点插入DOM，这个组件实例会执行 componentWillMount() 和 componentDidMount() 。当然，老树相关的state也被消除。
            - **比对同类型的组件元素**
                - 这个时候，React更新该组件实例的props，调用componentWillReceiveProps() 和 componentWillUpdate()。下一步，render被调用，diff算法递归遍历新老树。
            - **比对同类型的DOM元素**
                - 当对比同类型的DOM元素时候，React会比对新旧元素的属性，同时保留老的，只去更新改变的属性。
                - 处理完DOM节点之后，React然后会去递归遍历子节点。
                    - **对子节点进行递归**：当递归DOM节点的子元素时，React会同时遍历两个子元素的列表。

    - fiber
        - 为什么需要fiber
            - React16 中`新的协调引擎`，可以 增量式渲染
        - 什么是fiber
            - 指组件上将要完成或者已经完成的任务，每个组件可以有一个或者多个
            - React Fiber一个更新过程被分为两个阶段(Phase)
                - Reconciliation
                - Commit Phase
    - 实现fiber
        - fiber架构是一种`链表结构`，方便暂停和继续，且查找方便，不像原先的组件树结构，只能查找子节点。。。。
        - 当前fiber链表指向child（第一个子节点），child通过return指回父节点，当前fiber不一定只有一个子节点，但他不直接指向其他子节点，而是由它指向的child，通过sibiling指针间接指向其他子节点，并且，sibiling也通过return指回父节点fiber。
        - window.requestIdleCallback(callback[, options])
            - callback：一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
            - options：包括可选的配置参数。具有如下属性：
                - timeout：如果指定了timeout并具有一个正值，并且尚未通过超时毫秒数调用回调，那么回调会在下一次空闲时期被强制执行，尽管这样很可能会对性能造成负面影响。
        - fiber
            // type：标记当前节点的类型；
            // props：属性；
            // key：标记唯一性；
            // child：第一个子节点；
            // sibling：下一个兄弟节点；
            // return：指向父节点；
            // node：真实的dom节点；
            // memoizedState
            // nextEffect
    - Hook
        - Hook解决了什么问题
            - **在组件之间复用状态逻辑很难**
            - **复杂组件变得难以理解**
            - **难以理解的 class**
        - Hook规则
            - **只在最顶层使用 Hook**
            - **只在 React 函数和自定义Hook 中调用 Hook**
        - Hooks原理
            - 自定义Hook
                - 当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。
                - **自定义 Hook 是一个函数，其名称以 “use” 开头（必须），函数内部可以调用其他的 Hook。**
            - useMemo
                - 传入 useMemo 的函数会在`渲染期间执行`
            - useCallback
                - `引用相等性去避免非必要渲染`
            - `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。
        - Hook API
            - 基础Hook
                - useState
                - useEffect
                - useContext
            - 额外Hook
                - useReducer
                - useCallback
                - useMemo
                - useRef
                - useImperativeHandle
                - useLayoutEffect
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
        - React中有自己的事件系统模式，即通常被称为`React合成事件`。之所以采用这种自己定义的合成事件：
            - 一方面是为了`抹平差异性，更好的兼容性和跨平台`，使得React开发者不需要自己再去关注浏览器事件兼容性问题；
            - 另一方面是为了`统一管理事件，提高性能`，这主要体现在：
                - **React内部实现事件委托，挂载到document，减少内存消耗，避免频繁解绑**
                - **并且记录当前事件发生的状态，方便事件的统一管理（如事务机制）**。
    - setState机制
    - react17rc
        - react17 与去年的路线图演进计划不一致，之前的默认启用concurrent render和删除deprecated lifecycles计划被推迟了。

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



- React & Vue
    - React 只是专注于数据到视图的转换，而 Vue 则是典型的 MVVM，带有双向绑定。
    - (1) 事件差异
    - (2) diff差异
        - React是fiber架构，是个单链表，只能单向遍历
        - Vue Diff使用双向链表，双端遍历比较，边对比，边更新DOM
            - react diff 策略
                - 1、策略一（*tree diff*），只同层级比较
                - 2、策略二（*component diff*），相同类的两个组件，生成相似的树形结构，不同类的两个组件，生成不同的树形结构
                - 3、策略三（*element diff*）：对于同一层级的一组子节点，通过唯一key区分。
            - vue diff 策略
                - *只比较同一层级，不跨级比较*
                - *tag不相同*，则认为是不同节点，直接删掉重建，不再深度比较
                - *tag和key两者都相同*，则认为是相同节点，不再深度比较
        - 都是`同级比较，深度优先`
        - 列表children比较
            - `序列倒序`都是N-1次移动最差情形；
            - `末尾移到首位`，react依然需要N-1次移动，vue只需要1次
    - (3) 变化侦测的方式差异
        - pull
        - pull + push
- Vue3 composition API vs React Hooks
    - vue hook setup 函数仅被调用一次，这在性能上比较占优
    - React hook **只能按顺序**从 Fiber 节点上找出上次渲染保留下来的值
    - vue hook 对调用顺序没什么要求，每次渲染中不会反复调用 Hook 函数，产生的的 GC 压力较小
    - React Hook 有臭名昭著的“`闭包陷阱`”问题，可能会捕获过时的变量；Vue 的自动依赖关系跟踪确保观察者和计算值始终正确无误。
- react hook 闭包陷阱
    - Q：“闭包陷阱”如何产生？
    - A：**deps依赖数组存在的意义，是react为了判定，在本次更新中，`是否需要执行其中的回调函数`**，如果执行了回调函数，则拿到了最新鲜的值。如果因为依赖没有正确传入，导致回调函数没有重新执行，那么因为变量在回调函数里面被引用了，形成了闭包一直被保存着，所以还是旧的值。。

    - Q：为什么使用useRef能够每次拿到新鲜的值？
    - A：ref = useRef() 所返回的都是同一个对象，每次组件更新所生成的`ref指向的都是同一片内存空间`，那么当然能够每次都拿到最新鲜的值了。



- NodeJS基础
    - 同步异步：对于水壶而言
    - 阻塞非阻塞：对于老张而言
    - Buffer
    - http服务
    - Stream流
        - 复制一张图片，但是不能直接全部承载。也就是不能直接复制好，再移动到另一个地方
        - 因此需要使用stream流操作，即通过建立一个「读取流」，建立一个「写入流」，再把二者连起来
        - 相当于在两个流之间，建立一个导管（pipe）`rs.pipe(ws)`
- 实现一个简单cli工具
    - 定制命令行界面
    - 克隆脚手架
    - 打印欢迎界面及安装依赖
    - 添加约定路由功能
    - 发布npm
- Koa
    - koa是Express的下一代基于Node.js的web框架 koa2完全使用Promise并配合 async 来实现异步。
    - Express下一代web框架
    - v1：ES6 generator
    - v2：ES7 async/await
    - 原生http
        - api不够优雅
        - 无法描述复杂业务逻辑，特别是对于切面编程AOP来说
    - Koa2提供的「优雅的API设计」，「中间件机制（洋葱圈模型）」就分别解决了上述两个问题
    - 洋葱圈模型
        - Koa中间件机制就是函数式 组合概念 Compose的概念，将一组需要顺序执行的 `函数复合`为一个函数，外层函数的参数实际是内层函数的返回值。
        - 在koa中，一切的流程都是中间件，数据流向遵循洋葱模型，`先入后出`
    - koa2与koa1的最大区别是koa2实现异步是通过async/await，koa1实现异步是通过generator/yield，而express实现异步是通过回调函数的方式。
- 网络编程
    - post的body数据，需要`以流的方式来接收`，bodyparser中间件
    - 爬虫原理：服务端模拟客户端，发送请求到目标服务器，获取⻚面内容并解析，获取其中关注部分的数据。
    - websocket：即时通讯IM
        - 原理：Net模块提供一个异步API能够创建基于流的TCP服务器，客户端与服务器建立连接后，服务器可以获得一个全双工Socket对象，服务器可以保存Socket对象列表，在接收某客户端消息时，推送给其他客户端。
    - RESTful架构
- 持久化mysql
    - mysql非常非常流行，其实是因为它是免费的，实际上它不好用，在很多场景下很难处理
    - 实现文件系统数据库：fs
    - 数据库
        - 关系型数据库：mysql
        - 文档型数据库：mongoDB
        - 键值对数据库：redis
- MongoDB
    - 文档型数据库好用在哪里
        - 对象或者说json可以直接放在数据库中，这其实是关系型数据库的梦想，mysql需要通过数据库中间件比如sequlize转译，才能像操作对象一样操作数据库。
- 前端鉴权
    - cookie-session模式
        - session源码实现
            - 有什么问题？
            - 首先，session是保存在变量中，也就是直接保存在内存中（即没有做持久化）
                - 流量大时会把内存打崩
                - 重启就失效了
                - nodejs不是只开一个实例，会在不同的机器里开多个实例，状态无法共享
            - cookie机制依赖于浏览器，不够灵活
                - 如果是APP，没有cookie机制怎么办？
                    - 有的做法是，让APP里的通信模块模拟session请求，但这个方法终归不是很好
                - 另外，跨域了怎么办？
            - cookie-session模式，需要将登陆信息存储在服务端，终究是服务器有状态的。
        - koa cookie-session模式
        - redis全局session
            - Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
            - Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
            - Redis支持数据的备份，即master-slave模式的数据备份。
    - token jwt模式
        - jwt原理
            - 令牌头、payload和密钥secret
            1. **签名sign**：默认使用`base64`对令牌头、payload编码（其实相当于明文），使用`hs256算法`对令牌头、payload和密钥secret进行签名**生成哈希**；
            2. **验证verify**：默认使用`hs256算法`对令牌头、payload**再做一次数据签名过程**，得到结果（哈希）后，**与最初加密签名的令牌中的哈希做比对**，看是否被篡改（看是否一致）；
        - koa-jwt
        - 优势
    - 扩展知识
        - Oauth2模式：github
        - SSO单点登录
- eggjs
    - 基于Koa定制自己的企业级三层框架
    - eggjs的三层结构：controller.js => service.js => model.js
- ts装饰器
    - 装饰器
        - 装饰器本身不能传参
    - 装饰器工厂
        - 通过`升阶`的手段，来柯里化装饰器
        - 将「**一个装饰器函数**」转变为「**一个制造装饰器函数的函数**」，这就是`装饰器工厂`。
    - 注解类型的装饰器（ES6、TS）
- 部署 nginx pm2 docker
- 中台专题
    - 类比到电影制作上，`「横店影视城」就相当于「技术中台」`。影视城相当于一个平台，可以被各个电影电视剧组，甚至是游客利用，影视城内的布景，可以多次复用。甚至可以给剧组提供更好的场景来完成故事，赋能。
- serverless
    - 本质上就是将传统的部署方式切换到云部署上
- EventLoop
    - 宏任务与微任务
        - 浏览器控制的，`外部队列（宏任务队列，Task Queue）`
        - JavaScript内部执行的，`内部队列（微任务队列，Microtask Queue）`
            - promise.then()与.catch()
            - MutationObserver注册监听dom改变的回调
        - **微任务是基于语言本身的，宏任务是基于宿主语言本身的。比如Nodejs中宿主是libuv，而浏览器端宿主是HTML。**
    - 浏览器与nodejs，⼆者都是把 JavaScript 集成到他们各⾃的环境中，但是 HTML (浏览器端) 与 libuv (服务端) ⾯对的场景有很⼤的差异。
        - 如果说**浏览端是将 JavaScript 集成到 HTML 的事件循环**之中，
        - 那么 **Node.js 则是将 JavaScript 集成到 libuv 的 I/O 循环**之中。
    - Node.js (libuv)在最初设计的时候，是允许执行多次外部事件再切换到内部队列的，而浏览器端一次事件循环只允许执行⼀次外部事件。*nodev12就修复了这个问题*
    - setImmediate这个外部队列宏任务，目前是 Node.js 独有的，浏览器端没有。
        - 当大于1ms时，setTimeout（timers阶段）肯定是先于setImmediate（check阶段）执行的。
        - 但是当小于1ms时，也就是 setTimeout 0 时，是有一定的概率，setImmediate会先执行的。


- Webpack
    - module、chunk、bundle3者的关系
    - loader：
        - 在Webpack里，一切皆模块，一个模块对应着一个⽂件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
        - loader执行顺序是：自后往前，自下向上
    - 处理css
        - `sass-loader`：把sass编译成css。
        - `postcss-loader`：自动添加css前缀。
        - `css-loader`：让webpack能识别处理css，转化成 CommonJS 模块。
        - `style-loader`：把css识别处理后转成的js字符串，生成为 style节点，插入到 html中。
    - 处理图片
        - `file-loader`专门处理加载静态文件，比如 .txt .md .png .jpg .word .pdf等等等等。。。。不需要对文件进行加工，只需要将其挪到dist目录中。
        - `url-loader`是file-loader的加强版，有配置项`limit`，遇到图片格式的模块，会把该图⽚转换成base64格式字符串，并打包到js⾥，从而减少http请求。对于`⼩体积的图片⽐较合适`
    - 处理第三方字体
        - file-loader
    - 增加插件
        - html-webpack-plugin
        - clean-webpack-plugin
        - mini-css-extract-plugin
    - 多页面应用配置
        - 动态生成entry，以及HtmlWebpackPlugin
    - sourceMap
        - 字段含义
            - eval: 速度最快，使⽤eval包裹模块代码。
            - source-map: 会产⽣ .map ⽂件。
            - cheap: 较快，会告知出错行信息，但是不显示列信息。因此一般都会加上`cheap-`。
            - Module: 第三⽅模块，包含loader的sourcemap(⽐如jsx to js ，babel的sourcemap)。
            - inline: 将 .map 作为DataURI嵌⼊打包后的bundle中，不单独生成 .map 文件。
        - 开发环境使用
            - cheap-module-eval-source-map
        - 生产环境使用source map（线上其实不推荐开启）
            - map文件只要不打开开发者工具，浏览器是不会加载的。
            - 3种处理方案：
                - hidden-source-map：借助第三方错误监控平台 Sentry 使用。
                - nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高。
                - sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)。
            - 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积，并降低整体性能。
    - ES6+如何使用：babel
        - **`@babel/core` 这个库负责「`Parser解析`」，具体的「`Transformer转换`」和「`Generator生成`」步骤则交给各种插件（`plugin`）和预设（`preset`）来完成，即 `@babel/preset-env`，它里面包含了 es，6，7，8 转 es5 的转换规则**
        - `babel-loader` 是 webpack 与 `@babel/core` 的通信桥梁，它不会做把es6转成es5的⼯作，这部分⼯作是需要 @babel/preset-env 来做的。
        - @babel/polyfill
            `useBuiltIns` 选项是 babel7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill。它有3个参数可以使⽤:
            - 1、`entry`: 需要在 webpack 的⼊口⽂件里 import "@babel/polyfill" 一次。`按需注⼊`，即 babel 会根据你的使⽤情况导⼊垫片，**没有使用的功能不会被导⼊相应的垫片**。（推荐）
            - 2、`usage`: **不需要import，全⾃动检测**，但是要安装 @babel/polyfill 。也是`按需注⼊`。(试验阶段，推荐)
            - 3、false: 默认值，即如果你 import "@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，导致程序（bundle）体积会庞大。(不推荐)
    - sideEffects来配合tree shaking
        - 因为，对于比如 `import "@babel/poly-fill"`，其实没有导出任何东西，它实际上是在window全局对象上绑定了很多垫片方法。如果开启了 `tree shaking`，则会将其当成未导出任何内容的模块，将其忽略，不打包进bundle中。`"sideEffects": ["@babel/poly-fill"]`就是为了避免这种情况，在打包的时候，就不会处理@babel/poly-fill。
        - 同理，对于 import "./style.css"
    - 代码分割
        - splitChunks.chunks: "all", // 'all'会对同步、异步代码都做分割，并会根据cacheGroups选项分组；'async'只对异步代码做分割；'initial'只对同步代码做分割
    - 打包后文件
        - **manifest.js** 内部是一个 IIFE，称为`webpackBootstrap启动器函数`，这个函数会接受一个空数组（命名为modules）作为参数。
            - 除**manifest.js**外的所有其他bundle，都往window["webpackJsonp"]数组里面 push chunkId 和 含有的modules。
            - 而**manifest.js**提供3个核心方法：
                - 1、提供全局函数 `webpackJsonpCallback(data)` 来处理全局的 window["webpackJsonp"] 数组。

                - 2、提供 `__webpack_require__(moduleId)`：作用就是加载执行对应的module，并且缓存起来。
                    - 先判断下installedModules中是否有缓存，有则直接返回其module.exports；
                    - 没有的话就执行，将module输出的内容挂载到module.exports对象上，同时缓存到installedModules中。
                    - 注意：每个module只会在最开始依赖到的时候加载一次，如果有继续依赖的module，则递归执行，且加载过的依赖值也只执行一次。

                - 3、提供 `__webpack_require__.e(chunkId)`，也就是 `requireEnsure(chunkId)` 异步加载模块，返回promise。
                    - 简单地说，是用来 懒加载某个chunk的
                    - 传入一个chunkId，先判断该 chunk 是否已被加载，是的话直接返回一个成功的 promise，并让 then 执行函数的 `__webpack_require__` 对应的 module 即可；
                    - 否则，会动态创建一个 script 标签去加载对应chunk，加载成功后会将该chunk中所有module注入到 webpackJsonp 中
    - 打包分析
        - webpack-bundle-analyzer
        - **为什么webpack默认代码拆分是async**
            - 对于同步代码分割，其实只能增加个缓存，对于浏览器性能的提升是非常有限的。真正可以提升性能的，是提高浏览器代码利用率，多写异步加载代码，将异步代码分割出去，只有真正用到时才加载。
        - **看代码的使用率** => chrome控制台的`coverage选项`
    - Preloading，Prefetching
        - 异步分包，并结合prefetch，避免点击时再请求js包可能会比较慢
        - webpackPrefetch
    - TypeScript打包配置
    - ESLint webpack配置
- webpack性能优化
    - 缩⼩搜索Loader的文件范围
    - 定位第三方依赖位置：resolve.modules配置
    - 配置别名：resolve.alias配置
        - 「加波浪线」：**html、css**中使用时，路径`@前要加波浪形~`:（*"~@dir"*）
    - 后缀列表：resolve.extensions配置
    - 使用静态资源路径publicPath(CDN)
    - 持久化：文件指纹
    - 抽离runtime（manifest）
        - optimization.runtimeChunk.name: 'runtime'
    - 抽离css：MiniCssExtractPlugin
        - css 是直接打包进 bundle.js 里⾯的，这就是常说的Css in JS。我们希望能单独⽣成 css ⽂件，将Css单独打包进dist目录中
        - 不支持HMR，因此**只推荐在生产环境打包使用**。
        - 不再需要style-loader，⽤`MiniCssExtractPlugin.loader`代替
    - 压缩CSS
        - 借助`optimize-css-assets-webpack-plugin`，借助cssnano。
    - 压缩HTML
        - html-webpack-plugin
    - 压缩图片
        - `img-webpack-loader`
    - 环境区分：development vs production
    - library打包
        - 使自定义库可以被开发者以script标签的形式引入，通过 全局变量library 来访问
    - externals
        - 打包时，忽略某些第三方库依赖，不将其打包进我们生成的bundle.js中
    - 使用DllPlugin，提高打包速度
        - webpack.dll.js
            - 输出到dll目录下：vendors.dll.js
            - `webpack.DllPlugin` 插件，分析生成映射文件：vendors.manifest.json
            - 使用 `webpack.DllReferencePlugin` **指定dll的bundle.js的manifest所在位置**
- webpack打包原理（bundler实现）
    - parse
        - 模块分析，得到AST
        - 使用 `@babel/parser` 对入口模块进行分析，拿到模块内的依赖
    - transform
        - 代码转换（AST => 浏览器可运行code）
        - 使用`@babel/core`里的`transformFromAst`
        - 递归，生成依赖图谱（dependencies graph）
    - generate
        - 提供生成代码函数（generate），生成打包函数
        - node bundler.js => 得到 bundle.js
- 自定义loader
    - loader，必须是`声明式函数`，不能是箭头函数，因为loader会对this做些变更，如果使用箭头函数，this指向就有问题，就没法调用本来this的方法了。
    - 接收一个参数，即源代码source
    - 变更之后，再把源代码`return`出去
        - this.callback(null, result)，返回额外的内容
        - this.async，处理异步操作
    - 自定义loader场景距离
        - 比如 异常捕获
        - 比如 国际化
- 编写webpack plugin
    - 生成版权信息文件 CopyrightWebpackPlugin
        - apply(compiler) {}
            - compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {})
            - compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {})
                // compiler 存放了所有配置和打包的内容
                // compilation 只存放当前这次打包相关的内容
                // compilation.assets 存放了所有打包生成的内容
    - 生成骨架屏插件

- 常见web攻击
    - 掌握XSS (实施 + 防御)
        - 分类
            - 反射型：url参数直接注入
                - 短域名伪造
            - 存储型：存储到DB后读取时注入
                - 在页面上通过表单输入的攻击脚本，存储注入在数据库中，等到页面刷新获取到该数据时，攻击脚本就被执行
        - 危害
            - 脚本Scripting能干啥，XSS攻击就能干啥
        - 防御手段
            - CSP内容安全策略，一个附加的安全层，就是建立白名单
            - 转义字符
                - 黑名单转义（定义哪些符号不行）
                - 白名单转义（定义哪些符号可以）
                    - 富文本
                - Cookie设置httpOnly
                    - 预防XSS攻击窃取用户cookie
                    - （使用cookie登录鉴权过程中，实际根本不需要客户端js参与，因此后端添加httpOnly只在网络传输中使用，是完全合理的）
    - 掌握CSRF (实施 + 防御)
        - 1、`Referer Check`：（理论上是可以防御的，但实际上并不那么有效）
        - 2、`人机识别（使用验证码）`
        - 3、`使用token验证`
    - 掌握点击劫持 (实施 + 防御)
        - 一种`视觉欺骗`的攻击手段
        - iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明
        - 防御
            - 方法1：`X-FRAME-OPTIONS`
                - DENY：表示页面不允许通过 iframe 的方式展示
                - SAMEORIGIN：表示页面可以在相同域名下通过 iframe 的方式展示
                - ALLOW-FROM：表示页面可以在指定来源的 iframe 中展示
            - 方法2：使用js来实现
                - 判断 self == top
                // self是对当前窗口自身的引用，window属性是等价的
                // top返回顶层窗口，即浏览器窗口
    - 掌握SQL注入 (实施 + 防御)
        - `参数化查询接口`，即不要直接拼接 SQL 语句
    - 掌握OS注入 (实施 + 防御)
        - OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。
    - 了解请求劫持
        - `运营商劫持`：运营商通过某些方式篡改了用户正常访问的网页，插入广告或者其他一些杂七杂八的东西。一般分为`DNS劫持`和`HTTP劫持`：
    - 了解DDOS
        - `分布式停止服务`攻击，只要把一个环节攻破，使得整个流程跑不起来，就达到了瘫痪服务的目的。
- 密码安全-数据库密码强化
    - 哈希摘要加密算法
        - 无法反推，密文长度固定，雪崩效应，明文与密文一一对应
        - 因此，有的反查网站通过维护字典，虽然从数学角度无法反推，但可以查
        - 加盐salt
            - 帮助用户提升了其密码强度，这样就不容易被反查出来了


- 项目先导课
    - 网站性能监控
        - 谷歌出品的lighthouse，得到网站评测
- 项目挖掘
    - （1）文件上传
        - 分片上传
            - 上传成功，后端要存起来切片，知道上传了哪些，所以需要`SparkMD5计算一个指纹`
                - 计算md5，文件太大时计算量太大，阻塞主线程
                    - 1. `web-worker`开一个影分身去做
                    - 2. 时间切片time-slice，`requestIdleCallback`
                    - 3. `抽样hash`(牺牲一点可靠性，换取效率，布隆过滤器)
        - `断点续传`：后端需要通过上一步的唯一hash标识，来判定文件是不是上传过
            - 如果该文件已经上传成功了，即`文件秒传`
            - 如果该文件不存在，则获取已经上传过的切片列表
            - 当本次上传和已经上传的分片，等于文件全部大小时，需要通知后端进行`分片合并`
            - 提供`暂停上传`和`继续上传`功能
        - 如果用Promise.all 会让浏览器卡顿，所以要`控制并发数`
            - `sendReuqest(task,4)`
        - 对于弱网，`自动重试`比如说3次，每个切片3次机会
        - 类型判断
            - 最合理的方式：二进制文件头信息来判断，甚至能从二进制信息里直接读取文件宽高
        - 切片大小如何确定？`慢启动上传`
    - （2）api切换配置优化
        - 后端同学希望能够将最新的前端代码连接到自己本机数据库，更方便的做回测（postman效率太低了）
        - （HostSwitch组件）
            - 增加 axios.interceptors.request.use(proxyInterceptor) 请求拦截，将config替换成切换后的baseUrl地址
            - 对于集团公共BOS系统，为了不影响到其他业务线，采用高阶组件 withHostSwitch(creatModule)，在里面添加 HostSwitch 的渲染挂载，这样当退出ESOP模块时，HostSwitch会随着整个ESOP模块的卸载而卸载，拦截器也执行eject
    - （3）自定义指令 v-loadmore 实现分部分获取数据
    - （4）elementUI v-infinite-scroll 无限滚动
        - 给el-table添加无限滚动标签时，需要给el-table下添加一个标签并通过slot="append"插入列表内容，注意，如果直接插入如下标签并v-infinite-scroll="load"时，整个html body都是滚动的。。。
        - 查看v-infinite-scroll的elementUI源码，发现：
            - v-infinite-scroll有一个寻找 scrollContainer （可滚动容器）的过程（getScrollContainer函数），如果当前元素可滚动（isScroll函数），则取当前元素，否则一直向上找直到最顶端。 上面的现象就是没找到table列表的可滚动wrapper，而找到了外部的body
            - 因此，需要控制插入的span标签的插入时机，需要在列表有内容撑开后，再插入标签。
            - 即通过v-if判断，在获取到数据后，并在nextTick中拿到更新的dom时，再使span标签显示、插入到table下，此时span标��中的无限滚动指令就能拿到最近的可滚动列表wrapper了。
        - 注意，v-infinite-scroll会加载渲染所有的item，对于复杂的列表会造成页面卡顿
            - 使用虚拟列表，虚拟滚动
            - `vue-virtual-listview`
                - 只对可见区域进行渲染，对非可见区域中的数据，部分渲染（buffer缓冲区渲染）
                - 对于item项高度不定，以预估高度先行渲染，然后获取item真实高度，使用钩子函数updated 缓存，之后的渲染通过数组索引从缓存中取。
        - （5）权限系统
        - （6）eslint+husky+prettier+lint-staged
        - （7）多语言实现 vue-i18n + i18next-scanner
        - （8）同构SSR


**SSR**

*同构SSR解决的问题，及劣势*
- 优势：首屏等待、SEO支持
- 劣势：在服务端渲染耗费的是公司的服务器资源，而客户端渲染只消耗用户的浏览器资源

*什么是同构*
- 同构：一套React代码，在服务器端执行一次，在客户端再执行一次。
- renderToString方法，对于组件中的事件，是不会渲染出来的，所以就要用到「同构」技术。即服务器端先把组件渲染出来，然后在浏览器端，相同的代码再执行一遍，复用已有的html DOM结构，并添加上事件（CSR端在这里是使用**ReactDOM.hydrate**渲染的，它会复用html结构，只添加事件）

*路由同构*：
- 路由表统一在store/routes中
- 路由要在双端各跑一遍，以保证双端路由统一。
- StaticRouter是服务器端路由，不像客户端路由BrowserRouter可以感知到浏览器当前路径url变化，因此需要拿到用户请求的req（location={req.path}），传递给它当前请求的路径是什么。
- 服务器端渲染，只发生在第一次进入页面的时候，之后的路由跳转，不再加载任何东西。
    - 即之后点击link标签跳转路由，不是服务器端的跳转，而是浏览器端的路由跳转。浏览器加载bundle.js文件后，JS中的React代码接管页面操作，与服务端渲染就没有关系了。
    - 即只有第一次访问的页面是服务端渲染，之后的页面都是react的路由机制。


*数据预取*：
- componentDidMount在服务器端是不执行的
- 给Home组件添加获取异步数据的静态方法，Home.loadData。并添加到routes路由表中Home组件的loadData字段。这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好。
- 使用matchRoutes方法，匹配多级路由，让匹配的matchRoutes里面所有的组件，对应的loadData方法都装入promises数组，Promise.all(promises).then(() => {console.log(store.getState())}，此时store中就填充了异步数据，再拼接html的内容，最后res.send(content)返回给用户


*渲染同构*：
- 「页面闪烁：双端渲染不一致」
    - 上面的实现有个问题在于：SSR端渲染完成后，CSR端又重新渲染了一遍，而CSR端的store一开始是空的，需要在didMount中调用接口拿到，所以CSR端一开始渲染的数据是空的，与SSR端不一致，所以「双端渲染不一致」。 等到CSR端的didMount中loadData成功后，再次渲染，所以会有页面闪烁一次的现象。
    - 解决方法是：「注水」「脱水」
        - 需要在SSR端获取到数据后，将数据挂在HTML中（或者window.context下），而在CSR端就不要再去请求数据了（即componentDidMount中无须调用loadData了），而是从HTML中的变量中直接去取。
        ```
        <!-- 注水 -->
        <script>
            window.context = {
                state: ${JSON.stringify(store.getState())}
            }
        </script>
        ```
        ```jsx
        <!-- 脱水 -->
        const getClientStore = () => {
            const defaultState = window.context.state; // 将 defaultState 作为 reducer的默认值
            return createStore(reducer, defaultState, applyMiddleware(thunk));
        }

        // client/index.js
        const App = () => {
            return (
                <Provider store={getClientStore()}>
                    <BrowserRouter>
                        {Routes}
                    </BrowserRouter>
                </Provider>
            )
        }
        ```
- 注意！！！：didMount中的loadData还不能直接注释掉！
    - 如果直接「脱水」而把componentDidMount中的loadData注释掉，那么如果用户先访问的是非SSR页面，比如login页面（login页面没有loadData方法，所以window.context中的state是空的），之后再切到首页时，因为window.context中的state是空的，而componentDidMount中的loadData注释掉了，所以首页的数据也就拿不到了。因此didMount中的loadData还不能直接注释掉！
    - （因为我们的服务端渲染，指的只是访问的第一个页面是SSR的，其他页面是CSR的）
    - 解决方法就是，条件执行didMount中异步数据获取



**SSR同构中，CSS处理**

*如何支持CSS样式修饰*
- 首先，js文件引入css需要配置webpack来编译
- 但style-loader不能用：会报window is not defined，因为style-loader需要往浏览器中window上挂载一些样式，注入style标签，而在服务器端渲染时，没有window，所以使用style-loader肯定会报错。

- 使用`isomorphic-style-loader`替代，它是服务端渲染的时候使用的style-loader，使用方式基本是一样的
- 但style-loader不仅会解析class的名字（即给html中字符串上添加class类名），还会向DOM的head中注入style标签引入样式代码。可是，isomorphic-style-loader只能机械class名字，并无法引入样式代码。所以还需要如下步骤：

*如何实现CSS样式的服务器端渲染*
- 在做服务端渲染时，引入的styles模块里包含_getCss()，能获得css样式代码内容
- 给context添加一个css数组
- 每个组件都push自己对应的样式到staticContext.css之中
- 将css数组拼接（注意用换行符来连接）cssStr = context.css.join('\n')
- 最后，服务端返回的html模板中添加<style>${cssStr}</style>

- *另外，可以利用高阶组件withStyle(Header, styles)来简化css处理，避免重复didMount中push(styles._getCss())


**SEO技巧**

*Title和Description的真正作用*
其实搜索引擎在匹配网站时，不会仅仅根据TDK来匹配，而是通过全文匹配来分析是否和所搜索的关键词契合。
而，TDK真正有价值的地方在于，搜索出来的词条展示形式，标题、缩略图、简介等等是否更有吸引力，提升转化率。

*如何做好SEO*
一个网站，基本是由3部分组成的：文字、链接、多媒体。

- 文字优化：提升原创性；
- 链接优化：
    - 提升内部链接相关性；
    - 提升本站在外部链接的分布；
- 多媒体优化：提升多媒体内容的丰富度，还有比如图片清晰度等。


*预渲染，解决SEO问题的新思路*
Q：什么是预渲染prerender？
A：即由预渲染服务器判断访问者是用户还是爬虫，如果是用户则直接使用普通的react网站即可，如果是爬虫则将当前react网站渲染完的全部内容，保存并返回给爬虫去访问。



**难点1：实现服务器端301重定向**
实现服务器端301重定向，而`<Redirect />`只能做客户端重定向，不能做服务端重定向。所以需要，使用renderRoutes（react-router-config导出）与StaticRouter相结合，如果发现组件内部出现了Redirect方法时，它会自动操作context添加重定向信息。
```json
// context对象上会有重定向信息，
{
    action: 'REPLACE',
    location: { pathname: '/', search: '', hash: '', state: undefined },
    url: '/'
}

```
有 action: 'REPLACE' 操作，把当前页面替换成url: '/'。
据此，我们就主动做服务端重定向 res.redirect(301, context.url)：
```js
// server.js
// ...
Promise.all(promises).then(() => {
    const context = {};
    const html = render(store, routes, req, context);
    // context 对象传入render函数中，如果是404组件，则会给context添加一个NOT_FOUND标志
    // 如果识别组件中有 Redirect方法，则给context添加重定向信息

    if (context.action === 'REPLACE') {
        res.redirect(301, context.url) // 服务端主动重定向
    } else if (context.NOT_FOUND) {
        res.status(404) // 需要主动设置返回状态码，否则依然返回200
        res.send(html)
    } else {
        res.send(html)
    }
})
// ...
```


**难点2：数据请求失败情况下promise的处理**
如果Promise.all([A, B, C])，其中有某个异步请求出错，因为没有catch，所以没有返回，store都是空的，所以页面会一直loading。

解决方法就是将A，B，C这些请求再用promise包一层，然后无论成功与否，都resolve包装层的promise，这样，就能把加载到的数据都注入store中，都能走到then中。
```js
// promises.push(item.route.loadData(store));
// 包装一层promise
const promise = new Promise((resolve, reject) => {
    item.route.loadData(store).then(resolve).catch(resolve)
})
promises.push(promise);
```





- react 渲染/更新过程
    - **初次渲染**
        - 有了props state
        - babel解析JSX为render函数
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
        - 因此，在合理划分组件的情况下，diff比较量不会很大，所以`边比较边更新dom`；


- vue 渲染/更新过程（想一下官网的流程图）
    - vue-template-compiler从模板到render函数，再到vnode，再到渲染和更新
    - **初次渲染**
        - 解析模板为render函数（打包编译时完成，在开发环境下使用vue-loader已完成）
        - 触发响应式，监听data属性，添加getter和setter
        - 执行render函数，生成vnode，由patch(elem, vnode)渲染
            - （render过程中，会touch所用到data的getter，我们知道每个组件实例都对应一个 watcher 实例，则被touch的data会被组件的watcher收集）
    - **更新渲染过程**
        - 修改data，触发setter
            - （setter通知watcher，匹配依赖收集的deps列表，如果之前已经被watcher监听过了，触发re-render）
        - 重新执行render函数，生成newVnode，由patch(vnode, newVnode)渲染
    - 异步渲染
        - 汇总data修改，一次性更新视图
        - 减少DOM操作次数，提高性能


koa的洋葱模型，和express有什么区别
用过nginx吗，说说干嘛的
webpack的拆包策略
mouesemove,mouseleave,mouseup等等几个API的区别
实现一个JSON.stringfy()，要支持循环引用，并记录循环引用的路径
软件工程和设计模式有什么区别，说说几个了解的设计模式
generater的本质是什么，或者说下generater执行时操作系统中发生了什么


很多人被问到项目亮点或者难点的时候不知道怎么说，这个其实可以结合你学过的基础知识来讲，比如项目某个地方用到了某种设计模式，达到了什么效果，或者用到了某种数据结构或算法，或者是写了什么webpack插件来辅助项目开发，又或者是遇到了某些性能问题，排查之后怎么去解决，等等这些都可以去讲，如果这些都没有，可以强行加上一些通用问题，比如长列表优化，列表基本上每个人的项目上都有，可以去网上看看常见的长列表优化方案，为什么要优化，怎么去优化，优化有哪些方案，每个方案的优略，优化之后带来的成果等等。


什么是PV值
       PV（page view ） `访问量`，是网站分析的一个术语，用以衡量网站用户访问的网页的数量。对于广告主，PV 值可预期它可以带来多少广告收入。一般来说，PV 与来访者的数量成正比，但是 PV 并不直接决定页面的真实来访者数量，如同一个来访者通过不断的刷新页面，也可以制造出非常高的 PV。

       PV 即页面浏览量或点击量，是衡量一个网站或网页用户访问量。具体的说，PV 值就是所有访问者在 24 小时（0 点到 24 点）内看了某个网站多少个页面或某个网页多少次。PV 是指页面刷新的次数，每一次页面刷新，就算做一次 PV 流量。度量方法就是从浏览器发出一个对网络服务器的请求（Request），网络服务器接到这个请求后，会将该请求对应的一个网页（Page）发送给浏览器，从而产生了一个 PV。那么在这里只要是这个请求发送给了浏览器，无论这个页面是否完全打开（下载完成），那么都是应当计为 1 个 PV。

什么是 UV 值
       UV （unique visitor ）即`独立访客数`，指访问某个站点或点击某个网页的不同 IP  地址的人数。在同一天内，UV  只记录第一次进入网站的具有独立IP  的访问者，在同一天内再次访问该网站则不计数。UV 提供了一定时间内不同观众数量的统计指标，而没有反应出网站的全面活动。


- 位图算法应用：https://www.cnblogs.com/zhuoqingsen/p/9214709.html
    - 判断一个数是否存在某数据中，假如有40亿数据，我们如何快速判断指定一个数是否存在？
        申请512M的内存 512M = 512 * 1024 * 1024B * 8 = 4294967296比特(bit)  这个空间可以装40亿了

        一个bit位代表一个int值

        读入40亿个数，设置相应的bit位

        读入要查询的数，查看相应bit位是否为1，为1表示存在，为0表示不存在
    - 做交集和并集效率极高
        举个例子，现有一位图0000101，代表喜欢吃苹果用户

        　　　　　　另一位图0000111，代表喜欢吃西瓜用户

        统计喜欢吃苹果或西瓜的用户，0000101|0000111=0000111

- 字典树算法应用：https://blog.csdn.net/piaocoder/article/details/97039255
    - 给一亿个长度不一样的字符串，怎么判断一个随机长度的字符串在不在这个里面






React Hooks

usePrevious

// eg.
function Component() {
    const [count, setCount] = useState(0);
    const previousCount = usePrevious(count);

    return (
        <div>
            <button onClick={() => setCount(p => p +1)}>add</button>
            { count } | { previousCount }
        </div>
    )
}


实现usePrevious

function usePrevious(val) {
    const ref = useRef();

    useEffect(() => {
        ref.current = val;
    }, [val]);

    return ref.current;
}


useEffect很重要的一点是：它是在每次渲染之后才会触发的，是延迟执行的。而return语句是同步的，所以return的时候，ref.current还是旧值。


泛型
```tsx
type FlattenElement<T> = T extends (infer U)[] ? U : T;

function flatten<T>(arr: FlattenElement<T>[]): FlattenElement<T>[] {
    let newArr: FlattenElement<T>[] = []
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i] as FlattenElement<T>[]))
        } else {
            newArr.push(arr[i])
        }
    }

    return newArr
}

type flatType<T> = flatType<T>[] | T

flatten<number>([1, 2, 3])
flatten<flatType<number>>([1, [2, [3, 4]]])
flatten<string>(['a', 'b', 'c'])
flatten<flatType<string>>(['a', 'b', 'c'])
```
- https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#conditional-type-constraints
- https://zhuanlan.zhihu.com/p/91144493



分布式有条件类型
- 分布式有条件类型在实例化时会自动分发成联合类型
- 例如，实例化`T extends U ? X : Y`，`T`的类型为`A | B | C`，会被解析为`(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`。

例子：
```
- type Diff<T, U> = T extends U ? never : T;  // 移除T中与U中重合的元素
    - type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
- type Filter<T, U> = T extends U ? T : never;  // 移除T中不与U中重合的元素，即交集
    - type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
```
```
infer
- infer关键词常在条件类型中和 extends关键词一同出现，表示将要推断的类型，作为类型变量可以在三元表达式的 True 部分引用。
- 注意：infer关键字这个类型变量只能在true的分支中使用，也就是说infer R ? R : any不可以写成infer R ? any : R
- type ParamType<T> = T extends (param: infer P) => any ? P : T;
    - 在这个条件语句 T extends (param: infer P) => any ? P : T中，infer P 表示待推断的函数参数。
    - 整句表示为：如果 T 能赋值给函数(param: infer P) => any，则结果类型是 函数(param: infer P) => any类型中的参数 P，否则返回为 T。

- type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```






computed 内部实现了一个惰性的 watcher,也就是 _computedWatchers，_computedWatchers 不会立刻求值，同时持有一个 dep 实例。

其内部通过 this.dirty 属性标记计算属性是否需要重新求值


与 watch 有什么区别
computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是「观察」的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。

与 watch 运用场景的对比
需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。

当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算。





const dec = name => (target, property) => {
    const oldProp = target.prototype[property]

    target.prototype[property] = msg => {
        console.log('执行了 ' + property)
        msg = `${name} [${msg}]`
        oldProp(msg)
    }
}

dec('Amy')(Log, 'print')




var o = {}
o.foo = function foo(){
    console.log(this);
    return () => {
        console.log(this);
        return () => console.log(this);
    }
}

o.foo()()(); // o, o, o
第一个o.foo()调用输出this，是o调用，即指向o
而内部的第二个第三个输出this，因为是箭头函数，其this指向定义时的外层this，所以也是指向o



console.log('start')
setTimeout(() => {
    console.log('s1')
    Promise.resolve().then(() => {
        console.log('promise1');
        setTimeout(() => {
            console.log('s2');
        }, 0)
    }).then(() => {
        console.log('promise2');
    })
}, 0)
console.log('end');
// start
// end
// s1
// promise1
// promise2



app端h5错误监控，
首先，白屏的话，首先考虑是不是html就没有加载到，这个可以通过查看app的log来排查
第二，如果资源加载错误的话，可以设置拦截，来判断（这里不太记得是啥意思了）
第三，如果是js运行错误的话，通过window.onerror监听

均通过img.src进行错误上报。。。具体到用户的话，每台机器都有唯一机器识别码，可以看app的log中是否可以查看到用户的id和机器标识来排查



treeShaking 如何剪枝？



如何对于大的包，只引入用到的部分？



http的底层协议为什么使用tcp而不能用udp，那什么协议适合用udp呢？

视频点播，视频直播，即时通讯都用上面协议呢？





