import { PropType } from "vue";


// 类型
export enum BannerType {
    // 默认正常
    default = "info",
    // 正常
    info = "info",
    // 错误
    error = "error",
    // 警告
    warn = "warn",
  
}



const bannerProps = {
    
    // 类型
    type: {
        type: String as PropType<BannerType>,
        default: BannerType.default
    },
    message: {
        type: String as PropType<String>,
        default: null
    },
    closable:{
        type: Boolean as PropType<Boolean>,
        default: false
    },
    isShow: {
        type: Boolean as PropType<boolean>,
        default:true
    },
    width:{
        type: Number as PropType<number>,
        default:232
    }
    
} as const;

export default bannerProps;