import { defineComponent, h, toRefs, computed, CSSProperties, inject, ref, Teleport, VNode, Suspense, Fragment, PropType } from 'vue';
import { Column, columns, resizable } from "./TableProps"
import { IconMeriActionSetting, IconMeriComponentArrowDown, IconMeriComponentArrowRight } from "meri-icon"
import { onClickOutside, useElementBounding } from '@vueuse/core';
import CheckBox from "../../checkbox/index";
import { State as CheckboxState } from "../../checkbox/src/CheckboxProps";
import { round } from "lodash";
import { arrMoveTo, linkageChangeCheckState } from './utils';
import dots from "../../../static/img/dots.png"


const TableSetting = defineComponent({
    name: "TableSetting",
    props: {
        resizable,
        // 当前表头
        columns,
        tbody: {
            type: Object as PropType<HTMLDivElement | undefined>
        }
    },
    emits: [],
    setup(props, { slots, attrs, emit }) {
        // 当前弹窗显示
        const open = ref(false);

        // 当前列表
        const list = ref<HTMLDivElement>();

        let {
            columns,
            tbody
        } = toRefs(props);


        /**
         * 点击图标切换
         */
        const onClick = () => {
            open.value = !open.value;
        }

        /**
         * 点击区域外取消弹窗
         */
        onClickOutside(list, (event: any) => {

            if (event.path && !event.path.includes(refIcon.value)) {
                open.value = false
            }
        })

        /**
         * 
         * @param item 当前选中的对象
         * @param e 拖拽事件
         * @returns 
         */
        const dragend = (item: Column, e: any): void => {

            // 当前鼠标的位置以及每个对象的高
            let { layerY, srcElement } = e;
            // 计算移动的个位数
            const len = round(layerY / srcElement.offsetHeight);
            // 获取原有的位置
            const oldIndex = columns.value.indexOf(item);
            // 获取目标的索引
            const targetIndex = oldIndex + len;

            // 如果与之前位置相同不进行移位
            if (oldIndex === targetIndex) return;

            // 处理对应的移动
            arrMoveTo(item, targetIndex, columns.value);
            // 阻止拖拽后回落
            e.preventDefault();
            // 重新计算表头
            if (reInitTableHeader) {
                reInitTableHeader(columns.value)
            }
        }

        // 能否被拖拽
        const draggable = ref(false);


        // 计算弹窗的定位信息
        const refIcon = ref<HTMLDivElement>()
        const { right, bottom } = useElementBounding(refIcon)

        const position = computed<CSSProperties>(() => {

            const o: CSSProperties = {
                top: `${bottom.value}px`,
                left: `${right.value}px`,
            };
            // 设置弹窗的高度
            /**
             * 表头设置的弹窗高度根据列表数量适配，默认最大高度不能超过表格高度；若下拉列表数据超过表格高度时，下拉列表需要将最末item截断展示，
             */
            if (tbody.value) {
                const clientHeight = tbody.value.clientHeight;
                const height = Math.floor(clientHeight / 44) * 44;
                o.maxHeight = `${height}px`
            }

            return o;
        })

        const reInitTableHeader = inject<(items: Column[]) => void>('reInitTableHeader')

        /**
         * 单个复现改变回调
         * @param item 当前列
         * @param state 被修改后台的装填
         */
        const onChange = (item: Column, state: CheckboxState) => {

            if (item.onlyShow) return;

            linkageChangeCheckState(item, state)

            // 重置表头
            if (reInitTableHeader) {
                reInitTableHeader(columns.value);
            }
        }

        const renderColums: (col: Column) => VNode = (col: Column) => {

            const style: CSSProperties = {};

            if (col.level) {
                style.paddingLeft = `${col.level * 20 + 16}px`
            }

            return <>
                <div key={col.dataIndex} style={style} onDragend={(e) => dragend(col, e)} onDragover={e => e.preventDefault()} draggable={props.resizable && draggable.value} onClick={() => onChange(col, col.checked === CheckboxState.uncheck ? CheckboxState.checked : CheckboxState.uncheck)} class="column-item">
                    {props.resizable ? <img draggable="false" onMouseenter={() => draggable.value = true} onMouseout={() => draggable.value = false} class="column-item-img" src={dots} /> : null}
                    <CheckBox disabled={col.onlyShow} modelValue={col.checked || CheckboxState.uncheck}></CheckBox>

                    {col.children && col.children.length ? <div class="meri-table-body-arrow" onClick={() => col.setViewOpen = !col.setViewOpen}>{col.setViewOpen ? <IconMeriComponentArrowDown size={24} /> : <IconMeriComponentArrowRight size={24} />}</div> : null}

                    <span class="column-item-title">{col.title}</span>
                </div>
                {
                    col.children && col.children.length && col.setViewOpen ? col.children.map(col => renderColums(col)) : null
                }
            </>
        }

        return () => {

            return (
                // 单元格
                <div class="meri-table-header-setting" ref={refIcon}>
                    <IconMeriActionSetting onClick={onClick}></IconMeriActionSetting>
                    {
                        open.value ? (<Teleport to="body">
                            <div style={position.value} ref={list} class="meri-table-setting-view">
                                {
                                    columns.value.map((col: Column) => renderColums(col))
                                }
                            </div>
                        </Teleport>) : null
                    }
                </div>
            )
        }
    }
})
export default TableSetting;