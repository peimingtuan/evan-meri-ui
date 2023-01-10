---
index: 0
text: 穿梭框 Transfer 
componentIndex: 1
sidebarDepth: 2
---
# 穿梭框 Transfer
## 树父子联动

<demo src="./test/linkage.vue" langue="vue"  title="默认树联动" desc="左侧可勾选父级 , 子级也跟着勾选 , 右侧只显示选中的末级数据"></demo>

<demo src="./test/notNull.vue" langue="vue"  title="树联动返回半选状态" desc="右侧显示全部勾选的数据 , 包括父级数据 , 删除父级对应子集数据也删除"></demo>

## 不联动
<demo src="./test/noLinkage.vue" langue="vue"  title="树不联动" desc="左侧树父子级勾选/取消不关联 , 只选中当前操作项"></demo>
## 仅末级可选

<demo src="./test/lastStage.vue" langue="vue"  title="树仅末级可选" desc="左侧树仅可以选择末级数据 , 右侧只显示选中的末级数据"></demo>

## API

### 属性

| 名称     | 类型    | 可选值/示例                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| data     | Array   |                         | []      | 树结构数据  |                                       |
| notNull  | Boolean | true/ false                                   | false   | 是否返回半选状态的数据
| linkage  | Boolean | true/ false                             | true   | 是否严格的遵循父子互相关联的做法
| lastStage  | Boolean | true/ false                                  | false   | 是否仅末级可选

### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| onChange | (row:TreeNode,selectNode: TreeNode[]) | 勾选/删除内容回调 <br> row : 当前操作的数据<br>selectNode : 操作后选中的数据 |
