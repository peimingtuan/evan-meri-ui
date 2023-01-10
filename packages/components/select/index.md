---
index: 0
text: 选择器  Select
componentIndex: 1
sidebarDepth: 2
---

# 选择器 Select

当选项较多时，使用下拉菜单展示并选择内容。

## 基础用法

<demo src="./test/select.vue" langue="vue"  title="用法说明" desc="适用广泛的基础单选 v-model 的值为当前被选中的  item  的  id  属性值, 如果使用 template 风格则选中值为 m-option 的 value 属性值, 「选择内容需要滚动才可查看时，再次打开后会自动定位到已选内容」">
</demo>

## 搜索功能

<demo src="./test/search.vue" langue="vue"  title="用法说明" desc="searchable属性启用触发器搜索，默认情况下，Select 会找出所有 label 属性包含输入值的选项。 基于panelHeader插槽可以实现下拉面板中的搜索。">
</demo>

## 多选下拉

<demo src="./test/multiple.vue" langue="vue"  title="用法说明" desc="设置 multiple 属性开启多选模式, 通过 mode 属性控制回显风格, v-model 的值为已选项的 id 组成的数组, 如果是 template 风格则为 m-option 的 value 组成的数组">
</demo>

## 带分组的选择器

<demo src="./test/group.vue" langue="vue"  title="用法说明" desc="可以通过m-option-group 组件的label插槽自定义分组标题">
</demo>

## 带确认的选择器

<demo src="./test/confirm.vue" langue="vue"  title="带有确认取消按钮" desc="只有点击确定的时候, 数据才会回显, 点击取消会恢复上一次选择的状态">
</demo>

## 虚拟列表的选择器

<demo src="./test/virtual.vue" langue="vue"  title="用法说明" desc="通过 virtual 属性设置是否开启虚拟列表, 建议只有当数据量较大的时候开启虚拟列表,开启虚拟列表, 必须传入options属性">
</demo>

## 可自定义下拉列表宽度

<demo src="./test/width.vue" langue="vue"  title="用法说明" desc="size属性控制触发器的宽度, menuSize 属性自定义下拉列表宽度,支持预设的string类型和number类型, 如果只设置size, 默认下拉列表和触发器同宽">
</demo>

## 可自定义下拉列表内容

<demo src="./test/custom.vue" langue="vue"  title="用法说明" desc="下拉面板一共有default, panelHeader. panelFooter. empty 共4个插槽, 可以满足各种形式的自定义, 比如示例里的tab下拉, 用到了panelHeader插槽">
</demo>

## 自定义触发器

<demo src="./test/trigger.vue" langue="vue"  title="用法说明" desc="通过trigger插槽可以自定义整个触发器, 比如将触发器换成按钮">
</demo>

## API

### Attributes

