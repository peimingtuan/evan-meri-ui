import { useElementBounding, useWindowSize, reactiveComputed } from '@vueuse/core'
import { CSSProperties, Ref, ref, reactive, onUpdated, watch, computed, onMounted } from 'vue'
import { Flow } from '../../utils/types'
import { useZIndex } from '../../utils/z-index'
import { autoUpdate } from '@floating-ui/dom'
/**
 * 计算弹窗的最外层样式
 * @param size 当前参照物DOM
 * @param flow 当前的弹窗朝向
 * @param padding 当前弹窗的边距
 */
export type OptionsType = {
	align?: Flow
	level?: 'Left' | 'Right'
	topOffset?: number
	leftOffset?: number
	padding?: number
	strategy?: 'fixed' | 'absolute'
}

export const usePopupStyle = (target: Ref<HTMLElement>, options: OptionsType) => {
	const {
		align = undefined,
		level = undefined,
		topOffset = 0,
		leftOffset = 0,
		padding = 0,
		strategy = 'fixed'
	} = options

	const rect = reactive(
		useElementBounding(target, { reset: false, windowResize: false, windowScroll: false, immediate: true })
	)

	onMounted(() => {
		const cleanup = autoUpdate(target.value, target.value, rect.update)
	})

	onUpdated(() => {
		rect.update()
	})

	// 获取最新的z-index
	const { nextZIndex } = useZIndex()
	const index = nextZIndex()

	const windowsize = reactive(useWindowSize())

	const cssStyleVars = reactiveComputed(() => {
		// 获取各种位置信息
		const { width, height, left, right, top, bottom, x, y } = rect
		const { width: widthScreen, height: heightScreen } = windowsize
		// 获取组件的中心点
		const centerY = Math.floor(top + height / 2)
		const centerX = Math.floor(left + width / 2)
		// 获取屏幕的宽高
		const screenHeight = Math.floor(heightScreen / 2)
		const screenWidth = Math.floor(widthScreen / 2)

		// 判断当前弹窗的朝向
		const vertical = centerY > screenHeight ? 'top' : 'bottom'
		const getLevel = level || (centerX > screenWidth ? 'Left' : 'Right')
		const flow = `${vertical}${getLevel}`
		const placement = align || flow

		const cssStyleVars: CSSProperties & { placement?: string } = reactive({
			position: strategy,
			'z-index': index,
			placement
		})

		// 当前矩形的宽高
		// 获取其对应的定位和边距
		switch (placement) {
			case Flow.topLeft:
				cssStyleVars.bottom = `${Math.floor(heightScreen - y + topOffset)}px`
				cssStyleVars.left = `${left + leftOffset}px`
				// cssStyleVars.transform = 'translate(0,-100%)'
				cssStyleVars.paddingBottom = `${padding}px`
				break
			case Flow.topRight:
				cssStyleVars.top = `${y - topOffset}px`
				cssStyleVars.left = `${right - leftOffset}px`
				cssStyleVars.transform = 'translate(-100%,-100%)'
				cssStyleVars.paddingBottom = `${padding}px`
				break
			case Flow.bottomLeft:
				cssStyleVars.top = `${height + y + topOffset}px`
				cssStyleVars.left = `${left + leftOffset}px`
				cssStyleVars.paddingTop = `${padding}px`
				break
			case Flow.bottomRight:
				cssStyleVars.top = `${height + y + topOffset}px`
				cssStyleVars.left = `${right - leftOffset}px`
				cssStyleVars.transform = 'translate(-100%,0)'
				cssStyleVars.paddingTop = `${padding}px`
			default:
				break
		}
		return cssStyleVars
	})

	return { windowStyle: cssStyleVars }

	// 获取窗口的宽高
}
