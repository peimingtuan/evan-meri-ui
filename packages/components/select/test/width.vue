<template>
	<div class="select">
		<section>
			<div>下拉框最大宽度</div>
			<m-select v-model="selectValue" :options="list" menuSize="max" clearable> </m-select>
		</section>
		<section>
			<div>下拉框最小宽度</div>
			<m-select v-model="selectValue" :options="list" menuSize="min"> </m-select>
		</section>
		<section>
			<div>下拉框自定义宽度</div>
			<m-select ref="select" v-model="selectValue" :options="list" :menuSize="300" prefix="设备状态：">
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testList } from './test'

const selectValue = ref('')

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
