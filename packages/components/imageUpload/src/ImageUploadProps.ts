import { CSSProperties, PropType } from "vue";
import { Size } from "../../utils/types";


// 文件的排列方式
export type DisplayType = "row" | "column";

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

const imageUploadProps = {
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
        default: `image/*`
    },
    // 长传的地址
    action: {
        type: String as PropType<string>,
        default: false
    },
    fileSize: {
        type: Number as PropType<number>,
        default: Number.MAX_SAFE_INTEGER
    },
    // 当前组件是否禁用
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 拖拽区域文字标题
    dropTitle: {
        type: String as PropType<string>,
        default: '添加图片'
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

export default imageUploadProps;