# JS中的奇技淫巧

## 位运算

### ^
js 运算符`^`意思：`异或运算`。

例如：`1^3 === 2`的解释如下：
- 因为 1的二进制表达为“0001”。
- 3的二进制表达为“0011”。
- 当1^3即运用`异或运算`，运算后的结果是“0010”，转换为十进制之后，即为“2”。

#### ^1：1与0互转
常用在：
- `1^1 === 0`
- `0^1 === 1`

### >>
js 运算符`>>`意思：`有符号右位移`，通过从左推入最左位的拷贝来向右位移，并使最右边的位脱落。

#### >>1：除2取整
```js
5 >> 1 // 2
4 >> 1 // 2
10 >> 1 // 5
9 >> 1 // 4
8 >> 1 // 4
```




## Math.max.apply
`Math.max(param1,param2...)`参数不支持数组，可以借助apply得到一个数组中最大的一项：
```js
var max = Math.max.apply(null, array)
```
```js
// 以下等价：
var max = Math.max(10, 20,30);   
var max = Math.max.call(null,10, 20,30); 
var max = Math.max.apply(null,[10, 20,30]);
var max = Math.max(...[10, 20,30]);
```

#### 数组快速求和
```js
args.reduce((x, y) => x + y);
```

## 进制转换 parseInt(s, m).toString(n)

#### parseInt与toString
- 进制转换：`parseInt(s, m).toString(n)`; 
    - 将`m`进制字符串`s`，转成`10`进制整数；
    - 再将此`10`进制整数，转换为`n`进制字符串。

- **parseInt(str, radix)**: 将str按照radix进制编码转换为10进制**返回对应数字** (radix支持 [2, 36] 之间的整数, 默认为10);
- **Number.toString(radix)**: 返回表示该数字的指定进制形式的**字符串** (radix支持 [2, 36] 之间的整数, 默认为10);

#### rgb颜色 转 16进制hex
'rgb(255, 255, 255)' => #ffffff
```js
var str = 'rgb(255, 255, 255)'

const rgbToHex = (str) => {
    return '#' + str.match(/rgb\((.+)\)/)[1]
        .split(/,\s/)
        .map(s => parseInt(s, 10).toString(16))
        .join('')
}

rgbToHex(str)
```


## 伪数组转换

#### 什么是伪数组
- 伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，但仍可用真正数组的遍历方法来遍历它们。
- 典型的伪数组有：函数的`arguments`参数，还有像调用getElementsByTagName、document.childNodes之类返回的`NodeList`对象都属于伪数组。

#### 转换方法
- 转换方法1：`Array.prototype.slice.call(fakeArray)`或者`[].slice.call(fakeArray)`；
- 转换法法2：使用ES6中`Array.from`；



## in 关键字的作用

JS 关键字 `in` 的使用方法：
#### 1、for...in 声明用于对数组或者对象的index或key进行遍历。
写法格式：for(var v in arrObj) {...}
- 当arrObj是`数组`时，v代表数组`index`;
- 当arrObj是`对象`时，v代表对象`key`;

#### 2、判断元素 是否为 数组的index 或 对象的key：
```js
var arr = ["a","2","str"];  
var result = ("str" in arr);  // false
var result1 = (2 in arr);   // true
var result2 = (3 in arr);   // false

var obj = { w:"wen", j:"jian", b:"bao"} 
var result = ('jian' in obj); // false   
var result1 = ("j" in obj);  // true
```

## b = a.filter(Boolean)

实际上，下面这样的写法是一种简写模式:
```js
b = a.filter(Boolean);
// 它等价于
b = a.filter(function (x) { return Boolean(x); });
```

ECMAScirpt5 中 Array 类中的 filter 方法使用目的是移除所有的 ”false“ 类型元素  (false, null, undefined, 0, NaN, '')：
```js
var a=[1,2,"b",0,{},"",NaN,3,undefined,null,5];
var b=a.filter(Boolean); // [1,2,"b",{},3,5]
Boolean 是一个函数，它会对遍历数组中的元素，并根据元素的真假类型，对应返回 true 或 false.

// 例如：
Boolean(0); // false
Boolean(true); // true
Boolean(1); // true
Boolean(""); // false
Boolean("false"); // true. "false"是一个非空字符串
```

## ['1', '2', '3'].map(parseInt)
返回 `[ 1, NaN, NaN ]`：
```js
parseInt('1', 0); // 0或省略时，以十进制转换
parseInt('2', 1); // radix不在2~36的返回NaN
parseInt('3', 2); // 二进制数没有3，只有0 1 ，所以NaN
```
- array.map(function(item,index,arr), thisValue):map返回一个经过函数映射的数组。item当前数组元素；index是当前元素索引；arr是数组本身；thisValue是可选值，对象作为该执行回调时使用，传递给函数，用作 'this' 的值，如果省略了 thisValue ，'this' 的值为 'undefined'。
- parseInt(str,radix):解析一个字符串，并返回一个整数。Str是输入字符串；radix是运算基数(进制)，可选值，介于`2到36之间`，如果省略该参数或其值为0，则数字将以10为基础来解析。如果它以“0x”或“0X”开头，将以16为基数。如果该参数小于2或者大于36，则parseInt()将返回NaN。

## 判断空对象

js判断空对象
#### 1. 将json对象转化为json字符串，再判断该字符串是否为'{}'
```js
var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//true
```

#### 2. for in 循环判断
```js
var obj = {};
var b = function() {
   for(var key in obj) {
      return false;
    }
    return true;
}
alert(b());//true
```

#### 3. Object.getOwnPropertyNames()方法
注意：此方法不兼容ie8，其余浏览器没有测试
```js
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//true
```

#### 4. 使用ES6的Object.keys()方法
与3方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组
```js
var data = {};
var arr = Object.keys(data);
alert(arr.length == 0);//true
```

## 数组方法 sort排序
不传排序规则函数时，默认是按照字符编码Unicode的顺序进行排序。
```js
arr.sort((a, b) => a - b) // 升序
arr.sort((a, b) => a.age - b.age) // 按属性升序
arr.sort((a, b) => b - a) // 降序
arr.sort(() => Math.random() < 0.5 ? 1 : -1) // 乱序
```

## 数组方法 slice与concat
`.slice(0)`与`.concat()`均不改变原数组，且均为**浅拷贝**，即副本仅为源数据的引用，当源数据的属性均为非引用类型时，浅拷贝也能像深拷贝一样达到主副对象属性隔离的目标，但当源数据属性为引用类型时，由于浅拷贝都是指针引用，则改变其一另一个也跟着变化。

## 字符串常用方法
- 字符方法：
    - charAt()，返回在指定位置的字符
    - charCodeAt()，返回在指定位置的字符的Unicode码
- 位置方法：
    - indexOf()
    - lastIndexOf()
- 删除首尾空格：
    - trim()
- 大小写转换方法：
    - toLowerCase()
    - toUpperCase()
- 字符串操作方法：
    - concat(),实际中用+号更方便
    - slice(1,4) 截取1到3的字符串，支持负值，传入负值与长度相加
	- substring(1,4) 截取1到3的字符串，不接受负参数
	- substr()的第二个参数指定返回字符数
- 字符串模式匹配方法：
    - match()
    - search()
    - raplace()
    - split()






