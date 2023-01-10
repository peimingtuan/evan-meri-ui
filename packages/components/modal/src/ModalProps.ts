import { PropType } from "vue";


// 类型
export enum ModalType {
    // 默认正常
    default = "default",
    // 正常
    info = "info",
    // 错误
    error = "error",
  
}



const ModalProps = {
    // 类型
    type: {
        type: String as PropType<ModalType>,
        default: ModalType.default
    },
    message: {
        type: String as PropType<String>,
        default: null
    },
    visible:{
        type: Boolean as PropType<boolean>,
        default: false
    },
     title:{
        type: String as PropType<String>,
        default: null
     },
     width:{
        type: Number as PropType<number>,
        default:640
     },
     content:{
        type: String as PropType<String>,
        default: null
     },
     closeable:{
        type: Boolean as PropType<boolean>,
        default: true  
     },
     escable:{
        type: Boolean as PropType<boolean>,
        default: true  
     },
     topY:{
        type: String as PropType<string>,
        default:0 
     }
    
} as const;

export default ModalProps;