/*
 * @Author: Devin
 * @Date: 2022-07-05 16:13:37
 * @LastEditors: Devin
 * @LastEditTime: 2022-09-05 16:51:49
 */
import { ExtractPropTypes, PropType } from 'vue'
import { usePaginationValidator } from './pagination-tool'
const { pagerCountValidator, layoutValidator } = usePaginationValidator()
const props = {
	total: { type: [Number, String] as PropType<string | number>, default: 0 }, // 总数
	pageNum: { type: [Number, String], default: 1 }, // 当前页数
	pageSize: { type: [Number, String], default: () => 20 }, // 每页显示条数
	sizesList: { type: Array, default: () => [10, 20, 30, 50, 100] }, // 每页显示条数的选项设置
	pagerCount: {
		type: [Number, String],
		default: 7,
		validator: pagerCountValidator
	}, // 最大页码数，须为大于等于 5 且小于等于 21 的奇数
	disabled: { type: Boolean, default: false }, // 是否禁用
	layout: {
		type: String,
		default: 'total,prev,pager,next',
		validator: layoutValidator
	}, // 自定义组件布局 option:totalPages,total,prev,pager,next,jumper,sizes
	prevText: { type: String, default: '' }, // 替代图标显示的上一页文案
	nextText: { type: String, default: '' }, // 替代图标显示的下一页文案
	totalTmpString: { type: String, default: '共 {total} 条' }, // 替代总数文案模板
	pagesTmpString: { type: String, default: '共 {totalPages} 页' }, // 替代总页数文案模板
	jumperTmpString: { type: String, default: '跳至{jumper}页' }, // 替代输入跳转文案模板
	sizesTmpString: { type: String, default: '{value}条 / 页' }, // 替代每页显示条数选项文案模板
	background: { type: Boolean, default: false }, // 是否添加背景色
	simple: { type: Boolean, default: false }, // 是否渲染成简洁分页
	hideOnSinglePage: { type: Boolean, default: false }, // 只有一页时隐藏
	repeatClick: { type: Boolean, default: false } // 是否能重复点击
}
export type PaginationType = ExtractPropTypes<typeof props>
export default props
