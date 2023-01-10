---
index: 0
text: 气泡确认框 PopConfirm
componentIndex: 4
sidebarDepth: 2
---

# 气泡确认框 Popover

## 演示

### 基础用法

 `Popconfirm` 的属性与 `Popover` 很类似， 因此对于重复属性，请参考 `Popover` 的文档，在此文档中不做详尽解释。

<demo src="./test/default.vue" langue="vue"  title="基础用法" desc="基础用法演示"></demo>

### 自定义弹出框的内容

 可以在 `Popconfirm` 中自定义内容。

<demo src="./test/slot.vue" langue="vue"  title="插槽" desc="插槽用法演示"></demo>

## API

### Popover Props

| **名称**            | **类型**                                 | **可选值**                   | **默认值** | **说明**                                |
| ------------------- | ---------------------------------------- | ---------------------------- | ---------- | --------------------------------------- |
| content             | string                                   | -                            | -          | 弹出框的显示内容                        |
| confirm-button-text | boolean                                  | -                            | `确定`     | 确认按钮文字                            |
| cancel-button-text  | string                                   | -                            | `取消 `    | 取消按钮文字                            |
| status              | string                                   | default \| danger \| primary | `default`  | 二次确认框状态，`default`下没有图标     |
| before-cancel       | function(done)，done 用于关闭 Popconfirm | -                            | -          | 取消前的回调，会暂停 `Popconfirm`的关闭 |
| before-confirm      | function(done)，done 用于关闭 Popconfirm | -                            | -          | 确定前的回调，会暂停 `Popconfirm`的关闭 |
| triggter            | string                                   | click \| hover \| manually   | `click`    | 触发方式                                |

### Popover 插槽

| 名称名 | 说明                      |
| :----- | :------------------------ |
| main   | Popconfirm 显示的元素内容 |
| footer | 按钮区域显示的元素内容    |

### Popover 事件

| 名称名  | 类型 | 说明               |
| :------ | :--- | :----------------- |
| cancel  | -    | 点击取消按钮时触发 |
| confirm | -    | 点击确认按钮时触发 |
