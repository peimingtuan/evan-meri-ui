---
index: 0
text: 步骤条 Steps
componentIndex: 4
sidebarDepth: 2
---

# 步骤条 Steps

常用的操作按钮 根据右侧下拉触发配置相应的属性
    
### 不带序号-无交互

<demo src="./test/default.vue" langue="vue"  title="配置" desc=" 可以通过size指定尺寸、space设置间距、layout指定方向、lineType指定线条类型、defaultColor指定当前节点颜色是否为默认。"></demo>

### 带序号-可带交互也可不带

<demo src="./test/number.vue" langue="vue"  title="配置" desc=" 可以通过size指定尺寸、space设置间距、layout指定方向、lineType指定线条类型、readonly指定用户点击操作是否有交互。"></demo>

### 带icon图标-可带交互也可不带

<demo src="./test/icon.vue" langue="vue"  title="配置" desc=" 可以通过size指定尺寸、space设置间距、layout指定方向、lineType指定线条类型、readonly指定用户点击操作是否有交互。"></demo>

### 带状态的

<demo src="./test/status.vue" langue="vue"  title="带状态演示" desc=" 不带序号用户不可点击，无hover效果。默认状态提供三种颜色，推荐默认蓝色，完成绿色，未完成红色，支持颜色自定义。"></demo>

## API

### Attributes

| 名称       | 类型   | 可选值            | 默认值  | 说明 | 必须 |
| :--------- | :----- | :---------------- | :------ | :------------- | :------ |
| v-model | String | null | null | 带交互时当前交互节点 | No
| size | String | medium \| small | medium | 每个 step 的间距，不填写将默认20。| No |
| space | Number \| string | -| 20 | 当前步骤条标题文字大小| No |
| layout | String | vertical | horizontal \| vertical | 当前步骤条显示方向 | No |
| lineType | String | solid \| dashed | solid | 当前步骤条线条类型| No |
| category | String | default \| number \| icon | default | 是否带序号，默认不带序号无交互 | No
| defaultColor | Boolean \| String | true \| false | true | 当前节点默认颜色（未单独展示，可参考类别）| No |
| source | Array | [] | [] | 当前组件的数据数组 | Yes
| readonly | Boolean \| String | false \| true | false | 当前步骤条状态是否可编辑 | No |

### Node Attributes （单个对象中的属性）

| 参数       | 类型   | 说明 |
| :--------- | :----- | :---------------- |
| id | String | 对象id (必须)|
| title | String | 标题文字(必须) |
| tips | String | 辅助文字(必须) |
| icon | String | 当前icon名称，category为icon时为必填项 |
| status | String | 当前节点状态 (可配置项finish/error/success, 需要配置其他颜色使用color字段定义)|
| color | String | 定义当前节点背景色，defaultColor为false时为必填项 |

### Events

| 类型       | 参数   | 说明 |
| :--------- | :----- | :---------------- |
| change | (current: any, context?: { e?: MouseEvent }) | 当前事件发生变化时触发 返回当前对象 |
