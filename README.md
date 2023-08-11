# 1. 前置准备

## 1.API文档

> 使用的是：网易云API文档

https://binaryify.github.io/NeteaseCloudMusicApi/

## 2.在GitHub拉取数据接口（后端）

https://github.com/Binaryify/NeteaseCloudMusicApi

## 3.启动后端服务

> 后端的安装步骤。

1. 在 NeteaseCloudMusicApi 安装依赖：**npm install**
2. 运行后端，启动服务：**node app.js**
3. 服务启动完成：http://localhost:3000 返回完成安装

# 2. 项目搭建

## 1. 框架选择

> 使用vue框架，完成前端搭建。

1. 使用vue-cli脚手架搭建项目。
2. 规划及分配好项目组件。

## 2. vant组件

> vant文档：https://vant-contrib.gitee.io/vant/#/zh-CN

**1. vant组件安装：npm install vant**
**2. 按需引入组件**（按需引入组件，vite，vue-cli，webpack引入的方式都不一样，根据需求引入，我是用的是vue-cli）。

```cmd
# 通过 npm 安装（vue-cli脚手架选择）
npm i unplugin-vue-components -D

# 通过 yarn 安装
yarn add unplugin-vue-components -D

# 通过 pnpm 安装
pnpm add unplugin-vue-components -D

```

**3. 配置插件**

> 按需引入的方式不一样，配置插件所对应的配置文件也是不一样的，注意看vant的文档。

```javascript
// vue-cli脚手架方式引入的配置文件，在 vue.config.js 文件中进行插件配置
module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};
```

**4. 引入组件**

> 引入组件，一般是全局引入，在main.js文件中进行引入。

1. 引入组件：import {Button} from 'vant'  
2. 使用组件：app.use(Button) 



## 3. 走马灯效果

1. 走马灯效果地址：https://www.npmjs.com/package/vue3-marquee







