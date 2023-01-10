import { ExtractPropTypes, PropType, Ref, VNode } from 'vue'
import { TriggerType } from '../../components'

export const popConfirmProps = {
	content: String,
	status: {
		type: String as PropType<'primary' | 'default' | 'danger'>,
		default: 'default'
	},
	confirmButtonText: { tyep: String, default: '确定' },
	cancelButtonText: { tyep: String, default: '取消' },
	beforeCancel: Function,
	beforeConfirm: Function,
	triggter: {
		type: String as PropType<TriggerType>,
		default: 'click'
	}
}
export type PopConfirmProps = ExtractPropTypes<typeof popConfirmProps>

export interface UsePopConfirmEvent {
	popConfirmClass: Array<string>
	cancel: () => void
	confirm: () => void
}
