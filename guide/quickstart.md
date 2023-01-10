### 快速上手

Meri Plus 致力于提供给程序员愉悦的开发体验。

> 在开始之前，推荐先学习 [Vue](https://vuejs.org/) 和 [ES2015](https://babeljs.io/docs/en/learn)，并正确安装和配置了 [Node.js](https://nodejs.org/en/) v14 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 的正确开发方式。如果你刚开始学习前端或者 Vue，将 UI 框架作为你的第一步可能不是最好的主意。

### 安装

我们建议您使用包管理器（如 [NPM](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/)）安装 meri Plus，然后您就可以使用打包工具，例如 Vite 或 webpack。

```sh
# 选择一个你喜欢的包管理器
# NPM
$ npm install meri-plus -S

# pnpm
$ pnpm install meri-plus -S
```

如果您的网络环境不好，建议使用相关镜像服务 [cnpm](https://github.com/cnpm/cnpm) 或 [中国 NPM 镜像](https://registry.npmmirror.com/)。

### 引入

如果使用 Vue 默认的模板语法，需要注册组件后方可使用，有如下三种方式注册组件：

#### 全局注册

```js
import { createApp } from 'vue';
import Meri from 'meri-plus';
import App from './App';

const app = createApp(App);

app.use(Meri).mount('#app');
```

### 全局部分注册

```js
import { createApp } from 'vue';
import { Button, message } from 'meri-plus';
import App from './App';

const app = createApp(App);

/* 会自动注册 Button 下的子组件, 例如 Button.Group */
app.use(Button).mount('#app');

app.config.globalProperties.$message = message;
```

### 局部注册组件
此种方式需要分别注册组件子组件，如 Button、ButtonGroup，并且注册后仅在当前组件中有效。所以我们推荐使用上述两种方式。


```js
<template>
  <m-button>Add</-button>
</template>
<script>
import {MButton} from "meri-plus"

  export default {
    components: {
      MButton
    },
  };
</script>
```