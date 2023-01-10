---
index: 0
text: 标签 Tag
sidebarDepth: 2
componentIndex: 4
---
# 标签 Tag
通常用来展示一些属性，偶尔也用来当一些备选的属性。

## 小小小标签
常用于提醒意义的区域，一般直接跟在文本内容后面

<demo src="./test/small.vue" langue="vue" >
</demo>

## 大大大标签
有点东西，但东西不多

<demo src="./test/large.vue" langue="vue" >
</demo>

## 颜色随心所欲
传入字体颜色可以自动计算背景，当然两个支持自定义

<demo src="./test/auto.vue" langue="vue" >
</demo>

## 图标
内置了五种图标tag

`processing`、`error`、`completed`、`rejected`、`canceled`

可以通过slot的icon自定义图标

<demo src="./test/status.vue" langue="vue" >
</demo>

## 弱状态标签
内置了五种tag

`processing`、`error`、`completed`、`rejected`、`canceled`

<demo src="./test/status_no.vue" langue="vue" >
</demo>

## API

### Tag Props

| **名称** | **类型** | **可选值**                                                   | **默认值**                    | **说明**     |
| -------- | -------- | ------------------------------------------------------------ | ----------------------------- | ------------ |
| color    | string   | -                                                            | -                             | 设置字体颜色 |
| bg-color | string   | -                                                            | 默认取字体颜色并设置透明为0.15 | 设置背景颜色 |
| size     | string   | `small` | `large`                                            | `small`                       | 尺寸         |
| type     | string   | `processing` | `canceled` | `completed` | `rejected` | `error` | -                             | 类型         |
| dot      | boolean  | `true`| `false`                                              | `false`                       |              |
| icon     | string   | -                                                            | -                             | 图标         |

