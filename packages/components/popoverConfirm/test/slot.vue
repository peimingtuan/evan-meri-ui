<template>
	<m-popconfirm content="确定删除“工作日晴天夏季”？" @cancel="cancel" @confirm="confirm" :beforeCancel="beforeCancel">
		<template #main="data">
			<m-input v-model="data.content"></m-input>
			<br/>
			<br/>
			<br/>
			<m-search :default-value="data.status" type="enter" :border="false"> </m-search>
		</template>
		<m-button>二次确认</m-button>
	</m-popconfirm>
	<m-popconfirm
		content="确定删除“工作日晴天夏季”？"
		@cancel="cancel"
		@confirm="confirm"
		status="primary"
		:beforeConfirm="beforeConfirm"
	>
		<template #footer="{ cancelButtonText, confirmButtonText }">
			<m-button type="text" size="small">{{ cancelButtonText }}</m-button>
			<m-button type="text" size="small">{{ confirmButtonText }}</m-button>
		</template>
		<m-button>二次确认</m-button>
	</m-popconfirm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { $Message } from '../../message'

export default defineComponent({
	setup() {
		const isOpen = ref<boolean>(false)

		return {
			isOpen,
			cancel() {
				$Message.success({ title: '取消' })
			},
			confirm() {
				$Message.success({ title: '确定' })
			},
			beforeCancel(done: () => void) {
				window.alert('是否关闭')
				done()
			},
			beforeConfirm(done: () => void) {
				window.alert('是否提交')
				done()
			}
		}
	}
})
</script>
