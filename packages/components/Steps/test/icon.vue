<template>
	<div class='container'>
		<m-steps
			style='margin:0 auto'
			v-model='model1'
			:readonly='readonlyValue'
			:style='{marginTop:layoutValue=="horizontal"?"100px":"50px"}'
			:source='activities'
			:size='sizeValue'
			:layout='layoutValue'
			:lineType='lineTypeValue'
			:category='"icon"'
			:space='spaceValue'
			@change='onCurChanged'
		></m-steps>
		<div class='btn'>
			<b>配置项</b>
			<p>
				<b>size：</b>
				<m-dropdown :options='sizeList' :text='sizeValue' type='button' trigger='click' @change='change' placement='bottom-end'></m-dropdown>
			</p>
			<p>
				<b>space：</b>
				<m-dropdown :options='spaceList' :text='spaceValue' type='button' trigger='click' @change='change3' placement='bottom-end'></m-dropdown>
			</p>
			<p>
				<b>layout：</b>
				<m-dropdown :options='layoutList' :text='layoutValue' type='button' trigger='click' @change='change0' placement='bottom-end'></m-dropdown>
			</p>
			<p>
				<b>lineType：</b>
				<m-dropdown :options='lineTypeList' :text='lineTypeValue' type='button' trigger='click' @change='change1' placement='bottom-end'></m-dropdown>
			</p>
			<p>
				<b>readonly：</b>
				<m-dropdown :options='readonlyList' :text='readonlyValue' type='button' trigger='click' @change='change5' placement='bottom-end'></m-dropdown>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
	setup() {
		const activities = ref([
			{
				id: '1',
				tips: '提示文字提示文字提示文字提示文字提示文字提示文字',
				title: '第一次验收第一次验收第一次验收',
				icon: 'IconMeriActionLock',
				color: '#AD82F7'
			},
			{
				id: '2',
				tips: '提示文字提示文字提示文字提示文字提示文字提示文字',
				title: '第二次验收',
				icon: 'IconMeriActionHelp',
				color: '#F1E05A'
			},
			{
				id: '3',
				tips: '提示文字提示文字提示文字提示文字提示文字提示文字',
				title: '第三次验收',
				icon: 'IconMeriActionCollect',
				color: '#1B2129'
			}
		])
		const model1 = ref('1')
		const spaceList = [
			{
				label: '20',
				key: '20'
			},
			{
				label: '30',
				key: '30'
			},
			{
				label: '40',
				key: '40'
			}
		]
		const sizeList = [
			{
				label: 'medium',
				key: 'medium'
			},
			{
				label: 'small',
				key: 'small'
			}
		]
		const layoutList = [
			{
				label: 'horizontal',
				key: 'horizontal'
			},
			{
				label: 'vertical',
				key: 'vertical'
			}
		]
		const lineTypeList = [
			{
				label: 'solid',
				key: 'solid'
			},
			{
				label: 'dashed',
				key: 'dashed'
			}
		]
		const defaultColorList = [
			{
				label: 'true',
				key: 'true'
			},
			{
				label: 'false',
				key: 'false'
			}
		]
		const readonlyList = [
			{
				label: 'true',
				key: 'true'
			},
			{
				label: 'false',
				key: 'false'
			}
		]
		const sizeOptions = ref(sizeList)
		const layoutOptions = ref(layoutList)
		const spaceOptions = ref(spaceList)
		const lineTypeOptions = ref(lineTypeList)
		const defaultColorOptions = ref(defaultColorList)
		const readonlyOptions = ref(readonlyList)

		let sizeValue = ref(sizeOptions.value[0].label)
		let layoutValue = ref(layoutOptions.value[0].label)
		let spaceValue = ref(spaceOptions.value[0].label)
		let lineTypeValue = ref(lineTypeOptions.value[0].label)
		let defaultColorValue = ref(defaultColorOptions.value[0].label)
		let readonlyValue = ref(readonlyOptions.value[0].label)

		const change = (data: string, obj: any) => {
			sizeValue.value = obj.label
		}
		const change0 = (data: string, obj: any) => {
			layoutValue.value = obj.label
		}
		const change1 = (data: string, obj: any) => {
			lineTypeValue.value = obj.label
		}
		const change3 = (data: string, obj: any) => {
			spaceValue.value = obj.label
		}
		const change4 = (data: string, obj: any) => {
			defaultColorValue.value = obj.label
		}
		const change5 = (data: string, obj: any) => {
			readonlyValue.value = obj.label
		}
		const onCurChanged = (cur: any, e: any) => {
			console.log(cur, e)
		}
		return {
			activities,
			model1,
			sizeList,
			spaceList,
			layoutList,
			lineTypeList,
			defaultColorList,
			readonlyList,
			sizeValue,
			layoutValue,
			spaceValue,
			lineTypeValue,
			defaultColorValue,
			readonlyValue,
			change,
			change0,
			change1,
			change3,
			change4,
			change5,
			onCurChanged
		}
	}
})
</script>
<style lang="less" scoped>
.container {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.btn {
		justify-content: flex-end;
		border-left: 1px solid #c4c9cf;
		padding-left: 24px;
		width: 210px;
	}
}
</style>