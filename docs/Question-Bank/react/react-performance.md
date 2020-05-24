# React 性能优化

React 性能优化的]主要方向有两个：

- `减少重新 render 的次数`。因为在 React 里最重(花时间最长)的一块就是 reconction(简单的可以理解为 diff)，如果不 render，就不会 reconction。
- `减少重复计算`。对于函数式组件来说，每次 render 都会重新从头开始执行函数调用，对于一些计算函数每次都会重新计算。

## 减少rerender

在使用**类组件**的时候，使用的 React 优化 API 主要是：`shouldComponentUpdate`和 `PureComponent`，这两个 API 所提供的解决思路都是为了减少重新 render 的次数。

在**函数式组件**中，使用`React.memo`，这个 API 可以说是对标类组件里面的 PureComponent，这是可以减少重新 render 的次数的。
- React.memo基础用法：通过 React.memo 包裹的组件在 props 不变的情况下，这个被包裹的组件是不会重新渲染的。
    ```js
    function Component(props) {
        /* 使用 props 渲染 */
    }
    const MyComponent = React.memo(Component);
    ```
- React.memo高级用法：默认情况下其只会对 props 的复杂对象做`浅比较`，可将自定义的比较函数通过第二个参数传入来实现自定义比较。
    ```js
    function MyComponent(props) {
        /* 使用 props 渲染 */
    }
    function areEqual(prevProps, nextProps) {
        /*
        如果把 nextProps 传入 render 方法的返回结果与
        将 prevProps 传入 render 方法的返回结果一致则返回 true，
        否则返回 false
        */
    }
    exportdefault React.memo(MyComponent, areEqual);
    ```
    - 注意：React.memo 的第二个参数与类组件中的SCU（shouldComponentUpdate）很相似。不过值得注意的是，**它们返回的bool值正好相反**（如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反）。

::: danger 如果props中包含类似onClick的callback函数呢
React.memo保证了在父组件传递来的props不变情况下，被包裹组件不会rerender。

**但假如props中包含类似onClick的callback函数呢**？

由于函数式组件每次重新渲染，函数组件都会重头开始执行，也就是说callback函数也会重新生成（即函数引用变了），那么还是会触发React.memo包裹的子组件rerender，这是没必要的。这里就需要用到`useCallback`了。
:::

- 使用`useCallback`，得到一个被记忆的函数，即只在第一次生成，即使函数式组件重选它也不会重新生成：
    ```js
    const callback = () => {
        doSomething(a, b);
    }

    const memoizedCallback = useCallback(callback, [a, b])
    ```


## 减少重复计算

- `useMemo` 与 Vue中的计算属性很像，场景主要是用来缓存计算量比较大的函数结果，可以避免不必要的重复计算。
- 使用useMemo来**做计算结果缓存**，即将大计算量的函数通过此hook包裹，缓存一个计算结果：
    ```js
    function computeExpensiveValue() {
        // 计算量很大的代码
        return xxx
    }

    const memoizedValue = useMemo(computeExpensiveValue, [a, b]);
    ```
- **注意**：如果没有提供依赖项数组deps，useMemo 在每次渲染时都会计算新的值。


## 参考链接

- [React 函数式组件性能优化指南](https://mp.weixin.qq.com/s/mpL1MxLjBqSO49TRijeyeg)
