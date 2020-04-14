# JS原生选择器

## querySelectorAll方法相比getElementsBy系列方法有什么区别？

#### 1. 所属W3C规范不同
- querySelectorAll属于W3C中的Selectors API规范。
- getElementsBy系列则属于W3C的DOM规范。

#### 2. 接收参数不同
- querySelectorAll方法接收的参数是一个CSS选择符。
- getElementsBy系列接收的参数只能是单一的className、tagName和name。
 
#### 3. 返回值差异
- querySelectorAll 返回的是一个`静态NodeList`。NodeList对象会包含文档中的所有节点，如Element、Text和Comment等。
- getElementsBy系列的返回的是一个 `HTMLCollection 对象`。HTMLCollection对象只会包含文档中的Element节点。

