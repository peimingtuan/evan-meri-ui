---
index: 0
componentIndex: 4
text: 表格 Table
sidebarDepth: 2
---

# 表格 Table

## 基础表格

### 普通表格

<demo src="./test/BaseTable.vue" langue="vue"  title="展示表格" desc="基础表格数据展示">
</demo>

### 表头说明

<demo src="./test/BaseTableDesc.vue" langue="vue"  title="展示表头" desc="表头列不同方式的展示">
</demo>

### 表格文字朝向

<demo src="./test/BaseTableAlign.vue" langue="vue"  title="展示表头" desc="表头列不同方式的展示">
</demo>

### 表格大小

<demo src="./test/BaseTableSize.vue" langue="vue"  title="表格大小" desc="表头高度：表头的高度默认分为两种尺寸，Medium常规表格：表头38px
，Small小尺寸表格：表头28px">
</demo>

### 表头配置

<demo src="./test/BaseTableSetting.vue" langue="vue"  title="表格大小" desc="适配规则
自定义表头默认占一个固定的列宽48px，不可拖动该列和隐藏
交互规则
1.点击「表头设置按钮」弹出浮层，通过勾选某对象的checkbox可控制是否在表格上显示。
2.浮层高度根据列表数量适配，默认最大高度不能超过表格高度；若下拉列表数据超过表格高度时，下拉列表需要将最末item截断展示
3.通过拖拽列表头部图标，可对列表进行排序，排序规则从上到下则代表表格数据类型从左到右排序；是否支持排序可配置，不可排序则无头部图标
4.建议将不可被隐藏的数据类型放在浮层中展示，「checkbox」置灰，并且在浮层中置顶。若不配置在浮层中浮层内的所有对象都可被取消选中">
</demo>

### 自定义内容单元格

<demo src="./test/BaseTableScope.vue" langue="vue"  title="自定义内容单元格" desc="适配规则
通过插槽完成表格内容的单元格自定义">
</demo>

### 自定义内容行

<demo src="./test/BaseTableScopeRow.vue" langue="vue"  title="自定义内容行" desc="适配规则
通过插槽完成表格内容的内容行">
</demo>

### 自定义列宽

<demo src="./test/BaseTableDrag.vue" langue="vue"  title="自定义列宽" desc="可以通过手动拖动的情况完成调整列宽">
</demo>

### 自定义列宽（有分割线的情况）

<demo src="./test/BaseTableDragLine.vue" langue="vue"  title="自定义列宽" desc="有分割线的时候，按钮是不显示的">
</demo>

### 固定列

<demo src="./test/BaseTableDragFixed.vue" langue="vue"  title="自定义列宽" desc="可以通过手动拖动的情况完成调整列宽">
</demo>

### 多选操作

<demo src="./test/BaseTableTooltips.vue" langue="vue"  title="自定义列宽" desc="有分割线的时候，按钮是不显示的">
</demo>


## 树形表格

### 普通树形表格
<demo src="./test/RreeTable.vue" langue="vue"  title="自定义列宽" desc="有分割线的时候，按钮是不显示的">
</demo>


### 自定义行树形表格
<demo src="./test/TreeTableRowScope.vue" langue="vue"  title="自定义内容行" desc="通过属性控制当前行是否通过插槽显示">
</demo>


### 已选择项弹窗
<demo src="./test/RreeTableTooltips.vue" langue="vue"  title="自定义内容行" desc="通过属性控制当前行是否通过插槽显示">
</demo>


### 可配置功能
<demo src="./test/RreeTableCommon.vue" langue="vue"  title="可配置功能项" desc="可配置功能「表头设置」、「固定列设置」、「自定义列宽」、「分割线」、「表格尺寸」功能可供配置，具体规则同基础表格">
</demo>

## 合并单元格表格

### 多层级表头
<demo src="./test/MergeTable.vue" langue="vue"  title="可配置功能项" desc="可配置功能「表头设置」、「固定列设置」、「自定义列宽」、「分割线」、「表格尺寸」功能可供配置，具体规则同基础表格">
</demo>

### 多层级表头合并数据行
<demo src="./test/MergeTableMergeRow.vue" langue="vue"  title="可配置功能项" desc="可配置功能「表头设置」、「固定列设置」、「自定义列宽」、「分割线」、「表格尺寸」功能可供配置，具体规则同基础表格">
</demo>

### 多层级表头多选弹窗
<demo src="./test/MergeTableTooltips.vue" langue="vue"  title="可配置功能项" desc="可配置功能「表头设置」、「固定列设置」、「自定义列宽」、「分割线」、「表格尺寸」功能可供配置，具体规则同基础表格">
</demo>


## API

### Table Attr

