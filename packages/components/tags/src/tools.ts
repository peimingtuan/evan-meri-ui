/*
 * @Author: Devin
 * @Date: 2022-06-10 17:29:41
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-30 22:15:30
 */
interface TypeIcon {
	processing: string
	canceled: string
	completed: string
	rejected: string
	error: string
}
export const typeIcon: TypeIcon = {
	processing: 'IconMeriComponentTagProcessing',
	error: 'IconMeriComponentTagError',
	completed: 'IconMeriComponentTagCompleted',
	rejected: 'IconMeriComponentTagRejected',
	canceled: 'IconMeriComponentTagCanceled'
}
export const typeColor: TypeIcon = {
	processing: 'var(--primary-color)',
	error: 'var(--danger-color)',
	completed: 'var(--success-color)',
	rejected: 'var(--warning-color)',
	canceled: 'var(--disable-text-color)'
}
export const typebBgColor: TypeIcon = {
	processing: 'var(--blue-100)',
	error: 'var(--red-100)',
	completed: 'var(--green-100)',
	rejected: 'var(--orange-100)',
	canceled: 'var(--disable-bg-color)'
}

export const getbgColorVar = (color: string = '', alp: number = 0.15): { color: string; type: string | boolean } => {
	color = color.trim()
	const colorType: string | boolean = checkColorType(color)
	if (colorType) {
		let colorObj: { color: string; type: string | boolean } = {
			color: '',
			type: colorType
		}
		switch (colorType) {
			case 'hex':
				colorObj.color = hexToRgba(color, alp).rgba
				break
			case 'rgb':
				colorObj.color = rgbToRgba(color, alp)
				break
			case 'rgba':
				colorObj.color = rgbToRgba(rgbaToRgb(color), alp)
				break
			default:
				break
		}
		return colorObj
	} else {
		return { color: '', type: '' }
	}
}

// 判断颜色类型
export const checkColorType = (color: string): string | boolean => {
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
		return 'hex'
	}
	if (/^rgb/.test(color) && !/^rgba/.test(color)) {
		return 'rgb'
	}
	if (/^rgba/.test(color)) {
		return 'rgba'
	}
	return false
}
interface Rgba {
	red: number
	green: number
	blue: number
	rgba: string
}
// hex=>rgba
export const hexToRgba = (hex: string, alp: number): Rgba => {
	let RGBA: string =
		'rgba(' +
		parseInt('0x' + hex.slice(1, 3)) +
		',' +
		parseInt('0x' + hex.slice(3, 5)) +
		',' +
		parseInt('0x' + hex.slice(5, 7)) +
		',' +
		alp +
		')'
	return {
		red: parseInt('0x' + hex.slice(1, 3)),
		green: parseInt('0x' + hex.slice(3, 5)),
		blue: parseInt('0x' + hex.slice(5, 7)),
		rgba: RGBA
	}
}

//rgb=>rgba
export const rgbToRgba = (color: string, alp: number): string => {
	let r, g, b
	let rgbaAttr = color.match(/[\d.]+/g)
	if (rgbaAttr && rgbaAttr.length >= 3) {
		r = rgbaAttr[0]
		g = rgbaAttr[1]
		b = rgbaAttr[2]
		return 'rgba(' + r + ',' + g + ',' + b + ',' + alp + ')'
	}
	return ''
}

//rgba=>rgb
export const rgbaToRgb = (color: string): string => {
	let rgbaAttr = color.match(/[\d.]+/g)
	if (rgbaAttr && rgbaAttr.length >= 3) {
		let r, g, b
		r = rgbaAttr[0]
		g = rgbaAttr[1]
		b = rgbaAttr[2]
		return 'rgb(' + r + ',' + g + ',' + b + ')'
	}
	return ''
}

//获取透明度
export const getRgbaAlp = (color: string): string | number => {
	let alp: number | string = 1
	let rgbaReg = /rgba\([\d ]+(?:\,([\d. ]+)){3}\)/
	if (rgbaReg.test(color)) {
		alp = color.replace(rgbaReg, '$1')
	}
	return alp
}
