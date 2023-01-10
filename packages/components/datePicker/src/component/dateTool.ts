import dayjs from "dayjs";
import _ from "lodash";
import {IRangeSelectTime} from '../DatePickerProps'

// 帮助 - 当前是否在区间内
export const helpGetIsRange = (value: string, selectResult: object, hoverLastValue: string, rangeType: string, formatType: string) => {
    const selectedValue = dayjs(value).format(formatType);
    const {startTime = '', endTime = '', type = ''} = selectResult as IRangeSelectTime;
    const currentSelect = startTime || endTime;

    if (!(currentSelect && value) || (!hoverLastValue && startTime && !endTime)) return false;

    let startValue = startTime;
    let endValue = endTime;

    // 开始时间、结束时间都已选中
    if (startTime && endTime) {
        if (startTime > endTime) {
            startValue = endTime;
            endValue = startTime;
        }
        // 该判断用于解决：当选中项都在同一个面板时，两个面板都显示标识颜色的问题
        if (!type || (rangeType === 'start' && type === 'allFirst') || (rangeType === 'end' && type === 'allSecond')) {
            return selectedValue >= startValue && selectedValue <= endValue;
        }
        return false;
    }

    // 1. 开始时间 > 结束时间

    // 仅仅选择了一个时间，hover时需更改背景色
    if (hoverLastValue <= currentSelect) {
        return selectedValue >= hoverLastValue && selectedValue <= currentSelect;
    } else {
        return selectedValue >= currentSelect && selectedValue <= hoverLastValue;
    }
}

// 帮助 - 点击时获取选中结果
export const helpGetRangeSelectResult = (startTimeResult: string, endTimeResult: string, selectValue: string) => {
    let startTime = startTimeResult;
    let endTime = endTimeResult;
    // 2. 时间区间
    if (!startTimeResult && !endTimeResult) {// (1)开始时间、结束时间都未选择
        startTime = selectValue;
    } else if (startTimeResult && endTimeResult) {// (2)开始时间、结束时间都已被选择
        // 替换结束时间
        if (endTimeResult <= selectValue) {
            endTime = selectValue;
        } else {
            // 替换开始时间
            startTime = selectValue;
        }
    } else {
        // (3)开始时间已被选择/(4)结束时间已被选择
        const originalTime = startTimeResult || endTimeResult;
        if (originalTime > selectValue) {
            startTime = selectValue;
            endTime = originalTime;
        } else {
            startTime = originalTime;
            endTime = selectValue;
        }
    }
    return {startTime, endTime};
}

// 帮助 - 获取默认选中项
export const helpGetDefaultValue = (modelValue: string, isRange: boolean, selectTime: object, selectResultStartTime: string, formatType: string) => {
    let selectedYear = '';
    let selectedMonth = '';
    let selectedDate = '';
    let selectedResult = '';
    let startTimeResult = '';
    let endTimeResult = '';
    if (!isRange) {
        // 1. 单选
        const selectModelValue = dayjs(modelValue as string);
        if (modelValue && selectModelValue.isValid()) {
            selectedResult = selectModelValue.format(formatType);
            selectedYear = selectModelValue.year().toString();
            formatType !== 'YYYY' && (selectedMonth = (selectModelValue.month() + 1).toString());
            formatType === 'YYYY.MM.DD' && (selectedDate = (selectModelValue.date()).toString());
        }
    } else {
        // 2. 范围
        const {startTime, endTime} = selectTime as IRangeSelectTime;

        //1. 开始时间在当前面板上
        if (startTime) {
            startTimeResult = startTime;
            selectedYear = dayjs(startTime).year().toString();
            formatType === 'YYYY.MM.DD' && (selectedMonth = (dayjs(startTime).month() + 1).toString());
        }

        //2. 结束时间都在当前面板上
        if (startTime && endTime) {
            endTimeResult = endTime;
        }

        //3. 开始、结束时间都未在当前面板上，但有选中项，默认选中第一个面板选中的下一个月
        if (!(startTime || endTime) && selectResultStartTime) {
            if (formatType === 'YYYY') {
                selectedYear = (_.floor(parseInt(selectResultStartTime), -1) + 10).toString();
            } else {
                selectedYear = dayjs(selectResultStartTime).year().toString();
                formatType === 'YYYY.MM.DD' && (selectedMonth = (dayjs(selectResultStartTime).month() + 2).toString());
            }
        }
    }

    return {
        year: selectedYear,
        month: selectedMonth,
        date: selectedDate,
        singleResult: selectedResult,
        start: startTimeResult,
        end: endTimeResult,
    }
}

// 帮助 - 范围获取开始、结束时间className（用于添加选中背景色圆角）
export const helpGetTdCurrentClassName = (isRange:boolean,selectResult:IRangeSelectTime,selectValue: string) => {
    if (!isRange) return '';
    const {startTime = '', endTime = ''} = selectResult;
    let startValue = startTime;
    let endValue = endTime;
    if(startTime && endTime && startTime > endTime){
        endValue = startTime;
        startValue = endTime;
    }
    if (startValue === selectValue) return 'current-start';
    if (endValue === selectValue) return 'current-end';
    return '';
}

// 帮助 - 获取时间点dayjs格式
export const helpGetTimeFormat = (timeFormat:string) => {
    let formatResult = '';
    switch (timeFormat){
        case 'hms':
            formatResult = 'HH:mm:ss';
            break;
        case 'hm':
            formatResult = 'HH:mm';
            break;
        case 'h':
            formatResult = 'HH';
        default:
            break;
    }
    return formatResult;
}