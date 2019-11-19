# 实现可搜索可分片加载的select组件
## 封装```Element UI Select```组件和```v-infinite-scroll```指令

源码如下：

```html
<template>
  <el-select
    filterable
    remote
    clearable
    reserve-keyword
    :value="value"
    :remote-method="remoteMethod"
    :loading="loading"
    v-bind="$attrs"
    @change="val =>$emit('change', val)"
  >
    <slot v-bind:list="displayedList">
      <el-option
        v-for="item in displayedList"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
      >
        <slot name="option" v-bind:item="item"/>
      </el-option>
    </slot>
    <span
      v-if="displayedList.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-delay="300"
      :infinite-scroll-immediate="false"
    ></span>
  </el-select>
</template>

<script>
export default {
  name: "SearchSelect",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      validator(value) {
        return (
          Array.isArray(value) ||
          typeof value === "string" ||
          typeof value === "number"
        );
      }
    },
    dataSource: {
      type: Array
    },
    labelKey: {
      type: String
    },
    valueKey: {
      type: String
    },
    chunkSize: {
      type: Number,
      default: 100
    },
    customSearch: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      loading: false,
      range: [-this.chunkSize, 0],
      matchedList: [],
      displayedList: []
    };
  },
  methods: {
    /** 搜索框搜索逻辑 */
    async remoteMethod(query) {
      if (query !== "") {
        if (this.customSearch) {
          console.log("远程搜索中...");
          this.loading = true;
          this.matchedList = await this.customSearch(query);
          this.loading = false;
        } else {
          console.log("本地搜索");
          this.matchedList = this.dataSource.filter(item => {
            return (
              item[this.labelKey].toLowerCase().indexOf(query.toLowerCase()) >
              -1
            );
          });
        }

        this.range[0] = 0;
        this.range[1] = this.chunkSize;
        this.displayedList = this.matchedList.slice(...this.range);
      } else {
        this.matchedList = [];
      }
    },
    /** 滚动加载更多参与人 */
    loadMore() {
      if (this.range[0] > this.matchedList.length) {
        console.log("no more item found");
        return;
      }

      this.range[0] += this.chunkSize;
      this.range[1] += this.chunkSize;
      this.displayedList.push(...this.matchedList.slice(...this.range));
    }
  }
};
</script>
```

### 使用方法

<iframe
  src="https://codesandbox.io/embed/vue-template-b3n9o?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Vue Template"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
