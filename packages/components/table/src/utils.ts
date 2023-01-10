import { CSSProperties } from "vue";
import { get, isArray, isNumber, isUndefined } from "lodash"
import { Children, Column, Fixed, Parent, Rect, Row, SortOrder, TypeAttrs } from "./TableProps";
import { Size } from '../../utils/types';
import { State as CheckboxState } from "../../checkbox/src/CheckboxProps";

// 默认文字朝向
export const DefaultAlign = "left";

// 根据当前列的选中状态判断其是否已经显示
export const GetShowOfColumn = (col: Column) => {
    if (col.onlyShow) return true;

    if (col.checked === CheckboxState.checked) return true;

    if (col.checked === CheckboxState.notNull) return true;

    if (col.checked === CheckboxState.uncheck) return false;
}

// 计算单元格合并
export const GetMergeAttrs = (row: Row, col: Column, rowIndex: number, colIndex: number, callback?: (row: Row, col: Column, rowIndex: number, colIndex: number) => TypeAttrs) => {

    let merge = {
        rowspan: 1,
        colspan: 1
    }

    if (callback) {

        const result = callback(row, col, rowIndex, colIndex);

        merge.rowspan = isUndefined(result.rowspan) ? 1 : result.rowspan;
        merge.colspan = isUndefined(result.colspan) ? 1 : result.colspan;
    }

    return merge;
}

/**
 * 获取树形表格的下拉之后的偏移量
 * @param row 当前行
 * @returns 
 */
export const GetTreePaddingLeftStyle = (row: Row) => {
    const style: CSSProperties = {};
    if (row.level) {

        let width = (row.level || 0) * 24 + 16;

        if (row.level && (!row.children || !row.children.length)) {
            width += 20;
        }

        style.paddingLeft = `${width}px`;
    }
    return style;
}

/**
 * 获取滚动条滚动后对应的样式类
 * @param col 列信息
 */
export const GetScrollClass = (col: Column, classList: string[]) => {
    const arr = classList || [];

    if (col.scrollLeft) {
        arr.push("scroll-left");
    }
    if (col.scrollRight) {
        arr.push("scroll-right");
    }
    if (col.onReSize) {
        arr.push("resize");
    }

    return arr;
}

/**
 * 获取列的定位信息
 * @param col 列信息
 */
export const GetPositionStyle = (col: Column) => {
    // 获取每行的定位属性
    const style: CSSProperties = {};
    if (col.fixed === "left") {
        style.left = `${col.left}px`;
        style.zIndex = 1;
    }
    if (col.fixed === "right") {
        style.right = `${col.right}px`;
        style.zIndex = 1;
    }

    return style;
}

/**
 * 获取列的文字方向信息
 * @param col 列信息
 */
export const GetTextStyle = (col: Column) => {
    const style: CSSProperties = {};

    if (col.align) {
        switch (col.align) {
            case "right":
                style["justify-content"] = "flex-end";
                break;
            case "center":
                style["justify-content"] = "center";
                break;
            default:
                style["justify-content"] = "flex-start";
                break;
        }
    }

    return style;
}

/**
 * 根据传入的配置返回文字的样式
 * @param rect 矩形配置信息
 */
export const GetStyleOfColWidth = (width = 48, minWidth?: number, maxWidth?: number) => {
    const style: CSSProperties = {
        width: `${width}px`,
        minWidth: `${minWidth || width}px`,
        maxWidth: `${maxWidth || width}px`,
    };

    return style;
}

/**
 * 根据传入的配置返回文字的样式
 * @param rect 矩形配置信息
 */
export const GetStyleOfCol = (rect: Column,last=false) => {

    // 获取矩形配置
    const { colWidth, minWidth, maxWidth } = rect;

    const style: CSSProperties = {
        width: colWidth ? `${colWidth}px` : void 0,
        minWidth: minWidth ? `${minWidth}px` : void 0,
        maxWidth: maxWidth ? `${maxWidth}px` : void 0,
    };

    if(last){
        style.width = "auto";
    }

    return style;
}

