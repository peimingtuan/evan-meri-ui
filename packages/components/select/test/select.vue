<template>
	<div class="select">
		<section>
			<div>单选选择器</div>
			<m-select v-model="selectValue" :options="list"> </m-select>
		</section>
		<section>
			<div>可清空</div>
			<m-select v-model="selectValue" :options="list" clearable> </m-select>
		</section>
		<section>
			<div>前置标签</div>
			<m-select ref="select" v-model="selectValue" :options="list" prefix="设备状态："> </m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testList } from './test'
const selectValue = ref('999')
const list = ref(testList)
</script>

<style lang="less" scoped>
.select {
	display: flex;
	justify-content: space-between;
	font-size: var(--font-m);
	& > section {
		margin-right: 20px;
		> div {
			margin-bottom: 5px;
		}
	}
}
</style>
