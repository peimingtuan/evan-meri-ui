/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-10 15:20:57
 * @Description: 时间组件
 */
import { defineComponent, h, PropType, StyleValue } from 'vue';
import { TimePickerProps } from './TimePickerProps';
import TimePickerTrigger from './TimePickerTrigger';

const TimePicker = defineComponent({
    name: "TimePicker",
    components: {
		TimePickerTrigger,
	},
    props: TimePickerProps,
    emits: ['change','update:modelValue'],
    setup(props, { slots, attrs, emit }) {
        const change = (v:string) => {
            emit('change',v)
            emit('update:modelValue', v)
        }
        const classNames = ['m-time-picker']
			
        return () => {
            return (
                <div ref="target" class={classNames}>
					<TimePickerTrigger v-model={props.modelValue} {...props} onChange={change}></TimePickerTrigger>
				</div>
            )
        }
    }
})
export default TimePicker;