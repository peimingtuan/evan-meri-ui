/*
 * @Description:
 * @Author: Devin
 * @Date: 2022-07-30 21:34:21
 * @LastEditTime: 2022-07-31 00:36:34
 * @LastEditors: Devin
 * @Reference:
 */
import { defineComponent, ref, toRefs, VNode,h,Fragment } from 'vue'
import Popover from '../../popover'
import { popConfirmProps } from './popover-confirm-types'
import { usePopConfirm } from './use-popover-confirm'
import { IconMeriComponentDialogDelete, IconMeriComponentDialogWarning } from 'meri-icon'
export default defineComponent({
	name: 'Popconfirm',
	props: popConfirmProps,
	setup(props, { slots, emit, attrs }) {
		const { content, status } = toRefs(props)
		const popoverRef = ref<HTMLElement>()
		const { popConfirmClass, cancel, confirm } = usePopConfirm(props, popoverRef, emit)
		const contentVNode: () => VNode = () => {
			return (
				<div class={['m-popconfirm']}>
					<div class={['m-popconfirm__main']}>
						{slots.main?.({ status: status.value, content: content.value }) || (
							<>
								{status.value == 'default' ? null : (
									<div class="m-popconfirm__icon">
										{status.value == 'primary' ? (
											<IconMeriComponentDialogWarning size={24} />
										) : (
											<IconMeriComponentDialogDelete size={24} />
										)}
									</div>
								)}
								<div class="m-popconfirm__text">{content.value}</div>
							</>
						)}
					</div>
					<div class={['m-popconfirm__footer']}>
						{slots.footer?.({
							cancelButtonText: props.cancelButtonText,
							confirmButtonText: props.confirmButtonText
						}) || (
							<>
								<m-button size="small" onClick={cancel}>
									{props.cancelButtonText}
								</m-button>
								<m-button
									size="small"
									type={status.value == 'danger' ? 'danger' : 'primary'}
									onClick={confirm}
								>
									{props.confirmButtonText}
								</m-button>
							</>
						)}
					</div>
				</div>
			)
		}
		return () => (
			<Popover {...attrs} class={popConfirmClass} ref={popoverRef} trigger={props.triggter}>
				{{
					...slots,
					content: () => contentVNode()
				}}
			</Popover>
		)
	}
})
