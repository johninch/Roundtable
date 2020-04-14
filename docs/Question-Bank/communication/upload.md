# 文件上传实现

## 案例一：传统form标签借助iframe实现无刷新上传
#### 1. 刷新问题：
  - 由于form表单的提交会导致页面重定向，当我们点击选择文件，然后点击提交按钮后，当前页面重定向到了action所指定的页面；
  - 再加上目前很多处理文件上传的action都是基于微服务架构的RESTful接口，你会发现上传完成后，当前页面被刷新变成了action接口返回的数据！
#### 2. iframe实现无刷新：
  - *实际上，你可以将form的target指定为_blank，这样上传完成后的返回数据会打开新的页面显示，但这不符合现代浏览器交互*。
  - 在form旁边写一个iframe标签，指定id和name，然后**将form的`target`属性设置为这个`iframe的id`**，这样做的`目的`是**将form表单的提交目标指向这个iframe**，
  - 当提交表单之后，接口返回值便会显示在iframe里面，我们把iframe隐藏起来，iframe加载成功后会派发onload事件；
  - 因此，只需要为onload事件添加回调函数，读取iframe里面的内容，便可以得到当前上传后的接口返回值。
```html
<!-- 案例一：form标签实现无刷新上传文件 -->
<form
    method="POST"
    enctype="multipart/form-data"
    action="https://your.domain.com/upload"
    target="upload-iframe">
    <!-- input 必须设置 name 属性，否则数据无法发送；h5的multiple属性实现多文件选择 -->
    <input type="file" name="f1"  value="请选择文件" multiple />
    <button type="submit">提交</button>
</form>
<iframe style="display:none" onload="onLoad()" id="upload-iframe" name="upload">
</iframe>
<script>
function onLoad() {
    var iframe = document.getElementById("upload-iframe");

    // 解析content，分析上传接口返回值
    var content = iframe.contentWindow.document.body.innerText;

    // 接口数据转换为 JSON 对象
    var obj = JSON.parse(content);
    if(obj && obj.fileUrl.length){
        alert('上传成功');
    }
}
</script>
```

## 案例二：不写标签实现文件上传
模拟input标签和点击事件：
```js
var input = document.createElement("input"); // 模拟一个input标签
input.type = "file";
document.querySelector('body').appendChild(input); // 为了兼容性考虑
input.click(); // 代码执行到这里，本地文件选择框便会打开
setTimeout(() => {
  input.remove()
}, 1000)
// 浏览器出于安全的考虑，选择本地文件必须由用户行为触发
// 因此我们定义的函数也必须在用户事件（如click回调函数）里去调用
// input标签在每次选择了文件之后都会触发onchange事件
input.onchange = function () {
    var file = input.files[0]; // 如果只实现单文件上传，获取files下标为0的对象，file包括name、size、type等属性
    var fd = new FormData(); // FormData完全就是form标签的对象形式，方便用编程的方式去操作form了

    // // 多文件上传需要遍历添加到 fromdata 对象
    // for (var i = 0; i < fileList.length; i++) {
    //     fd.append('f1', fileList[i]); //支持多文件上传
    // }

    fd.append("file", file); // file参数是后台读取的请求key值
    fd.append("fileName", file.name);
    fd.append("other", "666666"); // 实际业务的其他请求参数

    var xhr = new XMLHttpRequest();
    var action = "http://localhost:8080/upload.do"; //上传服务的接口地址
    xhr.open("POST", action); // 必须是 post method
    xhr.send(fd); // 发送表单数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultObj = JSON.parse(xhr.responseText);
            //处理返回的数据......
        }
    }
}
```

## 案例三：大文件分片上传
`Blob`表示原始数据，也就是二进制数据，提供了对数据截取的方法`slice`，而`File`继承了`Blob`的功能：
- 核心是利用 `Blob.prototype.slice`方法（和数组的`slice`方法相似），调用的`slice`方法可以返回原文件的某个切片；
- 借助 `http 的可并发性`，同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间；
- 由于是并发，还需要给每个切片记录顺序；
- 服务端需要考虑`何时合并切片`（即切片什么时候传输完成），可以通过`前端增加一个请求，主动通知服务端进行切片的合并`；
- 服务端还需要考虑`如何合并切片`，可以使用 nodejs 的 `读写流`（readStream/writeStream），将所有切片的流传输到最终文件的流里，删除切片文件。

