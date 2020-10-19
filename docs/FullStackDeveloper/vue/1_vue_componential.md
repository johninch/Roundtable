# 1、vue组件化实践

## 目录

- 组件化开发知识盘点
- 通用UI库设计思路
- 组件开发实践：表单
- 组件开发实践：弹窗类组件
- 组件开发实践：递归组件、树形菜单
- Element-UI源码学习思路

## 学习目标

- 深入理解Vue的组件化机制
- 掌握Vue组件化常用技术
- 能够设计并实现多种类型的组件
- 加深对一些vue原理的理解
- 学会看开源组件库源码


## 组件化

组件通信常用方式
- props
- $emit/$on
- event bus
- vuex

边界情况（不推荐使用）
- $parent
- $children
- $root
- $refs
- provide/inject
- 非prop特性
    - $attrs
    - $listeners

### 事件总线
任意两个组件之间传值常用事件总线 或 vuex的方式。eventBus：`Vue.prototype.$bus = new Bus();`
```js
// Bus:事件派发、监听和回调管理
class Bus {
  constructor() {
    this.callbacks = {};
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}
// main.js
Vue.prototype.$bus = new Bus();
// child1
this.$bus.$on("foo", handle);
// child2
this.$bus.$emit("foo");
```


### 非prop特性（$attrs、$listeners）

> 官方解释：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件 —— 在创建高级别的组件时非常有用。

即child中没有在props中声明的属性，child也能通过$attrs拿到：
```js
// child:并未在props中声明foo
<p>{{$attrs.foo}}</p>

// parent
<HelloWorld foo="foo"/>
```

但其实，其最主要应用场景是「`隔代传参`」：
```html
<!-- child -->
<template>
  <div>
    <h3>child</h3>
    <!-- $attrs -->
    <p>{{$attrs.msg}}</p>
    <!-- 隔代传参, v-bind会展开$attrs -->
    <Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
  </div>
</template>
```
child要将parent的属性，转发（透传）给 孙组件，就可以通过`v-bind="$attrs"`；同理，要将parent组件的事件，转发（透传）给 孙组件，就可以通过`v-on="$listeners"`。

`v-bind相当于展开$attrs的所有属性（...$attrs）`，在孙组件中，最好还是应该将用到的props声明出来。同理，`v-on也相当于展开$listeners的所有事件（...$listeners）`。

### provide/inject

隔很多代传，实现组件和后代之间传值。
```js
// ancestor
provide() {
    return {foo: 'foo'}
}
// descendant
inject: ['foo']

// 为解决命名冲突，改名
inject: {
    foo1: {
        from: 'foo'
    }
}
```
**注意**：*provide传值，对于基础数据类型，不是响应式的，而如果传入的是引用类型的响应式数据，或者实例，那么inject拿到的就是响应式的。*


### 插槽

插槽语法是 Vue 实现的内容分发 API，用于复合组件开发，类似占位符的作用。该技术在通用组件库开发中有大量应用。

#### 匿名插槽
```html
// comp1
<div>
    <slot></slot>
</div>

// parent
<comp1>hello</comp1>
```

#### 具名插槽：将内容分发到子组件指定位置
```html
// comp2
<div>
    <slot></slot>
    <slot name="content"></slot>
</div>

// parent
<Comp2>
    <!-- 默认插槽用default做参数 -->
    <template v-slot:default>具名插槽</template>
    <!-- 具名插槽用插槽名做参数 -->
    <template v-slot:content>内容...</template>
</Comp2>
```

#### 作用域插槽：父组件分发内容要用到子组件中的传出来的数据
```html
// comp3
<div>
    <slot :foo="foo"></slot>
</div>

// parent
<Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 -->
    <template v-slot:default="slotProps">
        来自子组件数据:{{slotProps.foo}}
    </template>
</Comp3>
```

## 通用表单组件

### 实现思路
- InchForm
    - 提供数据、校验规则
- InchFormItem
    - label标签添加
    - 执行校验
    - 显示错误信息
- InchInput
    - 维护数据
    - 图标、反馈

### 代码地址

