/**
 * 数组去重
 */
function uniq(arr) {
  if (!arr || !arr.length) {
    return [];
  }

  let result = [];
  let i = 0;
  while (i < arr.length) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
    i++;
  }

  return result
}

console.log(uniq([0,0,2,1,1,2,3,4,2,1,1,2,2,2,3,3,4,4,5]))