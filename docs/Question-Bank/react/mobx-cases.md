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
