### 编写自定义指令，实现动态列表加载

> 编写自定义指令，v-loadmore

----
#### 一、vue自定义指令，做滚动加载监听（全局指令）
全局定义自定义组件：
```js
// v-loadmore: 用于在element-ui的select下拉框加上滚动到底事件监听
Vue.directive('loadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
    
      SELECTWRAP_DOM.addEventListener('scroll', function() {

          /*
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值, 常用于计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

          CONDITION && binding.value();
      });
    }
})

```
在组件中：
```js
<template>
    <el-select 
        v-model="selectValue" 
        v-loadmore="toLoadMore">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.accountName"
            :value="item.id">
        </el-option>
    </el-select>
</template>

export default {
    methods: {
        toLoadMore() {
            // 这里可以做你想做的任何事 到底执行
        }
    }
}
```

#### 二、vue自定义指令，做滚动加载监听（局部指令）

在组件中：
```js
<template>
    <el-select 
        v-model="selectValue" 
        v-loadmore="toLoadMore">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.accountName"
            :value="item.id">
        </el-option>
    </el-select>
</template>

export default {
    directives: {
        'loadmore': {
            bind(el, binding) {
            // 获取element-ui定义好的scroll盒子
            const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
            
            SELECTWRAP_DOM.addEventListener('scroll', function() {

                /*
                * scrollHeight 获取元素内容高度(只读)
                * scrollTop 获取或者设置元素的偏移值, 常用于计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                * clientHeight 读取元素的可见高度(只读)
                * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                */
                const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

                CONDITION && binding.value();
            });
            }
        }
    }
    methods: {
        toLoadMore() {
            // 这里可以做你想做的任何事 到底执行
        }
    }
}
```
