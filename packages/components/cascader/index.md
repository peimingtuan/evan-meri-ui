---
index: 0
text: 级联选择 Cascader
componentIndex: 1
sidebarDepth: 2
---

# 级联选择器 Cascader


## 单选级联

<demo src="./test/cascader.vue" langue="vue"  title="单选级联选择" desc="v-model 的值为当前被选中的 item 的 id 属性值">
</demo>

<demo src="./test/disabled.vue" langue="vue"  title="禁用" desc="通过disabled设置禁用属性">
</demo>

<demo src="./test/trigger.vue" langue="vue"  title="触发方式" desc="支持click和hover两种触发方式">
</demo>

<demo src="./test/clearable.vue" langue="vue"  title="关闭清空" desc="通过clearable为false设置是否允许清空选中项">
</demo>

<demo src="./test/showAllLevels.vue" langue="vue"  title="选中结果只显示最后一级" desc="通过showAllLevels为false设置选中项只显示最后一级的标签，而不是选中项所在的完整路径">
</demo>



## 多选级联

<demo src="./test/multiple.vue" langue="vue"  title="多种回显风格" desc="设置multiple属性开启多选模式">
</demo>

## 配置支持搜索

<demo src="./test/filterable.vue" langue="vue"  title="是否支持搜索" desc="通过filterable为true支持搜索">
</demo>

## API

### Attributes

| 名称               | 类型                 | 可选值                                               | 默认值                      | 说明                                                                  |
| ------------------ | -------------------- | ---------------------------------------------------- | --------------------------- | --------------------------------------------------------------------- |
| modelValue/v-model | string/string[]      | --                                                   | ''/[]                       | 绑定值, 单选是字符串, 多选是字符串数组                                |
| options            | Item[]               | --                                                   | []                          | 下拉列表选项数组, item 类型`{id:string,name:string}` |
| disabled           | boolean              | --                                                   | false                       | 禁用整个组件                                                          |
| caption             | string               | --                                                   | ''                          | 前置标签                                                              |
| clearable          | boolean              | --                                                   | true                       | 是否可以清空                                                          | 
| multiple           | boolean              | --                                                   | false                       | 是否多选                                                              |
| showSelectCount    | boolean               |true/false                                            | true                     | 仅开启多选有效,是否仅仅显示选中数量                           |
| placeholder        | string               | --                                                   | '请选择'&#124; '搜索或选择' | <br />                                                                 |
| maxTagCount        | number               | --                                                   | 0                           | 最多显示多少个 ,0 表示不限制, tag 剩余的显示+n                        |
| trigger            | string               | click/hover                                        | click                       | 触发方式                                                      |

### Events

| 名称    | 回调参数                       | 说明                                   |
| ------- | ------------------------------ | -------------------------------------- |
| change  | (value: string&#124; string[]) | 绑定值变化时触发                       |
| removeTag  | (value: Item)              | tag 的移除事件, 返回被移除的 Item 对象 |
| clear   | --                             | clear 事件                             |
| blur    | --                             | blur 事件                              |
| focus   | --                             | focus 事件                             |

### Function

| 方法名 | 说明                                   | 参数 |
| ------ | -------------------------------------- | ---- |
| focus  | 使选择器的输入框获取焦点, 并打开下拉框 | -    |
| blur   | 使选择器的输入框失去焦点, 并隐藏下拉框 | -    |
