import { PropType } from "vue";
import { Disabled } from "../../utils/types";

export enum Size {
    XS= 'XS',
    S= 'S',
    M= 'M',
    L= 'L',
    XL= 'XL',
}

const inputProps = {
    width: {
        type:  [ Number,String] as PropType<number | string>,
        default:200
    },
    height: {
        type: [ Number,String] as PropType<number | string>,
    },
    // 当前输入框的值
    modelValue: {
        type: String as PropType<string>,
    },
    // 错误信息
    errorText: {
        type: String as PropType<string>,
    },
    //
    placeholder: {
        type: String as PropType<string>,
        default:'请输入'
    },
    type: {
        type: String as PropType<string>,
        default: "text"
    },
    maxlength: {
        type: [ Number,Object] as PropType<number | object>
    },
    showWordLimit: {
        type: Boolean as PropType<boolean>,
    },
    clearable: {
        type: Boolean as PropType<boolean>,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
    },
    rows: {
        type: [ Number,String] as PropType<number | string>,
        default: 4
    },
    showPassword: {
        type: Boolean as PropType<boolean>,
        default:false
    },
    prefixIcon: {
        type: String as PropType<string>
    },
    suffixIcon: {
        type: String as PropType<string>
    },
} as const;


export default inputProps;
