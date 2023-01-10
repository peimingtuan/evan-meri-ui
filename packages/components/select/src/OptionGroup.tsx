/*
 * @Descripttion: optionGroup组件
 * @Author: yuanxiongfeng
 * @Date: 2022-07-13 11:37:24
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-07-13 17:37:41
 */

import { h, computed, defineComponent, Fragment, PropType } from 'vue'

const OptionGroup = defineComponent({
	name: 'OptionGroup',
	props: {
		label: {
			type: String as PropType<string>,
			default: ''
		},
		divider: {
			type: Boolean as PropType<boolean>,
			default: true
		}
	},
	setup(props, { slots }) {
		return () => (
			<>
				<section class="m-select-menu-group">{slots.label?.() || props.label}</section>
				{slots.default?.()}
				{props.divider ? <section class="m-select-menu-divider"></section> : null}
			</>
		)
	}
})

export default OptionGroup
