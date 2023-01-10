/*
 * @Description: 年选择
 */
import _ from 'lodash';
import {defineComponent, h, PropType, computed, ref, watch} from 'vue';
import {IconMeriComponentArrowLeft, IconMeriComponentArrowRight} from "meri-icon";
import MSelect from "../../../select";
import {helpGetDefaultValue, helpGetIsRange, helpGetRangeSelectResult,helpGetTdCurrentClassName} from './dateTool';
import {DaterangePanelProps} from './DaterangePanelProps'

const YearTypePanel = defineComponent({
    name: "YearTypePanel",
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
        let lastNumber = parseInt([...(currentYear.toString())].pop() as string);
        // 顶部选中的年份 - 默认选中当前年
        let bannerSelectedYear = ref(currentYear);
        // 看板选中年份 - 默认选中当前年
        let selectedYear = ref(currentYear.toString());
        // 当前选中结果
        let selectedResult = ref();
        // 区间 - 开始时间选中结果
        const startTimeResult = ref('');
        // 区间 - 结束时间选中结果
        const endTimeResult = ref('');

        // 范围 - 结束日期年、月下拉框选中项
        if (props.isRange && props.rangeType === 'end') {
            bannerSelectedYear.value = bannerSelectedYear.value + 10;
        }

        // 设置默认选中项
        let {
            year,
            singleResult,
            start,
            end,
        } = helpGetDefaultValue(attrs.modelValue as string, props.isRange, props.selectTime, props.selectResult.startTime, 'YYYY');

        year && (selectedYear.value = year);
        if (props.isRange) {
            startTimeResult.value = start;
            endTimeResult.value = end;
        } else {
            selectedResult.value = singleResult;
        }

        // 设置顶部年份显示 - 由当前选中项决定
        year && (bannerSelectedYear.value = _.floor(parseInt(year), -1) + lastNumber);

        /*计算属性 - start*/
        // 年份列表
        let years = computed(() => {
            let list = [];
            for (let i = 1900; i <= 2050; i++) {
                list.push({id: i.toString(), name: `${i}年`});
            }
            return list;
        })
        // 行数据，展示10年，如（2020-2029年）
        let rows = computed(() => {
            let startYear = _.floor(bannerSelectedYear.value, -1);
            let endYear = startYear + 9;
            let list = [];
            for (let i = startYear; i <= endYear; i++) {
                list.push({
                    id: i.toString(),
                    name: `${i}年`
                })
            }
            return _.chunk(list, 3);
        })
        // banner顶部显示的文案
        let bannerYearText = computed(() => {
            let startYear = _.floor(bannerSelectedYear.value, -1);
            let endYear = startYear + 9;
            return `${startYear}年 - ${endYear}年`;
        })
        /*计算属性 - end*/

        // 监听开始、结束时间
        watch(() => props.selectTime, (newValue: any, oldValue: any) => {
            if (props.isRange) {
                startTimeResult.value = newValue.startTime;
                endTimeResult.value = newValue.endTime;
            }
        }, {deep: true})

        // 帮助 - 当前选中项
        let helpGetIsCurrent = (value: string) => {
            // 1. 单选
            if (!props.isRange) {
                return selectedResult.value === value
            } else {
                // 2. 多选
                return props.selectTime.startTime === value || props.selectTime.endTime === value;
            }
        }

        /*事件 - 开始*/
        // 事件 - 年份切换
        const handleYearChange = (type: string) => {
            let startYear = _.floor(bannerSelectedYear.value, -1);
            let endYear = startYear + 9;
            if (type === 'minus' && startYear > 1900) {
                bannerSelectedYear.value = bannerSelectedYear.value - 10;
            }
            if (type === 'add' && endYear < 2049) {
                bannerSelectedYear.value = bannerSelectedYear.value + 10;
            }
        }
        // 事件 - 年点击
        const handleYearClick = (value: string) => {
            // 1. 单选
            if (!props.isRange) {
                selectedResult.value = value;
                emit('change', value);
            } else {
                // 2. 时间区间
                const {startTime, endTime} = helpGetRangeSelectResult(startTimeResult.value, endTimeResult.value, value)
                emit('change', {startTime, endTime}, value);
            }
        }
        // 事件 - 单元格鼠标移入事件
        const handleDayMouseenter = (value: string) => {
            const {startTime, endTime} = props.selectResult || {};
            if (!props.isRange || (startTime && endTime)) return;

            if (value) {
                emit('handleMouseenter', value)
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
                            {/*<MSelect*/}
                            {/*    menuSize="min"*/}
                            {/*    v-slots={yearSelectSlot}*/}
                            {/*    v-model={selectedYear.value}*/}
                            {/*    options={years.value}*/}
                            {/*/>*/}
                            <span>{bannerYearText.value}</span>
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
                                                        tdItem.id,
                                                        props.selectResult,
                                                        props.hoverLastValue,
                                                        props.rangeType,
                                                        'YYYY') ? 'range' : '',
                                                        helpGetTdCurrentClassName(
                                                            props.isRange,
                                                            props.selectResult,
                                                            tdItem.id
                                                        )
                                                    ]}
                                                >
                                                    <div class={['year-node']}>
                                                        <span
                                                            class={[
                                                                'year-node__text',
                                                                (tdItem && tdItem.id === currentYear.toString()) && 'today',
                                                                (tdItem && helpGetIsCurrent(tdItem.id)) && 'current'
                                                            ]}
                                                            onClick={() => {
                                                                handleYearClick(tdItem.id)
                                                            }}
                                                            onMouseenter={() => {
                                                                handleDayMouseenter(tdItem.id)
                                                            }}
                                                        >{tdItem.name}</span>
                                                        {tdItem && tdItem.id === currentYear.toString() &&
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
        }
    },
    render() {
        return this.renderUI();
    }
})
export default YearTypePanel;