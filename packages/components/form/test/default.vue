<template>
	<div class="form-box">
		<m-form ref="Mform" labelWidth="100px">
			<m-form-item label="用户名">
				<m-input v-model="params.username"></m-input>
			</m-form-item>
			<m-form-item label="年龄">
				<m-input-number v-model="params.age" style="width:200px"></m-input-number>
			</m-form-item>
			<m-form-item label="性别">
				<m-select v-model="params.sex" :options="list" :size="200"> </m-select>
			</m-form-item>
      <m-form-item label="电话">
				<m-input v-model="params.phone"></m-input>
			</m-form-item>
      <m-form-item label="邮箱">
				<m-input v-model="params.email"></m-input>
			</m-form-item>
			<m-form-item>
				<m-button type="primary">提交</m-button>
				<m-button>取消</m-button>
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
			phone: '',
			age: 18,
			sex: ''
		})
		const list = ref([
			{
				id: '0',
				name: '保密'
			},
			{
				id: '1',
				name: '男'
			},
			{
				id: '2',
				name: '女'
			}
		])
		return { params, list }
	}
})
</script>
<style scoped lang="less">
.form-box {
	width: 100%;
}
</style>
