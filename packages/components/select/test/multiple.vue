<template>
	<div class="select">
		<section>
			<div>基础多选template风格</div>
			<m-select v-model="selectValue1" :options="list" multiple clearable searchable>
				<m-option v-for="item in list" :key="item.id" :value="item.id" :label="item.name">
					{{ `自定义${item.name}` }}
				</m-option>
			</m-select>
		</section>
		<section>
			<div>回显tag模式(自定义tag宽度示例)</div>
			<m-select
				v-model="selectValue2"
				:options="list"
				mode="tags"
				:maxTagCount="2"
				:maxTagWidth="78"
				multiple
				clearable
			>
			</m-select>
		</section>
		<section>
			<div>禁用状态</div>
			<m-select ref="select" v-model="selectValue3" multiple :options="list" disabled> </m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testList } from './test'
const selectValue1 = ref()
const selectValue2 = ref()
const selectValue3 = ref()
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
