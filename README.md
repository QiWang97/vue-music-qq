# vue-music

# vue-music

## 项目介绍

### 关于技术

+ vue-cli 3 使用最新的 vue 语法
+ axios：发起请求
+ vue-router：管理单页面应用路由
+ sass ： css 预处理语言
+ es6 采用 es6 语法

### 关于数据

+ 分析 QQ 音乐网络请求自制的 api
+ db 分支使用 indexDB 存储页面数据，减少重复请求

### 关于功能

+ QQ音乐轮播图、推荐歌单、推荐电台

+ QQ音乐 搜索歌曲、歌手、电台

+ QQ音乐歌曲、电台详细信息

+ 播放功能


### 关于效果

> 以下效果使用 indexDB 存储数据，请切换 db 分支使用

![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/1.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/2.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/3.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/4.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/5.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/6.jpg)
![](https://github.com/QiWang97/vue-music-qq/blob/db/static/md/7.jpg)





### 关于结构

<pre>
├── public               // 不需要压缩的公共资源
├── package.json      		 // 项目配置文件
├── vue.config.js      // vue 配置文件，包括跨域设置
├── src                		 // 生产目录
│   ├── api       			// api请求
│   ├── assets              // 放置静态资源
│   ├── components     		// 各种组件
│   ├── views          		// 各个视图
│   ├── App.vue         	// 主页面
│   ├-─ router.js     		// 路由配置器
</pre>



## 运行项目

```
yarn install
yarn run serve
```

打包

```
yarn run build
```

一个模仿**QQ音乐移动端**的 vue 项目
数据来自分析 **QQ音乐**网络请求的接口
接口暴露在源码， 请勿商用！！

