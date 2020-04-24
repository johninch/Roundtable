---
title: JS的解释器过程
tags: [编译器, 解释器, AST, 抽象语法树]
categories: execution
---

# JS的解释器过程

## 编译器与解释器

### 能够将代码转化成AST的工具叫做「编译器」

简单来说，当一段代码经过编译器的词法分析、语法分析等阶段之后，会生成一个树状结构的“抽象语法树（AST）”，该语法树的每一个节点都对应着代码当中不同含义的片段。

比如将如下代码转换成AST：
```js
const a = 1
console.log(a)
```
::: details 对应AST结构
```json
{
  "type": "Program",
  "start": 0,
  "end": 26,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 11,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 11,
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "ExpressionStatement",
      "start": 12,
      "end": 26,
      "expression": {
        "type": "CallExpression",
        "start": 12,
        "end": 26,
        "callee": {
          "type": "MemberExpression",
          "start": 12,
          "end": 23,
          "object": {
            "type": "Identifier",
            "start": 12,
            "end": 19,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 20,
            "end": 23,
            "name": "log"
          },
          "computed": false
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 24,
            "end": 25,
            "name": "a"
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```
:::

- 常见的JS编译器有`babylon`，acorn等等，传送门网站自行体验[AST explorer](https://astexplorer.net/)。
- 可以看到，**编译出来的AST详细记录了代码中所有语义代码的类型、起始位置等信息**。这段代码除了根节点Program外，主体包含了两个节点VariableDeclaration和ExpressionStatement，而这些节点里面又包含了不同的子节点。
- 正是由于AST详细记录了代码的语义化信息，所以Babel，Webpack，Sass，Less等工具可以针对代码进行非常智能的处理。


### 能够将AST翻译成目标语言并运行的工具叫做「解释器」

JS 是解释性语言，所以它无需提前编译，而是由【解释器】实时运行的：
1. 读取代码，进行**词法分析**（Lexical analysis），然后将代码分解成`词元`（token）；
2. 对词元进行**语法分析**（parsing），然后将代码整理成`语法树`（syntax tree）；
3. 使用**翻译器**（translator），将代码转为`字节码`（bytecode）；
4. 使用**字节码解释器**（bytecode interpreter），将字节码转为`机器码`。最终计算机执行的就是机器码。

- 现代浏览器为提高运行速度，一般采用`即时编译（实时解释）`，即字节码只在运行到那行时才编译那一行，并且将编译结果缓存。
- 更先进的比如Chrome的`V8，省略了第三步翻译成字节码，直接转为机器码`，进一步提升了速度。
- 也正是由于上述优化，当前的JS引擎，很难说是到底是一个编译器还是一个解释器。

## 函数表达式与函数声明的区别
- 函数声明会有`声明提升`，解析器会先读取函数声明，使其在代码真正执行前可用;
- 函数表达式必须等到解析器执行到其所在行才会真正解析执行。

## 实现一个js解释器

[前端与编译原理——用JS写一个JS解释器](https://segmentfault.com/a/1190000017241258)
