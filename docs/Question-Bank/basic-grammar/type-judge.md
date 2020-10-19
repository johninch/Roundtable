# 类型转换判断

```js
4 + '5'; // '45'
4 + true; // 5
1 + 2 + '3' + 4; // '334'

0 == false; // true
0 == '0'; // true
0 == ''; // true
0 == null; // false
null == false; // false
[] == []; // false
[] == ![]; // true
[] == 0; // true
NaN == NaN; // false
0 == NaN; // false
1 === new Number(1); // false
1 instanceof Number; // false

typeof []; // object
typeof null; // object
typeof /1/; // object
typeof abc; // undefined
typeof NaN; // number
typeof new Boolean(true); // object
```

知识点参考传送门：[JS专题-变量与类型-(4)JS的类型转换](/Roundtable/Question-Bank/basic-grammar/variablesAndTypes4)
