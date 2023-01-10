---
index: 0
text: 树选择 TreeSelect
componentIndex: 1
sidebarDepth: 2
---
# 树选择 TreeSelect

## 类型
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio.vue" langue="vue"  title="单选树选择"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check.vue" langue="vue"  title="多选树选择"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-search.vue" langue="vue"  title="可搜索树选择"></demo>
</figure>

### 单选树
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-lastStage.vue" langue="vue"  title="仅子级可选"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-notLastStage.vue" langue="vue"  title="子父级单独作为选项都可选择"></demo>
</figure>



### 多选树
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check.vue" langue="vue"  title="子父级联动" desc="即勾选子级，父级显示为半选状态"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-checkStrictly.vue" langue="vue"  title="子父级不联动" desc="子父级都可选，且父级作为单独的一个选项，即勾选子级，父级没有半选状态"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-lastStage.vue" langue="vue"  title="仅子级可选" desc=""></demo>
</figure>
&emsp;

#### mode默认值为multiple显示已选个数,值为tags展示已选中选项tag
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-tag.vue" langue="vue"  title="多选时回显tag" desc="maxTagCount设置最大显示tag数量,为0时不限制个数，默认值为2多余tag以 +n 形式显示"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-tag-maxTagTextLength.vue" langue="vue"  title="tag文本长度限制" desc="maxTagTextLength设置tag展示最大字符长度，溢出显示..."></demo>
</figure>
&emsp;

#### 选中项回显,showParentName默认值为true，即显示父级路径，false时只显示当前节点内容
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-showParentName.vue" langue="vue"  title="单选状态下不显示父级路径"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-showParentName.vue" langue="vue"  title="多选状态下不显示父级路径"></demo>
</figure>
&emsp;

### 搜索树
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-search-check.vue" langue="vue"  title="子父级联动" desc="即勾选子级，父级显示为半选状态"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-search-check-checkStrictly.vue" langue="vue"  title="子父级不联动" desc="子父级都可选，且父级作为单独的一个选项，即勾选子级，父级没有半选状态"></demo>
</figure>

### 带确定按钮的下拉
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-confirm.vue" langue="vue"  title="多选" ></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-search-confirm.vue" langue="vue"  title="搜索" ></demo>
</figure>

### 带插槽的下拉
<demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-slot.vue" langue="vue"  title="带插槽的树"></demo>

### 自定义过滤方法的下拉
<demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-filter.vue" langue="vue"  title="自定义过滤方法"></demo>

### 自适应面板宽度的下拉
<demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-menuSize.vue" langue="vue"  title="下拉面板自适应宽度"></demo>

### 打开面板后定位到已选内容
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-scroll.vue" langue="vue"  title="单选"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-scroll.vue" langue="vue"  title="多选" ></demo>
</figure>

### 分段式响应
&emsp;
#### 单选
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-lastStage-detachHoverAction.vue" langue="vue"  title="仅子级可选，父级作为分类"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-radio-detachHoverAction.vue" langue="vue"  title="子父级都可选" ></demo>
</figure>
&emsp;

#### 多选
<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-detachHoverAction.vue" langue="vue"  title="子父级联动，即勾选子级，父级显示为半选状态"></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-detachHoverAction-checkStrictly.vue" langue="vue"  title="子父级单独作为一个选项" ></demo>
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/base-check-detachHoverAction-lastStage.vue" langue="vue"  title="父级仅作为分类，只能勾选子级" ></demo>
</figure>

## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| hasConfirm  | Boolean |true/ false               | false   | 是否支持确认按钮
| searchable  | Boolean |true/ false               | false   | 是否支持搜索功能
| mode  | String |tags/multiple               | multiple   | 选中后回显样式 multiple为个数  tags为标签
| disabled  | Boolean |true/ false               | false   | 是否禁用
| showParentName  | Boolean |true/ false               | true   | 是否显示子父级路径



### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| onChange | (ids:TreeNode[],selectNode:TreeNode) | 选中回调，ids为已选中节点id数组，selectNode为当前选中的节点信息 |

### 方法

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| checkAll | true/false | 全选或者取消全选 |

#### slot等其余参数参考select和tree组件
