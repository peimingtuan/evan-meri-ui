// @ts-nocheck
/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-17 10:27:40
 * @Description: 时间组件
 */
import { defineComponent, h, PropType, StyleValue, ref, Teleport, Transition, watch, computed, onMounted } from 'vue';
import { TimePickerTriggerProps } from './TimePickerProps';
import { IconMeriActionTime, IconMeriComponentCancel } from 'meri-icon'
import { usePopupStyle } from './usePopupStyle'
import { templateRef, onClickOutside } from '@vueuse/core';
import TimeSelect from './TimeSelect'
import { usePreTime } from '../utiles';
import Button from '../../button/src/Button'
import { Size } from '../../utils/types'
import { ButtonType } from '../../button/src/ButtonProps'
const TimePickerTrigger = defineComponent({
    name: "TimePickerTrigger",
    props: TimePickerTriggerProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { slots, attrs, emit }) {
        const initStartTime = ref('');
        const initEndtTime = ref('');
        // 当前组件
        const target = templateRef<HTMLElement>('target', null)
        // 当前显示的弹窗
        const refPopup = templateRef<HTMLElement>('popup', null)
        let clearStatus = ref<boolean>(false)
        // 私有的展开收齐状态
        const selfOpen = ref(false);
        const initTime = () => {
            if (props.modelValue) {
                if (props.range) {
                    initStartTime.value = props.modelValue.split('-')[0];
                    initEndtTime.value = props.modelValue.split('-')[1]
                } else {
                    initStartTime.value = props.modelValue
                }
            } else {
                if (props.range) {
                    initStartTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).starttime;
                    initEndtTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).endtime;
                } else {
                    initStartTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).starttime;
                }
            }

        }
        watch(selfOpen, () => {
            if (selfOpen.value) {
                // emit()
                

            } else {
                // refTrigger.value.blur()
                // handleCancel()
                // emit('blur')
            }
        })
        watch(
            () => props.modelValue,
            () => {
                initTime()
            }, {
            immediate: true
        }
        )
        // 点击外部，
        onClickOutside(
            target,
            event => {
                selfOpen.value = false;
                initTime()
            },
            { ignore: [refPopup] }
        )

        const handleClickTrigger = (event: Event) => {
            if (props.disabled) {
                event.preventDefault()
                return
            }
            selfOpen.value = !selfOpen.value

        }
        //确认事件
        const handleConfirm = () => {
            const time = props.range ? initStartTime.value + '-' + initEndtTime.value : initStartTime.value
            emit('change', time)
            emit('update:modelValue', time)
            selfOpen.value = false;
        }
        // 取消事件
        const handleCancel = () => {
            selfOpen.value = false;
            initTime()
            // emit('cancel')
        }

        //清空事件
        const clearTime = (e: Event) => {
            e.stopPropagation()
            emit('change', '')
            emit('update:modelValue', '')
            selfOpen.value = false;
        }
        const { windowStyle } = usePopupStyle(target, { topOffset: 8,align: props.placement, level: 'Left' })
        const classNames = ref(new Set(['m-time-picker-trigger']));


        return () => {
            if (props.disabled) {
                classNames.value.add('disabled')
            } else {
                classNames.value.delete('disabled')
            }
            if (props.errorText) {
                classNames.value.add('errortext')
            } else {
                classNames.value.delete('errortext')
            }
            const showClearIcon = () => {
                if (props.modelValue && !props.hideClear) {
                    clearStatus.value = true;
                } else {
                    clearStatus.value = false;
                }

            }
            const hiddenClearIcon = () => {
                clearStatus.value = false;
            }
            const lefticon = (
                <span class="m-time-picker-trigger-left">
                    <IconMeriActionTime></IconMeriActionTime>
                </span>
            )
            const content = (
                <div class="m-time-picker-trigger-center" >
                    {props.modelValue || selfOpen.value ? 
                    <div class="m-time-picker-trigger-center" style={{ color: selfOpen.value ? `var(--gray-500)` : `var(--gray-900)` }}>
                        {initStartTime.value}
                        {props.range ? (<span class="">-</span>) : null}
                        {initEndtTime.value}
                    </div>: props.placeholder?(<span class="m-time-picker-trigger-place">{props.placeholder}</span>):null}
                </div>
            )
            const righticon = props.hideClear || props.disabled ? null : (
                <span class="m-time-picker-trigger-left" onClick={clearTime}>
                    {clearStatus.value ? <IconMeriComponentCancel hoverColor={`var(--blue-500)`}></IconMeriComponentCancel> : null}
                </span>
            )
            const dropWidth = computed(() => {
                //如果是单个时间点或者两个
                if (props.format.length !== 3) {
                    return {
                        width: props.range ? '304px' : '140px'
                    }
                } else {
                    return {
                        width: props.range ? '440px' : '208px'
                    }
                }
            })
            //时间段展示分割线
            const driver = props.range ? <div class="m-time-picker-driver"></div> : null
            // 报错信息
            const message = props.errorText ? <span class="message">{props.errorText}</span> : null;
            // window
            const window = (
                <Teleport to="body">
                    <Transition name="m-timepicker-zoom">
                        {selfOpen.value ? (
                            <div
                                class="m-timepicker-window"
                                style={{ ...windowStyle }}
                                placement={windowStyle.placement}
                            >
                                <div ref="popup" class="m-time-picker-main m-timepicker-menu" style={{ ...dropWidth.value }}>
                                    <div class="m-time-picker-main-content">
                                        <TimeSelect {...props} v-model={initStartTime.value}></TimeSelect>
                                        {driver}
                                        {props.range ? <TimeSelect {...props} v-model={initEndtTime.value}></TimeSelect> : null}
                                    </div>
                                    <div class="m-time-picker-main-button">
                                        <Button type={ButtonType.default} size={Size.small} onClick={handleCancel}>
                                            取消
                                        </Button>
                                        <Button type={ButtonType.primary} size={Size.small} onClick={handleConfirm}>
                                            确定
                                        </Button>
                                    </div>
                                </div>

                            </div>
                       ) : null}
                    </Transition>
                </Teleport>
            )
            return (
                <div ref="target" onClick={handleClickTrigger} onMouseenter={showClearIcon} onMouseleave={hiddenClearIcon} class={Array.from(classNames.value)}>
                    {lefticon}
                    {content}
                    {righticon}
                    {message}
                    {window}
                </div>
            )
        }
    }
})
export default TimePickerTrigger;