/**
 * 根据传入的配置返回文字的样式
 * @param rect 矩形配置信息
 */
export const GetStyleOfRect = (rect: Column) => {

    // 获取矩形配置
    const { colWidth, minWidth, maxWidth, align, ellipsis, fixed, left, right } = rect;

    const style: CSSProperties = {
        width: colWidth ? `${colWidth}px` : void 0,
        minWidth: minWidth ? `${minWidth}px` : void 0,
        maxWidth: maxWidth ? `${maxWidth}px` : void 0,
    };

    if (align) {
        switch (align) {
            case "right":
                style["justify-content"] = "flex-end";
                break;
            case "center":
                style["justify-content"] = "center";
                break;
            default:
                style["justify-content"] = "flex-start";
                break;
        }
    }

    if (fixed) {
        if (isNumber(left)) {
            style.position = "sticky";
            style.left = `${left}px`
        }

        if (isNumber(right)) {
            style.position = "sticky";
            style.right = `${right}px`
        }
    }

    // 如果文字需要超出...
    if (ellipsis) {
        style.whiteSpace = "nowrap";
        style.overflow = "hidden";
        style.textOverflow = "ellipsis";
    }

    return style;
}

/**
 * 通过Size 获取vars 变量
 * @param size 
 */
export const GetStyleVarsBySize = ({
    size = Size.medium,
    columnLine = false
}: {
    size?: Size,
    columnLine?: boolean
}) => {

    const vars = {};

    if (size === Size.medium) {
        vars['--line-height'] = "38px";
    } else {
        vars['--line-height'] = "28px";
    }

    if (columnLine) {
        vars['--border-x'] = ".5px";
    }

    return vars;
}

/**
 * 计算相关文字的宽度方法
 * @param {*} text 需要计算的文字长度
 * @param {*} fontSize 字号
 * @param {*} fontWeight 字体加粗
 * @param {*} fontFamily 字体
 * @returns 
 */
export const CreateGetTextWidth = (fontSize = 12, fontWeight = 'normal', fontFamily = "Robot") => {

    if (!document) return 0;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context!.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    return (text: string) => {
        if (!context) return 0;
        const metrics = context!.measureText(text);
        return metrics.width;
    }
}

/**
 * 初始化锁定列的值
 * @param value 锁定列的值
 */
export const initFixedValue = (value?: Fixed) => {
    if (value === true || value === "left") {
        return "left"
    } else if (value === "right") {
        return "right"
    } else {
        return "center";
    }
}

/**
 * 对列进行初始化
 * @param col 列对象
 */
export const defineColumn = (col: Column) => {
    const newCol = { ...col };
    if (isUndefined(newCol.sorter)) {
        newCol.sorter = false;
    }
    if (isUndefined(newCol.fixed)) {
        newCol.fixed = "center";
    }
    if (isUndefined(newCol.children)) {
        newCol.children = [];
    }
    if (isUndefined(newCol.onReSize)) {
        newCol.onReSize = false;
    }

    if (isUndefined(newCol.checked)) {
        newCol.checked = CheckboxState.checked;
    }

    if (isUndefined(newCol.setViewOpen)) {
        newCol.setViewOpen = true;
    }

    if (isUndefined(newCol.minWidth)) {
        newCol.minWidth = 98;
    }

    if (isUndefined(newCol.ellipsis)) {
        newCol.ellipsis = false;
    }

    if (isUndefined(newCol.align)) {
        newCol.align = "left";
    }

    // 如果没有传宽也没有传比例则默认比例为1
    if (isUndefined(col.weight) && isUndefined(col.width)) {
        col.weight = 1;
    }

    return newCol;

}

/**
 * 对表头数据进行格式化
 */
