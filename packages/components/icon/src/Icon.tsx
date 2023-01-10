/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: wangyongcun
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 头像组件
 */
import { defineComponent, h, PropType } from 'vue';
import { Size } from '../../utils/types';

const IconProps = {
    // title
    // 尺寸
    size: {
        type: String as PropType<Size>,
        default: Size.medium
    },
    title: {
        type: String as PropType<string>,
        default: ""
    },
    type: {
        type: String as PropType<string>,
        default: "IconMore"
    },
    rotate: {
        type: Boolean as PropType<boolean>,
        default: false
    }
} as const;

const Icon = defineComponent({
    name: "Icon",
    props: IconProps,
    emits: ['click'],
    setup(props, { slots, attrs, emit }) {

        return () => {

            const title = props.title;
            // 获取按钮是Icon 合适对应得Icon
            const classNames = ['m-icon', props.type];
            // 添加大小
            classNames.push(props.size)
            if (props.rotate) classNames.push("rotate");
            const IconProps = {
                ...attrs,
                title,
                class: classNames,
            };
            
            return (
                <span  {...IconProps} onClick={e => emit("click", e)}>
                    {slots.default?.()}
                </span>
            )
        }
    }
})
export default Icon;