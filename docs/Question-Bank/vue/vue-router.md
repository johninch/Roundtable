# vue-router路由



## vue-router模式

传送门:[前端路由模式](../bom/router.html#前端路由模式)

- hash：使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history：依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract：支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## vue-router中 $route与$router的区别：
- `$route`为当前router跳转对象，里面可以获取name、path、query、params等；
- `$router`为VueRouter实例，想要导航到不同URL，则使用$router.push方法，返回上一个history使用$router.go方法。

#### this.$router.push中使用params和使用query有什么不同？
相同点都是带参数过去，不同点是：
- params需要在路由设置中添加参数（ path: '/projectAdd/:id'），而query不需要；
- 跳转后在URL的显示不同，params显示的是（http://localhost:8082/#/projectAdd/6），query显示的是（http://localhost:8082/#/projectAdd?toseId=6）；
- 接收方式不同，params为this.$route.params，query为this.$route.query。
- path应与query配套使用，因为提供path时，会忽略params参数；name应与params配套使用。

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
如果提供了 path，则 params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

*注意*：如果跳转的url只是id改变，页面并不会刷新，这是因为路由是相同的，vue认为是同一个页面，从而复用已加载的页面，而不重新加载。解决办法是：通过`router-view`**动态绑定key值**，这样当重新跳转的时候因为key值不同，那么vue在路由切换时都会重新渲染触发钩子了。

## vue-router导航守卫

### 路由拦截（路由元信息与导航守卫）
**路由拦截**的主要作用是提供`权限控制`，比如有的页面需要登录了才能进入，有些页面不同身份渲染不同。这里主要介绍下典型的应用：登录拦截。
- 首先在定义路由时添加`路由元信息meta`，设置字段requireAuth的布尔值，用于判断该路由的访问是否需要登录。true则顺利进入路由，false就进入登录页面。
- 利用`vue-router`提供的`钩子函数router.beforeEach((to, from, next) => { })`对路由设置全局守卫，to是即将进入的路由对象，from是离开的路由对象，next是resolve钩子的函数，是必须被调用的。路由匹配的所有路由记录会暴露为$route对象。通过遍历$route.matched数组来检查记录中的meta字段。

### 导航守卫钩子
- 全局前置/钩子：beforeEach、beforeResolve、afterEach
- 路由独享的守卫：beforeEnter
- 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

完整的导航解析流程见官网：[完整的导航解析流程](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B)


