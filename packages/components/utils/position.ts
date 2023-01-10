import { Flow, Rect } from "./types"
import { useElementBounding } from '@vueuse/core'
import { ref, Ref } from "vue";

export type Size = {
    width: number;
    height: number;
}

export type Location = Ref<{
    x: number;
    y: number;
}>


/**
 * 根据当前DOM 计算其弹窗位置
 * parent:参考的DOM
 * flow 弹窗弹出的反向
 * Size: 弹窗的大小
 */
export default (target: Rect, flow: Flow = Flow.bottomLeft, childWidth: number, childHeight: number) => {
  
    // 获取父级的盒子信息
    const { width, height, x: left, y: top } = target;

    const layout = {
        value: {
            x: 0,
            y: 0
        }
    }


    switch (flow) {
        // case Flow.leftTop:
        //     layout.value.x = left.value - childWidth;
        //     layout.value.y = top.value;
        //     break;
        // case Flow.leftBottom:
        //     layout.value.x = left.value - childWidth
        //     layout.value.y = top.value + height.value - childHeight;
        //     break;
        // case Flow.rightTop:
        //     layout.value.x = left.value + width.value;
        //     layout.value.y = top.value;
        //     break;
        // case Flow.rightBottom:
        //     layout.value.x = left.value + width.value;
        //     layout.value.y = top.value + height.value - childHeight;
        //     break;
        case Flow.topLeft:
            layout.value.y = top.value - childHeight;
            layout.value.x = left.value;
            break;
        case Flow.topRight:
            layout.value.y = top.value - childHeight;
            layout.value.x = left.value + width.value - childWidth
            break;
        case Flow.bottomLeft:
            layout.value.y = top.value + height.value;
            layout.value.x = left.value;
            break;
        case Flow.bottomRight:
            layout.value.y = top.value + height.value;
            layout.value.x = left.value + width.value - childWidth
            break;
        default:
            break;
    }

    return {
        x: layout.value.x,
        y: layout.value.y,
    }
};