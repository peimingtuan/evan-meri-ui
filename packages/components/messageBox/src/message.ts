import { ref, createApp, App, watch, ComponentPublicInstance } from 'vue'
import messageBox from './message-box'
import { FieldType, MessageBoxType, MessageBoxProps } from './message-box-type'
// 创建的实例
const instance = ref()
export type FieldsType = Array<FieldType>
const fields: FieldsType = ['confirm', 'alert']

const MessageBox = (options: MessageBoxProps) => {
	const MessageBoxApp = createApp(messageBox, options as any)
	return new Promise((resolve, reject) => {
		showMessageBox(MessageBoxApp, { resolve, reject }, options)
	})
}
fields.forEach(field => {
	MessageBox[field as any] = (options: MessageBoxProps) => {
		options.field = field
		return MessageBox(options)
	}
})

function showMessageBox(
	app: App<Element>,
	{ resolve, reject }: { resolve: (value?: unknown) => void; reject: (value?: unknown) => void },
	options: MessageBoxProps
) {
	const oFragment: DocumentFragment = document.createDocumentFragment()
	instance.value = app.mount(oFragment as any)
	document.body.appendChild(oFragment)
	const { state, setVisible } = instance.value
	setVisible(true)
	watch(
		() => state.visible,
		() => {
			if (!state.visible) {
				options?.callback?.(state.type, instance.value)
				switch (state.type) {
					case 'cancel':
						reject()
						break
					case 'close':
						reject()
						break
					case 'confirm':
						resolve?.()
						break
					default:
						break
				}
			}
		}
	)
}
export default MessageBox as MessageBoxType