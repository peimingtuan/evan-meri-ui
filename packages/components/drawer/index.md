---
index: 0
text: 侧弹窗 Drawer
sidebarDepth: 2
componentIndex: 2
---


## 组件示例


### 主要功能

<demo src="./test/drawer.vue" langue="vue"  title="类型演示" desc="可关闭">
</demo>


### 组成

<demo src="./test/constitute.vue" langue="vue"  title="类型演示" desc="所有弹窗（居中弹窗和右侧侧拉窗）都是由标题区、内容区、操作区组成的。标题区固定吸顶，为常驻区；操作区固定吸底，不是常驻区，可以根据业务选择是否存在。">
</demo>


### 滚动

<demo src="./test/scroll.vue" langue="vue"  title="类型演示" desc="所有弹窗（居中弹窗和右侧侧拉窗）都是由标题区、内容区、操作区组成的。标题区固定吸顶，为常驻区；操作区固定吸底，不是常驻区，可以根据业务选择是否存在。">
</demo>




### 侧拉窗

<demo src="./test/side.vue" langue="vue"  title="类型演示" desc="点击表格和列表某一行则出现侧拉详情窗，点击其他行则展示对应行的详情；">
</demo>


### 按钮关闭

<demo src="./test/side1.vue" langue="vue"  title="类型演示" desc="只点击关闭按钮时才关闭弹窗">
</demo>

### 宽度

<demo src="./test/side2.vue" langue="vue"  title="类型演示" desc="宽度根据内容进行而且，但最小宽度240px，最大宽度960px">
</demo>

### 关闭Icon

<demo src="./test/icon.vue" langue="vue"  title="类型演示" desc="通过插槽自定义关闭按钮的图标">
</demo>

### Attributes

| 名称        | 类型    | 可选值     | 默认值 | 说明                                                                     |
| ----------- | ------- | ---------- | ------ | ------------------------------------------------------------------------ |
| modelValue  | boolean | false/true | false  | 是否显示，类型：boolean（v-model绑定）                                   |
| title       | string  | --         | ""     | 侧弹窗的标题(插槽优先级更高)                                             |
| show        | boolean | false/true | false  | 是否显示，类型：boolean                                                  |
| width       | string  | --         | 240px  | 可传入百分比/具体宽度                                                    |
| shadow      | boolean | --         | false  | 是否显示蒙层                                                             |
| shadowClick | boolean | --         | false  | 点击蒙层是否关闭弹窗，若设置没有蒙层时，点击区域外的内容也会导致弹窗关闭 |
| footFixed   | boolean | --         | true   | 底部是否固定                                                             |
| height  | string  | --         | 100%   | 弹窗高度（是否需要留出顶部栏）         |

### Events

| 名称  | 参数           | 说明                 |
| :---- | :------------- | :------------------- |
| close | (event: Event) | 关闭组件时触发的回调 |


### Slot
| 名称    | 说明           |
| :------ | :------------- |
| title   | 头部内容       |
| content | 内容           |
| icon    | 关闭按钮的Icon |
| handle  | 底部内容       |
 
