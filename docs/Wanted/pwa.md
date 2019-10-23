# Progressive Web Apps

> [渐进式 Web 应用（PWA）](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

> [什么是 PWA(lavas)](https://lavas.baidu.com/pwa/engage-retain-users/add-to-home-screen/introduction))

## Service Worker

> [service worker浏览器支持](https://jakearchibald.github.io/isserviceworkerready/)

> [register-service-worker 尤大的插件](https://github.com/yyx990803/register-service-worker)

依赖
  + Service Worker要求HTTPS 的环境，当然一般浏览器允许调试 Service Worker 的时候 host 为 localhost 或者 127.0.0.1 也是 ok 的。

    **注意：** 当地启动地址为172.0...这类的自然也无法获取到Service Worker

  - Service Worker 的缓存机制是依赖 [Cache API](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 实现的

  + 依赖 HTML5 fetch API 和 Promise

**注册Service Worker**

  > [为什么用load监听](https://developers.google.com/web/fundamentals/primers/service-workers/registration)

  ```javascript
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (registration) {

                // 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function (err) {

                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
  }
  ```

**安装Service worker**

  ```javascript
    // 监听 service worker 的 install 事件
    this.addEventListener('install', function (event) {
        // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
        event.waitUntil(
            // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
            caches.open('my-test-cache-v1').then(function (cache) {
                // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/main.css',
                    '/main.js',
                    '/image.jpg'
                ]);
            })
        );
    });
  ```

**响应请求**

  > clone的缘故是因为response读取即流失，如果不克隆赋值得到的就会是undefind

  ```javascript
  this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 来来来，代理可以搞一些代理的事情

            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {

                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open('my-test-cache-v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
  });
  ```
**版本更新**
  1. 可以在 install 事件中执行 self.skipWaiting() 方法跳过 waiting 状态，直接进入 activate 阶段。接着在 activate 事件发生时，通过执行 self.clients.claim() 方法，更新所有客户端上的 Service Worker。

  ```javascript
    // 安装阶段跳过等待，直接进入 active
    self.addEventListener('install', function (event) {
        event.waitUntil(self.skipWaiting());
    });

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            Promise.all([

                // 更新客户端
                self.clients.claim(),

                // 清理旧版本
                caches.keys().then(function (cacheList) {
                    return Promise.all(
                        cacheList.map(function (cacheName) {
                            if (cacheName !== 'my-test-cache-v1') {
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
            ])
        );
    });
  ```
  2. 借助 Registration.update() 手动更新。

  ```javascript
    var version = '1.0.1';

    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        if (localStorage.getItem('sw_version') !== version) {
            reg.update().then(function () {
                localStorage.setItem('sw_version', version)
            });
        }
    });
  ```
  3. 24小时没有更新，当Update触发时会强制更新。


**Server Worker的生命周期**

  + ***安装(installing)*** ：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。

    install 事件回调中有两个方法：

    event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。

    self.skipWaiting()：self 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态。

  - ***安装后( installed )*** ：Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。

  + ***激活( activating )*** ：在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。

    activate 回调中有两个方法：

    event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。

    self.clients.claim()：在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。

  - ***激活后( activated )*** ：在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。

  + ***废弃状态 ( redundant )*** ：这个状态表示一个 Service Worker 的生命周期结束。

  这里特别说明一下，进入废弃 (redundant) 状态的原因可能为install失败或者activating失败


---

## Web App Manifest

>manifest 的目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验。可以安装到设备的主屏幕的网络应用程序，而不需要用户通过应用商店，伴随着其他功能, 比如离线可用和接收推送通知。

>ios中暂时不支持？

+ 页面引入

```javascript
  // 旧的后缀
  <link rel="manifest" href="/manifest.json">
  // 新的后缀
  <link rel="manifest" href="/your.webmanifest">
```

- [webmanifest文件配置](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

+ 初始屏幕

  在Chrome 47及更高版本中，从主屏幕启动的Web应用程序将显示启动画面。 这个启动画面是使用Web应用程序清单中的属性自动生成的，具体来说就是：name，background_color以及icons 中距设备最近128dpi的图标。

---

## 架构

[App Shell 模型](https://developers.google.cn/web/fundamentals/architecture/app-shell)
