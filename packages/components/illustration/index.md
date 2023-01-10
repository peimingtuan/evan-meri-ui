---
index: 0
text: 插画 Illustrator
componentIndex: 0
sidebarDepth: 2
---

# 插画 Illustrator


## 演示


### 基本用法
<demo src="./test/basic.vue"  title="基本用法"  desc="标题为必填项"></demo>


### 正常尺寸
<demo src="./test/normal.vue"  title="基本用法" desc="正常尺寸"></demo>

### 小尺寸
<demo src="./test/small.vue"  title="基本用法" desc="小尺寸"></demo>

### 使用插槽
<demo src="./test/slot.vue"  title="基本用法" desc="插画，标题，描述，操作均提供插槽"></demo>
## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  |  是否必填  |说明                                                       |
| :------- | :------ | :---------------------------------------| :------ | :-------- |:-------------------------------------------------------|
| size     | string  |      small / normal           | normal| 否  |插画大小 |
| type     | string  |      noContent / noAccess / noMessage / networkDisconnected / noSearchResult / noData / pageLoadFailure /  success          |  — | 否  |插画类型 |
| title     | string  |      —            |  — | 是  |标题 |
| content     | string  |      —            |  — | 否  |插画描述内容 |


### 插槽

| 插槽名  | 说明         |
| :------ | :----------- |
| img  | 自定义插画图片 |
| title  | 自定义标题 |
| content  | 自定义描述内容 |
| footer | 自定义底部操作 |
