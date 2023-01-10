<template>
	<div class="anchor-demo">
		<m-anchor :sections="sections" width="200px" style="margin-right:20px"> </m-anchor>
		<m-anchor :sections="sections" width="200px" size="small"> </m-anchor>
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
					children: [{ label: '固定位置' }, { label: '显示背景' }, { label: '取消侧面的轨道' }]
				},

				{ label: '大小层级设置' },
				{ label: '滚动到' }
			]
		})
		return { ...toRefs(state) }
	}
})
</script>
<style lang="less" scoped>
.anchor-demo {
	display: flex;
	align-items: center;
}
</style>
