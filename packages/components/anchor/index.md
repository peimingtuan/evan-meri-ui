---
index: 0
text: 锚点 Anchor
componentIndex: 3
sidebarDepth: 2
---
# 锚点 Anchor
永远照亮前方的灯塔。

### 基础用法

<demo src="./test/default.vue" langue="vue" >
</demo>

### 固定位置

<demo src="./test/guding.vue" langue="vue" >
</demo>

### 大小层级设置

<demo src="./test/size.vue" langue="vue"  title="Demo演示" desc="可以通过size控制大小。默认为default">
</demo>

### 悬浮主题设置

<demo src="./test/pop.vue" langue="vue" >
</demo>

### 显示背景

<demo src="./test/Bg.vue" langue="vue" >
</demo>

### 取消侧面的轨道

<demo src="./test/norail.vue" langue="vue" >
</demo>



### 滚动到

<demo src="./test/gundongdao.vue" langue="vue" >
</demo>

### API

#### Anchor Props

| **名称** | **类型** | **可选值**                                                   | **默认值**                    | **说明**     |
| -------- | -------- | ------------------------------------------------------------ | ----------------------------- | ------------ |
| sections | array   | -                                                            | []                           | 锚点传入的 sections |
| target | string   | -                                                            | `document` | 监听滚动的对象 |
| duration | number | - | `50`                                        | 滚动时触发的时间间隔       |
| bound | number   | - | `12` | 元素开始触发 anchor 的偏移量 |
| show-rail | boolean  | `true` \| `false` | `true`                                          | 是否展示侧面的轨道              |
| show-background | boolean | `true` \| `false`                                              | `false`                     | 是否展示背景   |
| offset | number | - | - | 固定位置 |
| position | string | - | `top` | 元素出现的位置 |
| zIndex | number | - | `100` | z-index |
| width | string | - | `100%` | 元素宽度 |
| size | string | - | `default` | 锚点大小 |
| ellipsisTheme | string | - | '' | 文本溢出显示的tip主题 |
| show-overflow-tooltip | boolean | `true` \| `false` | `true` | 当内容过长被隐藏时显示 tooltip |

#### Anchor Methods

| 名称     | 类型                 | 说明                   |
| -------- | -------------------- | ---------------------- |
| scrollTo | (id: string) => void | 手动触发到指定滚动位置 |

