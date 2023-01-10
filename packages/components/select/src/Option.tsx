// @ts-nocheck
/*
 * @Descripttion: option组件
 * @Author: yuanxiongfeng
 * @Date: 2022-07-11 18:03:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-08-09 14:34:45
 */

import { h, computed, defineComponent, inject, ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { selectKey } from './token'
import type { SelectContext } from './token'
import Checkbox from '../../checkbox/src/Checkbox'
import { State } from '../../checkbox/src/CheckboxProps'
import { optionProps, optionSlots, optionEmits } from './OptionProps'
import { templateRef } from '@vueuse/core'
import Tips from '../../popover/src/Popover'
import { useIsShowTips } from './useIsShowTips'

const Option = defineComponent({
	name: 'Option',
	props: optionProps,
	slots: optionSlots,
	emits: optionEmits,
	setup(props, { slots }) {
		const select = inject(selectKey) as SelectContext

		const content = templateRef<HTMLElement>('content', null)

		const isShowTip = useIsShowTips(content)

		const itemData = computed(() => {
			return {
				id: props.value,
				name: props.label || props.value.toString(),
				disabled: props.disabled,
				html: props.html
			}
		})

		const getIsSelect = computed((): boolean => {
			const id = props.value
			if (id === '') return false
			if (select.props.multiple || select.searchVal) return false
			return select.getSelectIdsArray.includes(id)
		})

		const getIsCheck = computed((): State => {
			const id = props.value
			return select.getSelectIdsArray.includes(id) ? State.checked : State.uncheck
		})

		const getIsShow = computed((): boolean => {
			if (props.notRequiredFilter) return true
			const index = select.getSearchOptions.findIndex(el => el.id === props.value)
			return index !== -1
		})

		const getHtml = computed((): string => {
			if (props.notRequiredFilter) return props.html || ''
			const item = select.getSearchOptions.find(el => el.id === props.value)
			return item?.html || ''
		})

		const handleClickOption = (event: MouseEvent): void => {
			// debugger
			event.stopPropagation()
			select.handleClickItem(event, itemData.value)
		}

		const handleCheckBoxClick = (event: MouseEvent): void => {
			event.stopPropagation()
			select.handleCheckBoxClick(event, itemData.value)
		}

		onBeforeMount(() => {
			if (!props.notRequiredFilter) {
				select.setCacheOptions(itemData.value)
			}
		})
		onBeforeUnmount(() => {
			if (!props.notRequiredFilter) {
				select.removeCacheOptions(itemData.value)
			}
		})

		return () => {
			const checkBox = (
				<Checkbox
					modelValue={getIsCheck.value}
					disabled={props.disabled}
					onClick={(value, event) => {
						handleCheckBoxClick(event)
					}}
				></Checkbox>
			)

			const slotsRender = (
				<span ref="content" class="m-select-menu-item-name">
					{slots.default?.()}
				</span>
			)

			const normalRender = (
				<span
					ref="content"
					v-html={getHtml.value || props.label || props.value}
					class="m-select-menu-item-name"
				>
					{props.label || props.value}
				</span>
			)

			const content = () => {
				return slots.default?.() || <span>{itemData.value.name}</span>
			}

			const tips = (
				<Tips v-slots={{ content }} trigger="manually" isOpen={isShowTip.value} placement="top" showArrow>
					{slots.default ? slotsRender : normalRender}
				</Tips>
			)

			const item = (
				<span
					v-show={getIsShow.value}
					class="m-select-menu-item"
					checked={getIsCheck.value}
					selected={getIsSelect.value}
					disabled={props.disabled || false}
					onClick={(event: MouseEvent) => {
						handleClickOption(event)
					}}
				>
					{select.props.multiple ? checkBox : null}
					{tips}
				</span>
			)
			return item
		}
	}
})

export default Option
