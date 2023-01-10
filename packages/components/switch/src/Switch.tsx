/*
 * @Description: 开关组件
 */
import {defineComponent, h, PropType} from 'vue';
// @ts-ignore
import {isPromise} from '@vue/shared'
import {SwitchState, SwitchSize} from "./SwitchProps";
import MIcon from "../../icon";

const SwitchProps = {
    // 是否是禁用状态
    disabled: Boolean,
    // 是否处于加载中
    loading: {
        type: Boolean,
        default: false,
    },
    // 当前绑定v-model的值
    modelValue: {
        type: String as PropType<SwitchState>,
        default: SwitchState.uncheck,
    },
    // 大小
    size: {
        type: String as PropType<SwitchSize>,
        default: SwitchSize.default
    },
    beforeChange: Function as PropType<() => Promise<boolean> | boolean>,
}

const Switch = defineComponent({
    name: "Switch",
    props: SwitchProps,
    emits: ['update:modelValue', 'change'],
    components: {
        MIcon,
    },
    setup(props, {slots, attrs, emit}) {
        return () => {
            const handleValueChange = (event: Event | null) => {
                if (props.disabled) return;
                const {uncheck, checked} = SwitchState;
                emit('update:modelValue', props.modelValue === uncheck ? checked : uncheck);
                emit('change', props.modelValue, event);
            }
            // 事件 - 切换
            const handleChange = (event: Event): void => {
                if (props.disabled || props.loading) return;

                const {beforeChange} = props
                if (!beforeChange) {
                    handleValueChange(event)
                    return
                }

                // 返回值必须为promise或bool值
                let handleBeforeChange = beforeChange();
                // 是否是bool类型
                const isBool = (val: unknown): val is boolean => typeof val === 'boolean';
                // 是否是promise或bool类型
                const isLegalType = isPromise(handleBeforeChange) || isBool(handleBeforeChange);
                if (!isLegalType) throw Error('beforeChange must return type `Promise<boolean>` or `boolean`');

                if (isPromise(handleBeforeChange)) {
                    // 类型断言为promise
                    handleBeforeChange = handleBeforeChange as Promise<true>;
                    handleBeforeChange
                        .then((result:any) => {
                            // 返回成功后执行切换
                            if (result) {
                                handleValueChange(event)
                            }
                        })
                        .catch((e:any) => {
                            // 切换失败 - 异步操作reject
                            console.warn(Error(`some error occurred: ${e}`));
                        })
                } else if (handleBeforeChange) {
                    // 返回为true时，直接切换
                    handleValueChange(event);
                }
            }

            return (
                <div
                    class={[
                        'm-switch',
                        props.size === SwitchSize.small ? 'm-switch-small' : '',
                        props.disabled ? 'is-disabled' : '',
                        props.modelValue === SwitchState.checked ? 'is-checked' : '',
                    ]}
                    onClick={handleChange}
                >
                    <div class="m-switch__content">
                        <div class="m-switch__content_circle">
            
                        </div>
                    </div>
                </div>
            )
        }
    }
})
export default Switch;