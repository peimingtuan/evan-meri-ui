/*
 * @Author: Devin
 * @Date: 2022-06-16 17:57:03
 * @LastEditors: Devin
 * @LastEditTime: 2022-09-05 20:05:17
 */
import { Directive, ref } from 'vue'
import { getScrollParent } from '../overlay/src/flexible-overlay/utils'
import { useZIndex } from './z-index'

const EllipsisID = ref<string>('EllipsisID')
const isRemoveElement = ref<boolean>(true)
let scrollNode: HTMLElement[] = []
const overTime = ref<number>(0)
const outTime = ref<number>(0)
const overTimer = ref<string | number | NodeJS.Timeout | undefined>(undefined)
const outTimer = ref<string | number | NodeJS.Timeout | undefined>(undefined)
const originParent = ref()
function clearTime() {
	outTime.value = 0
	overTime.value = 0
	clearTimeout(overTimer.value)
	clearTimeout(outTimer.value)
}
function clearEllipsis() {
	let box = document.querySelector('#' + EllipsisID.value)
	box?.remove()
}
const EllipsisOverFun: (...arg: any) => any = (e: MouseEvent, el: HTMLElement, binding: any, disabled) => {
	clearEllipsis()
	clearTime()
	if (disabled) return
	isRemoveElement.value = true
	// 获取鼠标进入元素的时间
	overTime.value = new Date().getTime()
	overTimer.value = setTimeout(() => {
		if (document.querySelector('#' + EllipsisID.value)) {
			document.querySelector('#' + EllipsisID.value)?.remove()
		}
		const Ellipsis: HTMLDivElement = document.createElement('div')

		Ellipsis.classList.add('ellipsis-title')
		if (binding.value?.theme) {
			Ellipsis.classList.add(binding.value?.theme)
		}
		Ellipsis.id = EllipsisID.value
		const maxWidth = 400
		// const EllipsisWidth = el.scrollWidth > maxWidth ? maxWidth : el.scrollWidth
		const EllipsisWidth = maxWidth;
		// 暂时固定最大宽度420px(有提相关还原度需求)
		if (el.scrollWidth === 0) {
			return
		}
		Ellipsis.style['max-width'] = `${EllipsisWidth}px`

		// 设置元素位置
		// 根据鼠标移入位置判断浮层位于左侧还是右侧，避免遮挡
		if (window.innerWidth - e.clientX < maxWidth) {
			Ellipsis.style.right = `${window.innerWidth - e.clientX}px`
		} else {
			Ellipsis.style.left = `${e.clientX + 20}px`
		}
		// 根据鼠标移入位置判断浮层位于上方还是下方，避免遮挡
		if (window.innerHeight - e.clientY < 600) {
			Ellipsis.style.bottom = `${window.innerHeight - e.clientY}px`
		} else {
			Ellipsis.style.top = `${e.clientY}px`
		}
		// 设置元素内容
		Ellipsis.style['z-index'] = useZIndex().nextZIndex()
		Ellipsis.innerHTML = binding.value?.title || el.innerHTML
		if (binding.value?.enterable == undefined || binding.value?.enterable) {
			Ellipsis.addEventListener('mouseover', () => {
				isRemoveElement.value = false
			})
			Ellipsis.addEventListener('mouseout', () => {
				Ellipsis.remove()
			})
		}
		scrollNode = []
		// 滚动时清除元素
		bindScrollEvent(el)
		document.querySelector('body')?.append(Ellipsis)
		clearTime()
	}, binding.value?.time || 300)
}
const EllipsisOutFun: (...arg: any) => any = (e: MouseEvent, binding) => {
	// 获取离开元素的时间
	outTime.value = new Date().getTime()

	if (outTime.value - overTime.value < 300) {
		clearTime()
	} else {
		outTimer.value = setTimeout(() => {
			if (isRemoveElement.value) {
				clearEllipsis()
				clearTime()
			}
		}, binding.value?.time || 300)
	}
}
// 当滚动事件触发后移除元素
function onScrollEvent() {
	clearEllipsis()
}
// 获取绑定元素的父级元素的滚动事件
function bindScrollEvent(e: HTMLElement) {
	originParent.value = getScrollParent(e)
	originParent.value.addEventListener('scroll', onScrollEvent)
}
export const vEllipsis: Directive = {
	mounted(el, binding) {
		if (binding.value?.disabled) return
		el.addEventListener('mouseover', (e: MouseEvent) => {
			if (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
				EllipsisOverFun(e, el, binding)
			}
		})
		el.addEventListener('mouseout', (e: MouseEvent) => {
			if (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
				EllipsisOutFun(e, binding)
			}
		})
	},
	updated(el, binding) {
		clearEllipsis()
		el.addEventListener('mouseover', (e: MouseEvent) => {
			if (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
				EllipsisOverFun(e, el, binding, binding.value?.disabled)
			}
		})
	}
}
