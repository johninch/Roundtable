# 什么是类型兼容？

类型兼容性用于确定一个类型是否能赋值给其他类型，TypeScript 结构化类型系统的基本规则是：`如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性`。

要查看 x 是否能赋值给 y，首先看它们的参数列表，x 的每个参数必须能在 y 里找到对应类型的参数，注意的是参数的名字相同与否无所谓，只看它们的类型：
```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK

x = y; // Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'.(2322)
```

