import {IRangeSelectTime } from '../DatePickerProps'
import {PropType} from "vue";
export const DaterangePanelProps = {
    // 是否是选择范围
    isRange: {
        type: Boolean,
        default: false,
    },
    // 日期范围：开始时间/结束时间
    rangeType: {
        type: String,
        default: ''
    },
    // 最终的开始、结束时间
    selectResult: {
        type: Object as PropType<IRangeSelectTime>,
        default: () => ({})
    },
    // 最后一个Hover的时间
    hoverLastValue: {
        type: String,
        default: ''
    },
    // 时间范围 - 当前面板选中的开始、结束时间
    selectTime: {
        type: Object as PropType<IRangeSelectTime>,
        default: () => ({})
    }
}