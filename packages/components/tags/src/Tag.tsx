/*
 * @Author: Devin
 * @Date: 2022-05-10 13:51:56
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-01 11:36:25
 */
import { defineComponent, h, computed, ref, CSSProperties } from 'vue'
import { commonProps } from './props'
import type { ExtractPropTypes } from 'vue'
import { resolveWrappedSlot } from './resolve-slot'
import { getbgColorVar, typebBgColor, typeColor, typeIcon } from './tools'
import * as components from 'meri-icon'
import { IconMeriComponentTagProcessing } from 'meri-icon'
const tagProps = {
	...commonProps
}

export type TagPropsType = ExtractPropTypes<typeof tagProps>
export default defineComponent({
	name: 'Tag',
	props: tagProps,
	setup(props) {
		const { type, size, icon, color, bgColor, dot } = props
		let padding = ref(type ? '0 var(--padding-3)' : size === 'large' ? '0 var(--padding-2)' : '0 var(--padding-1)')
		const textColor = ref(color || typeColor[type])
		// 计算css变量
		const cssVarsRef = computed(() => {
			return {
				'--m-tag-padding': dot ? '0' : padding.value,
				'--m-tag-color': dot ? '#2B2F36' : textColor.value,
				'--m-tag-bg-color': dot
					? 'initial'
					: bgColor || (type ? typebBgColor[type] : getbgColorVar(textColor.value).color), // 自动计算背景色
				'--m-tag-border-radius': type ? '12px' : 'var(--samll-radius)'
			}
		})
		// 状态标签对应的tag样式
		const typeStyle = ref({
			icon: icon || typeIcon[type],
			class: [`m-tag-type`, `m-tag-type-${type}`]
		})
		const TypeStyleIcon = components[typeStyle.value.icon]

		// 当存在状态标签时，size为large
		const sizeClass = type ? typeStyle.value.class : [`m-tag-${size}`]
		// tag组件的class
		const Classes = ref<string[]>(['m-tag', ...sizeClass, dot ? 'm-tag-dot' : ''])
		return { cssVars: cssVarsRef, Classes, typeStyle, textColor, TypeStyleIcon }
	},
	render() {
		const { Classes, cssVars, typeStyle, type, icon, dot, textColor, TypeStyleIcon } = this

		return (
			<div class={Classes} style={cssVars as CSSProperties}>
				{dot ? (
					<div class="m-tag__dot" style={{ '--m-tag-dot-bg-color': textColor } as CSSProperties}></div>
				) : type || icon || this.$slots.icon ? (
						<div class="m-tag__icon">
							 {this.$slots.icon?.({color:this.textColor}) ||  <TypeStyleIcon size={14} color={textColor} />}
						</div>
				) : null}
				<span class={`m-tag__content`} ref="contentRef">
					{this.$slots.default?.()}
				</span>
				{resolveWrappedSlot(
					this.$slots.close,
					children => children && <span class="m-tag__close">{children}</span>
				)}
			</div>
		)
	}
})
