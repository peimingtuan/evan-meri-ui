import { ValidateFieldsError, Values } from 'async-validator'
import { isFunction } from 'lodash'
import { computed, ComputedRef, defineComponent, h, onMounted, provide, reactive, toRefs } from 'vue'
import { Arrayable, FormItemContext } from '../../form-item/src/form-item-types'
import { FormContextKey } from '../../utils/InjectionKey'
import { converArray } from '../../utils/tools'
import { FormContext, formProps } from './form-types'
const FORMClASSBEM = 'm-form' // 组件公共的class
function bem(classStr?: string) {
	if (classStr) {
		return FORMClASSBEM + '__' + classStr
	} else {
		return FORMClASSBEM
	}
}
const filterFields = (fields: FormItemContext[], props: Arrayable<string>) => {
	const normalized = converArray(props)
	return normalized.length > 0 ? fields.filter(field => field.prop && normalized.includes(field.prop)) : fields
}
export default defineComponent({
	name: 'Form',
	props: formProps,
	setup(props, { slots, expose }) {
		const formClass: ComputedRef<string[]> = computed(() => {
			return [bem(), bem('label-' + props.labelPosition), props.inline ? bem('inline') : '']
		})
		const isValidatable = computed(() => {
			const hasModel = !!props.model
			if (!hasModel) {
			}
			return hasModel
		})
		const fields: FormItemContext[] = [] // 子级的容器
		const addField: FormContext['addField'] = context => {
			fields.push(context)
		}
		// form 校验，在父级中调用所有子级的校验方法
		const validate = async (callback?: (isValid: boolean, fields?: Values) => void) => {
			let errors: Values = {}
			for (const field of fields) {
				try {
					await field.validate('')
				} catch (error) {
					errors = {
						...errors,
						...(error as Values).fields
					}
				}
			}

			if (Object.keys(errors).length === 0) {
				return callback?.(true)
			} else {
				if (callback) {
					callback?.(false, errors)
				} else {
					return Promise.reject(errors)
				}
			}
		}
		// 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
		const clearValidate: FormContext['clearValidate'] = (props = []) => {
			filterFields(fields, props).forEach(field => field.clearValidate())
		}
		// 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
		const validateField: FormContext['validateField'] = async (
			modelProps = [],
			callback?: (isValid: boolean, fields?: Values) => void
		) => {
			const shouldThrow = !isFunction(callback)
			try {
				const result = await doValidateField(modelProps)
				if (result === true) {
					callback?.(result)
				}
				return result
			} catch (e) {
				const validateFields = e as ValidateFieldsError

				if (props.scrollToError) {
					scrollToField(Object.keys(validateFields.fields)[1])
				}
				callback?.(false, validateFields.fields)
				return shouldThrow && Promise.reject(validateFields.fields)
			}
		}
		const scrollToField = (prop: Arrayable<string>) => {
			const field = filterFields(fields, prop)[0] as any
			if (field) {
				field.FormItem?.scrollIntoView({ behavior: 'smooth' })
			}
		}
		const doValidateField = async (props: Arrayable<string> = []): Promise<boolean> => {
			if (!isValidatable.value) return false

			const fields = obtainValidateFields(props)
			if (fields.length === 0) return true

			let validationErrors: ValidateFieldsError = {}
			for (const field of fields) {
				try {
					await field.validate('')
				} catch (fields) {
					validationErrors = {
						...validationErrors,
						...(fields as ValidateFieldsError)
					}
				}
			}

			if (Object.keys(validationErrors).length === 0) return true
			return Promise.reject(validationErrors)
		}
		const obtainValidateFields = (props: Arrayable<string>) => {
			if (fields.length === 0) return []

			const filteredFields = filterFields(fields, props)
			if (!filteredFields.length) {
				return []
			}
			return filteredFields
		}
		const context: FormContext = reactive({ ...toRefs(props), addField, clearValidate, validateField })
		provide(FormContextKey, context)
		expose({ validate, clearValidate, validateField })
		return () => <form class={formClass.value} action="javascript:">{slots.default?.()}</form>
	}
})