::: details 参考代码
```html
<div>
  <input type="file" @change="handleFileChange" />
  <button @click="handleUpload">上传</button>
</div>
<script>
  const SIZE = 10 * 1024 * 1024; // 10Mb 切片大小

  function handleFileChange(e) {
    const [file] = e.target.files;
    if (!file) return;

    this.container.file = file;
  };

  function async handleUpload() {
    if (!this.container.file) return;

    const fileChunkList = this.createFileChunk(this.container.file);

    // 在生成文件切片时，需要给每个切片一个标识作为 hash，这里暂时使用文件名 + 下标
    // 这样后端可以知道当前切片是第几个切片，用于之后的合并切片
    this.data = fileChunkList.map(({ file }，index) => ({
      chunk: file,
      hash: this.container.file.name + "-" + index // 文件名 + 数组下标
    }));

    await this.uploadChunks();
  }

  // 生成文件切片
  function createFileChunk(file, size = SIZE) {
  const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }

    return fileChunkList;
  };

  // 并发上传切片
  function async uploadChunks() {
    const requestList = this.data
      .map(({ chunk，hash }) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", this.container.file.name);
        return { formData };
      })
      .map(async ({ formData }) =>
        this.request({
          url: "http://localhost:3000",
          data: formData
        })
      );

    await Promise.all(requestList); // 并发切片

    await this.mergeRequest(); // 合并切片
  };

  // 主动通知合并
  function async mergeRequest() {
    await this.request({
      url: "http://localhost:3000/merge",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        filename: this.container.file.name
      })
    });
  };
</script>
```
:::



## 案例四：大文件断点续传
基于大文件上传的案例：
#### 1. 生成hash：
  - 之前使用`文件名 + 切片下标`作为`切片hash`，这样做文件名一旦修改就失去了效果，而事实上`只要文件内容不变，hash 就不应该变化`，所以正确的做法是根据文件内容生成 hash（使用库 spark-md5）；
  - 考虑到如果上传一个超大文件，`读取文件内容计算 hash 是非常耗费时间`的，并且会引起 `UI 的阻塞`，导致页面假死状态，所以可以使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互；
  - （此部分代码参考 略）在 worker 线程中，接受文件切片 fileChunkList，利用 FileReader 读取每个切片的 ArrayBuffer 并不断传入 spark-md5 中，每计算完一个切片通过 postMessage 向主线程发送一个进度事件，全部完成后将最终的 hash 发送给主线程；
#### 2. 文件秒传：
  - 所谓的文件秒传，即在服务端已经存在了上传的资源，所以当用户再次上传时会直接提示上传成功；
  - 文件秒传需要依赖上一步生成的 hash，即在上传前，先计算出文件 hash，并把 hash 发送给服务端进行验证，由于 hash 的唯一性，所以一旦服务端能找到 hash 相同的文件，则直接返回上传成功的信息即可。
#### 3. 断点（暂停）：
  - 原理是使用 `XMLHttpRequest` 的 `abort`方法，可以取消一个 xhr 请求的发送。需要将上传每个切片的 xhr 对象保存起来，上传成功时，将对应的 xhr 从 requestList 中删除。即`requestList 中只保存正在上传切片的 xhr`。
  - 之后新建一个暂停按钮，当点击按钮时，调用保存在 requestList 中 xhr 的 abort 方法，即取消并清空所有正在上传的切片。
#### 4. 续传（恢复上传）：
  - 服务端需要存储所有上传的切片，每次前端上传前可以调用一个接口`const { shouldUpload, uploadedList } = await this.verifyUpload()`，告知当前文件是否已经上传完成，已完成则是秒传，未完成时还需要获取当前已上传的切片列表，前端再跳过这些已经上传切片，并继续传剩下的切片，这样就实现了“续传”的效果；

## 案例五：文件上传进度
- `XMLHttpRequest` 原生支持上传进度的监听，只需要监听 `xhr.upload.onprogress` 即可。

## 案例六：拖拽上传

html5的出现，让拖拽上传交互成为可能：
- 定义一个允许拖放文件的区域`div.drop-box`；
- 取消`drop`事件的默认行为`e.preventDefault()`，不然浏览器会直接打开文件；
- 为拖拽区域绑定事件，鼠标在拖拽区域上 `dragover`，鼠标离开拖拽区域`dragleave`，在拖拽区域上释放文件`drop`；
- `drop`事件内获得文件信息`e.dataTransfer.files`。

