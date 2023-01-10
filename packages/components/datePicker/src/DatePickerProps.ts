// 日期类型
enum typeList {
    YEAR = 'year',// 年
    MONTH = 'month',// 月
    DATE = 'date',// 日
    DATETIME = 'datetime',// 日 + 时间点
    YEARRANGE = 'yearrange',// 年 + 区间
    MONTHRANGE = 'monthrange',// 月 + 区间
    DATERANGE = 'daterange',// 日 + 区间
    DATETIMERANGE = 'datetimerange',// 时间点 + 区间
}

export interface IRangeSelectTime {
    startTime: string,
    endTime: string,
    type?: string
}

const DatePickerProps = {
    // 为空时的文案提示
    placeholder: {
        type: String,
        default: '选择日期'
    },
    // 前面的标题
    caption: {
        type: String,
        default: ''
    },
    // 选中项的绑定值
    modelValue: {},
    // 宽度，默认为240px
    width: {
        type: Number,
        default: 240
    },
    // 日期类型 - 默认为"日"
    type: {
        type: String,
        default: typeList.DATE,
    },
    // 禁用
    disabled: {
        type: Boolean,
        default: false,
    },
    // 是否允许清空
    clearable: {
        type: Boolean,
        default: true
    },
    // 时间选择格式
    timeFormat: {
        type: String,
        default: 'hms'
    }
}

export {DatePickerProps, typeList};

