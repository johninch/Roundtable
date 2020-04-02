# void、never、any、unknow有什么区别？string可以赋予前面提到的四种类型吗？

## any

我们通常会在不确定声明的一个变量为何种类型的情况下，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，指定any类型
``` js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
<strong>string可以赋值any类型</strong>

## void

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void。
``` js
function warnUser(): void {
    console.log("This is my warning message");
}
```
声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
``` js
let unusable: void = undefined;
```
<strong>string不可以赋值void类型</strong>

## unknow

unknow类型和any类型区别：unknown 类型只能赋值给 any 类型和 unknown 类型本身
``` js
let str: unknow;
let str2: any;
let str3: string = str // Type 'unknown' is not assignable to type 'string'.
```
<strong>任何值都可以赋值给unKnow类型(另一种any)， 故string可以赋值unKnow类型</strong>

## never

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
```js
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无限循环这种无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```
<strong>string不可以赋值never类型</strong>