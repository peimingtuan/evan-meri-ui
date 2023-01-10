<template>
	<m-popconfirm content="确定删除“工作日晴天夏季”？" @cancel="cancel" @confirm="confirm">
		<m-button>click</m-button>
	</m-popconfirm>
	<m-popconfirm
		content="确定删除“工作日晴天夏季”？确定删除“工作日晴天夏季”？确定删除“工作日晴天夏季”？确定删除“工作日晴天夏季”？"
		@cancel="cancel"
		@confirm="confirm"
		status="danger"
    confirm-button-text="删除"
    cancel-button-text="不要"
		:beforeCancel="beforeCancel"
		:shiftOffset="10"
	>
		<m-button>二次取消确认</m-button>
	</m-popconfirm>
	<m-popconfirm
		content="确定删除“工作日晴天夏季”？"
		@cancel="cancel"
		@confirm="confirm"
    status="primary"
		:beforeConfirm="beforeConfirm"
    cancel-button-text="no"
    confirm-button-text="yes"
	>
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
