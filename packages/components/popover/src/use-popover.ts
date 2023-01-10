
import { toRefs, ref, computed, watch, onUnmounted, onMounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { debounce } from 'lodash'
import { Placement, PopoverClass, PopoverProps, UsePopoverEvent } from './popover-types'
import { useZIndex } from '../../utils/z-index'

const TransformOriginMap = {
	top: '50% calc(100% + 8px)',
	bottom: '50% -8px',
	left: 'calc(100% + 8px)',
	right: '-8px 50%'
}

export function usePopover(
	props: PopoverProps,
	visible: Ref<boolean>,
	placement: Ref<string>,
	origin: Ref<HTMLElement | undefined>,
	popoverRef: Ref
): { overlayStyles: ComputedRef; popoverClass: PopoverClass[] } {
	const { trigger, isOpen, zIndex, width } = toRefs(props)
	const overlayStyles = computed(() => ({
		zIndex: zIndex || useZIndex().nextZIndex(),
		transformOrigin: TransformOriginMap[placement.value],
		width: width?.value
	}))
	const popoverClass: PopoverClass[] = ['m-popover', 'm-popover-' + props.theme, props.popoverClass]
	const onDocumentClick: (e: Event) => void = (e: Event) => {
		if (!origin.value?.contains(<HTMLElement>e.target) && !popoverRef.value.$el?.contains(e.target)) {
			visible.value = false
		}
	}

	watch(isOpen, isOpenVal => {
		visible.value = isOpenVal
	})

	watch(visible, () => {
		if (visible.value && trigger.value !== 'manually') {
			document.addEventListener('click', onDocumentClick)
		} else {
			document.removeEventListener('click', onDocumentClick)
		}
	})
	onUnmounted(() => {
		document.removeEventListener('click', onDocumentClick)
	})

	return { overlayStyles, popoverClass }
}

export function usePopoverEvent(props: PopoverProps, visible: Ref<boolean>, origin: Ref): UsePopoverEvent {
	const { trigger, mouseEnterDelay, mouseLeaveDelay, disabled } = toRefs(props)
  const placementDefault = ref<Placement>(props.placement);
	const isClick: ComputedRef<boolean> = computed(() => trigger.value === 'click')
	const isEnter: Ref<boolean> = ref(false)

	const onClick = () => {
		if (disabled.value) {
			return
		}
		isClick.value && (visible.value = !visible.value)
	}
	const enter = debounce(() => {
		isEnter.value && (visible.value = true)
	}, mouseEnterDelay.value)
	const leave = debounce(() => {
		!isEnter.value && (visible.value = false)
	}, mouseLeaveDelay.value)
	const onMouseenter = () => {
		if (disabled.value) {
			return
		}
		if (!isClick.value) {
			isEnter.value = true
			enter()
		}
	}
	const onMouseleave = () => {
		if (!isClick.value) {
			isEnter.value = false
			leave()
		}
	}
	const quickLeave = () => {
		isEnter.value = false
		visible.value = false
	}
	watch(disabled, newVal => {
		if (newVal && visible.value) {
			quickLeave()
		}
	})
	const handlePositionChange: (pos: Placement) => void = (pos: Placement) => {
		placementDefault.value = pos
	}
	const manuallyHide = () => {
		visible.value = false
	}
	onMounted(() => {
		if (trigger.value === 'click') {
			origin.value?.addEventListener('click', onClick)
		} else if (trigger.value === 'hover') {
			origin.value?.addEventListener('mouseenter', onMouseenter)
			origin.value?.addEventListener('mouseleave', onMouseleave)
		}
	})

	return { placement: placementDefault.value, handlePositionChange, onMouseenter, onMouseleave, manuallyHide }
}
