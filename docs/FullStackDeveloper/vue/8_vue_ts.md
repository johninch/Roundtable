# 8、vue + ts

## 目标

- 本节目标重点是ts与vue2.x的结合，了解vue2.x使用ts书写时的方式；
- 另外，补充一些ts当中的重点和难点讲解；


## ts版的HelloWorld.vue
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <input type="text" @keyup.enter="addFeature" />
    </p>
    <!-- 列举ts特性 -->
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected: feature.selected}"
      >{{feature.name}}</li>
      <li>特性总数：{{count}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Prop, Vue, Emit } from "vue-property-decorator";
import Axios from 'axios'
// Feature类型
// type Feature = {
//   id: number;
//   name: string;
// };

interface Feature {
  id: number;
  name: string;
}

type Select = {
  selected: boolean;
};

type FeatureSelect = Feature & Select;

interface Result<T> {
  ok: 0 | 1;
  data: T;
}

function getResult<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 1, name: "类型注解", selected: false },
    { id: 2, name: "编译型语言", selected: true },
  ];
  return Promise.resolve({ ok: 1, data });
}

function Component(options: any): any {
  return function(target: any) {
    // 此处省略若干行处理target代码
      // 需要将传入的也就是@Component(options)中的options，与target，
      // 也就是装饰的类或函数中的选项合并
    return Vue.extend(options)
  }
}

// 导出的组件构造函数 Ctor
// Component做了什么？
// 构造一个配置对象 {props:{},data:{},methods:{}}
// return Vue.extend(options)
@Component({
  props: {
    msg: {
      type: String,
      default: ''
    },
  }
})
export default class HelloWorld extends Vue {
  // {type: String, required: true}传递给vue的
  @Prop({type: String, required: true}) msg!: string;

  features: FeatureSelect[] = [];

  // 方法作为methods中的选项
  @Emit()
  addFeature(e: KeyboardEvent) {
    // 获取input元素
    // as: 类型断言，使类型更加具体，不是类型转换
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false,
    };
    this.features.push(feature);

    inp.value = "";
  }

  // 生命周期
  async created() {   
    // Promise<AxiosResponse<T>>
    // const result = await Axios.get<FeatureSelect[]>('/api/list')
    const result = await this.$axios.get<FeatureSelect[]>('/api/list')
    // const result = await getResult<FeatureSelect[]>();
    this.features = result.data;
  }

  // 存取器可以定义计算属性
  get count() {
    return this.features.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.selected {
  background-color: #ddd;
}
</style>
```


## 函数重载
- 以参数数量或类型区分多个同名函数。
- `先声明，再实现`。最后实现时需要同时兼容之前所有的重载。

```js
// 重载1
function watch(cb1: () => void): void;
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    } else {
        console.log('执行watch重载1');
    }
}
```
函数重载，主要应用在**开发库函数时**，使其他开发者在使用时具有良好的代码提示。比如这里的watch，开发者在不知道如何使用时，ts代码提示会将两种watch使用方式提示出来，**使开发者在调用时有迹可循**。


## Type与Interface的区别

如果写一个公共的库，使用Interface比Type更好，因为Interface出现更早，兼容性更好。Type出现版本更新，使用更方便。


## 泛型

泛型(Generics)是指在定义函数、接口或类的时候，不预先指定具体的类型，而`在使用的时候再指定类型的一种特性`。以此增加代码通用性。

例如，通过如下方式，可以使**接口返回的data类型，与调用getResult函数时，传入的泛型一致**：
```js
interface Result<T> {
  ok: 0 | 1;
  data: T;
}

function getResult<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 1, name: "类型注解", selected: false },
    { id: 2, name: "编译型语言", selected: true },
  ];
  return Promise.resolve({ ok: 1, data });
}

@Component
export default class HelloWorld extends Vue {
    // ...
    features: FeatureSelect[] = [];

