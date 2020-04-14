# 关于babel

## 什么是babel
Babel: The compiler for writing next generation JavaScript。
- `babel`最开始的名字叫`6to5`，作用是把一些浏览器根本就不识别的代码，转换成浏览器识别的代码。
- `babel` 对于 `AST` 就相当于 jQuery 对于 DOM, 就是说`babel`给予了我们便捷查询和修改 `AST` 的能力。
    - 抽象语法树(`AST` -> Abstract Syntax Tree)：将程序用树状结构表示出声明、变量、函数等等。**是不同代码转换过程中的桥梁**。
    ![AST长什么样](./images/AST.png)

## 3步转换
为了转换代码，babel做了三件事：
- `Parser`：解析原有代码转换为AST。**(code => 旧AST)**
- `Transformer`：利用配置好的`plugins/presets`把`Parser`生成的AST转变为新的AST。**（旧AST => 新AST）**
- `Generator`：把转换后的新AST生成新的代码。**（旧AST => code）**

![babel 3步转换](./images/babel.png)

#### Parser 解析（步骤一）
解析步骤接收代码并输出 AST,这其中又包含两个阶段**词法分析**和**语法分析**。词法分析阶段把字符串形式的代码转换为 令牌（tokens）流。语法分析阶段会把一个令牌流转换成 AST 的形式,方便后续操作。

#### Transformer生成（步骤二*重点）
babel的最主要工作都集中Transformer上，即在把解析生成的AST经过`plugins/presets`然后去生成新的AST。babel拿到抽象语法树后会使用**babel-traverse**进行递归的**深度优先树状遍历**，并按照特定配置规则完成转换。

#### Generator 生成（步骤三）
代码生成步骤把最终（经过一系列转换之后）的 AST 转换成字符串形式的代码，同时还会**创建源码映射**（`source maps`）。代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

