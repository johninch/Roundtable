# 2、vue全家桶

## 目录

vue全家桶原理剖析
- vue-router需求分析
- vue-router源码实战
- vuex设计思想
- vuex源码实战


## 安装
```bash
npm install -g @vue/cli
vue create [projName]
vue add router
vue add vuex
```

## vue插件

- Q：什么是vue插件？
- A：插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制，一般有下面几种：
    - 添加全局方法或者 property。如：vue-custom-element
    - 添加全局资源：指令/过滤器/过渡等。如 vue-touch
    - 通过全局混入来添加一些组件选项。如 vue-router
    - 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
    - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

- Q：如何开发vue插件？
- A：Vue插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
    ```js
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
            // 逻辑...
        }

        // 2. 添加全局资源
        Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {
            // 逻辑...
            }
            ...
        })

        // 3. 注入组件选项
        Vue.mixin({
            created: function () {
            // 逻辑...
            }
            ...
        })

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
        }
    }
    ```

- Q：Vue.use()的作用是什么？
- A：用于安装Vue插件，其实就是调用插件里的install方法。

- Q：为何 Vue.use() 必须在调用 new Vue() 之前调用?
- A：因为安装插件时，插件给Vue添加全局功能，所以必须写在new Vue() 之前，否则创建的Vue实例，无法获取插件添加的全局功能。


## vue-router

