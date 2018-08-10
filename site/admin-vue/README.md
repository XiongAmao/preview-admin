# admin

## 基础依赖

> 环境 Node LTS v8.11.3

- [Vue](https://cn.vuejs.org/)
- [vue-cli@3](https://cli.vuejs.org/) 基于webpack4 babel7，配置项在vue.config.js 可以参考vue官方文档配置
- [webpack4](https://webpack.github.io) 免配置工具
- [iview@2](http://v2.iviewui.com/docs/guide/install) ui框架，目前已更新到3版本

## Project setup

```bash
# install
npm install

# Compiles and hot-reloads for development
$ npm run serve

# Compiles and minifies for production
$ npm run build

# zip dist
$ npm run build:zip
```

## 结构
```shell
├── dist # 编译输出
|
├── config
│   └── url.js
|
├── mock # 开发环境mock工具，通过拦截dev-sever请求，模拟接口
│   ├── config.js
│   ├── index.js
│   └── test.js
|
├── public
│   ├── favicon.ico
│   └── index.html
|
├── src # 源文件
│   ├── api # 请求管理
│   │
│   ├── assets # 静态资源
│   │
│   ├── components # 公用组件
│   │
│   ├── layout # 放布局文件，比如后台的主框体
│   │
│   ├── libs # 库
│   │
│   ├── router # vue-router
│   │
│   ├── store # vuex
│   │   ├── index.js
│   │   ├── module # 分模块管理
│   │   └── plugin # vuex插件
│   │
│   └── views # 页面目录
├── vue.config.js # vue-cli@3 配置
|
├── babel.config.js # babel@7 配置

```
