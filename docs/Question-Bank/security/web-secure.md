# 慕课实战：web前后端漏洞分析与防御

## Web安全

- 代码层面
- 架构层面
- 运维层面

本课程重点关注代码层面的安全问题，也会涉及少量架构层面的安全知识，不涉及运维层面的安全问题。


### 安全问题

- 用户身份被盗用
- 用户密码泄露
- 用户资料被盗取
- 网站数据库泄露
- ...

## 课程目录

- 跨站脚本攻击XSS
- 跨站请求伪造攻击CSRF
- 前端Cookies安全性
- 点击劫持攻击
- 传输过程安全问题
- 用户密码安全问题
- SQL注入攻击
- 信息泄露和社会工程学
- 其他安全问题


## 跨站脚本攻击XSS

#### XSS攻击原理

本来应该显示数据的位置，通过script标签变成了程序。
```html
<div>
    ${content}
</div>


<div>
    <script>
        alert(1)
    </script>
</div>
```

#### XSS攻击可以干啥坏事呢？

- 获取页面数据
    - 盗取用户数据
- 获取Cookies
    - 盗取用户密码和登录状态
- 劫持前端逻辑
    - 欺骗用户
- 发送请求
    - 发到攻击者自己的网站，盗取资料

#### XSS分类

- 反射型：url参数直接注入。
    - url参数中直接写script脚本，这个可能很明显会被用户看到，但攻击者可以轻易将其变换成「短网址」，短网址是乱码，就看不出来脚本标签了。

- 存储型：存储到DB后读取时注入





