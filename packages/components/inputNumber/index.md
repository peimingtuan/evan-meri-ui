---
index: 0
text: 数字输入框 InputNumber
componentIndex: 1
sidebarDepth: 2
---

# InputNumber 数字输入框

允许输入标准的数字值，可定义范围

## 演示

### 基础用法

<demo src="./test/index.vue" langue="vue"  title="Demo演示" desc="通过controls属性控制数字输入框的显示形式, controls不为rightButton时，可以通过step调整步进长度，默认为1 特别说明:rightButton需要传入对应的插槽内容才可显示"></demo>

### 禁用状态

<demo src="./test/disabled.vue" langue="vue"  title="Demo演示" desc="通过disabled属性可以禁用输入框，或者min和max显示最大最小输入值，禁用对应的操作按钮"></demo>

### 精度

<demo src="./test/precision.vue" langue="vue"  title="Demo演示" desc="通过precision可以调整数据的精度，默认精度为0"></demo>

### 大小

<demo src="./test/fix.vue" langue="vue"  title="Demo演示" desc="通过size来控制大小，默认是medium：32px">
</demo>

### 宽度

<demo src="./test/width.vue" langue="vue"  title="Demo演示" desc="通过width可以控制任意宽度的输入框，比如100%宽度">
</demo>

### 显示位置

<demo src="./test/textAlign.vue" langue="vue"  title="Demo演示" desc="通过textAlign调整数字的显示位置">
</demo>

### 错误提示

<demo src="./test/errorText.vue" langue="vue"  title="Demo演示" desc="通过errorText属性控制错误提示">
</demo>

## API

### Attributes

| 名称 | 类型 | 可选值                 | 默认值   | 说明 |
| :--- | :--- | :-------------------- | :----- | :----- |
| model-value / v-model | number / undefined   | —  |—  | 选中项绑定值|
| defaultValue|  number | —  |—  | 默认数字值|
| min | number   |  —  |-Infinity  |设置计数器允许的最小值|
| max | number   |  —  | Infinity  |设置计数器允许的最大值|
| step | number   |  —  | 1  |计数器步长|
| precision | number   |  —  |  0  |数值精度|
| disabled | boolean   |  —  |  false  |是否禁用计数器	|
| controls | string   | operator/rightButton/operatorIcon |  operator  |操作按钮的控制按钮		|
| placeholder | string   | — |  —  |输入框默认 placeholder		|
| textAlign | string   | left/center/right |  —  |数字的显示位置	|
| errorText | string   | — |  —  |错误提示文字	|
| size | string   | large/medium |  medium  |size大小	|

### Events

| 名称	 | 参数 |           说明       |
| :--- | :--- | :-------------------- | 
|change|(currentValue)|绑定值被改变时触发|
|blur|(event: Event)|在组件 Input 失去焦点时触发|
|focus|(event: Event)|在组件 Input 获得焦点时触发|
