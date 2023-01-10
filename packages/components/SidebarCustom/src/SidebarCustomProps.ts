import { PropType } from "vue";

export const SidebarCustomProps = {
    // 宽
    width: {
        type: [String, Number],
        default: ''
    },
    // 显示left栏
    show: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    resident:{
        type: Boolean as PropType<boolean>,
        default: true
    },
    // 开启改变大小
    changeSize: {
        type: Boolean as PropType<boolean>,
        default: true
    },
}