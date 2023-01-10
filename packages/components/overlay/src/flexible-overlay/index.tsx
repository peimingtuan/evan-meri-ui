import { CSSProperties, defineComponent, ref, watch,h } from 'vue'
import { flexibleOverlayProps, FlexibleOverlayProps } from './flexible-overlay-types'
import { useOverlay } from './use-flexible-overlay'
import { useZIndex } from '../../../utils/z-index'

export const FlexibleOverlay = defineComponent({
	name: 'MFlexibleOverlay',
	inheritAttrs: false,
	props: flexibleOverlayProps,
	emits: ['update:modelValue', 'positionChange'],
	setup(props: FlexibleOverlayProps, { slots, attrs, emit, expose }) {
		const { arrowRef, overlayRef, updatePosition, placement } = useOverlay(props, emit)
		// 设置z-index
		const zIndex = ref<Number>(props.zIndex || useZIndex().nextZIndex())
		expose({ updatePosition })
		watch(
			() => props.modelValue,
			() => {
				if (props.modelValue) zIndex.value = props.zIndex || useZIndex().nextZIndex()
			}
		)
		return () =>
			props.modelValue || props.displayDirective === 'show' ? (
				<div
					ref={overlayRef}
					class="m-flexible-overlay"
					style={{ 'z-index': zIndex.value, display: props.modelValue ? '' : 'none' } as CSSProperties}
					{...attrs}
				>
					{slots.default?.()}
					{props.showArrow && (
						<div ref={arrowRef} class="m-flexible-overlay__arrow" data-placement={placement.value}></div>
					)}
				</div>
			) : null
	}
})
