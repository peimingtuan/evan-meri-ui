---
index: 0
text: 自定义侧边栏 SidebarCustom
componentIndex: 4
sidebarDepth: 2
---

# 侧边栏 SidebarCustom

### 展开收起按钮常驻

可拖动状态 宽度设置  展示left框 默认显示 常驻样式
<demo src="./test/resident.vue"  langue="vue" desc="可拖动状态 宽度设置  展示left框 默认显示 常驻状态"  ></demo>

### 展开收起按钮hover显示

可拖动状态 宽度设置  展示left框 默认显示 hover样式
<demo src="./test/index.vue"  langue="vue" desc="可拖动状态 宽度设置  展示left框 默认显示 hover触发"  ></demo>

# API

### Attributes

| 名称       | 类型          | 可选值       | 默认值 | 说明                 |
| :--------- | :------------ | :----------- | :----- | :------------------- |
| changeSize | Booleans      | true / false | true   | 显示隐藏拖拽         |
| width      | number/string | 240-680      | 680    | 当前组件的大小(必传) |
| show       | Booleans      | true / false | true   | 显示隐藏左侧组件     |
| resident   | Booleans      | true / false | true   | 常驻收缩按钮     |
