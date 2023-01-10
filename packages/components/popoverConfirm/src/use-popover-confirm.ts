import { Ref, toRefs } from 'vue'
import { PopConfirmProps, UsePopConfirmEvent } from './popover-confirm-types'

export function usePopConfirm(
	props: PopConfirmProps,
	popoverRef: Ref,
	emit: (event: string, ...args: any[]) => void
): UsePopConfirmEvent {
	const cancel: () => void = () => {
		if (props.beforeCancel) {
			props.beforeCancel?.(() => {
				emit('cancel')
				popoverRef.value.manuallyHide()
			})
		} else {
			emit('cancel')
			popoverRef.value.manuallyHide()
		}
	}
	const confirm: () => void = () => {
		if (props.beforeConfirm) {
			props.beforeConfirm?.(() => {
				emit('confirm')
				popoverRef.value.manuallyHide()
			})
		} else {
			emit('confirm')
			popoverRef.value.manuallyHide()
		}
	}

	const popConfirmClass = ['m-popover-confirm']
	return { popConfirmClass, cancel, confirm }
}
