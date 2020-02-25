### typescript 数组元组区别
----

> 元组
元组是一种特殊的数组，相对于数组，元组限定了数组元素的个数和类型
``` js
let tuple: [number, string] = [0, "1"];
```
元组需要注意越界问题，即便可以添加越界元素，但是无法访问，当然也不能给越界赋值
``` js
tuple.push(2)  // 不报错
console.log(tuple) // [0, "1", 2] 也能都打印出来
console.log(tuple[2]) // 但是想取出元组中的越界元素，就会报错元组长度是2，在index为2时没有元素
tuple[2] = '123' // 会报不能将类型‘123’分配给‘undefined’
```
> 数组

Ts定义数组的方式如下示例
``` js
let arr1: number[] = [1,2,3]
// 下面就是使用 TS 内置的 Array 泛型接口来实现的
let arr2: Array<number | string> = [1,2,3,"abc"]
```
