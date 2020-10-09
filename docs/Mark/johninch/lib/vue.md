# Vue关键

## 基础提纲
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
        **怎么解决Proxy只会代理对象的第一层？**
            - Vue3 会 判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。
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
        - **在下次 DOM 更新循环结束后执行延迟回调**，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。
            - 优先以 micro-task 方式执行，检查是否支持promise
            - 降级的话到 macro-task：setImmediate -》 MessageChannel -》 setTimeout 0
    - Vue的生命周期
        - 4组8个 + keep-alive的2个
        - 父子组件生命周期执行顺序
            - 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
            - 父beforeUpdate->子beforeUpdate->子updated->父updated
        - 接口请求一般放在哪个生命周期中？
            - mounted
        - 父组件如何监听子组件的生命周期？
            - @hook:mounted="doSomething"
    - this.$refs为什么会是undefined
        - $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
    - Computed 和 Watch
        - 缓存与命令式
    - v-if和v-show的区别
        - v-if 是真正意义上的条件渲染，控制销毁与重建
        - v-show 始终都会渲染的，只是通过display: none来控制显示
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
            **怎么解决Proxy只会代理对象的第一层？**
                - Vue3 会 判断当前Reflect.get的返回值是否为Object，如果是则再通过*reactive*方法做代理，这样就实现了*深度观测*。
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
            - v-show 始终都会渲染的，只是通过display: none来控制显示
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





### 基本使用

- 插值、表达式（不能是js语句）
- 指令、动态属性
- v-html：rawHtml
    - 会有XSS风险
    - 会覆盖子组件
::: details
```html
<template>
    <div>
        <p>文本插值 {{message}}</p>
        <p>JS 表达式 {{ flag ? 'yes' : 'no' }} （只能是表达式，不能是 js 语句）</p>

        <p :id="dynamicId">动态属性 id</p>

        <hr/>
        <p v-html="rawHtml">
            <span>有 xss 风险</span>
            <span>【注意】使用 v-html 之后，将会覆盖子元素</span>
        </p>
        <!-- 其他常用指令后面讲 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'hello vue',
            flag: true,
            rawHtml: '指令 - 原始 html <b>加粗</b> <i>斜体</i>',
            dynamicId: `id-${Date.now()}`
        }
    }
}
</script>
```
:::

- computed
    - 有缓存，data不变则不会重新计算
    - 如果配合v-model双向数据绑定使用，需要写get和set处理
- watch
    - 默认是浅层监听
    - 如何深度监听
        - deep: true，则可对应用类型的子属性遍历监听
    - 监听引用类型时，拿不到oldVal
        - 因为oldVal和val指针相同，此时已经指向了新的堆地址
- class 与 style
    - 动态属性
        - :class="{ black: isBlack, yellow: isYellow }"
        - :class="[black, yellow]"
    - styleData转换为驼峰式
        - :style="styleData"
            styleData: {
                fontSize: '40px', // 转换为驼峰式
                color: 'red',
                backgroundColor: '#ccc' // 转换为驼峰式
            }

- 条件渲染
    - v-if 与 v-show
        - 区别
            - v-if是真正的条件渲染，条件控制dom元素是否渲染
            - v-show是永远都会渲染的，只是对于falsy的条件，使用style="display: none"控制不显示
        - 使用场景
            - 切换不频繁时，用v-if，因为会有dom的重建和销毁成本
            - 通过条件频繁切换时，用v-show
- 循环列表渲染
    - 遍历数组
        - v-for="(item, index) in listArr" :key="item.id"
    - 遍历对象
        - v-for="(val, key, index) in listObj" :key="key"
    - key的重要性（key尽量不能乱写如random或者index）
    - v-for和v-if不建议一起使用在同一个标签上
        - v-for的计算优先级更高，因此会先循环，每次循环又会去计算v-if做判断。即造成了多次重复判断，性能不好。
        - 应该将v-if提到外层的wrapper上控制
        - 如果对于每个循环需要控制自己的条件渲染，应该借助计算属性computed先过滤
