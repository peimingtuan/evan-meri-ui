// @ts-nocheck
import { defineComponent, h, ref, computed } from 'vue'
import { templateRef, onClickOutside, useFocus, useElementHover } from '@vueuse/core'
import { selectHeaderProps, selectHeaderEmits, selectHeaderSlots } from './SelectHeaderProps'
import type { ItemType } from '../../select/src/token'
// @ts-ignore
import { IconMeriComponentCancel, IconMeriComponentArrowDown } from 'meri-icon'
import 'meri-icon/lib/style.css'
import Tag from './Tag'
// import Tips from '../../popover/src/Popover'
import Tips from '../../tips/src/Tips'
import Scrollbar from "../../scrollbar/src/scrollbar";


import { useIsShowTips } from '../../select/src/useIsShowTips'

const SelectHeader = defineComponent({
	name: 'SelectHeader',
	props: selectHeaderProps,
	emits: selectHeaderEmits,
	slots: selectHeaderSlots,
	setup(props, { slots, attrs, emit, expose }) {
		// 当前组件
		const target = templateRef<HTMLElement>('target', null)

		// 当前输入框
		const refInput = templateRef<HTMLElement | HTMLInputElement>('input', null)

		const isActive = ref(false)
		const { focused } = useFocus(refInput)
		const isHovered = useElementHover(target)

		const focus = () => {
			isActive.value = true
			focused.value = true
		}

		const blur = () => {
			isActive.value = false
			focused.value = false
			if (props.autoClearSearch) {
				searchVal.value = ''
				emit('search', searchVal.value)
			}
		}

		const searchVal = ref<string>('')

		const onSearchChange = (event: InputEvent) => {
			searchVal.value = (event.target as HTMLInputElement).value
			emit('search', searchVal.value)
		}

		const getPlaceholder = computed(() => {
			if (isShowValue.value) return ''
			if (props.placeholder) return props.placeholder
			return props.searchable ? '搜索或选择内容' : '请选择'
		})

		const getSelectItems = computed(() => {
			return props.modelValue
		})

		const getSelectNames = computed(() => {
			const names = getSelectItems.value.map(el => el.showName || el.name)
			return props.multiple ? names : names[0] || ''
		})

		const countSize = (size: string | number): number => {
			let width = 240
			switch (size) {
				case 'small':
					width = 185
					break
				case 'medium':
					width = 240
					break
				case 'large':
					width = 408
					break
				default:
					width = typeof size === 'number' ? size : 240
					break
			}
			return width
		}

		const getSize = computed(() => {
			return countSize(props.size)
		})

		const getTriggerSizeProp = computed(() => {
			return props.mode === 'tags' || props.size === 'auto'
				? { width: `${getSize.value}px` }
				: { width: `${getSize.value}px` }
		})

		const updateModelValue = (val: ItemType[]) => {
			emit('update:modelValue', val)
		}

		const single = templateRef<HTMLElement>('single', null)
		const isSingleTips = useIsShowTips(single)
		// watch(
		// 	() => props.modelValue,
		// 	newVal => {
		// 		if (isEqual(newVal, selectItems.value)) return
		// 		selectItems.value = newVal
		// 	}
		// )

		const isShowValue = computed(() => {
			return getSelectItems.value && getSelectItems.value.length > 0
		})

		const getIsShowClear = computed(() => {
			return isShowValue.value && props.clearable && isHovered.value && !props.disabled
		})

		const getHideNum = computed(() => {
			return props.maxTagCount ? getSelectNames.value.length - props.maxTagCount : 0
		})

		const handleClickTrigger = (event: Event) => {
			event.stopPropagation()
			if (props.disabled) {
				event.preventDefault()
				emit('click', event)
				return
			}
			isActive.value = true
			focused.value = true
			emit('click', event)
		}

		const handleClear = (event: MouseEvent) => {
			event.stopPropagation()
			updateModelValue([])
			emit('clear')
		}

		const handleTagClose = (event: MouseEvent, index: number) => {
			event.stopPropagation()
			const arr = [...getSelectItems.value]
			const item = arr.splice(index, 1)
			updateModelValue(arr)
			emit('remove', item)
		}

		// onClickOutside(
		// 	target,
		// 	event => {
		// 		blur()
		// 		emit('clickOutSide')
		// 	},
		// 	{ ignore: [props.ignore] }
		// )

		const selectRender = () => {
			// 获取按钮是Icon 合适对应得Select
			const classNames = ['m-select']
			const disabled = props.disabled
			if (disabled) classNames.push('disabled')

			const selectProps = {
				...attrs,
				disabled,
				mode: props.mode,
				onClick: handleClickTrigger,
				class: classNames
			}

			// 当前显示选中的内容
			const valueRender = (mode: 'multiple' | 'tags' | 'default') => {
				switch (mode) {
					case 'tags': {
						const tags = (getSelectNames.value as unknown as string[])
							.slice(0, props.maxTagCount > 0 ? props.maxTagCount : undefined)
							.map((name, index) => {
								return (
									<Tag
										maxTagWidth={props.maxTagWidth}
										maxTagTextLength={props.maxTagTextLength}
										content={name}
										onClose={e => {
											handleTagClose(e, index)
										}}
										onClick={e => {
											handleClickTrigger(e)
										}}
									></Tag>
								)
							})
						const tipsSlots = {
							content: () => {
								return (
									<div class="m-select-inner-multiple-tips">
										{(getSelectNames.value as unknown as string[])
											.slice(props.maxTagCount)
											.map(name => {
												return (
													<Tag closable={false} isShowTip={false}>
														{name}
													</Tag>
												)
											})}
									</div>
								)
							},
							default: () => {
								return (
									<span>
										<Tag closable={false} isShowTip={false}>
											+{getHideNum.value}
										</Tag>
									</span>
								)
							}
						}
						const endTag =
							getHideNum.value > 0 ? <Tips v-slots={tipsSlots} placement="top"></Tips> : null
						return (
							<span searchable={props.searchable} class="m-select-inner-tags">
								{tags}
								{endTag}
							</span>
						)
					}
					case 'multiple': {
						const tipsSlots = {
							content: () => {
								return (
									<div class="m-select-inner-multiple-tips">
										{(getSelectNames.value as unknown as string[]).map(name => {
											return (
												<Tag closable={false} isShowTip={false}>
													{name}
												</Tag>
											)
										})}
									</div>
								)
							},
							default: () => {
								return (
									<span searchable={props.searchable} class="m-select-inner-multiple">
										已选择
										<span class="m-select-inner-multiple-num">{getSelectItems.value.length}</span>项
									</span>
								)
							}
						}

						return <Tips v-slots={tipsSlots} placement="top"></Tips>
					}
					default:
						return (
							<Tips
								content={getSelectNames.value}
								trigger="manually"
								isOpen={isSingleTips.value}
								placement="top"
								theme="darkTransparent"
							>
								<span ref="single" searchable={props.searchable} class="m-select-inner-value">
									{getSelectNames.value}
								</span>
							</Tips>
						)
				}
			}

			// 输入框
			const input = (
				<div
					class="m-select-inner"
					disabled={props.disabled}
					style={getTriggerSizeProp.value}
					size={props.size}
					mode={props.mode}
					active={isActive.value}
				>
					{slots.prefix || props.prefix ? (
						<span class="m-select-inner-prefix">{slots.prefix?.() || props.prefix}</span>
					) : null}
					{isShowValue.value ? valueRender(props.multiple ? props.mode : 'default') : null}
					{props.searchable ? (
						<input
							ref="input"
							v-show={!isShowValue.value || props.multiple}
							value={searchVal.value || undefined}
							class="m-select-inner-input"
							active={isActive.value}
							placeholder={isShowValue.value ? '' : getPlaceholder.value}
							type="text"
							oninput={onSearchChange}
						/>
					) : (
						<span v-show={!isShowValue.value} class="m-select-placeholder">
							{getPlaceholder.value}
						</span>
					)}
				</div>
			)

			// 下拉图标和清空图标
			const icon = slots.suffixIcon?.() || (
				<span class={['m-select-icon', isActive.value ? 'm-select-rotate' : '']}>
					<IconMeriComponentArrowDown></IconMeriComponentArrowDown>
				</span>
			)

			const clearIcon = slots.clearIcon?.() || (
				<span
					class="m-select-icon"
					onClick={(e: MouseEvent) => {
						handleClear(e)
					}}
				>
					<IconMeriComponentCancel></IconMeriComponentCancel>
				</span>
			)

			// 弹窗的内容
			return (
				<div ref="target" {...selectProps}>
					{slots.trigger?.() || input}
					{getIsShowClear.value ? clearIcon : icon}
				</div>
			)
		}
		return { blur, focus, selectRender }
	},
	render() {
		return this.selectRender()
	}
})
export default SelectHeader
