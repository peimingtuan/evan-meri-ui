import { PropType } from 'vue'
export default {
	sections: { type: Array, default: () => [] }, //锚点的选择
	target: {
		type: String
	}, // 滚动的对象，默认为 document
	duration: { type: Number, default: 50 }, // 触发时间
	bound: { type: Number, default: 12 }, // 元素开始触发 anchor 的偏移量
	showRail: { type: Boolean, default: true }, // 是否展示侧面的轨道
	showBackground: { type: Boolean, default: false }, // 是否展示背景
	offset: Boolean, // 元素固定位置
	position: {
		type: Object as PropType<position>,
		default: () => {
			return {
				top: '100px',
				left: '100px'
			}
		}
	}, // 定位位置
	zIndex: { type: Number, default: 100 }, // z-index
	width: { type: String, default: '100%' }, // 元素宽度
	size: {
		type: String as PropType<'small' | 'default'>,
		default: 'default'
	},
	ellipsisTheme: {
		type: String,
		default: ''
	},
	showOverflowTooltip: {
		type: Boolean,
		default: true
	}
}

export type position = { top?: string; left?: string; right?: string; bottom?: string }
