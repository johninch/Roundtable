# 函数式编程与柯里化

## 为什么函数是一等公民

前端有3种常用的编程范式（`面向对象`、`过程式编程`、`函数式编程`）。我们常听说「**函数是JavaScript的一等公民**」，那么怎样理解这里的“一等公民”呢？

`一等公民`，实际上说的是函数和其他对象一样，没什么特殊的...**你可以像对待任何其他数据类型一样对待它们**，即可以把函数存在数组里，当作参数传递，赋值给变量...等等，这也是**函数式编程**的思想基础。

## 函数柯里化
请编写函数实现`fn(2)(3)(4)=24`:
```js
function fn(n1) {
    return function fn2(n2) {
        return function fn3(n3) {
            return n1 * n2 * n3;
        }
    }
}

fn(2)(3)(4) // 24
```
或者：
```js
function fn(n) {
    var num = n;
    return function fn2(n) {
        num = num * n;
        return function fn3(n) {
            num = num * n;
            return num;
        }
    }
}

fn(2)(3)(4) // 24
```

