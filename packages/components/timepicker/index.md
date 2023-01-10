---
index: 0
text: 时间选择器 TimePicker
componentIndex: 1
sidebarDepth: 2
---

# 单个时间选择


## 演示

### format 类型

<demo src="./test/format.vue" langue="vue"  title="format类型" desc="通过 format 来控制类型，支持的方式有 h/m/s/hm/ms/hms">
</demo>

### range 时间段

<demo src="./test/range.vue" langue="vue"  title="时间段选择" desc="通过 range 来控制开启时间段">
</demo>

### scopeTime 禁用部分时间，scopeTime范围代表可选时间范围

<demo src="./test/scope.vue" langue="vue"  title="禁用部分时间" desc="通过 `scopeTime` 控制可选范围。注意，传入的scopeTime时间格式需和format对应">
</demo>

### 刻度 目前只支持单个format得任意刻度

<demo src="./test/step.vue" langue="vue"  title="刻度演示" desc="通过 `stepH/stepM/stepS` ,为了支持后续扩展支持多个format刻度,此版本先预留参数。">
</demo>

### hideClear,disabled,placeholder，

<demo src="./test/default.vue" langue="vue"  title="其它属性演示">
</demo>


## API

### Attributes

| 名称       | 类型   | 可选值            | 默认值  | 说明           |
| :--------- | :----- | :---------------- | :------ | :------------- |
|  v-model   | string |  可为空,如果有初始值，需要按照HH:mm:ss格式传入，需要跟进对应得format传入对应得默认时间                 |         | 时间       |
| format     | string | h/m/s/hm/ms/hms    | hms      | 时间类型 |
| range      | boolean| true/false         | false    | 是否开启时间段 |
| scopeTime  | string |  "01:10:20-05:14:45"   需要按照HH:mm:ss格式传入，需要跟进对应得format传入对应得scopeTime               | ''      | 可选择的时间段 |
| placeholder| string |                 |     ''     | 占位符 |
| stepH     | number | 1-24    | 1      | 小时刻度 |
| stepM     | number | 1-60    | 1      | 分刻度 |
| stepS     | number | 1-60    | 1      | 秒刻度 |
| hideClear    | boolean |  true/false     | false      | 是否显示清空icon |
| errorText | string |    |       | 错误文本 |
| currentTime     | boolean | true/false      | false      | 下拉展开是否显示当前时间 |
### Events

| 名称              | 参数               | 说明         |
| :---------------- | :----------------- | :----------- |
| change            | (value: string) | 按钮点击回调 |
