<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-18 12:44:58
-->
<template>
	<div class="container">
		<m-table :columns="list" :checkbox="true" :dataSource="data" :setting="true">
			<template #1="{ id }">
				<span style="color: red">{{ id }}</span>
			</template>
			<template #2="{ id }">
				<m-button type="primary" size="small">按钮{{ id }}</m-button>
			</template>
			<template #3="{ id }">
				<m-tag color="#00A2A7" bg-color="#CBF7F3"> 悉心{{ id }} </m-tag>
			</template>
			<template #4="{ id }">
				<m-checkbox modelValue="uncheck">{{ id }}</m-checkbox>
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
<style>
.container {
	width: 100%;
	height: 450px;
}
</style>
