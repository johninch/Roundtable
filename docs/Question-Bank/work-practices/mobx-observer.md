---
title: Mobx observer问题总结
---

# 问题描述
``` js
@observable userBankCard = {};
初始化监听一个userbankCard空对象；

@action
updateEmployeeBankCard(obj) {
    this.userBankCard = Object.assign(this.userBankCard, obj);
}

业务功能里对userBankCard属性进行操作之后，但是业务组件 并没有监听到userBankCard属性的变化
```
# mobx Observable对象
通过`Observable` 可以将一个普通对象的所有属性拷贝至一个克隆对象并将克隆对象转变成可观察的 (普通对象是指不是使用构造函数创建出来的对象，而是以 Object 作为其原型，或者根本没有原型。)

> 注意⚠️
[MobX 4 及以下版本] 当通过 observable 传递对象时，只有在把对象转变 observable 时存在的属性才会是可观察的。 稍后添加到对象的属性不会变为可观察的，除非使用 set 或 extendObservable。<br />

官网上面提供的方式并没有奏效，无论是通过set还是extendObservable 增加监听对象里面的属性没有触发组件的重新渲染。也没找到没有生效的原因。。。。。

# 最终解决方式
``` js
@action
updateEmployeeBankCard(obj) {
    this.userBankCard = Object.assign({}, this.userBankCard, obj);
}

通过Object.assign的方式 给监听对象重新分配地址的方式，注意和文章开头部分写法的微小区别
```

# 关于这一块，vue也有相似的问题处理

``` js
由于 JavaScript 的限制，Vue 不能检测以下数组的变动（2种）:
当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
————————解决方式：
// Vue.set
Vue.set(vm.items, indexOfItem, newValue) 即 vm.$set(vm.items, indexOfItem, newValue)
 (vm.$set 实例方法是全局方法 Vue.set 的一个别名)
// 或 Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
当你修改数组的长度时，例如：vm.items.length = newLength
————————解决方式：
vm.items.splice(newLength)
——对象变更检测
注意事项（不能检测对象更新）
由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除
对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。
————————解决方式：
单个属性添加
可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。
即vm.$set(object, propertyName, value)
已有对象赋值多个新属性
应该用两个对象的属性创建一个新的对象，不要像下面这样，应该用后一种方式
```
![](https://raw.githubusercontent.com/dannisi/dannisi.github.io/master/image/vue.jpg)