# 一维数组中连续相同的数字转换成二维

例如：[1,1,2,3,3,3,3,4,5,5,5,6,6] 将被转换为 [[1,1],2,[3,3,3],4,[5,5,5],[6,6]]

## johninch
```js
function arrayTo2D(arr) {
  let tempArr = [],
    cur = arr[0],
    newArr = [];

  arr.forEach((item, i) => {
    if (item === cur) {
      tempArr = tempArr.concat(item);
    } else {
      tempArr.length > 1 ? newArr.push(tempArr) : newArr.push(tempArr[0]);
      cur = item;
      tempArr = [item];
    }
  });

  tempArr.length > 1 ? newArr.push(tempArr) : newArr.push(tempArr[0]);

  return newArr;
}

let a = [1, 1, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6];

console.log(arrayTo2D(a));
```
## Caleb
``` js
function to2D(arr) {
    if(!arr) return []
    if(arr.length<2) return arr
    let result = [];
    let temporateArr = [];
    for ( let i=0;i<arr.length;i++ ) {
        if (temporateArr.length === 0 ) {
            temporateArr.push(arr[i])
        } else if (temporateArr.includes(arr[i])){
            temporateArr.push(arr[i])
        } else {
            result.push(temporateArr.length>1? [...temporateArr] : temporateArr[0]);
            temporateArr = [arr[i]];
        }
    }
    if (temporateArr.length>0) {
      result.push(temporateArr.length>1? [...temporateArr] : temporateArr[0]);
    }
  return result
}
```

## superwyk
```js
function to2DArray(arr){
    let result = [];
    let i = 0, j = 1;
    while(j < arr.length){
        if(arr[i] === arr[j]){
            j++;
        } else {
            if(i + 1 === j){
                result.push(arr[i]);
            } else{
                result.push(arr.slice(i, j))
            }
            i = j;
            j++;
        }

        if(j === arr.length){
            if(i + 1 === j){
                result.push(arr[i]);
            } else{
                result.push(arr.slice(i, j))
            }
        }
    }

    return result;
}
```

## Febcat
``` js
const arrayTo2D = arr => {
  return [...new Set(arr)].map(item => {
    let filterTtem = arr.filter(i => i === item);

    return filterTtem.length !== 1 ? filterTtem : filterTtem[0];
  });
};

console.log(
  "arrayTo2D",
  JSON.stringify(arrayTo2D([1, 1, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6]))
);
```

## Mtd
```js
function arrayTo2D(arr) {
  let arr2D = [];
  let arr2Dindex = 0;

  let start = arr[0];
  let i = 1;
  let next = arr[i];
  let index = 0;

  while (index < arr.length - 1) {
    if (start === next) {
      if (!arr2D[arr2Dindex]) {
        arr2D[arr2Dindex] = [start, next]
      } else {
        Array.isArray(arr2D[arr2Dindex]) ? (arr2D[arr2Dindex].push(next)) : (arr2D[arr2Dindex] = [next, next])
      }
    } else {
      arr2Dindex++;
      arr2D[arr2Dindex] = next
    }

    index++;
    i++;
    start = next;
    next = arr[i];
  }

  return arr2D
}
```

## Wlxm
```ts
function composeArrRepeat(arr: any[]) {
    const ret = [];
    let len = arr.length;

    if (len < 2) {
        return [...arr];
    }

    let slider: any[];
    let p = 0;
    let q = 1;

    while (q <= len) {
        if (arr[p] !== arr[q]) {
            slider = arr.slice(p, q);

            if (slider.length < 2) {
                ret.push(...slider);
            } else {
                ret.push(slider);
            }

            p = q;
        }

        q++;
    }

    return ret;
}
```