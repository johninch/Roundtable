# 3、手写Vue

## 设计思想

vue双向绑定的方法，就是通过defineProperty拦截数据的属性访问，在set方法里调用更新方法，改变视图

但是更新函数需要自己生成，通过编译器compile，得到更新函数updator

页面中有很多状态，每一个状态都有自己的updator，所以updator必须知道和谁相关

因此，需要通过观察者模式，每一个updator都有一个观察者watcher，watcher的职责也很简单，就是维护一个更新函数

Dep是一个数组，会管理多个watcher

## MVVM框架三要素

MVVM框架三要素：`数据响应式`、`模板引擎`、`渲染`

- `数据响应式`：监听数据变化并在视图中更新
    - Object.defineProperty()
    - Proxy
- `模版引擎`：提供描述视图的模版语法
    - 插值：{{}}
    - 指令：v-bind，v-on，v-model，v-for，v-if
- `渲染`：如何将模板转换为html
    - 模板 => vdom => dom


### 数据响应式原理

不同的框架有不同的处理方式：Vue2使用的是数据劫持，在Vue3中使用代理，在Ng里使用脏检查，在React中使用主动setState，不过hooks之后又有变化


