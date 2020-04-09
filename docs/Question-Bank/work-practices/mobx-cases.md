---
{
  "title": "Mobx 使用踩坑记录",
}
---

# Mobx 使用踩坑记录

::: tip
本文主要记录 Mobx 使用过程中所趟过的坑...
:::

## Mobx 数据更新，组件不渲染问题

::: warning
- Q：为啥store里@observable 标识的变量改变了，就是不走render?
- A：当 observer 需要组合其它装饰器或高阶组件时，请确保 observer 是最深处(第一个应用)的装饰器，否则它可能什么都不做。
:::

装饰器语法是比export时用高阶组件的写法离组件近的，因此如下这种写法会导致render不执行：
```js
@withToast
class AccountSet extends Component<RouteComponentProps> {
    // ...
}

export default observer(AccountSet);
```
正确方式是：
```js{1,2}
@withToast
@observer
class AccountSet extends Component<RouteComponentProps> {
    // ...
}

export default AccountSet;
```
或者（更好的做法）
```js{5}
class AccountSet extends Component<RouteComponentProps> {
    // ...
}

export default withToast(observer(AccountSet));
```

## Mobx observer问题描述
``` js
@observable userBankCard = {};
初始化监听一个userbankCard空对象；

@action
updateEmployeeBankCard(obj) {
    this.userBankCard = Object.assign(this.userBankCard, obj);
}

业务功能里对userBankCard属性进行操作之后，但是业务组件 并没有监听到userBankCard属性的变化
```
### mobx Observable对象
通过`Observable` 可以将一个普通对象的所有属性拷贝至一个克隆对象并将克隆对象转变成可观察的 (普通对象是指不是使用构造函数创建出来的对象，而是以 Object 作为其原型，或者根本没有原型。)

> 注意⚠️
[MobX 4 及以下版本] 当通过 observable 传递对象时，只有在把对象转变 observable 时存在的属性才会是可观察的。 稍后添加到对象的属性不会变为可观察的，除非使用 set 或 extendObservable。<br />

官网上面提供的方式并没有奏效，无论是通过set还是extendObservable 增加监听对象里面的属性没有触发组件的重新渲染。也没找到没有生效的原因。。。。。

### 最终解决方式
``` js
@action
updateEmployeeBankCard(obj) {
    this.userBankCard = Object.assign({}, this.userBankCard, obj);
}
```
通过Object.assign，给监听对象**重新分配一个新对象**（`新的栈内存地址会促使重新执行监听初始化`）方式，注意和文章开头部分写法的微小区别。

### 关于这一块，vue也有相似的问题处理

1. 由于 性能的考量，Vue **不能检测以下两种`数组`的变动**:
    - 利用索引直接设置一个数组项时，例如：`vm.items[index] = newValue`，解决方式：
    ```js
    // Vue.set
    Vue.set(vm.items, index, newValue)
    // 等价于 (vm.$set 实例方法是全局方法 Vue.set 的一个别名)
    vm.$set(vm.items, index, newValue)
    
    // 或 Array.prototype.splice
    vm.items.splice(index, 1, newValue)
    ```
    - 修改数组的长度时，例如：`vm.items.length = newLength`，解决方式：`vm.items.splice(newLength)`
2. 由于 JS 的限制，Vue **不能检测`对象属性`的添加或删除**，对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性：
- 解决方式：
    - 单个属性添加：
    ```js
    // 可以使用 方法向嵌套对象添加响应式属性。
    Vue.set(obj, propertyName, value)
    vm.$set(obj, propertyName, value)
    ```
    - 赋值多个新属性：应该`用两个对象的属性创建一个新的对象`，新的内存地址会促使重新添加监听。
    ```js
    // 不要像下面这样：
    vm.profile = Object.assign(vm.profile, { age: 27 });

    // 正确的做法：使用合并对象创建一个新对象，新的内存地址会促使重新添加监听
    vm.profile = Object.assign({}, vm.profile, { age: 27 });
    ```
    - 单个属性删除：
    ```js
    Vue.delete(obj, key)
    vm.$delete(obj, key)
    ```

参考链接：[记一次思否问答的问题思考：Vue为什么不能检测数组变动](https://segmentfault.com/a/1190000015783546)

