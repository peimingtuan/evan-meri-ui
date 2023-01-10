<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table
			:columns="list"
			:mergeMethod="mergeMethod"
			:dataSource="data"
			:setting="true"
			:checkbox="true"
			:columnLine="true"
		>
			<template #tooltip="{ checkeds }">
				已选择 {{ checkeds.length }} 项目 (这块内容是插槽自己填写)
				<m-button>下载</m-button>
				<m-button>删除</m-button>
				(这块内容是插槽自己填写)
			</template>
		</m-table>
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
					'2': index * 2,
					'3': index * 3,
					'4': index * 4,
					'5': index * 5,
					'6': index * 6,
					'7': index * 7,
					'8': `占位文字-${index}`,
					'9': `占位文字-${index}`,
					'10': `占位文字-${index}`,
					'11': `占位文字-${index}`,
					'12': `占位文字-${index}`
				}
			})
		)

		let num = 0

		const mergeMethod = (row: any, col: any, rowIndex: number, colIndex: number) => {
			// if (rowIndex == 0 && (colIndex == 0 || colIndex == 2)) {
			// 	return {
			// 		rowspan: 3,
			// 		colspan: 1
			// 	}
			// }

			// if ((rowIndex == 1 || rowIndex == 2) && (colIndex == 0 || colIndex == 2)) {
			// 	return {
			// 		rowspan: 0
			// 	}
			// }

			return {
				rowspan: 1,
				colspan: 1
			}
		}

		const list = ref([
			{
				dataIndex: '1',
				title: '一级标题1',
				fixed: 'left',
				sorter: true,
				resizable: true
			},
			{
				dataIndex: '11',
				title: '一级标题2',
				resizable: true,
				children: [
					{
						dataIndex: '12',
						title: '二级标题2-1',
						resizable: true,
						children: [
							{
								dataIndex: '2',
								title: '三级标题2-1-1',
								sorter: true,
								resizable: true,
								children: []
							},
							{
								dataIndex: '3',
								title: '三级标题2-1-2',
								sorter: true,
								resizable: true,
								children: []
							}
						]
					},
					{
						dataIndex: '13',
						title: '二级标题2-2',
						resizable: true,
						children: [
							{
								dataIndex: '4',
								title: '三级标题2-2-1',
								resizable: true,
								children: []
							},
							{
								dataIndex: '5',
								title: '三级标题2-2-2',
								sorter: true,
								resizable: true,
								children: []
							}
						]
					}
				]
			},
			{
				dataIndex: '14',
				title: '一级标题3',
				resizable: true,
				children: [
					{
						dataIndex: '15',
						title: '二级标题3-1',
						resizable: true,
						children: [
							{
								dataIndex: '6',
								title: '三级标题3-1-1',
								resizable: true,
								children: []
							},
							{
								dataIndex: '7',
								title: '三级标题3-1-2',
								sorter: true,
								resizable: true,
								children: []
							}
						]
					},
					{
						dataIndex: '16',
						title: '二级标题3-2',
						resizable: true,
						children: [
							{
								dataIndex: '8',
								title: '三级标题3-2-1',
								resizable: true,
								children: []
							},
							{
								dataIndex: '9',
								title: '三级标题3-2-2',
								resizable: true,
								children: []
							}
						]
					}
				]
			},
			{
				dataIndex: '10',
				title: '一级标题4',
				width: 200,
				resizable: false,
				fixed: 'right'
			}
		])

		console.log(JSON.stringify(list.value))

		return { list, data, mergeMethod }
	}
})
</script>
<style>
.container {
	width: 100%;
	height: 450px;
}
</style>
