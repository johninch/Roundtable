# React Hooks 使用技巧

## 怎么替代 SCU（shouldComponentUpdate）
在 Class Component 的写法通常是：
```jsx
class Button extends React.PureComponent {}
```
这样就自带了 shallowEqual 的 shouldComponentUpdate。

相比之下，Function Component 替代 shouldComponentUpdate 的方案并没有 Class Component 优雅，代码是这样的：
- 使用 React.memo()：
```jsx
const Button = React.memo(props => {
  // your component
});
```
- 使用 useMemo：
或者在父级就直接生成一个自带 memo 的子元素：
```jsx
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

## 怎么替代 componentDidUpdate
由于 useEffect 每次 Render 都会执行，因此需要模拟一个 useUpdate 函数：
```jsx
const mounting = useRef(true);
useEffect(() => {
  if (mounting.current) {
    mounting.current = false;
  } else {
    fn();
  }
});
```


## 怎么替代 forceUpdate
- React 官方文档提供了一种方案：
```js
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

function handleClick() {
  forceUpdate();
}
```
每次执行 dispatch 时，只要 state 变化就会触发组件更新。

- 当然 useState 也同样可以模拟：
```js
const useUpdate = () => useState(0)[1];
```
我们知道 useState 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 setValue，这样它的功能就仅剩下刷新组件了。


## 聚合拆分过多的 state
useState 目前的一种实践，是将变量名打平，而非像 Class Component 一样写在一个 State 对象里：
```jsx
class ClassComponent extends React.PureComponent {
  state = {
    left: 0,
    top: 0,
    width: 100,
    height: 100
  };
}

// VS

function FunctionComponent {
  const [left,setLeft] = useState(0)
  const [top,setTop] = useState(0)
  const [width,setWidth] = useState(100)
  const [height,setHeight] = useState(100)
}
```
实际上在 Function Component 中也可以聚合管理 State：
```jsx
function FunctionComponent() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
  });
}
```
只是更新的时候，**不再会自动 merge，而需要使用 `...state` 语法：**
```jsx
setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
```

更推荐的是，**把 state 切分成多个 state 变量**，**每个变量包含的不同值会同时发生变化**。

举个例子，我们可以把组件的 state 拆分为 position 和 size 两个对象，并永远以非合并的方式去替换 position：
```jsx
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

## 如何获取上一轮的 props 或 state
虽然不怎么常用，但是毕竟 Class Component 可以通过 componentWillReceiveProps 拿到 prevProps 与 nextProps，对于 Function Component，最好通过自定义 Hooks 方式拿到上一个状态：
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```
通过 `useEffect` 在组件渲染完毕后再执行的特性，再利用 `useRef` 的可变特性，让 `usePrevious` 的返回值是 “上一次” Render 时的。

可见，合理运用 useEffect useRef，可以做许多事情，而且封装成 CustomHook 后使用起来仍然很方便。未来 usePrevious 可能成为官方 Hooks 之一。

## 如何惰性创建昂贵的对象
如果依赖数组的值相同，useMemo 允许你 记住一次昂贵的计算。但是，这仅作为一种提示，并不 保证 计算不会重新运行。但有时候需要确保一个对象仅被创建一次。

1、第一个常见的使用场景是当**创建初始 state 很昂贵时**：
```jsx
function Table(props) {
  // ⚠️ createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```
由于整个函数组件都是 Render，因此每次初始化时，createRows()都会被调用，为避免重新调用昂贵的createRows()，我们可以传一个 函数 给 useState：
```jsx
function Table(props) {
  // ✅ createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```
React 只会在首次渲染时调用这个函数。

2、略


## 如果 effect 的依赖频繁变化该怎么办？
即使effect依赖的deps频繁变化，你也不能忽略副作用函数所依赖的变量，如下，明明使用了count，却没有声明在依赖中，所以当count变化时，副作用函数也不会执行，count则不会超过1：
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```
如果将count声明在依赖中，可以完成功能，但却会付出代价：
```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```
代码可以正常运行了，拿到了最新的 count。

但是：
- 计时器不准了，因为每次 count 变化时都会销毁并重新计时。
- 频繁 生成/销毁 定时器带来了一定性能负担。

可以 想办法不依赖外部变量，使用 setCount 的函数回调模式，每次改变旧的值：
```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```
不过如果effect还依赖作用域中的其他变量时，比如 步频不是1而是step变量，还是无法解决问题，推荐的方法是使用 useReducer 函数，将更新与动作解耦：
```jsx {7}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```
由于更新变成了 `dispatch({ type: "tick" })` 所以**不管更新时需要依赖多少变量，在调用更新的动作里都不需要依赖任何变量**。具体更新操作在 reducer 函数里写就可以了。

([在线demo](https://codesandbox.io/s/xzr480k0np))


## 参考链接

- [Hooks FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html)
- [精读《Function VS Class 组件》](https://github.com/dt-fe/weekly/blob/master/95.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20VS%20Class%20%E7%BB%84%E4%BB%B6%E3%80%8B.md)
- [精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033)
- [精读《怎么用 React Hooks 造轮子》](https://github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md#componentdidupdate)
