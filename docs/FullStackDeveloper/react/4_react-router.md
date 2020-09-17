# 4、React Router

## 简介及基本使用

react-router包含3个库，react-router、react-router-dom和react-router-native。react-router提供最基本的路由功能，实际使用的时候我们不会直接安装react-router，而是根据应用运行的环境选择安装 react-router-dom(在浏览器中使用)或react-router-native(在rn中使用)。react-router-dom和 react-router-native都依赖react-router，所以在安装时，react-router也会自动安装。
```base
yarn add react-router-dom
```

react-router中奉行一切皆组件的思想，`路由器-Router`、`链接-Link`、`路由-Route`、`独占-Switch`、`重定向-Redirect`都以组件形式存在。
- 通过Switch设置独占路由，渲染与该地址匹配的第一个子节点《Route》或者《Redirect》
- 根路由要添加exact，实现精确匹配
- 没有path，则默认匹配
- 404要放到最后
```js
{/* 添加Switch表示仅匹配一个*/}
<Switch>
    {/* 根路由要添加exact，实现精确匹配 */}
    <Route exact path="/" component={HomePage} />
    <Route path="/user" component={UserPage} />
    <Route path="/search/:id" component={Search} />
    {/* 这里没有path值，用的是Router默认的match，默认是匹配的 */}
    <Route render={() => <h1>404</h1>} />
</Switch>
```

### Route渲染内容的3种方式

- Route渲染优先级：`children > component > render`。
- 这三种方式互斥，只能用一种。
    - 类型：
        - children、render都是Function类型（内联匿名函数的形式）
        - component是组件类型
    - 匹配：
        - children不管是否匹配，都会被渲染（当然，如果在有独占路由Switch包裹时，只会匹配渲染，children就不会默认渲染了）
        - component、render必须匹配才能渲染
- **注意!!!**：**渲染component的时候会调用React.createElement**，如果使用`内联匿名函数的形式`，每次都会生成一个新的匿名函数，导致生成的组件的type总是不相同，这个时候会产生**重复的卸载和挂载**，影响性能。
- 三者能接收到同样的[route props]，包括match, location and history（但是当不匹配的时候， children的match为null）
```js
<Switch>
    <Route
        exact
        path="/"
        //children={() => <div>children page</div>}
        component={HomePage}
        //render={() => <div>render page</div>}
    />
    {/* 错误举例，component方式使用内联匿名函数的形式，尝试观察下child的didMount和willUnmount函数 */}
    {/* <Route component={() => <Child count={count} />} /> */}
    <Route path="/user" component={UserPage} />
    <Route path="/login" component={LoginPage} />
    {/* 这里没有path值，用的是Router默认的match，默认是匹配的 */}
    <Route component={_404Page} />
</Switch>
```

::: danger 用component，不要用内联匿名函数形式
当你用 component 的时候，Route会用你指定的组件和React.createElement创建一个新的[React element]。这意味着当你提供的是一个内联函数的时候，每次render都会创建一个新的组件。这会导致不再更新现有组件，而是直接卸载然后再去挂载一个新的组件。因此，当用到内联函数的内联渲染时，请使用render或者children。
```js
//渲染逻辑
return (
    <RouterContext.Provider value={props}>
        {props.match
            ? children
                ? typeof children === "function"
                    ? __DEV__
                        ? evalChildrenDev(children, props, this.props.path)
                        : children(props)
                    : children
                : component
                    ? React.createElement(component, props)
                    : render
                        ? render(props)
                        : null
            : typeof children === "function"
                ? __DEV__
                    ? evalChildrenDev(children, props, this.props.path)
                    : children(props)
                : null}
    </RouterContext.Provider>
);
```
:::

### 使用Router

- **动态路由**：使用`:id`的形式定义动态路由
```js
// 定义路由:
<Route path="/product/:id" component={Product} />
// 添加导航链接:
<Link to={"/product/123"}>搜索</Link>
// 创建组件并获取参数:
function Product({location, match}) {
    const {id} = match.params;

    return <h1>Product-{id}</h1>;
}
```

- **嵌套路由**：Route组件嵌套在其他页面组件中就产生了嵌套关系
```js
export default function App(props) {
    return (
        <div>
            <Router>
                <Link to="/">首页</Link>
                <Link to="/product/123">搜索</Link>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/product/:id" component={Product} />
                    <Route component={_404Page} />
                </Switch>
            </Router>
        </div>
    );
}
function Product({ match }) {
    const { params, url } = match;
    const { id } = params;
    return (
        <div>
            <h1>Search-{id}</h1>
            <Link to={url + "/detail"}>详情</Link>
            <Route path={url + "/detail"} component={Detail} />
        </div>
    );
}
function Detail({ match }) {
    return (
        <div>
            <h1>detail</h1>
        </div>
    );
}
```

## API要点及代码实现

