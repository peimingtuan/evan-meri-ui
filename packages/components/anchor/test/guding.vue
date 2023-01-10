<template>
	<div style="height:270px">
		<m-anchor
			:sections="sections"
			offset
			width="200px"
			:position="{ top: '100px', right: '220px' }"
		>
		</m-anchor>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			sections: [
				{
					label: '基础用法测试超出隐藏tip显示',
					id: '基础用法',
				},
				{ label: '固定位置' },
				{ label: '大小层级设置' },
				{ label: '悬浮主题设置' },
				{ label: '显示背景' },
				{ label: '取消侧面的轨道' },
				{ label: '滚动到' }
			]
		})
		return { ...toRefs(state) }
	}
})
</script>
<style lang="less" scoped>
:deep(.isOffset){
  background-color: #fff;
  border: 1px solid #EFF0F1;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 20px 30px rgba(31, 35, 41, 0.05);
}
</style>