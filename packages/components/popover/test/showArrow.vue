<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-09-06 18:17:55
 * @LastEditTime: 2022-10-14 16:51:29
 * @LastEditors: Devin
 * @Reference: 
-->
<template>
	<m-popover class="m-popover__tips">
		<template #content>
			<div class="tip-pop">
				<div class="popover-title">空调</div>
				<div class="popover-main">
					<div class="popover-left">
						<div class="popover-left-item">
							<div class="popover-left-item-text">已发布策略</div>
							<div class="popover-left-item-number">54</div>
						</div>
						<div>
							<div class="popover-left-item-text">已发布策略</div>
							<div class="popover-left-item-number">54</div>
						</div>
					</div>
					<div class="popover-right">
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
					</div>
				</div>
			</div>
		</template>
		<m-button>Light</m-button>
	</m-popover>
	<m-popover theme="dark" :show-arrow="false" width="420px" placement="top" class="m-popover__tips">
		<template #content>
			价值选择是对价值与成本的权衡选择。选择安全/品质优先，则
			安全事故风险或品质问题风险相对更低，但一般为此付出的人力
			成本、维护成本、能源成本代价相对更高；选择成本优先，则成 本代价降低，但管理风险可能增加。
		</template>
		<m-button>Dark</m-button>
	</m-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const isOpen = ref<boolean>(false)
		return { isOpen }
	}
})
</script>
<style lang="less" scoped>
.tip-pop {
	.popover-title {
		font-weight: 700;
	}
	.popover-main {
		display: flex;
		.popover-left {
			margin-right: 20px;
		}
	}
}
</style>
