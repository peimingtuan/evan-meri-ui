import {
	computed,
	ComputedRef,
	defineComponent,
	h,
	inject,
	nextTick,
	onMounted,
	provide,
	reactive,
	ref,
	toRefs
} from 'vue'
import { FormContextKey, FormItemContextKey } from '../../utils/InjectionKey'
import { FormItemContext, formItemProps, FormItemValidateState, FormItemRule, Arrayable } from './form-item-types'
import AsyncValidator, { Values } from 'async-validator'
import { clone, isNumber, isString } from 'lodash'
const FORMITEMClASSBEM = 'm-form-item' // 组件公共的class
function bem(classStr?: string) {
	if (classStr) {
		return FORMITEMClASSBEM + '__' + classStr
	} else {
		return FORMITEMClASSBEM
	}
}
/**
 * @description: 对象转换为数组
 * @param {Arrayable} rules
 * @return {*}
 */
const converArray = (rules: Arrayable<FormItemRule> | undefined): FormItemRule[] => {
	return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}
let initialValue: any = undefined
export default defineComponent({
	name: 'FormItem',
	props: formItemProps,
	setup(props, { slots }) {
		const Form = inject(FormContextKey)
		const validateState = ref<FormItemValidateState>('') // 检验状态
		const validateMessage = ref<string>('')
		const labelWidth = ref<string>(props.labelWidth || Form?.labelWidth!) // Label的宽度 默认为form-item本身的props内的
		const formItemClassComputed: ComputedRef<string[]> = computed(() => {
			return [bem(), validateState.value ? 'is-' + validateState.value : '']
		})

		const _rules: ComputedRef<FormItemRule[]> = computed(() => {
			const selfRules: FormItemRule[] = converArray(props.rules)
			const formRules: Arrayable<FormItemRule> | undefined = Form?.rules
			if (formRules && propString.value) {
				const tempRules = formRules[propString.value]
				if (tempRules) {
					selfRules.push(...converArray(tempRules))
				}
			}
			return selfRules
		})

		const propString = computed(() => {
			if (!props.prop) return ''
			return isString(props.prop) ? props.prop : props.prop.join('.')
		})

		const fieldValue = computed(() => {
			const model = Form?.model
			if (!model || !propString.value) {
				return
			}
			const value = props.itemModel !== undefined ? props.itemModel : model[propString.value]
			return value
		})

		const isRequired = computed(() => _rules.value.some(rule => rule.required))

		const contentStyle = computed(() => {
			if (Form?.labelPosition === 'top' || Form?.inline) {
				return {}
			}
			return labelRender() ? {} : { 'margin-left': labelWidth.value }
		})

		const setFormItemState = (state: FormItemValidateState) => {
			validateState.value = state
		}

		const clearValidate: FormItemContext['clearValidate'] = () => {
			validateMessage.value = ''
			setFormItemState('')
		}

		/**
		 * @description: 校验方法
		 * @param {*} trigger
		 * @param {*} callback
		 * @return {*}
		 */
		const validate: FormItemContext['validate'] = async (trigger, callback?) => {
			// 拿到触发的时机，校验是否调用callback或者调用promise.then方法
			const rules = getRuleFiltered(trigger)
			// 获取校验的属性
			const modelName = propString.value
			if (modelName) {
				const validator = new AsyncValidator({
					[modelName]: rules
				})

				return validator
					.validate({ [modelName]: fieldValue.value }, { firstFields: true })
					.then(() => {
						onValidationSuccessHandle()
					})
					.catch(error => {
						const { errors } = error
						const errorMsg = errors ? errors[0].message : ''
						onValidationFailedHandle(errorMsg)
						return Promise.reject(error)
					})
			}
		}
		/**
		 * @description: 过滤校验方式
		 * @param {string} trigger
		 * @return {*}
		 */
		const getRuleFiltered = (trigger: string) => {
			const rules = _rules.value
			return rules.filter(rule => {
				if (!rule.trigger || !trigger) return true //这两种情况下意味着无论如何都要校验（用户没有传递校验方式没有子元素没有传触发方式）
				if (Array.isArray(rule.trigger)) {
					return rule.trigger.includes(trigger)
				} else {
					return rule.trigger === trigger
				}
			})
		}

		const onValidationSuccessHandle = () => {
			setFormItemState('success')
			validateMessage.value = ''
		}

		const onValidationFailedHandle = (errorMsg: string) => {
			setFormItemState('error')
			validateMessage.value = errorMsg
		}

		onMounted(() => {
			Form?.addField(context)
			initialValue = clone(Form?.model)
		})
		const labelRender = () => {
			return slots.label?.() || props.label ? (
				<label class={bem('label')} style={{ width: labelWidth.value }}>
					{isRequired.value && Form?.requireAsteriskPosition === 'left' && (
						<span class={[bem('label-required'), bem('label-required-left')]}>*</span>
					)}
					{slots.label?.({ label: props.label }) || props.label}
					{isRequired.value && Form?.requireAsteriskPosition === 'right' && (
						<span class={[bem('label-required'), bem('label-required-right')]}>*</span>
					)}
				</label>
			) : (
				''
			)
		}
		const FormItem = ref<HTMLDivElement>()
		const context: FormItemContext = reactive({
			...toRefs(props),
			validate,
			clearValidate,
			FormItem
		})
		provide(FormItemContextKey, context)

		return () => (
			<div class={formItemClassComputed.value} ref={FormItem}>
				{labelRender()}
				<div class={bem('content')} style={contentStyle.value}>
					{slots.default?.()}
					<div class={[bem('error')]}>
						{slots.error?.({ error: validateMessage.value }) || validateMessage.value}
					</div>
				</div>
			</div>
		)
	}
})
