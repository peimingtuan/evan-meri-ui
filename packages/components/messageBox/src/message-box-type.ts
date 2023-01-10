import { Component, ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'

export type FieldType = 'confirm' | 'alert'

export type MessageType = 'primary' | 'default' | 'danger'
export type Action = 'confirm' | 'close' | 'cancel'
export type Callback = ((action: Action, instance: ComponentPublicInstance) => any) | ((action: Action) => any)
export interface MessageBoxProps {
	customClass?: string

	customStyle?: CSSProperties

	confirmButtonText?: string

	cancelButtonText?: string

	confirmButtonClass?: string

	cancelButtonClass?: string

	message?: string | VNode

	title?: string

	type?: MessageType

	useHtmlString?: boolean

	showCancelButton?: boolean

	showConfirmButton?: boolean

	showClose?: boolean

	closeOnClickModal?: boolean

	field?: string

	icon?: string | Component

	callback?: Callback

	lockScroll?: boolean
}

export type ElMessageBoxShortcutMethod = ((options?: MessageBoxProps) => Promise<Action>) &
	((options?: MessageBoxProps) => Promise<Action>)

export interface MessageBoxType {
	(options: MessageBoxProps): Promise<any>

	alert: ElMessageBoxShortcutMethod
	confirm: ElMessageBoxShortcutMethod
}
export const messageBoxProps = {
	closeOnClickModal: {
		type: Boolean,
		default: true
	},
	title: {
		type: String
	},
	message: {
		type: String,
		default: 'MessageBox content'
	},
	useHtmlString: {
		type: Boolean,
		default: false
	},
	showCancelButton: {
		type: Boolean,
		default: true
	},
	showConfirmButton: {
		type: Boolean,
		default: true
	},
	showClose: {
		type: Boolean,
		default: true
	},
	confirmButtonText: {
		type: String,
		default: '确定'
	},
	cancelButtonText: {
		type: String,
		default: '取消'
	},
	field: {
		type: String as PropType<FieldType>,
		default: 'confirm'
	},
	type: {
		type: String as PropType<MessageType>,
		default: 'primary'
	},
	customClass: String,
	customStyle: {
		type: Object as PropType<CSSProperties>,
		default: () => {
			return {}
		}
	},
	cancelButtonClass: String,
	confirmButtonClass: String,
	icon: [String, Object],
	lockScroll: Boolean
}
