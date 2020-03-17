# React中的代码复用（Render-Props、HOC）

> 组件通常是针对一类对象来说的，有很多类具有相似的行为，但是他们确实属于不同的类别。如果用面向对象的思维考虑，应该设计公用类或者接口，使用继承类或继承接口来复用功能。

> 继承类的坏处在于大量的继承会导致类之间的关系很复杂，继承接口的坏处在于子类需要实现接口的方法，调用也比较麻烦。

> **“组合优于继承”**，可以考虑使用组合来解决问题。

React中有3种代码复用的方法：Mixin、`HOC`、`Render props`。

React Mixin将通用共享的方法包装成Mixins方法，然后注入各个组件实现，但Mixin已经不被官方推荐使用，所以本文只重点介绍**高阶组件**和**渲染属性**。

::: details Mixin为何被官网废弃
1. Mixin引入了隐式依赖关系。
2. Mixin导致名称冲突。
3. Mixin导致复杂的滚雪球：随着时间和业务的增长， 你对Mixin的修改越来越多， 到最后会变成一个难以维护的Mixin。
4. 拥抱ES6，ES6的class不支持Mixin。
:::

## 高阶组件 (HOC)

- 高阶组件是**重用组件逻辑**的高级方法，其实只是一个装饰器模式，用于增强原有组件的功能。
- 高阶组件其实并不是组件，只是一个函数而已。它接收一个组件作为参数，返回一个新的组件。我们可以在新的组件中做一些功能增加，渲染原有的组件。这样返回的组件增强了功能，但渲染与原有保持一致，没有破坏原有组件的逻辑。

```tsx
function withDraggable(WrappedComponent) {
  return class NewComponent extends React.Component {
    // 增加拖拽相关的功能
    drag = () => {
        console.log('实现拖拽')；
    }

    render() {
      //render 和其他生命周期函数可以干各种逻辑，甚至把原有的组件再包一层
      return <WrappedComponent drag={this.drag} {...this.props} />
    }
  }
}
```

## 渲染属性 (Render props)
渲染属性（Render Props）也是一种在不重复代码的情况下共享组件间功能的方法。Render-Props 最重要的是`它通过一个函数返回一个react元素`，属性名不一定是非叫render，其它命名依然有效。
```tsx
// 子组件依赖于父组件的某些数据时，需要将父组件的数据传到子组件，子组件拿到数据并渲染
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>

// 可以在父组件中做一些通用性的逻辑，并将数据抛给子组件。子组件可以任意渲染成自己想要的样子。比如说我们可以在父组件中做一个倒计时的逻辑，然后把倒计时的时间传给子组件，这样子组件任意渲染成什么样都可以，子组件只自己知道会定时的拿到新的时间而已。
<Clock>
  {
    // 你爱渲染成什么样的显示都可以，但是不需要思考倒计时相关的逻辑了，你爹帮你想好了
    count => <Child count={count} />
  }
</Clock>
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
