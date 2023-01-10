// @ts-nocheck
/*
 * @Description: 日、时间点组件
 */
import {defineComponent, h, PropType, computed, ref} from 'vue';
import DateTypePanel from "./DateTypePanel";
import MButton from '../../../button';
import TimePickerPanel from '../../../timepicker/src/TimePickerPanel'
import dayjs from "dayjs";
import { helpGetTimeFormat } from './dateTool';

const DatetimePanel = defineComponent({
    name: "DatetimePanel",
    props: {
        timeFormat: {
            type: String,
            default: 'hms'
        }
    },
    emits: ['change', 'cancle'],
    components: {
        DateTypePanel,
        MButton,
        TimePickerPanel,
    },
    setup(props, {slots, attrs, emit}) {
        // 当前选中的时间点
        const timeResult = ref('');
        // 当前选中的日期
        const dateResult = ref('');

        // 事件 - 时间点变更
        const handleTimeChange = (value: string) => {
            timeResult.value = value;
        }

        // 设置默认选中项
        const modelValue = attrs.modelValue || '';
        if (modelValue && dayjs(modelValue).isValid()) {
            dateResult.value = dayjs(modelValue).format('YYYY.MM.DD');
            timeResult.value = dayjs(modelValue).format(helpGetTimeFormat(props.timeFormat));
        }

        // 事件 - 日期变更
        const handleDateChange = (value: string) => {
            dateResult.value = value;
        }
        // 事件 - 确定
        const handleConfim = (event: Event) => {
            if (!timeResult.value) return;
            emit('change', `${dateResult.value} ${timeResult.value}`, event);
        }
        // 事件 - 取消
        const handleCancle = () => {
            emit('cancle');
        }
        const renderUI = () => {
            return (
                <div
                    class={[
                        'm-date-time-panel',
                    ]}
                >
                    <div class='m-date-time-panel__content'>
                        <DateTypePanel
                            v-model={dateResult.value}
                            onChange={handleDateChange}
                        />
                        <div class='time-picker'>
                            <div class='time-picker__banner'>选择时间</div>
                            <TimePickerPanel
                                v-model={timeResult.value}
                                format={props.timeFormat}
                                onChange={handleTimeChange}
                            />
                        </div>
                    </div>
                    <div class='m-date-time-panel__btn'>
                        <MButton
                            size="small"
                            class='m-date-time-panel__btn_cancel'
                            onClick={handleCancle}
                        >取消</MButton>
                        <MButton
                            type="primary"
                            size="small"
                            onClick={(event: Event) => {
                                handleConfim(event)
                            }}
                        >确定</MButton>
                    </div>
                </div>
            )
        }
        return {
            renderUI,
        }
    },
    render() {
        return this.renderUI();
    }
})
export default DatetimePanel;