/*
 * @Author: Devin
 * @Date: 2022-06-16 18:40:26
 * @LastEditors: Devin
 * @LastEditTime: 2022-10-21 19:01:45
 */
export function getMouseCoordinate(event?: MouseEvent) {
	const e: undefined | MouseEvent = event || (window.event as MouseEvent)
	return { x: e?.clientX, y: e?.clientY }
}
const nodeName = ['HTML', '#document', undefined]
// 获取元素的绝对位置
export function getRelativePosition(element: HTMLElement) {
	let acturalLeft = element.offsetLeft
	let acturalTop = element.offsetTop
	let offsetElement: any = element.offsetParent
	let nodeElement: any = element.parentNode
	let scrollLeft = element.scrollLeft
	let scrollTop = element.scrollTop
	while (offsetElement) {
		acturalLeft += offsetElement.offsetLeft
		acturalTop += offsetElement.offsetTop
		offsetElement = offsetElement.offsetParent
	}
	while (nodeElement) {
		// if (nodeName.indexOf(nodeElement.nodeName) === -1) {

		scrollLeft = scrollLeft + (nodeElement.scrollLeft ? nodeElement.scrollLeft : 0)
		scrollTop = scrollTop + (nodeElement.scrollTop ? nodeElement.scrollTop : 0)
		// }else{

		// }
		nodeElement = nodeElement.parentNode
	}
	return {
		x: acturalLeft - scrollLeft,
		y: acturalTop - scrollTop
	}
}
// 获取浏览器窗口的宽和高
export function getViewArea() {
	if (typeof window == 'undefined') return { width: 0, height: 0 }
	if (document.compatMode == 'BackCompat') {
		// 怪异模式
		return {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		}
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}
}

/**
 * 判断是否为偶数
 * @param {*} num
 */
export const isEvnetNum = (num: number) => Number(num) % 2 === 0

/**
 * 警告提示处理
 * @param {String} module
 * @param {*} info
 */
export const warn = (module: string, info: string) => {
	console.warn(`[ A warning of birdpaper-ui ] - ${module}: ` + info)
}

/**
 * 将数值限制为整数
 * @param {*} v
 * @returns
 */
export const beInteger = (v: any) => {
	let val = v + ''
	return (val.replace(/\D/g, '') as any) * 1
}

/**
 * @description:
 * @param {width | height} type
 * @param {HTMLElement} target
 * @return {boolean}
 */
export const widthOrHeightOutOfRange = (type: 'width' | 'height', target: HTMLElement): boolean => {
	// 获取元素位置位置
	const { x, y } = getRelativePosition(target)
	// 获取元素的宽高
	const windowSize: any = getViewArea()
	if (type === 'width') {
		return x >= windowSize.width / 2
	}
	return y >= windowSize.height / 2
}
/**
 * 计算时间返回
 * @returns {Array}
 */
export const countNumber = (setpH: number, setpM: number, setpS: number) => {
	const countTime = (len: number, step: number) => {
		const arr = []
		for (let i = 0; i < len; i = i + Number(step)) {
			arr.push({ time: i < 10 ? `0${i}` : `${i}`, disabled: false })
		}
		return arr
	}
	const hours = countTime(24, setpH)
	const minutes = countTime(60, setpM),
		seconds = countTime(60, setpS)
	return [hours, minutes, seconds]
}

/**
 * @description: 对象转换为数组
 * @param {Arrayable} rules
 * @return {*}
 */
export const converArray = (arr: any): any[] => {
	return arr ? (Array.isArray(arr) ? arr : [arr]) : []
}
