const scorllbarProps = {
	id: { type: [String, Number], default: () => Date.now() + Math.random() },
	noVer: { type: Boolean, default: false }, // 是否禁用垂直滚动条
	noHor: { type: Boolean, default: false }, // 是否禁用横向滚动条
	left: { type: Boolean, default: false }, // 垂直滚动条是否依附于容器左边
	top: { type: Boolean, default: false }, // 横向滚动条是否依附于容器顶部
	breadth: { type: Number, default: 6 }, // bar宽窄
	trackColor: { type: String, default: 'transparent' }, // 轨道背景色
	thumbColor: { type: String, default: 'var(--border-color)' }, // 滑块背景色
	autoHide: { type: Boolean, default: true }, // 是否自动隐藏滚动条
	minLength: { type: Number, default: 20 }, // 滑块最小长度
	width: { type: [Number, String], default: '100%' }, // ohyeah容器宽度
	height: { type: [Number, String], default: '100%' }, // ohyeah容器高度
	contentMaxHeight: { type: [Number, String], default: '' }, // 容器内容高度
	resizeObject: { type: Boolean, default: false }, // resize模式，默认scroll
	scrollClass: { type: String, default: '' }, // 设置滚动盒子的class
	scrollOffset: { type: Number, default: 1 } // 滚动到底部的误差值
}
export interface ScrollInfoType {
	height?: Number
	width?: Number
	clientHeight?: Number
	clientWidth?: Number
	offsetHeight?: Number
	offsetWidth?: Number
	scrollTop?: Number
	scrollLeft?: Number
	scrollHeight?: Number
	scrollWidth?: Number
}
export default scorllbarProps
