# Vuex状态管理

## Vuex原理
把所有组件的所有数据状态放到统一的内存空间（`state`）中做管理，`state`渲染映射到Vue组件上，组件对于状态的修改只能通过`dispatch Actions`进而`commit Mutations`(或者组件直接`commit Mutations`)的方式，这种将组件的共享状态抽取出组件外部进行管理的方式保证了**数据流的单向性**，进而使状态可以安全的维护。

![Vuex工作原理](./images/vuex.png)

## Vuex组成
- `State`：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- `Getter`：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- `Mutation`：是唯一更改 store 中状态的方法，且必须是同步函数。
- `Action`：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- `Module`：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## dispatch和commit提交mutation的区别
- `commit => mutations`，用来触发`同步`操作的方法。
- `dispatch => actions`，用来触发`异步`操作的方法。actions还可以封装多个mutations提交。

## 为什么Vuex中mutation不能执行异步操作
每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。

如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

