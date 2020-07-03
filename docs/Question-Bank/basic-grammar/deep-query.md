---
{
    "title": "深度查询实现",
}
---

# 深度查询实现

> 实现lodash中的get方法：get(target, path, defaultValue)，深度查询一个数组或者对象中的值(数组和对象不止一层嵌套)，查询不到默认返回undefined。参照[lodash/._get](https://www.lodashjs.com/docs/latest#_getobject-path-defaultvalue)

```js
// example
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c'); // => 3
_.get(object, ['a', '0', 'b', 'c']); // => 3
_.get(object, 'a.b.c', 'default'); // => 'default'

```
----

## 推荐答案:

```js
function get (source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\S+)\]/g, '.$1').split('.').filter(key => key)
  // const paths = path.split(/[[\].]/g).filter(key => key); // 这里可以直接用正则 [[\].] 或匹配

  let result = source
  for (const p of paths) {
    // null 与 undefined 取属性会报错，所以使用 Object 包装一下
    result = Object(result)[p]

    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}

get(object, 'a[3].b', undefined);
```
<!-- ![object(undefined)](../../_media/md-images/object(undefined).png) -->
[相关链接]](https://juejin.im/post/5cd938135188250f21618765)

----

<details>
<summary>组员答案:</summary>

```js
function get (source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\S+)\]/g, '.$1').split('.').filter(key => key)
  // const paths = path.split(/[[\].]/g).filter(key => key); // 这里可以直接用正则 [[\].] 或匹配

  let result = source
  for (const p of paths) {
    // null 与 undefined 取属性会报错，所以使用 Object 包装一下
    result = Object(result)[p]

    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}

get(object, 'a[3].b', undefined);
```
<!-- ![object(undefined)](../../_media/md-images/object(undefined).png) -->
[相关链接]](https://juejin.im/post/5cd938135188250f21618765)

----

## febcat:

```javascript
const get = (obj, path, defaultBack= undefined) => {
    if (typeof obj !== 'object') {
        console.error(`get: require object, but ${typeof obj}`)
        return defaultBack
    }

    const rule = Array.isArray(path) ? path.join(',').replace(/\,/g, '.') : path
    const preRule = rule.replace(/\[(\d+)\]/g, (match, $1, index) => index ? '.' + $1 : $1).split('.')
    const nextRule = preRule.slice(1).join('.')
    const key = preRule[0]

    return obj.hasOwnProperty(key)
        ? nextRule
        ? get(obj[key], nextRule)
        : /(\[\])|(\{\})/g.test(JSON.stringify(obj[key]))
            ? defaultBack
            : obj[key]
        : defaultBack
    }
}
```
----

## Caleb:

``` javascript
var IsEmptys = value => {
  if(value === undefined || value === null || typeof value === 'object' && (Object.keys(value) && Object.keys(value).length === 0 || value.length === 0)){
    return true
  }
  return false
}

function get(target, rule){
  const formatRule = typeof rule === 'string' ? rule.replace(/\[|\]|\./g, '').split('') : rule;
  const len = formatRule.length;
  const returnValue = target[formatRule[0]];
  if(IsEmptys(returnValue)){
      return undefined;
  }

  if(len === 1){
      console.log('ooooo', returnValue)
      return returnValue
  }

  formatRule.shift();
  get(returnValue, formatRule);

}
```
----

## Xmtd:

```js
  function get(target, rule, defaultBack) {
    let ruleType = typeof rule === 'string' ? 'string' : Array.isArray(rule) ? 'array' : 'noSupport';

    if (ruleType === 'noSupport') {
      throw Error('no support rule');

      return;
    }

    let result = target;

    let nameArr = ruleType === 'string' ? rule.replace(/(\[|\]|\.)/g, ',').split(",").filter((item) => item) : rule;

    for (let i = 0; i < nameArr.length; i++) {
      if (result[nameArr[i]] !== null && result[nameArr[i]] !== undefined) {
        result = result[nameArr[i]];
      } else {
        result = defaultBack;
        break;
      }
    }

    return result;

  }
```
----

## niannings:

```js
const execExp = (state, exp, defaultBack = undefined) => {
  const keys = exp.split(/[[\].]/g).filter(key => key !== "");
  const flag = keys.length;
  let value = state;

  for (let i = 0; i < flag; i++) {
    value = value[keys[i]];

    if (value === undefined) {
      return defaultBack;
    }
  }

  return value;
};
```
</details>
