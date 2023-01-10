<template>
	<div style="gap: 0">
		<m-tag type="processing">Processing</m-tag>
		<m-tag type="error">Error</m-tag>
		<m-tag type="completed">Completed</m-tag>
		<m-tag type="rejected">Rejected</m-tag>
		<m-tag type="canceled">Canceled</m-tag>
		<m-tag icon="IconMeriActionTips" style="margin-left: 12px" color="#AC2F28" size="large"> 红酒 </m-tag>
		<m-tag color="#4E1BA7" size="large" style="margin-left: 12px">
			<template #icon="{ color }">
				<IconMeriActionStop size="14" :color="color"/>
			</template>
			大标签
		</m-tag>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
import { IconMeriActionStop } from 'meri-icon'
export default defineComponent({
	components: { IconMeriActionStop }
})
</script>
