<template>
	<div class="select">
		<section>
			<div>无搜索</div>
			<m-select v-model="selectValue" :options="list" :maxScrollHeight="500"> </m-select>
		</section>
		<section>
			<div>触发器带搜索</div>
			<m-select v-model="selectValue" :options="list" clearable searchable> </m-select>
		</section>
		<section>
			<div>下拉列表自定义搜索</div>
			<m-select ref="select" v-model="selectValue" clearable>
				<template #panelHeader>
					<div class="search">
						<m-search @change="handleChange" width="216" immediate> </m-search>
					</div>
				</template>
				<m-option v-for="item in searchList" :value="item.id" :label="item.name" :key="item.id">
					<span v-html="item.html || item.name"></span>
				</m-option>
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { escapeRegExp } from 'lodash'
import { testList } from './test'

const selectValue = ref()
const searchVal = ref('')

const handleChange = (val: string) => {
	searchVal.value = val
}

const searchList = computed(() => {
	if (!searchVal.value) return list.value
	const searchArr = list.value.filter(el => {
		return el.name.includes(searchVal.value)
	})
	const Reg = new RegExp(escapeRegExp(searchVal.value), 'gi')
	return searchArr.map(el => {
		const newEl = { ...el, ...{ html: '' } }
		newEl.html = el.name.replace(Reg, `<span style="color:var(--primary-color)">$&</span>`)
		return newEl
	})
})
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
.search {
	padding: 12px 12px 4px;
}
</style>