export const getGroupColumns = (columns: Column[], columnMap: Map<string, Column>) => {
    // 格式化后的树形表头
    let groupColumns: Column[] = [];
    // 最末级表头集合
    const lastLevelColumns: Column[] = [];
    // 按照分组的集合
    const levelGroupColumns: Column[][] = [];
    // 表头的索引平铺
    columnMap.clear();

    // 整体有多少个单元格
    const deep = (cols: Column[], parent?: Column) => {

        const total = [];

        for (const item of cols) {

            // 继承父级得层级和对应得定位
            const level = parent && !isUndefined(parent.level) ? parent.level + 1 : 0;
            const fixed = parent && !isUndefined(parent.fixed) ? parent.fixed : "center";


            const col = { level, fixed, parent, ...defineColumn(item) };

            // 按照层级进行划分
            if (levelGroupColumns[col.level]) {
                levelGroupColumns[col.level].push(col)
            } else {
                levelGroupColumns[col.level] = [col]
            }

            total.push(col);

            // 保存到字典中
            columnMap.set(col.dataIndex, col);

            if (Array.isArray(col.children) && col.children.length) {
                col.children = deep(col.children, col)
            } else {
                // 保存到末级中
                lastLevelColumns.push(col);
            }
        }

        return total;
    }

    // 先对固定列进行排序
    //  groupColumns = deep(columns);

    // 先对固定列进行排序
    groupColumns = deep(columns.sort((a, b) => {
        const fixed = {
            left: -100,
            center: 0,
            right: 1100
        }

        let aValue = fixed[initFixedValue(a.fixed)];
        let bValue = fixed[initFixedValue(b.fixed)];

        return aValue - bValue;
    }));

    return {
        groupColumns,
        lastLevelColumns,
        columnMap,
        levelGroupColumns
    }
}

/**
 * 计算最小均分单位宽度
 * @param columns 参与计算最小平分宽度的单元格
 * @param tableWidth 表格的宽度
 */
export const computedAvgWidth = (columns: Column[], tableWidth: number, ignoreWidth = 0) => {
    // 计算单个单元格的宽度
    let usedWidth = ignoreWidth;
    let usedFlex = 0;
    for (const col of columns) {
        // 如果该列进行展示则进行计算
        if (GetShowOfColumn(col)) {
            if (col.weight) {
                usedFlex += col.weight;
            } else if (col.width) {
                usedWidth += col.width;
            } else {
                usedFlex += 1;
            }
        }
    }

    const avg = (tableWidth - usedWidth) / usedFlex;

    return avg;
}


/**
 * 从上往下计算纵向合并的列
 * @param columns 最底层的列集合
 */
export const setRowSpan = (rows: Column[][]) => {
    for (const columns of rows) {
        for (const col of columns) {
            // 如果是是最后一级则填充剩余所有的纵向列
            if (isNumber(col.level)) {

                if (Array.isArray(col.children)) {
                    if (col.children.length) {
                        col.rowspan = 1;
                    } else {
                        col.rowspan = rows.length - col.level;
                    }
                } else {
                    col.rowspan = rows.length - col.level;
                }
            }
        }
    }
}

/**
 * 从下往上执行计算对应得横向合并的列
 * @param columns 最底层的列集合
 */
export const setColSpan = (cols: Column[][]) => {
    for (const columns of [...cols].reverse()) {
        for (const col of columns) {

            if (Array.isArray(col.children)) {
                if (col.children.length) {
                    col.colspan = col.children.reduce((con, item) => con += GetShowOfColumn(item) ? (item.colspan || 0) : 0, 0);
                } else {
                    col.colspan = 1;
                }
            } else {
                col.colspan = 1;
            }
        }
    }
}

/**
 * 设置所有表头显示的勾选状态
 * @param cols 表头集合
 */
export const setChecked = (cols: Column[][]) => {
    for (const columns of [...cols].reverse()) {
        for (const col of columns) {
            col.checked = getCheckStateFromChildren(col, CheckboxState.checked);
        }
    }
}



/**
 * 自动补齐单元格以及的宽度
 * @param columns 需要设置的单元格
 * @param avgWidth 平均默认的宽度
 */
