# git bisect
git bisect：二分查找错误commit的命令。
```
$ git log --pretty=oneline // 共 101次提交，最早一次是4d83cf
$ git bisect start HEAD 4d83cf // $ git bisect start [终点] [起点],确定查找范围，启动查错，则会选择中间的第51次提交
$ git bisect good //第51次提交，刷新浏览器后表现正常，标记为正确，git会总动修改查错范围为51到head(101次)，选择中间的第76次提交查错
$ git bisect bad // 第76次提交,刷新浏览器后表现出错，标记为错误，git会总动修改查错范围为51到76次，重复以上过程，直到找到出问题的那次提交为止
b47892 is the first bad commit
$ git bisect reset // 退出查错，回到最近一次的代码提交
```

传送门：[阮大教程 git bisect](http://www.ruanyifeng.com/blog/2018/12/git-bisect.html)
