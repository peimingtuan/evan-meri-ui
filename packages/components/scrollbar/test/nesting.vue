<template>
	<div class="m-scrollbar-demo2" :style="{ width: domWidth + 'px', height: domHeight + 'px' }">
		<m-scrollbar scrollClass="demo-body">
			<div class="flex">
				<div class="demo-body-default">
          <p><center>原生滚动条</center></p>
					{{ list }}
				</div>
				<div class="flex-content">
					<m-scrollbar>
						{{ list }}
					</m-scrollbar>
				</div>
			</div>
		</m-scrollbar>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const list = ref(
			`   生命，也许是宇宙之间唯一应该受到崇拜的因素。生命的孕育、诞生和显示本质是一种无比激动人心的过程。生命像音乐和画面一样暗自挟带着一种命定的声调或血色，当它遇到大潮的袭卷，当它听到号角的催促时，它会顿时抖擞，露出本质的绚烂和激昂。当然，这本质更可能是卑污、懦弱、乏味的；它的主人并无选择的可能。

应当承认，生命就是希望。应当说，卑鄙和庸俗不该得意过早，不该误认为它们已经成功地消灭了高尚和真纯。伪装也同样不能持久，因为时间像一条长河在滔滔冲刷，卑鄙者、奸商和俗棍不可能永远戴着教育家、诗人和战士的桂冠。在他们畅行无阻的生涯尽头，他们的后人将长久地感到羞辱。`
		)

		const domWidth = ref(1000)
		const domHeight = ref(200)

		return {
			list,
			domHeight,
			domWidth
		}
	}
})
</script>
<style lang="less" scoped>
.m-scrollbar-demo2 {
	margin-bottom: 20px;
	border: 1px solid var(--border-color);
	:deep(.demo-body .m-scorllbar-content .flex) {
    height: 400px;
		padding: 20px;
		display: flex;
	}
	.demo-body-default {
		width: 200px;
		height: 150px;
		overflow-y: auto;
		border: 1px solid var(--border-color);
	}
	.flex-content {
		width: 200px;
		height: 150px;
    margin-left: 200px;
    border: 1px solid var(--border-color);
	}
}
</style>
