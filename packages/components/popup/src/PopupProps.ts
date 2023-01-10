import { PropType, ref, Ref } from "vue";
import { Flow, Rect } from '../../utils/types';
// 触发事件
export enum EventType {
    // 点击事件
    click = "click",
    // hover 事件
    hover = "hover"
}
export default {
    width: {
        type: Number as PropType<number>,
        default: 200
    },
    height: {
        type: Number as PropType<number>,
        default: 100
    },
    flow: {
        type: String as PropType<Flow>,
        default: Flow.bottomLeft
    },
    target: {
        type: Object as PropType<Rect>,
        require: true
    }
} as const;