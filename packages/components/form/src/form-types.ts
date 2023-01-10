import { Values } from 'async-validator'
import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { Arrayable, FormItemContext, FormItemRule } from '../../form-item/src/form-item-types'

export const formProps = {
	model: Object,
	rules: {
		type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
	},
	showMessage: {
		type: Boolean,
		default: true
	},
	labelPosition: {
		type: String,
		default: 'right'
	},
	labelWidth: {
		type: String,
		default: ''
	},
	scrollToError: Boolean,
	requireAsteriskPosition: {
		type: String,
		default: 'left'
	},
	inline: Boolean
} as const
// Partial => 全部属性选填
export type FormPropsTypes = Partial<ExtractPropTypes<typeof formProps>>
export interface FormContext extends FormPropsTypes {
	addField: (context: FormItemContext) => void // 添加子级
	clearValidate: (props?: Arrayable<string>) => void
	validateField: (
		props?: Arrayable<string>,
		callback?: (isValid: boolean, fields?: Values) => void | undefined
	) => Promise<boolean>
}
