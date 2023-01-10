<template>
	<div class="select">
		<section>
			<div>多选带确认</div>

			<m-select
				v-model="selectValue"
				:options="list"
				flow="topLeft"
				menuSize="max"
				multiple
				clearable
				searchable
				hasConfirm
			>
				<m-option
					v-for="item in list"
					:key="item.id"
					:value="item.id"
					:label="item.name"
					:disabled="item.disabled"
				>
					{{ `自定义${item.name}` }}
				</m-option>
			</m-select>
		</section>
		<section>
			<div>回显tag模式带确认</div>
			<m-select
				v-model="selectValue"
				:options="list"
				mode="tags"
				:maxTagCount="2"
				:maxTagTextLength="2"
				multiple
				clearable
				hasConfirm
			>
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testList } from './test'
const list = ref(testList)
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