- 事件
    - event参数
        - 默认传参      @click="increment1"：increment1函数会默认接收event参数
        - 自定义参数    @click="increment2(2, $event)"：需要传额外参数时，需要手动传$event参数
        - **「与react对比」**
            - 这里的`event是原生的event`
            - event.target：返回当前触发元素
            - event.currentTarget：返回当前触发元素，说明`事件是被注册到当前元素的`
    - 事件修饰符
        - v-on:click.stop       阻止单击事件继续传播
        - v-on:submit.prevent   提交事件不再重载页面
        - v-on:click.stop.prevent  修饰符可以串联
        - v-on:submit.prevent   只有修饰符
        - v-on:click.capture    添加事件监听器时使用事件捕获模式，即内部元素触发的事件先在此处理，然后才交由内部元素处理
        - v-on:click.self       仅在event.target是当前元素自身时触发处理函数，即事件不是从内部元素触发的
    - 按键修饰符
        - @click.ctrl.exact     有且只有Ctrl被按下的时候才触发
        - @click.ctrl           即使 Alt或Shift被一同按下时也会触发
        - @click.exact          没有任何按键修饰符被按下时才触发

- 表单
    - v-model
    - 常见表单项
        - 多行文本
            - 注意不允许这样 `<textarea>{{desc}}</textarea>`
            - 要用v-model来使用 `<textarea v-model="desc" />`
    - 修饰符
        - v-model.trim
        - v-model.lazy：相当于输入防抖
        - v-model.number


### Vue组件使用

- 组件间通讯
    - 父子组件：
        - props
        - this.$emit
    - 兄弟组件（不相关组件）：
        - vue自定义事件（使用一个新的vue实例，提供了event.$on event.$emit event.$off 自定义事件的能力）
            - event.js
                import Vue from 'vue'
                export default new Vue()
            - A.vue
                import event from './event'
                mounted() {
                    event.$on('onAddTitle', this.addTitleHandler) // 绑定自定义事件
                },
                beforeDestroy() {
                    event.$off('onAddTitle', this.addTitleHandler) // 及时销毁，否则可能造成内存泄露
                }
            - B.vue
                import event from './event'
                methods: {
                    addTitle() {
                        event.$emit('onAddTitle', this.title) // 调用自定义事件
                    }
                }
- 组件生命周期
    - 单个组件的生命周期
        - 阶段
            - 挂载
                - beforeCreate
                - created
                - beforeMounted
                - mounted
            - 更新
                - beforeUpdate
                - updated
            - 销毁
                - beforeDestory
                - destroyed
        - created 与 mounted 区别
            - created 实例初始化完成
            - mounted dom挂载完成
        - beforeDestroy 可以做什么事情
            - 解绑自定义事件，销毁子组件及事件监听器
    - 父子组件的声明周期
        - 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
        - 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated


### Vue高级特性

- 自定义v-model
    ::: details
    ```html
    <!-- index.vue -->
    <CustomVModel v-model="name"/>

    <!-- CustomVModel.vue -->
    <template>
        <!-- 例如：vue 颜色选择 -->
        <input type="text"
            :value="text1"
            @input="$emit('change1', $event.target.value)"
        >
        <!--
            1. 上面的 input 使用了 :value 而不是 v-model
            2. 上面的 change1 和 model.event1 要对应起来
            3. text1 属性对应起来
        -->
    </template>

    <script>
    export default {
        model: {
            prop: 'text1', // 对应 props text1
            event: 'change1'
        },
        props: {
            text1: String,
            default() {
                return ''
            }
        }
    }
    </script>
    ```
    :::
- $nextTick
    - 首先vue是异步渲染的，data改变之后，DOM不会立刻渲染。$nextTick会在DOM渲染之后被触发，以获取最新DOM节点。
    - `this.$nextTick(() => { const ulElem = this.$refs.ul1 })`
    - 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次
