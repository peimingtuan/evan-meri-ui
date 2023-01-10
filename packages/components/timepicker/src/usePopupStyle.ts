/*
 * @FilePath: usePopupStyle.ts
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: 
 * @LastEditTime: 2022-08-12 18:34:14
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { useElementBounding, useWindowSize, reactiveComputed } from '@vueuse/core'
import { CSSProperties, Ref, ref, reactive, onUpdated, computed } from 'vue'
import { Flow } from '../../utils/types'
import { useZIndex } from '../../utils/z-index'
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
}

export const usePopupStyle = (target: Ref<HTMLElement>, options: OptionsType) => {
	const { align = undefined, level = undefined, topOffset = 0, leftOffset = 0, padding = 0 } = options

	const rect = reactive(useElementBounding(target, { reset: false, immediate: true }))

	const windowsize = reactive(useWindowSize())

	const cssStyleVars = reactiveComputed(() => {
		// 获取各种位置信息
		const { width, height, left, right, top, bottom, x, y } = rect
		console.log()
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

		// 获取最新的z-index
		const { nextZIndex } = useZIndex()

		const cssStyleVars: CSSProperties & { placement?: string } = reactive({
			position: 'fixed',
			'z-index': nextZIndex as unknown as number,
			placement
		})
        
		// 当前矩形的宽高
		// 获取其对应的定位和边距
		switch (placement) {
			case Flow.topLeft:
				cssStyleVars.top = `${y - topOffset}px`
				cssStyleVars.left = `${left + leftOffset}px`
				cssStyleVars.transform = 'translate(0,-100%)'
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
