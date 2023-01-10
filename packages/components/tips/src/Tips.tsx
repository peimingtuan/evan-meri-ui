/*
 * @Description:
 * @Author: Devin
 * @Date: 2022-07-31 16:55:24
 * @LastEditTime: 2022-10-14 11:22:20
 * @LastEditors: Devin
 * @Reference:
 */
import { defineComponent,h } from 'vue'
import Popover from '../../popover'
export default defineComponent({
	name: 'Tips',
	props: {
	},
	setup(props, { attrs, slots }) {
		return () => (
			<Popover
				{...attrs}
				showArrow={false}
				trigger={attrs.trigger ? attrs.trigger : ('hover' as any)}
				class="m-popover__tips"
			>
				{{
					default: () => slots.default?.(),
					content: () => (
						<div class="m-tips">
							{slots.content?.() || attrs.content}
						</div>
					)
				}}
			</Popover>
		)
	}
})
