---
index: 0
text: 头像 Avatar
componentIndex: 4
sidebarDepth: 2
---

# 头像 Avatar

头像可以用来代表人物或对象， 支持三种类型：图标、图片和字符

## 演示

### 大小

<demo src="./test/size.vue" langue="vue"  title="Demo演示" desc="可以通过size控制大小。
">
</demo>

### 圆角

<demo src="./test/radius.vue" langue="vue"  title="Demo演示" desc="可以通过radius控制大小。
">
</demo>

### 展示文字

<demo src="./test/text.vue" langue="vue"  title="Demo演示" desc=" 可以通过默认的插槽展示任何自定义内容，如果是文本，可以通过 color 控制颜色， bgColor 控制背景色， fontSize 控制字体大小。
">
</demo>

### 图标

<demo src="./test/icon.vue" langue="vue"  title="Demo演示" desc=" 可以通过默认的插槽展示任何自定义内容。也可以通过直接通过src引入图片">
</demo>

### 图片适应容器

<demo src="./test/fit.vue" langue="vue"  title="Demo演示" desc="当使用图片作为用户头像时，设置该图片如何在容器中展示。与object-fit属性一致">
</demo>

## API

### Attributes

| 名称     | 类型   | 可选值                                     | 默认值    | 说明                           |
| :------- | :----- | :----------------------------------------- | :-------- | :----------------------------- |
| type     | String | image / logo / text                        | image     | 图片、图标、文字               |
| iconName | String | 图标的icon名称                             |
| color    | String | 颜色名 / RGB / 十六进制 / hsl              | #8d9399   | 文本头像的颜色                 |
| bgColor  | String | 颜色名 / RGB / 十六进制 / hsl              | #eff0f1   | 文本头像的背景色               |
| fontSize | Number |                                            | 14        | 文本头像的大小                 |
| radius   | String |                                            | 100%      | 圆角大小                       |
| src      | String |                                            | undefined | 图片头像的资源地址             |
| size     | String | small / medium / large                     | undefined | 图片头像的大小                 |
| fit      | String | fill / contain / cover / none / scale-down | fill      | 头像的图片在容器内的的适应类型 |

### Events

| 名称    | 参数       | 说明                     |
| :------ | :--------- | :----------------------- |
| onError | (e: Event) | 图片类头像加载失败的回调 |

### Slot

| 名称    | 说明             |
| :------ | :--------------- |
| default | 头像内填充的内容 |
