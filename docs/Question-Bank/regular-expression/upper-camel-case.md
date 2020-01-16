# 使用正则表达式实现大驼峰字符串转换

例如，给定this-is-a-string，将其转换为 ThisIsAString

```js
//连接符转成驼峰写法
function toCamel(str) {
    var reg = /-(\w)/g;
    str = '-' + str
    return str.replace(reg, function() {
        return arguments[1].toUpperCase()
    });
}
console.log(toCamel("this-is-a-string")); // ThisIsAString

//连接符转成驼峰写法
function toCamel(str) {
    var reg = /-(\w+)/g;
    str = '-' + str
    return str.replace(reg, (match, letter) => {
        return letter.substring(0, 1).toUpperCase() + letter.substring(1);
    });
}
console.log(toCamel("this-is-a-string")); // ThisIsAString
```
