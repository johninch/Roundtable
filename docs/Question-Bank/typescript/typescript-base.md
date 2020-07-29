---
title: TypeScript基础
date: 2020-01-16 14:41:08
tags: [TypeScript]
---

# TypeScript基础

## TS定义
TypeScript 是 JavaScript 的一个`超集`，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，可以编译成纯 JavaScript，运行在任何浏览器上。

## TS优缺点

### 优点：
1. TS 增加了代码的可读性和可维护性。
    - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了；
    - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好；
    - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等；
2. TS 具有包容性。
    - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可；
    - 即使不显式的定义类型，也能够自动做出类型推论；
    - 编译报错也还是会生成js文件；

### 缺点：
1. TS 有学习成本。需要理解如接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念；
2. TS 有使用成本。短期会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本

## TS的安装

```
npm install -g typescript // 全局安装

tsc hello.ts // 编译一个ts文件 为 hello.js
```
我们约定使用 TypeScript 编写的文件以 .ts 为后缀，用 TypeScript 编写 React 时，以 .tsx 为后缀

## TS基础

### 原始数据类型

- boolean
- string
- number
- void
- null 和 undefined 

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void 表示没有任何返回值的函数`；而在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
```ts
let u: undefined = undefined;
let n: null = null;
```
`与 void 的区别是，undefined 和 null 是所有类型的子类型`。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
```ts
// 这样不会报错
let num: number = undefined;
```
但当我们在 tsconfig.json 文件中设置 `strictNullChecks` 为 true 时，我们就不能将undefined和null设为自身; `strictNullChecks`开启后，**可选参数会被自动加上 | undefined**
```typescript jsx
// 开启 "strictNullChecks": true 情况

let s: string = 'hello'
s = null // error，不能将类型“null”分配给类型“string”。

let s2: string | null = 'hi'
s2 = null
s2 = undefined // error，不能将类型“undefined”分配给类型“string | null”。
```

#### TS中string与String有什么区别？
TS中用小写字母开头的类型代表字面量, 大写的是ES内置的对象，用来表示通过new实例化的数据：
```js
// 字面量
const n:number = 123;
const s:string = '456';
const o:object = {a:1,b:'2'};
// 非字面量
const n:Number = new Number(123);
const s:String = new String('456');
const o:Object = new Object({a:1,b:'2'});
```

### 任意值any

一个普通类型，在赋值过程中改变类型是不被允许的，而 any 类型，则允许被赋值为任意类型。

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值：
```ts
// 不会报错
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
```

### 类型推论

TypeScript 会在`没有明确的指定类型，但是有赋值`的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。

### 高级类型1-联合类型（|：union types）

联合类型（Union Types）表示取值可以为多种类型中的一种，用 | 分隔每个类型。

TS 的交叉类型并`不是指每个类型的并集`，`| 应该理解成 or `，A | B 表示 A 或 B 的结果，它只可能是其中一个，这也就意味着它的类型是不确定的。

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候（也没有赋值，无法类型推断时），我们`只能访问此联合类型的所有类型里共有的属性或方法`：比如可以变量为var foo: string | number，则foo.length 则报错，因为length不是共有属性，而foo.toString()是没问题的。

::: details 无法判断联合类型，需[类型断言]
```ts
interface ICat {
  run(): void
  meow(): void
}
interface IDog {
  run(): void
  bark(): void
}
class Cat implements ICat {
    run() { };
    meow() { };
}
const getAnimal = (): ICat | IDog {
    return new Cat();
}

const animal = getAnimal();
animal.run(); // ok
animal.meow(); // error

// 这里 ICat 和 IDog 都拥有 run 方法
// 不确定返回的具体是什么类型，如果想要编译通过就需要使用类型断言：

// 类型断言
(animal as ICat).meow() // ok

