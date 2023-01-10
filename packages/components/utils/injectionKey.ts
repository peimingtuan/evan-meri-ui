import { InjectionKey } from 'vue'

import type { FormItemContext } from '../form-item/src/form-item-types'
import type { FormContext } from '../form/src/form-types'

export const FormContextKey: InjectionKey<FormContext> = Symbol('Form')
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItem')
