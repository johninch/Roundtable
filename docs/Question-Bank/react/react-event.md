# React事件机制

React自己实现了一套事件机制，自己模拟了事件冒泡和捕获的过程，采用了事件代理，批量更新等方法，并且抹平了各个浏览器的兼容性问题。

React事件并没有绑定在真实的 Dom节点上，而是通过事件代理，在最外层的 document上对事件进行统一分发。

## React事件和原生事件有什么区别？

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

### 执行顺序
react的所有事件都挂载在 document中，当真实dom触发后，冒泡到document，才会对react事件进行处理。所以原生的事件会先执行，然后执行 react合成事件，最后执行真正在 document上挂载的事件。

### react事件和原生事件可以混用吗？
react事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation方法，则会导致其他 react事件失效。因为所有元素的事件将无法冒泡到 document上。所有的react事件都将无法被注册。


## React的合成事件是什么？React事件如何解决跨浏览器兼容？
- React 根据 W3C 规范定义了每个事件处理函数的参数，即合成事件。合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象。它们将不同浏览器的行为合并为一个 API。这样做是为了确保事件在不同浏览器中显示一致的属性。

- 事件处理程序将传递 SyntheticEvent 的实例，这是一个跨浏览器原生事件包装器。它具有与浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()，在所有浏览器中他们工作方式都相同。React合成的 SyntheticEvent采用了事件池，这样做可以大大节省内存，而不会频繁的创建和销毁事件对象。
- 另外，不管在什么浏览器环境下，浏览器会将该事件类型统一创建为合成事件，从而达到了浏览器兼容的目的。


## 为何React事件要自己绑定this？

React在 document上进行统一的事件分发，dispatchEvent 通过循环调用所有层级的事件来模拟事件冒泡和捕获。
在 React源码中，当具体到某一事件处理函数将要调用时，将调用 invokeGuardedCallback方法。
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
可见，**事件处理函数作为回调函数是直接调用的**，并没有指定调用的组件，所以不进行手动绑定的情况下this会回退到默认绑定，所以我们需要手动将当前组件绑定到 this上。

参考传送门：[为什么需要处理react类组件的this绑定问题](./react/react-handle-this.html#一、为什么需要处理react类组件的this绑定问题)


## 参考链接

[【React深入】React事件机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484039&idx=1&sn=1f657356676d4809633f30668acb50d2&chksm=ce6ec62bf9194f3d8a4eb382bd01c56231908a1b08fb9c2c9783f96df6650ee808fe18343032&scene=21#wechat_redirect)
