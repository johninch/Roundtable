# 压测工具简单实践

本文通过使用 apache ab、wrk、autocannon 3 种便捷压测工具，来对接口性能做简单分析，以期了解压测评估标准与方法。

上述 3 种工具仅支持单机压测，其本身的定位，并不是用来取代 JMeter, LoadRunner 等专业的测试工具，而是便于开发者应付日常接口性能验证。

## 目标

假如，我们当前对于同一个 rpc 接口（OrderDetails）有两种调用方式：

- **方式 A** 是后端直接将 rpc 接口转成 Http 接口供前端调用；
- **方式 B** 是通过 nodejs 搭建 http-server（BFF），调用 rpc 接口后完成聚合编排供前端调用。

我们分别使用 apache ab 与 wrk 两种压测工具来对两种方式的 http 接口进行性能比较。

接下来我们首先来了解下，一些常见的性能衡量指标。

## 性能衡量指标

- `吞吐率（RPS, Requests per second）`：也可以叫 `QPS（Query Per Second）`，每秒请求数，近义词有 TPS(Transaction Per Second）每秒事务数。
  - 绝大多数情况下 QPS 等价于 TPS。
  - 吞吐率是服务器并发处理能力的量化描述，单位是 reqs/s，指的是在某个并发用户数下单位时间内处理的请求数。某个并发用户数下单位时间内能处理的最大请求数，称之为最大吞吐率。
  - 吞吐率是基于并发用户数的，不同的并发用户数下，吞吐率一般不同。
  - 吞吐率数值表示当前机器的整体性能，值越大越好。
- `请求等待时间：RT（Response Time），响应时间`。等价于 Latency。有平均延时和 Pct 延时，因为平均值不能反映服务真实响应延时，实际压测中一般参考 Pct99，Pct90 分位等指标。
- 并发连接数：某个时刻服务器所接受的请求数目。
- 并发用户数：某个时刻服务器所接受的请求用户数目。

其中吞吐率 QPS，使我们最关心的指标。

## apache ab

### ab 简介

> ab - Apache HTTP server benchmarking tool
>
> > ab is a tool for benchmarking your Apache Hypertext Transfer Protocol (HTTP) server. It is designed to give you an impression of how your current Apache installation performs. This especially shows you how many requests per second your Apache installation is capable of serving.

[ab](https://httpd.apache.org/docs/2.4/programs/ab.html) 是 apachebench 命令的缩写。ab 的原理：ab 的测试方式是基于 URL 的，ab 命令会创建多个并发访问线程，模拟多个访问者同时对某一 URL 地址进行访问。ab 命令对发出负载的计算机要求很低，它既不会占用很高 CPU，也不会占用很多内存。但却会给目标服务器造成巨大的负载，其原理类似 CC 攻击。自己测试使用也需要注意，否则一次上太多的负载。可能造成目标服务器资源耗完，严重时甚至导致死机。

::: warning

个人做测试的时候尤其需要注意：压测的目标是为了找出压测服务器的负载上限、性能瓶颈（**以资源消耗 70%为基准**）；

而不是盲目发起过多请求，消耗目标表服务器资源甚至宕机。这属于故意破坏他人计算机系统，严重情况下目标服务器公司会根据请求日志进行追责。

:::

### 安装和使用

命令 ab 为 apache 服务器自带工具。如果不想安装 apache 又要使用命令 ab，可以支架安装 apache 工具包 httpd-tools：

```bash
yum -y install httpd-tools
```

Mac 系统已经自带 ab，无需安装。

ab 的命令参数比较多，这里只介绍常用的参数和用法：

```bash
-n：requests，在测试会话中所执行的请求个数。默认时，仅执行一个请求。
-c：concurrency，一次产生的请求数，可以理解为并发数，默认是一次一个。
-t：timelimit，测试所进行的最大秒数, 可以当做请求的超时时间。默认时，没有时间限制。
-p：postfile，包含了需要POST的数据的文件。
-T：content-type，POST数据所使用的Content-type头信息。
```

- get 请求：`ab -n 1000 -c 10 -t 10 "testurl.com/get_user?ui…"`。这行表示**处理 1000 个请求并每次同时运行 10 次请求，超时时间为 10 秒**。
- post 请求：`ab -n 1000 -c 10 -t 10 -p post.json -T "application/x-www-form-urlencoded" "testurl.com/add_user"`，其中 post.json 是接口需要的 json 参数。

### 目标完成

```bash
# 方式A
ab -c 100 -n 100 https://api.testurl.net/internal/v1/order/detail\?_s\=1622983825122\&order_id\=6970511624989860652\&user_id\=2621662569459976
# 方式B
ab -c 100 -n 100 https://bff.testurl.net/internal/v1/order/detail\?_s\=1622985193790\&order_id\=6970598141146211116\&user_id\=2621662569459976
```

- 方式 A 测试结果：

```bash
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking api.testurl.net (be patient).....done


Server Software:        nginx
Server Hostname:        api.testurl.net
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES256-GCM-SHA384,2048,256
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        api.testurl.net

Document Path:          /internal/v1/order/detail?_s=1622983825122&order_id=6970511624989860652&user_id=2621662569459976
Document Length:        1116 bytes

Concurrency Level:      100
Time taken for tests:   1.799 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      186696 bytes
HTML transferred:       111600 bytes
Requests per second:    55.59 [#/sec] (mean)
Time per request:       1798.991 [ms] (mean)
Time per request:       17.990 [ms] (mean, across all concurrent requests)
Transfer rate:          101.35 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       66 1047  99.0   1056    1061
Processing:   138  297  47.0    300     539
Waiting:      132  297  47.2    300     539
Total:        204 1344 123.3   1356    1595

Percentage of the requests served within a certain time (ms)
  50%   1356
  66%   1368
  75%   1382
  80%   1387
  90%   1406
  95%   1409
  98%   1411
  99%   1595
 100%   1595 (longest request)
```

- 方式 B 测试结果：

```bash
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking bff.testurl.net (be patient).....done


Server Software:        nginx
Server Hostname:        bff.testurl.net
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES256-GCM-SHA384,2048,256
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        bff.testurl.net

Document Path:          /internal/v1/order/detail?_s=1622985193790&order_id=6970598141146211116&user_id=2621662569459976
Document Length:        1234 bytes

Concurrency Level:      100
Time taken for tests:   1.827 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      186898 bytes
HTML transferred:       123400 bytes
Requests per second:    54.74 [#/sec] (mean)
Time per request:       1826.885 [ms] (mean)
Time per request:       18.269 [ms] (mean, across all concurrent requests)
Transfer rate:          99.91 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       64  953 250.0   1026    1031
Processing:   107  370 198.5    343     916
Waiting:      107  370 197.7    343     911
Total:        238 1323 187.8   1328    1591

Percentage of the requests served within a certain time (ms)
  50%   1328
  66%   1391
  75%   1418
  80%   1529
  90%   1551
  95%   1576
  98%   1586
  99%   1591
 100%   1591 (longest request)
```

结果比较：
| 指标 | 含义 | 方式 A（api.testurl.net） | 方式 B（bff.testurl.net） |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------ | :----- | :----- |
| Concurrency Level | 并发用户数 | 100 | 100 |
| Complete requests | 总请求数量 | 100 | 100 |
| Failed requests | 失败请求数 | 0 | 0 |
| Requests per second | 吞吐率，也叫 QPS | 55.59 [#/sec](mean) | 54.74 [#/sec](mean) |
| Time taken for tests | 所有这些请求被处理完成所花费的总时间 | 1.799 seconds | 1.827 seconds |
| Time per request | 用户平均请求等待时间，即用户完成一个请求所需要的时间 | 1798.991 [ms](mean) | 1826.885 [ms](mean) |
| Time per requet(across all concurrent request) | 服务器完成一个请求的时间，是吞吐率的倒数 | 17.990 [ms] | 18.269 [ms] |
| Transfer rate | 网络传输速度 | 101.35 [Kbytes/sec] received | 99.91 [Kbytes/sec] received |
| Percentage of requests served within a certain time（ms） | 描述每个请求处理时间的分布情况，例如第一行表示有 50%的请求都是在 XXXms 内完成的 | 略 | 略 |
| Connection Times (ms) | 这几行组成的表格主要是针对响应时间也就是第一个 Time per request 进行细分和统计。一个请求的响应时间可以分成网络链接（Connect），系统处理（Processing）和等待（Waiting）三个部分。表中 min 表示最小值；mean 表示平均值；[+/-sd]表示标准差（Standard Deviation），也称均方差（mean square error），表示数据的离散程度，数值越大表示数据越分散，系统响应时间越不稳定。median 表示中位数；max 表示最大值。需要注意的是表中的 Total 并不等于前三行数据相加，因为前三行的数据并不是在同一个请求中采集到的，可能某个请求的网络延迟最短，但是系统处理时间又是最长的呢。所以 Total 是从整个请求所需要的时间的角度来统计的。 | 略 | 略 |

### ab 的优缺点

- 优点：
  1. 简单易用
  2. 支持 post 请求，接受 json 文件作为参数 （方便编写脚本批量测试）
  3. 压测量不大的情况下够用(1024 个并发以下)
- 缺点：
  1. 无法持续时间压测，无法控制速度压测
  2. 压测量起不来。主要是 ab 只能利用单个 cpu，只能是单进程，而系统限制每个进程打开的最大文件数为 1024，所以最多 1024 个线程，如果是多核 cpu，就浪费了这些资源。

## wrk

> wrk is a modern HTTP benchmarking tool capable of generating significant load when run on a single multi-core CPU. It combines a multithreaded design with scalable event notification systems such as epoll and kqueue.

[wrk](github.com/wg/wrk) 相比于 ab，可以在单机多核 CPU 环境下，能够使用系统自带高性能 I/O 机制：epoll(linux)，kqueue(mac)，通过多线程和事件模式更少的线程就制造出更大的并发。

### 安装和使用

```bash
# mac安装
brew install wrk

# 使用
Usage: wrk <options> <url>
  Options:
    -c, --connections <N>  保持的连接数（会话数）
    -d, --duration    <T>  压测持续时间(s)
    -t, --threads     <N>  开多少线程压测，用于控制并发请求速度。最大值一般是cpu总核心数的2-4倍

    -s, --script      <S>  指定Lua脚本路径（post请求写一些参数到脚本里）
    -H, --header      <H>  为每一个HTTP请求添加HTTP头
        --latency          在压测结束后，打印延迟统计信息
        --timeout     <T>  超时时间
    -v, --version          打印正在使用的wrk的详细版本信息

  Numeric arguments may include a SI unit (1k, 1M, 1G)
  Time arguments may include a time unit (2s, 2m, 2h)
```

- `wrk -t12 -c400 -d30s -T30s --latency www.baidu.com`；
- 上面这条命令的意思是用 12 个线程来模拟 400 个并发连接，整个测试持续 30 秒，连接超时 30 秒，打印出请求的延迟统计信息。
- **注意**：关于线程数，并不是设置的越大，压测效果越好，线程设置过大，反而会导致线程切换过于频繁，效果降低，一般来说，推荐设置成压测机器 CPU 核心数的 2 倍到 4 倍就行了。
- 关于长连接和短连接：apache bench 默认短连接，wrk`默认长连接`。wrk 如需测试短连接，可添加 -H “Connection:Close” 来关闭长连接。

```bash
Running 30s test @ http://www.baidu.com （压测时间30s）
  12 threads and 400 connections （共12个测试线程，400个连接）
			  （平均值） （标准差）  （最大值）（正负一个标准差所占比例）
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    （延迟）
    Latency   386.32ms  380.75ms   2.00s    86.66%
    (每秒请求数)
    Req/Sec    17.06     13.91   252.00     87.89%
  Latency Distribution （延迟分布）
     50%  218.31ms
     75%  520.60ms
     90%  955.08ms
     99%    1.93s（99分位的延迟：%99的请求在1.93s以内）
  4922 requests in 30.06s, 73.86MB read (30.06s内处理了4922个请求，耗费流量73.86MB)
  Socket errors: connect 0, read 0, write 0, timeout 311 (发生错误数)
Requests/sec:    163.76 (QPS 163.76,即平均每秒处理请求数为163.76)
Transfer/sec:      2.46MB (平均每秒流量2.46MB)
```

### 目标完成

```bash
# 方式A
wrk -t12 -c100 -d10s --timeout 10s --latency https://api.testurl.net/internal/v1/order/detail\?_s\=1622983825122\&order_id\=6970511624989860652\&user_id\=2621662569459976
# 方式B
wrk -t12 -c100 -d10s --timeout 10s --latency https://bff.testurl.net/internal/v1/order/detail\?_s\=1622985193790\&order_id\=6970598141146211116\&user_id\=2621662569459976
```

- 方式 A：

```bash
Running 10s test @ https://api.testurl.net/internal/v1/order/detail?_s=1622983825122&order_id=6970511624989860652&user_id=2621662569459976
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   214.70ms   59.26ms   1.24s    75.25%
    Req/Sec    30.81     14.86    80.00     68.26%
  Latency Distribution
     50%  216.80ms
     75%  244.90ms
     90%  275.73ms
     99%  350.28ms
  3652 requests in 10.09s, 6.50MB read
Requests/sec:    361.87
Transfer/sec:    659.60KB
```

- 方式 B：

```bash
Running 10s test @ https://bff.testurl.net/internal/v1/order/detail?_s=1622985193790&order_id=6970598141146211116&user_id=2621662569459976
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   287.70ms  111.24ms   1.22s    67.98%
    Req/Sec    24.61     14.93    80.00     60.31%
  Latency Distribution
     50%  280.15ms
     75%  358.75ms
     90%  430.48ms
     99%  583.87ms
  2704 requests in 10.10s, 4.82MB read
Requests/sec:    267.74
Transfer/sec:    488.63KB
```

### wrk2

[wrk2](https://github.com/giltene/wrk2) 是 wrk 的进化版，其号称能够提供稳定的吞吐量以及更精确的延时统计，反映到配置参数上就是 wrk2 增加了 --rate 参数用于设置吞吐量和--u_latency 参数用于显示不正确（统计学角度）的延时统计。

## autocannon

> A HTTP/1.1 benchmarking tool written in node, greatly inspired by wrk and wrk2, with support for HTTP pipelining and HTTPS. On my box, autocannon can produce more load than wrk and wrk2, see limitations for more details.

[autocannon](https://github.com/mcollina/autocannon)，fast HTTP/1.1 benchmarking tool written in Node.js，使用 node 编写的压测工具，能比 wrk 生成更多负载。

### 安装和使用

```bash
# 安装
npm i autocannon -g
npm i autocannon --save # or if you want to use the API or as a dependency:
```

常用参数：

```bash
-c/--connections NUM 并发连接的数量，默认10
-p/--pipelining NUM 每个连接的流水线请求请求数。默认1
-d/--duration SEC 执行的时间，单位秒
-m/--method METHOD 请求类型 默认GET
-b/--body BODY 请求报文体
```

使用方式：

1. 命令行使用与 wrk 类似：`autocannon -c 100 -d 5 -p 2 http://127.0.0.1:3000/test`；
2. api 调用 autocannon(opts[, cb]) 便于编写脚本。

### 目标完成

略

## 参考链接

- [ab 和 wrk 接口压测实践](https://juejin.cn/post/6844903962244579341)
- [apache.org](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [网站性能压力测试工具--apache ab 使用详解](https://www.cnblogs.com/linjiqin/p/9058432.html)
- [wrk 性能测试（详解）](https://www.cnblogs.com/l199616j/p/12156600.html)
- [对 node 工程进行压力测试与性能分析](https://juejin.cn/post/6844903665166188551)
