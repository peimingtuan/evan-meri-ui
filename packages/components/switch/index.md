---
index: 0
text: 开关 Switch
componentIndex: 1
sidebarDepth: 2
---
# 开关Switch

## 基础用法

### size大小
<demo src="./test/size.vue" langue="vue"  title="大小演示" desc=" 可以通过size来设置switch大小">
</demo>

### disable状态
<demo src="./test/disable.vue" langue="vue"  title="禁用演示" desc=" 可以通过disabled来设置switch激活状态">
</demo>

### 切换
<demo src="./test/switch.vue" langue="vue"  title="切换演示" desc="可以通过beforeChange来设置switch加载中的回调">
</demo>

## API

### 属性

| 名称     | 类型    | 可选值        | 默认值    | 说明
| :------- | :----- | :------------| :-------- | :-------- |
| v-model(modelValue)  | String | checked / uncheck|  uncheck | 绑定的值
| size     | String | default / small|  default | 大小
| loading  | Boolean | true / false|  false | 加载中
| disabled  | Boolean | true / false|  false | 禁用
| beforeChange | function | 无 | 无 | switch状态改变前的钩子， 返回false或者返回Promise 且被reject则停止切换

### 事件

| 名称              | 参数               | 说明         |
| :---------------- | :----------------- | :----------- |
| change            | (s:State,e: Event) | 切换成功后的回调 |