// @ts-nocheck
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { templateRef } from '@vueuse/core'

import { tagProps, tagEmits, tagSlots } from './TagProps'
// @ts-ignore
import { IconMeriComponentClose } from 'meri-icon'
import { useIsShowTips } from '../../select/src/useIsShowTips'
import 'meri-icon/lib/style.css'
import Tips from '../../popover/src/Popover'

const Tag = defineComponent({
	components: {},
	name: 'Tag',
	props: tagProps,
	emits: tagEmits,
	slots: tagSlots,
	setup(props, { slots, attrs, emit }) {
		// 当前组件
		const content = templateRef<HTMLElement>('content', null)
		// 当前图标
		const handleClick = (event: MouseEvent): void => {
			event.stopPropagation()
			emit('click', event)
		}
		const handleClose = (event: MouseEvent): void => {
			event.stopPropagation()
			emit('close', event)
		}

		const getIsSetWidth = computed(() => {
			return props.maxTagWidth !== 0
		})

		const isEllipsis = useIsShowTips(content)

		const isMouseEnter = useIsShowTips(content, false)

		const getIsShowTip = computed((): boolean => {
			if (props.isShowTip === false) return false
			if (props.maxTagWidth) {
				return isEllipsis.value
			}
			if (props.maxTagTextLength) {
				return props.content.length > props.maxTagTextLength ? isMouseEnter.value : false
			}
			return false
		})

		const getTagText = computed(() => {
			const text = props.content
			if (props.maxTagWidth) return text
			if (props.maxTagTextLength && text.length > props.maxTagTextLength) {
				return `${text.slice(0, props.maxTagTextLength)}...`
			}
			return text
		})

		const getTagProp = computed(() => {
			if (!getIsSetWidth.value) return {}
			return {
				width: props.maxTagWidth < 55 ? '55px' : `${props.maxTagWidth}px`
			}
		})

		return () => {
			const clearIcon = (
				<span class="m-select-tag-icon" onClick={handleClose}>
					<IconMeriComponentClose size={14}></IconMeriComponentClose>
				</span>
			)

			const content = () => {
				return slots.default?.() || <span>{props.content}</span>
			}

			const tag = (
				<span class="m-select-tag" style={getTagProp.value} onClick={handleClick}>
					<span ref="content" class="m-select-tag-content" is-set-width={getIsSetWidth.value}>
						{slots.default?.() || getTagText.value}
					</span>
					{props.closable ? clearIcon : null}
				</span>
			)

			const renderTag = () => {
				return tag
			}

			const tipsSlots = {
				content
			}
			// 渲染内容
			return (
				<Tips v-slots={tipsSlots} trigger="manually" isOpen={getIsShowTip.value} placement="top" showArrow>
					{tag}
				</Tips>
			)
		}
	}
})
export default Tag
