---
index: 0
componentIndex: 3
text: 页码 Pagination
sidebarDepth: 2
---
# 页码 Pagination
长数据之友。

## 基础用法

<demo src="./test/default.vue" langue="vue" >
</demo>

## 禁用

<demo src="./test/disabled.vue" langue="vue" >
</demo>

## 取消背景边框

<demo src="./test/noBg.vue" langue="vue" >
</demo>

## 定制文字

<demo src="./test/customization.vue" langue="vue" >
</demo>

## 快速跳跃

<demo src="./test/jumper.vue" langue="vue" >
</demo>




## API

### Pagination Props

| **名称** | **类型** | **可选值**                                                   | **默认值**                    | **说明**     |
| -------- | -------- | ------------------------------------------------------------ | ----------------------------- | ------------ |
| total | string \| number | -                                                            | -                             | 总数 |
| page-num | string \| number | -                                                      | `1` | 当前页数 |
| page-size | string \| number | - | `10`                                        | 每页显示条数                 |
| sizes-list | array  | -                                                            | `[ 10, 20, 50, 100 ]` | 每页显示条数的选项设置 |
| pager-count | string \| number | - | `7`                                              | 最大页码数，须为大于等于 5 且小于等于 21 的奇数 |
| disabled | boolean  | -                                                            | `false`                   | 是否禁用     |
| layout | string | totalPages \| total \| prev \| pager \| next \| jumper \| sizes | `total,prev,pager,next` | 自定义组件布局 |
| prev-text | string | - | - | 替代图标显示的上一页文案 |
| next-text | string | - | - | 替代图标显示的上一页文案 |
| total-tmp-string | string | - | `共 {total} 条` | 替代总数文案模板 |
| pages-tmp-string | string | - | `共 {totalPages} 页` | 替代总页数文案模板 |
| sizes-tmp-string | string | - | `{value}条/页` | 替代每页显示条数选项文案模板 |
| background | boolean | - | `true` | 是否添加背景色 |
| simple | boolean | - | `false` | 是否渲染成简洁分页 |
| hide-on-single-page | boolean | - | `false` | 只有一页时隐藏 |

### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| page-change | pageNum | 页码切换时触发 |
| size-change | pageSize | 每页条数切换时触发 |

