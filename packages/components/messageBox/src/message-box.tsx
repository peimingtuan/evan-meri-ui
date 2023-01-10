import { computed, defineComponent, isVNode, reactive, ref, Teleport, toRefs, watch,h } from 'vue'
import { FixedOverlay } from '../../overlay'
import { useZIndex } from '../../utils/z-index'
import { Action, messageBoxProps } from './message-box-type'
import { IconMeriComponentClose, IconMeriComponentDialogWarning, IconMeriComponentDialogDelete } from 'meri-icon'
import MButton from '../../button'
import { vEllipsis } from '../../utils/ellipsis'
export default defineComponent({
	name: 'MessageBox',
	props: messageBoxProps,
	directives: {
		ellipsis: vEllipsis
	},
	setup(props, { slots, emit, attrs, expose }) {
		const state = reactive({
			visible: false,
			type: 'confirm'
		})
		const { visible } = toRefs(state)
		const { nextZIndex } = useZIndex()
		const zIndex = ref<number>(nextZIndex())
		// 设置显示隐藏
		const setVisible = (isVisible: boolean) => {
			visible.value = isVisible
		}
		expose({ setVisible, state })
		const onClick = (e: MouseEvent) => {
			e.stopPropagation()
		}
		// 点击确定按钮
		const confirmButtonClick = () => {
			state.type = 'confirm'
			setVisible(false)
		}
		// 点击取消按钮
		const cancelButtonClick = (type: Action) => {
			state.type = type
			setVisible(false)
		}
		const isVNodeComputed = computed(() => {
			return isVNode(props.message)
		})
		const closeTsx = () => {
			return props.showClose && props.field == 'confirm' ? (
				<div class="m-messagebox__close" onClick={() => cancelButtonClick('close')}>
					<IconMeriComponentClose></IconMeriComponentClose>
				</div>
			) : null
		}
		const iconDefaultTsx = () => {
			return props.type === 'primary' ? (
				<IconMeriComponentDialogWarning size={24}></IconMeriComponentDialogWarning>
			) : (
				<IconMeriComponentDialogDelete size={24}></IconMeriComponentDialogDelete>
			)
		}
		const iconTsx = () => {
			return props.type !== 'default' && <div class="m-messagebox__icon">{props.icon || iconDefaultTsx()}</div>
		}
		const footerTsx = () => {
			return (
				<div class="m-messagebox__footer">
					{props.showCancelButton && props.field === 'confirm' ? (
						<MButton
							{...({ size: 'small', class: props.cancelButtonClass } as any)}
							onClick={() => cancelButtonClick('cancel')}
						>
							{props.cancelButtonText}
						</MButton>
					) : null}
					{props.showConfirmButton && (
						<MButton
							{...({ size: 'small', type: props.type, class: props.confirmButtonClass } as any)}
							onClick={confirmButtonClick}
						>
							{props.confirmButtonText}
						</MButton>
					)}
				</div>
			)
		}
		const textTsx = () => {
			return props.useHtmlString ? (
				<div class="m-messagebox__main-text" v-ellipsis innerHTML={props.message}></div>
			) : (
				<div class="m-messagebox__main-text" v-ellipsis>
					{props.message}
				</div>
			)
		}
		const isVNodeTextTsx = () => {
			return isVNodeComputed.value ? (
				<div class="m-messagebox__main-text" v-ellipsis>
					{props.message}
				</div>
			) : (
				textTsx()
			)
		}
		watch(visible, () => {
			if (visible.value) {
				zIndex.value = nextZIndex()
			}
		})
		return () => (
			<Teleport to="body">
				<FixedOverlay
					closeOnClickOverlay={props.closeOnClickModal && props.field === 'confirm'}
					v-model={visible.value}
					style={{ 'z-index': zIndex.value }}
					lockScroll={props.lockScroll}
				>
					<div class="m-messagebox" onClick={onClick}>
						{closeTsx()}
						<div class="m-messagebox__content">
							{iconTsx()}
							<div class="m-messagebox__main">
								{props.title && <div class="m-messagebox__main-title">{props.title}</div>}
								{isVNodeTextTsx()}
							</div>
						</div>
						{footerTsx()}
					</div>
				</FixedOverlay>
			</Teleport>
		)
	}
})
