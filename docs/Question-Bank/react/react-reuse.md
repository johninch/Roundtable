# React中的代码复用（Render-Props、HOC）

> 组件通常是针对一类对象来说的，有很多类具有相似的行为，但是他们确实属于不同的类别。如果用面向对象的思维考虑，应该设计公用类或者接口，使用继承类或继承接口来复用功能。

> 继承类的坏处在于大量的继承会导致类之间的关系很复杂，继承接口的坏处在于子类需要实现接口的方法，调用也比较麻烦。

> **“组合优于继承”**，可以考虑使用组合来解决问题。

React中有3种代码复用的方法：Mixin、`HOC`、`Render props`。

React Mixin将通用共享的方法包装成Mixins方法，然后注入各个组件实现，但Mixin已经不被官方推荐使用，所以本文只重点介绍**高阶组件**和**渲染属性**。

::: details Mixin为何被官方废弃
1. Mixin引入了隐式依赖关系。
2. Mixin导致名称冲突。
3. Mixin导致复杂的滚雪球：随着时间和业务的增长， 你对Mixin的修改越来越多， 到最后会变成一个难以维护的Mixin。
4. 拥抱ES6，ES6的class不支持Mixin。
:::

## 高阶组件 (HOC)

- 高阶组件是**重用组件逻辑**的高级方法，其实只是一个装饰器模式，用于增强原有组件的功能。
- 高阶组件其实并不是组件，它只是一个函数接收一个组件作为参数，经过增加一系列新功能后，返回一个新的组件。这样返回的组件增强了功能，但渲染与原有保持一致，没有破坏原有组件的逻辑。

```tsx
const withUser = WrappedComponent => {
  const user = sessionStorage.getItem("user");
  return props => <WrappedComponent user={user} {...props} />;
};

const UserPage = props => (
  <div class="user-container">
    <p>My name is {props.user}!</p>
  </div>
);

export default withUser(UserPage);
```

## 渲染属性 (Render props)
渲染属性（Render Props）也是一种在不重复代码的情况下共享组件间功能的方法。Render-Props 最重要的是`使用一个值为函数的prop来传递需要动态渲染的nodes或组件`，属性名不一定是非叫render，其它命名依然有效。
```tsx
// 子组件依赖于父组件的某些数据时，需要将父组件的数据传到子组件，子组件拿到数据并渲染
<DataProvider render={data => (
  <Cat target={data.target} />
)}/>

// Render Props，不是说非用一个叫render的props不可
// 习惯上可能常写成下面这种
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>
```

类（对于一类事物的抽象），接口（对于一类行为的抽象）。JS 里面没有接口，所以用高阶组件和 render props 都可以达到对同一类行为的抽象。所有的手段最终都是为了提高代码的可维护性，减少使用成本。

## Render props VS HOC
总的来说，render props其实和高阶组件类似，可相互替代，就是在`pure component`上增加state，响应react的生命周期。
### 对于HOC模式
- 优点如下：
    - 支持ES6；
    - 复用性强，HOC为纯函数且返回值为组件，可以多层嵌套；
    - `支持传入多个参数`，增强了适用范围；
- 缺点如下：
    - 当多个HOC一起使用时，`无法直接判断`子组件的props是哪个HOC负责传递的；
    - 多个组件嵌套，容易产生同样名称的props；
    - HOC可能会产生许多无用的组件，加深了组件的层级；
    - `静态构建`，需要提前构建好要使用的高阶组件。

### Render Props模式的出现主要是为了解决HOC的问题
优点如下所示：
- 支持ES6；
- 不用担心props命名问题，在render函数中只取需要的state；
- 不会产生无用的组件加深层级；
- render props是`动态构建`的，所有的改变都在render中触发，可以更好的利用组件内的生命周期。


#### 参考链接

[风满楼:React高阶组件和render props的适用场景有区别吗，还是更多的是个人偏好?](https://www.zhihu.com/question/269915942/answer/351688035)

[React-代码复用(mixin.hoc.render props)](https://segmentfault.com/a/1190000018612397)

[React组件Render Props VS HOC 设计模式](https://www.jianshu.com/p/ff6b3008820a)
