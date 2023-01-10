// @ts-nocheck
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	toRefs,
	watch,
	h,
	watchEffect,
	Teleport
} from 'vue'
import scorllbarProps, { ScrollInfoType } from './scrollbar-type'
import ElementResizeDetectorMaker from 'element-resize-detector'
let canEmited: number | boolean = 1
export default defineComponent({
	name: 'Scrollbar',
	props: scorllbarProps,
	render() {
		const {
			id,
			theWidth,
			theHeight,
			isShowH,
			barHDown,
			left,
			top,
			trackColor,
			thumbColor,
			breadth,
			barHTall,
			barWTall,
			barHScrollTop,
			barWScrollLeft,
			autoHide,
			noVer,
			noHor,
			refs,
			onTrackMousedown,
			onScrollEvent,
			onBarMousedown,
			needSmooth,
			isShowW,
			barWDown,
			scrollClass,
			contentMaxHeight,
			scrollTop,
			scrollLeft
		} = this as any

		//  纵向滚动条
		const HScrollBarTsx = () => {
			return !noVer ? (
				<div
					onMousedown={e => {
						e.stopPropagation()
						onTrackMousedown(e, 1)
					}}
					onMouseenter={e => {
						e.stopPropagation()
						;(this as any).hoverH = true
					}}
					onMouseleave={e => {
						e.stopPropagation()
						;(this as any).hoverH = false
					}}
					style={{
						'background-color': trackColor,
						opacity: autoHide ? 0 : 0.8,
						top: scrollTop + 'px',
						right: -scrollLeft + 'px'
					}}
					class={[
						'm-scorllbar-vertical-track-h',
						{ 'm-scorllbar-vertical-track-disabled': !isShowH },
						{ show: barHDown },
						{ left: left }
					]}
				>
					<div
						onMousedown={e => {
							e.stopPropagation()
							onBarMousedown(e, 1)
						}}
						ref={el => (refs[`m-scorllbar-barh-${id}`] = el)}
						style={{
							transition: 'width 250ms,height 250ms',
							'background-color': thumbColor,
							width: ((this as any).hoverH || barHDown ? breadth + 4 : breadth) + 'px',
							height: barHTall + 'px',
							transform: `translateY(${barHScrollTop}px)`,
							'border-radius': breadth + 'px',
							opacity: barWDown ? 0 : 0.9
						}}
					></div>
					{/* <div class="m-scorllbar-vertical-track-h-box" style={{ height: contentHeight + 'px' }}></div> */}
				</div>
			) : null
		}
		// 横向滚动条
		const WScrollBarTsx = () => {
			return (
				!noHor && (
					<div
						onMousedown={e => {
							e.stopPropagation()

							onTrackMousedown(e, 2)
						}}
						onMouseenter={e => {
							e.stopPropagation()
							;(this as any).hoverW = true
						}}
						onMouseleave={e => {
							e.stopPropagation()
							;(this as any).hoverW = false
						}}
						style={{
							'background-color': trackColor,
							opacity: autoHide ? 0 : 0.8,
							bottom: -scrollTop + 'px',
							left: scrollLeft + 'px'
						}}
						class={[
							'm-scorllbar-vertical-track-w',
							{ 'm-scorllbar-vertical-track-disabled': !isShowW },
							{ show: barWDown },
							{ top: top }
						]}
					>
						<div
							onMousedown={e => {
								e.stopPropagation()
								onBarMousedown(e, 2)
							}}
							ref={el => (refs[`m-scorllbar-barw-${id}`] = el)}
							style={{
								transition: 'width 250ms,height 250ms',
								'background-color': thumbColor,
								height: ((this as any).hoverW || barWDown ? breadth + 4 : breadth) + 'px',
								width: barWTall + 'px',

								transform: `translateX(${barWScrollLeft}px)`,
								'border-radius': breadth + 'px',
								opacity: barHDown ? 0 : 0.9
							}}
						></div>
					</div>
				)
			)
		}
		return (
			// <div
			// 	ref={el => (refs[`m-scorllbar-box-${id}`] = el)}
			// 	style={{ width: theWidth, height: theHeight }}
			// 	class="m-scorllbar-box"
			// >
			<div
				ref={el => (refs[`m-scorllbar-body-${id}`] = el)}
				class={[scrollClass, 'm-scorllbar-box', 'm-scorllbar-body', { isPc: true }, { isSmooth: needSmooth }]}
				style={`${noVer ? 'height:100%;overflow-y:hidden;' : ''} ${
					noHor ? 'width:100%;overflow-x:hidden;' : ''
				} ${contentMaxHeight ? 'max-height:' + contentMaxHeight : ''}`}
				style={{ width: theWidth, height: theHeight }}
				tabindex="9999"
				onScroll={onScrollEvent}
			>
				{HScrollBarTsx()}
				{WScrollBarTsx()}
				<div class="m-scorllbar-content" ref={el => (refs[`m-scorllbar-content-${id}`] = el)}>
					{this.$slots.default?.()}
				</div>
			</div>
			// </div>
		)
	},
	emits: ['onHStart', 'onHEnd', 'onScroll', 'onWStart', 'onWEnd'],
	setup(props, { emit, slots, expose }) {
		const data: any = reactive({
			observer: null, // 监听变化
			isShowH: false, // 是否显示垂直滚动条
			isShowW: false, // 是否显示横向滚动条,
			trickH: 0, // 轨道高 = box高 - padding的4px
			trickW: 0, // 轨道宽
			barHTall: 0, // 垂直滚动条bar高度
			barWTall: 0, // 横向滚动条bar宽度
			barHScrollTop: 0, // 滚动条移动的距离Y
			scrollTop: 0, // 滚动的距离Y
			barWScrollLeft: 0, // 滚动条移动的距离X
			scrollLeft: 0, // 滚动的距离X
			startBarHScrollTop: 0, // 滚动条上一次的位置Y
			startBarWScrollLeft: 0, // 滚动条上一次的位置X
			barHDown: false, // 垂直滚动条上鼠标是否按下
			barWDown: false, // 横向滚动条上鼠标是否按下
			startX: 0, // 鼠标按下时的坐标X
			startY: 0, // 鼠标按下时的坐标Y
			scaleH: 0, // 比例尺
			scaleW: 0,
			hoverH: false, // H悬浮
			hoverW: false, // W悬浮
			timer: 0, // 节流所使用的timer
			reqTimer: null, // requestAnimationFrame所使用的timer
			needSmooth: true, // 是否需要平滑滚动 鼠标拖拽滑块时不需要，其他时候需要
			isBehavior: false, // 是否支持原生平滑滚动
			contentHeight: 0 // 内容的高度
		})
		const refs: any = ref({
			[`m-scorllbar-box-${props.id}`]: null,
			[`m-scorllbar-barh-${props.id}`]: null,
			[`m-scorllbar-body-${props.id}`]: null,
			[`m-scorllbar-content-${props.id}`]: null,
			[`m-scorllbar-barw-${props.id}`]: null
		})
		onMounted(() => {
			// 是否支持原生平滑滚动,chrome/firefox/opera支持
			data.isBehavior = 'scroll-behavior' in document.body.style

			// 监听内部宽高变化，用于调整滚动条大小和位置
			callback()
			listenResize()

			// 监听鼠标拖动事件
			document.addEventListener('mousemove', onBarDragMove, false)
			document.addEventListener('mouseup', onMouseUp, false)
		})
		const theWidth = computed(() => {
			return Number(props.width) ? `${props.width}px` : props.width
		})
		const theHeight = computed(() => {
			return Number(props.height) ? `${props.height}px` : props.height
		})

		const contentMaxHeight = computed(() => {
			if (props.contentMaxHeight) {
				return Number(props.contentMaxHeight) ? `${props.contentMaxHeight}px` : props.contentMaxHeight
			} else {
				return ''
			}
		})
		const realShowH = computed(() => {
			return data.isShowH && !props.noVer
		})
		const realShowW = computed(() => {
			return data.isShowW && !props.noHor
		})
		/**
		 * 监听滚动条滚动事件
		 * 原生滚动条为主，模拟滚动条跟随原生滚动条位置
		 * 这里不做节流，需要灵敏
		 * */
		function onScrollEvent() {
			const dom = refs.value[`m-scorllbar-body-${props.id}`]
			if (realShowH.value) {
				data.barHScrollTop = dom.scrollTop / data.scaleH
			}
			if (realShowW.value) {
				data.barWScrollLeft = dom.scrollLeft / data.scaleW
			}
		}
		// 监听容器变化
		function listenResize() {
			// 如果支持ResizeObserver就用这个
			if (window.ResizeObserver) {
				data.observer = new ResizeObserver(callback)
				data.observer.observe(refs.value[`m-scorllbar-body-${props.id}`])
				data.observer.observe(refs.value[`m-scorllbar-content-${props.id}`])
			} else {
				data.observer = ElementResizeDetectorMaker(data.resizeObject ? null : { strategy: 'scroll' })
				data.observer.listenTo(refs.value[`m-scorllbar-body-${props.id}`], callback())
				data.observer.listenTo(refs.value[`m-scorllbar-content-${props.id}`], callback())
			}
		}
		/**
		 * 容器大小变化后的回调函数
		 * 重置是否显示滚动条
		 * 重置比例尺
		 * 重置轨道高度
		 * 重置滑块高度
		 * 重置真实滚动条位置
		 * */
		function callback() {
			nextTick(() => {
				const dom = refs.value[`m-scorllbar-body-${props.id}`]
				const content = refs.value[`m-scorllbar-content-${props.id}`]
				data.contentHeight = content?.offsetHeight
				if (!dom) return
				data.trickH = dom.offsetHeight - 4 // 轨道长度 = box高度 - 上下padding一共4px 再v-if情况下b.height有可能为0
				data.trickW = dom.offsetWidth - 4
				const scrollHeight = content.clientHeight
				const scrollWidth = content.scrollWidth
				data.isShowH = scrollHeight > dom.clientHeight // 真实内容高度 > 容器高度，就显示滚动条
				data.isShowW = scrollWidth > dom.clientWidth
				if (realShowH.value) {
					// 滚动条的高度 = 真实容器可见高度/真实总高度 * 轨道高度
					data.barHTall = Math.max(
						(dom.clientHeight / scrollHeight) * data.trickH,
						props.minLength > dom.clientHeight ? 0 : props.minLength
					)
					// 比例尺 = （真实高度 - 容器高度）/ （轨道高度 - 滚动条高度）
					// console.log(scrollHeight)
					data.scaleH = (scrollHeight - dom.clientHeight) / (data.trickH - data.barHTall)
					data.barHScrollTop = Math.min(Math.max(dom.scrollTop / data.scaleH, 0), data.trickH - data.barHTall)
				} else {
					data.scaleH = 0
					dom.scrollTop = 0
				}
				if (realShowW.value) {
					data.barWTall = Math.max(
						(dom.clientWidth / scrollWidth) * data.trickW,
						props.minLength > dom.clientWidth ? 0 : props.minLength
					)
					data.scaleW = (scrollWidth - dom.clientWidth) / (data.trickW - data.barWTall)
					data.barWScrollLeft = Math.min(
						Math.max(dom.scrollLeft / data.scaleW, 0),
						data.trickW - data.barWTall
					)
					dom.scrollLeft = data.barWScrollLeft * data.scaleW
				} else {
					data.scaleW = 0
					dom.scrollLeft = 0
				}
			})
		}
		/**
		 * 轨道上鼠标按下
		 * @param e 事件对象
		 * @param type 1垂直滚动条/2水平滚动条
		 * */
		function onTrackMousedown(e: MouseEvent, type: number) {
			e.preventDefault()
			// data.needSmooth = false;
			const dom = refs.value[`m-scorllbar-body-${props.id}`]
			let temp: number
			nextTick(() => {
				let targetNum
				if (type === 1) {
					// 在上方点击 这里不能用temp
					if (data.barHScrollTop >= e.offsetY) {
						temp = Math.max(e.offsetY - 6, 0)
					} else {
						temp = Math.min(e.offsetY - data.barHTall + 2, data.trickH - data.barHTall)
					}

					if (data.isBehavior) {
						dom.scrollTop = temp * data.scaleH
					} else {
						targetNum = temp * data.scaleH
						// 步进值 / 15 约等于 256ms
						cancelAnimationFrame(data.reqTimer as unknown as number)
						smoothScrollTo('scrollTop', dom, targetNum, (targetNum - dom.scrollTop) / 15)
					}
				}
				if (type === 2) {
					// 在左方点击
					if (data.barWScrollLeft >= e.offsetX) {
						temp = Math.max(e.offsetX - 6, 0)
					} else {
						temp = Math.min(e.offsetX - data.barWTall + 2, data.trickW - data.barWTall)
					}

					if (data.isBehavior) {
						dom.scrollLeft = temp * data.scaleW
					} else {
						targetNum = temp * data.scaleW
						cancelAnimationFrame(data.reqTimer as unknown as number)
						smoothScrollTo('scrollLeft', dom, targetNum, (targetNum - dom.scrollLeft) / 15)
					}
				}
				// 为了按下后直接拖动时的位置校准
				onBarMousedown(e, type, temp)
			})
		}
		/**
		 * 横向或纵向滚动条被拖拽
		 * @param e 拖动时的事件对象，为了实时获取鼠标位置
		 * */
		function onBarDragMove(e: MouseEvent) {
			const dom = refs.value[`m-scorllbar-body-${props.id}`]

			if (data.barHDown) {
				data.needSmooth = false
				if (!data.timer) {
					cancelAnimationFrame(data.reqTimer)
					requestAnimationFrame(() => {
						const temp = Math.min(
							Math.max(data.startBarHScrollTop + e.clientY - data.startY, 0),
							data.trickH - data.barHTall
						)
						dom.scrollTop = temp * data.scaleH
						data.timer = 0
					})
					data.timer = 1
				}
			} else if (data.barWDown) {
				data.needSmooth = false
				if (!data.timer) {
					cancelAnimationFrame(data.reqTimer)
					requestAnimationFrame(() => {
						const temp = Math.min(
							Math.max(data.startBarWScrollLeft + e.clientX - data.startX, 0),
							data.trickW - data.barWTall
						)
						dom.scrollLeft = temp * data.scaleW
						data.timer = 0
					})
					data.timer = 1
				}
			}
		}
		// 鼠标抬起
		function onMouseUp() {
			data.barHDown = data.barWDown = false
			data.needSmooth = true
		}
		/**
		 * 平滑scrollTo
		 * @param type scrollTop/scrollLeft
		 * @param dom DOM对象
		 * @param targetNum 目标值
		 * @param step 步进值
		 * */
		function smoothScrollTo(type: string, dom: Document, targetNum: number, step: number) {
			data.reqTimer = requestAnimationFrame(() => {
				if ((step < 0 && dom[type] > targetNum) || (step > 0 && dom[type] < targetNum)) {
					dom[type] = dom[type] + step
					if (Math.abs(targetNum - dom[type]) < Math.abs(step)) {
						smoothScrollTo(type, dom, targetNum, Math.abs(targetNum - dom[type]) * (step < 0 ? -1 : 1))
					} else {
						smoothScrollTo(type, dom, targetNum, step)
					}
				}
			})
		}
		/**
		 * 鼠标在滑块上按下
		 * @parame e 事件对象，为了得到当前鼠标在滑块上的位置
		 * @params type 1垂直滚动条，2水平滚动条
		 * @params targetNum 目标位置，用于在轨道上点击时瞬间记录最终位置，因为滚动可能为平滑滚动
		 * */
		function onBarMousedown(e: MouseEvent, type: number, targetNum: number) {
			e.preventDefault()
			// 是否来自点击轨道，点击轨道需要保持平滑
			const isTargetSmooth = targetNum || targetNum === 0
			// 非轨道点击 或 是轨道点击但不支持原生滚动（会启动动画，不需要smooth）
			if (!isTargetSmooth || (isTargetSmooth && !data.isBehavior)) {
				data.needSmooth = false
			}

			data.barHDown = type === 1
			data.barWDown = type === 2
			data.startX = e.clientX
			data.startY = e.clientY
			data.startBarHScrollTop = data.barHDown && isTargetSmooth ? targetNum : data.barHScrollTop // 记录当前滚动条的位置
			data.startBarWScrollLeft = data.barWDown && isTargetSmooth ? targetNum : data.barWScrollLeft
		}
		/**
		 * 滚动到指定位置
		 * @param x 水平真实滚动距离，null保持不变/'end'滚到底
		 * @param y 垂直真实滚动距离，null保持不变/'end'滚到底
		 * @param smooth 是否平滑滚动
		 * */
		function scrollTo(x: number | string, y: number | string, smooth: boolean) {
			const dom = refs.value[`m-scorllbar-body-${props.id}`]
			const s_y = y === 'end' ? dom.scrollHeight - dom.clientHeight : y && data.scaleH > 0 ? y : 0
			const s_x = x === 'end' ? dom.scrollWidth - dom.clientWidth : x && data.scaleW > 0 ? x : 0
			data.needSmooth = !!smooth
			nextTick(() => {
				if (!realShowH.value) {
					dom.scrollTop = s_y
					data.scrollTop = dom.scrollTop
				}
				if (realShowH.value && (y || y === 0)) {
					dom.scrollTop = s_y
					data.scrollTop = dom.scrollTop
				}
				if (!realShowW.value) {
					dom.scrollLeft = s_x
					data.scrollLeft = dom.scrollLeft
				}
				if (realShowW.value && (x || x === 0)) {
					dom.scrollLeft = s_x
					data.scrollLeft = dom.scrollLeft
				}
				// firefox 设置scrollTop不会触发scroll事件,手动触发一下
				if (!smooth) {
					onScrollEvent()
				}
			})
		}
		/**
		 * 手动获取当前dom信息
		 * */
		function getScrollInfo(): ScrollInfoType {
			const dom = refs.value[`m-scorllbar-body-${props.id}`]
			return {
				height: dom.clientHeight,
				width: dom.clientWidth,
				clientHeight: dom.clientHeight,
				clientWidth: dom.clientWidth,
				offsetHeight: dom.offsetHeight,
				offsetWidth: dom.offsetWidth,
				scrollTop: dom.scrollTop,
				scrollLeft: dom.scrollLeft,
				scrollHeight: dom.scrollHeight,
				scrollWidth: dom.scrollWidth
			}
		}
		expose({ scrollTo, getScrollInfo })
		watch(
			() => props.noVer,
			newV => {
				if (newV) {
					const dom = refs.value[`m-scorllbar-body-${props.id}`]
					data.barHScrollTop = 0
					data.scaleH = 0
					dom.scrollTop = 0
				} else {
					callback()
				}
			}
		)
		watch(
			() => props.noHor,
			newV => {
				if (newV) {
					const dom = refs.value[`m-scorllbar-body-${props.id}`]
					data.barWScrollLeft = 0
					data.scaleW = 0
					dom.scrollLeft = 0
				} else {
					callback()
				}
			}
		)
		watch(
			() => data.barHScrollTop,
			(newV: number) => {
				if (newV < 0 || newV > data.trickH - data.barHTall) {
					return
				}
				const dom: HTMLElement = refs.value[`m-scorllbar-body-${props.id}`]
				const p: ScrollInfoType = {
					offsetHeight: dom.offsetHeight,
					offsetWidth: dom.offsetWidth,
					clientHeight: dom.clientHeight,
					clientWidth: dom.clientWidth,
					scrollHeight: dom.scrollHeight,
					scrollWidth: dom.scrollWidth,
					scrollTop: dom.scrollTop,
					scrollLeft: dom.scrollLeft
				}
				data.scrollTop = dom.scrollTop
				if (canEmited) {
					if (newV === 0) {
						canEmited = false
						emit('onHStart', p, dom)
					} else if (data.trickH - data.barHTall - newV <= props.scrollOffset) {
						emit('onHEnd', p, dom)
						canEmited = false
					}
				} else {
					if (!(data.trickH - data.barHTall - newV <= props.scrollOffset)) {
						canEmited = true
					}
				}
				emit('onScroll', p, dom)
			}
		)
		watch(
			() => data.barWScrollLeft,
			(newV: number) => {
				if (newV < 0 || newV > data.trickW - data.barWTall) {
					return
				}
				const dom: HTMLElement = refs.value[`m-scorllbar-body-${props.id}`]
				const p: ScrollInfoType = {
					offsetHeight: dom.offsetHeight,
					offsetWidth: dom.offsetWidth,
					clientHeight: dom.clientHeight,
					clientWidth: dom.clientWidth,
					scrollHeight: dom.scrollHeight,
					scrollWidth: dom.scrollWidth,
					scrollTop: dom.scrollTop,
					scrollLeft: dom.scrollLeft
				}
				data.scrollLeft = dom.scrollLeft
				if (canEmited) {
					if (newV === 0) {
						canEmited = false
						emit('onWStart', p, dom)
					} else if (data.trickW - data.barWTall - newV <= props.scrollOffset) {
						canEmited = false
						emit('onWEnd', p, dom)
					}
				} else {
					if (!(data.trickW - data.barWTall - newV <= props.scrollOffset)) {
						canEmited = true
					}
				}

				emit('onScroll', p, dom)
			}
		)
		watch(
			() => data.contentHeight,
			(newV: number, oldV: number) => {
				const difference = oldV - newV

				if (difference > 0) {
					if (difference >= data.scrollTop) {
						// data.scrollTop = 0;
						nextTick(() => {
							scrollTo(null, 0, false)
						})
					} else {
						scrollTo(null, data.scrollTop - difference, false)
					}
				}
			}
		)
		return {
			...toRefs(data),
			theWidth,
			theHeight,
			contentMaxHeight,
			realShowH,
			realShowW,
			onTrackMousedown,
			refs,
			smoothScrollTo,
			onScrollEvent,
			onBarMousedown,
			listenResize,
			getScrollInfo,
			scrollTo
		}
	}
})
