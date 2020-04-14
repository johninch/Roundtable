# 关于Json

- Json是Js的对象表示法，是存储和交换文本信息的语法，类似XML，采用键值对的方式来阻止。
- 与XML相比，Json的长度更短小，读写速度更快，而且Json可使用Js的内置方法直接解析，非常方便。
	
## Json常用方法

- `eval()`: 可计算某个字符串，并执行其中的javascript表达式或要执行的语句。
    - 此方法很危险，不推荐使用，不仅解析字符串，还会执行Js里的方法。
- `JSON.parse()`: json字符串 => json对象。
- `JSON.stringify()`: json对象 => json字符串。
