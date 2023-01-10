import { defineComponent, h, ref, computed, provide, toRefs, watch, reactive, VNode, Fragment, CSSProperties, withModifiers, nextTick, defineExpose } from 'vue';
import tableProps, { Column, index, Row, SortOrder } from "./TableProps"
import { computedCheckStateByRows, DeepChildren, getChangeCheckState, getGroupColumns, getGroupRows, GetStyleVarsBySize, linkageChangeCheckState, computedAvgWidth, setColsWidth, setColsFixed, GetStyleOfCol, setRowSpan, setColSpan, GetStyleOfColWidth, getSortState, GetPositionStyle, GetTextStyle, GetScrollClass, DeepParent, GetTreePaddingLeftStyle, GetMergeAttrs, setChecked, GetShowOfColumn } from './utils';
import { State as CheckboxState } from "../../checkbox/src/CheckboxProps";
import { useElementBounding, useVirtualList } from '@vueuse/core';
import CheckBox from "../../checkbox/index";
import TableSetting from './TableSetting';
import { IconMeriComponentArrowUp, IconMeriComponentArrowDown, IconMeriActionTips, IconMeriComponentArrowRight } from "meri-icon";
import Popover from "../../popover/src/Popover";
import TableHeaderColumnDrag from './TableHeaderColumnDrag';


