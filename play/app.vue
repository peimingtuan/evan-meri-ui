<template>
	<div>
		<m-button @click="validate">按钮</m-button>
		<m-button @click="add">添加</m-button>
		<m-button @click="clearValidate">清空校验</m-button>
		<m-button @click="resetFields">重置</m-button>
		<m-button @click="validateField">手动校验用户名</m-button>
	</div>
	<div class="content">
		<m-form labelPosition="top" requireAsteriskPosition="right" :model="params" scrollToError :rules="rules" ref="Mform">
			<m-form-item prop="username" label="用户名" labelWidth="100px">
				<m-input v-model="params.username"></m-input>
			</m-form-item>
			<m-form-item prop="password" label="密码" labelWidth="100px">
				<m-input v-model="params.password"></m-input>
			</m-form-item>
			<m-form-item
				:label="'邮箱-----' + i"
				labelWidth="100px"
				v-for="(item, i) in params.list"
				:key="i"
				:prop="'list.' + i + '.email'"
				:item-model="item.email"
				:rules="[
					{ required: true, message: '请输入邮箱', trigger: ['blur'] },
					{ validator: validateEmail, trigger: ['blur'] }
				]"
			>
				<m-input :width="300" placeholder="请输入邮箱" v-model="item.email" />
			</m-form-item>
		</m-form>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
export default defineComponent({
	setup() {
		const state = reactive({
			params: { username: '', password: '', list: [{ email: '' }, { email: '' }] }
		})
		const Mform = ref<any>(null)
		const add = () => {
			state.params.list.push({ email: '' })
		}
		const rules = ref({
			username: [
				{
					required: true,
					message: '请输入用户名',
					trigger: ['blur']
				},
				{ min: 3, max: 5, message: '长度3 ~ 5', trigger: ['blur', 'change'] }
			],
			password: {
				required: true,
				message: '请输入密码',
				trigger: ['blur']
			}
		})
		const validateEmail = (rule: any, value: any, callback: any) => {
			const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (!regEmail.test(value)) {
				callback(new Error('请输入正确的邮箱地址'))
			} else {
				callback()
			}
		}
		return {
			...toRefs(state),
			Mform,
			add,
			rules,
			validateEmail,
			validate() {
				Mform.value.validate((valid: boolean, error: any) => {
					console.log(valid)
					console.log(error)
				})
			},
			clearValidate() {
				Mform.value.clearValidate('')
			},
			resetFields() {
				Mform.value.resetFields('')
			},
			validateField() {
				Mform.value
					.validateField(['username'])
					.then(() => {
						console.log('success')
					})
					.catch((e: any) => {
						console.log(e)
					})
			}
		}
	}
})
</script>
<style lang="less">
html,
body {
	height: 100%;
}

.content {
	width: 50%;
	margin: 200px auto;
	height: 600px;
	overflow: auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	border: 1px solid #123a12;
}
</style>
