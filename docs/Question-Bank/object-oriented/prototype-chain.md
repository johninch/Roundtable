---
title: 原型链与对象
tags: [构造函数, 实例, 原型对象, js对象]
categories: prototype
---

# 原型链与对象

## 创建对象的 3 种方法

1. 字面量方式

```js
var o1 = { name: "o1" };
var o11 = new Object({ name: "o11" });
```

2. 使用“构造函数”

```js
function M(name) {
	this.name = name;
}

var o2 = new M("o2");
```

3. 使用 Object.create

```js
var p = { name: "p" };

var o3 = Object.create(p);
```

::: details 手写实现 Object.create

```js
Object.create =
	Object.create ||
	function(obj) {
		var F = function() {};
		F.prototype = obj;

		return new F();
	};
```

:::

控制台输出：

![](./images/prototype-1-01.png)

- o1、o11、o3 都是 Object {}，o2 是构造函数 M {}；
- o3 相比于 o1 和 o11 又特殊在：Object.create 所创建的是一个空对象，传入的 p 是此空对象实例的原型对象，即 o3.**proto**指向 p; 所以 o3 本身是不具备 name 属性的，需要访问它对应的原型对象 p 上的 name 属性。

## 构造函数、实例、原型对象 间的关系

![关系图：构造函数、实例、原型对象](./images/prototype-2-01.png)

::: warning
**prototype（显式原型属性）**
**\_\_proto\_\_（隐式原型属性）**
:::

#### 解释

![](./images/prototype-2-02.png)

- M 是构造函数
- o2 是 M 的实例
- M.prototype 是 M 的原型对象
- 原型对象中有个 constructor 属性指向 M
- 实例 o2 中有个**proto**属性指向原型对象 M.prototype
- 注意：`对象(不管是实例对象还是原型对象)都有__proto__属性，但只有构造函数才有prototype属性`。
- 注意：`构造函数其实也是对象，是Function构造函数的实例对象，所以构造函数也有__proto__属性指向Function.prototype`：
  `js M.__proto__ === Function.prototype // true // 构造函数M是Function这个构造函数的一个实例。`
  ::: details 例题

```js
Function.prototype.a = () => alert(1);
Object.prototype.b = () => alert(2);
function A() {}

const a = new A();
a.a(); // 报错
a.b();
```

- a 是 A 构造的实例对象，`A.prototype === a.__proto__`，而`A.prototype.__proto__ === Object`，所以 a.b()能得到() => alert(2)；
- 但 a.a()是取不到的，会报错，并阻碍之后的输出，也就是说 a 根本不继承 Function 对象。
- `A.__proto__ === Function.prototype`，因此 A.a() 能取到。
  :::

::: details 类似的题

```js
var Person = function() {};

Object.prototype.a = "A";

Function.prototype.b = "B";

var p = new Person();
console.log(p.a); //A
console.log(p.b); //undefined
```

- Person 函数才是 Function 对象的一个实例，所以通过 Person.a 可以访问到 Function 原型里面的属性，
- 但是 new Person()返回来的是一个对象，它是 Object 的一个实例,是没有继承 Function 的，所以无法访问 Function 原型里面的属性。
- 但是,由于在 js 里面所有对象都是 Object 的实例，所以，Person 函数可以访问到 Object 原型里面的属性，Person.b => 'b'。
  :::

## 什么是原型链

### 定义

实例通过**proto**属性指向它对应的原型对象，此原型对象当中也有**proto**属性指向其对应的原型对象，这样一层层向上形成链式结构，直至`Object.prototype`原型对象便到达`原型链的顶端`。

### 原型链的工作原理

原型对象上的方法是被不同的实例所共有的，这就是原型链的作用。
也就是说，当一个实例在访问一个属性的时候，先在自身找是否存在此属性，如果没有就向上一级查询自己的原型对象，如果没有就继续向上一级查询原型对象，直到找到此属性或者到达原型链的顶端，这就是`原型链的工作原理`。

## new 运算符工作原理

### new 的工作步骤

- 步骤一：创建新实例对象 o，关联构造函数 M 的原型对象；
- 步骤二：执行构造函数 M，并绑定 M 的作用域上下文到新实例对象 o 上；
- 步骤三：判断步骤二中返回的 res 是否为(广义上)对象，如果是对象则抛弃 o 返回 res；如果不是对象则返回 o。

### 模拟实现 new 操作符

```js
var thisNew = function(M) {
	// Object.create()返回空对象o，并关联M的原型对象
	var o = Object.create(M.prototype);
	// 执行构造函数M，并绑定作用域到o上
	var res = M.call(o);
	// 判断res是否是广义上的对象，是则返回res，否则返回o
	if (res instanceof Object) {
		// 使用typeof不行，因为需要排除null的情况
		return res;
	} else {
		return o;
	}
};
```

验证模拟的代码是否能完成 new 运算符的功能：

![验证模拟new操作符](./images/prototype-4-01.png)

即使是再在 M 的原型对象上追加 run 方法，通过我们模拟的 thisNew 所创建的实例 o 也具备 run 方法。从而证明了 new 运算符背后的工作原理。
