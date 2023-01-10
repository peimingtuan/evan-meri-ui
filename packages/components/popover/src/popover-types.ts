import type { PropType, ExtractPropTypes, Ref } from 'vue'

export type TriggerType = 'click' | 'hover' | 'manually'
export type PopType = 'success' | 'error' | 'warning' | 'info' | 'default'
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
export type ThemeType = 'dark' | 'light' | 'darkTransparent'
export type PopoverClass = string | Array<string> | Record<string, string>
export const popoverProps = {
	isOpen: {
		type: Boolean,
		default: false
	},
	position: {
		type: Array as PropType<Array<Placement>>,
		default: ['top']
	},
	placement: {
		type: String as PropType<Placement>,
		default: 'top'
	},
	offset: {
		type: [Number, Object] as PropType<number | OffsetOptions>,
		default: 8
	},
	content: {
		type: String,
		default: ''
	},
	trigger: {
		type: String as PropType<TriggerType>,
		default: 'hover'
	},
	showAnimation: {
		type: Boolean,
		default: true
	},
	mouseEnterDelay: {
		type: Number,
		default: 150
	},
	mouseLeaveDelay: {
		type: Number,
		default: 100
	},
	disabled: {
		type: Boolean,
		default: false
	},
	showArrow: {
		type: Boolean,
		default: true
	},
	width: String,
	height: String,
	zIndex: Number,
	popoverClass: {
		type: [String, Array, Object] as PropType<PopoverClass>,
		default: ''
	},
	theme: {
		type: String as PropType<ThemeType>,
		default: 'light'
	},
	transition: {
		type: String as PropType<string>,
		default: ''
	}
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export interface UsePopoverEvent {
	placement: string
	handlePositionChange: (pos: Placement) => void
	onMouseenter: () => void
	onMouseleave: () => void
	manuallyHide: () => void
}
