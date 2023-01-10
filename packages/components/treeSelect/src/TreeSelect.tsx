import { defineComponent, h, ref, Ref, computed, watch, watchEffect, onUnmounted, onMounted, nextTick } from 'vue'
import { selectIds, TreeNode } from '../../tree/src/TreeProps'
import treeSelectProps from './TreeSelectProps'
// import '../styles/index.less'
import _, { isEqual } from 'lodash'
import Tree from '../../tree/src/Tree'
import Select from '../../select/src/Select'
import { Item } from '../../utils/types'
const TreeSelect = defineComponent({
	name: 'TreeSelect',
	props: treeSelectProps,
	emits: ['focus', 'blur', 'update:modelValue', 'change', 'currentNode'],
	setup(props, { slots, attrs, emit, expose }) {
		const tree = ref<InstanceType<typeof Tree>>()
		const select = ref<InstanceType<typeof Select>>()
		const source: Array<TreeNode> = _.clone(props.data)
		const classNames = ref(new Set(['m-tree-select']))
		//节点props字段处理
		const nodeLabel = props.props.label || 'name'
		const nodeChildren = props.props.children || 'children'
		//将树数据转成一维数组给select组件回显使用
		const options = computed(() => {
			return flatten(source, null)
		})

		let { clearable, searchable, hasConfirm, disabled, multiple, mode,menuSize,maxTagCount,placeholder,autoClearSearch,size,maxTagTextLength,prefix} = props
		hasConfirm = props.multiple?hasConfirm:false
		//树扁平化
		const flatten = (list: Array<TreeNode>, parent: TreeNode | null) => {
			let arr: Array<TreeNode> = []
			list.forEach(node => {
				//添加select回显文本
				node.parent = parent
				node.showName =props.showParentName?searchLabel(node):node[nodeLabel]
				arr.push(node)
				if (node[nodeChildren] && node[nodeChildren].length) {
					arr = [...arr, ...flatten(node[nodeChildren], node)]
				}
			})
			return arr
		}
		//获取select回显label
		const searchLabel = (node: TreeNode) => {
			let current = node
			let list = [node[nodeLabel]]
			if (!props.checkStrictly) {
				while (current.parent) {
					list.unshift(current.parent[nodeLabel])
					current = current.parent
				}
			}
			return list.join('/')
		}

		//下拉面板最大高度
		const maxScrollHeight = 308

		const search = ref('')
		const selectOpen = async() => {
			let top = await tree.value!.scrollToSelected()
			setTimeout(()=>{
				nextTick(()=>{
					select.value?.scrollToPos(top as number)
				})
			},100)
		}
		watch(()=>search.value,(newVal,oldVal)=>{
			if(props.searchable && !isEqual(newVal,oldVal) && newVal===''){
				selectOpen()
			}
		})
		const selectData: Ref<selectIds[]> = ref([])
		const treeData: Ref<selectIds[]> = ref([])

		const updateData = () => {
			selectData.value = treeData.value
			emit('update:modelValue', selectData.value)
		}
		const cancel = () => {
			treeData.value = selectData.value
		}
		watch(
			() => props.modelValue,
			newVal => {
				if (!isEqual(newVal, selectData.value)) {
					selectData.value = newVal
				}
			},
			{ immediate: true }
		)

		watch(
			selectData,
			() => {
				treeData.value = selectData.value
				if(!multiple){
					select.value?.blur()
				}
				nextTick(() => {
					updateData()
				})
			},
			{ immediate: true }
		)
		watch(
			treeData,
			() => {
				if (!hasConfirm) {
					updateData()
				}
			},
			{ immediate: true }
		)
		const treeChange = (ids: selectIds[], node: TreeNode) => {
			if (!props.multiple && node) {
				nextTick(() => {})
			}
		}
		const selectOptions = {
			disabled,
			multiple,
			mode,
			searchable,
			hasConfirm,
			clearable,
			onConfirm: updateData,
			onCancel: cancel,
			onFocus: selectOpen,
			onSearch: (word: string) => (search.value = word),
			menuSize,
			maxScrollHeight,
			maxTagCount,
			placeholder,
			autoClearSearch,
			size,
			maxTagTextLength,
			prefix
		}
		const checkAll = (status?: boolean) => {
			tree.value?.checkAll(status)
		}
		const renderFn = () => {

			return (
				<div class={Array.from(classNames.value)}>
					<Select
						ref="select"
						options={options.value as Item[]}
						v-model={selectData.value}
						isTree
						{...selectOptions}
						v-slots={slots}
					>
						<Tree
							ref="tree"
							class={props.menuSize==='auto'?'isMenuSize':''}
							{...props}
							v-model={treeData.value}
							filterValue={search.value}
							onChange={treeChange}
							isTreeSelect
							v-slots={slots}
						>
						</Tree>
					</Select>
				</div>
			)
		}
		return {
			renderFn,
			tree,
			select,
			checkAll
		}
	},
	render() {
		return this.renderFn()
	}
})
export default TreeSelect
