# 性能优化——虚拟列表滚动（virtualScroll）

## 什么是虚拟列表滚动

- 使用虚拟列表，虚拟滚动
    - `vue-virtual-listview`

## 原理实现
- 只对可见区域进行渲染，对非可见区域中的数据，部分渲染（buffer缓冲区渲染）
    - 对于item项高度不定，以预估高度先行渲染，然后获取item真实高度，使用钩子函数updated 缓存，之后的渲染通过数组索引从缓存中取。
    - 监听scroll事件的方式来触发可视区域中数据的更新
    - 定义组件属性bufferScale,用于接收缓冲区数据与可视区数据的比例
    - 可视区域上方：above
    - 可视区域：screen
    - 可视区域下方：below


## 参考链接

- [「前端进阶」高性能渲染十万条数据(虚拟列表)](https://juejin.im/post/5db684ddf265da4d495c40e5)


