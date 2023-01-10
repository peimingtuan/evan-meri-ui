<template>
	<div class="select">
		<section>
			<div>自定义下拉列表内容-标签</div>
			<m-select v-model="selectValue">
				<m-option v-for="item in list" :key="item.id" :value="item.id" :label="item.name">
					<m-tag :color="item.color">{{ item.name }}</m-tag>
				</m-option>
			</m-select>
		</section>
		<section>
			<div>带Tab下拉</div>
			<m-select v-model="selectValue" clearable>
				<div class="tab">
					<m-tabs :data="items" v-model="tabActive" style="margin: auto; margin-bottom: 8px"></m-tabs>
				</div>
				<section v-show="tabActive === '1'">
					<m-option v-for="item in list1" :key="item.id" :value="item.id" :label="item.name"> </m-option>
				</section>
				<section v-show="tabActive === '2'">
					<m-option v-for="item in list2" :key="item.id" :value="item.id" :label="item.name"> </m-option>
				</section>
			</m-select>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref()

const tabActive = ref('1')

const items = ref<any[]>([
	{
		id: '1',
		name: `专用信息`,
		disabled: false
	},
	{
		id: '2',
		name: `通用信息`,
		disabled: false
	}
])

const list = ref([
	{
		id: '123123',
		name: '选项1',
		color: '#0091ff'
	},
	{
		id: '22222',
		name: '选项2',
		color: '#237B19'
	},
	{
		id: '33333',
		name: '选项3',
		color: '#AA7803'
	}
])

const list1 = ref([
	{
		id: '111',
		name: '专用选项1'
	},
	{
		id: '222',
		name: '专用选项2'
	},
	{
		id: '333',
		name: '专用选项3'
	}
])

const list2 = ref([
	{
		id: '444',
		name: '通用选项1'
	},
	{
		id: '555',
		name: '通用选项2'
	},
	{
		id: '666',
		name: '通用选项3'
	}
])
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
.tab{
	display: flex;
	align-items: center;
}
</style>
