import { PropType } from 'vue'
import { Disabled, Item } from '../../utils/types'
import type { ItemType } from '../../select/src/token'

// 下拉框的属性
export const selectHeaderProps = {
	ignore: {
		type: Object as PropType<HTMLElement | undefined>,
		default: undefined
	},
	// 当前下拉框的值
	modelValue: {
		type: [Array] as PropType<ItemType[]>,
		default: ''
	},
	// 禁用
	disabled: {
		type: Boolean as PropType<Disabled>,
		default: false
	},
	prefix: {
		type: String as PropType<string>,
		default: ''
	},
	// 是否可以清空选项
	clearable: {
		type: Boolean as PropType<boolean>,
		default: false
	},

	// 可搜索
	searchable: {
		type: Boolean as PropType<boolean>,
		default: false
	},

	// 可搜索
	autoClearSearch: {
		type: Boolean as PropType<boolean>,
		default: true
	},

	// 是否多选
	multiple: {
		type: Boolean as PropType<boolean>,
		default: false
	},

	// 是否多选 0 就是不限制
	multipleLimit: {
		type: Number as PropType<number>,
		default: 0
	},
	// 	多选时候的显示模式
	mode: {
		type: String as PropType<'multiple' | 'tags'>,
		default: 'multiple'
	},
	// placeholder
	placeholder: {
		type: String as PropType<string>,
		default: ''
	},
	// 尺寸选择
	size: {
		type: [String, Number] as PropType<number | 'small' | 'medium' | 'large' | 'auto'>,
		default: 'medium'
	},

	// 最多显示多少个 tag 剩余的显示+n
	maxTagCount: {
		type: Number as PropType<number>,
		default: 0
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
export const selectHeaderSlots = [
	// 自定义前置标题
	'prefix',
	// 自定义的选择框后缀图标
	'suffixIcon',
	// 自定义的多选框清除图标
	'clearIcon'
]

// 下拉框触发的事件
export const selectHeaderEmits = [
	'update:modelValue',
	'click',
	'clickOutSide',
	'search', //	文本框值变化时回调	function (value: string)
	'remove', // 移除事件, 返回被移除的Item对象
	'clear', // 清空事件
	'blur', //	失去焦点的时回调
	'focus' //	获得焦点时回调	function
]

export default selectHeaderProps
