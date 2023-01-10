---
index: 0
text: 搜索 Search
componentIndex: 1
sidebarDepth: 2
---

# Search

##  基础用法
<demo src="./test/search.vue" langue="vue"  title="类型演示" desc="基础search组件，使用无边框模式时，如未设置尺寸时，元素的宽度为内容长度">
</demo>

## 自定义尺寸
<demo src="./test/search3.vue" langue="vue" title="类型演示" desc="自定义尺寸"></demo>

## 输入建议
<demo src="./test/search4.vue" langue="vue" title="类型演示" desc="显示输入建议"></demo>

## 自定义建议
<demo src="./test/search5.vue" langue="vue" title="类型演示" desc="自定义输入建议"></demo>

## Attributes

| 名称 | 类型   | 可选值                                  | 默认值  | 说明     |
| :--- | :----- | :-------------------------------------- | :------ | :------- |
| defaultValue | string | 无 | 无  | 输入框默认值 |
| defaultWidth | string/number | 无 | 无  | 搜索框默认宽度，最小值100px；设置defaultWidth后，无边框模式伸缩不受影响；设置width后 defaultWidth 失效 |
| immediate | boolean | true/false |  false | 是否立即触发一次回调 |
| width | string/number | 无 | 无  | 搜索框宽度，最小值100px；设置width后，无边框模式伸缩将失效 |
| height | string/number | 无 | 无 | 搜索框高度,最小值20px |
| placeholder | string | 无 | 搜索  | 提示语 |
| border | boolean | true/false |  true | 是否有边框 |
| disabled | boolean | true/false |  false | 禁用状态 |
| type | string | real/enter |  real | 触发回调方式，实时/回车 |
| label | string | 无 | label  | 下拉项显示值 |
| triggerOnFocus | boolean | true/false | false | 获取焦点时，显示下拉选项 |
| fetchSuggestions | function | 无 | 无 | 下拉选项回调，(query, cb) => cb([])，通过cb回调展示需要显示的下拉选项 |

## Events
| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| change | (value: string) | 输入框输入回调 |
| focus | (ev: Event) | 获取焦点回调 |
| input | (ev: Event) | 失去焦点回调 |
| select | (obj: sugggestion) | 选择下拉回调 |