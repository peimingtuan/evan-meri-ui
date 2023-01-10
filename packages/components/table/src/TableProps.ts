import { PropType, VNode } from 'vue'
import { Size } from '../../utils/types';
import { State as CheckboxState } from "../../checkbox/src/CheckboxProps";

// 横向方向
export type Align = 'left' | 'right' | 'center';

// 冻结的方向
export type Fixed = boolean | 'left' | 'center' | 'right';

// 冻结的方向
export const fixed = {
    type: [String, Boolean] as PropType<Fixed>,
    default: false
}

// 合并单元格的对象
export type TypeAttrs = {
    // 合并行 0 为不显示
    rowspan: number,
    // 合并列
    colspan: number
}

// 矩形样式
export type Rect = {
    // 对其方式
    align?: Align;
    // 超过宽度将自动省略。设置为 true 时，showTitle 默认为 true
    ellipsis?: boolean;
    // 列宽度
    width?: number;
    // 拖动列最小宽度，会受到表格自动调整分配宽度影响
    minWidth?: number;
    // 拖动列最大宽度，会受到表格自动调整分配宽度影响
    maxWidth?: number;
    // 按百分比进行划分
    weight?: number;
}

// 排序的状态类型
export enum SortOrder {
    // 上升
    ascend = "ascend",
    // 下降
    descend = "descend",
    // 无排序
    default = "default",
};

// 列
export type Column = {
    // 列头显示文字
    title: string;
    // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
    dataIndex: string;
    // 是否的进行排序
    sorter?: boolean;
    // 默认排序顺序
    sortOrder?: SortOrder;
    // 列是否固定，可选 true(等效于 left) 'left' 'right'
    fixed?: Fixed;
    // 是否可拖动调整宽度，此时 width 必须是 number 类型, 仅支持叶子结点
    resizable?: boolean;
    // 排序的回调
    sortCallBack?: (col: Column, state: SortOrder, rows: Row[]) => Row[];
    // 子集
    children?: Column[];
    // 描述信息
    desc?: string;
    // 父级
    parent?: Column;
    // 等级
    level?: number;
    // 左定位
    left?: number;
    // 右定位
    right?: number;
    // 左边有滚动距离
    scrollLeft?: boolean;
    // 右边边有滚动距离
    scrollRight?: boolean;
    // 当前是否正在被拖拽
    onReSize?: boolean;
    // 当前列必须展示
    onlyShow?: boolean;
    // 横向合并的列
    rowspan?: number;
    // 纵向合并的列
    colspan?: number;
    // 当前列是否被选中
    checked?: CheckboxState;
    // 当前单元格的宽
    colWidth?: number;
    // 当前列在设置看板中是否展开
    setViewOpen?:boolean;
} & Rect;

/**
 * 可以设置对应的列展示
 */
export const setting = {
    type: Boolean as PropType<boolean>,
    default: false
}

/**
 * 是否显示列的竖线
 */
export const columnLine = {
    type: Boolean as PropType<boolean>,
    default: false
}

export const index = {
    type: Number as PropType<number>,
    default: 0
}

/**
 * 表格允许复选
 */
export const checkbox = {
    type: Boolean as PropType<boolean>,
    default: false
}

/**
 * 表格允许对列进行排序
 */
export const dragColumn = {
    type: Boolean as PropType<boolean>,
    default: false
}

// 表头集合
export const columns = {
    type: Array as PropType<Column[]>,
    default: []
} as const;

export type dataItem = any & { id: string };

// 默认传入的数据源
export const dataSource = {
    type: Array as PropType<Row[]>,
    default: []
}

// 默认选中的行
export const defaultCheckeds = {
    tpye: Array as PropType<string[]>,
    default: [] as string[]
}

// 每个单元格
export type Cell = {
    // 文字信息
    text: string,
    // 固定的列
    fixed?: Fixed,
} & Rect;

// 单元格
export const cell = {
    type: Object as PropType<Cell>,
}

// 每一行
export type Row = {
    // 当前行Id
    id: string,
    // 当前行的单元行集合
    // cells: Cell[],
    // 子行
    children?: Row[],
    // 当前行信息
    // obj: any,
    // 外部传入的行高（当前行的，子集会自动计算）
    height?: number,
    // 给虚拟表格计算的高度
    size?: number,
    // 是否已经被选中
    checked?: CheckboxState,
    // 行内复选框
    checkbox?: boolean,
    // 当前行是否展开
    open?: boolean,
    // 自定义行信息
    slot?: boolean,
    // 父级对象
    parent?: Row,
    // 当前行的层级（树形菜单需要使用）
    level?: number,
    // 其他业务数据的值
    [propName: string]: any
};

// 默认一个分组的数据
export const row = {
    type: Object as PropType<Row>,
    default: null
}

// 表格大小
export const size = {
    type: String as PropType<Size>,
    default: Size.medium
}

// 复选框状态
export const checkboxStateValue = {
    type: String as PropType<CheckboxState>,
    default: CheckboxState.uncheck
}

// 复选框状态改变
export const RowCheckChange = {
    type: Function as PropType<(row: Row) => void>,
}

// 表格最小的列宽(像素)
export const colunmMinWidth = {
    type: Number as PropType<number>,
    default: 98
}

// 表格排序
export const tableSortChange = {
    type: Function as PropType<(col: Column, state: SortOrder) => void>,
}

// 表格拖拽
export const tableDragChange = {
    type: Function as PropType<(col: Column, size: number) => void>,
}

// 排序的回调
export const SortCallBack = {
    type: Function as PropType<(col: Column, state: SortOrder, rows: Row[]) => Row[]>,
}

// 合并单元格的方法
export const mergeMethod = {
    type: Function as PropType<(row: Row, col: Column, rowIndex: number, colIndex: number) => TypeAttrs>,
}

// 是否可以拖拽改变列的排序
export const resizable = {
    type: Boolean as PropType<boolean>
}

// 拥有子集
export type Children<T> = {
    children?: T[]
}

// 拥有父级
export type Parent<T> = {
    parent?: T
}

export default {
    checkbox,
    setting,
    columns,
    dataSource,
    size,
    defaultCheckeds,
    colunmMinWidth,
    dragColumn,
    mergeMethod,
    columnLine,
    resizable
}