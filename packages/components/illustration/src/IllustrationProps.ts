import { PropType, VNodeChild } from "vue";
type IllustrationType = 'noContent'| 'noAccess' | 'noMessage' | 'networkDisconnected' | 'noSearchResult' | 'noData' | 'pageLoadFailure' | 'success' ;
type SizeType = 'small | normal'
const illustrationProps = {
    size: {//大小norma'/small
        type: String as PropType<SizeType>,
        default: 'normal',
    },
    type: {//类型
        type: String as PropType<IllustrationType>,
        default: ""
    },
    title: {//标题 必填项
        type: String as PropType<string>,
        default: ""
    },
    content: {//描述
        type: String as PropType<string>,
        default: ""
    },
} as const;


export default illustrationProps;