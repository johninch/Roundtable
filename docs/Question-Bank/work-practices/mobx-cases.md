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
- A：当 observer 需要组合其它装饰器或高阶组件时，请`确保 observer 是最深处(第一个应用)的装饰器`，否则它可能什么都不做。
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

## @observable 监听不到变化

业务功能里对userBankCard属性进行操作之后，但是业务组件 并没有监听到userBankCard属性的变化：
``` js
// 初始化监听一个userbankCard空对象；
@observable userBankCard = {};

@action
updateEmployeeBankCard(obj) {
    this.userBankCard = Object.assign(this.userBankCard, obj);
}
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

关于这一块，vue也有相似的问题处理：传送门[vue中数据劫持的明显缺点（两点）](../MVVM/mvvm-base.html#_4-vue中数据劫持的明显缺点（两点）：)
