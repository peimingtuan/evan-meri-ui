// @ts-nocheck
/*
 * @Description: 日期选择器
 */
import {defineComponent, h, PropType, computed, ref, watch, Teleport, Transition} from 'vue';
import {DatePickerProps, typeList} from "./DatePickerProps";
import {IconMeriActionCalendar, IconMeriComponentCancel} from "meri-icon";
import DateTypePanel from "./component/DateTypePanel";
import YearTypePanel from "./component/YearTypePanel";
import MonthTypePanel from "./component/MonthTypePanel";
import DaterangePanel from "./component/DaterangePanel";
import DatetimePanel from "./component/DatetimePanel";
import {onClickOutside, templateRef} from "@vueuse/core";
import {usePopupStyle} from '../../select/src/usePopupStyle';
import MButton from '../../button'

const DatePicker = defineComponent({
    name: "DatePicker",
    props: DatePickerProps,
    emits: ['change', 'update:modelValue', 'visibleChange', 'focus', 'blur', 'clear'],
    components: {
        IconMeriActionCalendar,
        IconMeriComponentCancel,
        DateTypePanel,
        YearTypePanel,
        MonthTypePanel,
        DaterangePanel,
        DatetimePanel,
        MButton
    },
    setup(props, {slots, attrs, emit}) {
        let dateKey = ref(0);
        // 输入框中的选中值
        let inputValue = ref(props.modelValue);

        /*下拉框 - start*/
        // 当前组件
        const target = templateRef<HTMLElement>('target', null);
        const refTrigger = templateRef<HTMLElement>('trigger', null)
        // 当前显示的弹窗
        const refPopup = templateRef<HTMLElement>('popup', null)

        // 私有的展开收齐状态
        const selfOpen = ref(false)

        watch(selfOpen, () => {
            if (selfOpen.value) {
                refTrigger.value.focus()
                emit('focus')
            } else {
                refTrigger.value.blur()
                emit('blur')
            }
        })

        // 事件 - 选择框获取焦点
        const focus = () => {
            selfOpen.value = true
        }
        // 事件 - 选择框失去焦点
        const blur = () => {
            selfOpen.value = false
        }
        // 事件 - 显示下拉面板
        const handleClickTrigger = (event: Event) => {
            if (props.disabled) {
                event.preventDefault()
                return
            }
            refTrigger.value.focus()
            selfOpen.value = !selfOpen.value
            console.log("执行展开事件：", selfOpen.value);
            dateKey.value += 1;
            // 触发下拉框出现/隐藏事件
            emit('visibleChange', selfOpen.value, event);
        }

        // 点击空白处隐藏下拉面板
        onClickOutside(
            target,
            event => {
                if (event.target.className === 'm-select-menu-item-name') return;
                blur()
            },
            {ignore: [refPopup], capture: false}
        )

        const {windowStyle} = usePopupStyle(target, {topOffset: 10, align: props.placement, level: 'Left'});
        /*下拉框 - end*/

        /*计算属性 - start*/
        // 日期类型
        const dateType = computed(() => {
            const dateType = {
                [typeList.DATE]: DateTypePanel,
                [typeList.YEAR]: YearTypePanel,
                [typeList.MONTH]: MonthTypePanel,
                [typeList.DATERANGE]: DaterangePanel,
                [typeList.MONTHRANGE]: DaterangePanel,
                [typeList.YEARRANGE]: DaterangePanel,
                [typeList.DATETIME]: DatetimePanel,
                [typeList.DATETIMERANGE]: DaterangePanel,
            }
            return dateType[props.type];
        })
        // 是否显示clear图标
        const isShowClearIcon = computed(() => {
            return !props.disabled && props.clearable && inputValue.value;
        })
        /*计算属性 - end*/

        /*事件 - 选中*/
        const handleChange = (value: string, event: Event) => {
            console.log("最终的选中事件：", value);
            inputValue.value = value;
            // 关闭下拉框，使用定时器原因：还未看到选中结果，弹框就已关闭
            setTimeout(() => {
                selfOpen.value = false;
            }, 50)
            emit('change', value, event);
            emit('update:modelValue', value);
        }
        // 事件 - 清空
        const handleClear = (event: Event) => {
            event.stopPropagation();
            inputValue.value = '';
            emit('clear', event);
            emit('change', '', event);
            emit('update:modelValue', '');
        }

        const renderUI = () => {
            // UI - 选中结果
            const resultUI = (<div
                ref="trigger"
                class={['m-date-picker__result', props.disabled && 'disabled']}
                style={{width: `${props.width}px`}}
                onClick={handleClickTrigger}
            >
                <IconMeriActionCalendar
                    color='#1B2129'
                    class='date-icon'
                />
                {props.caption && <span>{props.caption}</span>}
                <span class='m-date-picker__result_text'>{inputValue.value ? inputValue.value : props.placeholder}</span>
                {isShowClearIcon.value && <IconMeriComponentCancel
                    class='clear-icon'
                    onClick={handleClear}
                />}
            </div>)

            // 滚动条区域
            const popup = (
                <div
                    ref="popup"
                    class="m-select-menu"
                    placement={windowStyle.placement}
                    key={`${props.type}_${dateKey.value}`}
                >
                    {slots.panelHeader?.()}
                    {slots.default ? (
                        <section
                            ref="content"
                            class="m-select-menu-content"
                        >
                            {slots.default?.()}
                        </section>
                    ) : (
                    h(dateType.value, {
                        type: props.type,
                        modelValue: props.modelValue || '',
                        timeFormat: props.timeFormat,
                        onChange: handleChange,
                        onCancle: blur,
                    })
                    )}
                </div>
            )

            // window
            const window = (
                <Teleport to="body">
                    <Transition name="m-select-zoom">
                        {selfOpen.value ? (
                            <div
                                class="m-select-window"
                                style={{...windowStyle}}
                                v-show={selfOpen.value}
                            >
                                {popup}
                            </div>
                        ) : null}
                    </Transition>
                </Teleport>
            )

            return (
                <div
                    ref="target"
                    class={[
                        'm-date-picker',
                    ]}
                >
                    {resultUI}
                    {window}
                </div>
            )
        }
        return {
            renderUI,
            dateType
        }
    },
    render() {
        return this.renderUI();
    }
})
export default DatePicker;