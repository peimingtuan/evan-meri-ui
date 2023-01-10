import { PropType } from 'vue'

// 属性
export const optionProps = {
	notRequiredFilter: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	value: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	label: {
		type: [String] as PropType<string>,
		default: ''
	},
	html: {
		type: String as PropType<string>,
		default: ''
	},
	disabled: {
		type: [Boolean] as PropType<boolean>,
		default: false
	}
} as const

// 下拉框的插槽
export const optionSlots = [
	// 自定义前置标题
	'default'
]

// 下拉框触发的事件
export const optionEmits = ['checkedChange']

export default optionProps