[inch-router](https://github.com/johninch/inch-vue-components/tree/master/src/router)

本节要仿造vue-router原理，实现一个自己的路由插件（实现一个插件：返回一个函数或返回一个对象，它提供一个install方法）。

首先看下vue-router解决的问题是什么：

SPA单页面应用程序，更好的用户体验，页面不要刷新。。

router/index.js 完成了哪些事情：
- 1. use一下， VueRouter本身是一个插件，use会调用VueRouter.install方法
    - 声明两个全局组件
        - `<router-view>`
        - `<router-link>`
- 2. 声明一个路由表，即url与组件内容的映射表
- 3. 创建一个Router实例
- 4. 导出实例
- 5. 在main.js中引入该实例，挂载
- 6. 在App.vue中添加路由视图，即组件内容出口 `<router-view>`
- 7. 最后通过导航跳转 `<router-link>`

### 需求分析
- spa 页面不能刷新
    - 策略1：hash #/about
    - 策略2：history api /about
- 根据url显示对应的内容
    - router-view
    - 响应式变量current，持有url地址，一旦变化，动态重新执行render

### vue-router实现原理

InchRouter基本使用：
1. use
2. const routes路由表
3. 传入routes，实例化router
4. 导出router实例
```js
// router/index.js
import Vue from 'vue'
import InchRouter from './inch-router'
import Home from '../views/Home.vue'

Vue.use(InchRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new InchRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

VueRouter就是一个插件，所以本节我们要实现一个自己的路由插件InchRouter，具体目标为：
- 实现VueRouter类（这里我们定义叫InchRouter）
    - 处理路由选项
    - 监控url变化
    - 响应这个变化
- 实现install方法
    - 挂载$router
    - 声明两个全局组件
        - `<router-view>`
        - `<router-link>`


### 实现VueRouter类

#### 处理路由选项
```js
// inch-router.js
class InchRouter {
    // 处理路由选项 routes路由表
    constructor(options) {
        this.$options = options
    }
}
```

#### 监控url变化、响应url变化
- 以hash模式为例，就是通过监听`hashchange`事件，从url拿到当前路由current变量
    - 如果current是非响应式的，那么即使其变化后，用到它的组件也不会触发重新渲染
    - 因而，需要借助Vue内置的api（`defineReactive`），**给当前实例对象添加响应式的current变量**
- 在router-view组件中，通过path与current字段匹配，得到当前要渲染的component，`h(component)`
```js
// inch-router.js

// Vue构造函数本地变量
let _Vue

class InchRouter {
    // 处理路由选项 routes路由表
    constructor(options) {
        this.$options = options

        // 需要定义一个响应式的current属性，每次改变后都触发render函数重渲
        // 在Vue的api中有一个defineReactive，可以给对象定义响应式数据
        const initial = window.location.hash.slice(1) || '/'
        _Vue.util.defineReactive(this, 'current', initial)

        // 监控url变化
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        // 只要#后面的部分
        this.current = window.location.hash.slice(1)
        console.log(this.current)
    }
}

InchRouter.install = function(Vue) {
    // ...
    Vue.component('router-view', {
        render(h) {
            let component = null
            // 找到当前url对应的组件
            const route = this.$router.$options.routes.find(
                // 这里的current变量必须是响应式的，这样才能促使用到它的组件重新执行render函数
                route => route.path === this.$router.current
            )

            if (route) {
                component = route.component
            }
            // 渲染传入的组件
            return h(component)
        }
    })
}
```

#### 优化：路由匹配抽离
- 上面的路由匹配逻辑写在了router-view组件中，每次渲染都需要循环遍历匹配，再考虑都嵌套的情况，需要递归，这显然是不够合理的
- 应该预先将所有的路由表里的数据做好映射，缓存path和route映射关系，在使用时更优雅方便
```js
// inch-router.js

// Vue构造函数本地变量
let _Vue

class InchRouter {
    // 处理路由选项 routes路由表
    constructor(options) {
        this.$options = options

        // 缓存path和route映射关系
        this.routeMap = {}
        this.$options.routes.forEach(
            route => {
                this.routeMap[route.path] = route
            }
        )

        // 需要定义一个响应式的current属性，每次改变后都触发render函数重渲
        // 在Vue的api中有一个defineReactive，可以给对象定义响应式数据
        const initial = window.location.hash.slice(1) || '/'
        _Vue.util.defineReactive(this, 'current', initial)

        // 监控url变化
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        // 只要#后面的部分
        this.current = window.location.hash.slice(1)
        console.log(this.current)
    }
}

InchRouter.install = function(Vue) {
    // ...
    Vue.component('router-view', {
        render(h) {
            let component = null

            const { routeMap, current } = this.$router
            component = routeMap[current] ? routeMap[current].component : null

            // 渲染传入的组件
            return h(component)
        }
    })
}
```

### 实现install方法

#### 挂载$router
- Q：目标就是将 router实例 挂载到 Vue的原型对象 上，但这里有个问题，install的时候，router实例（$router）还没有创建，如何挂载呢？
- A：使用`全局混入`，通过生命周期钩子，来**延后挂载代码的执行**。未来所有组件都需要执行beforeCreate中的代码。
- 另外，插件的install方法会传入Vue构造函数，在插件的编写中，之所以不import Vue进来，是**避免插件代码在打包时，把Vue代码打包进来**。因此提供一个_Vue共当前插件使用。
```js
// inch-router.js
InchRouter.install = function(Vue) {
    // 引用Vue构造函数，在上面InchRouter中使用
    _Vue = Vue

    // 1. 挂载 $router
    // 目标就是将 router实例 挂载到 Vue的原型对象 上
    // 但这里有个问题，install的时候，router实例（$router）还没有创建，如何挂载呢
    // Vue.prototype.$router = function() {}
    // 解决方法是，使用混入，通过生命周期钩子，来延后这段代码的执行
    // 使用全局混入，给未来所有组件在beforeCreate中，都需要执行挂载$router的任务
    Vue.mixin({
        // 这里是全局混入，所有组件都会在这个钩子执行这段代码
        beforeCreate() {
            // 此处的this指的是组件实例，只有main.js中new Vue()的组件实例才传入了router，其他组件没有，所以要条件执行
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router // main.js中，new Vue传入了router，就是这里拿到挂载的
            }
        }
    })

    // ...
}
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './inchRouter'
// import router from './router'

Vue.config.productionTip = false

