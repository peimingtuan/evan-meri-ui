<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table :columns="list" :dataSource="data"> </m-table>
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
					'0': `占位文字-${index}`,
					'1': `占位文字-${index}`,
					'2': `占位文字-${index}`
				}
			})
		)

		const list = ref([
			{
				dataIndex: '0',
				title: `左对齐`,
				align:"left",
				weight: 1
			},
			{
				dataIndex: '1',
				align:"center",
				title: `居中`,
			},
			{
				dataIndex: '2',
				title: `右对齐`,
				align:"right",
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
