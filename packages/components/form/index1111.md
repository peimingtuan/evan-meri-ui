---
index: 0
text: 表单 Form
componentIndex: 1
sidebarDepth: 2
---

# 表单 Form

表单包含输入框、单选框、下拉选择、多选框等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 演示

### 基础用法

<demo src="./test/default.vue" langue="vue" title="最基础的表单">
</demo>

### 行内表单
当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 inline 属性为 true 可以让表单域变为行内的表单域。
<demo src="./test/inline.vue" langue="vue" title="行内表单">
</demo>

### 对齐方式

<demo src="./test/labelPosition.vue" langue="vue" title="对齐方式">
</demo>

### 表单校验

Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。 更多高级用法可参考  [async-validator](https://github.com/yiminghe/async-validator)。

<demo src="./test/rules.vue" langue="vue" title="对齐方式">
</demo>

### 动态表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

<demo src="./test/dong.vue" langue="vue">
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