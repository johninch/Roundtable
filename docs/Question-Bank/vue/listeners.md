
### [$listeners](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

> 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

**场景：当封装第三方组件时**

***不使用$listeners***
+ 调用第三方组件提供的方法需要逐层添加事件绑定，来调用$emit
- 实现双向绑定时，只能通过绑定计算属性，通过计算属性的***set***来主动触发this.$emit

<br/>

如下有一组例子：第三方组件**v-input**，提供一个setColor方法改变按钮的字体颜色，供父组件调用，

然后我们对其进行二次封装的**v-transfrom-input**，再供给页面中使用

**第三方组件**：
```javascript
Vue.component("v-input", {
    props: {
        value: String
    },
    data() {
        return {
            color: 'color: red'
        }
    },
    methods: {
        setColor() {
            this.color = 'color: green';
            this.$emit('otherMethod', 'green');
        }
    },
    // 如下是v-model=“value”语法糖的拆解
    template: `
        <div>
            <input
                :style="color"
                type="text"
                :bind="value"
                v-on:input="$emit('input', $event.target.value)"
            >
            <button @click="setColor">触发第三方组件方法</button>
        </div>
    `
});
```

<br/>

**封装第三方组件：**

想实现双向绑定值传递，需要写一个计算属性, 通过set来主动触发来自上层父组件v-model指令所默认的input方法。

这么做是因为当前组件为**非表单控件**，并没有用户输入事件来主动触发，所以要添加逻辑来主动进行触发。
```javascript
Vue.component("v-transform-input", {
    props: {
        value: String
    },
    computed: {
        thisValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value); // 主动触发上层父子间更改数据
            }
        }
    },
    methods: {
        otherMethod(color) {
            // 通过传统的$emit父子组件方法来调用
            this.$emit('otherMethod', color);
        }
    }
    template: `
        <v-input v-model="thisValue" @otherMethod="otherMethod">
        </v-input>
    `
});
```

<br/>

**使用封装好的组件**
```javascript
// template
<v-transform-inpu v-model="value" @otherMethod="otherMethod"></v-transform-inpu>
// javascript
data() {
    return {
        value: ''
    }
},
methods: {
    otherMethod(color) {
        console.log('第三方组件触发', color);
    }
}
```

<br/>

***使用$listeners***

+ **双向绑定**

    因为$listeners将父组件上除了.native的方法都绑定到了当前组件中，所以第三方组件v-input中触发

    this.$emit('input')就能在v-transform中找到$listeners绑定来的input方法，这个input方法其实就是

    最顶层v-model指令语法糖的默认input方法，更新的也是最顶层的那个value

- **调用第三方组件方法**

  setColr中调用this.$emit('otherMethod'), 也能找到$listeners绑定来的相应的otherMethod方法

**封装第三方组件**
```javascript
Vue.component("v-transform-input", {
    props: {
        value: String
    },
    data() {
        return() {
            thisValue: ''
        }
    }.
    computed: {
        thisValue: {
            get() {
                return this.value;
            }
        }
    },
    template: `
        <model v-model="thisValue" v-bind="$listeners">
        </model>
    `
});
```
