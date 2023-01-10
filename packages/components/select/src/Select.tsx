// @ts-nocheck
import {
	defineComponent,
	h,
	ref,
	Ref,
	computed,
	Teleport,
	watch,
	Transition,
	nextTick,
	withModifiers,
	provide,
	reactive
} from 'vue'
import { templateRef, onClickOutside, useVirtualList } from '@vueuse/core'
import { escapeRegExp, isEqual, isNil } from 'lodash'

import type { SelectContext, ItemType } from './token'
import { Size } from '../../utils/types'
import { selectProps, selectEmits, selectSlots } from './SelectProps'
import { usePopupStyle } from './usePopupStyle'
import { selectKey } from './token'
import { ButtonType } from '../../button/src/ButtonProps'

import Option from './Option'
import Button from '../../button/src/Button'
import SelectHeader from '../../selectHeader/src/SelectHeader'

import 'meri-icon/lib/style.css'

const Select = defineComponent({
	components: {
		Option,
		Button,
		SelectHeader
	},
	name: 'Select',
	props: selectProps,
	emits: selectEmits,
	slots: selectSlots,
	setup(props, { slots, attrs, emit }) {
		const target = templateRef<HTMLElement>('target', null)

		const refTrigger = templateRef<HTMLElement>('trigger', null)

		const refPopup = templateRef<HTMLElement>('popup', null)

		const refPopupContent = templateRef<HTMLElement>('content', null)

		// 私有的展开收起状态
		const selfOpen = ref(false)
		const selfOpenDelay = ref(false)

		watch(selfOpen, () => {
			if (selfOpen.value) {
				selfOpenDelay.value = selfOpen.value
				// refTrigger.value.focus()
				emit('focus')
				setTimeout(() => {
					scrollToChecked()
				}, 0)
			} else {
				setTimeout(() => {
					selfOpenDelay.value = selfOpen.value
				}, 200)
				refTrigger.value.blur()
				emit('blur')
			}
		})

		const focus = () => {
			selfOpen.value = true
		}

		const blur = () => {
			selfOpen.value = false
		}

		// 堆栈的选项列表
		const cachedOptions: Ref<ItemType[]> = ref([])

		const setCacheOptions = (el: ItemType) => {
			const { id, name } = el
			const isHas = cachedOptions.value.map(e => e.id).includes(id)
			if (!isHas) {
				cachedOptions.value.push(el)
			}
		}

		const removeCacheOptions = (el: ItemType) => {
			const { id, name } = el
			const index = cachedOptions.value.findIndex(el => el.id === id)
			if (index !== -1) {
				cachedOptions.value.splice(index, 1)
			}
		}

		const optionsArray = computed(() => {
			return props.options ? props.options : cachedOptions.value
		})

		// 搜索逻辑
		const searchVal = ref<string>('')

		const onSearchChange = (val: string) => {
			searchVal.value = val
			emit('search', searchVal.value)
		}

		const getSearchOptions = computed((): ItemType[] => {
			const keyword = searchVal.value.trim()
			if (keyword === '') {
				return optionsArray.value
			}
			const Reg = new RegExp(escapeRegExp(keyword), 'gi')
			const searchArr = optionsArray.value.filter(el => el.name.search(Reg) !== -1)
			return searchArr.map(el => {
				const newEl = { ...el, ...{ html: '' } }
				newEl.html = el.name.replace(Reg, `<span style="color:var(--primary-color)">$&</span>`)
				return newEl
			})
		})

		// 展示空
		const getIsEmpty = computed(() => {
			return isNil(props.isShowEmpty) ? getSearchOptions.value.length === 0 : props.isShowEmpty
		})

		const selectItems: Ref<ItemType[]> = ref([])

		const cacheSelectItems: Ref<ItemType[]> = ref([])

		const getSelectItems = computed(() => {
			return props.hasConfirm ? cacheSelectItems.value : selectItems.value
		})

		const getSelectNames = computed(() => {
			const names = getSelectItems.value.map(el => el.showName || el.name)
			return props.multiple ? names : names[0] || ''
		})

		const getSelectIdsArray = computed(() => {
			return selectItems.value.map(el => el.id)
		})

		const getSelectIds = computed(() => {
			return props.multiple || props.isTree ? getSelectIdsArray.value : getSelectIdsArray.value.at(0) || ''
		})

		const countSize = (size: string | number): number => {
			let width = 240
			switch (size) {
				case 'min':
					width = 96
					break
				case 'small':
					width = 185
					break
				case 'medium':
					width = 240
					break
				case 'large':
					width = 408
					break
				case 'max':
					width = 680
					break
				default:
					width = typeof size === 'number' ? size : 240
					if (width < 96) width = 96
					if (width > 680) width = 680
					break
			}
			return width
		}

		const getMenuSize = computed(() => {
			return countSize(props.menuSize || props.size)
		})

		const getMenuSizeProp = computed(() => {
			return props.menuSize === 'auto'
				? { minWidth: `${getMenuSize.value}px` }
				: { width: `${getMenuSize.value}px` }
		})

		const getScrollSizeProp = computed(() => {
			return props.maxScrollHeight ? { maxHeight: `${props.maxScrollHeight}px` } : {}
		})

		const getVirtualProp = computed(() => {
			if (getIsEmpty.value) return { height: '0px' }
			return { height: `${props.maxScrollHeight || 308}px`, padding: '6px' }
		})

		const updateModelValue = () => {
			emit('update:modelValue', getSelectIds.value)
		}

		watch(
			() => props.modelValue,
			newVal => {
				// console.log('newVal', isEqual(newVal, getSelectIds.value))
				if (isEqual(newVal, getSelectIds.value)) return
				const newIds: Array<string | number> = Array.isArray(newVal) ? newVal : [newVal]
				selectItems.value = optionsArray.value.filter(el => newIds.includes(el.id))
				cacheSelectItems.value = [...selectItems.value]
			},
			{ immediate: true }
		)

		const handleConfirm = () => {
			cacheSelectItems.value = [...selectItems.value]
			updateModelValue()
			blur()
			emit('confirm', getSelectIds.value)
		}

		const handleCancel = () => {
			if (!isEqual(selectItems.value, cacheSelectItems.value)) {
				selectItems.value = [...cacheSelectItems.value]
				updateModelValue()
			}
			blur()
			emit('cancel', getSelectIds.value)
		}

		const handleClickTrigger = (event: Event) => {
			if (props.disabled) {
				event.preventDefault()
				return
			}
			// refTrigger.value.focus()
			selfOpen.value = !selfOpen.value
		}

		const handleClickItem = (event: MouseEvent, el: ItemType): void => {
			// refTrigger.value.focus()
			// debugger
			event.stopPropagation()
			if (el.disabled) {
				event.stopPropagation()
				return
			}
			if (!props.multiple) {
				selectItems.value = [el]
				cacheSelectItems.value = [el]
				updateModelValue()
				blur()
				emit('change', getSelectIds.value)
				return
			}
			if (!getSelectIdsArray.value.includes(el.id)) {
				if (props.multipleLimit && selectItems.value.length >= props.multipleLimit) return
				selectItems.value.push(el)
			} else {
				const index = selectItems.value.findIndex(item => item.id === el.id)
				selectItems.value.splice(index, 1)
			}
			if (!props.hasConfirm) {
				cacheSelectItems.value = [...selectItems.value]
				updateModelValue()
				emit('change', getSelectIds.value)
			}
		}

		const handleClear = (event: MouseEvent) => {
			selectItems.value = [...cacheSelectItems.value]
			updateModelValue()
			emit('clear')
		}

		const handleTagClose = (item: ItemType) => {
			selectItems.value = [...cacheSelectItems.value]
			updateModelValue()
			emit('remove', item)
		}

		const handleCheckBoxClick = (event: MouseEvent, el: ItemType) => {
			event.stopPropagation()
			handleClickItem(event, el)
		}

		onClickOutside(
			target,
			event => {
				handleCancel()
			},
			{ ignore: [refPopup] }
		)

		const { windowStyle } = usePopupStyle(target, {
			topOffset: 8,
			align: props.placement,
			level: 'Left'
		})

		const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(getSearchOptions, {
			// Keep `itemHeight` in sync with the item's row.
			itemHeight: 40,
			overscan: 10
		})

		// const refVirtual = templateRef<HTMLElement>(containerProps.ref.value, null)

		const scrollToChecked = () => {
			const index = optionsArray.value.findIndex(item => getSelectIdsArray.value.includes(item.id))
			nextTick(() => {
				if (typeof window == 'undefined') {
					refPopupContent.value && (refPopupContent.value.scrollTop = 0)
					return
				}
				if (!refPopup.value) {
					return
				}
				if (props.virtual) {
					scrollTo(index as number)
					return
				}
				const el = refPopup.value?.querySelectorAll('.m-select-menu-item')[index] as HTMLElement
				const top = (el?.offsetTop || 0) - 60
				refPopupContent.value.scrollTop = top
			})
		}

		const scrollToPos = (top: number) => {
			refPopupContent.value && (refPopupContent.value.scrollTop = top)
		}

		// 依赖注入
		provide(
			selectKey,
			reactive({
				props,
				searchVal,
				getSelectIdsArray,
				getSelectIds,
				getSelectNames,
				optionsArray,
				handleClickItem,
				handleCheckBoxClick,
				setCacheOptions,
				removeCacheOptions,
				getSearchOptions
			}) as unknown as SelectContext
		)

		const selectRender = () => {
			// 获取按钮是Icon 合适对应得Select
			const selectHeaderProps = {
				disabled: props.disabled,
				prefix: props.prefix,
				clearable: props.clearable,
				searchable: props.searchable,
				autoClearSearch: props.autoClearSearch,
				multiple: props.multiple,
				multipleLimit: props.multipleLimit,
				mode: props.mode,
				placeholder: props.placeholder,
				size: props.size,
				maxTagCount: props.maxTagCount,
				maxTagTextLength: props.maxTagTextLength,
				maxTagWidth: props.maxTagWidth,
				onSearch: onSearchChange,
				onRemove: handleTagClose,
				onClear: handleClear,
				onClick: handleClickTrigger
			}

			const selectHeaderSlots = {
				prefix: slots.prefix,
				clearIcon: slots.clearIcon,
				suffixIcon: slots.suffixIcon
			}

			// 输入框
			const input = slots.trigger ? (
				<section ref="trigger" onClick={handleClickTrigger}>
					{slots.trigger?.({ list: cacheSelectItems.value })}
				</section>
			) : (
				<SelectHeader
					ref="trigger"
					v-model={cacheSelectItems.value}
					v-slots={selectHeaderSlots}
					{...selectHeaderProps}
				></SelectHeader>
			)

			// 下拉弹窗
			const option = props.virtual ? (
				<div {...containerProps} style={getVirtualProp.value}>
					<div {...wrapperProps.value}>
						{list.value.map(item => {
							return (
								<Option
									notRequiredFilter
									key={item.index}
									value={item.data.id}
									label={item.data.name}
									html={item.data.html}
									disabled={item.data.disabled || false}
								></Option>
							)
						})}
					</div>
				</div>
			) : (
				<section
					ref="content"
					class="m-select-menu-content"
					style={getScrollSizeProp.value}
					isEmpty={getIsEmpty.value}
				>
					{getSearchOptions.value.map((el: ItemType) => (
						<Option
							notRequiredFilter
							value={el.id}
							label={el.name}
							html={el.html}
							disabled={el.disabled || false}
						></Option>
					))}
				</section>
			)

			// footer
			const footer = props.hasConfirm ? (
				<section v-show={!getIsEmpty.value} class="m-select-menu-footer">
					<Button type={ButtonType.default} size={Size.small} onClick={handleCancel}>
						取消
					</Button>
					<Button type={ButtonType.primary} size={Size.small} onClick={handleConfirm}>
						确定
					</Button>
				</section>
			) : null

			// 滚动条区域
			const popup = (
				<div ref="popup" class="m-select-menu" size={props.size} virtual={props.virtual}>
					{slots.panelHeader?.()}
					{slots.default ? (
						<section
							ref="content"
							class="m-select-menu-content"
							style={getScrollSizeProp.value}
							isEmpty={getIsEmpty.value}
						>
							{slots.default?.()}
						</section>
					) : (
						option
					)}
					{getIsEmpty.value ? slots.empty?.() || <div class="m-select-menu-empty">暂无内容</div> : null}
					{slots.panelFooter?.() || footer}
				</div>
			)
			// window
			const window = (
				<Teleport to="body">
					<Transition name="m-select-zoom">
						<div
							v-show={selfOpen.value}
							class="m-select-window"
							placement={windowStyle.placement}
							style={{
								...(selfOpenDelay.value ? windowStyle : {}),
								...getMenuSizeProp.value,
								...(props.zIndex ? { 'z-index': props.zIndex } : {})
							}}
						>
							{popup}
						</div>
					</Transition>
				</Teleport>
			)

			// 弹窗的内容
			return (
				<div ref="target" class="m-select-wrap">
					{input}
					{window}
				</div>
			)
		}
		return { selectItems, cacheSelectItems, blur, focus, selectRender, selfOpen, optionsArray, scrollToPos }
	},
	render() {
		return this.selectRender()
	}
})
export default Select
