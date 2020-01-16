# 解构赋值

请指出以下代码的执行后，abcd分别是什么值？
```js
let { a: b, c: d } = { a: 1, b: 2, c: 3, d: 4};
 
// a和c会报错，a is not defined
// b: 1, d: 2
```
