/*
 * @FilePath: TimePickerProps.ts
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-13 11:25:41
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { PropType } from 'vue'
import { Disabled, Flow, TimeType } from '../../utils/types'

// 下拉框的属性
export const TimePickerTriggerProps = {
	range: {
		type: Boolean as PropType<boolean>,//是否开启时间段
		default: false
	},
	placeholder: {
		type: String as PropType<string>,
		default: '请选择时间'
	},
	hideClear: {
		type: Boolean as PropType<boolean>,//是否隐藏删除icon
		default: false
	},
	time: {
		type: String as PropType<string>,
		default: ''
	},
	format: {
		type: String as unknown as PropType<TimeType>,
		default: 'hms'
	},
	modelValue:{
		type: String as PropType<string>,
		default: ''
	},
	disabled: {
		type: Boolean as PropType<Disabled>,
		default: false
	},
	currentTime:{
		type: Boolean as PropType<boolean>,
		default: false
	},
	scopeTime:{
		type: String as PropType<string>,
		default: ''
	},
	errorText:{
		type: String as PropType<string>,//是否隐藏删除icon
		default: ''
	},
	stepH:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepS:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepM:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},// 下拉框弹出方向
	placement: {
		type: String as PropType<Flow | undefined>,
		default: undefined
	},
} as const

export const TimePickerProps = {
	placeholder: {
		type: String as PropType<string>,
		default: '请选择时间'
	},
	time: {
		type: String as PropType<string>,
		default: ''
	},
	format: {
		type: String as unknown as PropType<TimeType>,
		default: 'hms'
	},
	range: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	modelValue:{
		type: String as PropType<string>,
		default: ''
	},
	// // 禁用
	disabled: {
		type: Boolean as PropType<Disabled>,
		default: false
	},
	currentTime:{
		type: Boolean as PropType<boolean>,
		default: false
	},
	scopeTime:{
		type: String as PropType<string>,
		default: ''
	},
	hideClear: {
		type: Boolean as PropType<boolean>,//是否隐藏删除icon
		default: false
	},
	errorText:{
		type: String as PropType<string>,//是否隐藏删除icon
		default: ''
	},
	stepH:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepS:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepM:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	}
} as const
export const TimePickerPanelProps = {
	time: {
		type: String as PropType<string>,
		default: ''
	},
	format: {
		type: String as unknown as PropType<TimeType>,
		default: 'hms'
	},
	range: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	modelValue:{
		type: String as PropType<string>,
		default: ''
	},
	disabled: {
		type: Boolean as PropType<Disabled>,
		default: false
	},
	currentTime:{
		type: Boolean as PropType<boolean>,
		default: false
	},
	scopeTime:{
		type: String as PropType<string>,
		default: ''
	},
	stepH:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepS:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	},
	stepM:{
		type: Number as PropType<number>,//是否隐藏删除icon
		default: 1
	}
} as const
export default TimePickerProps
