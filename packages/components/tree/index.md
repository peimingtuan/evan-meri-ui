---
index: 0
componentIndex: 4
text: 树 Tree
sidebarDepth: 2
---

# 树 Tree

## 展示树

<demo src="./test/base-tree.vue" langue="vue"  title="展示树" desc="基础树形数据展示">
</demo>

## 可选树

### 单选树

#### 子父级单独作为选项都可选择

<demo src="./test/radio-tree.vue" langue="vue"  title="子父级单独作为选项都可选择" desc="若每级节点都可点击，则点击整行即为选中内容，点击「箭头」则为展开和收起树结构"></demo>

#### 仅末级可选

<demo src="./test/radio-tree-lastStage.vue" langue="vue"  title="仅末级可选" desc="默认每一级都可选中,lastStage为true可以设置仅末级可选，若仅末级节点可点击，则点击父级整行为展开收起，点击整行末级为选中内容"></demo>

#### 在树结构中有多个插槽，插入状态和操作

<demo src="./test/radio-tree-slot.vue" langue="vue"  title="节点前后插槽" desc="在节点前后，以及节点行末尾留有插槽可供使用，作用域内可以获取到当前节点信息并自定义渲染"></demo>

### 多选树

&emsp;

#### multiple 为 true 开启多选，多选树有两种点击交互逻辑，可通过 detachCheckAction 字段来设置是否将 check 事件同文字点击事件分离出来，默认为 false 不分离

&emsp;

#### 若子父级都单独作为一个选项存在

<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/check-tree.vue" langue="vue"  title="分离前" desc="点击箭头（即为展开和收起树级）、点击Checkbox和点击文字内容（即为选中内容）为两个事件">
</demo>
    <demo style="flex:1;flex-shrink:0;" src="./test/check-tree-detachCheckAction.vue" langue="vue"  title="分离后" desc="点击箭头（即为展开和收起树级）、点击Checkbox（勾选该内容）、点击文字内容（选中该字段并响应其详情内容）为三个事件">
</demo>
</figure>
&emsp;

#### 若仅末级节点可选中，父级本身不承载内容仅作为分类存在

<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/check-tree-lastStage.vue" langue="vue"  title="分离前" desc="点击父级整行为展开和收起操作;点击Checkbox和点击文字内容（即为选中内容）为一个事件">
</demo>
    <demo style="flex:1;flex-shrink:0;" src="./test/check-tree-lastStage-detachCheckAction.vue" langue="vue"  title="分离后" desc="点击父级整行为展开和收起操作;点击Checkbox（勾选该内容）、点击文字内容（选中该字段并响应其详情内容）为两个事件">
</demo>
</figure>
&emsp;

#### 若子父级联动，即勾选子级父级为半选状态

<figure style="display:flex">
    <demo style="flex:1;flex-shrink:0;margin-right:20px;" src="./test/check-tree-notCheckStrictly.vue" langue="vue"  title="分离前" desc="点击父级，点击箭头（即为展开和收起树级）、点击Checkbox和点击文字内容（即为选中内容）为两个事件；点击子级，点击Checkbox和点击文字内容（即为选中内容）为一个事件。">
</demo>
    <demo style="flex:1;flex-shrink:0;" src="./test/check-tree-notCheckStrictly-detachCheckAction.vue" langue="vue"  title="分离后" desc="点击父级，点击箭头（即为展开和收起树级）、点击Checkbox（勾选该内容）、点击文字内容（选中该字段并响应其详情内容）为三个事件；点击子级，点击Checkbox（勾选该内容）、点击文字内容（选中该字段并响应其详情内容）为两个事件">
</demo>
</figure>

## 虚拟树

### virtual 为 true 启用虚拟 tree

<demo src="./test/virtual-tree.vue" langue="vue"  title="分离前" desc="点击父级，点击箭头（即为展开和收起树级）、点击Checkbox和点击文字内容（即为选中内容）为两个事件；点击子级，点击Checkbox和点击文字内容（即为选中内容）为一个事件。">
</demo>

## API

### 属性

| 名称              | 类型            | 可选值/示例                                                | 默认值 | 说明                                                                                                                   |
| :---------------- | :-------------- | :--------------------------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------- |
| data              | Array           |                                                            | []     | 树结构数据                                                                                                             |
| v-model           | Array           |                                                            | []     | 已选中选中节点信息                                                                                                     |
| props             | Object          | 例如：`{label:"name",children:"list",class:"mytree-node"}` | {}     | 可配置节点信息，如节点显示的 label 对应字段、children 对应字段，以及节点 class 名配置                                  |
| nodeKey           | String          |                                                            | id     | 节点唯一标识                                                                                                           |
| multiple          | Boolean         | true / false                                               | false  | 是否开启多选                                                                                                           |
| defaultExpandAll  | Boolean         | true / false                                               | false  | 是否默认全部展开                                                                                                       |
| notNull           | Boolean         | true/ false                                                | true   | 是否返回半选状态的数据                                                                                                 |
| checkStrictly     | Boolean         | true/ false                                                | false  | 在多选的情况下是否严格的遵循父子不互相关联的做法                                                                       |
| lastStage         | Boolean         | true/ false                                                | false  | 是否仅末级可选                                                                                                         |
| returnParentNode  | Boolean         | true/ false                                                | true   | 多选情况下是否返回父级节点信息                                                                                         |
| virtual           | Boolean         | true/ false                                                | false  | 是否启用虚拟列表                                                                                                       |
| filterNodeMethod  | String/Function |                                                            |        | 树筛选关键字或过滤函数                                                                                                 |
| filterValue       | String          |                                                            |        | 树筛选关键字                                                                                                           |
| detachCheckAction | Boolean         | true/ false                                                | false  | 多选状态下是否将 check 动作与行点击事件分离                                                                            |
| ignoreDisabled    | Boolean         | true/ false                                                | false  | 父子关联状态下是否忽略禁用项计算，为 true 时，子级有禁用项时，当所有其他可选子级都选中后父级也可展示全选状态而不是半选 |
| readonly          | Boolean         | true/ false                                                | false  | 是否只读，该树只做展示                                                                                                 |
| height            | Number          |                                                            | 0      | 默认高度 100%                                                                                                          |
| itemHeight        | Number          |                                                            | 40     | 节点默认高度，虚拟列表渲染时计算使用                                                                                   |
| indent            | Number          |                                                            | 14     | 水平缩进长度                                                                                                           |

### 事件

| 名称     | 参数                                 | 说明                                                                |
| :------- | :----------------------------------- | :------------------------------------------------------------------ |
| onChange | (ids:TreeNode[],selectNode:TreeNode) | 选中回调，ids 为已选中节点 id 数组，selectNode 为当前选中的节点信息 |

### Slot

| 名称       | 说明       |
| :--------- | :--------- |
| nodePrefix | 节点前缀   |
| nodeSuffix | 节点后缀   |
| rowSuffix  | 节点行后缀 |