export const setColsWidth = (columns: Column[], avgWidth: number, minWidth: number = 98) => {
    // 计算所有列的宽度
    for (const col of columns) {
        if (GetShowOfColumn(col)) {

            const mWidth = col.minWidth || minWidth;

            // 先计算自身的宽度
            if (col.weight) {
                // 给出默认的最小值
                col.colWidth = Math.max(mWidth, (col.weight) * avgWidth);
            } else if (col.width) {
                col.colWidth = Math.max(mWidth, col.width);
            } else {
                col.colWidth = Math.max(mWidth, 1 * avgWidth);
            }
            // 对父级得宽度进行累加
            DeepParent<Column>(col, (parent, item) => {
                parent.colWidth = (parent.colWidth || 0) + item.colWidth!
            })
        } else {
            col.colWidth = 0;
        }

    }

    return columns;
}

/**
 * 自动补齐单元格以及的定位信息
 * @param columns 需要设置的单元格
 * @param left 左边的偏移量
 */
export const setColsFixed = (levelGroupColumns: Column[][], left = 48) => {
    // 计算所有固定列的定位
    for (const groupColumns of levelGroupColumns) {

        groupColumns.filter(item => item.fixed === "left" && GetShowOfColumn(item)).forEach((item, index, content) => {
            // 前端一个的定位
            const before = content[index - 1];
            if (before) {
                item.left = before.left! + before.colWidth!;
            } else {
                item.left = left;
            }
        })

        groupColumns.filter(item => item.fixed === "right" && GetShowOfColumn(item)).reverse().forEach((item, index, content) => {
            // 前端一个的定位
            const before = content[index - 1];
            if (before) {
                item.right = before.right! + before.colWidth!;
            } else {
                item.right = 0;
            }
        })
    }
}

/**
 * 对表格的数据进行格式化(会修改原始数据)
 * @param rows 行集合
 */
export const getGroupRows = (rows: Row[], dataSourceMap: Map<string, Row>, lienHeight: number, borderWidth = 1) => {
    // 清空原有内容
    dataSourceMap.clear();

    const deep = (rows: Row[], { level = 0, parent }: { level?: number; parent?: Row }) => {

        const total = [];

        for (const item of rows) {
            const row = { ...item };
            // 给当前行附加对应得行
            row.level = level;
            // 给当前行附加对应得父级
            row.parent = parent;
            // 给每行高以固定的值
            row.height = row.height || (lienHeight + borderWidth);
            // 给当前行添加高度
            row.size = row.height;

            total.push(row);
            // 保存每行的数据
            dataSourceMap.set(row.id, row);

            if (Array.isArray(row.children) && row.children.length) {
                // 如果当前行存在子行继续进行递归
                row.children = deep(row.children, {
                    level: level + 1,
                    parent: row,
                })
            }

            // // 给父级添加高度
            if (parent && parent.open && parent.size) {
                parent.size += row.size;
            }
        }
        return total;
    }

    return deep(rows, { level: 0 });
}

/**
 * 推算出当前的排序状态
 * @param state 当前的排序状态
 */
export const getSortState = (state: SortOrder = SortOrder.default) => {

    // 无序是需要改变为升序
    switch (state) {
        // 升序默认修改为降序
        case SortOrder.ascend:
            return SortOrder.descend
        // 降序修改为无序
        case SortOrder.descend:
            return SortOrder.default;
        // 无序修改为升序
        default:
            return SortOrder.ascend
    }
}

/**
 * 推算获取当前行的选中状态
 * @param row 当前行点击改变状态
 * @returns 最新的状态值
 */
export const getChangeCheckState = (state?: CheckboxState) => {

    // 修改当前的行选中状态
    if (state === CheckboxState.checked) {
        return CheckboxState.uncheck;
    }

    return CheckboxState.checked;
}

/**
 * 根据子集计算当前行的状态
 * @param rows 需要参与计算的行
 * @param State 默认行为空的时候返回的状态
 * @returns 计算出的状态
 */
export const computedCheckStateByRows = (rows: Row[], State = CheckboxState.uncheck) => {

    // 获取自己所有的状态
    const combine = new Set(rows.map(row => row.checked || CheckboxState.uncheck));

    if (combine.size === 0) {
        // 自动为空的时候返回不选中
        return State;
    } else if (combine.size === 1) {
        // 全部选中或者全部未选中直接返回相同对象
        return Array.from(combine)[0];
    } else {
        // 子集的状态不统一返回不为空
        return CheckboxState.notNull;
    }
}