| 名称               | 类型                 | 可选值                                                                      | 默认值                      | 说明                                                                  |
| ------------------ | -------------------- | --------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------- |
| modelValue/v-model | string/string[]      | --                                                                          | ''/[]                       | 绑定值, 单选是字符串, 多选是字符串数组                                |
| options            | Item[]               | --                                                                          | []                          | 下拉列表选项数组, item 类型`{id:string,name:string,disabled:boolean}` |
| disabled           | boolean              | --                                                                          | false                       | 禁用整个组件                                                          |
| prefix             | string               | --                                                                          | ''                          | 前置标签                                                              |
| clearable          | boolean              | --                                                                          | false                       | 是否可以清空                                                          |
| searchable         | boolean              | --                                                                          | false                       | 是否可以搜索                                                          |
| autoClearSearch    | boolean              | --                                                                          | true                        | 失去焦点后自动清空筛选                                                |
| multiple           | boolean              | --                                                                          | false                       | 是否多选                                                              |
| multipleLimit      | number               | --                                                                          | 0                           | 多选限制数量,0 为不限制,                                              |
| hasConfirm         | boolean              | --                                                                          | false                       | 当多选时, 是否需要确认取消按钮                                        |
| mode               | string               | 'multiple'&#124;'tags'                                                      | 'multiple'                  | 仅开启多选有效,显示模式为标签或者'已选择 XX                           |
| placeholder        | string               | --                                                                          | '请选择'&#124; '搜索或选择' | <br />                                                                |
| size               | number &#124; string | 'small' &#124; 'medium' &#124; 'large' &#124; 'auto'                        | "medium"                    | 设置触发器和下拉框的宽度                                              |
| menuSize           | number &#124; string | 'min'&#124; 'small' &#124; 'medium' &#124; 'large' &#124;'max'&#124; 'auto' | "medium"                    | 单独设置下拉框的宽度                                                  |
| maxScrollHeight    | number &#124;        | --                                                                          | --                          | 设置下拉菜单可滚动区域的最大高度                                      |
| maxTagCount        | number               | --                                                                          | 0                           | 最多显示多少个 ,0 表示不限制, tag 剩余的显示+n                        |
| maxTagTextLength   | number               | <br />                                                                      | 0                           | 最大显示的 tag 文本长度                                               |
| maxTagWidth        | number               | <br />                                                                      | 0                           | 最大 tag 宽度                                                         |
| placement          | string               | Flow                                                                        | --                          | 设定下拉框的弹出方向                                                  |
| virtual            | boolean              | --                                                                          | false                       | 是否开启虚拟列表                                                      |
| isShowEmpty        | boolean              | --                                                                          | undefined                   | 自定义显示空插槽                                                      |
| zIndex        | number              | --                                                                          | undefined                   | 设置下拉弹窗的z-index属性                                                      |

### Events

| 名称    | 回调参数                       | 说明                                   |
| ------- | ------------------------------ | -------------------------------------- |
| change  | (value: string&#124; string[]) | 绑定值变化时触发                       |
| search  | (value: string)                | 搜索输入框输入时触发                   |
| remove  | (value: Item)                  | tag 的移除事件, 返回被移除的 Item 对象 |
| clear   | --                             | clear 事件                             |
| blur    | --                             | blur 事件                              |
| focus   | --                             | focus 事件                             |
| confirm | value: string[]                | 当有确认按钮时, 点击确认按钮事件       |
| cancel  | value: string[]                | 当有确认取消时, 点击取消按钮事件       |

### Slots

| 插槽名      | 说明                                   |
| ----------- | -------------------------------------- |
| default     | 默认插槽可以自定义下拉面板             |
| prefix      | 跟属性 prefix 同名插槽, 自定义前置标题 |
| suffixIcon  | 自定义选择框后缀图标                   |
| clearIcon   | 自定义的多选框清除图标                 |
| trigger     | 自定义触发器                           |
| empty       | 当下拉列表为空时显示的内容             |
| panelHeader | 下拉框的 header                        |
| panelFooter | 下拉框的 footer                        |

### Function

| 方法名 | 说明                                   | 参数 |
| ------ | -------------------------------------- | ---- |
| focus  | 使选择器的输入框获取焦点, 并打开下拉框 | -    |
| blur   | 使选择器的输入框失去焦点, 并隐藏下拉框 | -    |

## OptionGroup 子组件

### Attributes

| 名称    | 类型    | 可选值 | 默认值 | 说明             |
| ------- | ------- | ------ | ------ | ---------------- |
| label   | string  | --     | ''     | 分组的标题       |
| divider | boolean | --     | true   | 分组是否加分割线 |

### Slots

| 插槽名 | 说明       |
| ------ | ---------- |
| label  | 自定义标题 |

## Option 子组件

### Attributes

| 名称     | 类型    | 可选值 | 默认值 | 说明                                        |
| -------- | ------- | ------ | ------ | ------------------------------------------- |
| value    | string  | --     | ''     | 选项的值,一般绑定 id 值                     |
| label    | string  | --     | ''     | 选项展示的值, 一般绑定 name                 |
| html     | string  | --     | ''     | 选项可以渲染 html 字符串, 优先级比 label 高 |
| disabled | boolean | --     | false  | 是否禁用该选项                              |
