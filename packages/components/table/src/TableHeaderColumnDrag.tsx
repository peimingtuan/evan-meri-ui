import { defineComponent, h, nextTick, PropType, ref, watch, toRefs } from 'vue';
import { Column, tableDragChange } from "./TableProps"
import { useElementBounding, useMouse, useMouseInElement, useMousePressed } from '@vueuse/core';
import { DeepChildren, DeepParent } from './utils';

const TableHeaderColumnDrag = defineComponent({
    name: "TableHeaderColumnDrag",
    props: {
        column: Object as PropType<Column>,
    },
    emits: [],
    setup(props, { slots, attrs, emit }) {

        const el = ref();
        // 获取当前列
        let {
            column,
        } = toRefs(props);

        // 递归最后一个子集
        const deepLastChild = (col: Column, callback: (col: Column) => void) => {
            if (col.children && col.children.length) {
                const item = col.children.at(-1);
                if (item) {
                    callback(item);
                    deepLastChild(item, callback);
                }
            }
        }




        // 当前鼠标是否被按下
        const { pressed } = useMousePressed({ target: el })
        // 鼠标移动的距离
        const { x } = useMouse();

        const move = "col-resize";

        // 用于记录当前整个文档的手型
        let cursor: string = move;

        watch([pressed], ([pressed]) => {

            if (pressed) {
                if (document.body.style.cursor != cursor) {
                    cursor = document.body.style.cursor;
                }
                document.body.style.cursor = move;
            } else {
                document.body.style.cursor = cursor;
                cursor = move;
            }

            if (props.column) {

                // 因为合并列之后会存在单元格不显示的情况，拖拽的线会断
                props.column.onReSize = pressed;

                DeepParent(props.column, (parent, item) => {
                    if (parent && parent.children?.at(-1) === item && item.onReSize === pressed) {
                        parent.onReSize = pressed;
                    }
                })


                deepLastChild(props.column, (col) => {
                    col.onReSize = pressed;
                })
            }
        })

        watch([pressed, x], (newVal, oldVal) => {
            const diff = newVal[1] - oldVal[1];

            if (newVal[0]) {

                // 用于保存所有纵向相关联的列
                const cols: Column[] = [];

                if (column.value) {
                    // 添加父级
                    DeepParent(column.value, (parent) => {
                        cols.push(parent);
                    })
                    // 添加自身
                    cols.push(column.value);
                    // 添加最后的子集
                    deepLastChild(column.value, (col) => cols.push(col));
                }

                const lastCol = cols.at(-1);

                if (lastCol && lastCol.colWidth) {
                    // 改变之后的结果
                    const result = lastCol.colWidth + diff;

                    console.log(diff);

                    if (diff) {
                        if (lastCol.maxWidth && result > lastCol.maxWidth) console.log(">")
                        if (lastCol.maxWidth && result > lastCol.maxWidth) return;
                    } else {
                        if (lastCol.maxWidth && result > lastCol.maxWidth) console.log("<")
                        if (lastCol.minWidth && result < lastCol.minWidth) return;
                    }

                    for (const col of cols) {
                        if (col.colWidth) {
                            col.colWidth += diff;
                        }
                    }
                }
            }
        })

        return () => {
            return (
                <div class="meri-table-header-drag" ref={el}></div>
            )
        }
    }
})
export default TableHeaderColumnDrag;