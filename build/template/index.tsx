import { defineComponent, h, ref, PropType, computed } from 'vue';
import { Disabled, Size } from '../../utils/types';
import { } from "./${componentName}Props"

const ${ dir }Props = {
     // 尺寸
     size: {
        type: String as PropType<Size>,
        default: Size.medium
    },
    // 禁用
    disabled: {
        type: Boolean as PropType<Disabled>,
        default: false
    },
} as const;

const ${ componentName } = defineComponent({
    name: "${componentName}",
    props: ${ dir }Props,
    emits: [],
    setup(props, { slots, attrs, emit }) {


    return() => {
        const disabled = props.disabled;
        // 获取按钮是Icon 合适对应得Button
        const classNames = ['${className}'];
        // 添加大小
        classNames.push(props.size);

        const DomProps = {
            ...attrs,
            disabled,
            class: classNames,
        };
    return (
        <div {...DomProps}>
            {slots.default?.()}
        </div>
    )
}
                }
            })
export default ${ componentName };