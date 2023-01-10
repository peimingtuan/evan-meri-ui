/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-22 20:54:16
 * @Description: 时间组件
 */
import { defineComponent, h, ref, watch, computed } from 'vue';
import { TimePickerPanelProps } from './TimePickerProps';
import TimeSelect from './TimeSelect'
import { usePreTime } from '../utiles';
const TimePickerPanel = defineComponent({
    name: "TimePickerPanel",
    props: TimePickerPanelProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { slots, attrs, emit }) {
        const initStartTime = ref('');
        const initEndtTime = ref('');
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
                    initStartTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime, props.stepH, props.stepM, props.stepS).starttime;
                    initEndtTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime, props.stepH, props.stepM, props.stepS).endtime;
                } else {
                    initStartTime.value = usePreTime(props.format, props.range, props.currentTime, props.scopeTime, props.stepH, props.stepM, props.stepS).starttime;
                }
            }

        }
        watch(
            () => props.modelValue,
            () => {
                initTime()
            }, {
            immediate: true
        }
        )
        const change = () => {
            const time = props.range ? initStartTime.value + '-' + initEndtTime.value : initStartTime.value;
            emit('change', time)
            emit('update:modelValue', time)
        }
        return () => {
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
            return (
                <div class="m-timepicker-window">
                    <div ref="popup" class="m-time-picker-main m-timepicker-menu m-time-picker-panel" style={{ ...dropWidth.value }}>
                        <div class="m-time-picker-main-content">
                            <TimeSelect {...props} v-model={initStartTime.value}  onChange={change}></TimeSelect>
                            {props.range ? <div class="m-time-picker-driver"></div> : null}
                            {props.range ? <TimeSelect {...props} v-model={initEndtTime.value} onChange={change}></TimeSelect> : null}
                        </div>
                    </div>

                </div>
            )
        }
    }
})
export default TimePickerPanel;