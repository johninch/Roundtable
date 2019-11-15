### $attrs

> 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

#### 使用：

孙组件

```javascript
// template
<template>
    <p :style="getColor">我是孙组件</p>
</template>
// script
export default{
    // 如果在不在props中声明color 那么这个数据，请使用this.$arrts.color
    // 如果声明，那么this.$props上就会有color
    props: {
        newColor: String
    },
    computed: {
        getColor() {
            return `color: ${this.newColor || "green"}`;
        }
    }
}
```

子组件
```javascript
// template
<grand-son v-bind="$attrs"></grand-son>

// script
import GrandSon from './GrandSon';

export default {
    ...,
    components: {
        GrandSon
    }
}
<>
```

父组件

```javascript
// template
// style class 不会在$attrs上
<son newColor="red" custom="febcat" style="font-size: 16px;" class="son"></son>

// script
import Son from './Son';

export default {
    ...,
    components: {
        Son
    }
}

// css
.son{
    font-weight: 500;
}
```

查看dom如下

![$attrs](./images/attrs.jpg)

<br/>

#### inheritAttrs禁用特性继承
+ 默认值为true

- 如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false

+ 不会影响 style 和 class 的绑定。


```javascript
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

<br/>
