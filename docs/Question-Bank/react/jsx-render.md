### jsx中可以渲染出false、true、null、undefined、''、0、[]、{}等值么


> {}

jsx 无法直接渲染对象，会报对象不是一个合法的react子节点，如果想要渲染一些子节点，最好用数组替代

> []

可以正常渲染，如果数组中没有任何元素，则页面是空白的

> false, true, null, ''

可以渲染，页面不展示任何元素

> undefined

不能，因为render函数必须要有返回值
<strong>Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.</strong>

> 0

可以正常渲染，页面显示0

