# React-Router使用关键点

## Router路由器组件 (两种：BrowserRouter、HashRouter)
`react-router-dom` 提供了和两种路由器组件（`<BrowserRouter>`，`<HashRouter>`）。前者基于url的pathname段，后者基于hash段。两种路由器组件都会创建一个history对象。

如果我们的应用有服务器响应web的请求，我们通常使用`<BrowserRouter>`组件; 如果使用静态文件服务器，则我们应该使用`<HashRouter>`组件。

基于React Router的web应用，根组件应该是一个Router组件（BrowserRouter，HashRouter）：
```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```
> **注意**：
>> Router中只能有唯一的一个子元素（如上只有一个App）。

## 路由匹配组件（Route、Switch）

`react-router-dom` 中有两个匹配路由的组件: `<Route>` 和 `<Switch>`.

### 无指定path总是渲染
```tsx
// 因为没有指定路径 ，所以总是能匹配，渲染Always组件
<Route component={Always}/> 
```

### Route组件的渲染方式（component、render、children 3种）

三个路由属性：component、render、children。

#### component

component 的值是一个组件，当 URL 和 Route 匹配时，Component属性定义的组件就会被渲染。例如：
```tsx
// 当 URL = "http://example.com/foo" 时，Foo组件会被渲染。
<Route path='/foo' component={Foo} >
```

> **注意**：
>> 不要将component属性设置为一个函数，然后在其内部渲染组件。这样会*导致已经存在的组件被卸载，然后重新创建一个新组件，而不是仅仅对组件进行更新*。

#### render
render 的值是一个函数，这个函数返回一个 React 元素。这种方式方便地为待渲染的组件传递额外的属性。例如：
```tsx
// Foo 组件接收了一个额外的 data 属性。
<Route path='/foo' render={(props) => {
  <Foo {...props} data={extraProps} />
}}>
</Route>
```

#### children
children 与render类似，也是一个函数，函数返回要渲染的 React 元素。

> 不同之处:
>> 与前两种方式不同之处是，**无论是否匹配成功**， children 返回的组件**都会被渲染**，但当匹配不成功时，match 属性为 null，这意为着可以据此作出UI上的调整。例如:
```tsx
// 如果 Route 匹配当前 URL，待渲染元素的根节点 div 的 class 将设置成 active.
<Route path='/foo' render={(props) => {
  <div className={props.match ? 'active': ''}>
    <Foo {...props} data={extraProps} />
  </div>
}}>
</Route>    
```

## Switch组件的作用（v4新增）

- `<Switch>`是React-Router@v4 新增的路由匹配组件，只会渲染第一个被location匹配到的`<Route>`或者`<Redirect>`子元素路由；
- 在`v4`之前，没有`<Switch>`提供包裹，通常用一个`<div>`包裹一打`<Route>s`，这种情况下会将匹配到的所有子路由都渲染出来，这也是react的设计需要（便于构建sidebars 和 breadcrumbs，bootstrap tabs...）；
- `<Switch>`是唯一的因为它仅仅只会渲染一个路径。相比之下（不使用`<Switch>`包裹的情况下），每一个被location匹配到的`<Route>`将都会被渲染。

### 通配符
```tsx
<Route path="/hello/:name">
// 匹配 /hello/michael 和 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello, /hello/michael 和 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```

### Switch配合`exact`精确匹配
- 不使用**exact**时，Switch会从前往后顺序匹配，有可能先匹配到非预期的路由，所以为了达到预期，需要调整路由的前后顺序。
```tsx
// 当url是/about
<Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route component={NoMatch} />
</Switch>
// 会先匹配到Home组件，因为path='/'先与path='/about'匹配到
```
- 使用**exact**后，只有path属性进行精确比对后完全相同该`<Route>`才会被渲染。
```tsx
// 当url是/about
<Switch>
    <Route exact path="/" component={Home} /> // 当浏览器地址严格是 / 时，渲染Home组件
    <Route path="/about" component={About} /> // 当浏览器地址是 /about 时，渲染About组件
    <Route path="/contact" component={Contact} /> // 当浏览器地址是 /contact 时，渲染contact组件
    <Route component={NoMatch} /> // 没有指定路径，那就选他作为匹配的路由规则，NoMatch组件
</Switch>
// 只会严格匹配到 path='/about'的 About组件
```

## 导航组件（Link、NavLink、Redirect）

### Link
React Router提供了一个组件用来在应用中添加link。当`<Link>`渲染时，一个`<a>`标签在html页面中被创建出来。
```tsx
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```

### NavLink
`<NavLink>`组件是一个特殊的`<Link>`组件。当它的path与当前location匹配时，可以自定义其样式。
```tsx
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```

### Redirect
当需要页面重定向时，我们可以使用`<Redirect>`组件。当一个`<Redirect>`组件被渲染时，页面将被渲染到`<Redirect>`组件的to属性指定的位置上。
```tsx
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

## React-Router与常规路由有何不同
主题    |   常规路由   |    React 路由
|:-------------|:-------------|:-----|
参与 页面  |每个视图对应一个新文件 |只涉及单个HTML页面
URL 更改    |发送HTTP请求到服务器并且接收相应的HTML页面    |仅更改历史记录属性
用户 体验    |用户实际在每个视图的不同页面切换，页面跳转刷新   |用户认为自己正在不同的页面间切换，页面无刷新

