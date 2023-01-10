<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table :columns="list" :dataSource="data" :setting="true" :checkbox="true"> </m-table>
	</div>
</template>


<script lang="ts">
import { defineComponent, h, reactive, ref } from 'vue'
import _ from 'lodash'
export default defineComponent({
	components: {},
	setup() {
		const data = ref(
			_.range(20).map(index => {
				return {
					id: `id-${index}`,
					'0': index,
					'1': 100 - index,
					'2': index,
					'3': `占位文字-${index}`,
					'4': `占位文字-${index}`,
					'5': `占位文字`,
					'6': `占位文字-${index}`,
					'7': `占位文字`,
					'8': `占位文字-${index}`
				}
			})
		)

		const list = ref([
			{
				dataIndex: '0',
				title: `纯文字表头`,
				weight: 1
			},
			{
				dataIndex: '1',
				title: `超出隐藏的表头超出隐藏的表头超出隐藏的表头`,
				ellipsis: true,
				width: 200
			},
			{
				dataIndex: '2',
				title: `排序表头`,
				sorter: true,
				weight: 1
			},
			{
				dataIndex: '3',
				title: `注释表头`,
				desc: '注释内容注释内容注释内容注释内容',
				weight: 1
			}
		])

		return { list, data }
	}
})
</script>
<style>
.container {
	width: 100%;
	height: 450px;
}
</style>
