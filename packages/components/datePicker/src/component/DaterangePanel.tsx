// @ts-nocheck
/*
 * @Description: 日期选择器
 */
import dayjs from "dayjs";
import _ from "lodash";
import {defineComponent, h, PropType, computed, ref} from 'vue';
import MButton from '../../../button';
import DateTypePanel from "./DateTypePanel";
import MonthTypePanel from "./MonthTypePanel";
import YearTypePanel from "./YearTypePanel";
import TimePickerPanel from '../../../timepicker/src/TimePickerPanel'
import {typeList,IRangeSelectTime} from "../DatePickerProps";

const DaterangePanel = defineComponent({
    name: "DaterangePanel",
    props: {
        // 日期范围类型
        type: {
            type: String,
            default: 'date'
        },
        // 时间点格式类型
        timeFormat: {
            type: String,
            default: 'hms'
        }
    },
    emits: ['change', 'cancle'],
    components: {
        MButton,
        DateTypePanel,
        MonthTypePanel,
        YearTypePanel,
        TimePickerPanel
    },
    setup(props, {slots, attrs, emit}) {
        // 选中类型：1. 全部在开始面板；2. 全部在结束面板；3. 一个在开始面板、一个在结束面板
        let firstPanel = ref({startTime: '', endTime: ''});
        let secondPanel = ref({startTime: '', endTime: ''});
        // 鼠标hover的最后一个时间点
        let hoverLastValue = ref('');
        // 天 + 时间点 - 范围 - 是否显示选择时间
        let isShowTimePicker = ref(false);
        // 天 + 时间点 - 范围 - 绑定的时间
        let timeValue = ref('');

        /*计算属性 - start*/
        // 最终的选中结果
        const selectResult = computed(() => {
            const fStart = firstPanel.value.startTime;
            const fEnd = firstPanel.value.endTime;
            const sStart = secondPanel.value.startTime;
            const sEnd = secondPanel.value.endTime;
            const resultList = [fStart, fEnd, sStart, sEnd].filter(o => o && o.length);
            const startTime = resultList.length ? resultList[0] : '';
            const endTime = resultList.length > 1 ? resultList[1] : '';
            return {
                startTime,
                endTime,
                // 开始、结束时间都已被选中时， "allFirst"：选中项都在第一个面板；'allSecond'：选中项都在第二个面板
                type: (startTime && endTime) ? (fStart && fEnd ? 'allFirst' : (sStart && sEnd ? 'allSecond' : '')) : '',
            }
        })

        // 日期范围类型
        const dateType = computed(() => {
            let type = '';
            switch (props.type) {
                case typeList.DATERANGE:
                    type = typeList.DATE;
                    break;
                case typeList.DATETIMERANGE:
                    type = isShowTimePicker.value ? 'timepicker' : typeList.DATE;
                    break;
                case typeList.MONTHRANGE:
                    type = typeList.MONTH;
                    break;
                case typeList.YEARRANGE:
                    type = typeList.YEAR;
                    break;
                default:
                    return;
            }
            const dateType = {
                [typeList.DATE]: DateTypePanel,
                [typeList.YEAR]: YearTypePanel,
                [typeList.MONTH]: MonthTypePanel,
                timepicker: TimePickerPanel,
            }
            return dateType[type];
        })
        /*计算属性 - end*/

        // 设置默认选中项
        const modelValue = (attrs.modelValue || '') as string;
        const timeList = modelValue.split('-');
        const startTime = timeList.length ? timeList[0] : '';
        const endTime = timeList.length > 1 ? timeList[1] : '';
        if (dayjs(startTime).isValid() && dayjs(endTime).isValid()) {
            let start = '';
            let end = '';
            if (props.type === typeList.DATETIMERANGE) {
                // 3. 天 + 时间点
                const sList = startTime.split(' ');
                const eList = endTime.split(' ');
                const sd = sList.length ? sList[0] : '';
                const st = sList.length > 1 ? sList[1] : '';
                const ed = eList.length ? eList[0] : '';
                const et = eList.length > 1 ? eList[1] : '';
                const startMonth = dayjs(sd).format('YYYY.MM');
                const endMonth = dayjs(ed).format('YYYY.MM');
                st && et && (timeValue.value = `${st}-${et}`);
                if (startMonth === endMonth) {
                    firstPanel.value = {startTime: sd, endTime: ed}
                } else {
                    firstPanel.value = {startTime: sd, endTime: ''};
                    secondPanel.value = {startTime: ed, endTime: ''};
                }
            } else {
                // 1. 年
                if (props.type === typeList.YEARRANGE) {
                    start = _.floor(parseInt(startTime), -1).toString();
                    end = _.floor(parseInt(endTime), -1).toString();
                } else {
                    // 2. 日、月
                    let formatType = 'YYYY.MM';
                    props.type === typeList.MONTHRANGE && (formatType = 'YYYY');
                    start = dayjs(startTime).format(formatType);
                    end = dayjs(endTime).format(formatType);
                }
                // 1. 选中项在同一个看板上：年、月相同
                if (start === end) {
                    firstPanel.value = {startTime, endTime}
                } else {
                    // 2. 选中项在两个不同的看板上，年月不同
                    firstPanel.value = {startTime, endTime: ''};
                    secondPanel.value = {startTime: endTime, endTime: ''};
                }
            }
        }


        // 帮助方法 - 开始时间、结束时间选中数量
        const helpGetSelectCount = (count: number) => {
            const resultList = [firstPanel.value.startTime, firstPanel.value.endTime, secondPanel.value.startTime, secondPanel.value.endTime];
            return resultList.filter(o => o && o.length).length === count;
        }



        // 事件 - 第一个面板选中
        const handleFirstPanelChange = (value: object, selectValue: string) => {
            if (helpGetSelectCount(2)) {
                // 清空第二个面板选中项
                secondPanel.value = {startTime: '', endTime: ''};
                firstPanel.value = {startTime: selectValue, endTime: ''};
                // 重置hover值
                hoverLastValue.value = '';
            } else {
                firstPanel.value = value as IRangeSelectTime;
            }
        }
        // 事件 - 第二个面板选中
        const handleSecondPanelChange = (value: object, selectValue: string) => {
            if (helpGetSelectCount(2)) {
                firstPanel.value = {startTime: '', endTime: ''};
                secondPanel.value = {startTime: selectValue, endTime: ''};
                // 重置hover值
                hoverLastValue.value = '';
            } else {
                secondPanel.value = value as IRangeSelectTime;
            }
        }

        // 事件 - 时间mouseenter
        const handleMouseenter = (value: string) => {
            hoverLastValue.value = value;
        }

        // 事件 - 确定
        const handleConfim = (event: Event) => {
            const {startTime, endTime} = selectResult.value;
            let startResult = startTime;
            let endResult = endTime;
            if (startTime && endTime) {
                // 时间点拼接
                if (props.type === typeList.DATETIMERANGE) {
                    let start = startTime;
                    let end = endTime;
                    // 是否选择了时间点
                    if (timeValue.value && timeValue.value.split('-').length > 1) {
                        let st = timeValue.value.split('-')[0];
                        let et = timeValue.value.split('-')[1];
                        start = `${startTime} ${st}`;
                        end = `${endTime} ${et}`;
                    }
                    const {timeFormat} = props;
                    let format = 'YYYY.MM.DD HH:mm:ss';
                    if (timeFormat === 'hm') {
                        format = 'YYYY.MM.DD HH:mm'
                    } else if (props.timeFormat === 'h') {
                        format = 'YYYY.MM.DD HH';
                    }
                    startResult = dayjs(start).format(format);
                    endResult = dayjs(end).format(format);
                }
                // 开始时间>结束时间，调换选中结果
                if (startResult > endResult) {
                    emit('change', `${endResult}-${startResult}`, event);
                } else {
                    emit('change', `${startResult}-${endResult}`, event);
                }
            }
        }

        // 事件 - 取消
        const handleCancle = () => {
            emit('cancle');
        }

        // 事件 - 选择时间
        const handleTimePickerSwitch = () => {
            isShowTimePicker.value = !isShowTimePicker.value;
        }

        const renderUI = () => {
            return (
                <div
                    class={[
                        'm-date-range-panel',
                    ]}
                >
                    {isShowTimePicker.value ? (<div class='m-date-range-panel__content'>
                            (<TimePickerPanel
                            range
                            format={props.timeFormat}
                            v-model={timeValue.value}
                        />)
                        </div>) :
                        (<div class='m-date-range-panel__content'>
                            {
                                h(dateType.value, {
                                    key: '1',
                                    rangeType: 'start',
                                    isRange: true,
                                    selectTime: firstPanel.value,
                                    selectResult: selectResult.value,
                                    hoverLastValue: hoverLastValue.value,
                                    onChange: handleFirstPanelChange,
                                    onHandleMouseenter: handleMouseenter,
                                })
                            }
                            {
                                h(dateType.value, {
                                    key: '2',
                                    rangeType: 'end',
                                    isRange: true,
                                    selectTime: secondPanel.value,
                                    selectResult: selectResult.value,
                                    hoverLastValue: hoverLastValue.value,
                                    onChange: handleSecondPanelChange,
                                    onHandleMouseenter: handleMouseenter,
                                })
                            }
                        </div>)
                    }
                    <div class='m-date-range-panel__operate'>
                        {typeList.DATETIMERANGE === props.type &&
                        <span
                            class='m-date-range-panel__operate_time'
                            onClick={handleTimePickerSwitch}
                        >{!isShowTimePicker.value ? '选择时间' : '选择日期'}</span>}
                        <div class='m-date-range-panel__operate_btn'>
                            <MButton onClick={handleCancle} size="small">取消</MButton>
                            <MButton
                                type="primary"
                                size="small"
                                onClick={(event: Event) => {
                                    handleConfim(event)
                                }}
                            >确定</MButton>
                        </div>
                    </div>
                </div>
            )
        }
        return {
            renderUI,
            selectResult,
            dateType,
            isShowTimePicker
        }
    },
    render() {
        return this.renderUI();
    }
})
export default DaterangePanel;