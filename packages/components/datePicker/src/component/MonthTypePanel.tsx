/*
 * @Description: 月选择
 */
import _ from 'lodash';
import dayjs from "dayjs";
import {defineComponent, h, PropType, computed, ref, watch} from 'vue';
import {IconMeriComponentArrowLeft, IconMeriComponentArrowRight} from "meri-icon";
import MSelect from "../../../select";
import {helpGetDefaultValue, helpGetIsRange, helpGetRangeSelectResult,helpGetTdCurrentClassName} from './dateTool';
import { DaterangePanelProps } from './DaterangePanelProps'

const MonthTypePanel = defineComponent({
    name: "MonthTypePanel",
    props: DaterangePanelProps,
    emits: ['change', 'handleMouseenter'],
    components: {
        IconMeriComponentArrowLeft,
        IconMeriComponentArrowRight,
        MSelect
    },
    setup(props, {slots, attrs, emit}) {
        // 当前年
        const currentYear = new Date().getFullYear();
        // 当前月
        const currentMonth = new Date().getMonth() + 1;
        // 看板选中年份 - 默认选中当前年
        let selectedYear = ref(currentYear.toString());
        // 看板选中月份
        let selectedMonth = ref();
        // 当前选中结果
        let selectedResult = ref();
        // 区间 - 开始时间选中结果
        const startTimeResult = ref('');
        // 区间 - 结束时间选中结果
        const endTimeResult = ref('');

        // 范围 - 结束日期年、月下拉框选中项
        if (props.isRange && props.rangeType === 'end') {
            selectedYear.value = (currentYear + 1).toString();
        }

        // 设置默认选中项
        let {
            year,
            month,
            singleResult,
            start,
            end,
        } = helpGetDefaultValue(attrs.modelValue as string, props.isRange, props.selectTime, props.selectResult.startTime, 'YYYY.MM');

        year && (selectedYear.value = year);
        month && (selectedMonth.value = month);
        if (props.isRange) {
            startTimeResult.value = start;
            endTimeResult.value = end;
        } else {
            selectedResult.value = singleResult;
        }

        // 帮助 - 是否是当前月
        const helpIsCurrentMonth = (month: string) => {
            const current = dayjs(`${currentYear}.${currentMonth}`).format('YYYY.MM');
            const itemDate = dayjs(`${selectedYear.value}.${month}`).format('YYYY.MM');
            return current === itemDate;
        }
        // 帮助 - 是否是选中月
        const helpIsSelectMonth = (month: string) => {
            const item = dayjs(`${selectedYear.value}.${month}.01`).format('YYYY.MM');
            if (!props.isRange) {
                return item === selectedResult.value;
            }
            return startTimeResult.value === item || endTimeResult.value === item;
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
        // 行数据，12个月
        let rows = computed(() => {
            let list = [];
            for (let i = 1; i <= 12; i++) {
                list.push({
                    id: i.toString(),
                    name: `${i}月`
                })
            }
            return _.chunk(list, 3);
        })
        /*计算属性 - end*/

        // 监听绑定值的变化
        watch(() => attrs.modelValue, (newValue: any, oldValue: any) => {
            selectedResult.value = newValue;
        })

        // 监听开始、结束时间
        watch(() => props.selectTime, (newValue: any, oldValue: any) => {
            if (props.isRange) {
                startTimeResult.value = newValue.startTime;
                endTimeResult.value = newValue.endTime;
            }
        }, {deep: true})

        /*事件 - 开始*/
        // 事件 - 年份切换
        const handleYearChange = (type: string) => {
            if (type === 'minus' && parseInt(selectedYear.value) > 1900) {
                selectedYear.value = (parseInt(selectedYear.value) - 1).toString();
            }
            if (type === 'add' && parseInt(selectedYear.value) < 2049) {
                selectedYear.value = (parseInt(selectedYear.value) + 1).toString();
            }
        }
        // 事件 - 月点击
        const handleMonthClick = (value: string) => {
            const result = dayjs(`${selectedYear.value}.${value}.01`).format('YYYY.MM');
            if (!props.isRange) {
                selectedMonth.value = value;
                selectedResult.value = result
                emit('change', result);
            } else {
                // 2. 时间区间
                const {startTime,endTime} = helpGetRangeSelectResult(startTimeResult.value,endTimeResult.value,result);
                emit('change', {startTime, endTime}, result);
            }
        }

        // 事件 - 单元格鼠标移入事件
        const handleDayMouseenter = (value: string) => {
            const {startTime, endTime} = props.selectResult || {};
            if (!props.isRange || (startTime && endTime)) return;

            if (value) {
                let hoverLastValue = dayjs(`${selectedYear.value}.${value}`).format('YYYY.MM');
                emit('handleMouseenter', hoverLastValue)
            }
        }

        /*事件 - 结束*/

        const renderUI = () => {
            // 年下拉框插槽内容
            const yearSelectSlot = {
                trigger: (scope: any) => {
                    return (
                        <div class='year__select'>
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
                    <div class={['m-date-panel__content_header']}>
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
                    </div>
                    <div class='m-date-panel__content_body'>
                        <table>
                            {
                                rows.value.map(o => {
                                    return (
                                        <tr>
                                            {o.map(tdItem => (
                                                <td
                                                    class={[helpGetIsRange(
                                                        tdItem.id ? `${selectedYear.value}.${tdItem.id}` : "",
                                                        props.selectResult,
                                                        props.hoverLastValue,
                                                        props.rangeType,
                                                        'YYYY.MM') ? 'range' : '',
                                                        helpGetTdCurrentClassName(
                                                            props.isRange,
                                                            props.selectResult,
                                                            `${selectedYear.value}.${tdItem.id}`
                                                        )
                                                    ]}
                                                >
                                                    <div class={['year-node']}>
                                                        <span
                                                            class={['year-node__text',
                                                                helpIsCurrentMonth(tdItem.id) && 'today',
                                                                helpIsSelectMonth(tdItem.id) && 'current'
                                                            ]}
                                                            onClick={() => {
                                                                handleMonthClick(tdItem.id)
                                                            }}
                                                            onMouseenter={() => {
                                                                handleDayMouseenter(tdItem.id)
                                                            }}
                                                        >{tdItem.name}</span>
                                                        {helpIsCurrentMonth(tdItem.id) &&
                                                        <span class='year-node__dot'></span>}
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
                        'm-year-panel',
                    ]}
                >
                    {contentUI}
                </div>
            )
        }
        return {
            renderUI,
            selectedYear,
            rows,
        }
    },
    render() {
        return this.renderUI();
    }
})
export default MonthTypePanel;