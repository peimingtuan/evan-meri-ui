// 下拉框的属性
import { PropType } from 'vue'

export const tagProps = {
	// 当前下拉框的值
	content: {
		type: String as PropType<string>,
		default: ''
	},
	closable: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	isShowTip: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	// 最大显示的 tag 文本长度
	maxTagTextLength: {
		type: Number as PropType<number>,
		default: 0
	},
	// 最大tag宽度, 设置此属性时, maxTagTextLength属性失效
	maxTagWidth: {
		type: Number as PropType<number>,
		default: 0
	}
} as const

// 下拉框的插槽
export const tagSlots = ['default']

// 下拉框触发的事件
export const tagEmits = [
	'click',
	'close' //	展开下拉菜单的回调
]

export default tagProps
