# 指出组件式调用和函数式调用异同点

假定已知 Demo组件 为无状态组件
```js
// 方式一
render() {
    return <Demo />;
}
// 方式二
render() {
    return Demo();
}
```

