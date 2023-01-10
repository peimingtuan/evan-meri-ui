import type {PropType} from 'vue'
import number from "../../Steps/test/number.vue";

type CascaderNodeValue = string | number;
type CascaderNodePathValue = CascaderNodeValue[]
type CascaderValue =
    | CascaderNodeValue
    | CascaderNodePathValue
    | (CascaderNodeValue | CascaderNodePathValue)[]

interface CascaderOption extends Record<string, unknown> {
    id?: string
    name?: CascaderNodeValue
    children?: CascaderOption[]
    disabled?: boolean
    leaf?: boolean
}

enum Trigger {
    CLICK = 'click',
    HOVER = 'hover',
}

const CascaderProps = {
    // 双向绑定的值
    modelValue: [Number, String, Array] as PropType<CascaderValue>,
    // 宽度
    width: {
        type: Number,
        default: 300,
    },
    // 标题
    caption: {
        type: String,
        default: "",
    },
    // 输入框占位文本
    placeholder: {
        type: String,
        default: "请选择",
    },
    // 数据列表
    options: {
        type: Array as PropType<CascaderOption[]>,
        default: () => [] as CascaderOption[],
    },
    // 触发方式
    trigger: {
        type: String,
        default: Trigger.CLICK,
    },
    // 是否多选
    multiple: {
        type: Boolean,
        default: false,
    },
    // 多选时，最多显示几个tab
    maxTagCount: {
        type: Number,
        default: 1
    },
    // 禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 显示完整路径
    showAllLevels: {
        type: Boolean,
        default: true
    },
    // 显示选中数量
    showSelectCount: {
        type: Boolean,
        default: true
    },
    // 是否允许清空选中项
    clearable: {
        type: Boolean,
        default: true
    },
    // 多选时tag最大宽度
    maxTagWidth: {
        type: Number,
        default: 0
    },
    // 是否支持搜索
    filterable: {
        type: Boolean,
        default: false,
    },
    // 是否带确定、取消按钮
    hasConfirm: {
        type: Boolean,
        default: false
    }
}

export {CascaderProps, Trigger};

