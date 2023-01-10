<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-09-06 18:37:42
 * @LastEditTime: 2022-09-06 18:44:40
 * @LastEditors: Devin
 * @Reference: 
-->
<template>
	<div>
		自定义宽度：<m-input-number
			v-model="width"
			placeholder="输入数字"
			controls="operator"
			:step="2"
		></m-input-number>
    <br/>
    <br/>
    <br/>
    <br/>
		<m-popover :show-arrow="false" :width="width + 'px'" trigger="click">
			<template #content>
				价值选择是对价值与成本的权衡选择。选择安全/品质优先，则
				安全事故风险或品质问题风险相对更低，但一般为此付出的人力
				成本、维护成本、能源成本代价相对更高；选择成本优先，则成 本代价降低，但管理风险可能增加。
			</template>
			<m-button>Light</m-button>
		</m-popover>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const width = ref<number>(200)
		const height = ref<number>(100)
		return { width, height }
	}
})
</script>
<style lang="less" scoped></style>
