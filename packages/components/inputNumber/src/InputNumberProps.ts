/*
 * @Author: yanyongkai
 * @Date: 2022-07-18 10:16:12
 * @LastEditors: yanyongkai
 * @LastEditTime: 2022-07-18 17:17:34
 * @Description: InputNumberProps
 */
import { PropType } from 'vue';
export default {
    // 宽度
    width: {
        type: String,
        default: '180px'
    },
    // 初始值
    defaultValue: {
        type: Number,
        default: null
    },
    // 双向绑定值
    modelValue: {
        type: Number,
        default: null
    },
    // 自动获取焦点
    autofocus: {
        type: Boolean,
        default: false
    },
    //设置计数器允许的最小值
    min: {
        type: Number,
        default: -Infinity
    },
    //设置计数器允许的最大值
    max: {
        type: Number,
        default: Infinity
    },
    // 计数器步长
    step: {
        type: Number,
        default: 1
    },
    // 数值精度
    precision: {
        type: Number||String,
        default: 0
    },
    // 是否禁用		
    disabled: {
        type: Boolean,
        default: false
    },
    // 输入框默认 placeholder
    placeholder: {
        type: String,
        default: '请输入'
    },
    // 文字显示位置
    textAlign: {
        type: String,
        default: 'center'
    },
    // 快捷操作按钮 
    //normal 是正常无按钮的状态   operator 是两侧有button的按钮 operatorIcon两侧只有图标的类型  rightButton 是右侧带单位输入框
    controls: {
        type: String as PropType<'normal' | 'operator' |'operatorIcon'| 'rightButton'>,
        default: 'operator'
    },
    // 输入框头部内容
    prefix: {
        type: String,
        default: ''
    },
    // 输入框尾部内容
    suffix: {
        type: String,
        default: ''
    },
    // 错误文案
    errorText: {
        type: String,
        default: ''
    },
    //尺寸高度 medium 和 large两种类型 medium 是32高度 large是40的高度
    size:{
        type:String,
        default:'medium'
    }
}