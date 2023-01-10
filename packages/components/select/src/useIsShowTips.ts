import { Ref, ref } from 'vue'
import { useEventListener, tryOnMounted } from '@vueuse/core'
// 判断元素内是否出现了隐藏文字

export const useIsShowTips = (target: Ref<HTMLElement>, isAuto = true): Ref<boolean> => {
	const isShowTips = ref(false)

	useEventListener(target, 'mouseenter', evt => {
		isShowTips.value = isAuto ? target.value?.scrollWidth > target.value?.clientWidth : true
	})

	useEventListener(target, 'mouseleave', evt => {
		isShowTips.value = false
	})

	return isShowTips
}
