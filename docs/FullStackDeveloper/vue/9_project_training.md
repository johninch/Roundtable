# 9、vue项目最佳实践


## svg icon的最佳实践

- [下载图标](https://www.iconfont.cn/)，存入src/icons/svg中
- 安装依赖:svg-sprite-loader
    ```bash
    npm i svg-sprite-loader -D
    ```
- 修改规则和新增规则，vue.config.js

```js
const title = "vue项目最佳实践";

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: {
        // 向index.html注入标题
        name: title,
    },
    chainWebpack(config) {
        // 配置svg规则排除icons目录中svg文件处理
        // 目标给svg规则增加一个排除选项exclude:['path/to/icon']
        config.module.rule("svg")
            .exclude.add(resolve("src/icons"))
        // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('./src/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId: 'icon-[name]'})
    }
}
```

- 自动导入
    - 创建icons/index.js
    ```js
    import Vue from 'vue'
    import SvgIcon from '@/components/SvgIcon.vue'

    const req = require.context('./svg', false, /\.svg$/)
    req.keys().map(req);

    Vue.component('svg-icon', SvgIcon)
    ```
    - 创建SvgIcon组件，components/SvgIcon.vue
    ```html
    <template>
        <svg :class="svgClass" v-on="$listeners">
            <use :xlink:href="iconName" />
        </svg>
    </template>

    <script>
    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                if (this.className) {
                    return 'svg-icon ' + this.className
                } else {
                    return 'svg-icon'
                }
            }
        }
    }
    </script>

    <style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    </style>
    ```



## 环境变量和模式

如果想给多种环境做不同配置，可以利用vue-cli提供的模式。默认有 development 、 production 、 test 三种模式，对应的，它们的配置文件形式 是 .env.development，.env.production，.env.test。

你也可以通过修改mode选项，来覆盖模式名称。如下将开发模式改为dev，配置文件就需要建为.env.dev
```js
// package.json
"serve": "vue-cli-service serve --mode dev"
```

在配置文件（比如.env.development）中定义一个可用的环境变量：
```bash
# 只能用于服务端，也就是vue.config.js
foo=barrrrrrrrrrrrrrr

# VUE_APP_XXX 的变量，前后端都可以使用
VUE_APP_DONG=dongdong
VUE_APP_BASE_API = '/api'
```



## 权限控制

### 路由权限控制：路由守卫

路由分为两种: constantRoutes 和 asyncRoutes ，前者是默认路由可直接访问，后者中定义的路由 需要先登录，获取⻆色并过滤后动态加入到Router中。

- router/index.js
```js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    name: "home",
    meta: {
      title: "Home", // 导航菜单项标题
      icon: "qq" // 导航菜单项图标
    }
  }
];

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/About.vue"),
    name: "about",
    meta: {
      title: "About",
      icon: "denglong",
      roles: ['admin','editor']
    },
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});
```

- 登录页views/login.vue
```vue
<template>
  <div>
    <h2>用户登录</h2>
    <div>
      <input type="text" v-model="username" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          this.$router.push({
            path: this.$route.query.redirect || "/"
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
```

- 路由守卫:创建./src/permission.js，并在main.js中引入（import './permission'）
    - 维护用户登录状态:路由守卫 => 用户登录 => 获取token并缓存
    - 登录成功后，请求用户信息获取用户⻆色信息，然后根据⻆色过滤asyncRoutes，并将结果动态添加至 router
```js
import router from './router'
import store from './store'

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem('token')

  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      if (hasRoles) {
        // 说明用户已获取过角色信息，放行
        next()
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch('user/getInfo')

          // 根据当前用户角色过滤出可访问路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加至路由器
          router.addRoutes(accessRoutes)

          // 继续路由切换，确保addRoutes完成
          next({ ...to, replace: true })
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          alert(error || '未知错误')
        }
      }
    }
  } else {// 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})
```

::: details 如果异步路由表在后端生成的话
*特殊的*，如果异步路由表在后端生成的话：异步获取路由表，可以当用户登录后向后端请求可访问的路由表，从而动态生成可访问⻚面，操作和原来是相同的，这里多了一步将后端返回路由表中组件名称和本地的组件映射步骤:
（因为后端component只能存字符串，所以需要映射到组件实例的加载）
```js
// 前端组件名和组件映射表
const map = {
    //xx: require('@/views/xx.vue').default // 同步的方式
    xx: () => import('@/views/xx.vue') // 异步的方式
}

// 服务端返回的asyncRoutes
const asyncRoutes = [
  { path: '/xx', component: 'xx',... }
]

// 遍历asyncRoutes，将component替换为map[component]
function mapComponent(asyncRoutes) {
    asyncRoutes.forEach(route => {
        route.component = map[route.component];
        if(route.children) {
            route.children.map(child => mapComponent(child))
        }
    })
}
mapComponent(asyncRoutes)
```
:::


### 细粒度：按钮权限
- 这里使用的是`自定义指令`，有问题。⻚面中某些按钮、链接有时候需要更细粒度权限控制，这时候可以封装一个指令`v-permission`，放在需 要控制的按钮上，从而实现按钮级别权限控制
    - 但是：该指令只能删除挂载指令的元素，对于那些额外生成的和指令无关的元素无能为力，比如:
    ```html
    <el-tabs>
        <el-tab-pane label="用户管理" name="first" v-permission="['admin', 'editor']">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second" v-permission="['admin', 'editor']">配置管理</el-tab-pane>
        <el-tab-pane label="⻆色管理" name="third" v-permission="['admin']">⻆色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth" v-permission="['admin', 'editor']"> 定时任务补偿</el-tab-pane>
    </el-tabs>
    ```
    此时只能使用v-if来实现:
    ```html
    <template>
    <el-tab-pane v-if="checkPermission(['admin'])">
    </template>
    <script>
    export default {
        methods: {
            checkPermission(permissionRoles) {
                return roles.some(role => {
                    return permissionRoles.includes(role);
                });
            }
        }
    }
    </script>
    ```
- 我们ESOP-Admin中，直接使用v-if结合mixin的方式，匹配权限后决定是否渲染节点


## 自动生成导航菜单

- 创建侧边栏组件，components/Sidebar/index.vue
- 创建侧边栏菜项目组件，components/Sidebar/SidebarItem.vue
- 创建侧边栏菜单项组件，components/Sidebar/Item.vue

::: details 代码
components/Sidebar/index.vue:
```vue
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 默认激活项
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return {
        menuText: "#bfcbd9",
        menuActiveText: "#409EFF",
        menuBg: "#304156"
      };
    }
  }
};
</script>
```
components/Sidebar/SidebarItem.vue:
```vue
<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 唯一显示子元素的情况显示为链接 -->  
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 抽象出一个item组件处理icon和title -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </router-link>
    </template>

    <!-- 有子元素显示为菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <!-- 标题 -->
      <template v-slot:title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 子菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 如果只有一个子菜单时设置
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子路由，该子路由默认显示
      if (showingChildren.length === 1) {
        return true
      }

      // 没有子路由则显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
```
components/Sidebar/Item.vue
```vue
<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
```
:::

## 数据交互

对axios做一次封装，统一处理配置、请求和响应拦截，在成功拦截里处理错误信息。


## 数据mock

数据模拟两种常⻅方式，本地mock和线上esay-mock

### 本地mock
本地mock:利用webpack-dev-server提供的before钩子可以访问express实例，从而定义接口
- 修改vue.config.js，给devServer添加相关代码
- 调用接口，@/store/modules/user.js


### esay-mock
线上esay-mock 诸如easy-mock这类线上mock工具优点是使用简单，mock工具库也比较强大，还能根据swagger规范生成接口。

使用步骤:
1. 登录easy-mock
若远程不可用，可以搭建本地easy-mock服务(nvm + node + redis + mongodb) 先安装node 8.x、redis和mongodb，启动命令:
```bash
切node v8: nvm use 8.16.0
起redis: redis-server
起mongodb: mongod
起easy-mock项目: npm run dev
```
2. 创建一个项目
3. 创建需要的接口
```js
// user/login
{
    "code": function({_req}) {
        const {username} = _req.body;
        if (username === "admin" || username === "jerry") {
            return 1
        } else {
            return 10008
        }
    },
    "data": function({_req}) {
        const {username} = _req.body;
        if (username === "admin" || username === "jerry") {
            return username
        } else {
            return ''
        }
    }
}

// user/info
{
    code: 1,
    "data": function({_req}) {
        return _req.headers['authorization'].split(' ')[1] === 'admin' ? ['admin'] : ['editor']
    }
}
```
4. 调用:修改base_url，.env.development
```js
VUE_APP_BASE_API = 'http://localhost:7300/mock/5e9032aab92b8c71eb235ad5'
```

## 解决跨域

devServer配置Proxy即可


## 项目测试

### 测试分类
- 常⻅的开发流程里，都有测试人员，他们不管内部实现机制，只看最外层的输入输出，这种我们称为`黑盒测试`。
    - 比如你写一个加法的⻚面，会设计N个用例，测试加法的正确性，这种测试我们称之为`E2E测试`（End To End，即端对端测试）。
- 还有一种测试叫做`白盒测试`
    - 我们针对一些内部核心实现逻辑编写测试代码，称之为`单元测试`。
    - 更负责一些的我们称之为`集成测试`，就是集合多个测试过的单元一起测试。

### Jest

开发写的都是单元测试，比较流行的有 Mocha+Chai 和 Jest 两套单测方案。Mocha是用来跑测试的，Chai是用来写测试的，而Jest是两者的结合，也是现今比较流行的单测框架。这两套方案都被vue-cli内置了。

具体。。。略。。。

