<template>
	<div class="form-box">
		<m-select v-model="labelPosition" :options="list" :size="200" style="margin-left: 100px"> </m-select>
		<br />
		<br />
		<br />
		<m-form labelWidth="100px" :labelPosition="labelPosition">
			<m-form-item label="用户名">
				<m-input v-model="params.username"></m-input>
			</m-form-item>
			<m-form-item label="年龄">
				<m-input-number v-model="params.age" style="width: 200px"></m-input-number>
			</m-form-item>
			<m-form-item>
				<m-button type="primary">提交</m-button>
			</m-form-item>
		</m-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from '@vue/runtime-core'
export default defineComponent({
	setup() {
		const params = ref({
			username: '',
			sex: ''
		})
		const list = ref([
			{
				id: 'left',
				name: 'Left'
			},
			{
				id: 'right',
				name: 'Right'
			},
			{
				id: 'top',
				name: 'Top'
			}
		])
		const labelPosition = ref('right')
		return { params, labelPosition, list }
	}
})
</script>
<style scoped lang="less">
.form-box {
	width: 100%;
}
</style>
