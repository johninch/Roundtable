# 解决回调地狱

> 解决回调地狱：实现一个函数，可以将异步函数转化成promise函数。

::: details 例子
例如：```node```中```fs```模块的读文件```API```: ```fs.readFile(path[, options], callback)```；写文件```fs.writeFile(path[, options], callback)```。

当我们要对a.txt文件进行读取，写入'hello world'，再读取b.txt并将b.txt内容追加到a.txt：
**调用原生API写法如下：**
```js
import * as fs from 'fs';

// 读取
fs.readFile('a.txt', (error, data) => {
    if (error) {
        console.error(error);

        throw error;
    }

    console.log(data);
    const dataBuffer = new Uint8Array(Buffer.from('hello world'));

    fs.writeFile('a.txt', dataBuffer, error => {
        if (error) {
            console.error(error);

            throw error;
        }

        fs.readFile('b.txt', (error, data) => {
            if (error) {
                console.error(error);

                throw error;
            }

            fs.writeFile('a.txt', data, error => {
                if (error) {
                    console.error(error);

                    throw error;
                }
                // 如果...
            })
        })
    })
})
```
**将API封装程Promise后到写法如下：**
```js
import * as fs from 'fs';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
   try {
        let data = await readFile('a.txt');

        console.log(data);

        const dataBuffer = new Uint8Array(Buffer.from('hello world'));

        await writeFile('a.txt', dataBuffer);

        data = await readFile('b.txt');

        await writeFile('a.txt', data);
   } catch (error) {
       console.error(error);
   }
})()
```
:::

## 推荐答案:

```js
const promisify = fnWithCallback =>
    (...args) => new Promise((resolve, reject) =>
        fnWithCallback(
            ...args,
            (err, result) => err ? reject(err) : resolve(result)
        )
    )
```

----

## febcat

```javascript
const promisify = fuc => (file, dataBuffer) =>
  new Promise(resolve =>
    if (dataBuffer) { // write
      fuc(file, dataBuffer, err => {
        if(err) {
          console.log('write error', err)

          throw error
        } else resolve()
      })
    } else { // reade
      fuc(file, (err, data) => {
        if (err) {
          console.log('read error', err)

          throw error
        } else resolve(data)
      })
    }
  )
```

## Xmtd

```js
let promisify = function (fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            })
        })
    }
};
```

## niannings

```js
const promisify = fnWithCallback =>
    (...args) => new Promise((resolve, reject) =>
        fnWithCallback(
            ...args,
            (err, result) => err ? reject(err) : resolve(result)
        )
    )
```