- refs
- slot
    - 基本使用
    - 作用域插槽（**父组件可拿到子组件吐出来的数据**）
        - 子组件通过 `<slot :slotData="website">`将内部的data website，以某个别名比如slotData传给父组件
        - 父组件通过 `<template v-slot="slotProps">`拿到子组件吐出来的数据
            ```html
            <ScopedSlotDemo :url="website.url">
                <template v-slot="slotProps">
                    {{slotProps.slotData.title}}
                </template>
            </ScopedSlotDemo>
            ```
    - 具名插槽
        - 多个slot，子组件通过name="header"命名
        - 父组件通过 `<template v-slot:header>` 或缩写 `<template #header>`
        - 当没有定义name时，即default匹配未命名slot
- 动态组件
    - :is="component-name"
    - 动态渲染不同组件
- 异步组件
    - import() 函数，按需加载，异步加载大组件
        ```html
        <!-- 点击按钮，异步加载大组件 -->
        <template>
            <FormDemo v-if="showFormDemo"/>
            <button @click="showFormDemo = true">show form demo</button>
        </template>
        <script>
        export default {
            components: {
                FormDemo: () => import('../BaseUse/FormDemo')
            },
            data() {
                return {
                    showFormDemo: false
                }
            }
        }
        </script>
        ```
- keep-alive
    - 频繁切换，不需要重复渲染时，缓存组件
        - 常见与tab切换中
            - 如果不使用 keep-alive 包裹，则子组件会每次重建与销毁
            - 使用了 keep-alive 包裹后，第一次mounted后就被缓存了，不会销毁
            ```html
            <div>
                <button @click="changeState('A')">A</button>
                <button @click="changeState('B')">B</button>
                <button @click="changeState('C')">C</button>

                <keep-alive> <!-- tab 切换 -->
                    <KeepAliveStageA v-if="state === 'A'"/> <!-- v-show -->
                    <KeepAliveStageB v-if="state === 'B'"/>
                    <KeepAliveStageC v-if="state === 'C'"/>
                </keep-alive>
            </div>
            ```
        - keep-alive是vue组件级的控制，而v-show只是通过display:none来控制显示而已
- mixin
    - 多个组件相同逻辑的抽离复用
        - 通过mixin引入的逻辑和组件内自有的逻辑会进行“混入”，且子组件内部的同名逻辑会覆盖从mixin引入的
    - mixin不是完美的解决方案，会有**一些问题**
        - 1. 变量来源不明确，不利于阅读
        - 2. 多mixin会造成命名冲突
        - 3. mixin和组件可能出现多对多的关系，复杂度较高
    - Vue3 的组合API（Composition API）旨在解决这些问题


### Vuex使用

- vuex就是把共享的state从vue组件中抽取出来，放到store中统一维护
- store
    - state
        - mapState
    - getters
        - mapGetters
    - mutation：原子操作，同步
        - commit
        - mapMutations
    - action：异步操作，可以封装整合多个mutations
        - dispatch
        - mapActions
- 为什么Vuex中mutation不能执行异步操作？
    - 为了 devtools 实现 time-travel
- 考察state的数据结构设计

### vue-router使用

- 路由模式
    - hash模式：        abc.com/#/user/20
    - H5 history模式：  abc.com/use/20
        - 需要server端支持，即无论访问什么url都返回index.html
        - 前端需要设置未匹配到路由时，返回404页面
- 路由配置
    - 动态路由
        - path: '/user/:id'
        - $route.params.id
    - 路由懒加载
        ```js
        {
            path: '/feedback',
            component: () => import(
                /* webpackChunkName: "feedback" */,
                './../components/FeedBack'
            )
        }
        ```


### Vue原理

- 组件化和MVVM
    - 传统jsp、php的组件化，只是静态渲染，更新还要依赖于操作DOM
    - Vue和React的组件化关键，是「数据驱动视图」
        - Vue   使用MVVM
        - React 使用setState

- （核心1）响应式
    - Object.defineProperty
        - 监听对象，监听数组
        - 复杂对象，深度监听
        - **3个缺点**
            - 深度监听，需要`一次性递归到底`，对于对象层级很深时，一次性计算量大
            - 无法监听新增属性、删除属性（Vue.set、Vue.delete）
            - `无法原生监听数组`，需要特殊处理（重写API，但不污染全局Array原型）

    - 如何实现响应式
    - Object.defineProperty的缺点，vue3为什么要起用Proxy
        - proxy有兼容性问题，且无法polyfill

