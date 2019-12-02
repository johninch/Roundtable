---
{
    "title": "diff 算法",
}
---
### 1.传统的diff算法为何是n^3
有新旧两个节点beforeNode, afterNode
+ 取新旧两个节点的最大长度来遍历对比(**for循环n^2**)
```javascript
let result = []; // 记录节点需要进行的操作
const diffNodes = function (beforeNode, afterNode) {
    // 获取较大节点树的长度
    let count = Math.max(beforeNode.children.length, afterNode.children.length);
    // 循环遍历进行新旧每个节点的对比(n^2)
    for (let i = 0; i < count; i++) {
        const beforeTag = beforeLeaf.children[i];
        const afterTag = afterLeaf.children[i];
         ...
    }
    return result;
}
```
- 分析情况做出相应操作
1. 第一种情况
```javascript
if (beforeNode === undefined) {
      result.push({ type: "add", el: afterTag }); // 旧的位置没有
}
```
2. 第二种情况
```javascript
if (afterNode === undefined) {
      result.push({ type: "remove", el: beforeTag }); // 旧的位置没有
}
```
3. 第三种情况
```javascript
if (beforeTag.tagName !== afterTag.tagName) {
      // 节点名改变时，删除 beforeTag 节点，添加 afterTag 节点
      result.push({ type: "remove", element: beforeTag });
      result.push({ type: "add", element: afterTag });
}
```
4. 第四种情况
```javascript
else if (beforeTag.innerHTML !== afterTag.innerHTML) {
      if (beforeTag.children.length === 0) {
          result.push({
              type: "changed",
              beforeElement: beforeTag,
              afterElement: afterTag,
              html: afterTag.innerHTML
          });
      } else {
          // 递归比较
          diffNodes(beforeTag, afterTag);
      }
}
```
+ 进行最后的最小操作数计算(**此时操作上升为n^3**)，我们大致简单理解一下，真实算法有兴趣可以自行查询[Trees Edit Distance](http://vldb.org/pvldb/vol5/p334_mateuszpawlik_vldb2012.pdf)
>[掘金react的diff 从O(n^3)到 O(n) ](https://www.zhihu.com/question/66851503/answer/246766239)

    最小操作就是计算更新为新的dom时所需要的最少步骤
```
Prev                               Last
          div                             div 
         / \                             / \ 
       ul   p     ====>            p   p
      /  \                             |    
    li   li                           text 
    |
   text
最优方式可以删除Prev的ul节点，再插入一个新的P节点，最后再p节点下插入text。总共三步。
```  
---

### 2. 优化的diff算法n
>[简书传统diff、react优化diff、vue优化diff](https://www.jianshu.com/p/398e63dc1969)  
>[react的diff](https://blog.csdn.net/sexy_squirrel/article/details/79801940)
>[vue的diff](https://www.cnblogs.com/wind-lanyan/p/9061684.html)

**React & Vue**

+ 两者都采用的是同级比较，且通过唯一的key值来比对。只需要对比同一key的dom，如果不同就不需要继续考虑子级别dom，所以复杂度为n。
- React短板在于ABCD=>DABC, 遵从lastIndex比对原则，newIndex < lastIndex则移动，否则不变，ABC会分别移动到D的后面，而不是D移动 
 
  到最前面，这就是性能浪费。

   > 1> 当前lastIndex为0，newVNode第一个为D，即nextIndex = 0，找到D在oldVNode中索引为3，即prevIndex = 3，prevIndex > lastIndex 不移动, nextIndex++，lastIndex = Math.max(lastIndex, prevIndex) = 3  
   2> nextIndex = 1, lastIndex为3，第二个为A，prevIndex = 0，prevIndex < lastIndex, 移动，nextIndex++, lastIndex = Math.max(3, 0) = 3  
   3> ...如此循环，直到循环结束  
   4> 判断oldVNode中并没有newVNode中没有的节点，不执行remove操作, 到此ABC都进行了dom操作

+ Vue采用了新旧虚拟dom的首尾对比阶段。即先进行新旧两种dom首尾四种比对，如果满足就进行操作。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较。
    
  1> 遍历生成虚拟dom
  ```javascript
    // body下的 <div id="v" class="classA"><div> 对应的 oldVnode 就是
    {
      el:  div  //对真实的节点的引用，本例中就是document.querySelector('#id.classA')
      tagName: 'DIV',   //节点的标签
      sel: 'div#v.classA'  //节点的选择器
      data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
      children: [], //存储子节点的数组，每个子节点也是vnode结构
      text: null,    //如果是文本节点，对应文本节点的textContent，否则为null
    }
    ```  
  2> 首先进行patch方法比对新旧Vnode，执行sameVnode方法比较，也就是比较是不是同一类型且属性不变
  3> sameVnode不通过就执行删除添加操作，通过执行patchVnode方法，oldVnode === vnode引用相同就视为不变，如果不同再比较text，text不同触发setTextContent 修改text，text相同只有oldVnode有子节点就执行remove操作，如果只有newVnode有子节点就执行add操作，都不满足就执行updateChildren方法，对子节点比对，这是核心diff
  4> oldStart，oldEnd，newStart，newEnd首尾两两比较，当oldStartIdx > oldEndIdx && newStartIdx > newEndIdx时就中断比较。
    
    > vue diff ABCD => DBA 从两侧向中间比对
    > 1.  oldStart = A, oldEnd = D, newStart = D, newEnd = A. oldStart匹配到newEnd，真实dom中A移动最后，
oldEnd匹配到newStart, 真实dom中D移动到最前面
    > 2.  oldStart = B, oldEnd = C, newStart = B, newEnd = B, oldStart匹配到newStart，真实dom中B不变，
    > 3.  newStartIdx++ 0->1->2，newEndIdx-- 为3->2->1, oldStartIdx++ 为0->1->2，oldEndIdx-- 为2->1->0，newStartInx > newEndIdx, 新的Vnode遍历结束，终止diff


    
- Vue在比对新旧节点时，如果两个节点是同一类型，但是仅仅只是属性发生变化，比如className，Vue会执行删除当前节点
添加新的节点的操作，而React只会更新相关的属性
    ```javascript
  // vue
  function sameVnode(oldVnode, vnode){
    //两节点key值相同，并且sel属性值相同，即认为两节点属同一类型，可进行下一步比较
    return vnode.key === oldVnode.key && vnode.sel === oldVnode.sel
  }
    ```

**Key的重要性**  

 key是实现diff优化操作的关键，假如没有key。ABCD=>DCBA 过程中，如果简单判断A和D，B和C，C和B，D和A比对后，就会进行四次dom替换，如果彻底比对就需要n^3复杂度。如果有key，只需要进行同key值判断就可以了。

---
End

参考链接：[传统diff、react优化diff、vue优化diff](https://www.jianshu.com/p/398e63dc1969)
