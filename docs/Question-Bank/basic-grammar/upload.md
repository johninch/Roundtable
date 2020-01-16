# 手写文件上传

## 方式一：form标签实现无刷新上传文件
```html
<!-- 方式一：form标签实现无刷新上传文件 -->
<!-- 由于form表单的提交会导致页面重定向，当我们点击选择文件，然后点击提交按钮后，
当前页面重定向到了action所指定的页面，再加上目前很多处理文件上传的action都是基于微服务架构的RESTful接口，
你会发现当前页面被刷新变成了接口返回的数据！在form下面写一个iframe标签，指定id和name，
然后将form的target属性设置为这个iframe的id，这样做的目的是将form表单的提交目标指向这个iframe，
当提交表单之后，接口返回值便会显示在iframe里面，我们把iframe隐藏起来，iframe每次加载成功后都会派发onload事件，
而上传文件接口的返回值指向了iframe会触发它的onload事件，因此我们只需要为onload事件添加回调函数，读取iframe里面的内容（接口返回值）即可。-->
<form method="POST" action="https://your.domain.com/upload">
    <input type="file" value="请选择文件" />
    <button type="submit">提交</button>
</form>
<iframe style="display:none" onload="onLoad()" id="upload" name="upload">
</iframe>
<script>
  function onLoad(){
    var frame = document.getElementById("upload");
    var content = frame.contentWindow.document.body.innerHtml;
    //解析content，分析上传接口返回值（略）
  }
</script>
```

## 方式二：js编程思路实现文件上传
```js
// 方式二：js编程思路实现文件上传
var input = document.createElement("input"); // 模拟一个input标签
input.type = "file";
document.querySelector('body').appendChild(input); // 为了兼容性考虑
input.click(); // 代码执行到这里，本地文件选择框便会打开
setTimeout(() => {
  input.remove()
}, 1000)
// 浏览器出于安全的考虑，选择本地文件必须由用户行为触发
// 因此我们定义的函数也必须在用户事件（如click回调函数）里去调用
input.onchange = function () {
    var file = input.files[0]; // 只实现单文件上传，因此我们获取files下标为0的对象，file包括name、size、type等属性
    var form = new FormData(); // FormData完全就是form标签的对象形式，方便用编程的方式去操作form了
    form.append("file", file); //第一个参数是后台读取的请求key值
    form.append("fileName", file.name);
    form.append("other", "666666"); //实际业务的其他请求参数
    var xhr = new XMLHttpRequest();
    var action = "http://localhost:8080/upload.do"; //上传服务的接口地址
    xhr.open("POST", action); // 必须是 post method
    xhr.send(form); //发送表单数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultObj = JSON.parse(xhr.responseText);
            //处理返回的数据......
        }
    }
}
```
