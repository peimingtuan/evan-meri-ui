<template>
	<div class="anchor-demo">
		<m-anchor :sections="sections" width="82px" style="margin-right: 50px"> </m-anchor>
		<m-anchor :sections="sections" width="82px" style="margin-right: 50px" ellipsisTheme="dark"> </m-anchor>
		<m-anchor :sections="sections" width="200px" style="margin-right: 50px" :showOverflowTooltip="false">
		</m-anchor>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const state = reactive({
			sections: [
				{
					label: '基础用法测试超出隐藏tip显示thisaaaaaaa',
					id: '基础用法'
				},
				{ label: '固定位置' },
				{ label: '大小层级设置' },
				{ label: '悬浮主题设置安装看了笑话的卡拉和SLKHFALS;DHKFLAHSKL;', id: '悬浮主题设置' },
				{ label: '显示背景' },
				{ label: '取消侧面的轨道' },
				{ label: '滚动到' }
			]
		})
		return { ...toRefs(state) }
	}
})
</script>
<style lang="less" scoped>
.anchor-demo {
	display: flex;
	align-items: center;
}
</style>
