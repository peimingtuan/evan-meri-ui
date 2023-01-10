import { CSSProperties, PropType } from "vue";
import { Size } from "../../utils/types";


// 文件的排列方式
export type DisplayType = "row" | "column";

// 文件上传的方式
export type UploadType = "drop" | "button";

export enum FileMessage {
    success = "校验成功",
    oversize = "文件体积过大",
}

// 当前已经上传的文件集合
export type FileType = {
    // 文件服务器对应得Key
    key?: string,
    // 文件的完成路径
    src?: string,
    // 文件名称
    name: string,
    // 文件的体积
    size?: number,
    // 文件类型
    type?: string,
    // 文件的后缀
    suffix?: string,
    // 当前文件对象
    file?: File,
    // 状态
    state: "wait" | "pending" | "resolve" | "reject",
    // 进度
    progress?: number,
    // 校验失败的信息
    message?: string,
}

const fileUploadProps = {
    // 上传数量限制
    limit: {
        type: Number as PropType<number>,
        default: 9
    },
    // 是否支持多选
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 上传的Host
    host: {
        type: String as PropType<string>,
        default: false
    },
    // 支持上传的文件格式
    accepts: {
        type: String as PropType<string>,
        default: `3gpp,ac3,asf,au,mp2,mp3,aac,adpcm,amr,dsd,mp1,pcm,wma,wax,mp4,mpeg,mpg,avi,flv,m3u8,asf,wmv,mkv,mov,ts,webm,3gp,css,csv,doc,dot,dtd,pdf,pot,pps,ppt,rtf,txt,
        wps,xlc,xlm,xls,xlsm,xlsx,docx,pptx,odt,xlsb,one,onetoc2,ppsm,ppsx,pptm,docm,dotm,dotx,ods,gif,jp2,jpe,jpeg,jpg,png,svf,tif,tiff,bmp,ai,psd,eps,zip,rar,dwg,dxf,dwt,dws,step,stp,part`
    },
    // 长传的地址
    action: {
        type: String as PropType<string>,
        default: false
    },
    fileSize: {
        type: Number as PropType<number>,
        default: 5242880
    },
    // 按钮的尺寸
    size: {
        type: String as PropType<Size>,
        default: Size.medium
    },
    // 文件上传的类型
    type: {
        type: String as PropType<UploadType>,
        default: "button"
    },
    // 当前组件是否禁用
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 当前上传组件的样式
    uplaodStlye: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    },
    // 当前集合
    fileListStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    },
    // 单个文件的样式
    fileItemStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    },
    // 拖拽区域文字标题
    dropTitle: {
        type: String as PropType<string>,
        default: '点击或将文件拖拽到此处上传'
    },
    // 拖拽区域内容文字
    dropContent: {
        type: String as PropType<string>,
        default: ''
    },
    // 已经长传的文件集合
    files: {
        type: Array as PropType<FileType[]>,
        default: []
    },
    // 自定义的上传方法
    upload: {
        type: Function as PropType<(item: FileType) => void>
    },
    valite: {
        type: Function as PropType<(item: FileType) => string | void>
    }
} as const;

export default fileUploadProps;