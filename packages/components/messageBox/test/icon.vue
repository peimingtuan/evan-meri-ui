<template>
	<m-button @click="open">点击打开 danger 类型的message-box</m-button>
	<m-button @click="openalert">点击打开 primary 类型的message-box</m-button>
	<m-button @click="openicon">点击打开 自定义图标 的message-box</m-button>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import $notify from '../../notification/src/NotificationProps'
import MessageBox from '../index'
import { IconMeriComponentNotificationError } from 'meri-icon'
export default defineComponent({
	setup() {
		const open = () => {
			MessageBox.confirm({
				type: 'danger',
				title: '标题',
				confirmButtonText:'删除',
				message: `This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)`
			})
				.then(() => {})
				.catch(() => {})
		}
		const openalert = () => {
			MessageBox.confirm({
				type: 'primary',
				title: '标题',
				message: `This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)`
			})
				.then(() => {})
				.catch(() => {})
		}
		const openicon = () => {
			MessageBox({
				type: 'primary',
				title: '标题',
				message: 'This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)',
				icon: h(IconMeriComponentNotificationError, { size: 24 })
			})
				.then(() => {
					console.log('confirm')
				})
				.catch(() => {
					console.log('cancel')
				})
		}
		return { open, openalert, openicon }
	}
})
</script>
