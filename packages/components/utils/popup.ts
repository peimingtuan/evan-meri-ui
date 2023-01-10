import { useElementBounding, useWindowScroll, useWindowSize } from '@vueuse/core'
import { CSSProperties, Ref, unref, reactive, watchEffect, computed } from 'vue'
import { Flow } from './types'

/**
 * 计算弹窗的最外层样式
 * @param size 当前参照物DOM
 * @param flow 当前的弹窗朝向
 * @param padding 当前弹窗的边距
 */
export const popupParentVarsStyle = (target: Ref<HTMLElement>, topOffset: number = 0) => {
	console.log('tareget===>', target)
	return popupParentVarsStyleByElementBounding(useElementBounding(target.value), undefined, undefined, topOffset)
}

export const popupParentVarsStyleByElement = (target: HTMLElement, padding = 4) => {
	if (!target) return {}
	// 获取当前对象的宽高
	const { left, right, top, bottom, width, height } = target.getBoundingClientRect()

	// 获取组件的中心点
	const centerY = top + height / 2
	const centerX = left + width / 2
	// 获取屏幕的宽高
	const screenHeight = window.screen.height / 2
	const screenWidth = window.screen.width / 2

	// 判断当前弹窗的朝向
	let vertical = centerY > screenHeight ? 'top' : 'bottom'

	let level = centerX > screenWidth ? 'Left' : 'Right'

	let flow = `${vertical}${level}`

	// 当前矩形的宽高
	const cssStyleVars: CSSProperties = {
		position: 'fixed',
		'z-index': 1000
	}

	// 获取其对应的定位和边距
	switch (flow) {
		case Flow.topLeft:
			cssStyleVars.bottom = `${top}px`
			cssStyleVars.left = `${right}px`
			cssStyleVars.transform = 'translate(-100%)'
			cssStyleVars.paddingBottom = padding
			break
		case Flow.topRight:
			cssStyleVars.bottom = `${top}px`
			cssStyleVars.left = `${left}px`
			cssStyleVars.paddingBottom = padding
			break
		case Flow.bottomLeft:
			cssStyleVars.top = `${height + top}px`
			cssStyleVars.left = `${right}px`
			cssStyleVars.transform = 'translate(-100%)'
			cssStyleVars.paddingTop = padding
			break
		case Flow.bottomRight:
			cssStyleVars.top = `${height + top}px`
			cssStyleVars.left = `${left}px`
			cssStyleVars.paddingTop = padding
			break
		default:
			break
		// case Flow.topLeft:
		//     cssStyleVars.bottom = `${height.value + bottom.value}px`;
		//     cssStyleVars.left = `${left.value}px`;
		//     cssStyleVars.paddingBottom = padding;
		//     break;
		// case Flow.topRight:
		//     cssStyleVars.bottom = `${height.value + bottom.value}px`;
		//     cssStyleVars.left = `${right.value}px`;
		//     cssStyleVars.transform = 'translate(-100%)';
		//     cssStyleVars.paddingBottom = padding;
		//     break;
		// case Flow.bottomLeft:
		//     cssStyleVars.top = `${height.value + top.value}px`;
		//     cssStyleVars.left = `${left.value}px`;
		//     cssStyleVars.paddingTop = padding;
		//     break;
		// case Flow.bottomRight:
		//     cssStyleVars.top = `${height.value + top.value}px`;
		//     cssStyleVars.left = `${right.value}px`;
		//     cssStyleVars.transform = 'translate(-100%)';
		//     cssStyleVars.paddingTop = padding;
		//     break;
		// default:
		//     break;
	}

	return cssStyleVars
}

export const popupParentVarsStyleByElementBounding = (
	target: {
		height: Ref<number>
		bottom: Ref<number>
		left: Ref<number>
		right: Ref<number>
		top: Ref<number>
		width: Ref<number>
		x: Ref<number>
		y: Ref<number>
	},
	align: undefined | Flow = undefined,
	padding = 4,
	topOffset = 0
) => {
	// 获取当前对象的宽高
	const { width, height, left, right, top, bottom, x, y } = target
	setTimeout(() => {
		console.log('target', target, left.value, height.value, y.value)
	}, 0)
	// 获取窗口的宽高
	const { width: widthScreen, height: heightScreen } = useWindowSize()

	// 获取组件的中心点
	const centerY = top.value + height.value / 2
	const centerX = left.value + width.value / 2
	// 获取屏幕的宽高
	const screenHeight = heightScreen.value / 2
	const screenWidth = widthScreen.value / 2

	// 判断当前弹窗的朝向
	let vertical = centerY > screenHeight ? 'top' : 'bottom'
	let level = centerX > screenWidth ? 'Left' : 'Right'
	let flow = `${vertical}${level}`
	console.log('flow', flow)
	// 当前矩形的宽高
	const cssObj: Ref<CSSProperties> = computed(() => {
		const cssStyleVars: CSSProperties = {
			position: 'fixed',
			'z-index': 1
		}
		// 获取其对应的定位和边距
		switch (align || flow) {
			case Flow.topLeft:
				cssStyleVars.top = `${y.value + topOffset}px`
				cssStyleVars.left = `${right.value}px`
				cssStyleVars.transform = 'translate(-100%,-100%)'
				cssStyleVars.paddingBottom = `${padding}px`
				break
			case Flow.topRight:
				cssStyleVars.top = `${y.value + topOffset}px`
				cssStyleVars.left = `${left.value}px`
				cssStyleVars.transform = 'translate(0,-100%)'
				cssStyleVars.paddingBottom = `${padding}px`
				break
			case Flow.bottomLeft:
				cssStyleVars.top = `${height.value + y.value + topOffset}px`
				cssStyleVars.left = `${right.value}px`
				cssStyleVars.transform = 'translate(-100%,0)'
				cssStyleVars.paddingTop = `${padding}px`
				break
			case Flow.bottomRight:
				cssStyleVars.top = `${height.value + y.value + topOffset}px`
				cssStyleVars.left = `${left.value}px`
				cssStyleVars.paddingTop = `${padding}px`
			default:
				break
		}
		return cssStyleVars
	})

	console.log(cssObj)
	return cssObj
}
