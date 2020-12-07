# IM 复盘

## IM 相关知识点

### Socket 和 WebSocket 有哪些区别和联系？

就像 Java 和 JavaScript，雷锋和雷峰塔一样，没有什么关系，是两个完全不同的东西。

**HTML5 定义了 WebSocket 协议**，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。
Websocket 使用 ws 或 wss 的统一资源标志符，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket。如：

```
ws://example.com/wsapi
wss://secure.example.com/
```

Websocket 使用和 HTTP 相同的 TCP 端口，可以绕过大多数防火墙的限制。默认情况下，Websocket 协议使用 80 端口；运行在 TLS 之上时，默认使用 443 端口。

`WebSocket 出现的目的：即时通讯，替代 HTTP 轮询。`

::: tip 从 HTTP 轮询 到 WebSocket

**(1) HTTP 轮询（polling），短轮询**
`Polling`：客户端发送一个 request，服务器不管有没有新消息，都会立即返回一个 response，然后关闭连接，这次 HTTP 请求结束。在 HTTP1.0 和 HTTP1.1 中都是这样，也就是说一个 request 只能有一个 response 对应。客户端需要不断执行这个请求过程(也就是轮询)，查询服务端有没有新的消息(数据)。

```
轮询场景：

Client：亲亲，有没有新消息(Request)
Server：木有（Response）
Client：亲亲，有没有新消息(Request)
Server：木有。。（Response）
Client：亲亲，有没有新消息(Request)
Server：好烦，没有。。（Response）
Client：那个。。有没有新消息（Request）
Server: 有啦，给你（Response）
Client：亲亲，有没有新消息（Request）
Server：。。没。。。没有（Response）
...
...
```

服务端不能主动联系客户端，只能有客户端发起。而且，HTTP request 的 Header 是很长的，为了传输一个很小的数据却占用了很多的带宽流量去传输 Header。可见，轮询需要服务器有很快的处理速度，且非常消耗资源，也不具备即时性。

**(2) 长轮询 (Long polling)**

`Long Polling` 是对 Polling 的改进，原理跟 Polling 相似，都是采用轮询的方式，不过 Long Polling 采取的是阻塞模型：客户端发起连接后，如果服务端没有新消息，就一直不返回 Response 给客户端。直到有新消息或者超时才返回给客户端，返回之后这次请求结束。客户端再次建立连接，重复这个过程。。。。

```
情景：
Client：亲亲，有没有新消息? 没有的话，等有了再给我吧 (Request)
Server：额。。。~~~ (1小时后) ~~~ 有新消息了，给你 (Response)
...
...
```

Long Polling 减小了 Polling 对网络宽带的消耗等问题，但缺陷也很明显：

- 假设服务器端的数据更新速度很快，服务器在传送一个数据包给客户端后必须等待客户端的下一个 Get 请求到来，才能传递第二个更新的数据包给客户端，那么这样的话，客户端显示实时数据最快的时间为 2×RTT（往返时间），而且如果在网络拥塞的情况下，这个时间用户是不能接受的，比如在股市的的报价上；
- 另外，由于 http 数据包的头部数据量往往很大（通常有 400 多个字节），但是真正被服务器需要的数据却很少（有时只有 10 个字节左右），这样的数据包在网络上周期性的传输，难免对网络带宽是一种浪费；- 而且 Long Polling 要求服务器具有高并发性，也就是同时接待大量客户端的能力。

**(3) WebSocket**

`Websocket 是一个应用层协议`，**它必须依赖 HTTP 协议进行一次握手**，握手成功后，数据就直接从 TCP 通道传输，与 HTTP 无关了。

Websocket 的数据传输是以 frame (帧) 形式传输的，比如会将一条消息分为几个 frame，按照先后顺序传输出去。这样做会有几个好处：

- 大数据的传输可以分片传输，不用考虑到数据大小导致的长度标志位不足够的情况。
- 和 HTTP 的 chunk 一样，可以边生成数据边传递消息，即提高传输效率。

