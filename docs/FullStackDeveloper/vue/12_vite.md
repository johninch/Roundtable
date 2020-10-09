# 12、vite


## 简介
vite（法语”快“的意思，有逼格），是vue3生态带来的一个新工具，**对标webpack**。

我们使用webpack做工程化时，dev环境需要打包放到内存中，才能启动，这通常需要较长时间的等待，而每次修改后，热更新也需要等待秒级的时间才能看到更新。

我们知道，**现代浏览器都支持`type="module"`，原生支持es6的import写法**。vite正是利用了这一点，从而使得dev环境，不需要打包编译了，直接使用es6的import语法，加载模块，无需打包，达到秒开的开发体验。

*vite解决的是开发体验，对于线上生产环境打包，还是需要使用rollup或者webpack。*

## 基本原理
一旦script标签使用type="module"标记，其引用的内容就可以使用import来加载：
```html
<div id="app"></div>
<!-- main.js就支持es6的import功能 -->
<script type="module" src="/src/main/js"></script>
```
```js
// src/main/js

// import 会发起一个新的http请求，加载import的目标文件
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

要解决3个问题：
- 如何加载node_modules里的内容
- 如何加载单文件组件
- 如何加载css文件

具体见：[前端新工具--vite从入门到实战（一）](https://zhuanlan.zhihu.com/p/149033579)

## 展望

感觉webpack未来大概率也会借鉴这个功能，这很正常，毕竟tree-shaking也是从rollup借鉴的哈哈。


