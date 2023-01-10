<template>
	<div class="select">
		<section>
			<div>带分组的单选</div>
			<m-select v-model="selectValue" clearable searchable>
				<m-option-group v-for="item in list" :key="item.id" :label="item.name">
					<m-option v-for="el in item.children" :key="el.id" :value="el.id" :label="el.name"></m-option>
				</m-option-group>
			</m-select>
		</section>
		<section>
			<div>带分组的多选</div>
			<m-select v-model="selectValue2" multiple clearable>
				<m-option-group v-for="item in list" :key="item.id" :label="item.name">
					<m-option v-for="el in item.children" :key="el.id" :value="el.id" :label="el.name"></m-option>
				</m-option-group>
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
	{
		id: '11111',
		name: '分组1',
		children: [
			{
				id: '123123',
				name: '选项1-1'
			},
			{
				id: '22222',
				name: '选项1-2',
				disabled: true
			},
			{
				id: '33333',
				name: '选项1-3'
			},
			{
				id: '444',
				name: '选项1-4'
			}
		]
	},
	{
		id: '2222-2',
		name: '分组2',
		children: [
			{
				id: '555',
				name: '选项2-1'
			},
			{
				id: '666',
				name: '选项2-2'
			},
			{
				id: '777',
				name: '选项2-3'
			},
			{
				id: '888',
				name: '选项2-4'
			},
			{
				id: '999',
				name: '选项2-5'
			}
		]
	}
])
const selectValue = ref()
const selectValue2 = ref()
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