- （核心2）模板编译
    - 从模板到render函数，再到vnode，再到渲染和更新
    - 模板不是html，有指令、插值、js表达式，能实现判断、循环。因此，模板一定是转换为某种js代码的，即编译模板。
        ```js
        const template = `<p>{{message}}</p>`
        with(this){return _c('p',[_v(_s(message))])} // render函数，即一个with语法的函数体
        // this是vue实例vm，_c就是h，也就是createElement，即上面可以写作
        with(this){return createElement('p',[createTextVNode(toString(message))])}
        // h最终返回 vnode

        // js的with语法：
            // _c _v _s都是在this上查找属性
        ```
    - vue-template-compiler 执行编译，将模板编译为render函数
        ```js
        const res = compiler.compile(template)
        ```
    - 执行render函数生成vnode
        ```js
        console.log(res.render)
        ```
    - *得到vnode后，在基于vnode执行diff和patch*
    - 使用webapck vue-loader，会在开发环境下编译模板（如果不这样做，会在运行时编译模板，比较慢）
    - vue组件中使用render函数代替template
        - 在有些复杂情况下，不能用template，因为它毕竟是静态的，此时可以考虑用render
        ```js
        Vue.component('heading', {
            render: function(createElement) {
                return createElement(
                    'h' + this.level,
                    [
                        createElement('a', {
                            attrs: {
                                name: 'headerId',
                                href: '#' + 'headerId'
                            }
                        }, 'this is a tag')
                    ]
                )
            }
        })
         ```

- （核心3）vdom和diff
    - vdom
        - DOM操作非常耗费性能，以前用jQuery，可以自行控制DOM操作，手动调整
        - 业务复杂度提高，想减少DOM计算次数比较难。。。因为JS执行速度比较快（特别是V8引擎），考虑把DOM计算转变成JS计算
        - vdom：用JS模拟DOM结构，计算出最小的变更，由框架去操作DOM
            - h
            - vnode
                ```js
                {
                    el:  div  //对真实的节点的引用，本例中就是document.querySelector('#id.classA')
                    tagName: 'DIV',   //节点的标签
                    sel: 'div#v.classA'  //节点的选择器
                    data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
                    children: [], //存储子节点的数组，每个子节点也是vnode结构
                    text: null,    //如果是文本节点，对应文本节点的textContent，否则为null
                }
                ```
            - patch有两种用法
                - patch(elem, vnode)     把vnode渲染到空的元素上
                - patch(vnode, newVnode) 把新的vnode更新旧的vnode
            - diff
            - key
    - diff算法
        - 传统diff算法是O(n^3)，即如果有1000个节点的树比较，则需比较10亿次
        - 优化到O(n)
            - *只比较同一层级，不跨级比较*
            - *tag不相同*，则认为是不同节点，直接删掉重建，不再深度比较
            - *tag和key两者都相同*，则认为是相同节点，不再深度比较
        - vue的diff算法参考snabbdom，采用双端比较。
            - diff的核心实现主要通过两个方法，patchVnode 与 updateChildren
                - patchVnodepatch(vnode, newVnode) 有两个参数，主要分五种比较情况.
                - updateChildren
                    - oldCh 和 newCh 各有两个头尾的指针 StartIdx 和 EndIdx ，一共有4种比较方式。
                    - 如果 4 种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，指针会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。
            - 这也是为什么key尽量不要用随机数或索引来做，因为无法判断唯一性

- 渲染/更新过程（想一下官网的流程图）
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


## 真题

- v-show和v-if的区别

- v-for中为什么要用key
    - 必须用key，且不能是index或random
    - diff算法中通过tag和key来判断，是否是相同节点（sameNode）
    - 通过key判断相同，移动，减少渲染次数，提升性能

- 描述生命周期
    - 单组件生命周期
    - 父子组件生命周期关系

- Vue组件如何通讯
    - 父子组件props，this.$emit
    - 自定义事件 event.$on event.$emit event.$off
    - vuex

