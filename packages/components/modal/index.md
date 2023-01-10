---
index: 0
text: 对话框 Modal
sidebarDepth: 2
componentIndex: 2
---

# 对话框 Modal

常见状态的Modal

## 演示

###  (二次确认对话弹窗) Type 类型 info/error 

<demo src="./test/type1.vue" langue="vue"  title="type等于info和error是二次弹窗，可不要标题，也可以自定义底部" desc="宽度固定不用设置宽度">
</demo>

###  (确认框) 底部插槽用法以及esc按键的支持
<demo src="./test/type4.vue" langue="vue"  title="底部也是完全开放式的插槽" desc="底部内容自己插入">
</demo>

###  （居中对话框） deafult
<demo src="./test/type2.vue" langue="vue"  title="第一个弹窗高度不固定,距离视图上下各60，第二个高度固定可设置距离顶部距离" desc="内容和底部都以插槽方式插入">
</demo>

###  (全屏弹窗) full

<demo src="./test/type.vue" langue="vue"  title="全屏" desc="宽度固定不用设置宽度">
</demo>

## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| type     | String  | info / error / deafult/full                       | info  | 类型控制 |
| closeable     | Boolean  | true/false | false | 是否关闭按钮                                                   |
| v-model:visible  | Boolean |  true/false   |  默认关闭  |弹窗的打开和开起                                                 |
|  title | String |  '' |  默认值为空 |弹窗标题|
|  width | Number |  number | 640 |deafult类型弹窗的自定义宽度|
|  content | String |  '' |  默认值为空 |二次弹窗内容|
|  escable| Boolean| true/false|true|是否支持按键esc关闭  
|  topY| Number|0|true|距离顶部距离
### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| close | (e: Event) | 关闭回调 |

### Slot

| 名称    | 说明             |
| :------ | :--------------- |
| default | 任意内容插入 |
