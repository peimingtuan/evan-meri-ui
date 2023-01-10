/*
 * @Description: 日选择
 */
import dayjs from 'dayjs';
import _ from 'lodash';
import {defineComponent, h, PropType, computed, ref, watch} from 'vue';
import {IconMeriComponentArrowLeft, IconMeriComponentArrowRight} from "meri-icon";
import MSelect from "../../../select";
import {helpGetIsRange, helpGetRangeSelectResult, helpGetDefaultValue, helpGetTdCurrentClassName} from './dateTool';
import {DaterangePanelProps} from './DaterangePanelProps'

const DateTypePanel = defineComponent({
    name: "DateTypePanel",
    props: DaterangePanelProps,
    emits: ['change', 'handleMouseenter'],
    components: {
        IconMeriComponentArrowLeft,
        IconMeriComponentArrowRight,
        MSelect
    },
    setup: function (props, {slots, attrs, emit}) {
        // 当前年
        const currentYear = new Date().getFullYear();
        // 当前月
        const currentMonth = new Date().getMonth() + 1;
        // 看板选中年份 - 默认选中当前年
        let selectedYear = ref(currentYear.toString());
        // 看板选中月份 - 默认选中当前月
        let selectedMonth = ref(currentMonth.toString());
        // 看板选中日
        let selectedDate = ref();
        // 当前选中结果
        let selectedResult = ref('');
        // 周列表
        const weeks = ['日', '一', '二', '三', '四', '五', '六'];
        // 区间 - 开始时间选中结果
        const startTimeResult = ref('');
        // 区间 - 结束时间选中结果
        const endTimeResult = ref('');

        // 范围 - 结束日期年、月下拉框选中项
        if (props.isRange && props.rangeType === 'end') {
            selectedMonth.value = (currentMonth + 1).toString();
        }

        // 设置默认选中项
        let {
            year,
            month,
            date,
            singleResult,
            start,
            end,
        } = helpGetDefaultValue(attrs.modelValue as string, props.isRange, props.selectTime, props.selectResult.startTime, 'YYYY.MM.DD');

        year && (selectedYear.value = year);
        month && (selectedMonth.value = month);
        date && (selectedDate.value = date);
        if (props.isRange) {
            startTimeResult.value = start;
            endTimeResult.value = end;
        } else {
            selectedResult.value = singleResult;
        }

        // 帮助 - 是否是今天
        const helpGetIsToday = (day: string) => {
            const selectedDay = dayjs(`${selectedYear.value}.${selectedMonth.value}.${day}`).format('YYYY.MM.DD');
            return day && (dayjs().format('YYYY.MM.DD')) === selectedDay;
        }

        // 帮助 - 是否是当前选中天
        const helpGetIsCurrent = (day: string) => {
            const currentDay = dayjs(`${selectedYear.value}.${selectedMonth.value}.${day}`).format('YYYY.MM.DD');
            if (!props.isRange) {
                return day && (selectedResult.value === currentDay);
            }
            return day && (startTimeResult.value === currentDay || endTimeResult.value === currentDay);
        }

        /*计算属性 - start*/
        // 年份列表
        let years = computed(() => {
            let list = [];
            for (let i = 1900; i <= 2050; i++) {
                list.push({id: i.toString(), name: `${i}年`});
            }
            return list;
        })
        // 月份列表
        let months = computed(() => {
            let list = [];
            for (let i = 1; i <= 12; i++) {
                list.push({id: i.toString(), name: `${i}月`});
            }
            return list;
        })
        // 某一月的日列表
        let rows = computed(() => {
            // 当前选中月的最后一天
            const monthEndDay = dayjs(`${selectedYear.value}.${selectedMonth.value}.01`).endOf('month').date()
            // 选中月第一天为周几
            const firstDayWeek = dayjs(`${selectedYear.value}.${selectedMonth.value}.01`).day();
            let list = [];
            for (let i = 0; i < 42; i++) {
                // 前后补充空格
                if (firstDayWeek > i || monthEndDay + firstDayWeek <= i) {
                    list.push('');
                } else {
                    const dayItem = i + 1 - firstDayWeek;
                    list.push(dayItem < 10 ? `0${dayItem}` : (dayItem).toString());
                }
            }
            // 修改为二维数组
            return _.chunk(list, 7);
        });
        /*计算属性 - end*/

        // 监听绑定值的变化
        watch(() => attrs.modelValue, (newValue: any, oldValue: any) => {
            selectedResult.value = newValue;
        })

        // 监听开始、结束时间(区间)
        watch(() => props.selectTime, (newValue: any, oldValue: any) => {
            if (props.isRange) {
                startTimeResult.value = newValue.startTime;
                endTimeResult.value = newValue.endTime;
            }
        }, {deep: true})

        /*事件 - 开始*/
        // 事件 - 天选中事件
        const handleDayClick = (day: string, event: Event) => {
            selectedDate.value = day;
            const selectValue = dayjs(`${selectedYear.value}.${selectedMonth.value}.${day}`).format('YYYY.MM.DD');
            if (!props.isRange) {
                // 1. 单选
                selectedResult.value = selectValue;
                emit('change', selectValue, event);
            } else {
                // 2. 时间区间
                const {
                    startTime,
                    endTime
                } = helpGetRangeSelectResult(startTimeResult.value, endTimeResult.value, selectValue);
                emit('change', {startTime, endTime}, selectValue);
            }
        }
        // 事件 - 年份切换
        const handleYearChange = (type: string) => {
            const year = parseInt(selectedYear.value);
            if (type === 'minus' && year > 1900) {
                selectedYear.value = (year - 1).toString();
            }
            if (type === 'add' && year < 2050) {
                selectedYear.value = (year + 1).toString();
            }
        }
        // 事件 - 月份切换
        const handleMonthChange = (type: string) => {
            const month = parseInt(selectedMonth.value);
            if (type === 'minus' && month > 1) {
                selectedMonth.value = (month - 1).toString();
            }
            if (type === 'add' && month < 12) {
                selectedMonth.value = (month + 1).toString();
            }
        }

        // 事件(区间) - 单元格鼠标移入事件
        const handleDayMouseenter = (day: string) => {
            const {startTime, endTime} = props.selectResult || {};
            if (!props.isRange || (startTime && endTime)) return;

            if (day) {
                let hoverLastValue = dayjs(`${selectedYear.value}.${selectedMonth.value}.${day}`).format('YYYY.MM.DD');
                emit('handleMouseenter', hoverLastValue)
            }
        }

        /*事件 - 结束*/

        const renderUI = () => {
            // 年下拉框插槽内容
            const yearSelectSlot = {
                trigger: (scope: any) => {
                    return (
                        <div
                            ref='yearSelect'
                            class='year__select'
                        >
                            {scope.list.map((o: any) => {
                                return (<span
                                    key={o.id}
                                    class="select-item"
                                >{o.name}</span>)
                            })}
                        </div>
                    )
                }
            }

            // 月下拉插槽内容
            const monthSelectSlot = {
                trigger: (scope: any) => {
                    return (
                        <div
                            ref='monthSelect'
                            class='month__select'
                        >
                            {scope.list.map((o: any) => {
                                return (<span
                                    key={o.id}
                                    class="select-item"
                                >{o.name}</span>)
                            })}
                        </div>
                    )
                }
            }


            // UI - 下版内容
            const contentUI = (
                <div class='m-date-panel__content'>
                    <div class={['m-date-panel__content_header date']}>
                        {/*切换年*/}
                        <div class='year'>
                            <IconMeriComponentArrowLeft
                                color='#8B949E'
                                hoverColor='#246FE5'
                                onClick={() => {
                                    handleYearChange('minus')
                                }}
                            />
                            <MSelect
                                menuSize="min"
                                v-slots={yearSelectSlot}
                                v-model={selectedYear.value}
                                options={years.value}
                            />
                            <IconMeriComponentArrowRight
                                color='#8B949E'
                                hoverColor='#246FE5'
                                onClick={() => {
                                    handleYearChange('add')
                                }}
                            />
                        </div>

                        {/*切换月*/}
                        <div class='month'>
                            <IconMeriComponentArrowLeft
                                color='#8B949E'
                                hoverColor='#246FE5'
                                onClick={() => {
                                    handleMonthChange('minus')
                                }}
                            />
                            <MSelect
                                menuSize="min"
                                v-slots={monthSelectSlot}
                                v-model={selectedMonth.value}
                                options={months.value}
                            />
                            <IconMeriComponentArrowRight
                                color='#8B949E'
                                hoverColor='#246FE5'
                                onClick={() => {
                                    handleMonthChange('add')
                                }}
                            />
                        </div>

                    </div>
                    <div class='m-date-panel__content_body'>
                        <table
                            cellspacing='0'
                            cellpadding='0'
                        >
                            <tr>{weeks.map(o => (<th>{o}</th>))}</tr>
                            {
                                rows.value.map(o => {
                                    return (
                                        <tr>
                                            {o.map(tdItem => (<td
                                                class={[helpGetIsRange(
                                                    tdItem ? `${selectedYear.value}.${selectedMonth.value}.${tdItem}` : "",
                                                    props.selectResult,
                                                    props.hoverLastValue,
                                                    props.rangeType,
                                                    'YYYY.MM.DD'
                                                ) ? 'range' : '',
                                                    helpGetTdCurrentClassName(
                                                        props.isRange,
                                                        props.selectResult,
                                                        `${selectedYear.value}.${selectedMonth.value}.${tdItem}`
                                                    )
                                                ]}
                                            >
                                                <div
                                                    class={['date-node',
                                                    ]}
                                                >
                                                    <span
                                                        class={[
                                                            "date-node__text",
                                                            helpGetIsToday(tdItem) && 'today',
                                                            helpGetIsCurrent(tdItem) && 'current'
                                                        ]}
                                                        onClick={(event: Event) => {
                                                            handleDayClick(tdItem, event)
                                                        }}
                                                        onMouseenter={() => {
                                                            handleDayMouseenter(tdItem)
                                                        }}
                                                    >{tdItem}</span>
                                                    {helpGetIsToday(tdItem) && <span class='date-node__dot'></span>}
                                                </div>
                                            </td>))}
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div class='m-date-picker__content_footer'></div>
                </div>
            )
            return (
                <div
                    class={[
                        'm-date-panel',
                    ]}
                >
                    {contentUI}
                </div>
            )
        }
        return {
            renderUI,
            selectedYear,
            selectedMonth
        }
    },
    render() {
        return this.renderUI();
    }
})
export default DateTypePanel;