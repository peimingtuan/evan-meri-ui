<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table :columns="list" :dataSource="data" :setting="true" :columnLine="true" :resizable="true"> </m-table>
	</div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import _ from 'lodash'
export default defineComponent({
	components: {},
	setup() {
		const data = ref(
			_.range(8).map(index => {
				return {
					id: `id-${index}`,
					'0': `内容0-${index}`,
					'1': `内容1-${index}`,
					'2': `内容2-${index}`,
					'3': index,
					'4': 1000 - index,
					'5': `内容5-${index}`,
					'6': `内容6-${index}`,
					'7': `内容7-${index}`,
					open: true,
					checkbox: true,
					children: _.range(2).map(i => ({
						id: `id-${index}-${i}`,
						'0': `内容0-${index}-${i}`,
						'1': `内容1-${index}-${i}`,
						'2': `内容2-${index}-${i}`,
						'3': index + i,
						'4': 1000 - index - i,
						'5': `内容5-${index}-${i}`,
						'6': `内容6-${index}-${i}`,
						'7': `内容7-${index}-${i}`,
						checkbox: true,
						open: true,
						children: _.range(2).map(ii => ({
							id: `id-${index}-${i}-${ii}`,
							'0': `内容0-${index}-${i}-${ii}`,
							'1': `内容1-${index}-${i}-${ii}`,
							'2': `内容2-${index}-${i}-${ii}`,
							'3': index + i + ii,
							'4': 1000 - index - i - ii,
							'5': `内容5-${index}-${i}-${ii}`,
							'6': `内容6-${index}-${i}-${ii}`,
							'7': `内容7-${index}-${i}-${ii}`,
							checkbox: true,
							open: true
						}))
					}))
				}
			})
		)

		const list = ref(
			_.range(5).map(index => ({
				dataIndex: index.toString(),
				fixed: !index ? 'left' : index === 4 ? 'right' : 'center',
				title: `标题-${index}`,
				sorter: index === 3,
				resizable: index !== 4,
				ellipsis: true,
				weight: 1
			}))
		)

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
