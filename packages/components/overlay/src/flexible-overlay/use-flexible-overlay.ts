import { ref, unref, watch, nextTick, onUnmounted } from 'vue'
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { FlexibleOverlayProps, Placement, Point, UseOverlayFn, EmitEventFn, Rect } from './flexible-overlay-types'
import { getScrollParent } from './utils'
import { getRelativePosition, getViewArea } from '../../../utils/tools'

function adjustArrowPosition(isArrowCenter: boolean, point: Point, placement: Placement, originRect: Rect): Point {
	let { x, y } = point
	if (!isArrowCenter) {
		const { width, height } = originRect as any
		if (x && placement.includes('start')) {
			x = 12
		}
		if (x && placement.includes('end')) {
			x = Math.round(width - 24)
		}
		if (y && placement.includes('start')) {
			y = 10
		}
		if (y && placement.includes('end')) {
			y = height - 14
		}
	}

	return { x, y }
}
// 判断触发元素是否超出屏幕
function detectOverflow(
	hostEl: HTMLElement,
	placement: Placement
): { isDetectOverflow: boolean; placement: Placement } {
	// 判断弹框出现的位置
	const isWidth = placement == 'top' || placement == 'bottom'
	const isHeight = placement == 'left' || placement == 'right'
	const { x, y } = getRelativePosition(hostEl)
	const { width, height } = getViewArea()
	// 判断横向是否超出边界
	if (isWidth) {
		if (x > width) {
			return { isDetectOverflow: true, placement: (placement + '-end') as Placement }
		}
		if (x < 0) {
			return { isDetectOverflow: true, placement: (placement + '-start') as Placement }
		}
	}
	// 判断纵向是否超出边界
	if (isHeight) {
		if (y > height) {
			return { isDetectOverflow: true, placement: (placement + '-end') as Placement }
		}
		if (y < 0) {
			return { isDetectOverflow: true, placement: (placement + '-start') as Placement }
		}
	}
	return { isDetectOverflow: false, placement }
}
export function useOverlay(props: FlexibleOverlayProps, emit: EmitEventFn): UseOverlayFn {
	const overlayRef = ref<HTMLElement | undefined>()
	const arrowRef = ref<HTMLElement | undefined>()
	const placementChange = ref<Placement>(props.placement)
	let originParent: any = null

	// 更新小箭头的位置
	const updateArrowPosition = (arrowEl: HTMLElement, placement: Placement, point: Point, overlayEl: HTMLElement) => {
		let { x, y } = adjustArrowPosition(props.isArrowCenter, point, placement, overlayEl.getBoundingClientRect())
		// 设置小箭头偏移量
		const staticSide: any = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right'
		}[placement.split('-')[0]]

		Object.assign(arrowEl.style, {
			left: x ? `${x}px` : '',
			top: y ? `${placement.includes('end') ? y - 5 : y}px` : '',
			right: '',
			bottom: '',
			[staticSide]: '-5px'
		})
	}
	// 更新弹框的位置
	const updatePosition = async () => {
		// 获取起点元素的实例
		const hostEl = <HTMLElement>props.origin
		// 获取遮罩层元素实例
		const overlayEl = <HTMLElement>unref(overlayRef.value)
		// 获取小箭头元素实例
		const arrowEl = <HTMLElement>unref(arrowRef.value)
		const middleware = [offset(props.offset), flip()]

		props.showArrow && middleware.push(arrow({ element: arrowEl }))
		// 判断是否溢出
		const isDetectOverflow = ref<boolean>(false)
		let placementOverflow: Placement = props.placement // 元素溢出屏幕时的定位
		isDetectOverflow.value = detectOverflow(hostEl, placementOverflow)?.isDetectOverflow
		placementOverflow = detectOverflow(hostEl, placementOverflow)?.placement
		const shiftOffset: any = props.shiftOffset as number
		const pushShift = shiftOffset != false && !isDetectOverflow.value
		pushShift && middleware.push(shift())

		// 该函数返回和 坐标以将浮动元素放置在给定参考元素旁边。
		const { x, y, placement, middlewareData } = (await computePosition(hostEl, overlayEl, {
			strategy: 'fixed',
			placement: isDetectOverflow.value ? placementOverflow : props.placement,
			middleware
		})) as any
		let applyX = x
		let applyY = y

		let { x: arrowX, y: arrowY } = middlewareData?.arrow || { x: 0, y: 0 }
		if (pushShift) {
			const { x: shiftX, y: shiftY } = middlewareData.shift
			shiftX < 0 && (applyX -= shiftOffset)
			shiftX > 0 && (applyX += shiftOffset)
			shiftY < 0 && (applyY -= shiftOffset)
			shiftY > 0 && (applyY += shiftOffset)
			if (arrowX) {
				if (shiftX < 0) {
					arrowX = arrowX + Math.abs(shiftX) + shiftOffset
				}
				if (shiftX > 0) {
					arrowX = arrowX - (shiftX + shiftOffset)
				}
			}
			if (arrowY) {
				if (shiftY < 0) {
					arrowY = arrowY + Math.abs(shiftY) + shiftOffset
				}
				if (shiftY > 0) {
					arrowY = arrowY - (shiftY + shiftOffset)
				}
			}
		}

		placementChange.value = placement
		emit('positionChange', placement)

		Object.assign(overlayEl.style, { top: `${applyY}px`, left: `${applyX}px` })

		props.showArrow && updateArrowPosition(arrowEl, placement, { x: arrowX, y: arrowY }, overlayEl)
	}
	watch(
		() => props.modelValue,
		() => {
			if (props.modelValue && props.origin) {
				originParent = getScrollParent(props.origin)
				nextTick(updatePosition)
				originParent?.addEventListener('scroll', updatePosition)
				originParent !== window && window.addEventListener('scroll', updatePosition)
				window.addEventListener('resize', updatePosition)
			} else {
				originParent?.removeEventListener('scroll', updatePosition)
				originParent !== window && window.removeEventListener('scroll', updatePosition)
				window.removeEventListener('resize', updatePosition)
			}
		}
	)
	onUnmounted(() => {
		originParent?.removeEventListener('scroll', updatePosition)
		originParent !== window && window.removeEventListener('scroll', updatePosition)
		window.removeEventListener('resize', updatePosition)
	})

	return { arrowRef, overlayRef, updatePosition, placement: placementChange }
}
