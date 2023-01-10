---
index: 0
text: 滚动条 Scrollbar
componentIndex: 0
sidebarDepth: 2
---

### 基础用法

<demo src="./test/default.vue" langue="vue"  title="基础用法" desc="基础用法"></demo>

### 最大高度

<demo src="./test/max-height.vue" langue="vue"  title="最大高度" desc="最大高度"></demo>

### 嵌套用法

<demo src="./test/nesting.vue" langue="vue"  title="嵌套用法" desc="嵌套用法"></demo>
### 自定义属性

| 属性名       | 类型          | 默认值      | 描述                                                         |
| ------------ | ------------- | ----------- | ------------------------------------------------------------ |
| id           | String        | 随机数      | 一个唯一的 ID，可以不填                                      |
| width        | Number,String | 100%        | 容器宽度，默认贴合父级(父级需要有宽度)，也可自己设置，接受合法的 CSS 值，传数字会转换成 px |
| height       | Number,String | 100%        | 容器高度，默认贴合父级(父级需要有高度)，也可自己设置，接受合法的 CSS 值，传数字会转换成 px |
| content-max-height       | Number,String | ''        | 容器内容最大高度，接受合法的 CSS 值，传数字会转换成 px |
| breadth      | Number        | 6           | 滑块的粗细，单位: px                                         |
| thumbColor   | String        | \#C4C9CF    | 滑块的颜色，接受 CSS 颜色值，变量                            |
| trackColor   | String        | transparent | 轨道的颜色，接受 CSS 颜色值，变量                            |
| autoHide     | Boolean       | true        | 是否自动隐藏滚动条，鼠标在区域内才显示                       |
| left         | Boolean       | false       | 是否把垂直滚动条放在容器的左边                               |
| top          | Boolean       | false       | 是否把水平滚动条放在容器的顶端                               |
| noVer        | Boolean       | false       | 是否禁用垂直滚动条(overflow-y:hidden)                        |
| noHor        | Boolean       | false       | 是否禁用水平滚动条(overflow-x:hidden)                        |
| minLength    | Number        | 20          | 当内容无限多的时候，滑块最短不得低于此值，单位: px           |
| resizeObject | Boolean       | false       | 如果存在监听不到内容高度变化的情况可以把这个值改为 true 试试 |
| scrollClass  | String        | ''          | 设置滚动盒子的class                                          |
| scrollOffset | Number        | 1           | 允许滚动到底部的误差值                                       |

### 自定义事件

| 事件名   | 描述                                                         | 返回值                                                       |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| onHStart | 每次垂直滚动条抵达顶部时将触发一次                           | `{  offsetHeight: 内容区的总高度,  offsetWidth: 内容区的总宽度,  height: 容器的高度,  width: 容器的宽度,  scrollTop: 内容区已被滚到上边去的距离,  scrollLeft: 内容区已被滚到左边去的距离 }        ` |
| onHEnd   | 每次垂直滚动条抵达底部时将触发一次                           | 同上                                                         |
| onWStart | 每次水平滚动条抵达最左边时将触发一次                         | 同上                                                         |
| onWEnd   | 每次水平滚动条抵达最右边时将触发一次                         | 同上                                                         |
| onScroll | 当滚动条的位置变化时就会触发一次，无论是垂直滚动条还是水平滚动条 | 同上                                                         |


### 自身方法

| 方法名        | 参数                                 | 描述                                                   |
| ------------- | ------------------------------------ | ------------------------------------------------------ |
| scrollTo      | (x:number,y:number,isSmooth:boolean) | 滚动到指定的位置,x 水平，y 垂直, isSmooth 是否平滑过度 |
| getScrollInfo | 无                                   | 获取当前滚动条各种信息                                 |

### 注意事项

> **scrollTo(x,y,isSmooth)** 方法<br/>
> 平滑滚动使用的是`scroll-behavior: smooth;`<br/> 
> 但是：浏览器水平滚动条和垂直滚动条是互斥的，当水平正在滚时，垂直滚不动，反之亦然。浏览器始终只会有一个方向处于滚动中<br/> 
> 所以：如果设置了`isSmooth`为`true`,那么不要同时设置 x 和 y,至少有一个应该为`null`<br/>

> 如果你不设置 `m-srollbar` 的 width 和 height 属性，或者设置为百分比，那么就需要一个具有高度和宽度的父级元素来包裹 `m-srollbar`。
