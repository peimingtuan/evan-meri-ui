import { PropType } from 'vue'
import { Flow } from '../../utils/types'
import { Disabled, Item } from '../../utils/types'
import type { ItemType } from './token'

// 下拉框的属性
export const selectProps = {
	// 当前下拉框的值
	modelValue: {
		type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
		default: ''
	},
	// 下拉选项值
	options: {
		type: Array as PropType<ItemType[] | undefined>,
		default: undefined
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
	// 确认后自动清除搜索结果
	autoClearSearch: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	// 是否多选
	multiple: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	// 当多选时, 是否需要确定取消按钮
	hasConfirm: {
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
	// 尺寸选择
	menuSize: {
		type: [String, Number] as PropType<number | 'min' | 'small' | 'medium' | 'large' | 'max' | 'auto'>,
		default: 0
	},

	// 自定义下拉菜单可滚动区域的最大高度
	maxScrollHeight: {
		type: Number as PropType<number | undefined>,
		default: undefined
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
	},
	// 下拉框弹出方向
	placement: {
		type: String as PropType<Flow | undefined>,
		default: undefined
	},
	// 是否开启虚拟滚动
	virtual: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	// 是否显示空插槽 此处可以自定义是否显示
	isShowEmpty: {
		type: Boolean as PropType<boolean | undefined>,
		default: undefined
	},
	// 设置下拉弹窗的z-index属性
	zIndex: {
		type: Number as PropType<number | undefined>,
		default: undefined
	},
	// 树下拉选组件专用的一些特性
	isTree: {
		type: Boolean as PropType<boolean>,
		default: false
	}
} as const

// 下拉框的插槽
export const selectSlots = [
	// 自定义前置标题
	'prefix',
	// 自定义的选择框后缀图标
	'suffixIcon',
	// 自定义的多选框清除图标
	'clearIcon',
	// 自定义触发器
	'trigger',
	// 当下拉列表为空时显示的内容
	'empty',
	// 下拉框的header
	'panelHeader',
	// 下拉框的footer
	'panelFooter',
	// 自定义下拉框内容
	'default'
]

// 下拉框触发的事件
export const selectEmits = [
	'update:modelValue',
	'search', //	文本框值变化时回调	function (value: string)
	'change', //	选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数	function (value, option: Option/ Array<Option>)
	'remove', // 移除事件, 返回被移除的Item对象
	'clear', // 清空事件
	'blur', //	失去焦点的时回调
	'focus', //	获得焦点时回调	function
	'confirm', //	点击确定事件 function (value: string[])
	'cancel' //	点击取消事件 function (value: string[])
]

export default selectProps
