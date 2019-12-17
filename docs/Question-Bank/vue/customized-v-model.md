# 自定义组件实现v-model的双向绑定

> 编写自定义组件实现 v-model 的双向绑定

----
## 一、v-model是prop与event的语法糖

v-model 双向绑定实际上就是（以input标签为例）：
- 通过子组件中的 $emit 方法派发 input 事件，父组件监听 input 事件中传递的 value 值，并存储在父组件 data 中；
- 然后父组件再通过 prop 的形式传递给子组件 value 值，在子组件中绑定 input 的 value 属性即可。
```js
// 父组件
<my-input :value="value" @input="value = innerValue" />

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

## 二、在非input元素上实现v-model双向绑定
一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。

::: tip
```<input type=”text” >、<textarea>``` 使用 **value** 属性 和 **input** 事件;
```<input type=”checkbox”>、<input type=”radio”>``` 使用 **checked** 属性 和 **change** 事件;
```<select>``` 使用 **value** 和 **change** 事件
:::

## 三、直接使用 v-model 指令，实现自定义组件双向绑定

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

## 四、特殊场景：当 v-model 遇上 $listeners

```$listeners``` 的要点总结详见下一篇： [$listeners & $attrs](./listeners-and-attrs.md)
[官网传送门：将原生事件绑定到组件](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

- 官方文档上说，当我们想要在一个组件根元素上监听`原生事件`时，可以使用 v-on 的.native修饰符。但是这只在根元素就是原生事件触发对象时有用，当组件中根元素是一层wrapper标签，实际要监听的原生事件触发者被包裹起来时，就需要用到`$listeners`。

- 一个 `$listeners` 属性，它是一个对象，里面包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件。有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。

- 对于 `配合 v-model 工作`的组件来说，为这些监听器创建一个类似下述 customListeners 的计算属性通常是非常有用的：
    ```js
    Vue.component('my-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed: {
        customListeners: function () {
        var vm = this
        // `Object.assign` 将所有的对象合并为一个新对象
        return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners,
            // 然后我们添加自定义监听器，
            // 或覆写一些监听器的行为
            {
            // 这里确保组件配合 `v-model` 的工作
            input: function (event) {
                vm.$emit('input', event.target.value)
            }
            }
        )
        }
    },
    template: `
        <label>
            {{ label }}
            <input
                v-bind="$attrs"
                v-bind:value="value"
                v-on="customListeners"
            >
        </label>
    `
    })
    ```
**注意：**
- 这里之所以要覆盖input的事件监听器，是因为input标签触发返回的是一个event，而不是直接返回对应改变的值，这样处理后就可以使组件的v-model中的@input部分正常获取到内部emit的innerValue值（v-model中@input="value = innerValue"）。
- 如果不处理，会直接将外层v-model中的@input="value = innerValue"指向内部的input标签，但input标签上无法直接拿到这个innerValue。