```
情景：
Client：亲亲，我要建立WebSocket协议，需要的服务：chat，WebSocket协议版本:17 （HTTP Request）
Server：ok，确认，已升级为WebSocket协议 （HTTP Protocols Switched）
Client：麻烦你有新消息的时候推送给我哦。。
Server：ok，有的时候会告诉你的。
Server：balabalabalabala
Server：balabalabalabala
Server：我看到一个笑话，哈哈哈
Server：哈哈哈哈哈哈哈。。。。。
```

一个典型的 Websocket 握手请求如下：

```
客户端请求
GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: http://example.com
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13


服务器回应
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Location: ws://example.com/
```

:::

#### Socket

`Socket` 并不是一个协议，而是为了方便使用 TCP 或 UDP 而抽象出来的一层，是位于`应用层 和 传输控制层 之间的一组接口`。如果你要使用 HTTP 来构建服务，那么就不需要关心 Socket，如果你想基于 TCP/IP 来构建服务，那么 Socket 可能就是你会接触到的 API。

::: tip

HTTP 是轿车，提供了封装或者显示数据的具体形式；Socket 是发动机，提供了网络通信的能力。

:::

在设计模式中，Socket 其实就是一个门面模式，它把复杂的 TCP/IP 协议族隐藏在 Socket 接口后面，

对用户来说，一组简单的接口就是全部，让 Socket 去组织数据，以符合指定的协议。

### WebSocket 和 HTTP 有什么关系？

**相同点：**

WebSocket 和 HTTP 都是基于 TCP 的应用层协议，都是可靠性传输协议。

**不同点：**

- 本来就是两种完全不同的协议。。。
- 1.
  - WebSocket 是全双工协议，可以双向发送或接受信息，连接建立之后，通信双方都可以在任何时刻向另一方发送数据。
  - 而 HTTP 请求需要等待客户端发起请求服务端才能响应。
- 2.
  - HTTP 是**无状态协议**。每一次发送都是一次新的开始，所以每次都要重新传输 identity info (鉴别信息)，来告诉服务端你是谁。
  - Websocket 只需要一次 HTTP 握手，所以说整个通讯过程是建立在一次连接状态中，**是一种有状态的协议**，也就避免了 HTTP 的非状态性，服务端会一直知道你的信息，直到你关闭请求。这样之后通信时可以省略部分状态信息，避免了反复解析。
- Websocket 定义了二进制帧，相对 HTTP，可以更轻松地处理二进制内容。

**联系：**

为了创建 Websocket 连接，需要通过客户端发出请求，之后服务器进行回应，这个过程通常称为“握手”（handshaking）。

Websocket 通过 _HTTP/1.1 协议的 101 状态码_ 进行握手。

虽然 WebSocket 在握手的时候是通过 HTTP 进行的（为了兼容性考虑，也许以后 WebSocket 会有自己的握手方式），但也仅仅是这样而已，它们就是两种不同的应用层协议。

### WebSocket 和 HTML5 是什么关系？

HTML5 是指的一系列新的 API，或者说新规范，新技术。

而 WebSocket 就是 HTML5 中出的的一种协议。

### 什么是 长连接/短连接?

长/短连接 是针对 TCP 传输层的概念，也就是，**TCP 连接才有长/短连接之说**。

- `短连接`是指通讯双方有数据交互时，就建立一个 TCP 连接，数据发送完成后，则断开此连接，即每次连接只完成一项业务的发送。
- `长连接`指在一个 TCP 连接上可以连续发送多个数据包，在连接保持期间，如果没有数据包发送，需要 TCP keep alive。TCP keep alive 的两种方式：
  - _应用层面的心跳机制_，自定义心跳消息头： 一般客户端主动发送, 服务器接收后进行回应(也可以不回应)。
  - _TCP 协议自带的 keep alive_：打开 keep-alive 功能即可。具体属性也可以通过 API 设定。

::: warning 「TCP keep alive」的两种方式