    // 生命周期
    async created() {
        // Promise<AxiosResponse<T>>
        // const result = await Axios.get<FeatureSelect[]>('/api/list')
        // const result = await this.$axios.get<FeatureSelect[]>('/api/list')
        const result = await getResult<FeatureSelect[]>();
        this.features = result.data;
    }
}
```


## 装饰器

装饰器是`工厂函数`，它能访问和修改装饰目标。

**注意！ts里面使用装饰器，因为不是规范，所以是需要使用babel去转义的**

### 装饰器分类
- 类装饰器
```js
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
    // target是构造函数
    console.log(target === Foo); // true
    target.prototype.log = function() {
        console.log(this.bar);
    }
}

@log
class Foo {
    bar = 'bar'
}

const foo = new Foo();

// @ts-ignore
foo.log();
```
- 类装饰器工厂：返回一个装饰器函数，接收额外参数以对装饰器进行额外的配置。
```js

function log(fn: Function) {
    return function(target: Function) {
        // target是构造函数
        console.log(target === Foo); // true
        target.prototype.log = function() {
            fn('log:' + this.bar);
        }
    }
}

@log(window.alert)
class Foo {
    bar = 'bar'
}

const foo = new Foo();

// @ts-ignore
foo.log();
```

- 方法装饰器
```js
function rec(target: any, name: string, descriptor: any) {
    // 这里通过修改descriptor.value扩展了bar方法
    const baz = descriptor.value;
    descriptor.value = function(val: string) {
        console.log('run method', name);
        baz.call(this, val);
    }
}

class Foo {
    @rec
    setBar(val: string) {
        this.bar = val
    }
}

const foo = new Foo();

foo.setBar('haha')
```

- 属性装饰器
```js
// 属性装饰器
function mua(target, name) {
    target[name] = 'mua~~~'
}

class Foo {
  @mua ns!:string;
}

console.log(foo.ns);
```

- 属性装饰器工厂
```js
function mua(param: string) {
    return function(target, name) {
        target[name] = param
    }
}
```

### 常用的Vue2装饰器

- 属性声明:@Prop
```js
export default class HelloWorld extends Vue {
    // Props()参数是为vue提供属性选项
    // !称为明确赋值断言，它是提供给ts的
    @Prop({type: String, required: true})
    private msg!: string;
}
```

- 事件处理:@Emit
```js
// 通知父类新增事件，若未指定事件名则函数名作为事件名(羊肉串形式)
@Emit()
private addFeature(event: any) {// 若没有返回值形参将作为事件参数
    const feature = { name: event.target.value, id: this.features.length + 1 };
    this.features.push(feature);
    event.target.value = "";
    return feature;// 若有返回值则返回值作为事件参数
}
```

- 变更监测:@Watch
```js
@Watch('msg')
onMsgChange(val:string, oldVal:any){
    console.log(val, oldVal);
}
```

- 状态管理推荐使用:`vuex-module-decorators`

vuex-module-decorators 通过装饰器提供模块化声明vuex模块的方法，可以有效利用ts的类型系统。
```bash
npm i vuex-module-decorators -D
```

修改store/index.ts
```js
export default new Vuex.Store({})
```
定义counter模块，创建store/counter.ts
```js
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from './index'

// 动态注册模块
@Module({ dynamic: true, store: store, name: 'counter', namespaced: true })
class CounterModule extends VuexModule {
    count = 1

    @Mutation
    add() {
        // 通过this直接访问count
        this.count++
    }

    // 定义getters
    get doubleCount() {
        return this.count * 2;
    }

    @Action
    asyncAdd() {
        setTimeout(() => {
            // 通过this直接访问add
            this.add()
        }, 1000);
    }
}

// 导出模块应该是getModule的结果
export default getModule(CounterModule)
```

### 在vue2中的实例：
```js
function Component(options: any): any {
  return function(target: any) {
    // 此处省略若干行处理target代码
      // 需要将传入的也就是@Component(options)中的options，与target，
      // 也就是装饰的类或函数中的选项合并
    return Vue.extend(options)
  }
}

// 导出的组件构造函数 Ctor
// Component做了什么？
// 构造一个配置对象 {props:{},data:{},methods:{}}
// return Vue.extend(options)
@Component({
  props: {
    msg: {
      type: String,
      default: ''
    },
  }
})
export default class HelloWorld extends Vue {
    // target的options ...
    // ...
}
```


