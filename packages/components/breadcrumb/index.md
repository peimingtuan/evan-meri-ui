---
index: 0
text: 面包屑 Breadcrumb
componentIndex: 3
sidebarDepth: 2
---

# 面包屑 Breadcrumb

## 演示

### 基本用法

<demo src="./test/demo.vue"  title="基本用法"  ></demo>

### 自定义分隔符

<demo src="./test/separator.vue"  title="自定义分隔符"  ></demo>

### 显示下拉框

<demo src="./test/itemNum.vue"  title="item个数超出显示下拉框"  ></demo>

## API

### Tag Props

| **名称**         | **类型** | **可选值** | **默认值** | **说明**            |
|----------------|--------|---------|---------|-------------------|
| separator      | string | -       | >       | 默认文字分隔符           |
| separator-icon | string | -       | -       | meri-icon 图标库名称   |
| nameKey        | string | -       | name    | item渲染对象的取值key    |
| itemNum        | number | -       | 4       | 中间item超过显示省略号，下拉框 |
| data           | Array  | -       | []      | 数据列表，格式参照以下       |

## Event

| **名称** | **类型**                                 | **可选值** | **默认值** | **说明** |
|--------|----------------------------------------|---------|---------|--------|
| change | Function(item: any, event: MouseEvent) | -       | -       | 点击回调事件 |

```
// 单个对象  配合nameKey可自定义
export type Item = {
    url: string;
    name: string;
}
```