/**
 * 正向递归所有的子数据
 * @param parent 当前行
 * @param cb 对应得递归函数
 * @param isBefore 在递归前执行
 */
export const DeepChildren = <T extends Children<T>>(cb: (item: T, parent?: T, index?: number) => void, children?: T[], parent?: T, isBefore = true) => {

    if (children && children.length) {

        for (const item of children) {

            if (isBefore) {
                cb(item, parent, children.indexOf(item))
            }

            if (item.children && item.children.length) {
                DeepChildren(cb, item.children, item, isBefore);
            }

            if (!isBefore) {
                cb(item, parent, children.indexOf(item))
            }
        }
    }
}

/**
 * 正向递归所有的父数据
 * @param item 当前行
 * @param cb 对应得递归函数
 * @param isBefore 在递归前执行
 */
export const DeepParent = <T extends Parent<T>>(item: T, cb: (parent: T, item: T) => void, isBefore = true) => {

    if (item.parent) {

        if (isBefore) {
            cb(item.parent, item)
        }

        if (item.parent.parent) {
            DeepParent(item.parent, cb);
        }

        if (!isBefore) {
            cb(item.parent, item)
        }
    }
}

/**
 * 联动修改父级及子集的状态
 * @param row 当前行
 */
export const linkageChangeCheckState = (row: Row | Column, state?: CheckboxState) => {

    const changes: (Row | Column)[] = []

    changes.push(row)

    // 获取当前的选中状态
    const newCheckState = state || getChangeCheckState(row.checked);
    // 修改当前行的状态
    row.checked = newCheckState;
    // 修改子集的状态
    if (row.children && row.children.length) {
        DeepChildren((item, parent) => {
            changes.push(item)
            if (parent) {
                item.checked = parent.checked;
            }
        }, row.children, row)
    }

    // 重新计算所有父级得状态
    DeepParent(row, (parent, item) => {
        changes.push(parent)
        parent.checked = getCheckStateFromChildren(parent, CheckboxState.checked);
    })

    return changes;
}

/**
 * 根据子行的选中状态获取当前行的选中状态
 * @param col 当前行或列
 * @param state 默认的状态
 */
export const getCheckStateFromChildren = (col: Column | Row, state = CheckboxState.checked) => {
    // 已经选中的数量
    let checked = 0;
    // 未被选中的数据
    let unCheck = 0;
    // 部分被选中的状态
    let notNull = 0;

    if (Array.isArray(col.children)) {
        // 统计所有的状态
        for (const item of col.children) {
            switch (item.checked) {
                case CheckboxState.checked:
                    checked++;
                    break;
                case CheckboxState.notNull:
                    notNull++;
                    break;
                default:
                    unCheck++;
                    break;
            }
        }

        if (checked === col.children.length) {
            return CheckboxState.checked;
        } else if (unCheck === col.children.length) {
            return CheckboxState.uncheck;
        } else {
            return CheckboxState.notNull;
        }
    }

    return state;
}

/**
 * 修改当前行的选中状态
 * @param row 当前行
 * @param state 需要修改的状态
 */
export const changeCheckState = (row: Row, state?: CheckboxState) => {
    // 获取当前的选中状态
    const newCheckState = state || getChangeCheckState(row.checked);
    // 修改当前行的状态
    row.checked = newCheckState;
}

/**
 * 移动对象到指定位置
 * @param item 当前需要移动的对象
 * @param index 对象需要移动的位置
 * @param arr 需要被操作的数组
 * @returns 需要被操作的数组
 */
export const arrMoveTo = <T>(item: T, index: number, arr: T[]) => {

    // 获取原有的位置
    const oldIndex = arr.indexOf(item);

    if (oldIndex === index) return arr;

    index = oldIndex > index ? index : index - 1;
    // 删除原有的对象
    arr.splice(oldIndex, 1);
    // 将对象插入到新的文字
    arr.splice(index, 0, item);


    return arr;
}