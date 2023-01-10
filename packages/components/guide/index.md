---
index: 0
text: 新手指导 Guide
componentIndex: 4
sidebarDepth: 2
---

# 新手指导 Guide

常用的操作按钮

## 演示


### 单步骤+标题+内容，按钮文字自定义
<demo src="./test/single.vue"  title="单步骤实现" ></demo>

### 多步骤+标题+内容，按钮文字自定义
<demo src="./test/multiple.vue"  title="多步骤" ></demo>

### 插槽使用
<demo src="./test/slot.vue"  title="插槽使用" ></demo>
## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| visible   | Boolean  | true/false                   | true  | 显隐控制 |
| step     | String  | single / multiple | single | 步骤类型，单步/多步骤                                                   |
| title     | String |                             | ""   | 步骤标题文字 ** 传入插槽时无效                                                |
| content  | String |                             | ""   | 内容文字    ** 传入插槽时无效                                       |
| singleText  | String |                             | "我知道了"   | 单步骤按钮文字 ** 传入插槽时无效  
| stepTip     | Object  |                               |    "{gi: 1,count: 1,jumptext: '跳过全部', nexttext: '下一步' }"     | 多步骤需要传入
| deviationLeft| Number  |                                          |    0     | 弹窗偏移量,上下弹出生效,正向右偏移，负向左偏移，设置后，偏移计算相对于上左或者下左
| deviationTop| Number  |                                          |    0     | 弹窗偏移量,左右弹出生效，正向下偏移。负向上偏移，设置后，偏移计算相对于左上或者右上
| deviationArrow| Number  |                                          |    0     | 弹窗三角偏移量，相对于触发器的左边或者上边位置
### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| close | (e: Event) | 我知道了 按钮点击回调，弹窗默认不关闭，需要手动修改visible 属性控制 |
| closeall | (e: Event) | 跳过全部 按钮点击回调，弹窗默认不关闭，需要手动修改visible 属性控制 | |
### Slot

| 名称    | 说明             |
| :------ | :--------------- |
| default | 按钮触发器 |
| guidtitle | 自定义标题 |
| guidcontent | 自定义内容 |
| guidstep | 自定义底部操作栏 |
