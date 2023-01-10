import { PropType } from "vue";
import { TreeNode,selectIds} from "../../tree/src/TreeProps";
export type NodeProps = {
    label?:string,
    class?:string,
    children?:string,
}
const treeSelectProps = {
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
    // 延迟加载
    lazy:{
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
    // 节点事件类型
    detachCheckAction:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 父子关联状态下是否忽略禁用项计算
    ignoreDisabled:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 多选时是否出现确认按钮
    hasConfirm:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    //树容器高度
    height:{
        type:Number as PropType<number>,
        default:0
    },
    modelValue:{
        type:Array as PropType<selectIds[]>,
        default:[]
    },
    //是否可搜索
    searchable:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    mode:{
        type: String as PropType<'multiple' | 'tags'>,
		default: 'multiple'
    },
    disabled:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    // 是否可以清空选项
	clearable: {
		type: Boolean as PropType<boolean>,
		default: false
	},
    //最大标签数 0为不限制有多少显示多少
    maxTagCount:{
        type:Number as PropType<number>,
        default:2
    },
    //最大标签展示字符数
    maxTagTextLength:{
        type: Number as PropType<number>,
        default:0
    },
    // 确认后自动清除搜索结果
	autoClearSearch: {
		type: Boolean as PropType<boolean>,
		default: true
	},
    //占位提示语
    placeholder:{
        type: String as PropType<string>,
		default: '请选择'
    },
    //触发器宽度
    size:{
        type: [String, Number] as PropType<number | 'small' | 'medium' | 'large' | 'auto'>,
		default: 'medium'
    },
    //下拉面板宽度，不设置时与触发器同宽
    menuSize:{
        type: [String, Number] as PropType<number | 'small' | 'medium' | 'large' | 'auto'>,
		default: 0
    },
    //单选状态下是否显示子父级路径
    showParentName:{
        type: Boolean as PropType<boolean>,
		default: true
    },
    //前置标题
    prefix: {
		type: String as PropType<string>,
		default: ''
	},
    // 多选状态下是否将hover动作分离
    detachHoverAction:{
        type:Boolean as PropType<boolean>,
        default:false
    }

} as const;


export default treeSelectProps;

