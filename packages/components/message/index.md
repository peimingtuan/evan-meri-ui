---
index: 0
text: 全局消息 Message
sidebarDepth: 2
componentIndex: 2
---

### EventType 触发的事件

<demo src="./test/message.vue" langue="vue"  title="类型演示" desc="根据调用不同的方法实现的，样式待优化">
</demo>


### Attributes

| 名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| title | string | '' | '' | 消息内容 |
| type | string | success｜error｜Info｜default | customIcon | 消息类型 |
| customIcon | string | '' | 支持meri-icon内的icon | 自定义icon名称，仅在消息类型为customIcon生效 |
| showClose | boolean | -- | false | 是否显示关闭按钮 |
| duration | number | -- | 3000 | 时长 |
| className | string | -- | '' | 自定义类名 |
| shadowClick | boolean | -- | false | 点击蒙层是否关闭弹窗 |
| button | string | -- | default | 显示按钮、按钮显示名称 |



### Events

| 名称	 | 参数 |           说明       |
| :--- | :--- | :-------------------- | 
| buttonClick | function | 点击按钮时的回调|