[inch-vue-components: form](https://github.com/johninch/inch-vue-components/tree/master/src/components/form)

### 实现关键点

- 属性继承
    - inheritAttrs: false 把vue默认的属性继承去掉，继承对class和style是很有用的，但在这里，对于比如placeholder，不应该继承在自定义组件的div上，而应该关掉继承后，手动通过v-bind="$attrs"继承在input标签上。
- 触发校验
    - 触发校验肯定是在InchInput上
    - this.$emit('validate') 这样是没办法写的，因为外层的InchFormItem中是插槽，插槽还没有被替换成最外层的InchForm，所以无法绑定事件，也就无法监听。因此需要另辟蹊径。
    - 参考事件总线eventBus的实现：`事件的派发者和监听者，必须是同一个角色`，
        - 如果是当前实例InchInput派发事件，则在外层使用InchInput时也必须是它自己监听
        - 同理，考虑让父组件，即 InchFormItem 来派发和监听：`this.$parent.$emit('validate')`
- 监听校验
    - InchFormItem 可以在挂载后的mounted钩子中监听
        ```js
        // InchFormItem.vue
        mounted() {
            // InchFormItem在mounted钩子中监听校验触发
            this.$on('validate', () => {
                this.validate()
            });
        },
        methods: {
            validate() {
                // 需要校验规则、校验值
            }
        },
        ```
- 校验规则和校验值传递
    - validate方法需要拿到校验规则和校验值，但数据在外层的InchForm上（InchForm不一定直接包裹InchFormItem，有可能有中间层组件）
    - 因此，比较适合的传值方式是使用provide/inject：
        ```js
        // InchForm.vue
        provide() {
            return {
                form: this // 直接传this实例，则 校验规则rules、校验值model都能一并传下去
            }
        },

        // InchFormItem.vue
        inject: ['form'], // 注入
        ```
- 校验规则如何对应
    - rules传入InchFormItem后，由于是整体传入的，需要对应到各自的表单item上
    - 这里联想elementUI表单实现中，FormItem如果有校验，必须要设置prop属性，其实它的作用就相当于一个key，方便对应
    - （element form-item的prop，其实就是key，但是key是保留字段，因此用prop）
        ```js
        // InchFormItem.vue
        props: {
            prop: string
        }
        methods: {
            validate() {
                // 校验规则
                const rules = this.form.rules[this.prop]
                // 校验值
                const value = this.form.model[this.prop] // 注意value是变化的，因为外面是双向绑定的，且provide的是对象
            }
        },
        ```
- 校验如何完成
    - 自己实现校验规则成本太高，可以考虑使用第三方库，比如elementUI就使用第三方库async-validator
        ```bash
        npm install async-validator -S
        ```
    - 引入库后新建实例，校验要返回 Promise，因为校验有可能是异步操作
    - 另外，给validator实例设置数据源时，要使用ES6的计算属性来设置键值`[this.prop]`
        ```js
        // InchFormItem.vue
        import Schema from 'async-validator';
        export default {
            methods: {
                validate() {
                    // 校验规则
                    const rules = this.form.rules[this.prop]
                    // 校验值
                    const value = this.form.model[this.prop] // 注意value是变化的，因为外面是双向绑定的，且provide的是对象

                    // 创建校验器实例
                    const validator = new Schema({ [this.prop]: rules }) // 使用ES6的计算属性设置键名

                    // 校验，返回 Promise，因为校验有可能是异步操作
                    return Schema.validate({ [this.prop]: value }, errors => {
                        if (errors) {
                            // 显示错误信息
                            this.error = errors[0].message
                        } else {
                            this.error = ''
                        }
                    })
                }
            },
        }
        ```
- 全局校验
    - 点击登录按钮时，需要触发全局校验
    ```html
    <!-- index.vue -->
    <template>
        <div>
            <InchForm :model="model" :rules="rules" ref="loginForm">
                <InchFormItem label="用户名" prop="username">
                    <InchInput v-model="model.username" placeholder="请输入用户名"></InchInput>
                    <!-- {{model.username}} -->
                </InchFormItem>
                <InchFormItem label="密码" prop="password">
                    <InchInput type="password" v-model="model.password" placeholder="请输入密码"></InchInput>
                </InchFormItem>
                <InchFormItem>
                    <button @click="login">登录</button>
                </InchFormItem>
            </InchForm>
        </div>
    </template>
    ```
    ```js
    // index.vue
    methods: {
        login() {
            // 传入回调函数
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    alert('校验通过，可以登录')
                } else {
                    alert('登录失败')
                }
            })
        }
    },
    ```
    - loginForm的validate方法还没有实现，它接收一个参数，是回调函数：
    ```js
    // InchForm.vue
    methods: {
        // 接收一个参数，是回调
        validate(cb) {
            // 调用所有含有prop属性的子组件的validate方法并得到Promise数组
            const tasks = this.$children
                .filter(item => item.prop) // 过滤掉button的包裹
                .map(item => item.validate())
            // 所有任务必须全部成功才算校验通过，任一失败则校验失败
            Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false))
        }
    },
    ```

## 弹窗组件

- 弹窗这类组件的特点是它们在当前vue实例之外独立存在，通常挂载于body；
- 它们是通过JS动态创建的，不需要在任何组件中声明。
- 常⻅使用方式
    ```js
    this.$create(Notice, {
        title: '标题',
        message: '提示信息',
        duration: 1000
    }).show();
    ```


### 任务目标
需要创建组件实例，如果没有组件实例，就无法实现挂载，也就不能转化为真实的dom元素出现在页面中：
- 1、构建Component的实例
    - 方法1：“借鸡生蛋”，使用Vue构造函数，先得到Vue实例vm，vm在执行挂载之后，就能得到Component组件实例
        ```js
        const vm = new Vue({
            render(h) {
                // h是createElement
                // 它可以返回一个vnode
                return h(Component, { props })
            }
        }).$mount()
        ```
    - 方法2：使用Vue.extend得到组件实例
        ```js
        const comp = { data: {}, props: {} }
        const Ctor = Vue.extend(comp) // 得到组件构造函数
        new Ctor({ propsData: {} }) // 得到组件实例，传参需要指定propsData参数
        ```
- 2、挂载到body上
    - 注意：不能直接$mount('body')，会直接把body覆盖替换掉，所以第一步中先不设置挂载目标，依然可以转换vnode为真实节点$el
    - $mount()会产生一个真实节点$el，可以手动追加到body上


### 代码实现

#### 使用Vue构造函数得到组件实例
```js
// create.js
import Vue from 'vue'

// Component - 组件配置对象
// props - 传递给它的属性
function create(Component, props) {
    // 1.构建Component的实例
    const vm = new Vue({
        render(h) {
            // h是createElement，返回vnode，是虚拟dom
            // 需要挂载才能编程真实dom
            return h(Component, { props })
        }
    }).$mount()
    // 一般 $mount() 需要指定挂载点，比如弹窗组件应挂载到body上，但这里的行为是覆盖的，所以应该之后追加到body上而不是直接挂载覆盖
    // 不设置挂载目标，依然可以转换vnode为真实节点$el

    // 2.挂载到body上
    // $mount()会产生一个真实节点$el，可以手动追加到body上
    document.body.appendChild(vm.$el)

    // 3.获取组件实例
    const comp = vm.$children[0] // 由于new Vue的根实例vm来说，只有一个组件实例

    comp.remove = () => {
        // 移除组件实例，释放内存
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp
}

export default create
```

```js
// 使用
create(Notice, {
    title: '这是弹窗组件呀',
    message: valid ? '校验通过，可以登录' : '校验失败'
}).show()
```

#### 使用Vue.extend得到组件实例
- Vue.extend之后得到构造函数Ctor
- new Ctor之后就可以直接得到组件实例
- 组件实例进行挂载，将虚拟dom转换得到真实节点$el
- 追加到body上
```js
// create.js
import Vue from 'vue'

// Component - 组件配置对象
// props - 传递给它的属性
function create(Component, props) {
    // 构建Component的实例
    const Ctor = Vue.extend(Component)
    // 获得组件实例
    const comp = new Ctor({propsData: props})
    // 必须挂载，得到真实dom$el
    comp.$mount()
    // 追加都body上
    document.body.appendChild(comp.$el)

    comp.remove = () => {
        // 移除组件实例，释放内存
        document.body.removeChild(comp.$el) // 注意，这里不是vm了
        comp.$destroy()
    }

    return comp
}

export default create
```


## 思考

树形组件、递归组件（待续）

学习elementUI的源码，修正input组件中$parent的写法问题（略）
