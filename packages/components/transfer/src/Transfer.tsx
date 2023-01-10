import { defineComponent, h, ref, PropType, computed, reactive, watch, nextTick } from 'vue';
import { TreeNode, selectIds } from "./TransferProps"
import TransferProps from "./TransferProps"
import { IconMeriComponentCancel } from 'meri-icon'

const Transfer = defineComponent({
    name: "Transfer",
    props: TransferProps,
    emits: ['change'],
    setup(props, { slots, attrs, emit }) {
        const treeProps = {
            ...props,
            multiple: true,
            checkStrictly: !props.linkage
        }

        const data = reactive({ selectedData: [] as Array<TreeNode>, searchValue: '' as string, isSearchList: true as boolean })

        /*
         *   mt-多选树形结构
         *   mn-多选一维结构
         */
        const flat = computed(() => {
            const tree = props.data.some(item => item.children && item.children.length); // 判断数组是一维还是多维 返回true表示多维
            if (tree) return 'mt';
            return 'mn';
        })

        //将树扁平化转为一维数组
        const flatten = (list: Array<TreeNode>, lv: number, parent: TreeNode | null) => {
            let arr: Array<TreeNode> = []
            list.forEach((node) => {
                arr.push(node)
                if (node.children && node.children.length) {
                    arr = [...arr, ...flatten(node.children, lv + 1, node)]
                }
            })
            return arr
        }
        const nodeList = computed(() => flatten(props.data, 0, null)).value;

        /** 
         * 左侧tree勾选改变
         * @param selected 全部选中的数据
         * @param row 当前选中的数据
         */
        const treeChange = (selected: any, row: TreeNode) => {
            if(!row) return;
            if (props.linkage) {
                // 联动
                data.selectedData = setSelectedData([], props.data)
            } else {
                // 不联动
                // lastStage为true表示只能选择末级，处理方式与不联动一样
                
                if (row?.checked === 'checked') {
                    data.selectedData.push({ id: row.id, name: `${getParentName(row.parent)}${row.name}` });
                } else {
                    data.selectedData = data.selectedData.filter(d => d.id !== row?.id);
                }
            }
            emit("change", row, data.selectedData)
        }


        // 清空选中的数据
        const handleEmpty = () => {
            if (!data.selectedData.length) return;

            if (flat.value === 'mt') {
                setMulDataUncheck(props.data)
            } else {
                setMulDataUnSelected(props.data);
            }

            emit("change", data.selectedData, [])
            data.selectedData = []
        }

        // 设置树形结构全部取消选中
        const setMulDataUncheck = (data: Array<TreeNode>) => {
            data.forEach(d => {
                d.checked = 'uncheck';
                if (d.children && d.children.length) {
                    setMulDataUncheck(d.children);
                }
                return d;
            });
        }

        // 设置一维结构全部取消选中
        const setMulDataUnSelected = (data: Array<TreeNode>) => {
            data.forEach(d => {
                d.checked = 'uncheck';
                return d;
            });
        }

        /**
         * 移除选中项
         * @param i 索引
         * @param row 当前项
         */
        const removeItem = (i: number, row: TreeNode) => {
            data.selectedData.splice(i, 1);
            removeChecked(row, props.data);
            emit("change", row, data.selectedData);
        }

        /**
         * 取消树形结构选中的项
         * @param id 需要取消选中的id
         * @param mulData 数据
         * @return {*}
         */
        const removeChecked = (row: TreeNode, mulData: Array<TreeNode>) => {
            const { id } = row
            if (flat.value === 'mt') {
                if (props.linkage) {
                    /* 上下级联动 */
                    return linkageSetUpperAndLowerStatus(mulData, id, 'uncheck');
                }
                // 上下级不联动
                mulData.forEach(d => {
                    if (d.id === id) {
                        d.checked = 'uncheck';
                    } else {
                        if (d.children && d.children.length) removeChecked(row, d.children);
                    }
                    return d;
                });
            } else {
                mulData.forEach(d => {
                    if (d.id === id) {
                        d.checked = 'uncheck';
                    }
                    return d;
                });
            }
        }

        /**
         * 改变tree的checked状态
         * @param data
         * @return {string}
         * @constructor
         */
        const ChangeStatus = (data: Array<TreeNode>) => {
            let checked = '';
            // 去除所有disabled状态的数据
            const dataArr = data.filter(d => !d.disabled);
            if (dataArr.every(d => d.checked === 'checked')) {
                checked = 'checked';
            } else if (dataArr.every(d => d.checked === 'uncheck')) {
                checked = 'uncheck';
            } else {
                checked = 'notNull';
            }
            return checked;
        };

        // 改变父级的勾选状态
        const changeParentStatus = (parentData: TreeNode) => {
            parentData.checked = ChangeStatus(parentData.children || [])
            if (parentData.parent && parentData.children) {
                changeParentStatus(parentData.parent)
            }
        }

        // 需要设置的子级状态
        const changeChildrenStatus = (childrData: TreeNode) => {
            if (childrData.children && childrData.children.length) {
                childrData.children.forEach(item => {
                    item.checked = 'uncheck';
                    changeChildrenStatus(item)
                })
            }
            else {
                changeParentStatus(childrData.parent || [])
            }
        }

        /**
         * 联动-设置上下级状态
         * @param mulData 需要遍历的数据
         * @param id 当前被移除选中的id
         * @param cStatus 需要设置的子级状态
         */
        const linkageSetUpperAndLowerStatus = (mulData: Array<TreeNode>, id: selectIds | undefined, cStatus?: string) => {
            let nodeData = {} as TreeNode
            // 改变删除项的勾选状态
            nodeList.forEach(nodeItem => {
                if (id === nodeItem.id) {
                    nodeItem.checked = cStatus;
                    nodeData = nodeItem;
                }
            })

            // 当返回半选状态时
            if (props.notNull) {
                changeChildrenStatus(nodeData)
            } else {
                // 改变父级勾选状态
                changeParentStatus(nodeData.parent || [])
            }

            data.selectedData = setSelectedData([], mulData)
        }

        /** 
         * 获取父级的名称
         * @param parent 父级 
         */
        const getParentName = (parent?: TreeNode | null): string => {
            if (parent) {
                return `${getParentName(parent.parent)}${parent.name}/`;
            }
            return '';
        }

        /**
         * 联动-设置选中的数据
         * @param data 接收的结果
         * @param tree 遍历列表
         */
        const setSelectedData = (data: Array<TreeNode>, tree: Array<TreeNode>): any => {
            tree.forEach(d => {

                if (!d.disabled) {
                    if (props.notNull && props.returnParentNode) {
                        if (d.checked === 'checked' || d.checked === 'notNull') {
                            data.push({
                                id: d.id,
                                name: `${getParentName(d.parent)}${d.name}`
                            });
                        }
                    } else {
                        if (!d.children) {
                            if (d.checked === 'checked') {
                                data.push({
                                    id: d.id,
                                    name: `${getParentName(d.parent)}${d.name}`
                                });
                            }
                        }
                    }
                }
                if (d.children && d.children.length) setSelectedData(data, d.children);
            });
            return data;
        }

        const changeSearch = () => {
            if (data.searchValue.trim() !== '') {
                data.isSearchList = nodeList.some(item => (item.name + '')?.includes(data.searchValue))
            } else {
                data.isSearchList = true
            }
        }

        return () => {
            const clearNames = ['m-transfer-right-clear', !data.selectedData.length ? 'disabled' : '', 'm-transfer-right-clear-active'];

            const transferSelectedList = data.selectedData.map((item, index) => {
                const { name, id } = item;
                return <li class={'m-transfer-selected-item'}>
                    <span>{name}</span>
                    <IconMeriComponentCancel class={'m-transfer-selected-item-clear'} onClick={() => removeItem(index, item)} hoverColor={'#246fe5'}></IconMeriComponentCancel>
                </li>
            })

            // 左侧选择
            const transferLeft = <div class={['m-transfer-main-child', 'm-transfer-left']}>
                <section class={'m-transfer-left-input'}>
                    <m-input prefix-icon="IconMeriActionSearch" placeholder={props.placeholder} clearable={true} v-model={data.searchValue} onInput={changeSearch} width="200"></m-input>
                </section>
                <section class={['m-transfer-left-content']} style="display: flex;     align-items: center;">

                    {data.isSearchList ? <m-tree {...treeProps} filterNodeMethod={data.searchValue} onChange={treeChange.bind(this)}></m-tree>
                        : <m-illustration title="没有找到任何内容" type="noSearchResult" size="small"></m-illustration>}

                    {/* <m-illustration title="没有找到任何内容" type="noSearchResult" size="small"></m-illustration> */}
                </section>
            </div>

            // 右侧头部区域
            const transferRightHead = <section class={['m-transfer-right-header']}>
                <article class={'m-transfer-right-header-text'}>
                    已选
                    <span class={'m-transfer-right-header-text-number'}>{data.selectedData.length}</span>
                </article>
                <article class={clearNames} onClick={() => handleEmpty()}>清空</article>

            </section>

            // 右侧选中内容
            const transferSelectedListBody = <div class={'m-transfer-selected-body'}>
                <ul class={'m-transfer-selected-list'}>
                    {transferSelectedList}
                </ul>
            </div>

            // 右侧展示
            const transferRight = <div class={['m-transfer-main-child', 'm-transfer-right']}>
                {transferRightHead}
                {transferSelectedListBody}
            </div>

            return (
                <div class={'m-transfer'}>
                    <div class={'m-transfer-main'}>
                        {transferLeft}
                        {transferRight}
                    </div>
                </div>
            )
        }
    }
})
export default Transfer;