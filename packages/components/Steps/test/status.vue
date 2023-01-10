<template>
	<m-steps style='margin:0 auto' :source='activities' :layout='"horizontal"'></m-steps>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const activities = ref([
			{
				type: 'success',
				id: '1',
				tips: '正常默认带状态的颜色',
				title: '第一次验收',
				status: 'finish'
			},
			{
				id: '2',
				tips: '完成带状态的默认颜色',
				title: '第一次验收',
				status: 'success'
			},
			{
				id: '3',
				tips: '未完成带状态的默认颜色',
				title: '第一次验收',
				status: 'error'
			}
		])
		return { activities }
	}
})
</script>