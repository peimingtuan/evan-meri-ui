---
index: 0
text: 单选框 radio
componentIndex: 1
sidebarDepth: 2
---

# 复选框 radio

常用的操作按钮

## 演示

### modelValue 状态

<demo src="./test/state.vue" langue="vue"  title="状态演示" desc="通过 modelValue 等于checked、uncheck来控制radio的状态。">
</demo>

### Disable 类型

<demo src="./test/disable.vue" langue="vue"  title="状态演示" desc="通过 Disable 控制radio的状态。">
</demo>

### v-model 类型

<demo src="./test/model.vue" langue="vue"  title="状态演示" desc="通过 v-model 控制组件的状态。">
</demo>

### size 尺寸

<demo src="./test/size.vue" langue="vue"  title="尺寸" desc="通过 size 控制组件的大小。">
</demo>


## API

### Attributes

| 名称       | 类型   | 可选值            | 默认值  | 说明           |
| :--------- | :----- | :---------------- | :------ | :------------- |
| modelValue | String | checked / uncheck | uncheck | 选中状态       |
| size       | number | 1-999             | 16      | 当前组件的大小 |

### Events

| 名称              | 参数               | 说明         |
| :---------------- | :----------------- | :----------- |
| click             | (s:State,e: Event) | 按钮点击回调 |
| change            | (s:State,e: Event) | 按钮点击回调 |
| update:modelValue | (s:State)          | 按钮点击回调 |
