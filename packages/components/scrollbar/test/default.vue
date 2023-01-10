<template>
	<div class="demo-scroll">
		<div class="demo-scroll-box">
			<m-scrollbar
				ref="Mscrollbar"
				:autoHide="autoHide"
				scrollClass="demo-body"
				@onHStart="onHStart"
				@onHEnd="onHEnd"
				@onWStart="onWStart"
				@onWEnd="onWEnd"
				@onScroll="onScroll"
				:height="domHeight"
				:width="domWidth"
			>
				<div class="demo-box" :style="{ width: width + 'px' }">
					<div class="demo-box-item" v-for="item in list">
						{{ item }}
					</div>
				</div>
				
			</m-scrollbar>
		</div>

		<div class="ul">
			<div class="demo-button">
				<m-button @click="addList">加高度 + 1</m-button>
				<m-button @click="delList">减 - 1</m-button>
				<m-button @click="autoHide = !autoHide">自动隐藏滚动条{{ autoHide }}</m-button>
				<m-button @click="width += 100">加宽度 + 1</m-button>
				<m-button @click="width -= 100">减宽度 - 1</m-button>
				<m-button @click="changeSize">随机改变容器大小</m-button>
				<m-button @click="scrollTop">滚动到顶部</m-button>
				<m-button @click="scrollBottom">滚动到底部</m-button>
			</div>
			<ul>
				<li v-for="(val, key) in scrollObject">{{ key }}: {{ val }}</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { random } from 'lodash'
import { defineComponent, ref } from 'vue'
import $notify from '../../notification'
import { ScrollInfoType } from '../src/scrollbar-type'
export default defineComponent({
	setup() {
		const maxHeight = ref('380px')
		const list = ref([
			`   生命，也许是宇宙之间唯一应该受到崇拜的因素。生命的孕育、诞生和显示本质是一种无比激动人心的过程。生命像音乐和画面一样暗自挟带着一种命定的声调或血色，当它遇到大潮的袭卷，当它听到号角的催促时，它会顿时抖擞，露出本质的绚烂和激昂。当然，这本质更可能是卑污、懦弱、乏味的；它的主人并无选择的可能。

应当承认，生命就是希望。应当说，卑鄙和庸俗不该得意过早，不该误认为它们已经成功地消灭了高尚和真纯。伪装也同样不能持久，因为时间像一条长河在滔滔冲刷，卑鄙者、奸商和俗棍不可能永远戴着教育家、诗人和战士的桂冠。在他们畅行无阻的生涯尽头，他们的后人将长久地感到羞辱。`
		])
		function addList() {
			list.value
				.push(`   我崇拜高尚的生命的秘密。我崇拜这生命在降生、成长、战斗、伤残、牺牲时迸溅出的钢花焰火。我崇拜一个活灵灵的生命在崇山大河，在海洋和大陆上飘荡的自由。

是的，生命就是希望。它飘荡无定，自由自在，它使人类中总有一支血脉不甘于失败，九死不悔地追寻着自己的金牧场。`)
		}
		function delList() {
			list.value.pop()
		}
		const autoHide = ref(false)
		const width = ref(600)
		const height = ref(200)
		function onHStart() {
			$notify.success({ title: '你好', content: '到👆了，别划了' })
		}
		function onHEnd() {
			$notify.success({ title: '你好', content: '到👇了，别划了' })
		}
		function onWStart() {
			$notify.success({ title: '你好', content: '靠👈了，别划了' })
		}
		function onWEnd() {
			$notify.success({ title: '你好', content: '靠👉了，别划了' })
		}
		const scrollObject = ref<ScrollInfoType>({
			offsetHeight: 0,
			offsetWidth: 0,
			clientHeight: 0,
			clientWidth: 0,
			scrollHeight: 0,
			scrollWidth: 0,
			scrollTop: 0,
			scrollLeft: 0
		})
		function onScroll(scrollObj: ScrollInfoType, dom: HTMLElement) {
			scrollObject.value = scrollObj
		}
		const domWidth = ref(602)
		const domHeight = ref(311)
		function changeSize() {
			domWidth.value = random(300, 800)
			domHeight.value = random(200, 400)
		}
		const Mscrollbar = ref()
		function scrollTop() {
			Mscrollbar.value.scrollTo(null, 0, true)
		}
		function scrollBottom() {
			Mscrollbar.value.scrollTo('end', 'end')
		}
		return {
			list,
			addList,
			delList,
			autoHide,
			width,
			height,
			onHStart,
			onHEnd,
			onWStart,
			onWEnd,
			onScroll,
			scrollObject,
			domHeight,
			domWidth,
			changeSize,
			Mscrollbar,
			scrollTop,
			scrollBottom,
			maxHeight
		}
	}
})
</script>
<style lang="less" scoped>
.demo-scroll {
	display: flex;
	.ul {
		margin-left: 60px;
	}
	.demo-scroll-box {
		flex: 1;
	}
}
:deep(.demo-body) {
	border: 1px solid var(--border-color);

	.demo-box {
		padding: 20px;
		&-item {
			text-indent: 30px;
		}
	}
	.content-box {
		background-color: aquamarine;
		padding: 20px;
	}
}
.demo-button {
	.m-button + .m-button {
		margin-left: 12px;
	}
}
</style>
