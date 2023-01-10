import { PropType } from 'vue';
import {Size, Loading, Disabled} from '../../utils/types'

//type
export enum ButtonType {
    //主要
    primary = 'primary',
    //默认
    default = 'default',
    //危险
    danger = 'danger',
    // 文字
    text = "text",
    //链接
    link = 'link',
    //图标按钮
    icon = 'icon'
}


const buttonProps ={
    size: {
        type: String as PropType<Size>,
        default:Size.medium
    },
    iconSize: {
        type: Number as PropType<Number>,
    },
    type:{
        type: String as PropType<ButtonType>,
        default: ButtonType.default
    },
    loading:{
        type:Boolean as PropType<Loading>,
        default: false
    },
    disabled:{
        type:Boolean as PropType<Disabled>,
        default: false
    },
    iconBg:{
        type:Boolean as PropType<Disabled>,
        default: false
    },
    width:{
        type: String as PropType<string | number>,
    }
} as const;
export default  buttonProps