const Table = defineComponent({
    name: "Table",
    props: tableProps,
    emits: ["checkedChange", "sortChange"],
    setup(props, { slots, attrs, emit, expose }) {

        let {
            columns,
            dataSource,
            colunmMinWidth,
            checkbox,
            setting,
        } = toRefs(props);

        const checkboxWidth = 48;

        // 表格容器
        const refTable = ref<HTMLDivElement>();
        // 头部视图
        const refHeader = ref<HTMLDivElement>();
        // 内容容器
        const refBody = ref<HTMLDivElement>();
        // 排序的Key
        const sortKey = ref("");
        // 计算有左边的固定列 （因为单靠样式无法根据后面判断前面的样式）
        const hasFixedLeft = ref(false);
        // 当前表格的尺寸
        const tableSize = useElementBounding(refTable)
        // 获取公用的变量
        const cssVars = GetStyleVarsBySize(props);
        // 表格的样式类
        const tableClassList = ["meri-table"];
        // 
        if (props.columnLine) {
            tableClassList.push("x-line");
        }

        const lienHeight = computed(() => {
            return props.size === "small" ? 28 : 38;
        })

        // 对列进行扁平化处理
        const dataColumnMap = reactive(new Map<string, Column>());
        // 取最末级的列集合
        const lastLevelColumns = ref<Column[]>([]);
        // 展示的最后一行的列
        const showlastLevelColumns = ref<Column[]>([]);
        // 表格状的结合
        const levelGroupColumns = ref<Column[][]>([]);
        // 完善列信息
        const groupColumns = ref<Column[]>([]);
        // 当前的表格数据(对树形数据进行扁平化)
        const dataSourceMap = ref<Map<string, Row>>(new Map());
        // 当前的表格数据
        const tableDataSource = ref<Row[]>([]);
        // 每次计算完成时候的表格数据进行备份（用于还原默认排序）
        const tableDataSourceBak = ref<Row[]>([]);
        // 当前表格中已经被选中的对象
        const checkeds = computed(() => {

            const total = [];
            for (const [id, row] of dataSourceMap.value.entries()) {

                if (row.checked === CheckboxState.checked) {
                    total.push(row)
                }
            }
            return total;
        })

        // 当前渲染tbody 的 key
        const tbodyKey = ref(0);

        // 监听传入的表头信息进行格式划分
        watch(
            [columns, tableSize.width, colunmMinWidth, checkbox],
            ([columns, tableWidth, colunmMinWidth, checkbox]) => {

                if (!tableWidth) return;

                let result = getGroupColumns(
                    columns,
                    dataColumnMap
                );

                // 设置表头的显示选中状态
                setChecked(result.levelGroupColumns);
                // 计算单个单元格的宽度
                const avg = computedAvgWidth(result.lastLevelColumns, tableWidth, checkbox ? checkboxWidth : 0);
                // 计算所有列的宽度
                setColsWidth(result.lastLevelColumns, avg, colunmMinWidth);
                // 计算所有固定列的定位
                setColsFixed(result.levelGroupColumns, checkbox ? checkboxWidth : 0);
                // 计算所有的纵向合并
                setRowSpan(result.levelGroupColumns);
                // 计算所有的横向合并
                setColSpan(result.levelGroupColumns);

                lastLevelColumns.value = result.lastLevelColumns;
                groupColumns.value = result.groupColumns;
                levelGroupColumns.value = result.levelGroupColumns;
                showlastLevelColumns.value = result.lastLevelColumns.filter(item => GetShowOfColumn(item));

                // 根据最后一级计算是否有左边的锁定列
                if (showlastLevelColumns.value.find(item => item.fixed === "left" && GetShowOfColumn(item))) {
                    hasFixedLeft.value = true;
                } else {
                    hasFixedLeft.value = false;
                }

            },
            { immediate: true, deep: true }
        );

        // 监听外部传入的表格数据对数据类型进行处理
        watch([dataSource, lienHeight], ([dataSource, lienHeight]) => {
            tableDataSource.value = Array.from(getGroupRows(dataSource, dataSourceMap.value, lienHeight));
            // 对计算完后的数据进行备份（用于还原默认排序）
            tableDataSourceBak.value = [...tableDataSource.value];
        }, { immediate: true, deep: true })

        // 选中事件的触发
        const emitCheckedChange = (items: Row[]) => {

            const res = {
                // 当前操作的行
                items,
                // 已经选中的行
                selecteds: Array.from(dataSourceMap.value.values()).filter(item => item.checked === CheckboxState.checked)
            }

            emit("checkedChange", res)

            return res
        }

        // 重新计算表头
        const reInitTableHeaderColumns = () => {

            console.log("watch2")

            // 单行表格改变表头列排序的时候需要统一
            if (levelGroupColumns.value.length === 1) {
                lastLevelColumns.value = groupColumns.value;
                levelGroupColumns.value[0] = lastLevelColumns.value;
            }
            // 计算单个单元格的宽度
            const avg = computedAvgWidth(lastLevelColumns.value, tableSize.width.value, checkbox.value ? 48 : 0);
            // 计算所有列的宽度
            setColsWidth(lastLevelColumns.value, avg, colunmMinWidth.value);
            // 计算所有固定列的定位
            setColsFixed(levelGroupColumns.value, checkbox.value ? 48 : 0);
            // 计算所有的纵向合并
            setRowSpan(levelGroupColumns.value);
            // 计算所有的横向合并
            setColSpan(levelGroupColumns.value);

            showlastLevelColumns.value = lastLevelColumns.value.filter(item => GetShowOfColumn(item));

            // 根据最后一级计算是否有左边的锁定列
            if (showlastLevelColumns.value.find(item => item.fixed === "left" && GetShowOfColumn(item))) {
                hasFixedLeft.value = true;
            } else {
                hasFixedLeft.value = false;
            }

            tbodyKey.value++;
        }

        provide("reInitTableHeader", reInitTableHeaderColumns)

        // 计算当前表头是否为选中状态
        const headerCheckState = computed(() => {
            // 根据子集计算全部的选中状态
            const state = computedCheckStateByRows(tableDataSource.value);

            return state;
        })

        // 表头复选框改变
        const headerCheckChange = (checkState?: CheckboxState) => {


            // 计算新的状态
            const state = checkState || getChangeCheckState(headerCheckState.value);
            // 改变所有子集的状态
            DeepChildren((item: Row) => {
                item.checked = state;
            }, tableDataSource.value)


            emitCheckedChange(Array.from(dataSourceMap.value.values()))
        }

        // 表格体复选框改变
        const RowCheckChange = (row: Row) => {
            // 上下级联动
            const items = linkageChangeCheckState(row);
            // 点击当前行
            // changeCheckState(row);

            emitCheckedChange(items as Row[])

        }

        // 表格的排序改变
        const tableSortChange = (col: Column, state: SortOrder) => {

            emit("sortChange", {
                col,
                state
            })

            // 无改变时不进行触发
            if (col.sortOrder === state) return;

            // 如果有传入对应得回调则进行对应得回调
            if (col.sortCallBack) {
                tableDataSource.value = col.sortCallBack(col, state, tableDataSource.value);
            } else {
                // 默认排序恢复当前的排序
                if (state === SortOrder.default) {
                    tableDataSource.value = [...tableDataSourceBak.value];
                } else {

                    const deepSort = (rows: Row[]) => {
                        return rows.sort((a, b) => {
                            if (state === SortOrder.ascend) {
                                return a[col.dataIndex] - b[col.dataIndex];
                            } else {
                                return b[col.dataIndex] - a[col.dataIndex];
                            }
                        });
                    }

                    const deepMap = (rows: Row[]) => {

                        for (const row of rows) {
                            if (row.children) {
                                row.children = deepMap(row.children);
                            }
                        }

                        return deepSort(rows)
                    }

                    // 进行排序
                    tableDataSource.value = deepMap(tableDataSource.value)
                }
            }

            // 强制更新对应得虚拟列表
            sortKey.value = col?.dataIndex + state;

            // 修改当前的排序状态
            col.sortOrder = state;
            // 清空其他的排序
            showlastLevelColumns.value.forEach(column => {
                if (col !== column) {
                    if (column.sortOrder === SortOrder.default) return;
                    column.sortOrder = SortOrder.default;
                }
            })
        }

        // 计算两边是否显示阴影
        const computedSrollArrived = () => {
            const el = refBody.value;
            if (el) {
                // 滚动至右边
                const arriveRight = (el.scrollWidth - el.scrollLeft - el.clientWidth) >>> 0;

                const lastLeft = showlastLevelColumns.value.filter(col => col.fixed === "left").at(-1);
                const firstRight = showlastLevelColumns.value.filter(col => col.fixed === "right").at(0);

                if (lastLeft) {
                    lastLeft.scrollLeft = el.scrollLeft > 0;
                }

                if (firstRight) {
                    firstRight.scrollRight = arriveRight > 0;
                }
            }
        }

        const scroll = (e: Event) => {


            if (e.target) {

                const { scrollLeft } = e.target as HTMLInputElement;
                // 同步滚动条
                if (refHeader.value) {
                    refHeader.value.scrollLeft = scrollLeft;
                }

                if (refBody.value) {
                    refBody.value.scrollLeft = scrollLeft;
                }

                computedSrollArrived();
            }
        }

        // 复现的弹窗
        const renderTooltips = () => {

            const click = () => {
                headerCheckChange(CheckboxState.uncheck);
            }



            return (<div key={checkeds.value.length} class="meri-table-tooltips">
                <span>
                    {slots.tooltip ? slots.tooltip({ checkeds: checkeds.value }) : null}
                </span>
                <span class="meri-table-tooltips—cancel" onClick={click}>取消选择</span>
            </div>)

            // return (<Teleport to="body" key={checkeds.value.length}>
            //     <div style={style} class="meri-table-tooltips">
            //         <span>
            //             {slots.tooltip ? slots.tooltip({ checkeds: checkeds.value }) : null}
            //         </span>
            //         <span class="meri-table-tooltips—cancel" onClick={click}>取消选择</span>
            //     </div>
            // </Teleport>)
        }

        /**
         * 渲染表格列的宽度
         * @param columns 最后的一列
         * @param checkbox 是否需要设置复选框
         * @returns 
         */
        const colgroup = () => {

            // 获取对应得矩形
            return (
                <colgroup>
                    {/* 如果设置的复现需要额外渲染复选的格子 */}
                    {
                        checkbox.value ? <col style={GetStyleOfColWidth()}></col> : null
                    }
                    {/* 正常渲染列 */}
                    {
                        showlastLevelColumns.value.map((col, index, content) => <col style={GetStyleOfCol(col, index === (content.length - 1))}></col>)
                    }
                </colgroup>
            )
        }

        // 渲染表头中的复选框
        const renderHeaderCheckBox = () => {
            const style: CSSProperties = {}
            if (hasFixedLeft.value) {
                style.left = 0;
            }

            return props.checkbox ? (<th style={style} rowspan={levelGroupColumns.value.length} class="meri-table-element-th meri-table-checkbox">
                <div onClick={() => headerCheckChange()}>
                    <CheckBox onClick={() => headerCheckChange()} modelValue={headerCheckState.value}></CheckBox>
                </div>
            </th>) : null
        }

        // 渲染表中的每一个数据列
        const renderColumn = (col: Column) => {
            // 点击一列进行排序
            const sort = () => {
                if (!col.sorter) return;

                const sortOrderState = getSortState(col.sortOrder)
                // 调用父级得回调
                tableSortChange(col, sortOrderState)
            }

            const classList = [];

            if (col.ellipsis) classList.push("text-overflow");

            // 单元格上的样式
            const thClassList = GetScrollClass(col, ["meri-table-element-th", col.sorter ? 'operate' : '']);

            const bind = { theme: 'dark', "mouse-leave-delay": 30000 };

            return <th class={thClassList} style={GetPositionStyle(col)} onClick={sort} rowspan={col.rowspan} colspan={col.colspan} key={col.dataIndex}>
                <div class="meri-table-header-cell" style={GetTextStyle(col)}>
                    <span class={classList} v-ellipsis={bind}>
                        {col.title}
                    </span>
                    {/* 标题描述 */}
                    {
                        col.desc ? <div class="meri-table-header-cell-icon">
                            <Popover content={col.desc} theme="dark">
                                <IconMeriActionTips size={14}></IconMeriActionTips>
                            </Popover>
                        </div> : null
                    }
                    {/* 排序 */}
                    {
                        col.sorter ? <div class="meri-table-sort">
                            <span onClick={withModifiers(() => tableSortChange(col, SortOrder.ascend), ['stop'])} class={["meri-table-sort-icon", col.sortOrder === 'ascend' ? 'on' : '']}>
                                <IconMeriComponentArrowUp size={12} />
                            </span>
                            <span onClick={withModifiers(() => tableSortChange(col, SortOrder.descend), ['stop'])} class={["meri-table-sort-icon", col.sortOrder === 'descend' ? 'on' : '']}>
                                <IconMeriComponentArrowDown size={12} />
                            </span>
                        </div> : null
                    }
                </div>
                {/* 拖拽 */}
                {
                    col.resizable ? <TableHeaderColumnDrag column={col}></TableHeaderColumnDrag> : null
                }
            </th>
        }

        // 渲染表头
        const renderHeader = () => {
            return (<div class="meri-table-header">
                <div class="meri-table-header-scroll" ref={refHeader} onScroll={scroll}>
                    <table class="meri-table-element" cellpadding="0" cellspacing="0">
                        {/* 渲染每行的宽 */}
                        {colgroup()}
                        <thead style="position: sticky; top: 0">
                            {
                                levelGroupColumns.value.map((rows, index) => <tr class="meri-table-element-tr meri-table-header-tr" key={index}>
                                    {
                                        // 第一行渲染复选框
                                        checkbox.value && !index ? renderHeaderCheckBox() : null
                                    }
                                    {
                                        rows.map(col => GetShowOfColumn(col) ? renderColumn(col) : null)
                                    }
                                </tr>)
                            }
                        </thead>
                    </table>
                </div>
                {setting.value ? <TableSetting resizable={props.resizable} columns={groupColumns.value} tbody={refBody.value}></TableSetting> : null}
            </div>)
        }

        // 渲染表格中的复选框
        const renderBodyCheckBox = (row: Row, rowIndex: number) => {
            // 判断是否需要定位
            const style: CSSProperties = {}
            if (hasFixedLeft.value) {
                style.left = 0;
            }

            let rowspan = 1;
            if (lastLevelColumns.value[0]) {

                const merge = GetMergeAttrs(row, lastLevelColumns.value[0], rowIndex, 0, props.mergeMethod);

                rowspan = merge.rowspan;

                if (!rowspan) {
                    return null;
                };
            }

            return props.checkbox ? (<th rowspan={rowspan} style={style} class="meri-table-element-td meri-table-checkbox">
                <CheckBox onChange={() => RowCheckChange(row)} modelValue={row.checked}></CheckBox>
            </th>) : null
        }


        /**
         * 渲染表格体中的单元格
         * @param row 当前行
         * @param col 当前列
         * @param index 当前第几列
         * @returns 单元格Vnode
         */
        const renderBodyRowCell = (row: Row, col: Column, rowIndex: number, colIndex: number) => {

            const textStyle = GetTextStyle(col);

            const paddingLeftStyle = colIndex ? {} : GetTreePaddingLeftStyle(row);

            const style = Object.assign(textStyle, paddingLeftStyle);

            const merge = GetMergeAttrs(row, col, rowIndex, colIndex, props.mergeMethod);

            let { rowspan, colspan } = merge;

            if (!rowspan || !colspan) {
                return null;
            };

            return <td rowspan={rowspan} colspan={colspan} class={GetScrollClass(col, ["meri-table-element-td"])} style={GetPositionStyle(col)} key={col.dataIndex}>
                <div class="meri-table-body-cell" style={style}>
                    {/* 渲染对应的下拉 */}
                    {!colIndex && row.children && row.children.length ? renderBodyRowCellArrow(row) : null}
                    {/* 渲染当行数据的复现框 */}
                    {!colIndex && row.checkbox ? <div class="meri-table-body-cell-checkbox"><CheckBox onChange={() => RowCheckChange(row)} modelValue={row.checked}></CheckBox></div> : null}
                    {
                        // 每个列信息的渲染
                        slots[col.dataIndex] ? slots[col.dataIndex]!(row) : <div class="meri-table-body-cell-title" v-ellipsis={"{theme:'dark'}"}>{row[col.dataIndex]}</div>
                    }
                </div>
                {
                    col.resizable && props.columnLine ? <TableHeaderColumnDrag column={col}></TableHeaderColumnDrag> : null
                }
            </td>;
        }

        // 展开收起变化
        const arrowChange = (row: Row) => {

            row.open = !row.open;

            const oldSize = row.size!;
            // 通过子级控制当前行的高度
            DeepChildren((item, parent) => {

                item.size = item.height;

                if (parent && parent.size) {
                    if (row.open) {
                        parent.size += item.height!;
                    } else {
                        parent.size -= item.height!;
                    }
                }

            }, row.children, row, false);

            // 计算出变化的差距
            const changeLen = row.size! - oldSize;
            // 修改父级对应得高度
            DeepParent(row, (parent, item) => {

                if (parent && parent.size) {
                    // 减去之前的高度
                    parent.size += changeLen;
                }
            });
        }

        // 渲染展开收齐图标
        const renderBodyRowCellArrow = (row: Row) => {

            return (
                <div class="meri-table-body-arrow">{row.open ? <IconMeriComponentArrowDown size={24} /> : <IconMeriComponentArrowRight size={24} />}</div>
            )
        }

        const renderBodyRow: (row: Row, rowIndex: number) => VNode = (row: Row, rowIndex: number) => {
            return <>
                <tr class="meri-table-element-tr meri-table-body-tr" key={row.id} onClick={() => arrowChange(row)}>
                    {
                        (row.slot && slots.row) ? slots.row({ row, index: rowIndex }) : <>
                            {// 第一行渲染复选框
                                checkbox.value ? renderBodyCheckBox(row, rowIndex) : null
                            }
                            {
                                showlastLevelColumns.value.map((col, colIndex) => renderBodyRowCell(row, col, rowIndex, colIndex))
                            }
                        </>
                    }
                </tr>
                {
                    Array.isArray(row.children) && row.open ? row.children.map((row: Row, rowIndex) => renderBodyRow(row, rowIndex)) : null
                }
            </>
        }


        // 渲染表格体
        const renderBody = () => {

            return (<div class="meri-table-body" ref={refBody} onScroll={scroll}>
                <table class="meri-table-element" cellpadding="0" cellspacing="0">
                    {/* 渲染每行的宽 */}
                    {colgroup()}
                    <tbody key={tbodyKey.value}>
                        {
                            tableDataSource.value.map((row, rowIndex) => renderBodyRow(row, rowIndex))
                        }
                    </tbody>
                </table>
            </div>)
        }

        // 对外暴露的对象
        expose({
            lastLevelColumns,
            showlastLevelColumns,
            levelGroupColumns,
            groupColumns,
            dataSourceMap,
            tableDataSource,
            checkeds,
            headerCheckState,
            headerCheckChange,
            RowCheckChange,
            tableSortChange,
            arrowChange
        })

        return () => {

            nextTick(() => {
                computedSrollArrived();
            })
            return (
                <div class={tableClassList} style={cssVars} ref={refTable}>
                    {/* 复现的弹窗 */}
                    {(checkeds.value.length && slots.tooltip) ? renderTooltips() : null}

                    {/* 渲染表头 */}
                    {
                        renderHeader()
                    }
                    {/* 表格体 */}
                    {
                        renderBody()
                    }
                </div>
            )
        }
    }
})
export default Table;