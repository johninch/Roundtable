### 自定义组件实现v-model的双向绑定

> 编写自定义组件实现 v-model 的双向绑定

----
#### 一、v-model是prop与event的语法糖

v-model 双向绑定实际上就是（以input标签为例）：
- 通过子组件中的 $emit 方法派发 input 事件，父组件监听 input 事件中传递的 value 值，并存储在父组件 data 中；
- 然后父组件再通过 prop 的形式传递给子组件 value 值，在子组件中绑定 input 的 value 属性即可。
```js
// 父组件
<my-input :value="value" @input="value = $event" />

// 子组件
Vue.component('my-input', {
  props: {
    value: String
  },
  template: `
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  `
})

```

#### 二、在非input元素上实现v-model双向绑定
一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。
> 因此，比如 checkbox，我们就需要监听 **change** 事件，以及 **checked** 属性。

#### 三、直接使用 v-model 指令，实现自定义组件双向绑定

对于非input元素，需要配置 **model** 选项，在组件中修改 v-model 指令，指定 prop 和 event：

```js
export default {
  name: 'MyComp',
  props: ['checked'],
  model: {
    prop: 'checked',
    event: 'change'
  }
}
```

以下为两种具体实现（以checkbox为例）：

1. 在子组件编写template时，将 v-model 拆开
    ```js
    <my-checkbox v-model="lovingVue"></my-checkbox>

    Vue.component('my-checkbox', {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Boolean // 使用model配置后，依然需要props声明
        },
        template: `
            <input
                type="checkbox"
                :checked="checked"
                @change="$emit('change', $event.target.checked)"
            >
        `
    })
    ```

2. 在子组件编写template时直接使用v-model，通过计算属性双向绑定
    ```js
    <my-checkbox v-model="lovingVue"></my-checkbox>

    Vue.component('my-checkbox', {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Boolean // 使用model配置后，依然需要props声明
        },
        computed: {
            newLovingVue: {
                get() {
                    return this.checked
                },
                set(checked) {
                    return this.$emit('change', checked)
                }
            }
        },
        template: `<input type="checkbox" v-model="newLovingVue">`
    })
    ```

