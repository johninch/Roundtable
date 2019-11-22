---
{
    "title": "函数组合",
}
---
### 函数组合包含在函数式编程范畴中，就是一种将已被分解的简单任务组合成复杂任务的过程

### ***什么是组合***
```js
function compose(f, g){
    return function(x) {
        return  f(g(x))
    }
}
// compose(f,g)(x) === f(g(x))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m,n)(x) === f(g(m(n(x))))
//···

```
`compose`函数，接受若干个函数作为参数；每个函数执行后的输出作为下一个函数的输入；直到最后一个函数执行完毕

### ***应用compose函数***

假如一个需求，对一个字符串转换为 四舍五入 的数字。

- **常规实现**：

```js
let n = '3.56';
let data = parseFloat(n);
let result = Math.round(data); // =>4 最终结果
```

- **compose实现**：

```js
let n = '3.56';
let number = compose(Math.round,parseFloat);
let result = number(n); // =>4 最终结果
```
>这个组合的过程就是函数式组合！我们将两个函数组合一起便能构造出新的函数

### ***实现组合***

>概括来说，就是接收若干个函数作为参数，返回一个新函数。新函数执行时，按照 <span style="color: red">由右向左</span> 的顺序依次执行传入compose中的函数，每个函数的执行结果作为为下一个函数的输入，直至最后一个函数的输出作为最终的输出结果

```js
function compose(...fns){
    return function(x){
        return fns.reduceRight(function(arg,fn){
            return fn(arg);
        },x)
    }
}
接受的参数是不确定的，是一个数组，然后由右向左执行函数
```

### ***实现管道***

>从左至右处理数据流的过程称之为管道(pipeline)! <br/>
即管道的执行顺序是<span style="color: red">由左向右</span>

```js
function pipe(...fns){
    return function(x){
        return fns.reduce(function(arg,fn){
            return fn(arg);
        },x)
    }
}
```

参考链接：[彻底弄懂函数组合](https://juejin.im/post/5d50bfebf265da03cb122b6f)