- 描述组件渲染和更新的过程（结合官网的图示）

- 双向数据绑定v-model实现

- 对MVVM的理解

- computed有何特点
    - 缓存
    - 提高性能

- 为何组件data必须是一个函数
    - 组件 export default {} 编译之后都是一个class类，通过类实例化后得到组件实例
    - 如果data是对象，那么多个实例共用对象，会互相影响
    - 所以必须是一个函数，每次都生成一个副本

- ajax请求放在哪个生命周期中
    - mounted中
    - 放在mounted之前比如created其实没有用，因为js是单线程的，ajax异步请求回来js没渲染完也不能做什么事情，只会使逻辑变混乱

- 如何将组件所有props传递给子组件（不重要的知识点）
    - 《User v-bind="$props"》


- 如何自己实现v-model
    - :value
    - @input
    - model: {
        prop: 'value',
        event: 'change'
    }


- 逻辑复用
    - mixin
    - Vue3中的组合API

- 何时需要使用beforeDestory
    - 解绑自定义事件 event.$off
    - 清除定时器
    - 解绑自定义的DOM事件，如window.scroll

- 什么是作用域插槽
    - 作用域插槽
    - 具名插槽

- Vuex中action和mutation的区别
    - action处理异步操作，并能整合多个mutation操作
    - mutation处理同步操作，做原子操作，配合devtool-time-travel

- 如何配置路由异步加载
    - path
    - component: () => import(/* webpackChunkName */, '../demo.vue')

- 请用vnode描述一个DOM结构
    - JSON对象
        - tag
        - props
            - className
            - id
        - children

- Vue如何监听数组变化
    - Object.defineProperty 不能监听数组变化
    - vue 重新定义了原型，重写了8种方法，实现监听
    - proxy可以原生监听数组变化

- diff算法的时间复杂度
    - O(n)
    - 是通过什么手段同O(n^3)降下来的

- 描述diff算法过程
    - vue的diff算法参考snabbdom，采用双端比较。
        - diff的核心实现主要通过两个方法，patchVnode 与 updateChildren
            - patchVnode patch(vnode, newVnode) 有两个参数，主要分五种比较情况（patchVnode 、addVnodes、removeVnodes）
            - updateChildren
                - oldCh 和 newCh 各有两个头尾的指针 StartIdx 和 EndIdx ，一共有4种比较方式。
                - 如果 4 种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，指针会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。
        - 这也是为什么key尽量不要用随机数或索引来做，因为无法判断唯一性

- Vue为何是异步渲染
    - 异步渲染，合并data修改，为了提高渲染性能
    - $nextTick可以在DOM更新渲染完成后，触发回调，得到更新后的DOM

- Vue性能优化
    - 合理使用v-show与v-if
    - 合理使用computed
    - v-for时加key，且要避免和v-if同时使用
    - 自定义事件、DOM事件、定时器要及时销毁
    - 合理使用异步组件
    - 合理使用keep-alive
    - data层级尽量不要太深（深的话递归遍历添加响应式监听，可能会卡）


- Vue3
    - 全部用ts重写
    - 性能提升，代码量减少
    - Proxy存在浏览器兼容性问题，且不能polyfill
        - 据说，Vue3会单独出一个兼容ie11的版本

    - Object.defineProperty
        - **3个缺点**
            - 深度监听，需要`一次性递归到底`，对于对象层级很深时，一次性计算量大
            - 无法监听`新增属性、删除属性`（Vue.set、Vue.delete）
            - `无法原生监听数组`，需要特殊处理（重写API，但不污染全局Array原型）

    - Proxy重写响应式
        - 深度监听，性能如何提升
            - 判断是数组会递归调用监听
            - 什么时候触发get，什么时候递归（即什么时候用什么时候递归）
                - 避免了defineProperty一次性递归到底的性能问题
        - 可监听新增/删除的属性
            - 因为Proxy劫持的是一个完整的对象
        - 可监听数组变化
            - 因为Proxy劫持的是一个完整的对象，且提供13种数组劫持方法






