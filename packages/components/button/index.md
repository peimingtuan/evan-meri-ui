---
index: 0
text: 按钮 Button
componentIndex: 0
sidebarDepth: 2
---

# 按钮 Button

常用的操作按钮

## 演示

### Type 类型

<demo src="./test/type.vue" langue="vue"  title="类型演示" desc=" 可以通过type来设置按钮的类型">
</demo>

### Size 尺寸

<demo src="./test/size.vue" langue="vue"  title="尺寸演示" desc="通过 `size` 等于large、medium、small、来控制按钮的状态。">
</demo>


### Icon 图标

<demo src="./test/icon.vue" langue="vue"  title="尺寸演示" desc="内部图标的样式采用的插槽的方式传入（为了更加灵活）。">
</demo>

### Loading 加载

<demo src="./test/loading.vue" langue="vue"  title="loading演示">
</demo>

### width  自定义宽度

<demo src="./test/width.vue" langue="vue"  title="width演示">
</demo>



## API

### 属性

| 名称     | 类型    | 可选值                                   | 默认值  | 说明                                                       |
| :------- | :------ | :--------------------------------------- | :------ | :--------------------------------------------------------- |
| size     | String  | large / medium / small                   | medium  | 按钮大小,图标通过插槽传入图标， 需要通过图标的属性设置大小 |
| type     | String  | default / primary / danger / link /  text /icon | default | 按钮类型                                                   |
| disabled | Boolean | true /  false                            | false   | 是否禁用                                                   |
| loading  | Boolean | true /  false                            | false   | 是否正在加载中                                             |
| icon-bg  | Boolean | true/  false                             | false   | icon按钮是否添加背景颜色，只针对type=icon生效
| icon     | String  |                                          |         | 只针对type=icon生效
| icon-size| Number  |                                          |         | 只针对type=icon生效

### 事件

| 名称    | 参数       | 说明         |
| :------ | :--------- | :----------- |
| onClick | (e: Event) | 按钮点击回调 |

### Slot

| 名称    | 说明             |
| :------ | :--------------- |
| default | 按钮中显示的内容 |
