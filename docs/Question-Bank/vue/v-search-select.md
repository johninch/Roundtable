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
    @change="val =>$emit('change', val)">
    <el-option
      v-for="item in displayedList"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]">
    </el-option>
    <span v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"></span>
  </el-select>
</template>

<script>
export default {
  name: 'SearchSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      validator(value) {
        return Array.isArray(value) || typeof value === 'string' || typeof value === 'number'
      }
    },
    dataSource: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      required: true
    },
    valueKey: {
      type: String,
      required: true
    },
    chunkSize: {
      type: Number,
      default: 100
    },
    // 自定义搜索
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
    }
  },
  methods: {
    /** 搜索框搜索逻辑 */
    async remoteMethod(query) {
      if (query !== '') {
        if (this.customSearch) {
          this.loading = true
          this.matchedList = await this.customSearch(query)
          this.loading = false
        } else {
          this.matchedList = this.dataSource.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }

        this.range[0] = 0
        this.range[1] = this.chunkSize
        this.displayedList = this.matchedList.slice(...this.range)
      } else {
        this.matchedList = []
      }
    },
    /** 滚动加载更多 */
    loadMore() {
      if (this.range[0] > this.matchedList.length) {
        console.log('no more item found')
        return
      }

      this.range[0] += this.chunkSize
      this.range[1] += this.chunkSize
      this.displayedList.push(...this.matchedList.slice(...this.range))
    }
  }
}
</script>
```

### 使用方法

#### 简单使用

```html
<v-search-Select
    size="small"
    placeholder="请输入参与人姓名"
    v-model="formModel.employee_ids"
    label-key="name"
    value-key="id"
    :data-source="empList"
/>
```

#### 远程加载

```html
<template>
    <v-search-Select
        size="small"
        placeholder="请输入参与人姓名"
        v-model="formModel.employee_ids"
        label-key="name"
        value-key="id"
        :custom-search="load"
    />
</template>
<script>
export default {
    data() {
        return {
            pageNo: 1,
            formModel: {}
        }
    },
    method: {
        load(query) {
            return http.get('/employees', {
                query
            }).then(res => {
                this.pageNo++

                return res.data.list
            })
        }
    }
}
</script>
```
