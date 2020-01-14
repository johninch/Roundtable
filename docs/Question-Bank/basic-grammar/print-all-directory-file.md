---
title: 打印树形目录结构
date: 2019-01-14 10:46:00
tags: [node, 算法]
categories: javascript
---

# 打印树形目录结构，node实现
## 方法一
```js
// 使用同步api实现，阻塞运行，性能不大好
const fs = require('fs');
const path = require('path');

const directoryLabel = '├── ';
const hierarchyLabel = '│   ';

function printDirectory(dir, deep = ""){
    const files = fs.readdirSync(dir, {encoding: 'utf-8'})
    for(let i = 0; i < files.length; i++){
        const childDir = path.resolve(dir, files[i]);

        console.log(deep + directoryLabel + files[i]);
        const stats = fs.statSync(childDir);
        if(stats.isDirectory()){
            printDirectory(childDir, deep + hierarchyLabel);
        }
    }
}

function printAllDirectory(dir){
    console.log(directoryLabel + path.basename(dir));
    printDirectory(dir, hierarchyLabel);
}

printAllDirectory('/Users/wuyongkun/Documents/test');
```
### 异步执行，有问题的方法
```js
// 异步执行有问题，没有按文件夹嵌套顺序打印
function printDirectory(dir, deep = ""){
    fs.readdir(dir, {encoding: 'utf-8'}, function(err, files){
        if(err) throw err;
        for(let i = 0; i < files.length; i++){
            const childPath = path.resolve(dir, files[i]);
            console.log(deep + directoryLabel + files[i]);
            fs.stat(childPath, function(err, stats){
                if(err) throw err;
                if(stats.isDirectory()){
                    printDirectory(childPath, deep + hierarchyLabel);
                }
            })
        }
    });
}
```

## 方法二
```js
// 异步化改造
function readDir(directory){
    return new Promise((resolve, reject) => {
        fs.readdir(directory, {encoding: 'utf-8'}, function(err, files){
            if(err) reject(err);
            resolve(files);
        });
    });
}

function isDirectory(path){
    return new Promise((resolve, reject) => {
        fs.stat(path, function(err, stats){
            if(err) reject(err);
            resolve(stats.isDirectory());
        })
    })
}

async function printDirectory(dir, deep = ''){
    const files = await readDir(dir, deep);
    for(const file of files){
        const childDir = path.resolve(dir, file);
        console.log(deep + directoryLabel + file);
        const isdirectory = await isDirectory(childDir);
        if(isdirectory){
            await printDirectory(childDir, deep + hierarchyLabel);
        }
    }
}

function printAllDirectory(dir){
    console.log(directoryLabel + path.basename(dir));
    printDirectory(dir, hierarchyLabel);
}

printAllDirectory('/Users/wuyongkun/Documents/test');
```