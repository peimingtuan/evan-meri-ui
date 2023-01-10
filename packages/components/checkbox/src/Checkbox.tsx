/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: 高铭 gaoming@ccl-bj.com
 * @LastEditTime: 2022-09-11 16:06:10
 * @Description: 头像组件
 */
import { defineComponent, h, ref, PropType, StyleValue } from 'vue';
import { Disabled } from '../../utils/types';
import { State } from './CheckboxProps';
import { IconMeriActionDone, IconMeriActionMinus } from 'meri-icon'

const CheckboxProps = {
    // 禁用
    disabled: {
        type: Boolean as PropType<Disabled>
    },
    modelValue: {
        type: String as PropType<State>,
        default: State.uncheck
    },
    size: {
        type: Number as PropType<number>,
        default: 14,
    }
} as const;

const Checkbox = defineComponent({
    name: "Checkbox",
    props: CheckboxProps,
    emits: ['click', "input", "change", 'update:modelValue'],
    setup(props, { slots, attrs, emit }) {

        return () => {
            const onClick = (event: Event) => {
                if (props.disabled) {
                    event.preventDefault();
                    return;
                }

                event.stopPropagation();
                emit('click', props.modelValue === State.checked ? State.uncheck : State.checked, event);
                emit('change', props.modelValue === State.checked ? State.uncheck : State.checked, event);
                emit('update:modelValue', props.modelValue === State.checked ? State.uncheck : State.checked);
            };

            // 获取最上级的Class
            const classNames = ['m-checkbox'];
            classNames.push('text')

            const style: StyleValue & any = {
                "--size": `${props.size}px`,
            }

            // 添加边框
            const CheckboxProps = {
                ...attrs,
                onClick,
                class: classNames,
                style
            };

            if (props.disabled) classNames.push('disabled');

            // 添加checkbox 的状态和类型
            const checkboxClass = ['checkbox', props.modelValue];

            let icon = null;
            let size = props.size - 6;
            if (props.modelValue === State.uncheck) {
                checkboxClass.push('border-gray')
                checkboxClass.push('bg-white')
            } else if (props.modelValue === State.checked) {
                // icon = <IconMeriActionDone size={size}></IconMeriActionDone>
                //ux演示需要临时更改icon
                icon = (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" rx="2" fill="#246FE5"/>
                <path d="M7.06737 8.75741L11.8182 4.00663L12.8788 5.06729L7.06737 10.8787L3.84481 7.65617L4.90547 6.59551L7.06737 8.75741Z" fill="white"/>
                </svg>)
                checkboxClass.push('bg-blue')
            } else if (props.modelValue === State.notNull) {
                // icon = <IconMeriActionMinus size={size}></IconMeriActionMinus>
                //ux演示需要临时更改icon
                icon = (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" rx="2" fill="#246FE5"/>
                <rect x="4" y="7.25" width="8" height="1.5" fill="white"/>
                </svg>
                )
                checkboxClass.push('bg-blue')
            }

            return (
                <div {...CheckboxProps}>
                    <span class={checkboxClass}>
                        {icon}
                    </span>
                    {slots.default?.()}
                </div>
            )
        }
    }
})
export default Checkbox;