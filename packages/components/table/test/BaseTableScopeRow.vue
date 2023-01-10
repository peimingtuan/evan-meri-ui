<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table :columns="list" :checkbox="true" :dataSource="data" :setting="true">
			<template #row="{ row }">
				<div style="height: 38px; width: 1100px">
					{{ row.id }}-这行的内容是自定义的，自己随便想怎么写怎么写，
				</div>
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
					slot: true,
					'0': `内容0-${index}`,
					'1': `内容1-${index}`,
					'2': `内容2-${index}`,
					'3': index,
					'4': 1000 - index,
					'5': `内容5-${index}`,
					'6': `内容6-${index}`,
					'7': `内容7-${index}`,
					'8': `内容8-${index}`,
					'9': `内容9-${index}`,
					'11': `内容11-${index}`,
					'12': `内容12-${index}`,
					'13': `内容13-${index}`,
					'14': `内容14-${index}`,
					'15': `内容15-${index}`,
					'16': `内容16-${index}`,
					'17': `内容17-${index}`,
					'18': `内容18-${index}`,
					'19': `内容19-${index}`
				}
			})
		)

		const list = ref(
			_.range(8).map(index => ({
				dataIndex: index.toString(),
				title: `标题${index}:`,
				weight: 1
			}))
		)

		return { list, data }
	}
})
</script>

<style scoped>
.container {
	width: 100%;
	height: 450px;
}
</style>