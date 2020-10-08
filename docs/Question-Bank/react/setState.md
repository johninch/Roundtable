# setState的执行机制

## setState是异步的么，为什么有时能有时又不能立即拿到更新结果?

### **1、钩子函数和合成事件中**

**React的生命周期和合成事件中，React仍然处于它的批处理更新机制中，这时无论调用多少次 setState，都不会立即执行更新**，而是将要更新的`state`存入`_pendingStateQueue`，将要更新的组件存入`dirtyComponent`。当上一次更新机制执行完毕，最顶层组件didmount后会将批处理标志设置为 false。这时将取出`dirtyComponent`中的组件以及 `_pendingStateQueue`中的`state`进行更新。**这样就可以确保组件不会被重新渲染多次。**
```tsx
componentDidMount() {
    this.setState({
        index: this.state.index + 1
    })

    console.log('state', this.state.index);
}
```
所以，如上面的代码，当我们在执行 setState后立即去获取 state，这时是获取不到更新后的 state的，因为处于React的批处理机制中，state被暂存起来，待批处理机制完成之后，统一进行更新。

::: tip
**setState本身并不是异步的，而是 React的批处理机制给人一种异步的假象**。
:::


### **2、异步代码和原生事件中**

```tsx
 componentDidMount() {
    setTimeout(() => {
        console.log('调用setState');
        this.setState({
            index: this.state.index + 1
        })
        console.log('state', this.state.index);
    }, 0);
}
```
```js
// 原生事件
dom.addEventListener('click',()=>{
    setState({foo: 'bar'})
})
```
如上面的代码，当我们在**异步代码中**调用 setState时，根据 JS的异步机制，会将异步代码先暂存，等所有同步代码执行完毕后在执行，`这时 React的批处理机制已经走完`，批处理标志设被设置为 false，这时再调用 setState即可立即执行更新，拿到更新后的结果。

在**原生事件中**调用 `setState并不会触发 React的批处理机制`，所以立即能拿到最新结果。

### 最佳实践
setState的第二个参数接收一个`回调函数`，该函数会在 React的批处理机制完成之后调用，所以你想在调用 setState后立即获取更新后的值，请在该回调函数中获取。
```tsx
this.setState(
    {
        index: this.state.index + 1
    },
    () => {
        console.log(this.state.index);
    }
)
```


## 为什么有时连续多次setState只有一次生效？(state队列合并机制)

### setState多次传入「对象」时，合并计算
例如下面的代码，两次打印出的结果是相同的：
```tsx
componentDidMount() {
    this.setState(
        {
            index: this.state.index + 1
        },
        () => {
            console.log(this.state.index);
        }
    )
    this.setState(
        {
            index: this.state.index + 1
        },
        () => {
            console.log(this.state.index);
        }
    )
}
```
原因就是 `React会将批处理机制中存储的多个setState进行合并`，类似于 `Object的 assign`，如果传入的是**对象，则会被合并成一次**，所以上面的代码两次打印的结果是相同的：
```js
Object.assign(  nextState,  {index: state.index+ 1},  {index: state.index+ 1})
```

### setState多次传入「函数」时，每次都立即计算
注意，assign函数中对**函数做了特殊处理**，处理第一个参数传入的是函数，**函数的参数 preState是前一次合并后的结果**，所以计算结果是准确的：
```tsx
componentDidMount() {
    this.setState(
        (state, props) => ({
            index: state.index + 1
        }),
        () => {
            console.log(this.state.index);
        }
    )
    this.setState(
        (state, props) => ({
            index: state.index + 1
        }),
        () => {
            console.log(this.state.index);
        }
    )
}
```
所以上面的代码两次打印的结果是不同的，第二次用的是第一次改变后的结果作为输入。

### 最佳实践

React会对多次连续的 setState进行合并，如果你想立即使用上次 setState后的结果进行下一次 setState，可以让 setState 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数。


## 几个钩子函数中setState要点

- 不推荐直接在 `componentDidMount`直接调用 setState。componentDidMount本身处于一次更新中，我们又调用了一次 setState，就会在未来再进行一次 render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。
    - 当然在 componentDidMount我们可以调用接口，再回调中去修改 state，这是正确的做法。
    - 当state初始值依赖dom属性时，在 componentDidMount中 setState是无法避免的。
- 在`componentWillUpdate`生命周期中不能调用 setState。会造成死循环，导致程序崩溃。
- 在`componentDidUpdate`生命周期中可以调用setState, **但请注意它必须被包裹在一个条件语句里**, 否则会导致死循环

## 参考链接

[由实际问题探究setState的执行机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247483989&idx=1&sn=d78f889c6e1d7d57058c9c232b1a620e&chksm=ce6ec6f9f9194fef681c79ee869bf58d5413132c73496710b2eb32c859a2249a895c2ce8a7cd&scene=21#wechat_redirect)