| 名称           | 类型                                                                                                | 可选值/示例                          | 默认值    | 说明                                                     |
| :------------- | :-------------------------------------------------------------------------------------------------- | :----------------------------------- | :-------- | :------------------------------------------------------- |
| checkbox       | Boolean                                                                                             |                                      | false     | 表格允许复选                                             |
| setting        | Boolean                                                                                             |                                      | false     | 设置对应的列展示                                         |
| columns        | Column[]                                                                                            | 例如：`{dataIndex:"1",title:"标题"}` | {}        | 列信息                                                   |
| dataSource     | Row                                                                                                 | 例如：`{id:"1"}`                     | {}        | 节点唯一标识                                             |
| size           | string                                                                                              | medium / small                       | medium    | 表格尺寸                                                 |
| colunmMinWidth | number                                                                                              | 100                                  | 89        | 最小宽                                                   |
| mergeMethod    | `(row: Row, col: Column, rowIndex: number, colIndex: number) => { rowspan: number,colspan: number}` |                                      | undefined | 合并行的回调                                             |
| columnLine     | Boolean                                                                                             | true/ false                          | false     | 是否显示列的竖线                                         |
| resizable      | Boolean                                                                                             | true/ false                          | false     | 是否可以通过设置面板拖拽列的排序（合并表头的情况下无效） |


### Column Attr

| 名称         | 类型                                                  | 可选值/示例                          | 默认值  | 说明                                                                                                         |
| :----------- | :---------------------------------------------------- | :----------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------- |
| title        | string                                                |                                      |         | （必填）列头显示文字                                                                                         |
| dataIndex    | string                                                |                                      |         | （必填）列数据在数据项中对应的Key                                                                            |
| sorter       | boolean                                               |                                      | false   | 是否的进行排序                                                                                               |
| sortOrder    | string                                                | ascend\|descend\|default             | default | 默认排序顺序                                                                                                 |
| fixed        | string\|boolean                                       | left \ center \ right \ true \ false | false   | 列是否固定,可选 true(等效于 left) 'left' 'right'                                                             |
| resizable    | boolean                                               | false                                | false   | 是否可拖动调整宽度，此时                                                                                     |
| children     | Column[]                                              | []                                   | []      | 子列，合并表头时进行使用                                                                                     |
| desc         | string                                                |                                      | false   | 描述信息                                                                                                     |
| onlyShow     | boolean                                               | true/ false                          | false   | 强制显示，不可通过设置弹窗取消选中                                                                           |
| checked      | string                                                | `checked`/ `uncheck` / `notNull`     | uncheck | 当前列是否显示，可以通过设置弹窗进行修改                                                                     |
| align        | string                                                | 'left' / 'right' / 'center'          | left    | 文字对其方式                                                                                                 |
| ellipsis     | boolean                                               | true/ false                          | false   | 超过宽度将自动省略。                                                                                         |
| width        | number                                                |                                      | 0       | 列宽度                                                                                                       |
| minWidth     | number                                                |                                      | 89      | 拖动列最小宽度，会受到表格自动调整分配宽度影响                                                               |
| maxWidth     | number                                                |                                      |         | 拖动列最大宽度                                                                                               |
| weight       | number                                                |                                      | 1       | 按照权重进行列宽度进行划分(相对于其他列的宽度进行比较，weight 和width同时设置时，weight 优先级更高，默认为1) |
| sortCallBack | (col: Column, state: SortOrder, rows: Row[]) => Row[] |                                      |         | 当前列的排序方法（只需要排序相同级，树形菜单会进行递归调用）                                                 |


### Row Attr

| 名称               | 类型     | 可选值/示例  | 默认值 | 说明                                                                                                      |
| :----------------- | :------- | :----------- | :----- | :-------------------------------------------------------------------------------------------------------- |
| id                 | string   |              |        | （必填）当前行Id                                                                                          |
| children           | Row[]    |              |        | 树形表格使用                                                                                              |
| checked            | boolean  |              | false  | 当前行是否被选中(设置复现框的时候可以附加默认值)                                                          |
| checkbox           | boolean  |              | false  | 在第一列的表格中显示复选框（树形菜单使用）                                                                |
| open               | boolean  | true \ false | false  | 当前行是否展开（树形菜单使用）                                                                            |
| slot               | boolean  | true \ false | true   | 是否通过row:slot 插槽对该行信息的渲染                                                                     |
| children           | Column[] | []           | []     | 子行，树形菜单使用                                                                                        |
| [propName: string] | any      |              | false  | 在Colum 的 dataIndex 都必须包含在该行信息中（合并表头的单元格最末级列的dataIndex 必须包含在当前的表格中） |


### Slots


| 名称          | 类型                          | 可选值/示例 | 默认值 | 说明                                      |
| :------------ | :---------------------------- | :---------- | :----- | :---------------------------------------- |
| tooltip       | `({checkeds:Row[]}) => Vnode` |             | null   | 选中后头部弹窗的插槽                      |
| col.dataIndex | `(Row) => Vnode`              |             | null   | 表格数据中 col.dataIndex 对应列的渲染插槽 |
| row           | `({ Row, Index })=>Vnode`     |             | null   | 当Row.slot 为true 时会通过该插槽进行渲染  |


### Event

| 名称          | 类型                                      | 可选值/示例 | 默认值 | 说明                                                                                                                |
| :------------ | :---------------------------------------- | :---------- | :----- | :------------------------------------------------------------------------------------------------------------------ |
| checkedChange | `({items:Row[],selecteds:Row[]}) => void` |             | null   | items 当前操作的行，以及影响的行例如：树形菜单取消选中第二级会把第一级和其子集都返回，selecteds当前列表已经选中的行 |
| sortChange    | `({col:Column,state:string}) => void`     |             | null   | 排序点击事件                                                                                                        |

