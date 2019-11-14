---
{
    "title": "react-router前端路由",
}
---
### react-router前端路由

## 两种模式
- HASH 模式

	- 就是简单的链接上拼接类似#page1这种形式

- HISTORY 模式

	- HTML5出现之前，控制路由的API只有以下几种方式（go, forward, back)
	- HTML5出现后，新增以下API （pushState, replaceState, state) 其中pushState, replaceState各接收三个参数state, title, url

## API

- BrowserRouter（目前项目基本都是用这种，HashRouter，Router 不推荐使用）

- Route (页面的展示根据匹配的路由展示，compoent, render, children 三种引入UI的方式，有一个exact属性，这个属性是用来精准匹配路由，如/page,假如页面/page/2就不会匹配）

- Redirect

- Switch (用这个包着用Route注册的页面路由，每次只会渲染一个路由匹配的组件，例如'/', '/user' , 如果当前url是‘/’, 之后渲染‘/’的路由)
[switch](https://reacttraining.com/react-router/web/api/Switch)

```js
Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    React.Children.forEach(children, function (element) {
      if (match == null && React.isValidElement(element)) {
        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;

        var path = pathProp || from;

        child = element;
        match = matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }, route.match);
      }
    });

    return match ? React.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(React.Component);
```

- NavLink (做tab切换 可以用这个）

- Link (类似a 标签)