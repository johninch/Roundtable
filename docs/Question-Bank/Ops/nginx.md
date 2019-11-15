### Nginx

> Nginx相关问题记录

----
#### 1、Nginx目录穿越漏洞

常见于 Nginx 做反向代理的情况，动态的部分被 proxy_pass 传递给后端端口，而静态文件需要 Nginx 来处理。

假设静态文件存储在 /home/目录下，而该目录在 url 中名字为 files ，那么就需要用 alias 设置目录的别名：

```json
location /files { alias /home/; }
```
此时，访问http://example.com/files/readme.txt， 就可以获取/home/readme.txt文件。

但我们注意到，url上/files没有加后缀/，而alias设置的/home/是有后缀/的，这个/就导致我们可以从/home/目录穿越到他的上层目录：

![目录穿越](./images/WX20191024-122130.png)

进而我们获得了一个任意文件下载漏洞。

> 如何解决这个漏洞？

只需要保证 location 和 alias 的值```都有```后缀/ 或```都没有```这个后缀。

