<template>
	<!-- <m-select-header :showSearch="false"></m-select-header>

  <m-select-header :showSearch="true"></m-select-header>

  <m-select-header :showSearch="true" :open="true"></m-select-header> -->
	<m-select-header :searchable="true"></m-select-header>

	<m-select-header searchable clearable="false"></m-select-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const open = ref(false)

		return { open }
	}
})
</script>
