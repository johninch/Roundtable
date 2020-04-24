# 实现回到顶部效果

原生js返回顶部
## a标签锚点定位
`<a>`标签锚点定位，这是最简单的。（a标签的href属性等于要到达位置元素的id值，或使用a标签本身的name属性查找）
```html
<body>
    <!-- 设置锚点 -->
    <a href="#mark-1">跳转到区域一</a><br>
    <a href="#mark-2">跳转到区域二</a>
    <br><br><br><br><br><br><br><br><br><br><br><br> <br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
     <div id="mark-1">区域一</div>
     <!-- 如果要测试name效果，可以注销上面一段，然后点击锚点mark-2跳转到区域二 -->
     <a href=""  name="mark-2"></a><div>区域二</div>
</body>
```
上面只是跳转同一页面，如果要跳到另一个页面的锚点目标，就需要先跳转页面。例如a.html跳到b.html中，在a.html这样设置锚点：
```html
<a href="b.html#mark">跳到b页面</a>
```


## 根节点设置scrollTop为0
js直接设置，也无动画效果不好，注意兼容写法：
```js
// 兼容写法
document.body.scrollTop = 0；
document.documentElement.scrollTop = 0; 
```


## 设置动画效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        li { height: 100px;border-bottom: 1px solid #ccc; }
        #toTop {display: none;position: fixed;right: 20px;bottom: 20px; background: #ccc; border-radius: 5px;padding: 10px 15px;}
    </style>
</head>
<body>
    <div class="demo" style="height: 2000px;">
        <ul>
            <li>demo1</li>
            <li>demo2</li>
            <li>demo3</li>
            <li>demo4</li>
            <li>demo5</li>
            <li>demo6</li>
            <li>demo7</li>
            <li>demo8</li>
            <li>demo9</li>
            <li>demo10</li>
        </ul>
    </div>
    <div id="toTop">back</div>
</body>
</html>

<script>
　　 //  匀速返回 （定时器开启前速度已经计算好）
    var toTop = document.querySelector('#toTop')
    toTop.onclick = function(){
        var dom = document.querySelector('body');
        var h = dom.scrollTop;
        var subH = parseInt(h / 50);
        var timer = setInterval(function(){
            h -= subH;
            if(h <= 0){
                dom.scrollTop = 0;
                clearInterval(timer);
            }else{
                dom.scrollTop = h;
            }
        },1)    
    }
    window.onscroll = function(){
        if(window.pageYOffset>300){
            toTop.style.display = "block";
        }else{
            toTop.style.display = "none";
        }
    }
</script>
<script>
// 以下是变速效果
function goTop() {
　　// 由快到慢  （每次开启定时器都重新计算速度）
    timer = setInterval( function(){
        //获取滚动条的滚动高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //用于设置速度差，产生缓动的效果
        var speed = Math.floor(-scrollTop / 8);
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;//用纯数字赋值
        isTop =true;  //用于阻止滚动事件清除定时器
        if(scrollTop == 0){
            clearInterval(timer);
        }
    },50 );
}
</script>
```


