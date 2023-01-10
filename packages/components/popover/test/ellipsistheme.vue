<template>
	<div style="width: 250px;line-height: normal;cursor: default;" class="m-ellipsis" v-ellipsis>
		{{ text }}
	</div>
	<div style="width: 250px;line-height: normal;cursor: default;" class="m-ellipsis" v-ellipsis="{ theme: 'light' }">
		{{ text }}
	</div>
	<m-button @click="add">增加字数</m-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			text: '只要你肯回头望'
		})
		const add = () => {
			state.text += ',会发现我一直都在'
		}
		return { ...toRefs(state), add }
	}
})
</script>
