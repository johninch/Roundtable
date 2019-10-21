### Element、Component、Node、Instance

> 谈谈React中Element、Component、Node、Instance 四个概念的理解以及它们之间的联系、异同点等

----

> Element(元素)

- React元素 是简单Js对象，描述页面上一部分DOM的结构及渲染效果（描述的是React虚拟dom的结构），通常情况我们都不会直接使用 React元素。
- React元素是React应用的最基础组成单位：React组件的复用，本质上是为了复用这个组件返回的React元素。

React元素 分两类：
- DOM类型的元素：DOM类型的元素使用像h1、div、p等DOM节点标签 创建 React元素
- 组件类型的元素：组件类型的元素使用 React组件 创建 React元素:
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

<details>
<summary>构建 React元素 的方法：使用 JSX 语法、React.createElement()、React.cloneElement()</summary>

1. JSX语法

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

2. React.createElement()
JSX 语法就是用React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。

```js
React.createElement(
    type,
    [props],
    [...children]
)
```

3. React.cloneElement()

React.cloneElement()与React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会合并入原有的属性，传入到返回的新元素中，而旧的子元素将被替换。
```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```

</details>

> Component(组件)

React组件(Component)最核心的作用是：调用```React.createElement()```返回 React元素。

Component 分3类（如果DOM节点也被算作一种组件的话）：
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

注意：```不过这里还有一个问题，function 和 class 的 typeof 都是 function，这两个是怎么判断的呢？因为 class 定义的组件，继承于 React.Component，它拥有一个特定属性（？？？名称首字母是大写的？？），只需要检测是否拥有这个属性就能确定是 class 还是 function。```

注意：```使用 class定义的组件，render方法是唯一必需的方法，其他组件的生命周期方法都只不过是为render服务而已，都不是必需的。```

React的渲染过程：例如Home组件使用了Welcome组件，返回的 React元素 如下：

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

React 知道如何渲染type = 'div' 和 type = 'p' 的节点，但不知道如何渲染type='Welcome'的节点，当React 发现Welcome 是一个React 组件时（判断依据是Welcome首字母为大写），会根据Welcome组件返回的React 元素决定如何渲染Welcome节点。如果返回的结构中还包含其他组件节点，React 会递归重复上面的过程，继续解析对应组件返回的React 元素，直到返回的React 元素中只包含DOM节点为止。

<details>
<summary>构建 React组件 的方法：React.createClass()、ES6 class和 无状态函数</summary>

 1. React.createClass()是三种方式中最早，兼容性最好的方法，但已被官方放弃；

 2. ES6 class是目前官方推荐的使用方式，但它的实现仍是调用React.createClass()来实现。

 3. 无状态函数是使用函数构建的无状态组件，无状态组件传入props和context两个参数，它没有state，除了render()，没有其它生命周期方法。

注：React.createClass()和ES6 class构建的组件的数据结构是类，无状态组件数据结构是函数，它们在 React 被视为是一样的。

</details>

> Instance(实例)

React组件的实例：
 - 只有组件实例化后，每一个组件实例才有了自己的props和state，才持有对它的DOM节点和子组件实例的引用。
 - 在传统的面向对象的开发方式中，实例化的工作是由开发者自己手动完成的，但在React中，```组件的实例化工作是由React自动完成的```，组件实例也是直接由React管理的。换句话说，开发者完全不必关心组件实例的创建、更新和销毁。

> Node(节点)

```js
MyComponent.propTypes = { 
  optionalNode: PropTypes.node,
}
```

在使用PropTypes校验组件属性时，有一种PropTypes.node类型：这表明optionalNode是一个React 节点。React 节点是指可以被React渲染的数据类型，包括数字、字符串、React 元素，或者是一个包含这些类型数据的数组。
