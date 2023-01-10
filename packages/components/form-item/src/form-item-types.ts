// 定义form-item中所需要的属性

import { ExtractPropTypes, InjectionKey, PropType } from 'vue'

import type { RuleItem } from 'async-validator'

export type Arrayable<T> = T | T[] // 类型转换 传入一个类型，转换为本身或者他的数组

export interface FormItemRule extends RuleItem {
	trigger?: Arrayable<string>
}

export const formItemValidateState = ['success', 'error', ''] as const
export type FormItemValidateState = typeof formItemValidateState[number]

export const formItemProps = {
	prop: {
		type: [String, Array] as PropType<Arrayable<string>>,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
	showMessage: {
		type: Boolean,
		default: true
	},
	labelWidth: {
		type: String,
		default: ''
	},
	itemModel: {
		type: [String, Object, Array, Number, Boolean] as PropType<any>,
		default: undefined
	}
} as const
// Partial => 全部属性选填
export type FormItemPropsTypes = Partial<ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItemPropsTypes {
	validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<void>
	clearValidate: (props?: Arrayable<string>) => void
	FormItem: HTMLDivElement | undefined
}