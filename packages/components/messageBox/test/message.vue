<template>
	<m-button @click="open">点击打开 将message当成html渲染 类型的message-box</m-button>
	<m-button @click="openalert">点击打开 传入虚拟dom的message 类型的message-box</m-button>
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
				message: `<b>This is a message. <del>弹窗最小高度154px，最大高度198px</del> (即3行文字，文案最多不超过3行)</b>`,
				useHtmlString: true
			})
				.then(() => {})
				.catch(() => {})
		}
		const openalert = () => {
			MessageBox.confirm({
				type: 'primary',
				title: '标题',
				message: h(
					'div',
					{ style: { color: 'red' } },
					`This is a message. 弹窗最小高度154px，最大高度198px (即3行文字，文案最多不超过3行)`
				)
			})
				.then(() => {})
				.catch(() => {})
		}
		return { open, openalert }
	}
})
</script>
