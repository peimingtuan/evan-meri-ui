<template>
	<m-button @click="open">点击打开confirm类型的message-box</m-button>
	<m-button @click="openalert">点击打开alert类型的message-box</m-button>
	<m-button @click="openscorll">点击打开 背景锁定滚动 类型的message-box</m-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import $notify from '../../notification/src/NotificationProps'
import MessageBox from '../index'
export default defineComponent({
	setup() {
		const open = () => {
			MessageBox({
				title: '标题',
				message: `This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)his is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)`
			})
				.then(() => {
					$notify.success({ title: '点击确定', content: '点击确定' })
				})
				.catch(() => {
					$notify.success({ title: '点击取消或关闭', content: '点击取消或关闭' })
				})
		}
		const openalert = () => {
			MessageBox.alert({
				title: '标题',
				message: ``
			})
				.then(() => {})
				.catch(() => {})
		}
		const openscorll = () => {
			MessageBox({
				title: '',
				message: `This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)`,
				lockScroll: true
			})
				.then(() => {})
				.catch(() => {})
		}
		return { open, openalert, openscorll }
	}
})
</script>
