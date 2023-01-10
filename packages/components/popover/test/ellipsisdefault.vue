<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-09-06 18:18:59
 * @LastEditTime: 2022-09-06 18:20:29
 * @LastEditors: Devin
 * @Reference: 
-->

<template>
	<m-button @click="disabled = !disabled">{{ !disabled ? '关闭' : '开启' }}</m-button>
	<div style="width: 250px;line-height: normal;cursor: default;" class="m-ellipsis" v-ellipsis="{ disabled: disabled }">
		{{ text }}
	</div>
	<div style="width: 250px; height: 65px;line-height: normal;cursor: default;" class="m-ellipsis1" v-ellipsis>
		{{ text }}
	</div>
	<m-button @click="add">增加字数</m-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			text: '只要你肯回头望'
		})
		const add = () => {
			state.text += ',会发现我一直都在'
		}
		return { ...toRefs(state), add, disabled: ref(false) }
	}
})
</script>
<style lang="less" scoped>
.m-ellipsis1 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>
