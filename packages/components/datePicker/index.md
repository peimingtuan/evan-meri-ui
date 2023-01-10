---
index: 0
text: 日期选择器 DatePicker
componentIndex: 1
sidebarDepth: 2
---
# 日期选择器DatePicker

## 基础用法

### 选择某一天
<demo src="./test/datePicker.vue" langue="vue"  title="" desc="以'天'为基本单位，基础的日期选择控件，通过type设置时间类型">
</demo>

### 选择某一月
<demo src="./test/monthType.vue" langue="vue"  title="" desc="选择月">
</demo>

### 选择某一年
<demo src="./test/yearType.vue" langue="vue"  title="" desc="选择年">
</demo>

### 禁用
<demo src="./test/disabled.vue" langue="vue"  title="禁用" desc="通过设置disabled属性，禁用选择器">
</demo>

### 关闭清空选中项
<demo src="./test/clearable.vue" langue="vue"  title="去掉清空按钮" desc="通过设置clearable为false，去掉清空按钮">
</demo>

### 自定义宽度
<demo src="./test/width.vue" langue="vue"  title="触发器宽度" desc="通过设置width属性设置触发器宽度">
</demo>

### 自定义提示文案
<demo src="./test/caption.vue" langue="vue"  title="提示文案" desc="通过设置placeholder和caption属性，设置提示文案">
</demo>

### 选择范围（天）
<demo src="./test/dateRange.vue" langue="vue"  title="" desc="以'天'为基本单位，选择范围">
</demo>

### 选择范围（月）
<demo src="./test/monthRange.vue" langue="vue"  title="" desc="以'月'为基本单位，选择范围">
</demo>

### 选择范围（年）
<demo src="./test/yearRange.vue" langue="vue"  title="" desc="以'年'为基本单位，选择范围">
</demo>

### 选择日+时间点
<demo src="./test/dateTime.vue" langue="vue"  title="" desc="选择年月日+时间点">
</demo>

### 选择范围（时间点）
<demo src="./test/datetimerange.vue" langue="vue"  title="" desc="时间点+区间">
</demo>

## API

### Attributes

| 名称               | 类型                 | 可选值                                               | 默认值                      | 说明                                                                  |
| ------------------ | -------------------- | ---------------------------------------------------- | --------------------------- | --------------------------------------------------------------------- |
| modelValue/v-model | string              | --                                                   | ''                          | 绑定值                                |
| width              | number              | --                                                   | 240                         | 触发器宽度 |
| disabled           | boolean              | --                                                   | false                       | 禁用整个组件                                                          |
| caption             | string               | --                                                   | ''                          | 前置标签                                                              |
| clearable          | boolean              | --                                                   | true                       | 是否可以清空                                                          | 
| type               | string              |year/month/date/datetime/yearrange/monthrange/daterange/datetimerange | date         | 日期类型                                                              |
| timeFormat         | string               |hms/hm/h                                           | hms                     | 带有时间点选择类型的时间点格式                           |
| placeholder        | string               | --                                                    |选择日期              | 提示文案                                                  |

### Events

| 名称    | 回调参数                       | 说明                                   |
| ------- | ------------------------------ | -------------------------------------- |
| change  | (value: string) | 绑定值变化时触发                       |
| clear   | event                            | clear 事件                             |
| blur    | event                             | 使选择器的输入框失去焦点, 并隐藏下拉框                              |
| focus   | event                             | 使选择器的输入框获取焦点, 并打开下拉框                             |