### BrowserRouter、HashRouter、MemoryRouter

basename: string，所有URL的base值。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。basename的格式是前面有一个/，尾部没有/
```js
<BrowserRouter basename="/admin">
    <Link to="/user" />
</BrowserRouter>
```

#### BrowserRouter 与 HashRouter 对比
1. HashRouter最简单，不需要服务器端渲染，靠浏览器的#的来区分path就可以，BrowserRouter 需要服务器端对不同的URL返回不同的HTML，后端配置可参考[文档](https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)。
2. BrowserRouter使用HTML5 history API( `pushState`，`replaceState`和`popstate`事件)，让页面的UI同步与URL。
3. HashRouter不支持location.key和location.state，动态路由跳转需要通过?传递参数。
4. HashRouter不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 History模式。

#### MemoryRouter
把 URL 的历史记录`保存在内存中`的 `<Router>` (不读取、不写入地址栏)。在测试和非浏览器环境中很有用，如React Native。

#### 代码实现

Router一定要放在最外层，否则Link、Route等都不能使用。BrowserRouter、HashRouter、MemoryRouter的代码实现，差别只在从history导出的api不同。真正的路由器逻辑都在Router中。

- BrowserRouter：历史记录管理对象history初始化及向下传递，location变更监听
```js
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import Router from './Router'

export default class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
    }
    render() {
        return <Router history={this.history}>
            {this.props.children}
        </Router>;
    }
}
```
- HashRouter
```js
import React, { Component } from "react";
import { createHashHistory } from "history";
import Router from "./Router";

export default class HashRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createHashHistory();
    }
    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}
```
- MemoryRouter
```js
import React, { Component } from "react";
import { createMemoryHistory } from "history";
import Router from "./Router";

export default class MemoryRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createMemoryHistory();
    }
    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}
```


### Router

所有 Router 组件的**通用低阶接口**。通常情况下，应用程序只会使用其中一个高阶 Router:
- BrowserRouter
- HashRouter
- MemoryRouter
- NativeRouter
- StaticRouter

```js
import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Router extends Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" }
    }
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }
        // 监听location变化
        this.unlisten = props.history.listen(location => {
            this.setState({
                location
            })
        })
    }

    componentWillUnmount() {
        // 取消监听
        if (this.unlisten) {
            this.unlisten()
        }
    }

    render() {
        return (
            <RouterContext.Provider value={{
                history: this.props.history,
                location: this.state.location,
                match: Router.computeRootMatch(this.state.location.pathname)
            }}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
```


### Route

`<Route>` 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 path 属性与某个 location 匹配时呈现一些 UI。

使用 `<Route>` 渲染内容有以下三种方式:
- component
- render: func
- children: func

**内容渲染规则**：
- match，按照互斥规则，优先渲染顺序为children component render null，children如果是function执行function，是节点直接渲染
- 不match，渲染children或者null (只渲染function)
```js
import React, { Component } from 'react'
import { RouterContext } from './Context'
import matchPath from './matchPath'

export default class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const location = context.location;
                    const { path, children, component, render } = this.props;
                    // const match = path ? (location.pathname === path) : context.match;
                    const match = this.props.computedMatch
                        ? this.props.computedMatch
                        : path
                            ? matchPath(location.pathname, this.props)
                            : context.match;

                    // match 渲染3者之一：children（function或者节点） > component > render > null
                    // 不match 渲染children（function）或者 null
                    const props = {
                        ...context,
                        match
                    }

                    return (
                        <RouterContext.Provider value={props}>
                            {
                                match ?
                                    (children ? (typeof children === 'function' ? children(props) : children) :
                                        (component ? (React.createElement(component, props)) :
                                            (render ? render(props) : null)
                                        )
                                    ) : (typeof children === 'function' ? children(props) : null)
                            }
                        </RouterContext.Provider>
                    )

                    // return match ? React.createElement(component) : null
                }}
            </RouterContext.Consumer>
        )
    }
}
```


### Link

会被渲染为a标签。
- to: string | object，一个字符串或对象形式的链接地址，可以具有以下任何属性：
    - pathname - 要链接到的路径
    - search - 查询参数
    - hash - URL 中的 hash，例如 #the-hash
    - state - 存储到 location 中的额外状态数据
- replace: bool，当设置为 true 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 false 。
- others：你还可以传递一些其它属性，例如 title 、 id 或 className 等。
```js
<Link to='/courses?sort=name' />
<Link to={{
    pathname: '/courses',
    search: '?sort=name',
    hash: '#the-hash',
    state: {
        redirect: '/login'
    }
}} />
<Link to="/courses" replace />
<Link to="/" className="nav" title="a title">About</Link>
```

