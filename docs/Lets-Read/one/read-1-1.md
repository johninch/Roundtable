---
{
    "title": "react-router「前端进阶」彻底弄懂前端路由",
}
---
#### [原网页连连接](https://juejin.im/post/5d2d19ccf265da1b7f29b05f)
### 什么是前端路由

简单的说，就是在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和SEO时均通过这个特殊的 url 来实现。

为实现这一目标，我们需要做到以下二点：

1. 改变 url 且不让浏览器像服务器发送请求；

2. 可以监听到 url 的变化

目前有两种模式，分别是 **hash 模式和 history 模式**


### hash模式

这里的 hash 就是指 url 后的 # 号以及后面的字符。比如说 "www.baidu.com/#hashhash" ，其中 "#hashhash" 就是我们期望的 hash 值。

由于 hash 值的变化 `不会导致浏览器像服务器发送请求`, 而且 hash 的改变会触发 `hashchange `事件，浏览器的前进后退也能对其进行控制，所以在 H5 的 history 模式出现之前，基本都是使用 hash 模式来实现前端路由。

- ***手动实现hash路由***

```js
class HashRouter {
    constructor(){
        // 初始化路由
        this.routers = {};
        // 绑定hash监听事件
        window.addEventListener('hashchange', () => {
            this.load()
        })
    }
    // 注册路由
    register = (hash, cb) => {
        this.routers[hash] = cb;
    }
    // 注册首页路由
    registerIndex = (cb) => {
        this.routers['index'] = cb;
    }
    load = () => {
        let hash = location.hash.slice(1);
        let handle;
        if (!hash) {  // 说明是主页
            handle = this.routers.index;
        } else {
            handle = this.routers[hash];
        }
        handle();
    }
  
}
```
```html
<body>
    <div id="nav">
        <a href="#/page1">page1</a>
        <a href="#/page2">page2</a>
        <a href="#/page3">page3</a>
        <a href="#/page4">page4</a>
        <a href="#/page5">page5</a>
    </div>
    <div id="container"></div>
</body>
```
**使用**
```js
let router = new HashRouter();
let container = document.getElementById('container');

//注册首页回调函数
router.registerIndex(()=> container.innerHTML = '我是首页');

//注册其他视图回到函数
router.register('/page1',()=> container.innerHTML = '我是page1');
router.register('/page2',()=> container.innerHTML = '我是page2');
router.register('/page3',()=> container.innerHTML = '我是page3');

// 加载页面
router.load();
```

### hash模式

在 HTML5 的规范中，history 新增了以下几个 API：

```js
history.pushState();         // 添加新的状态到历史状态栈
history.replaceState();      // 用新的状态代替当前状态
history.state                // 返回当前状态对象
```
由于 history.pushState() 和 history.replaceState() 可以改变 url 同时，不会刷新页面，所以在 HTML5 中的 histroy 具备了实现前端路由的能力

- hash 路由通过监听haschange事件进行跳转路由的。
- history的改变并不会触发任何事件，所以我们无法直接监听 history 的改变而做出相应的改变.。

所以我们换个思路，将这些方式进行拦截，变相的监听history的变化。

>1. 点击浏览器的前进或后退按钮
>2. 点击a标签
>3. 在 JS 代码中触发 history.pushState 函数
>4. 在 JS 代码中触发 history.replaceState 函数


- ***手动实现history路由***
```js
class HistoryRouter {
    constructor(){
        this.routers = {};
        this.listenPopState();
        this.listenLink();
    }
    
    // 全局监听a标签
    listenLink = () => {
        window.addEventListener('click', (e) => {
            let target = e.target;
            if (target.tagName.toUpperCase() === 'A' && target.getAttribute('href')) {
                e.preventDefault();  // 组织默认行为
                this.assign(target.getAttribute('href'));
            }
        })
    }
    
    //用于首次进入页面时调用
    load(){
        let path = location.pathname;
        this.dealPathHandler(path)
    }
    
    //用于注册每个视图
    register(path,callback = function(){}){
        this.routers[path] = callback;
    }
    //用于注册首页
    registerIndex(callback = function(){}){
        this.routers['/'] = callback;
    }
    //用于处理视图未找到的情况
    registerNotFound(callback = function(){}){
        this.routers['404'] = callback;
    }
    
    // 跳转到path
    assign = (path) => {
        history.pushState({path}, null, path);
        this.dealPathHandler(path);
    }
    
     //替换为path
    replace(path){
        history.replaceState({path},null,path);
        this.dealPathHandler(path)
    }
    
    //监听popstate
    listenPopState = () => {
        window.addEventListener('popstate', (e) => {
            let state = e.state || {};
            let path = state.path || '';
            this.dealPathHandler(path);
        })
    }
    
    // 处理path跳转页面
    dealPathHandler = (path) => {
        let handle;
        if (!this.routers[path]) {  // 没有对应path
            handle = this.routers['404'] || function() {};
        } else {
            // 对应path
            handle = this.routers[path]
        }
        handle.call(this);
    }
}
```

**使用**
```html
<body>
    <div id="nav">
        <a href="/page1">page1</a>
        <a href="/page2">page2</a>
        <a href="/page3">page3</a>
        <a href="/page4">page4</a>
        <a href="/page5">page5</a>
        <button id="btn">page2</button>
    </div>
    <div id="container">
    </div>
</body>
```
```js
let router = new HistoryRouter();
let container = document.getElementById('container');

//注册首页回调函数
router.registerIndex(() => container.innerHTML = '我是首页');

//注册其他视图回到函数
router.register('/page1', () => container.innerHTML = '我是page1');
router.register('/page2', () => container.innerHTML = '我是page2');
router.register('/page3', () => container.innerHTML = '我是page3');
router.register('/page4', () => {
    throw new Error('抛出一个异常')
});

document.getElementById('btn').onclick = () => router.assign('/page2')


//注册未找到对应path值时的回调
router.registerNotFound(() => container.innerHTML = '页面未找到');
//注册出现异常时的回调
router.registerError((e) => container.innerHTML = '页面异常，错误消息：<br>' + e.message);
//加载页面
router.load();
```

### hash、history如何抉择
hash 模式相比于 history 模式的优点：
- 兼容性更好，可以兼容到IE8
- 无需服务端配合处理非单页的url地址

hash 模式相比于 history 模式的缺点：
- 看起来更丑
- 会导致锚点功能失效
- 相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以