::: details 拖拽上传
```html
<div class="drop-box" id="drop-box">
  拖动文件到这里,开始上传
</div>
<button type="button" id="btn-submit">上 传</button>
<script>
    var box = document.getElementById('drop-box');
    
    // 禁用浏览器的拖放默认行为，否则会直接打开文件
    document.addEventListener('drop', function(e) {
        e.preventDefault();
    });
   
    // 设置拖拽事件
    function openDropEvent() {
        box.addEventListener("dragover", function(e) {
            box.classList.add('over');
            e.preventDefault();
        });
         box.addEventListener("dragleave", function (e) {
            box.classList.remove('over');
            e.preventDefault();
        });

        box.addEventListener("drop", function (e) {
            e.preventDefault(); // 取消浏览器默认拖拽效果

            var fileList = e.dataTransfer.files; //获取拖拽中的文件对象
            var len=fileList.length;//用来获取文件的长度（其实是获得文件数量）
            
            //检测是否是拖拽文件到页面的操作
            if (!len) {
                box.classList.remove('over');
                return;
            }

            box.classList.add('over');

            window.willUploadFileList=fileList;

        }, false);
    }

    openDropEvent();

    function submitUpload() {
        var fileList = window.willUploadFileList||[];
        if(!fileList.length){
            alert('请选择文件');
            return;
        }

        var fd = new FormData();   //构造FormData对象

        for(var i = 0; i < fileList.length; i++) {
            fd.append('f1', fileList[i]); // 支持多文件上传
        }

        var xhr = new XMLHttpRequest(); // 创建对象
        xhr.open('POST', 'http://localhost:8100/', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var obj = JSON.parse(xhr.responseText);   // 返回值
                if(obj.fileUrl.length){
                    alert('上传成功');
                }
            }
        }
        xhr.send(fd); // 发送
    }

    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click', submitUpload);
</script>
```
:::

## 案例七：剪贴板上传
写文编辑器是支持粘贴上传图片的：
- 页面内增加一个可编辑的编辑区域`div.editor-box`，开启`contenteditable`；
- 为`div.editor-box`绑定`paste事件`；
- 处理`paste事件`，从`event.clipboardData || window.clipboardData`获得数据；
- 将数据转换为文件`items[i].getAsFile()`；
- 实现在编辑区域的光标处插入内容`insertNodeToEditor方法`。
::: details 剪贴板上传
```html
<div class="editor-box" id="editor-box" contenteditable="true" >
    可以直接粘贴图片到这里直接上传
</div>
<script>
  // 光标处插入 dom 节点
  function  insertNodeToEditor(editor,ele) {
      //插入dom 节点
      var range;//记录光标位置对象
      var node = window.getSelection().anchorNode;
      // 这里判断是做是否有光标判断，因为弹出框默认是没有的
      if (node != null) {
          range = window.getSelection().getRangeAt(0);// 获取光标起始位置
          range.insertNode(ele);// 在光标位置插入该对象
      } else {
          editor.append(ele);
      }
  }
  
  var box = document.getElementById('editor-box');
  //绑定paste事件
  box.addEventListener('paste', function (event) {
      var data = (event.clipboardData || window.clipboardData);

      var items = data.items;
      var fileList = [];//存储文件数据
      if (items && items.length) {
          // 检索剪切板items
          for (var i = 0; i < items.length; i++) {
              fileList.push(items[i].getAsFile());
          }
      }

      window.willUploadFileList = fileList;
      event.preventDefault();//阻止默认行为

      submitUpload();
  }); 

  function submitUpload() {
      var fileList = window.willUploadFileList||[];
      var fd = new FormData();
      for(var i = 0; i < fileList.length; i++) {
          fd.append('f1', fileList[i]);
      }
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8100/', true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              var obj = JSON.parse(xhr.responseText);   //返回值

              if(obj.fileUrl.length){
                  var img = document.createElement('img');
                  img.src= obj.fileUrl[0];
                  img.style.width='100px';
                  insertNodeToEditor(box,img);
              }
          }
      }

      xhr.send(fd);//发送
  }
</script>
```
:::


## 参考链接

- [纯js实现上传文件小工具](https://juejin.im/post/5e6b282e5188254955487e46)
- [字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed#heading-13)
- [写给新手前端的各种文件上传攻略，从小图片到大文件断点续传](https://juejin.im/post/5da14778f265da5bb628e590#heading-17)