实现：
```js
import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Link extends Component {
    static contextType = RouterContext;
    handleClick = e => {
        e.preventDefault()
        // 手动跳转
        this.context.history.push(this.props.to)
    }
    render() {
        const { children, to, ...restProps } = this.props
        return (
            <a href={to} {...restProps} onClick={this.handleClick}>
                {children}
            </a>
        )
    }
}
```

### Switch

用于渲染与路径匹配的第一个子 `<Route>` 或 `<Redirect>`。
Q：这与仅仅使用一系列 `<Route>` 有何不同呢？
A：`<Switch>` 只会渲染一个路由。相反，仅仅定义一系列 `<Route>` 时，每一个与路径匹配的 `<Route>` 都将包含在渲染范围内

```js
import React, { Component } from 'react';
import { RouterContext } from './Context';
import matchPath from './matchPath';

export default class Switch extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { location } = context;
                    let match = undefined; // 匹配的match
                    let element = undefined; // 匹配的元素

                    // todo 遍历children，给匹配赋值
                    // 找到第一个匹配的Route或者Redirect
                    // 这里时候用React.Children提供的遍历，可以避免判断children的类型
                    React.Children.forEach(this.props.children, child => {
                        // child 是Route或者Redirect
                        if (match == null && React.isValidElement(child)) {
                            element = child;
                            const { path } = child.props;
                            match = path ? matchPath(location.pathname, child.props) : context.match;
                        }
                    })

                    return match ? React.cloneElement(element, {
                        computedMatch: match
                    }) : null;
                }}
            </RouterContext.Consumer>
        )
    }
}
```

### Redirect

to: string | object
```js
<Redirect to="/somewhere/else" />
<Redirect to={{
    pathname: '/login',
    search: '?utm=your+face',
    state: {
        referrer: currentLocation
    }
}} />
```


代码实现要注意：
- !跳转，不能在render函数里面做，因为render是返回 UI的，也就是当前组件的子节点，如果跳转走了，就没有children了
- 应该在生命周期中跳转
```js
import React, { Component } from 'react';
import { RouterContext } from './Context';
import LifeCycle from './LifeCycle';

export default class Redirect extends Component {
    // !跳转，不能在render函数里面做，因为render是返回 UI的，也就是当前组件的子节点，如果跳转走了，就没有children了
    // 应该在生命周期中跳转
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { to, push = false } = this.props;
                    return (
                        <LifeCycle onMount={() => {
                            push ? context.history.push(to) : context.history.replace(to);
                        }} />
                    )
                }}
            </RouterContext.Consumer>
        )
    }
}
```

### withRouter

```js
import React from 'react';
import { RouterContext } from './Context';

const withRouter = WrappedComponent => props => {
    return (
        <RouterContext.Consumer>
            {context => {
                return <WrappedComponent {...props} {...context} />
            }}
        </RouterContext.Consumer>
    )
}

export default withRouter;
```


### Prompt
```js
@withRouter
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confirm: true };
    }
    render() {
        const { params, url } = this.props.match;
        const { id } = params;

        return (
            <div>
                <h1>Product-{id}</h1>
                <Link to={url + "/detail"}>详情</Link>
                <Route path={url + "/detail"} component={Detail} />
                <Link to="/">go home</Link>
                <button onClick={() => { this.setState({ confirm: !this.state.confirm }) }}>
                    change
                </button>
                <Prompt when={this.state.confirm} message="你确定要离开吗？" />
            </div>
        );
    }
}
```
```js
import React from 'react';
import { RouterContext } from './Context';
import LifeCycle from './LifeCycle';

export default function Prompt({ message, when = true }) {
    return (
        <RouterContext.Consumer>
            {context => {
                if (!when) {
                    return null;
                }
                let method = context.history.block;
                return (
                    <LifeCycle
                        onMount={self => {
                            self.release = method(message);
                        }}
                        onUnmount={self => {
                            self.release();
                        }}
                    />
                )
            }}
        </RouterContext.Consumer>
    )
}
```
```js
import { Component } from 'react';

export default class LifeCycle extends Component {
    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount.call(this, this) // !这儿为什么就能存起来了。。。。。没搞懂，但没时间了。。。
        }
    }
    componentWillUnmount() {
        if (this.props.onUnmount) {
            this.props.onUnmount.call(this, this)
        }
    }
    render() {
        return null;
    }
}
```


### React Router提供的Hooks API：useRouteMatch、useHistory、useLocation、useParams

```js
import { RouterContext } from "./Context";
import { useContext } from "react";
import matchPath from "./matchPath";

export function useHistory() {
    return useContext(RouterContext).history;
}

export function useLocation() {
    return useContext(RouterContext).location;
}

export function useRouteMatch(path) {
    const location = useLocation();
    const match = useContext(RouterContext).match;
    return path ? matchPath(location.pathname, path) : match;
}

export function useParams() {
    const match = useContext(RouterContext).match;
    return match ? match.params : {};
}
```

