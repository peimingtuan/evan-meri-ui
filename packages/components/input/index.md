---
index: 0
text: 输入框 Input 
componentIndex: 1
sidebarDepth: 2
---

# Input 基础组件

<demo src="./test/input.vue" langue="vue"  title="类型演示" desc="基础input组件，支持所有的原生属性">
</demo>

# 图标

<demo src="./test/icon.vue" langue="vue"  title="图标演示" desc="采用插槽的方式传入图标，为了外部更好获取icon的事件和样式的处理">
</demo>

# 密码

<demo src="./test/password.vue" langue="vue"  title="图标演示" desc="采用插槽的方式传入图标，为了外部更好获取icon的事件和样式的处理">
</demo>

# 验证码

<demo src="./test/vericode.vue" langue="vue"  title="图标演示" desc="采用插槽的方式传入图标，为了外部更好获取icon的事件和样式的处理">
</demo>

# 前缀 + 下拉菜单

<demo src="./test/text.vue" langue="vue"  title="前后缀演示 + 下拉菜单演示" desc="采用插槽的方式传入文字，为了外部更好处理前后缀的样式">
</demo>



# 报错提示文案

<demo src="./test/message.vue" langue="vue"  title="图标演示" desc="当错误提示信息不为空值时展示错误信息，为空时不展示">
</demo>

# 自定义宽度

<demo src="./test/width.vue" langue="vue"  title="图标演示" desc="输入框自定义宽度">
</demo>

# 自定义高度

<demo src="./test/height.vue" langue="vue"  title="图标演示" desc="输入框自定义高度">
</demo>

# 多行输入框

<demo src="./test/textarea.vue" langue="vue"  title="图标演示" desc="支持原生的rows属性">
</demo>


# 字数统计

<demo src="./test/showWordLimit.vue" langue="vue"  title="字数统计演示" desc="">
</demo>

## API

### Attributes

| 名称                    | 类型               | 可选值         | 默认值 | 说明            |
| :---------------------- | :----------------- | :------------- | :----- | :-------------- |
| model-value / v-model   | number / undefined | —              | —      | 选中项绑定值    |
| type                    | string             | text/password/textarea/vericode | text  | 输入框的类型 vericode为密码输入框类型   |
| placeholder             | string             |                | 请输入  | 输入框提示文字  |
| errorText               | string             | —              | null   | 错误信息提示    | |
 prefixIcon              | string              |                |        | 前图标          |
| suffixIcon              | string              |                |        | 后图标          |
| clearable              | boolean              |    true/false     |           |  清空 输入框
| rows              | number              |        |            4     |  输入框行数，仅 type 为 'textarea' 时有效
| height              | number /string             |        |            32     |  输入框高度，当 type 为 'textarea' 时有效，优先级高于rows且为最小高度
| width              | number /string             |        |            200    |  输入框宽度 当 type 为 'textarea' 时为最小宽度，
| show-word-limit              | Boolean             |        |                |  是否显示字数
| maxlength              | number/object             |        |                |  最大字数：类型为number 超出后不能再输入；为object可以继续输入也可设置错误文案 例 maxlength="{length:10,errorText:'文字超出了'}"
| 支持所有原生的Input属性 |                    | —              | -      | 原生的Input属性例如readonly |

### Slot
| 名称                    | 说明                         |
| :---------------------- | :----------------- | 
| prefix                  | 输入框头部内容，只对 type="text" 有效             |
| suffix                  | 输入框尾部内容，只对 type="text" 有效             |
| prepend                 | 输入框前置内容，只对 type="text" 有效             | 
| append                  | 输入框后置内容，只对 type="text" 有效             |
 

### Events

| 名称                    | 参数           | 说明                        |
| :---------------------- | :------------- | :-------------------------- |
| input                  | (currentValue) | 绑定值被改变时触发          |
| change                  | (currentValue) | 仅在输入框失去焦点或用户按下回车时触发         |
| blur                    | (event: Event) | 在组件 Input 失去焦点时触发 |
| focus                   | (event: Event) | 在组件 Input 获得焦点时触发 |
| clear                   | (event: Event) | 在组件 Input 点击清空触发 |
| keyup                   | (event: Event) | 输入框keyup事件 |