- `TCP 自带的 KeepAlive`，通过探针，检测 TCP 连接的状态（可能会出现**连接活着但业务提供方已死的状态**）；
- 而 `应用层心跳机制` 有两个作用：一是检测 TCP 的状态保持，二是检测通讯双方（即业务方）的状态。

TCP 自带的 KeepAlive，为什么会出现连接活着但业务方已死的状态？

设想 🌰：某台服务器因为某些原因导致负载超高，CPU 100%，无法响应任何业务请求，但是使用 TCP 探针则仍旧能够确定连接状态，这就是典型的连接活着但业务提供方已死的状态。对客户端而言，这时的最好选择就是断线后重新连接其他服务器，而不是一直认为当前服务器是可用状态，一直向当前服务器发送些必然会失败的请求。

因此，KeepAlive 并不适用于检测双方存活的场景，这种场景还得依赖于应用层的心跳。应用层心跳有着更大的灵活性，可以控制检测时机，间隔和处理流程，甚至可以在心跳包上附带额外信息。从这个角度而言，应用层的心跳的确是最佳实践。

:::

#### 另外，HTTP 长连接 和 TCP 长连接有什么关系呢？

- TCP keep-alive 是一种检测连接状况的保活机制。
- 而 HTTP keep-alive 是 HTTP 协议的一个特性，目的是为了让 TCP 连接保持的更久一点，以便客户端/服务端在同一个 TCP 连接上可以发送多个 HTTP request/response。
  - HTTP keep-alive 又叫 HTTP 长连接（HTTP persistent connection）

### WebSocket 在哪些场景下使用？

- 社交聊天
- 视频会议/直播
- 协同编辑
- 弹幕
- 股票基金实时报价
- 基于实时位置的应用

[参考连接：有关（IM）即时通讯的基本概念](https://www.jianshu.com/p/4d421f79ef86)

## IM SDK Web v3 接入

IMEvent.ConversationChange 事件触发：比如 createMessage、createFileMessage、markConversationRead 等动作都会触发

XHR （XMLHttpRequest）就是短链使用的协议，WS（WebSocket）就是长链使用的协议

### 术语介绍

- UserId
  - 用户 Id，单个业务下用户有一个唯一的 Uid。
- ConversationShortId
  - 会话 Id，单个业务下每个会话(私聊/群聊等)有一个唯一的 ConversationShortId。
- ConversationId
  - 旧的会话 Id，目前只在私聊场景下解析会话双方的 uid，拼接规则为 InboxType:1:minUid:maxUid。其中 minUid 和 maxUid 是会话双方 uid 的较大值和较小值。例如 inboxType=0 uid1:12345 - uid2:12333。则 conversationId="0:1:12333:12345"。
- Token
  - 用户身份认证的凭证，客户端每次请求都携带该字段，服务端通过该字段做身份认证。
- AppId
  - 业务 Id,每个业务方会申请一个唯一的 AppId。
- 单链
  - 由单个会话所有历史消息的索引组成，可以通过一个 offset 向前或向后遍历，从而取出一段时间的消息索引，再通过索引得到消息内容
- 混链
  - 由单个用户所有历史消息的索引组成，可以通过一个 offset 向后遍历，从而取出用户最新的消息索引，再通过索引得到消息内容。
- Inbox
  - 类似邮箱，一个用户可以在 app 下拥有多个 Inbox，不同 Inbox 的数据完全隔离。主要用于 app 下多个 IM 子系统的拆分。
- Frontier 长连接
  - 维持长连接。通过 Websocket 协议接入；
  - 统一封装协议路由转发。Frontier 于 Websocket 消息之上 定义了一层应用层消息格式，如 service / method 等字段用于路由转发；
  - 连接发现。Frontier 会记录长连接位于哪个接入点，然后把来自具体业务服务的消息转发到相应的节点上；
  - 无状态。Frontier 最终都会把上行消息转发到无状态、单次收发的 Thrift 服务上，不要求后端服务维持长连接；
