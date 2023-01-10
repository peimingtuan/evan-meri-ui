import { PropType } from "vue";
export type TreeNode = {
    id?:string|number,
    name?:string,
    open?:boolean,
    disabled?:boolean,
    checked?:string,
    visible?:boolean,
    children?:Array<TreeNode>,
    parent?:TreeNode| null
    [key:string]:any
}
export type NodeProps = {
    label?:string,
    class?:string,
    children?:string,
}
export type selectIds = string|number

const treeProps = {

    // 树形数据
    data: {
        type: Array as PropType<Array<TreeNode>>,
        default:()=>{
            return []
        }
    },
    // 节点唯一key
    nodeKey: {
        type: String as PropType<string>,
        default:'id'
    },
    // 是否多选
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    // 节点信息
    props:{
        type: Object as PropType<NodeProps>,
        default: ()=>{
            return {}
        }
    },
    // 默认展开全部
    defaultExpandAll:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 是否返回半选状态的数据
    notNull:{
        type:Boolean as PropType<boolean>,
        default:true
    },
    // 在复选框的情况下是否严格的遵循父子不互相关联的做法
    checkStrictly:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    //水平缩进长度
    indent:{
        type:Number as PropType<number>,
        default:24
    },
    //仅末级可选
    lastStage:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 多选情况下是否返回父级节点信息
    returnParentNode:{
        type:Boolean as PropType<boolean>,
        default:true
    },
    // 节点高度，节点较多虚拟滚动时使用
    itemHeight:{
        type:Number as PropType<number>,
        default:40
    },
    // 是否开始虚拟列表
    virtual:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 树过滤方法
    filterNodeMethod:{
        type:[String,Function] as PropType<string|Function>,
        default:''
    },
    // 多选状态下是否将check动作同行点击事件分离
    detachCheckAction:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 父子关联状态下是否忽略禁用项计算
    ignoreDisabled:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    height:{
        type:Number as PropType<number>,
        default:0
    },
    modelValue:{
        type:Array as PropType<selectIds[]>,
        default:[]
    },
    //树只可展开收起不做选中处理
    readonly:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    filterValue:{
        type: String as PropType<string>,
        default:''
    },
    // 多选状态下是否将hover动作分离
    detachHoverAction:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    prefix: {
		type: String as PropType<string>,
		default: ''
	},
    widthAuto:{
        type:Boolean as PropType<boolean>,
        default:true
    },
    isTreeSelect:{
        type:Boolean as PropType<boolean>,
        default:false
    }

};


export default treeProps;