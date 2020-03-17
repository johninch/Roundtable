---
title: ES6相比于ES5有什么不同
tags: [let, const, 块级作用域, 暂时性死区, 箭头函数, 模板字符串, 解构, 扩展, import, export, promise, class, extends, Set, Map, Proxy, Reflect]
categories: ES6
---

# ES6相比于ES5有什么不同

ECMAScript 5 (ES5): 第5个ECMAScript版本，于2009年标准化。该标准几乎所有的浏览器都完全支持。

ECMAScript 6 (ES6)/ECMAScript 2015 (ES2015):  第6个ECMAScript版本，于2015年标准化。。

## let 和 const

1. ES6共有`6`种声明变量的方法：
    - ES5 只有两种声明变量的方法：var命令和function命令。
    - ES6 添加了 let和const命令，import命令和class命令。

2. `块级作用域`：
    - `{}`被ES6用来**确定块级作用域**，只要代码块内存在let、const命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。即只在声明的块级作用域内有效。
    - 块级作用域的出现使得被广泛使用的立即执行匿名函数不再必要了。

    ::: tip 为什么需要块级作用域？
    ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景：
    1. 第一种场景，内层变量可能会覆盖外层变量。
    2. 第二种场景，用来计数的循环变量泄露为全局变量。
    :::

3. `暂时性死区`（因为`没有变量提升`）：
    - **原因**：let、const 没有声明提升的作用，这是导致“暂时性死区”的原因（ps：只有var和Function是函数级作用域，具有变量声明提升的作用）。
    - **定义**：在代码块内，使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
    - 只能在let、const声明之后使用变量或常量，在声明之前调用 变量/常量 就属于该 变量/常量 的“死区”，会报错。
4. 重复声明和赋值：
    - let定义变量，不能重复声明，而 var可以重复声明。
    - const定义常量，在定义时必须赋值，否则报错，且对于原始类型不能再修改，而对于Object类型（引用类型），可以修改堆内存空间中的存储值value，不能修改栈内存中的常量引用key：比如
    ```js
    const a = { b: 1}
    a.b = 2 // 修改值没问题
    a.c = 3 // 新增属性也没问题
    a = { d: 1} // 报 error，因为引用地址不能重新赋值
    ```

## 模板字符串 ``
- 无需+号拼接字符串，直接使用 ${variable} 就可直接输出；
- 输出不会紧挨着一行显示，会识别换行符。

## 函数传参
函数传参时可直接给定默认参数，在ES5中是不可以的。

## for-of操作
`for...of`语句用来迭代访问一个对象的所有属性。

## 字符串、对象、数组和函数的解构
```js
var [a, b] = [3, 8 ,10] // 数组解构 a为3 b为8
var [x, y, z] = "Vue"   // 字符串解构 x为V y为u z为e
var {m, n} = {n: 10, m: 20} // 对象解构 按照key对应拆分 m为20 n为10

function sum([x, y]) {
    return x + y
}
sum([2, 8]) // 函数参数解构
```

#### 练习题1

请指出该函数的执行结果：
```js
function foo({ a = 'a', b = 'b', c = 'c', d = 'd' } = { a: 1, b: 2 }) {
    console.log(a, b, c, d);
}
 
foo(); // 1 2 "c" "d"
foo({ a: 10, b: 11 }); // 10 11 "c" "d"
foo({ c: 10, d: 11 }); // a b 10 11
```

#### 练习题2

请指出以下代码的执行后，abcd分别是什么值：
```js
let { a: b, c: d } = { a: 1, b: 2, c: 3, d: 4};
 
a // a会报错，a is not defined
c // c会报错，c is not defined
b // 1
d // 2
```

## 扩展(spread)运算符 ...

- rest参数：当不确定参数个数时，可以使用...rest来表示
```js
let fn = (...m) => {console.log(m)};

fn(2, 3, 4, 7) // [2, 3, 4, 7]
```
- 扩展数组或对象：
```js
var arr3 = [...arr1, ...arr2];
var obj3 = { ...obj1, ...obj2 };
```

#### 解构和扩展运算结合
```js
var [x, ...y] = [4, 8, 10, 30] // x为4，y为[8, 10, 30]
var [x, y] = [4, 8, 10, 30] // x为4，y为8

var [a, b, c] = "ES6" // a为E b为S c为6
var z = [..."ES6"] // z为["E", "S", "6"]
```

## 箭头函数 =>
```js
var newArr = arr.map(item => item+2) // item 和 item+2 很简单时无需包裹
```
1. 函数体内的this对象就是`定义时所在的对象`，而不是使用时所在的对象（避免了ES5中var that = this操作）；
2. `箭头函数根本没有this`，所以**内部的this就是外层代码块的this**，因此不能用作构造函数。也就是说，`不可以使用new命令`，否则会抛出一个错误；
3. 不可以使用arguments对象，可以用rest参数代替；
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。

#### 为什么箭头函数没有this指向问题
箭头函数中，事件处理程序已经自动绑定到了组件实例上，这是由于在箭头函数的情况下，`this 是有词法约束力的，使用词法this绑定`。这意味它可以使用封闭的函数上下文或者全局上下文作为 this 的值。

