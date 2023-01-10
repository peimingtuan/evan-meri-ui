---
index: 0
text: 横幅 Banner
componentIndex: 2
sidebarDepth: 2

---

# 横幅 Banner

常见状态的横幅

## 演示

### Type 类型

<demo src="./test/type.vue" langue="vue"  title="类型演示" desc=" 可以通过type来设置横幅的类型">
</demo>

### closeable 关闭

<demo src="./test/close.vue" langue="vue"  title="是否关闭演示" desc="通过close来控制">
</demo>


### slot 插槽

<demo src="./test/edit.vue" langue="vue"  title="尺寸演示" desc="插槽">
</demo>


## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| type     | String  | info / error / warn                       | info  | 类型控制 |
| closeable     | Boolean  | true/false | false | 是否关闭按钮                                                   |
| message | String | | ''   | 横幅内容       
| width | Number | | 232  | 宽度                                              |


### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| close | (e: Event) | 关闭回调 |

### Slot

| 名称    | 说明             |
| :------ | :--------------- |
| default | 任意内容插入 |
