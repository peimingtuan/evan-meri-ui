# 组件开发文档

### 常用资料

[组件库设计地址](https://www.figma.com/file/7kJJPGtvxmU20Kbx9rguxe/%E7%BB%84%E4%BB%B6%E4%BA%A4%E4%BA%92%E8%AF%B4%E6%98%8E?node-id=455%3A37360)
### 开发计划

组件名称|UX完成时间|开发完成时间|负责人
--|--|--|--
基础设计|2021.10.18|| 伍美玲
头像|2021.10.19| |裴明团
按钮|2021.10.24||  王莹
单选/复选|2021.10.25||  王莹
下拉菜单|2021.10.25||  王莹
开关|2021.10.25||  王敬云
抽屉|2021.10.29| 
选择器|2021.11.10|| 王莹
文件上传|2021.11.16|
通知|2021.11.23|
输入框|2021.11.26|
分页|2021.12.01||高铭
表格|2021.12.10|
日期选择|2021.12.24|
树|2022.01.01|

### 常用命令行

默认地址 http://localhost:3000/

```shell
pnpm run doc:dev // 运行开发中的文档
pnpm run build:docs // 构建文档
pnpm run dev // 启动开发项目
pnpm run build // 构建组件库
pnpm run push // 推送组件库到npn 仓库
```

### 目录接口简介

```
├── build
│   ├── clean.ts // 清理之前的构建的dist 包
│   ├── doc.ts   // 构建文档的gulp任务
│   ├── font.ts  // 构建字体文件的gulp 任务
│   ├── index.ts // 整体构建组件的任务
│   ├── less.ts  // 构建less 文件的任务，包含全局样式和按需加载的样式
│   ├── packages.ts // 复制当前 packages.json 到dist 的任务
│   ├── ts.ts    // 构建Ts,Tsx的gulp任务
│   └── utils    // 构建过程中常用的函数
│       ├── config.ts // 构建TS的配置以及输出的文件夹
│       ├── index.ts  // 公用函数
│       └── paths.ts  // 构建过程中常用的路径
├── dist  // 构建输出的文件夹
├── guide // 组件库文档的介绍
│   └── introduction.md
├── index.md  // 组件库文档的介绍
├── node_modules
├── package.json
├── packages 
│   ├── components  // 组件的内容文件
│   │   ├── button
│   │   │   ├── index.md
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   ├── Button.tsx
│   │   │   │   └── ButtonProps.ts
│   │   │   └── styles
│   │   │       └── index.less
│   │   ├── components.ts // 组件汇总暴露的文件
│   │   ├── index.ts  // 组件库全局安装文件
│   │   ├── shims.d.ts
│   │   └── utils // 组件开发过程中通用的函数
│   │       ├── position.ts
│   │       ├── types.ts
│   │       └── with-intall.ts
│   ├── static  // 静态资源文件夹
│   │   └── test.txt
│   └── theme // 组件库用到的公用样式以及字体文件
│       ├── fonts
│       │   ├── font.less  // 图标子图的文件样式
│       │   ├── iconfont.ttf
│       │   ├── iconfont.woff
│       │   └── iconfont.woff2
│       ├── index.less // 全局加载的样式
│       ├── styles
│       │   ├── base.less
│       │   ├── dark.less
│       │   └── default.less
│       └── theme.css // 主题的样式文件
├── play // 开发过程中使用的项目
│   ├── app.tsx
│   ├── app.vue
│   ├── index.html
│   ├── main.ts
│   ├── node_modules
│   ├── package.json
│   └── vite.config.ts
├── public
│   ├── avatar-default.png
│   └── ./logo.svg
├── readme.md
├── storage
├── tsconfig.json
└── vite.config.js
```


### 新建一个新的组件

1. 新建组件文件夹

```
mkdir packages/components/breadcrumb
```

2. 新建组件文件夹

```
mkdir packages/components/breadcrumb/styles
mkdir packages/components/breadcrumb/src
```

3. 添加入口文件

```
touch packages/components/breadcrumb/index.ts
touch packages/components/breadcrumb/styles/index.less
touch packages/components/breadcrumb/index.md
touch packages/components/breadcrumb/src/Notification.tsx
touch packages/components/breadcrumb/src/BreadcrumbProps.ts
```


1. 组件内容

packages/components/breadcrumb/src/Breadcrumb.tsx

```vue
import { defineComponent, h, ref, PropType, computed } from 'vue';
import { Disabled } from '../../utils/types';
import { } from "./BreadcrumbProps"

const BreadcrumbProps = {
    // 禁用
    disabled: {
        type: Boolean as PropType<Disabled>,
        default: false
    },
} as const;

const Button = defineComponent({
    name: "Breadcrumb",
    props: BreadcrumbProps,
    emits: ['click'],
    setup(props, { slots, attrs, emit }) {


        return () => {

            return (
                <h2>Hello World</h2>
            )
        }
    }
})
export default Button;
```

5. 样式文件

packages/components/breadcrumb/styles/index.less

```less
.m-breadcrumb {
    // 内容部分
}
```

6. 添加组件的入口文件

packages/components/breadcrumb/index.ts

```ts
import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Breadcrumb from './src/Breadcrumb'
export const MBreadcrumb: SFCWithInstall<typeof Breadcrumb> = withInstall(Breadcrumb)
export default MBreadcrumb;

export * from './src/Breadcrumb'
```

7. TS组件暴露到全局

packages/components/components.ts

```diff
export * from './avatar'
export * from './button'
export * from './checkbox'
export * from './icon'
export * from './radio'
+ export * from './breadcrumb'
```

8. 组件样式暴露到全局

packages/theme/index.less

```diff
// 获取每个组件的单独样式
@import '../components/avatar/styles/index.less';
@import '../components/button/styles/index.less';
@import '../components/icon/styles/index.less';
@import '../components/checkbox/styles/index.less';
@import '../components/radio/styles/index.less';
+ @import '../components/breadcrumb/styles/index.less';
```
### 文档管理
### 文档管理

> 文档使用markdown进行编辑，涉及到组件展示的地方使用全局组件demo

 - 插槽展示

```javascript
<demo  
  language="vue"
  title="Demo演示"
  desc="这是一个Demo渲染示例">  <m-avatar  size="small" src="/meri-plus/avatar-default.png"></m-avatar></demo>
```

 - 源文件展示

```javascript
<demo src="./test.vue"
  language="vue"
  title="Demo演示"
  desc="这是一个Demo渲染示例">
</demo>
```


### 样式管理

1. 每个组件的需要的样式必须只能暴露出一个当前组件类的作用域下,避免全局污染。

```less
.m-demo{

}
```

2. 开发组件用到的所有演示必须使用 'packages/theme/styles/base.less' 文件中的颜色变量（后期会通过var实现主题切换）。如果base.less 中的颜色不满足需求，请联系的wangying@persagy.com 进行添加。

3. 颜色更新：为了满足不同状态（hover,active,disable,focus）的下的颜色展示,扩展了基础颜色，详情见 'packages/theme/styles/default.less'
[颜色使用地址](https://www.figma.com/file/2ADxxmlFLlSOI8WReMknWN/%E3%80%90%E9%9B%86%E5%9B%A2%E6%A0%87%E5%87%86%E3%80%91Meri%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=73%3A2316)

提供了控制的颜色的less函数，详情见：packages/theme/tools.less

使用方式
```less
@import '../../../theme/tools.less';
// 素有按钮的标签
.m-button {
    // 在需要的位置下引用
    // 背景颜色
    .bg-blue();
    .bg-red();
    .bg-white();

    // 字体颜色
    .font-white();
    .font-gray();
    .font-blue();
    // 边框颜色
    .border-gray();
}
```




### 分支管理

1. 修复线上Bug 采用的 gitflow 分支的管理的方式进行管理。
2. 开发组件的过程中单独的拉取新的分支，开发完成后的进行对应的合并。

### API 参数定义

1. 需求来源的UX,跟UX确定所有组件需要的交互需求，根据可能出现的需求情况制定的对应的API 参数
2. 在组件中所有的DOM 事件触发，全部通过emits 暴露给外部，方便后期开发过程中事件未被暴露的情况

### 状态管理
1. 组件中禁止对传入的参数进行深拷贝
2. 视图的所有显示状态必须通过数据进行驱动

### z-index管理

特殊组件z-index需要固定

其他：使用utils里面的z-index.ts，里面的useZIndex方法会导出一个对象，其中initialZIndex代表初始值，currentZIndex代表累加过后的值，nextZIndex()方法代表下一个值

例如：

```javascript
import { useZIndex } from "utils/z-index";
style.['z-index'] = useZIndex().nextZIndex();
```

