# Element、Component、Node、Instance如何区分？

> 谈谈React中Element、Component、Node、Instance 四个概念的理解以及它们之间的联系、异同点等

----

## 一、Element(元素)

### 定义
- React元素 是简单JS对象，描述的是React虚拟dom（结构及渲染效果）。
- React元素是React应用的最基础组成单位。通常情况我们都不会直接使用 React元素。React组件的复用，本质上是为了复用这个组件返回的React元素。

### React如何判断一个值是Element（isValidElement）？
通过判断一个对象是否是合法的react元素，即判断虚拟DOM的`$$typeof`属性是否为`REACT_ELEMENT_TYPE`:
```js {5}
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
  );
} 
```
### React元素 分两类
- DOM类型的元素：DOM类型的元素使用像h1、div、p等DOM节点标签 创建 React元素；
- 组件类型的元素：组件类型的元素使用 React组件 创建 React元素；
```js
    const buttonElement = <Button color='red'>OK</Button>;

    const buttonElement = {
        type: 'Button',
        props: {
            color: 'red',
            children: 'OK'
        }
    }
```



### React如何判断一个Element是来自原生节点还是自定义组件？

原生DOM节点的Element其**type属性**是`原生DOM标签字符串`；而自定义组件的Element其**type属性**为`首字母大写的字符串`。

#### React的渲染过程

例如Home组件使用了Welcome组件，返回的 React元素 如下：
```js
{
    type: 'div',
    props: {
        children: [
        {
            type: 'Welcome',
            props: {
            name: '老干部'
            }
        },
        {
            type: 'p',
            props: {
              children: 'Anything you like'
            }
        }，
        ]
    }
}
```
- React 对于 type = 'div' 和 type = 'p' 等这类原生节点，会直接将虚拟DOM渲染为真实节点；
- 但React 面对 type='Welcome' 这类自定义组件节点时，并不知道如何渲染。当React 发现Welcome 是一个自定义组件时，**会调用该组件的render方法，生成该组件的Element**，如果该组件的element中依然有首字母大写开头的Element的type，继续重复上述步骤，直到发现没有首字母大写的type，即原生DOM节点Element为止。

::: tip 自定义组件首字母必须大写的原因
通过React组件的渲染过程可得：所有的React自定义组件必须首字母大写，原因是生成React Element的时候，type属性会直接使用该组件的实例名称（\<InstanceName />），如果没有大写，React将不能判断是否需要继续调用该组件的render方法创建Element，阻断React元素的渲染。
:::

### 构建 React元素 的方法（3种）
::: details 构建 React元素 的方法：使用 JSX 语法、React.createElement()、React.cloneElement()

1. **JSX语法**

```js
const element = <h1 className='greeting'>Hello, world</h1>;
```

编译后：

```js
const element = React.createElement('h1', {className: 'greeting'}, 'Hello, world!');
```

最终返回的 React元素element为：

```js
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
}
```

2. **React.createElement()**

JSX 语法就是用React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。

```js
React.createElement(
    type,
    [props],
    [...children]
)
```

3. **React.cloneElement()**

React.cloneElement()与React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会合并入原有的属性，传入到返回的新元素中，而旧的子元素将被替换。
```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```
:::

## 二、Component(组件)

React组件(Component)最核心的作用是：调用```React.createElement()```返回 React元素。

### React组件 分3类（函数组件与类组件）
*如果DOM节点也被算作一种组件的话*：

- host类型（DOM节点）：React 会根据对应 type，生成真正的 DOM node，并将它所带的 props 写入 node 的 attribute 中，而对 children 继续递归，直到碰到没有 children 的 host Element 为止；
- function类型：function的返回值是element；
  ```js
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```
- class类型：class的render函数的返回值是element；
  ```js
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

注意：```使用 class定义的组件，render方法是唯一必需的方法，其他组件的生命周期方法都只不过是为render服务而已，都不是必需的。```

### React 如何调用class和function 组件

React调用组件的目的都是返回React元素，对于class和function类型的组件，React内部的调用方式是不同的：

1. 如果是一个函数，React只需要`直接调用`它:
```js
// function 类型:
function Greeting() {
  return <p>Hello</p>;
}

// React内 直接调用function类型的组件：
const result = Greeting(props); // <p>Hello</p>
```

2. 如果是一个类，React就需要使用`new来实例化`它，`然后在实例上调用render`方法：
```js
// class 类型:
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// React内 需要使用new来实例化它，然后在实例上调用render方法:
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

### React 如何区分class和function 组件

不过这里还有一个问题，function 和 class 的 typeof 都是 function，这两个是怎么判断的呢？

因为 class 定义的组件，继承于 React.Component，`React.Component.prototype`上拥有一个特殊的标志属性 `isReactComponent` ，只需要检测是否拥有这个属性就能确定是 class 还是 function。
```js
// Inside React
class Component {}
Component.prototype.isReactComponent = {};

// We can check it like this
class Greeting extends Component {}
console.log(Greeting.prototype.isReactComponent); // ✅ Yes
```

### 构建 React组件 的方法（3种：包括有状态与无状态组件）
::: details 构建 React组件 的方法：React.createClass()、ES6 class和 无状态函数

1. ES5的React.createClass()

是三种方式中最早，兼容性最好的方法，但已被官方放弃；

2. **ES6 class有状态组件**
```ts
class App extends React.Component { render() {} }
```
ES6 class是目前官方推荐的使用方式，但它的实现仍是调用React.createClass()来实现。

3. **无状态函数组件**

无状态函数是使用函数构建的无状态组件，无状态组件传入props和context两个参数，它没有state，除了render()，没有其它生命周期方法。

注：React.createClass()和ES6 class构建的组件的数据结构是类，无状态组件数据结构是函数，它们在 React 被视为是一样的。
:::

### 从写法上区分 元素与组件
::: tip 区分
\<A /> 整个表达式是一个 Element，而 A 是一个 Component， Component 要么是 function（class 也是 function），要么是纯 DOM。
:::

## 三、Node(节点)

```ts
MyComponent.propTypes = { 
  optionalNode: PropTypes.node,
}
```

在使用PropTypes校验组件属性时，有一种PropTypes.node类型：这表明optionalNode是一个React 节点。

React 节点是指**可以被React渲染的数据类型，包括`数字、字符串、React 元素，或者是一个包含这些类型数据的数组`。**

## 四、Instance(实例)

React组件的实例：
 - 只有组件实例化后，每一个组件实例才有了自己的props和state，才持有对它的DOM节点和子组件实例的引用。
 - 在传统的面向对象的开发方式中，实例化的工作是由开发者自己手动完成的，但在React中，`组件的实例化工作是由React自动完成的，组件实例也是直接由React管理的`。换句话说，**开发者完全不必关心组件实例的创建、更新和销毁**。



#### 参考链接

[](https://www.jianshu.com/p/11c331242552)
