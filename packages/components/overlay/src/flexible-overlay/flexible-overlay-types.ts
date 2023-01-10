import type { CSSProperties, ExtractPropTypes, PropType, Ref, StyleValue } from 'vue'

export type Placement =
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'top-start'
	| 'top-end'
	| 'right-start'
	| 'right-end'
	| 'bottom-start'
	| 'bottom-end'
	| 'left-start'
	| 'left-end'

export type OffsetOptions = { mainAxis?: number; crossAxis?: number }

export type Point = { x?: number; y?: number }

export type UseOverlayFn = {
	arrowRef: Ref<HTMLElement | undefined>
	overlayRef: Ref<HTMLElement | undefined>
	updatePosition: () => void
	placement: Ref<Placement>
}

export type EmitEventFn = (event: 'positionChange' | 'update:modelValue', result?: unknown) => void

export interface Rect {
	x: number
	y: number
	width?: number
	height?: number
}

export const flexibleOverlayProps = {
	modelValue: {
		type: Boolean,
		default: false
	},
	origin: {
		type: Object as PropType<HTMLElement>,
		require: true
	},
	position: {
		type: Array as PropType<Array<Placement>>,
		default: ['bottom']
	},
	placement: {
		type: String as PropType<Placement>,
		default: 'bottom'
	},
	offset: {
		type: [Number, Object] as PropType<number | OffsetOptions>,
		default: 8
	},
	shiftOffset: {
		type: [Number, Boolean],
		default: 2
	},
	showArrow: {
		type: Boolean,
		default: false
	},
	isArrowCenter: {
		type: Boolean,
		default: true
	},
	zIndex: Number,
	displayDirective: {
		type: String as PropType<'if' | 'show'>,
		default: 'if'
	}
}

export type FlexibleOverlayProps = ExtractPropTypes<typeof flexibleOverlayProps>