// 判断是否存在该方法
if ('meow' in animal) {
  animal.meow()
} else {
  animal.bark();
}
```
:::

### 高级类型2-交叉类型（&：intersection types）

交叉类型可以让我们把现有的类型组合在一起得到一个新的类型，从而同时拥有它们的全部属性，表示方法是：`A & B` 。

TS 的交叉类型并`不是指每个类型的交集`，`& 的意思理解成 and `，A & B 表示同时包含 A 和 B 的结果，这里传进去的 user 必须同时拥有 name, age, grade 这三个属性，我们可以直接使用它而不需要判断是否存在该属性。
```ts
interface IPerson {
  name: string;
  age: number;
}
interface IStudent {
  grade: number;
}
const getBio = (user: IPerson & IStudent) => {
  return `His name is ${user.name}, I am ${user.age} years old and a student of Grade ${user.grade}.`
}
getBio({name: ‘Joi’, age: 12, grade: 6})
```

### 区分类型1-类型断言

> 对于联合类型，在还不确定类型的时候，只能访问所有联合类型公有的属性或方法，随之带来的问题就是访问非公有的属性或方法时会报错，那么该如何区分值的具体类型，以及如何访问共有成员？

方法一就是使用类型断言，将其断言为所属联合类型中的某种类型：

类型断言有两种语法 `<类型>值` 和 `值 as 类型`，在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后者。

当一个变量是联合类型的时候，我们能够确定的只有每个类型共有的方法，除非准确地知道该变量属于哪个类型。
```ts
const canvas = document.getElementById('#canvas') // HTMLElement | null
const ctx = canvas.getContext('2d') // 错误
```
在上述代码中， canvas 元素可能不存在于文档中，所以 TS 推断它的类型是 HTMLElement | null ，不管是 null 还是 HTMLElement 都没有 getContext 方法。当我们很确定自己定义了该元素，就可以使用 类型断言 来指定它的类型，告诉编译器「我很清楚自己在做什么，这里不会出错」。之前的代码可以写成这样：
```ts
const canvas = document.getElementById('#canvas') // HTMLElement | null
const ctx = (canvas as HTMLCanvasElement).getContext('2d') 
// 或者 (<HTMLCanvasElement>canvas).getContext(‘2d’)
```
**但是类型断言有个很大的问题是`写法很繁琐`**，假设我们有几个图形，有不同的求面积的方法：
```ts
interface ICircle {
  radius: number
}
interface IRectangle {
  width: number;
  height: number;
}

const getArea = (shape: ICircle | IRectangle): number => {
  if ((<ICircle>shape).radius) {
    return Math.PI * ((<ICircle>shape).radius ** 2);
  } else {
    return (shape as IRectangle).width * (shape as IRectangle).height;
  }
}
// 不仅在 if 条件分支里面需要写断言，在 else 分支同样要进行断言，很繁琐
```

### 区分类型2-类型保护

通过类型保护，TS 可以判断出不同条件分支的类型。类型保护常用的方式有两种`in`与`param is type`。

*其实还有两种，使用 instanceof与typeof，但都有使用场景约束，具体见传送门[类型断言和类型保护](https://fullstackbb.com/typescript/type_guards_and_type_assertions/)。*
#### 1.类型保护：in
```ts
const whatPet = (pet: IFish | IBird): void => {
  if ('swim' in pet) {
    return pet.swim();
  } else {
    return pet.fly();
  }
}
```

#### 2.类型保护：类型预设（param is Type）
类型预设 (type predicates) 的用法允许我们自定义类型保护，它的形式是在函数的返回值里面写成 param is Type ，param 必须是当前函数签名中的一个参数。
```ts
function isFish(pet: IFish | IBird): pet is IFish {
    return (<IFish>pet).swim !== undefined;
}

// 'swim' 和 'fly' 调用都没有问题了
const whatPet = (pet: IFish | IBird): void => {
  if (isFish(pet)) {
    return pet.swim();
  } else {
    return pet.fly();
  }
}
```

### 接口interface——描述对象的形状

object其实是包含数组/元祖/枚举, 在ts的概念中, 这个叫做类型兼容, 就是说数组类型数据, 也可以用object来标注:
```js
let array: object = [12,321];
```
实际上基本不用object类型的, 因为他标注的非常不具体, 一般都使用 接口（Interfaces）来对「对象的形状（Shape）」进行描述。

上述就是接口的第一个用途，描述对象形状，除此之外，*接口interface还有另一个用途，对`类的一部分行为进行抽象`。*[类实现接口 implements](./typescript-base.html#类实现接口-implements)

接口一般首字母大写。建议接口的名称加上 I 前缀。
- 赋值的时候，变量的形状必须和接口的形状保持一致，多或者少属性都不行；
- 但对于`?可选属性`，可以不存在；
- 可定义`[propName: string]: 任意属性`：
    ```ts
    interface IPerson {
        name: string;
        age?: number;
        [propName: string]: any;
    }
    ```
    注意，`一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：`
    ```ts
    interface IPerson {
        name: string;
        age?: number;
        [propName: string]: string;
    }

    let tom: IPerson = {
        name: 'Tom',
        age: 25, // 这里报错！因为 可选属性的类型number 不是 任意属性的类型string 的子集
        gender: 'male'
    };
    ```
- 可定义`readonly只读属性`：只读属性只能在创建的时候被赋值
    ```ts
    interface IPerson {
        readonly id: number;
    }

    let tom: IPerson = {
        id: 89757, // 只能在创建时赋值
    };

    tom.id = 9527; // 报错
    ```

### 数组的类型

- **类型+方括号** 表示法：`let fibonacci: number[] = [1, 1, 2, 3, 5]; let list: any[];`
- **数组泛型** 表示法：`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`
- **类数组** 接口表示：
    ```ts
    function sum() {
        let args: number[] = arguments; // 报错
    }
    // arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }

    // 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等都是 TS定义好的类型：
    function sum() {
        let args: IArguments = arguments;
    }
    ```

### 函数的类型
```js
// 函数声明式
function sum(x: number, y: number): number {
    return x + y;
}

