<template>
	<div class="select">
		<section>
			<div>开启虚拟列表的选择器</div>
			<m-select v-model="selectValue" :options="list" clearable searchable virtual> </m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const array = Array.from(Array(99999).keys()).map((el: number) => ({ id: el.toString(), name: el.toString() }))

const list = ref(array)

const selectValue = ref()
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
