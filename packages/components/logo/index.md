---
index: 0
text: Logo 徽标
componentIndex: 4
sidebarDepth: 2
---

# Logo 徽标

### 展示文字和图标

<demo src="./test/text.vue" langue="vue"  title="Demo演示" desc="可以通过count控制显示的数量，大于99 自动转换为100+">
</demo>

## API

### Attributes

| 名称  | 类型    | 可选值     | 默认值 | 说明                                              |
| :---- | :------ | :--------- | :----- | :------------------------------------------------ |
| count | Number  |            | 0      | 当前消息数量，如果为0时，不显示当前红点           |
| show  | Boolean | true/false | false  | 当为true时，且count 不传或者传0的时候显示最小红点 |
| type  | Sstring  | num/dot    | num    | 当为num时，且count有值时显示有数字的红点；当为dot时，仅显示小红点 |