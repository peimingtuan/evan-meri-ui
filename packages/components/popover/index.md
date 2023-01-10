---
index: 0
text: 提示说明 Tips
componentIndex: 4
sidebarDepth: 2
---

# 提示说明Tips

## 演示  ----------------------- Tips
### 基础用法 Tips

<demo src="./test/themeTip.vue" langue="vue"  title="触发演示" desc="可以通过theme来设置主题，默认light。"></demo>

### 最大宽高设置 Tips、自定义内容

<demo src="./test/slotTip.vue" langue="vue"  title="触发演示" desc="可以通过trigger来设置触发方式，默认hover。"></demo>

## 演示  ----------------------- Popover
### 触发方式 Popover

 `trigger` 属性被用来决定 popover 的触发方式，支持的触发方式： `hover`、`click`，如果你想手动控制需要设置 `isOpen` 并且设置 `trigger="manually"`

<demo src="./test/default.vue" langue="vue"  title="触发演示" desc="可以通过trigger来设置触发方式，默认hover。"></demo>

### 主题

通过设置 `theme` 来修改主题，默认值为 `light`，`DarkTransparent` 取消了小箭头的展示

<demo src="./test/theme.vue" langue="vue"  title="主题" desc="显示和隐藏的事件"></demo>

### 自定义内容、优先采用传入的弹出框位置再计算最优位置

 通过`content`可以设置`popover`中的内容

 用具名slot `content`，代替 `tooltip` 中的 `content` 属性

<demo src="./test/slot.vue" langue="vue"  title="插槽" desc="用具名slot content，代替 tooltip 中的 content 属性"></demo>

### 延时触发

仅需要在 `trigger` 为 `hover` 的时候，鼠标移入的时长超过 `mouse-enter-delay` 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 `150` 毫秒；鼠标移出之后，再经过`mouse-leave-delay` 毫秒后，`Popover` 组件才会隐藏，默认值是 `100` 毫秒。

<demo src="./test/delay.vue" langue="vue"  title="delay" desc="延时触发"></demo>

### 响应区域

 在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

 使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<demo src="./test/placement.vue" langue="vue"  title="placement" desc="响应区域"></demo>

### 事件

<demo src="./test/methods.vue" langue="vue"  title="事件" desc="显示和隐藏的事件"></demo>

### 自定义大小

<demo src="./test/auto.vue" langue="vue" title="自定义大小">
</demo>

### 是否显示箭头

<demo src="./test/showArrow.vue" langue="vue" title="是否显示箭头">
</demo>

### 文本溢出基础用法

<demo src="./test/ellipsisdefault.vue" langue="vue" title="文本溢出基础用法">
</demo>

### 文本溢出不同主题

<demo src="./test/ellipsistheme.vue" langue="vue" title="文本溢出不同主题">
</demo>
## API

### Popover Props

| **名称**          | **类型**                  | **可选值**                                                   | **默认值** | **说明**                                                     |
| ----------------- | ------------------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------------ |
| content           | string                    | -                                                            | -          | 弹出框的显示内容                                             |
| is-open           | boolean                   | true \| false                                                | `false`    | 手动控制弹出状态                                             |
| trigger           | string                    | click \| hover \| manually                                   | `hover `   | 弹框触发方式                                                 |
| placement         | string                    | 'top'   \| 'right'   \| 'bottom'   \| 'left'   \| 'top-start'   \| 'top-end'   \| 'right-start'   \| 'right-end'   \| 'bottom-start'   \| 'bottom-end'   \| 'left-start'   \| 'left-end' | `bottom`   | 控制弹框出现的方向                                           |
| offset            | number                    | -                                                            | `8`        | 指定相对触发元素的偏移距离                                   |
| show-animation    | boolean                   | true \| false                                                | `true `    | 是否显示动画                                                 |
| mouse-enter-delay | number                    | -                                                            | `150`      | 仅在 `trigger` 为 `hover` 的时候，设置鼠标移入后延时多久才显示 `Popover`，单位是 `ms` |
| mouse-leave-delay | number                    | -                                                            | `100`      | 仅在 `trigger` 为 `hover` 的时候，设置鼠标移出后延时多久才隐藏 `popover`，单位是 `ms` |
| disabled          | string                    | -                                                            | -          | `Popover` 是否可用                                           |
| popover-class     | string \| array \| object | -                                                            | -          | 为 `Popover` 添加自定义类名                                  |
| display-directive | string  | show \| if                                                            | if          | 条件渲染使用的指令，if 会让内容被使用 v-if 渲染，show 会让内容被使用 v-show 渲染                                 |
| show-arrow | boolean  | true \| false                                                            | true          | 是否显示箭头                                 |
| width | string  | -                                                            |      -     | 自定义宽度                                 |

### Popover 插槽

| 名称名  | 说明                        |
| :------ | :-------------------------- |
| default | 触发 Popover 显示的元素内容 |
| content | 自定义弹出内容              |

### Popover 事件

| 名称名 | 类型 | 说明                   |
| :----- | :--- | :--------------------- |
| show   | -    | Popover 显示后触发事件 |
| hide   | -    | Popover 隐藏后触发事件 |
