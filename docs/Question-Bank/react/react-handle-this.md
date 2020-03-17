---
title: react类组件中处理this绑定的4种方法
tags: [类组件, this指向问题, 箭头函数, bind]
categories: react
---

# react类组件中处理this绑定的4种方法

## 一、为什么需要处理react类组件的this绑定问题

在 React 类组件中，由于`将事件处理函数`引用`作为回调传递`后，事件处理程序方法**会丢失其隐式绑定的上下文**，导致 this 值会回退到默认绑定，变成 undefined。示例如下：
```html
<button type="button" onClick={this.handleClick}>
    Click Me
</button>
```
有人可能会问：既然是依据“默认绑定规则”，不应该指向全局对象window或global吗？

这是因为，类声明和类表达式的主体（构造函数、静态方法和原型方法）以 `严格模式` 执行。在严格模式下，默认绑定this会指向undefined。

## 二、处理this绑定的4种方法

*忽略被废弃React.createClass的情形。只讨论使用React.Component创建的类组件this绑定：*

### 1. **render方法中使用bind**

在事件函数后使用.bind(this)将this绑定到当前组件中。
```js
class App extends React.Component {
    handleClick() {
        console.log('this > ', this);
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>test</div>
        )
    }
}
```
这种方法很简单，可能是大多数初学开发者在遇到问题后采用的一种方式。然后`由于组件每次执行render将会重新分配函数`这将会`影响性能`。特别是在你做了一些性能优化之后，它会破坏PureComponent性能。*不推荐使用*。

### 2. **render方法中使用箭头函数**

这种方法使用了ES6的上下文绑定来让this指向当前组件，但是它同第1种存在着相同的性能问题，不推荐使用。
```js
class App extends React.Component {
    handleClick() {
        console.log('this > ', this);
    }
    render() {
        return (
        <div onClick={e => this.handleClick(e)}>test</div>
        )
    }
}
```

### 3. **构造函数中bind**

为了避免在render中绑定this引发可能的性能问题，可以在constructor中预先进行绑定。

但这种方式有较多的重复代码，比较繁琐。
```js
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('this > ', this);
    }
    render() {
        return (
        <div onClick={this.handleClick}>test</div>
        )
    }
}
```

### 4. **在定义阶段使用箭头函数绑定（`最佳实践`）**

推荐 ECMA stage-2 所提供的箭头函数绑定。要使用这个功能，需要在.babelrc中开启stage-2功能，绑定方法如下：
```js
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick = () => {
        console.log('this > ', this);
    }
    render() {
        return (
        <div onClick={this.handleClick}>test</div>
        )
    }
}
```
如果你使用ES6和React 16以上的版本，**最佳实践**是使用这种方法来绑定this。

**优势**：
- 它避免了第1种、第2种方法可能潜在的性能问题。
- 它避免了第3种绑定时的繁琐重复代码。
- 箭头函数会自动绑定到当前组件的作用域中，不会被call改变。


参考链接：[React.js绑定this的5种方法](https://juejin.im/post/5b13c3a16fb9a01e75462a64)