new Vue({
  router, // 挂载实例router的目的是什么？ => 让我们可以在插件中访问到Router实例，就是执行混入的beforeCreate钩子中挂载$router
  render: h => h(App)
}).$mount('#app')
```


#### 声明两个全局组件
- `<router-view>`
- `<router-link>`

定义全局组件，可以写template，可以写jsx，也可以写render函数，但render函数的优先级更高。

1. 定义全局组件 router-link，使用`渲染函数方式`：
```js
InchRouter.install = function(Vue) {
    // ...
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                require: true
            }
        },
        render(h) {
            // <router-link to="/about">xxx</router-link>
            // 转换成
            // <a href="#/about">xxx</a>
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })
    // ...
}
```
2. 定义全局组件 router-link，使用`template模板方式`：
```js
InchRouter.install = function(Vue) {
    // ...
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                require: true
            }
        },
        template: `<a href="#${this.to}">${this.$slots.default}</a>`
    })
    // ...
}
```
3. 定义全局组件 router-link，使用`jsx方式`：
```js
InchRouter.install = function(Vue) {
    // ...
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                require: true
            }
        },
        render() {
            return <a href={'#'+this.to}>{this.$slots.default}</a>
        }
    })
    // ...
}
```

### 扩展：嵌套路由处理

- router-view深度标记
- 路由匹配时，获取代表深度层级的match

*这部分暂时先略过*

## vuex

本节要仿造vuex原理，实现一个自己的状态管理插件。

Q：首先看下vuex解决的问题是什么？
A：Vuex`集中式`存储管理应用的所有组件的状态，并以相应的规则保证状态以`可预测`的方式发生变化。

### 具体目标

仿造vuex，实现状态管理插件InchVuex：
- 实现Store类
    - 维持一个响应式状态state
    - 实现commit方法
    - 实现dispatch方法
    - 扩展：实现getters
- 实现install方法
    - 挂载$store

### 基本使用

```js
// store/index.js
import Vue from 'vue'
import InchVuex from './inch-vuex'
// import Vuex from 'vuex'

Vue.use(InchVuex)

