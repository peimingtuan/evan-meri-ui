---
index: 0
text: 消息通知 Notification
sidebarDepth: 2
componentIndex: 2
---

# 消息通知 Notification

## 演示


### 基本用法
<demo src="./test/basic.vue"  title="基本用法"  desc=" 默认情况下，通知在5000毫秒后自动关闭，但你可以通过设置 duration 属性来自定义通知的展示时间。 如果你将它设置为 0，那么通知将不会自动关闭。 需要注意的是 duration 接收一个 Number，单位为毫秒。"></demo>

### 不同类型的通知

<demo src="./test/type.vue"  title="基本用法" desc="我们提供了四种不同类型的提醒框：success、warning、info 和error。" ></demo>

### 自定义消息弹出的位置

<demo src="./test/position.vue"  title="基本用法" desc="使用 position 属性设置 Notification 的弹出位置， 支持四个选项：topRight、topLeft、bottomRight 和 bottomLeft， 默认为 top-right。" ></demo>

### 有位置偏移的通知栏

<demo src="./test/offset.vue"  title="基本用法" desc="Notification 提供设置偏移量的功能，通过设置 offset 字段，可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻，每一个的 Notification 实例应当具有一个相同的偏移量。" ></demo>


### 使用 HTML 片段作为正文内容

<demo src="./test/html.vue"  title="基本用法" desc="将 dangerouslyUseHTMLString 属性设置为 true，message 属性就会被当作 HTML 片段处理。" ></demo>


### 有操作按钮的通知栏

<demo src="./test/footer.vue"  title="基本用法" desc="自定义操作按钮,通过footer来传值,可通过type来定义按钮的类型,action为按钮的回调函数" ></demo>

## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  |  是否必填  |说明                                                       |
| :------- | :------ | :---------------------------------------| :------ | :------ |:--------------------------------------------------------- |
| title     | string  |      —            |  — | 是  |标题 |
| type     | string  |      success / info/ error / warning            |  — | 否  |通知类型 |
| content     | string/Vue.VNode  |      —            |  — | 是  |通知栏正文内容 |
| dangerouslyUseHTMLString     | boolean  |     true / false            |  false | 否  |是否将 content 属性作为 HTML 片段处理 |
| customClass     | string  |      —            |  — | 否  |自定义类名 |
| duration     | number  |      —            |   5000 | 否  |显示时间, 单位为毫秒。 值为 0 则不会自动关闭 |
| position     | number  |     topLeft / topRight / bottomLeft / bottomRight         |   topRight | 否  |自定义弹出位置 |
| showClose     | boolean  |     true / false            |  true | 否  |是否显示关闭按钮 |
| onClick     | function  |     —            |  — | 否  |点击 Notification 时的回调函数 |
| onClose     | function  |     —            |  — | 否  |关闭时的回调函数 |
| offset     | number  |     —            |   — | 否  |相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 |
| appendTo     | HTMLElement  |     —            |  document.body| 否  |设置通知栏在 DOM 中的父元素 |
| footer     | array[footerParams]  |     —            |  —| 否  |设置底部操作按钮 |

#### footerParams属性
| 名称     | 类型    | 可选值                                   | 默认值  |  是否必填  |说明                                                       |
| :------- | :------ | :---------------------------------------| :------ | :------ |:--------------------------------------------------------- |
| text     | string  |      —            |  — | 是  |按钮文本 |
| size     | string  |      large / medium / small            |  medium | 否  |按钮大小 |
| type     | string  |      default / primary / error / link / text            |  link | 否  |按钮类型 |
| action     | function  |      —            |  — | 否  |按钮点击后的回调close()可以关闭当前按钮 |
### Notification 方法

| 方法名    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| onClick | (Notification) | 关闭指定的 Notification |