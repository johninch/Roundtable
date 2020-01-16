# 函数默认参数&解构赋值

请指出该函数的执行结果
```js
function foo({ a = 'a', b = 'b', c = 'c', d = 'd' } = { a: 1, b: 2 }) {
    console.log(a, b, c, d);
}
 
foo(); // 1 2 "c" "d"
foo({ a: 10, b: 11 }); // 10 11 "c" "d"
foo({ c: 10, d: 11 }); // a b 10 11
```
