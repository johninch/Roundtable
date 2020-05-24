# React事件机制

## 什么是合成事件

React自身实现了一套自己的事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等，虽然和原生的是两码事，但**也是基于浏览器的事件机制下完成的**。采用了事件代理，批量更新等方法，并且抹平了各个浏览器的兼容性问题。

React事件**并没有绑定在具体的dom节点上，而是通过`事件代理`，注册在最外层的 document上**，然后由统一的事件处理程序来处理，同时也是基于浏览器的**事件机制（冒泡）**，所有节点的事件都会在 document 上触发。

## 怎样理解「合成」这个概念

- 对原生事件的封装
- 对某些原生事件的升级和改造
- 不同浏览器事件兼容的处理

## React为什么要用合成事件（合成事件的意义是啥）

- 减少内存消耗，提升性能，不需要注册那么多的事件了，一种事件类型只在 document 上注册一次
- 统一规范，解决 ie 事件兼容问题，简化事件逻辑
- 对开发者友好

## React事件如何解决跨浏览器兼容？
- React 根据 W3C 规范定义了每个事件处理函数的参数，即合成事件。合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象。它们将不同浏览器的行为合并为一个 API。这样做是为了确保事件在不同浏览器中显示一致的属性。

- 事件处理程序将传递 SyntheticEvent 的实例，这是一个跨浏览器原生事件包装器。它具有与浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()，在所有浏览器中他们工作方式都相同。React合成的 SyntheticEvent采用了事件池，这样做可以大大节省内存，而不会频繁的创建和销毁事件对象。
- 另外，不管在什么浏览器环境下，浏览器会将该事件类型统一创建为合成事件，从而达到了浏览器兼容的目的。


## React事件（合成事件）和原生事件有什么区别？

1. React事件使用驼峰命名，而不是全部小写；通过 JSX，React事件传递一个函数作为事件处理程序，而不是一个字符串。
    ```html
    <!-- 例如， HTML： -->
    <button onclick="activateLasers()">
    Activate Lasers
    </button>

    <!-- 在 React 中略有不同： -->
    <button onClick={activateLasers}>
    Activate Lasers
    </button>
    ```
2. 另一个区别是，在 React 中你不能通过返回 false 来阻止默认行为。必须明确调用 preventDefault。

## React事件和原生事件的执行顺序，可以混用吗？

react的所有事件（即合成事件）都是注册在 document节点上的，当真实dom触发后，冒泡到document，才会对react事件进行处理。所以原生的事件会先执行，然后执行 react合成事件，最后执行真正在 document上挂载的事件。

即原生事件在处于目标阶段，而合成事件在冒泡阶段。因此，原生事件肯定优先于合成事件执行。如果在原生事件中阻止了冒泡，合成事件不再触发；而如果在合成事件中阻止冒泡，则不会影响原生事件（因为已经执行完了）。
- 原生事件（阻止冒泡）会阻止合成事件的执行
- 合成事件（阻止冒泡）不会阻止原生事件的执行
- 因此，react事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation方法，则会导致其他 react事件失效。因为所有元素的事件将无法冒泡到 document上。所有的react事件都将无法被注册。


## 合成事件注册与分发机制

### 注册

1. **事件注册** - 组件挂载阶段，根据组件内的声明的事件类型 onclick，onchange 等，给 document 上添加事件 `addEventListener`，并指定统一的事件处理程序 `dispatchEvent`来统一派发。

2. **事件存储** - 就是把 react 组件内的所有事件统一的存放到一个对象（`listenerBank`）里缓存起来，为了在触发事件的时候可以查找到对应的方法去执行。


### 分发执行

在事件注册阶段，最终所有的事件和事件类型都会保存到 `listenerBank`中。而在分发执行阶段，`listenerBank`中 其实就是用来查找事件回调的：

1. 进入统一的事件分发函数(`dispatchEvent`)
2. 结合原生事件找到当前节点对应的ReactDOMComponent对象
3. 开始 事件的合成
    - 1 根据当前事件类型生成指定的合成对象
    - 2 封装原生事件和冒泡机制
    - 3 查找当前元素以及他所有父级
    - 4 在 `listenerBank`查找事件回调并合成到 event(合成事件结束)
4. 批量处理合成事件内的回调事件（事件触发完成 end）

## 为何React事件要自己绑定this？

React在 document上进行统一的事件分发，`dispatchEvent` 通过循环调用所有层级的事件来模拟事件冒泡和捕获。
在 React源码中，当具体到某一事件处理函数将要调用时，将调用 `invokeGuardedCallback`方法。
```js
function invokeGuardedCallback(name, func, a) {
    try {
        func(a);
    } catch (x) {
        if (caughtError === null) {
            caughtError = x;
        }
    }
}
```
可见，**事件处理函数作为回调函数是直接调用的**，`并没有指定调用的组件`，所以不进行手动绑定的情况下this会回退到默认绑定，所以我们需要手动将当前组件绑定到 this上。

## 参考链接

[一文吃透 React 事件机制原理](https://toutiao.io/posts/28of14w/preview)
[【React深入】React事件机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484039&idx=1&sn=1f657356676d4809633f30668acb50d2&chksm=ce6ec62bf9194f3d8a4eb382bd01c56231908a1b08fb9c2c9783f96df6650ee808fe18343032&scene=21#wechat_redirect)
[为什么需要处理react类组件的this绑定问题](./react/react-handle-this.html#一、为什么需要处理react类组件的this绑定问题)
