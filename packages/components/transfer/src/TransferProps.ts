import { PropType } from 'vue';

export type Item = {
    id?: string | number;
    name?: string;
    checked?: boolean | string,
    disabled?: boolean;
}

export type TreeNode = {
    id?: string | number,
    name?: string | number,
    open?: boolean,
    disabled?: boolean,
    checked?: string,
    visible?: boolean,
    children?: Array<TreeNode>,
    parent?: TreeNode | null
    [key: string]: any
}

export type selectIds = string | number;

const transfer = {
    // tree数据
    data: {
        type: Array as PropType<Array<TreeNode>>,
        default: () => []
    },
    // 设置哪些项应该被选中
    selectedIds: {
        type: Array as PropType<Array<selectIds>>,
        default: () => []
    },
    // 占位符
    placeholder: {
        type: String as PropType<string>,
        default: '请选择'
    },
    // 是否返回半选状态父对象数据
    returnParentNode: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    //  是否返回半选状态
    notNull: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 上下级联动
    linkage: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    // 只能选择末级
    lastStage: {
        type: Boolean as PropType<boolean>,
        default: false
    }
} as const

export default transfer;