## Promise

传送门：[异步编程（2）：Promise对象](/Question-Bank/execution/asynchronous-promise.md)

## ES6Module模块化：import & export

传送门：[JS模块化规范(5种)-5、ES6module](/Question-Bank/Engineering/js-module.html#_5、es6module)

## Symbol

传送门：[JS专题-变量与类型-(2)JS 3种疑难基础类型-不太熟的symbol类型](/Question-Bank/basic-grammar/variablesAndTypes2.html#不太熟的symbol类型)

## Set和Map数据结构
- ES6 提供了 Set数据结构 `Set 类似于数组`，但是成员的值都是唯一的，没有重复的值。
- ES6 提供了 Map数据结构。`Map 类似于对象`，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash结构实现。

## Proxy代理
ES6为了操作对象而提供的新API。

- Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
- Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
- ES6原生提供Proxy构造函数，用来生成Proxy实例： var proxy = new Proxy(target, handler)
    - Proxy对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象（有13种方法），用来定制拦截行为。

## Reflect
Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API。
Reflect对象的`设计目的`：
1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的`新方法将只部署在Reflect对象上`。
2. `修改某些Object方法的返回结果`，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
3. 让Object操作都`变成函数行为`。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。


## class 语法

ES6开始支持定义类（`class`关键字），构造函数（`constructor`关键字），和`extends`关键字来实现继承。

::: warning 默认严格模式
**类**和**模块**的内部，`默认就是严格模式`，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。ES6 实际上把整个语言升级到了严格模式。
:::

### constructor 构造方法
- 通过new命令生成对象实例时，自动调用该方法。
- 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被`默认添加`。
- constructor中的this就是实例对象。默认返回的也是this。

### 实例属性（两种写法）
- 定义在constructor()方法里面的this上面。
- 定义在类的最顶层（*ES7 提案*），这时不需要在实例属性前面加this。

### 类方法（原型方法）
类的所有方法都定义在类的prototype属性上面。
```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }
}

// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
};
```

::: details 类方法都是”不可枚举的“
注意：类中定义的内部方法都是”不可枚举的“，而采用ES5构造函数的写法时，是可枚举的：
```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype) // [] ES6中是不可枚举的
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```

ES5追加的原型方法都是可枚举的。
```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype) // ["toString"]，可枚举的
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```
:::


### 静态属性
`ES6 明确规定，Class 内部只有静态方法，没有静态属性`。因此只能将静态属性定义在类的外部，整个类生成以后，再生成静态属性（现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字）。
```js
class Foo {
}

// 静态属性 只能在 类的外部 追加
Foo.prop = 1;
Foo.prop // 1
```

*ES7 提案*中，可以使用 static 定义一个静态属性：
```js
class Animal {
    static num = 42;

    constructor() {
        // ...
    }
}

console.log(Animal.num); // 42
```


### 静态方法
- 在一个方法前，加上static关键字，就表示`该方法不会被实例继承`，而是`直接通过类来调用`，这就称为“`静态方法`”。
- 如果静态方法包含this关键字，这个this指的是类，而不是实例。
- 父类的静态方法，可以被子类继承。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
  static say() {
      this.classMethod();
  }
}

Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function

Foo.say() // 'hello'，指向类

class Bar extends Foo {
}
Bar.classMethod() // 'hello'，可被继承
```

### this指向问题
类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法（比如从实例中解构出来单独使用），很可能报错。
```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
关于JS中的this绑定，可详见传送门[JS执行机制-this指向问题](/Question-Bank/execution/context.html#this指向问题)。

解决方法主要有两类：在constructor中使用bind，或者使用箭头函数。具体可参考传送门[react类组件中处理this绑定的4种方法](/Question-Bank/react/react-handle-this.html)。



### 私有属性和私有方法

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。有利于代码的封装，但 ES6 没有提供。可用的解决方案如下：
#### 1. 将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```
上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。


#### 2. 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass {

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};


const inst = new myClass();

Reflect.ownKeys(myClass.prototype) // [ 'constructor', 'foo', Symbol(bar) ]
```
上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但其实，通过Reflect.ownKeys()依然可以拿到它们。

### 存取器 getter/setter
使用 getter 和 setter 可以改变属性的赋值和读取行为：
```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 类继承 extends/super

super可作为函数和对象两种方式使用，且使用方式完全不同：
#### 1. 作为函数，只能在constructor中使用
ES6 要求，`子类的构造函数必须执行一次super函数`（子类必须在constructor方法中调用super方法），如果不调用super方法，子类就得不到this对象，会报错。

**注意**：super虽然代表了父类A的构造函数，但是`返回的是子类B的实例`，即super内部的this指的是B的实例，

#### 2. 作为对象，使用在函数中
super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 作为函数使用，只能在子类constructor中 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 作为对象使用，调用父类的toString()
  }
}
```

**注意**：如果子类没有定义constructor方法，这个`方法会被默认添加`，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
::: details 默认给子类添加constructor和super
```js
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```
:::

#### ES6继承与ES5继承机制比较
- ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
- ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
