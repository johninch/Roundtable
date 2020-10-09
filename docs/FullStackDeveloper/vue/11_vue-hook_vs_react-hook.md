# 11、Vue3 composition API vs React Hooks

> 本文重点对 Vue3中的组合式API 和 React Hooks进行对比学习，本文参考[Vue3 究竟好在哪里？（和 React Hook 的详细对比）](https://zhuanlan.zhihu.com/p/133819602)以及文中提到的相关文章。




## 使用上对比

### React Hook

其实 React Hook 的限制非常多，比如官方文档中就专门有一个章节介绍它的限制：
1. 不要在循环，条件或嵌套函数中调用 Hook。
2. 确保总是在你的 React 函数的最顶层调用他们。
3. 遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。
4. 手动编写deps依赖。

### Vue Hook

Vue Hook 带来的不同在于：
1. 与 React Hooks 相同级别的逻辑组合功能，但有一些重要的区别。与 React Hook 不同，setup 函数仅被调用一次，这在性能上比较占优。
2. 对调用顺序没什么要求，每次渲染中不会反复调用 Hook 函数，产生的的 GC 压力较小。
3. 不必考虑几乎总是需要 useCallback 的问题，以防止传递函数prop给子组件的引用变化，导致无必要的重新渲染。
4. React Hook 有臭名昭著的“`闭包陷阱`”问题（甚至成了一道热门面试题，omg），如果用户忘记传递正确的依赖项数组，useEffect 和 useMemo 可能会捕获过时的变量，这不受此问题的影响。Vue 的自动依赖关系跟踪确保观察者和计算值始终正确无误。
5. 不得不提一句，React Hook 里的「依赖」是需要你去手动声明的，而且官方提供了一个 eslint 插件，这个插件虽然大部分时候挺有用的，但是有时候也特别烦人，需要你手动加一行丑陋的注释去关闭它。





## 原理不同

### Vue Hook
```vue
<template>
  <div>
    <span>{{count}}</span>
    <button @click="add"> +1 </button>
  </div>
</template>

<script>
export default {
    setup() {
        const count = ref(0)

        const add = () => count.value++

        effect(function log(){
            console.log('count changed!', count.value)
        })

        return { count, add }
    }
}
</script>
```
1. Vue中setup只执行一次，但是会产生**响应式对象**，响应式对象的改动，是会触发「由 template 编译而成的 render 函数」的重新执行的。Vue3 的 Hook 只需要一个「初始化」的过程，也就是 setup，命名很准确。它的关键字就是`「只执行一次」`。

2. 需要在 count 发生变化的时候做某件事，只需要引入 **effect** 函数。与react中useEffect不同的是，effect中的**副作用函数**`只会产生一次`，这个函数在读取 count.value 的时候会收集它作为依赖，那么下次 count.value 更新后，自然而然的就能触发副作用函数重新执行了。


### React Hook
```js
export default function Counter() {
    const [count, setCount] = useState(0);

    const add = () => setCount((prev) => prev + 1);

    const [count2, setCount2] = useState(0);

    return (
        <div>
            <span>{count}</span>
            <button onClick={add}> +1 </button>
        </div>
    );
}
```
1. useState 返回的 count 和 setCount 则会被**保存在组件对应的 Fiber 节点上**，每次组件被render的时候都会顺序执行所有的hooks，所以 每个 React 函数每次执行 Hook 的顺序必须是相同的。上面例子里的 useState 在初次执行的时候，由于执行了两次 useState，会在 Fiber 上保存一个 { value, setValue } -> { value2, setValue2 } 这样的链表结构。
- React **只能按顺序**从 Fiber 节点上找出上次渲染保留下来的值呢。所以 React 严格限制 Hook 的执行顺序和禁止条件调用。

2. React 要监听 count 的变化做某些事的话，会用到 **useEffect** 的话，那么下次 render 之后会把前后两次 render 中拿到的 useEffect 的第二个参数 deps 依赖值进行一个`逐项的浅对比`（对前后每一项依次调用 Object.is）。
- 当 React 在渲染后发现 count 发生了变化，会执行 useEffect 中的回调函数。（`每次渲染都会重新产生一个函数引用`，也就是 useEffect 的第一个参数）。由于`每次渲染都会不断的执行并产生闭包`，那么从性能上和 GC 压力上都会稍逊于 Vue3。它的关键字是`「每次渲染都重新执行」`。




## 心智负担

### React Hooks 的心智负担

*我觉得，这些心智负担应该收敛到框架内部，而不是暴露给开发者，虽然更灵活更自由更可操作，但是真的好累*

React 还是不可避免的引入了`依赖`这个概念，但是这个`依赖`是需要**我们去手动书写的**，实时上 React 社区所讨论的「心智负担」也基本上是由于这个`依赖`所引起的。

即使你已经能较熟练的使用 Hooks，你也可能会遇到 useEffect 中 deps 写成**死循环的问题**，尤其是`依赖`了某个会不断变化的 callback 时。

另外，还有臭名昭著的闭包陷阱问题：
::: danger 闭包陷阱
具体demo和详解参考[从react hooks“闭包陷阱”切入，浅谈react hooks](https://juejin.im/post/6844904193044512782)

- Q：“闭包陷阱”如何产生？
- A：**deps依赖数组存在的意义，是react为了判定，在本次更新中，`是否需要执行其中的回调函数`**，如果执行了回调函数，则拿到了最新鲜的值。如果因为依赖没有正确传入，导致回调函数没有重新执行，那么因为变量在回调函数里面被引用了，形成了闭包一直被保存着，所以还是旧的值。。

- Q：为什么使用useRef能够每次拿到新鲜的值？
- A：ref = useRef() 所返回的都是同一个对象，每次组件更新所生成的`ref指向的都是同一片内存空间`，那么当然能够每次都拿到最新鲜的值了。
:::


## Vue Hook 的心智负担

ref，确实是需要仔细思考一下才能理解[引入 Ref 的心智负担](https://vue-composition-api-rfc.netlify.app/zh/#%E5%BC%8A%E7%AB%AF)

略，这部分有待进一步研究。。。