// 函数表达式
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

**注意不要混淆**：TypeScript 中的 => 和 ES6 中的 =>。在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

#### 用接口定义函数的形状
我们也可以使用接口的方式来定义一个函数需要符合的形状：
```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

- `可选参数`：用 ? 表示可选的参数，且可选参数必须接在必需参数后面。
- `默认值`：TypeScript 会将添加了默认值的参数识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了。
    ```ts
    function buildName(firstName: string = 'Tom', lastName: string) {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let cat = buildName(undefined, 'Cat');
    ```
- `剩余参数`：使用 rest参数 表示剩余参数，且rest 参数只能是最后一个参数。
    ```js
    function push(array: any[], ...items: any[]) {}
    ```

#### 函数重载

重载允许一个函数接受不同数量或类型的参数时，通过多个定义，分别作出不同的处理：
```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
TS **会优先从最前面的函数定义开始匹配**，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 声明文件

声明文件必需以 .d.ts 为后缀。声明文件仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。

使用 @types 统一管理第三方库的声明文件。
@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
npm install @types/jquery --save-dev

### 全局变量：

一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let

需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现

```ts
// src/jQuery.d.ts

// 声明为常量
declare const jQuery: (selector: string) => any;

// jQuery也是函数，所以也可以声明函数，且声明函数支持重载
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
```

namespace是ts在ES5时期提供的模块化方案，随着ES6的发展，已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了。

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax：
```ts
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```

### interface 和 type
除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型。

### 防止命名冲突
暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下：
```ts
// src/jQuery.d.ts

declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
```
注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：
```ts
// src/index.ts

let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```

### 声明合并
假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来：
```ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```
```ts
// src/index.ts

jQuery('#foo');
jQuery.ajax('/api/get_something');
```


### 自动生成声明文件
如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。
我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

### 内置对象

- ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等。
    ```ts
    let b: Boolean = new Boolean(1);
    let e: Error = new Error('Error occurred');
    let d: Date = new Date();
    let r: RegExp = /[a-z]/;
    ```
- DOM 和 BOM 提供的内置对象有：Document、HTMLElement（即document.body）、Event、NodeList 等。
- TypeScript核心库：预置定义了所有浏览器环境需要用到的类型，核心库的定义中不包含 Node.js 部分，如果想用 TS 写 Node.js，则需要引入第三方声明文件：npm install @types/node --save-dev


## TS进阶

### 类型别名 type
类型别名用来给一个类型起个新名字。类型别名与字符串字面量类型都是使用 **type** 进行定义
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
上例中，我们使用 **type** 创建类型别名。类型别名常`用于联合类型`。

### 字符串字面量类型 type
字符串字面量类型用来约束取值只能是某几个字符串中的一个。类型别名与字符串字面量类型都是使用 **type** 进行定义。
```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```

### 元组 tuple
数组合并了相同类型的对象；而元组（Tuple）合并了不同类型的对象，限定了数组元素的个数和对应类型。
```ts
// 当赋值或访问一个已知索引的元素时，会得到正确的类型：
// 通过索引只赋值其中一项是允许的
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;
tom[0].slice(1);
tom[1].toFixed(2);

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
let tom: [string, number];
tom = ['Tom', 25];
```

#### 元组越界添加
当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
```ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```
可以添加越界元素，但是无法访问，当然也不能给越界赋值：
```ts
tuple.push(2)  // 不报错
console.log(tuple) // [0, "1", 2] 也能都打印出来
console.log(tuple[2]) // 但是想取出元组中的越界元素，就会报错元组长度是2，在index为2时没有元素
tuple[2] = '123' // 会报不能将类型‘123’分配给‘undefined’
```

### 枚举 enum
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。是 `ts中有而js中没有的类型`，编译后会被转化成对象。枚举成员会被赋值为`从 0 开始递增`的数字，同时也会对枚举值到枚举名`进行反向映射`：
```ts
enum Color {Red, Green, Blue}  等价  enum Color {Red=0, Green=1, Blue=2}

// 可手动赋值为常数项或计算成员，未手动赋值的枚举项会接着上一个枚举项递增。
// 计算成员因为不常用这里不做示例。
enum Color {Red=1, Green, Blue=4}
Color[2] === 'Green' // true

// 可反向通过值得到键
enum Color {Red=1, Green=2, Blue=4}
Color[2] === 'Green' // true
```
编译后：
```ts
enum Color {Red, Green, Blue}

// 编译后

var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
// Color的值为: {0: "Red", 1: "Green", 2: "Blue", Red: 0, Green: 1, Blue: 2}
```

#### 常数枚举与外部枚举

*暂时不知道应用场景*

- 常数枚举是使用 const enum 定义的枚举类型，与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
    ```ts
    const enum Directions { Up, Down, Left, Right }

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

    // 编译结果是：
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    ```
- 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型，只会用于编译时的检查，编译结果中会被删除。
    ```ts
    const enum Directions { Up, Down, Left, Right }

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

    // 编译结果是：
    var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    ```

### TS中 类 的用法 class

#### 修饰符 public、private、protected 和 只读属性
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，`默认所有的属性和方法都是 public 的`；
- `private` 修饰的属性或方法是私有的，`不能在声明它的类的外部访问`；
- `protected` 修饰的属性或方法是受保护的，它`和 private 类似`，区别是它`在子类中也是允许被访问的`。
- `readonly` 将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

**参数属性**：通常ts中类的实例属性需要先定义创建，再在构造函数中初始化赋值。但 修饰符和`readonly`还可以使用在构造函数所传参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

只读关键字readonly 和访问修饰符同时存在时，需写在其后面。
```ts
// 通常需要先创建，再初始化类成员属性
class Animal {
    public name: string;
    public constructor (public readonly theName) {
        this.name = theName;
    }
}

// 可以通过 参数属性 简化写法，创建和初始化一步完成
class Animal {
    // public name: string = 'xiao hei';
    public constructor (public readonly name: string = 'xiao hei') {
        // this.name = name;
    }
}
```

#### 抽象类
`abstract` 用于定义抽象类和其中的抽象方法。
- 抽象类是不允许被实例化的；
- 抽象类中的抽象方法必须被子类实现；

#### 类的类型
给类加上 TypeScript 的类型很简单，与接口类似：
```ts
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

### 类与接口 (包括 implements)

#### 接口interface——类实现接口 implements
这里介绍接口interface的另一个作用，`对类的一部分行为进行抽象`，使用 `implements`。

防盗门和车都实现(implements)了 警报 的接口：
```ts
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```

一个类可以实现多个接口：
```ts
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

#### 接口继承接口
接口与接口之间可以是继承关系：
```ts
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```

#### 接口继承类
接口也可以继承类：
```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```


### 泛型 \<>

泛型（Generics）是指在定义函数、接口或类的时候，`不预先指定具体的类型，而在使用的时候再指定类型的一种特性`。

#### 基本使用
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

// 在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。


// 接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来：
createArray<string>(3, 'x'); // ['x', 'x', 'x']
createArray(3, 'x'); // ['x', 'x', 'x']

// 定义泛型的时候，可以一次定义多个类型参数：
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

#### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，当使用了它所没有的属性或方法时，就会报错。因此可以对泛型进行约束，只允许这个函数传入那些包含要使用的属性或方法的变量。这就是泛型约束。
```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity(7); // 报错
// index.ts(10,17): error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```

多个类型参数之间也可以互相约束，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
```ts
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

#### 泛型接口
使用含有泛型的接口来定义函数的形状：
```ts
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

// 此时在使用泛型接口的时候，需要定义泛型的类型
let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 泛型类
泛型也可以用于类的类型定义中：
```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

#### 泛型参数的默认类型
在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    // ...
}
```

### 函数、接口、类 声明合并
如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

#### 函数合并： 即函数重载

#### 接口合并
同名接口合并时：
- 属性合并时会将属性简单合并到一起，如果属性名称相同但类型不同则会报错；
- 方法合并时与函数重载一致；

#### 类合并：规则同接口合并

## 工程
### 代码检查
2019 年 1 月，TypeScirpt 官方决定全面采用 ESLint 作为代码检查的工具，并创建了一个新项目 `typescript-eslint`。弃用了之前的两种检查方案。

### 编译选项

## 参考链接 及 工具
[Typescript 入门教程](https://ts.xcatliu.com/)
[在线ts环境](http://www.typescriptlang.org/play/index.html)

