<template>
	<div class="anchor-demo">
		自定义宽度：<m-input-number
			v-model="dataVal"
			placeholder="输入数字"
			controls="operator"
			:step="2"
		></m-input-number>
		<m-anchor :sections="sections" :width="dataVal + 'px'" style="margin-right: 50px;margin-top: 20px;"> </m-anchor>
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
					id: '基础用法'
				},
				{ label: '固定位置' },

				{ label: '大小层级设置' },
				{ label: '悬浮主题设置' },
				{ label: '显示背景' },
				{ label: '取消侧面的轨道' },
				{ label: '滚动到' }
			],
			dataVal: 82
		})
		return { ...toRefs(state) }
	}
})
</script>
<style lang="less" scoped>
.anchor-demo {
	margin-left: 20px;
}
</style>
