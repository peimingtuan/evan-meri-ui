<template>
	<div class="form-box">
		<m-form ref="Mform" labelWidth="100px" inline>
			<m-form-item label="用户名">
				<m-input v-model="params.username"></m-input>
			</m-form-item>
			<m-form-item label="年龄">
				<m-input-number v-model="params.age" style="width:200px"></m-input-number>
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
		
		return { params }
	}
})
</script>
<style scoped lang="less">
.form-box {
	width: 100%;
}
</style>
