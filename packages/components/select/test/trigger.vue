<template>
	<div class="select">
		<section>
			<div>覆盖样式自定义触发器</div>
			<m-select class="custom-select" v-model="selectValue" :size="120" :options="list" multiple> </m-select>
		</section>
		<section>
			<div>完全自定义触发器</div>
			<m-select v-model="selectValue2" :options="list" multiple>
				<template #trigger="scope">
					<m-button>点我打开下拉面板</m-button>
					<span v-for="item in scope.list" :key="item.id" class="select-item">{{ item.name }}</span>
				</template>
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testList } from './test'
const selectValue = ref()
const selectValue2 = ref()
const list = ref(testList)
</script>

<style lang="less" scoped>
.select {
	display: flex;
	justify-content: space-between;
	font-size: var(--font-m);
	flex-grow: 1;
	&-item {
		display: inline-block;
		padding: 3px 5px;
		border-radius: 3px;
		background-color: var(--gray-400);
		margin: 5px 5px;
	}
	& > section {
		margin-right: 20px;
		flex-basis: 50%;
		> div {
			margin-bottom: 5px;
		}
	}
}
.custom-select {
	:deep(.m-select-inner) {
		border: none;
		background: var(--gray-200);
	}
}
</style>
