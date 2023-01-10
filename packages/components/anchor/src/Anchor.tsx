/*
 * @Author: Devin
 * @Date: 2022-06-16 14:41:36
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-25 08:48:31
 */
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, toRefs, nextTick, ref, h } from 'vue'
import props from './props'
import lodash from 'lodash'
export default defineComponent({
	name: 'Anchor',
	props,
	setup(props, { emit }) {
		const state: any = reactive({
			active: '',
			markerID: lodash.uniqueId('marker_'),
			anchorID: lodash.uniqueId('anchor_'),
			scrollDom: null,
			anchorIDs: [],
			markerShow: false,
			fixeStyle: {},
			offsetTop: 0,
			isHashWeb: false,
			isOffset: false,
			sizeTop: props.size === 'small' ? 5 : 10
		})
		const MAnchor = ref()
		const activeLink = (data: any, $event: MouseEvent | { target: any }) => {
			state.markerShow = true
			emit('click', data)
			if (state.isHashWeb) {
				scrollTo(data.id || data.label)
			}
			nextTick(() => {
				const canScrollHeight = state.scrollDom.scrollHeight - state.scrollDom.offsetHeight
				const dom = state.scrollDom.querySelector('#' + (data.id || data.label))
				if (!dom) return
				if (dom.offsetTop <= canScrollHeight) {
					state.active = '#' + (data.id || data.label)

					if (props.showRail) {
						const marker: any = MAnchor.value.querySelector(`#${state.markerID}.m-anchor-marker`)

						marker.style.top =
							$event.target.offsetTop + $event.target.offsetHeight / 2 - marker.offsetHeight / 2 + 'px'
					}
				}
			})
		}
		const handlePageScroll = (e: any) => {
			e.stopPropagation()
			setFixe(props.offset && state.offsetTop <= (e.target.scrollTop || e.target.scrollingElement.scrollTop))
			let currentID = getCurrentID(e)
			if (currentID) {
				if (state.active !== '#' + currentID) {
					emit(
						'changeAhchor',
						props.sections.find((item: any) => {
							return currentID === (item.id || item.label)
						})
					)
				}
				state.active = '#' + currentID
				state.markerShow = true

				nextTick(() => {
					let activeDomCss = `.m-anchor-item-label[href="#${currentID}"]`
					if (state.isHashWeb) {
						activeDomCss = `.m-anchor-item-label[hash-href="#${currentID}"]`
					}

					const activeDom: any = MAnchor.value.querySelector(activeDomCss)

					if (props.showRail) {
						const marker: any = MAnchor.value.querySelector(`#${state.markerID}.m-anchor-marker`)
						marker.style.top =
							activeDom.offsetTop + activeDom.offsetHeight / 2 - marker.offsetHeight / 2 + 'px'
					}
				})
			} else {
				state.markerShow = false
			}
		}
		const getCurrentID = (e: any) => {
			// 当前表单的的scrollTop
			let scrollTop
			if (e.target.scrollTop) {
				scrollTop = e.target.scrollTop + props.bound
			} else {
				scrollTop = e.target.scrollingElement.scrollTop + props.bound
			}
			const length = state.anchorIDs.length
			let currentID
			// 滚动距离只要大于或等于当前节点位置加上自身高度及显示下一个
			for (let i = 0; i < length; i++) {
				if (
					scrollTop === state.anchorIDs[i].offsetTop ||
					(i < length - 1 &&
						scrollTop > state.anchorIDs[i].offsetTop &&
						scrollTop < state.anchorIDs[i + 1].offsetTop)
				) {
					currentID = state.anchorIDs[i].id
					break
				} else if (i === length - 1) {
					// 如果判断到一个节点，只要 scrollTop大于节点的offsetTop即可
					if (scrollTop > state.anchorIDs[i].offsetTop) {
						currentID = state.anchorIDs[i].id
						break
					}
				}
			}

			return currentID
		}
		const scrollTo = (id: string) => {
			const section = state.scrollDom.querySelector('#' + id)
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
		const setFixe = (type: any = false) => {
			if (type) {
				state.fixeStyle = { ...state.fixeStyle, ...props.position }
				;(state.fixeStyle as any).position = 'fixed'
				state.fixeStyle['z-index'] = props.zIndex
				state.isOffset = true
			} else {
				state.fixeStyle = {}
				state.isOffset = false
			}
		}
		// 增加防抖函数
		const debouncedPageScrollHandler = lodash.debounce(handlePageScroll, props.duration)
		onMounted(() => {
			state.offsetTop = MAnchor.value.offsetTop
			state.scrollDom = props.target ? document.querySelector(props.target) : document
			props.sections.forEach((item: any) => {
				const dom = state.scrollDom.querySelector('#' + (item.id || item.label))
				if (dom) state.anchorIDs.push(dom)
				if (item.children && item.children.length > 0) {
					item.children.forEach((val: { id: any; label: any }) => {
						const domC = state.scrollDom.querySelector('#' + (val.id || val.label))
						if (domC) state.anchorIDs.push(domC)
					})
				}
			})

			state.scrollDom.addEventListener('scroll', debouncedPageScrollHandler)
		})
		onBeforeUnmount(() => {
			state.scrollDom.removeEventListener('scroll', debouncedPageScrollHandler)
		})
		const linkHref = computed(() => {
			return (node: { id: any; label: string }) => {
				return '#' + (node.id || node.label)
			}
		})
		const isHashWebFun = computed(() => {
			return (node: { id: any; label: string }) => {
				return state.isHashWeb ? { 'hash-href': linkHref.value(node) } : { href: linkHref.value(node) }
			}
		})
		const cssVarsRef = computed(() => {
			return {
				'--m-anchor-text-size': props.size === 'small' ? '12px' : '14px',
				'--m-anchor-height': props.size === 'small' ? '26px' : '34px',
				'--m-anchor-text-color': ' var(--notes-color)',
				'--m-anchor-margin-left': '8px',
				'--m-anchor-margin-top': '5px',
				'--m-anchor-children-padding-left': props.size === 'small' ? '24px' : '28px',
				'--m-anchor-bg-color': 'rgba(0, 145, 255,0.2)'
			}
		})
		return {
			...toRefs(state),
			activeLink,
			linkHref,
			isHashWebFun,
			scrollTo,
			MAnchor,
			cssVars: cssVarsRef
		}
	},
	render() {
		let {
			showBackground,
			markerShow,
			width,
			fixeStyle,
			markerID,
			active,
			showRail,
			sections,
			linkHref,
			cssVars,
			isOffset,
			anchorID
		} = this as any

		const classes = [
			'm-anchor',
			showBackground && markerShow ? 'showBackground' : '',
			{ 'show-overflow-tooltip': this.showOverflowTooltip }
		]
		const style = { width, ...cssVars }

		const createNode = (node: any, index: number) => {
			return (
				<div class="m-anchor-item" key={node.label}>
					<a
						class={{
							'm-anchor-item-label': true,
							active: active === linkHref(node) && markerShow,
							'm-ellipsis': this.showOverflowTooltip
						}}
						onClick={e => this.activeLink(node, e)}
						{...this.isHashWebFun(node)}
						style={{ '--m-anchor-padding-left': 12 + index * 14 + 'px' }}
						v-ellipsis={{ theme: this.ellipsisTheme, disabled: !this.showOverflowTooltip }}
					>
						{node.label}
					</a>
					{node.children
						? node.children.map((item: any) => {
								return createNode(item, index + 1)
						  })
						: null}
				</div>
			)
		}
		const manchor = () => {
			return (
				<div class={classes} style={style} ref="MAnchor" id={anchorID}>
					{sections.map((node: any) => {
						return createNode(node, 0)
					})}
					{showRail ? (
						<div class="m-anchor-line">
							<div
								class="m-anchor-marker"
								style={{ display: markerShow ? 'block' : 'none' }}
								id={markerID}
							></div>
						</div>
					) : null}
				</div>
			)
		}
		return isOffset ? (
			<div class="isOffset" style={{ ...fixeStyle }}>
				{manchor()}
			</div>
		) : (
			manchor()
		)
	}
})