export default new InchVuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    // 此处参数上下文其实就是store实例
    add({commit}) {
      setTimeout(() => {
        // 这里在定时器内的commit的this已经丢失，所以需要在插件中锁死this
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 实现Store类

#### 维持一个响应式状态state

**（一）直接创建响应式的state变量**

最简单的实现，就是直接创建响应式的state变量：
- 方法1：可以使用`Vue.util.defineReactive(this, 'prop', initialData)`，给实例添加响应式属性state
- 方法2：可以“借鸡生蛋”，使用`this.xxx = new Vue({data() {return xxx}})`的方式
    - data中的任何一个key，都会代理到Vue的实例上去，所以就能像 this.xxx.key1 这样访问了
```js
let _Vue // 缓存传入的Vue构造器

class Store {
    constructor(options) {
        // 创建响应式的state
        // _Vue.util.defineReactive(this, 'state', {})
        // 也可以“借鸡生蛋”
        // data中的任何一个key，都会代理到Vue的实例上去
        // this.$store.state.xxx
        this.state = new _Vue({
            data() {
                return options.state
            }
        })
    }
}

const install = function(Vue) {
    _Vue = Vue;
    // ...
}

// 因为导出的对象是vuex，实例化的写法是这样的：new Vuex.Store()
export default {
    Store,
    install
}
```

**（二）参考vuex官方state实现**
```js
let _Vue // 缓存传入的Vue构造器

class Store {
    constructor(options) {
        this._vm = new _Vue({
            data() {
                return {
                    // 这里不希望被代理，就在前面加上一个$，或者前面加上一个_，这样此变量就不会被代理到实例上了（这是源码里约定的）
                    // 为什么不希望被代理呢？因为你不希望用户通过$store.counter直接取到值，而是希望通过$store.state.counter取值
                    $$state: options.state
                }
            }
        })
    }

    get state() {
        return this._vm._data.$$state // _data是vue初始化后创建的，和$data一样
    }

    set state(val) {
        // vuex中，state是只读的，不能直接改变，所以应该直接报错
        console.error('please use replaceState to reset state')
    }
}

const install = function(Vue) {
    _Vue = Vue;
    // ...
}

// 因为导出的对象是vuex，实例化的写法是这样的：new Vuex.Store()
export default {
    Store,
    install
}
```

#### 实现commit方法、dispatch方法
- 首先在构造器初始化中把mutations和actions都缓存
- commit传入两个参数，type和payload，从而可以拿到对应的commit方法，entry，最后执行`entry(this.state, payload)`
- dispatch同理，但有两点不同
    - 最终传入的不仅是state，而是整个store实例，包括 {commit, dispatch, getters, ...}，即最后执行`entry(this, payload)`
    - 并且，dispatch支持异步调用，所以需要 `return` entry(this, payload)
- 特别的，还需要处理this指向问题：
    - 因为在action中，当内部包裹了setTimeout函数，导致commit或者dispatch在执行时，`this丢失`，则会报错
    - 可以像react那样，`在constructor中手动bind`，锁死this
    - 另外，也可以在定义commit和dispatch时就使用`箭头函数的方式`，来锁死this
```js
let _Vue // 缓存传入的Vue构造器

class Store
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions

        // ...

        // 修改this指向
        // 因为在action中，当内部包裹了setTimeout函数，导致commit或者dispatch在执行时，this丢失，则会报错
        // 因此，这里就像react那样，手动锁死这两个方法的this指向
        // 或者在定义commit和dispatch时，就用箭头函数锁死this
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    // ...

    // 修改state
    // this.$store.commit('add', 1)
    commit(type, payload) { // 这里用箭头函数的话就不用手动bindthis了
        // 获取type对应的mutation
        const entry = this._mutations[type]

        if (!entry) {
            console.error('unknown mutation')
            return
        }

        // 传入state作为参数
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        // 获取type对应的action
        const entry = this._actions[type]

        if (!entry) {
            console.error('unknown action')
            return
        }

        // 传入当前Store实例做上下文
        // 之所以return是为了适配异步的情况
        return entry(this, payload)
    }
}

const install = function(Vue) {
    _Vue = Vue;
    // ...
}

// 因为导出的对象是vuex，实例化的写法是这样的：new Vuex.Store()
export default {
    Store,
    install
}
```





### 实现install方法
这部分就比较简单，与vue-router中的处理完全一致：**通过`全局混入`的方式，延迟store实例的挂载时机，添加到Vue的原型上**
```js
const install = function(Vue) {
    _Vue = Vue;

    // 全局混入
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
```

### 扩展：实现getters
```js
// store/index.js
import Vue from 'vue'
import InchVuex from './inch-vuex'

Vue.use(InchVuex)

export default new InchVuex.Store({
  state: {
    counter: 0,
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  }
})
```
具体实现要注意如下4个点：
- 1、遍历所有的getters，得到key值，取出对应的方法fn
- 2、getters的函数计算结果，要保存到计算属性computed中，从而实现响应式
- 3、有个点需要处理：computed中的方法是无参数的，而用户定义的getters方法fn是有参数的，所以需要高阶返回
- 4、由于用户访问getters只能是只读的，所以应通过拦截器，定义只读属性
```js
class Store {
    constructor(options) {
        this._wrappedGetters = options.getters

        // 定义computed选项
        const computed = {}
        this.getters = {}

        // {doubleCounter(state)}
        const store = this
        Object.keys(this._wrappedGetters).forEach(key => {
            // 获取用户定义的getter
            const fn = store._wrappedGetters[key]
            // 转换为computed可以使用无参数形式
            computed[key] = function() {
                return fn(store.state)
            }
            // 为getters定义只读属性
            Object.defineProperty(store.getters, key, {
                get() {
                    return store._vm[key]
                }
            })
        })

        this._vm = new _Vue({
            data() {
                return {
                    $$state: options.state
                }
            },
            computed // getters选项加到实例中
        })
    }
}
```
