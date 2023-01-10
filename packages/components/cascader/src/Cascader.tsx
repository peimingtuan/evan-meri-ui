// @ts-nocheck
/*
 * @Description: 级联选择器
 */
import {defineComponent, h, PropType, ref, reactive, Teleport, Transition, computed, watch, nextTick} from 'vue';
import {CascaderProps, Trigger} from './CascaderProps';
import {usePopupStyle} from '../../select/src/usePopupStyle';
import {templateRef, onClickOutside, useTemplateRefsList, useVirtualList, useDebounceFn} from '@vueuse/core'
import {
    IconMeriComponentArrowDown,
    IconMeriComponentChevronRight,
    IconMeriComponentClose,
    IconMeriComponentCancel
} from 'meri-icon';
import "meri-icon/lib/style.css";
import MCheckbox from "../../checkbox";
import MPopover from "../../popover";
import MButton from "../../button";
import _ from 'lodash';

const Cascader: any = defineComponent({
    name: "Cascader",
    props: CascaderProps,
    emits: ['change', 'expandChange', 'clear', 'removeTag', 'visibleChange', 'focus', 'blur'],
    components: {
        IconMeriComponentArrowDown,
        IconMeriComponentChevronRight,
        IconMeriComponentCancel,
        MCheckbox,
        MPopover,
        MButton,
    },
    setup(props, {slots, attrs, emit}) {
        // 绑定数据的平铺结构
        let optionFlatList: any = ref([]);
        // 帮助方法 - 处理数据
        const helpGetTreeData = (treeData: any[], parent: any) => {
            treeData.forEach((item: any) => {
                // 父级节点
                item.parent = parent;
                // 多选是否选中
                props.multiple && (item.checked = 'uncheck');
                // 获取平铺结构数据
                optionFlatList.value.push(item);
                if (Array.isArray(item.children)) {
                    helpGetTreeData(item.children, item);
                }
            })
        }
        helpGetTreeData(props.options, null);

        // 选中的数据
        let inputValue = ref('');
        // 当前选中的数据Id
        let selectId = ref('');
        // 获取当前选中节点的所有父节点id：用于显示选中态
        let selectParentIds: any = ref([]);
        // 初始化数据
        let itemList: any = reactive([props.options]);
        // 多选选中项
        let multipleSelected: any = ref([]);
        // 是否Hover选中的input框
        let isHoverInput = ref(false);
        // 搜索结果列表
        let searchResult = ref([]);
        // 输入的搜索值
        let searchInputValue = ref('');

        /*计算属性 -- start*/
        // 提示信息
        let placeholderText = computed(() => {
            return !(multipleSelected.value.length || inputValue.value.length) ? props.placeholder : '';
        })
        // 是否显示clear按钮
        let isShowClearIcon = computed(() => {
            // 有选中、hover选中框
            const isHasSelect = props.multiple ? !!multipleSelected.value.length : !!inputValue.value.length;
            return isHasSelect && isHoverInput.value && props.clearable;
        })
        /*计算属性 - end*/

        // 帮助方法 - 拼接父级路径
        const helpGetFullPath = (data: any, result: any[]) => {
            result.push({id: data.id, name: data.name});
            if (data.parent) {
                helpGetFullPath(data.parent, result);
            }
        }

        // 帮助方法 - 获取父节点所有子集
        const helpGetChildrenNodes = (data: any, result: any[]) => {
            if (Array.isArray(data.children) && data.children.length) {
                result.push(data.children);
            }
            if (data.parent) {
                helpGetChildrenNodes(data.parent, result);
            }
        }

        // 帮助方法 - 多选tags删除、新增
        const helpSetTagsData = (item: any) => {
            const index = multipleSelected.value.findIndex((o: any) => o.id === item.id);
            if (item.checked === 'checked') {
                let fullPath: [] = [];
                helpGetFullPath(item, fullPath);
                let fullPathText = fullPath.map((o: any) => o.name).reverse().join(' / ');
                index < 0 && (multipleSelected.value.push({
                    id: item.id,
                    name: props.showAllLevels ? fullPathText : item.name
                }));
            } else {
                multipleSelected.value.splice(index, 1);
            }
        }

        // 帮助方法 - 更改所有子级的选中状态
        const helpSetChildrenChecked = (treeData: any, value: any) => {
            if (Array.isArray(treeData) && treeData.length) {
                treeData.forEach(o => {
                    o.checked = value;
                    helpSetTagsData(o);
                    if (Array.isArray(o.children)) {
                        helpSetChildrenChecked(o.children, value);
                    }
                })
            }
        }

        // 帮助方法 - 更改所有父级的选中状态
        const helpSetParentChecked = (treeData: any[], parent: any) => {
            // 取消选中(子集全部取消选中)、半选（子集有选中但未全选）、选中（子集全部选中）
            if (Array.isArray(treeData) && treeData.length) {
                if (treeData.every(child => child.checked === 'uncheck')) {
                    parent.checked = 'uncheck';
                } else if (treeData.every(child => child.checked === 'checked')) {
                    parent.checked = 'checked';
                } else {
                    parent.checked = 'notNull';
                }
                parent.parent && (helpSetParentChecked(parent.parent.children, parent.parent));
            }
        }

        // 事件 - 点击显示子级
        const handleClick = (item: any, level: number, event: Event) => {
            if (Array.isArray(itemList)) {
                let fullpath: any = [];
                helpGetFullPath(item, fullpath);
                level > -1 && itemList.splice(level + 1);
                // 1. 展开子节点
                if (level > -1 && Array.isArray(item.children) && item.children.length) {
                    itemList.push(item.children)
                    // 事件 - 展开子节点
                    emit('expandChange', item, event);
                } else {
                    //2. 叶子节点，带着父级路径回显到input框中
                    if (!props.multiple) {
                        props.showAllLevels ? (inputValue.value = fullpath.map((o: any) => o.name).reverse().join(' / ')) : (inputValue.value = item.name);
                        // 关闭下拉框
                        selfOpen.value = false;
                        // 单选 - 触发选中事件
                        emit('change', item, event);
                    }
                    selectId.value = item.id;
                }
                // 获取当前选中项所有父级id列表
                selectParentIds.value = fullpath.map((o: any) => o.id);
            }
        }

        // 事件 - hover某一行
        const handleRowMuouseenter = (item: any, level: number, event: Event) => {
            // hover显示子集
            if (props.trigger === Trigger.HOVER) {
                // 判断是否已在选中列表中
                const index = selectParentIds.value.findIndex((o: any) => o.id === item.id);
                if (index < 0 || !selectParentIds.value.length) {
                    // 1. 展开子节点
                    if (Array.isArray(item.children) && item.children.length) {
                        itemList.splice(level + 1)
                        itemList.push(item.children)
                        // 事件 - 展开子节点
                        emit('expandChange', item, event);
                    }
                    let fullpath: any = [];
                    helpGetFullPath(item, fullpath);
                    // 获取当前选中项所有父级id列表
                    selectParentIds.value = fullpath.map((o: any) => o.id);
                }
            }
        }

        // 事件 - 多选框选中变更
        const handleCheckChange = (item: any, event: Event) => {
            // 1. 非末级选中，更改所有子集的选中状态
            setTimeout(() => {
                if (Array.isArray(item.children) && item.children.length) {
                    helpSetChildrenChecked(item.children, item.checked);
                } else {
                    // 2. 末级选中，更改父级选中状态
                    item.parent && (helpSetParentChecked(item.parent.children, item.parent));
                    // 数据回显到input框中：1. 选中；2. 取消选中
                    helpSetTagsData(item);
                }
                // 触发多选选中事件
                emit('change', multipleSelected, event);
            })
        }

        // 事件 - 多选删除
        const handleCheckClose = (item: any, event: Event) => {
            const index = multipleSelected.value.findIndex((o: any) => o.id === item.id);
            multipleSelected.value.splice(index, 1);
            // 更改下拉框绑定数据的选中结果
            const option: any = optionFlatList.value.find((o: any) => o.id === item.id);
            if (option) {
                option.checked = 'uncheck';
                // 1. 取消所有子级的选中状态
                helpSetChildrenChecked(option.children, 'uncheck');
                // 2. 更新所有父级的选中状态
                option.parent && (helpSetParentChecked(option.parent.children, option.parent));
            }
            // 触发tag删除事件
            emit('removeTag', item, multipleSelected, event);
        }

        // 事件 - 清空选中项
        const handleClear = (event: Event) => {
            // 阻止冒泡
            event.stopPropagation();
            // 1. 多选
            if (props.multiple) {
                multipleSelected.value = [];
                optionFlatList.value.forEach((o: any) => {
                    o.checked = 'uncheck';
                })
            } else {
                // 1. 单选
                inputValue.value = '';
            }
            // 清空当前选中样式
            selectParentIds.value = [];
            // 触发清空事件
            emit('clear', event);
        }

        // 事件 - input框鼠标移入事件
        const handleInputMuouseenter = (event: Event) => {
            isHoverInput.value = true;
        }

        // 事件 - input框鼠标移出事件
        const handleInputMouseleave = (event: Event) => {
            isHoverInput.value = false;
        }

        // 当前组件
        const target = templateRef<HTMLElement>('target', null);
        const refTrigger = templateRef<HTMLElement>('trigger', null)
        // 当前显示的弹窗
        const refPopup = templateRef<HTMLElement>('popup', null)

        // 私有的展开收齐状态
        const selfOpen = ref(false)

        watch(selfOpen, () => {
            if (selfOpen.value) {
                refTrigger.value.focus()
                emit('focus')
            } else {
                refTrigger.value.blur();
                // 清空搜索
                searchInputValue.value = '';
                searchResult.value = [];
                emit('blur')
            }
        })

        // 事件 - 选择框获取焦点
        const focus = () => {
            selfOpen.value = true
        }
        // 事件 - 选择框失去焦点
        const blur = () => {
            selfOpen.value = false
        }
        // 事件 - 显示下拉面板
        const handleClickTrigger = (event: Event) => {
            if (props.disabled) {
                event.preventDefault()
                return
            }
            refTrigger.value.focus()
            selfOpen.value = !selfOpen.value
            // 触发下拉框出现/隐藏事件
            emit('visibleChange', selfOpen.value, event);
        }

        // 事件 - 搜索框的输入事件
        const handleSearchInput = (event: Event) => {
            const searchValue = event.target.value;
            let searchList = _.cloneDeep(optionFlatList.value.filter(o => o.name.includes(searchValue) && !(o.children && o.children.length)));
            searchList = searchList.map(o => {
                const regName = new RegExp(searchValue, 'g');
                let fullPath = []
                o.name = o.name.replace(regName, `<span class="active">${searchValue}</span>`)
                helpGetFullPath(o, fullPath);
                fullPath = fullPath.map(o => o.name).reverse().join(' / ');
                return {
                    id: o.id,
                    name: o.name,
                    fullPath,
                    checked: 'uncheck'
                }
            })
            searchResult.value = searchList;
            searchInputValue.value = searchValue;
            console.log("input框输入事件：", event.target.value, searchList);
        }
        // 事件 - 搜索 - 单选选中
        const handleSearchClick = (id: string, event: Event) => {
            console.log(id, event);
            // 1. 设置选中项
            selectId.value = id;
            // 2. 清空搜索项
            searchInputValue.value = '';
            // 3.触发选中事件
            const item = optionFlatList.value.find(o => o.id === id);
            handleClick(item, -1, event);
            // 4. 展开到选中项
            let resultList = [];
            helpGetChildrenNodes(item, resultList);
            resultList.reverse()
            itemList = itemList.concat(resultList);
        }
        // 事件 - 搜索 - 多选选中
        const handleSearchMultipleChange = (searchItem: any, event: Event) => {
            const item = optionFlatList.value.find(o => o.id === searchItem.id);
            setTimeout(() => {
                item.checked = searchItem.checked;
                handleCheckChange(item, event);
            }, 50)
        }

        // 点击空白处隐藏下拉面板
        onClickOutside(
            target,
            event => {
                blur()
            },
            {ignore: [refPopup]}
        )

        // 设置默认选中项
        if (props.modelValue) {
            if (props.multiple) {
                // 多选
                optionFlatList.value.forEach((o: any) => {
                    if (Array.isArray(props.modelValue) && props.modelValue.includes(o.id)) {
                        o.checked = 'checked';
                        multipleSelected.value.push({id: o.id, name: o.name});
                        o.parent && helpSetParentChecked(o.parent.children, o.parent);
                    }
                })
            } else {
                // 单选
                const selectItem = optionFlatList.value.find((o: any) => o.id === props.modelValue);
                if (selectItem) {
                    // 1.input框数据回显
                    let fullpath: any = [];
                    helpGetFullPath(selectItem, fullpath);

                    inputValue.value = fullpath.map((o: any) => o.name).reverse().join(' / ');

                    // 2. 设置选中状态
                    selectParentIds.value = fullpath.map((o: any) => o.id);
                    // 3. 展开到选中项
                    let resultList = [];
                    helpGetChildrenNodes(selectItem, resultList);
                    resultList.reverse()
                    itemList = itemList.concat(resultList);
                }
            }
        }


        const {windowStyle} = usePopupStyle(target, {topOffset: 10, align: props.placement, level: 'Left'});

        // popver组件内容插槽
        const popverSlot = {
            content: () => {
                return (<div class="select-count">
                    {multipleSelected.value.map((o: any) => (<span>{o.name}</span>))}
                </div>);
            }
        }

        const renderUI = () => {
            const inputUI = (<div
                class={['m-cascader__result', props.disabled && 'disabled']}
                style={{width: `${props.width}px`}}
            >
                <div
                    class='m-cascader__result_input'
                    onClick={handleClickTrigger}
                    onMouseenter={handleInputMuouseenter}
                    onMouseleave={handleInputMouseleave}
                >
                    {!multipleSelected.value.length && (
                        <span class='m-cascader__result_caption'>{props.caption ? `${props.caption}：` : ''}</span>)}
                    <input
                        ref="trigger"
                        type="text"
                        placeholder={placeholderText.value}
                        value={props.filterable && searchInputValue.value.length ? searchInputValue.value : inputValue.value}
                        disabled={props.disabled}
                        readonly={!props.filterable}
                        onInput={handleSearchInput}
                    />
                    {isShowClearIcon.value ? <IconMeriComponentCancel
                        class="cancel-icon"
                        onclick={handleClear}
                    /> : <IconMeriComponentArrowDown
                        color="#C4C9CF"
                        class={["arrow-icon", selfOpen.value && 'arrow-icon-up']}
                    />}
                </div>
                {/*多选选中的tags*/}
                {!!multipleSelected.value.length && (<div class='m-cascader__result_multiple'>
                    {props.caption && <span class='caption'>{props.caption ? `${props.caption}：` : ''}</span>}
                    {props.showSelectCount ?
                        (
                            <div class='count'>
                                已选择<span class='count__number'>
                                    <MPopover
                                        placement='top'
                                        popover-class='cascader-popver'
                                        v-slots={popverSlot}
                                    >{multipleSelected.value.length}</MPopover>
                                </span>项
                            </div>
                        ) : (
                            <div class='tags'>
                                {multipleSelected.value.map((o: any, index: number) => {
                                    return (index < props.maxTagCount && (<span
                                        class="label"
                                        style={{maxWidth: props.maxTagWidth ? `${props.maxTagWidth}px` : 'auto'}}
                                    >
                                        <span class='label__text'>{o.name}</span>
                                        <span class='label__icon'>
                                            <IconMeriComponentClose
                                                width={16}
                                                onclick={(event: Event) => {
                                                    handleCheckClose(o, event)
                                                }}
                                            /></span>
                            </span>))
                                })}
                                {multipleSelected.value.length > props.maxTagCount && (
                                    <MPopover
                                        placement='top'
                                        popover-class='cascader-popver'
                                        v-slots={popverSlot}
                                    >
                                        <span class="label">+{multipleSelected.value.length - props.maxTagCount}</span>
                                    </MPopover>
                                )}
                            </div>
                        )}
                </div>)}
            </div>)
            const contentUI = (
                <div style='font-size:0;'>
                    {/*搜索列表*/}
                    {props.filterable && searchInputValue.value.length ? (<div
                            class='m-cascader__search-box'
                            style={{width: `${props.width}px`}}
                        >
                            {searchResult.value.length ?
                                <div class='search-list'>
                                    {searchResult.value.map(o => (
                                        <div
                                            class='search-item'
                                            onclick={(event: Event) => {
                                                handleSearchClick(o.id, event)
                                            }}
                                        >
                                            {props.multiple && <MCheckbox
                                                v-model={o.checked}
                                                onClick={(event: Event) => {
                                                    handleSearchMultipleChange(o, event)
                                                }}
                                            />}
                                            <span v-html={o.fullPath}></span>
                                        </div>
                                    ))}
                                </div> :
                                <div class='no-data'>暂无数据</div>
                            }
                        </div>) :
                        <div class='m-cascader__list-box'>
                            {
                                itemList.map((o: any, level: number) => {
                                    return (<div
                                        class='m-cascader__list'
                                        style={{width: `${props.width / 2}px`}}
                                    >
                                        {
                                            o.map((item: any) => {
                                                return (
                                                    <span
                                                        class={['m-cascader__list_item', selectParentIds.value.includes(item.id) && 'active']}
                                                        onClick={(event) => {
                                                            handleClick(item, level, event)
                                                        }}
                                                        onMouseenter={(event: Event) => {
                                                            handleRowMuouseenter(item, level, event)
                                                        }}
                                                    >
                                                        {
                                                            props.multiple && (<MCheckbox
                                                                v-model={item.checked}
                                                                onClick={(event: Event) => handleCheckChange(item, event)}
                                                            />)
                                                        }
                                                        <span style={props.multiple && {width: 'calc(100% - 20px)'}}>
                                                            <span class='m-cascader__list_item-text'>{item.name}</span>
                                                            {/*有子集的显示右侧的展开箭头*/}
                                                            {Array.isArray(item.children) && item.children.length &&
                                                            <IconMeriComponentChevronRight color="#8B949E"/>}
                                                        </span>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>)
                                })

                            }

                            {/*{(props.multiple && <div><MButton>取消</MButton><MButton type='primary'>确定</MButton></div>)}*/}
                        </div>
                    }

                </div>
            )
            // 滚动条区域
            const popup = (
                <div
                    ref="popup"
                    class="m-select-menu"
                    placement={windowStyle.placement}
                >
                    {slots.panelHeader?.()}
                    {slots.default ? (
                        <section
                            ref="content"
                            class="m-select-menu-content"
                        >
                            {slots.default?.()}
                        </section>
                    ) : (
                        contentUI
                    )}
                    {/*{getIsEmpty.value ? slots.empty?.() || <div class="m-select-menu-empty">暂无内容</div> : null}*/}
                    {/*{slots.panelFooter?.() || footer}*/}
                </div>
            )

            // window
            const window = (
                <Teleport to="body">
                    <Transition name="m-select-zoom">
                        {selfOpen.value ? (
                            <div
                                class="m-select-window"
                                style={{...windowStyle}}
                                v-show={selfOpen.value}
                            >
                                {popup}
                            </div>
                        ) : null}
                    </Transition>
                </Teleport>
            )
            return (
                <div
                    ref="target"
                    class="m-cascader"
                >
                    {inputUI}
                    {window}
                </div>
            )
        }

        return {
            renderUI,
            itemList,
            selectParentIds,
            multipleSelected,
            selfOpen,
            focus,
            placeholderText,
            isHoverInput,
            optionFlatList
        }
    },
    render() {
        return this.renderUI();
    }
})
export default Cascader;