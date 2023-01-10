---
index: 0
text: 下拉菜单 Dropdown
componentIndex: 3
sidebarDepth: 2
---

# 下拉菜单 Dropdown

当你想触发一些操作的时候。

## 演示

### 基础用法

<demo src="./test/default.vue" langue="vue" title="下拉菜单的基础用法演示。">
</demo>

### 触发

<demo src="./test/trigger.vue" langue="vue" title="下拉菜单不同的触发方式。">
</demo>

### 显示箭头

<demo src="./test/showarrow.vue" langue="vue" title="显示箭头用法演示。">
</demo>

### 禁用选项

<demo src="./test/disable.vue" langue="vue" title="禁用选项用法演示。">
</demo>

### 自定义下拉菜单

<demo src="./test/defaultslot.vue" langue="vue" title="自定义下拉菜单用法演示。">
</demo>

### 分组下拉

<demo src="./test/array.vue" langue="vue" title="分组下拉用法演示。">
</demo>

### 可搜索下拉框

<demo src="./test/search.vue" langue="vue" title="可以搜索的下拉框用法演示。">
</demo>

### 使用插槽

<demo src="./test/slots.vue" langue="vue" title="可以自定义的用法演示。">
</demo>

### 溢出显示tip

<demo src="./test/tip.vue" langue="vue" title="文本溢出自动hover自动显示tip">
</demo>

## API

### Dropdown Props

| 名称       | 类型   | 可选值            | 默认值  | 说明 | 必须 |
| :--------- | :----- | :---------------- | :------ | :------------- | :------ |
| options | Array | [] | [] | 数据列表 | No
| text | String | any | - | 触发下拉菜单的文字内容 | No
| type | String | text \| button | text | 触发下拉菜单的类型，默认text | No
| trigger | String | hover \| click | hover | 触发的方式, 默认hover | No
| showArrow | Boolean | true \| false | false | 下拉框是否显示箭头 | No
| showSearch | Boolean | true \| false | false | 是否有可搜索下拉框 | No
| search \| v-model:search | String \| Number | - | '' | 搜索框绑定的值 | No
| modelValue \| v-model | Boolean | true \| false | false | 手动触发绑定的值 | No

### Options Attributes （options单个对象中的属性）

| 参数       | 类型   | 说明 |
| :--------- | :----- | :---------------- |
| label | String | 下拉操作项内容 (必须)|
| key | String | 下拉操作项唯一标识(必须) |
| disabled | Boolean | 下拉操作项是否禁用 |
| type | String | 分组下拉的类型（可选值divider） |
| divider | Boolean | 是否展示分割线 | 
| slotName | String | 每项插槽的名称 | 
### Dropdown 插槽

| 名称名  | 说明                        |
| :------ | :-------------------------- |
| empty | 空状态 |
| slotName | 每项插槽的名称 | 
### Dropdown Methods
| 名称     | 类型                 | 说明                   |
| -------- | -------------------- | ---------------------- |
| show | (status: boolean) => void | 下拉菜单展开的回调 |
| close | (status: boolean) => void | 下拉菜单关闭的回调 |
| change | (value: string, option: OptionType) => void | 选中值发生变化时触发 |