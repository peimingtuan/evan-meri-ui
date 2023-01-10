---
index: 0
text: 页签 Tabs
componentIndex: 3
sidebarDepth: 2
---

# 页签 Tabs

### line状态, renderSlot

<demo src="./test/line.vue" langue="vue"  title="Demo演示" desc="type为line状态下显示">
</demo>

### segment状态

<demo src="./test/segment.vue" langue="vue"  title="Demo演示" desc="type为segment状态下显示">
</demo>

### border状态

<demo src="./test/border.vue" langue="vue"  title="Demo演示" desc="type为border状态下显示">
</demo>

## API

### Attributes

| 名称                    | 类型     | 可选值                                               | 默认值    | 说明                                   |
|:----------------------|:-------|:--------------------------------------------------|:-------|:-------------------------------------|
| model-value / v-model | String | -                                                 | -      | 选中的对象ID                              |
| data                  | [ ]    | -                                                 | [ ]    | 选项集合 详细解释如下                          |
| type                  | string | `line` - `segment` - `border`                     | line   | 类型                                   |
| size                  | string | `large` - `medium` - `small`                      | medium | tabs大小，line模式下只有`large` - `medium`可选 |
| item-width            | string | -                                                 | -      | 每一个tabs-item的width设置                 |
| renderSlot            | object | ` {component:component,html:string,style:object}` | -      | item中的插槽渲染                           |

### Events

| 名称     | 类型                                   | 可选值 | 默认值 | 说明     |
|:-------|:-------------------------------------|:----|:----|:-------|
| change | function(item: object, event: Event) | -   | -   | 点击回调事件 |

``` javascript
// 单个对象
export type Item = {
    id: string;
    name: string;
    disabled: boolean; // 是否禁用
    renderSlot?: {  // 渲染插槽 
        component: h(MLogo, {count: 10}), // 组件   注意 component和html同时存在时，优先使用component
        html: `<div>(<span style="color: red">23</span>/100)</div>`, // html
        style: {    // renderSlot div容器样式
            color: 'red'
        }
    }; 
}
```
