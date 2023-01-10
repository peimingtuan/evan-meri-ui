<template>
	<div class="form-box">
		<m-form ref="Mform" labelWidth="100px" :rules="rules" :model="params">
			<m-form-item label="用户名" prop="username">
				<m-input v-model="params.username"></m-input>
			</m-form-item>
			<m-form-item
        :label="'爱好' + index"
				:prop="'item.' + index + '.hobby'"
				v-for="(item, index) in params.list"
        :itemModel="item.hobby"
				:rules="{
					required: true,
					message: '爱好不可为空' + index,
					trigger: 'blur'
				}"
			>
				<m-input v-model="item.hobby" style="width: 200px"></m-input>
			</m-form-item>
			<m-form-item>
				<m-button type="primary" @click="sumbit">提交</m-button>
				<m-button @click="clearValidate">取消</m-button>
				<m-button @click="add">添加</m-button>
				<m-button @click="deleteItem">删除</m-button>
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
			list: [{ hobby: '' }]
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
		const validatePhone = (rule: any, value: any, callback: any) => {
			const regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			if (!regPhone.test(value)) {
				callback(new Error('请输入正确的手机号'))
			} else {
				callback()
			}
		}
		const rules = ref({
			username: [
				{ required: true, message: '请输入用户名', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度3 ~ 5', trigger: ['blur', 'change'] }
			],
			age: { required: true, message: '请输入年龄', trigger: 'blur' },
			sex: { required: true, message: '请输入性别', trigger: 'blur' },
			phone: [
				{ required: true, message: '请输入手机号', trigger: 'blur' },
				{ validator: validatePhone, trigger: ['blur'] }
			],
			email: [
				{ required: true, message: '请输入邮箱', trigger: 'blur' },
				{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
			]
		})
    const add = () => {
			params.value.list.push({ hobby: '' })
		}
    const deleteItem = () =>{
      params.value.list.pop()
    }
		const Mform = ref<any>(null)
		const sumbit = () => {
			Mform.value.validate((valid: boolean, error: any) => {
				console.log(valid)
				console.log(error)
			})
		}
		return {
			params,
			list,
			rules,
			Mform,
			sumbit,
      add,
      deleteItem,
			clearValidate() {
				Mform.value.clearValidate('')
			}
		}
	}
})
</script>
<style scoped lang="less">
.form-box {
	width: 100%;
}
</style>
