/*
 * @Author: guoxiaohuan
 * @Date: 2022-06-24 10:42:27
 * @LastEditors: guoxiaohuan
 * @LastEditTime: 2022-08-11 16:30:14
 * @Description:
 */
import { PropType } from 'vue'

export const stepsProps = {
	space: {
		type: [String, Number] as PropType<string | number>,
		default: 20
	},
	source: {
		type: Array as PropType<Array<[]>>,
		default: []
	},
	// 当前选中的值
	modelValue: {
		type: String as PropType<string>,
		default: null
	},
	category: {
		type: String as PropType<string>,
		default: 'default'
	},
	layout: {
		type: String as PropType<string>,
		default: 'vertical'
	},
	readonly: {
		type: [String, Boolean] as PropType<string | boolean>,
		default: false
	},
	size: {
		type: String as PropType<string>,
		default: 'medium'
	},
	lineType: {
		type: String as PropType<string>,
		default: 'solid'
	},
	defaultColor: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	reverse: {
		type: [String, Boolean] as PropType<string | boolean>,
		default: true
	},
	change: {
		type: Function as PropType<(current: any, context?: { e?: MouseEvent }) => void>
	}
} as const
export default stepsProps
