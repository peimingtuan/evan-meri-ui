import { templateRef, useEventListener,useVirtualList,UseVirtualListItem,useElementSize,useTemplateRefsList,useIntersectionObserver,useElementVisibility } from '@vueuse/core';
import { defineComponent, h, ref ,Transition,PropType,toRaw, Ref, VNode, computed,Fragment,watch, nextTick,reactive,onMounted, watchEffect } from 'vue';
import { MIcon } from "../../components";
import treeProps, {selectIds, TreeNode} from "./TreeProps"
// import '../styles/index.less'
import Checkbox from '../../checkbox/src/Checkbox';
import {State} from'../../checkbox/src/CheckboxProps'
import {IconMeriComponentArrowDown} from 'meri-icon'
import _, { isEqual } from 'lodash'
const Tree = defineComponent({
    name: "Tree",
    props: treeProps,
    emits: ["focus", "blur", "update:modelValue","change","currentChange"],
    setup(props, { slots, attrs, emit }) {
        //获取容器高度赋值给虚拟列表
        const mTree = templateRef<HTMLElement>('mTree', null)
        const treeHeight = props.height || reactive(useElementSize(mTree)).height
        const classNames = ref(new Set(['m-tree']));
        let source:Array<TreeNode> =props.data
        //节点props字段处理
        const nodeLabel = props.props.label || 'name'
        const nodeChildren = props.props.children || 'children'
        const nodeClassNames = ref(new Set(['m-tree-node']));
        if(props.props.class){
            nodeClassNames.value.add(props.props.class)
        }
        //当前高亮节点
        const currentNode:Ref<TreeNode|null> = ref(null)

        const selected:Ref<Set<TreeNode>> = ref(new Set())
        //当前选中节点
        const currentSelectNode:Ref<TreeNode|null> = ref(null)

        //将树扁平化转为一维数组，解决虚拟列表问题
        const flatten = (list:Array<TreeNode>,lv:number,parent:TreeNode|null)=>{
            let arr:Array<TreeNode> = []
            list.forEach((node)=>{
                node.lv = lv
                node.visible = props.defaultExpandAll || lv===0
                node.parent = parent
                arr.push(node)
                if(node[nodeChildren]&&node[nodeChildren].length){
                    arr = [...arr,...flatten(node[nodeChildren],lv+1,node)]
                }
            })
            return arr
        }
        let nodeList = computed(()=>flatten(source,0,null)).value

         // 处理父级勾选状态
         const updateTree = ()=>{
            const findTarget = (list:Array<TreeNode>)=>{
                for(let i = 0;i<list.length;i++){
                    let item = list[i]
                    let children:Array<TreeNode> = item[nodeChildren]
                    if(children && children.length){
                        findTarget(children)
                        let num = 0
                        children.some((i:TreeNode)=>{
                            //正常节点判断勾选状态
                            if(i.checked ==='notNull' || (i.disabled && i.childrenCheck==='notNull')){
                                num=-1
                                return true
                            }else if(i.checked === 'checked' ||(i.disabled && i.childrenCheck==='checked')){
                                num++
                            }
                        })
                        let list = props.ignoreDisabled?children.filter(k=>!k.disabled || (k.disabled && k.childrenCheck)):children
                        if(num===0){
                            item.disabled?item.childrenCheck='uncheck':item.checked = 'uncheck'
                        }else if(num<0 || num!==list.length){
                            item.disabled?item.childrenCheck='notNull':item.checked = 'notNull'
                        }else{
                            item.disabled?item.childrenCheck='checked':item.checked = 'checked'
                        }
                    }
                }
            }
            findTarget(source)
        }

        // 更新选中节点信息
        const updateSelected = ()=>{
            selected.value.clear()
            const changeSelected = (list:Array<TreeNode>)=>{
                list.forEach((node:TreeNode)=>{
                    if(node.checked==='checked' || (node.checked==='notNull' && props.notNull)){
                        if(props.multiple && !props.checkStrictly){
                            if(!node[nodeChildren]?.length){
                                selected.value.add(node)
                            }
                        }else if(!(props.lastStage && node[nodeChildren]?.length) || !node.disabled){
                            selected.value.add(node)
                        }
                    }
                    if(node[nodeChildren] && node[nodeChildren].length){
                        changeSelected(node[nodeChildren])
                    }
                })
            }
            changeSelected(source)
        }

        //触发change事件
        const emitChange = (node?:TreeNode)=>{
            let allSelected = Array.from(toRaw(selected.value))
            // debugger
            // allSelected = props.checkStrictly?allSelected:props.returnParentNode?allSelected:allSelected.filter((node:TreeNode)=>!node[nodeChildren] || node[nodeChildren].length<1)
            currentSelectNode.value = node || null
            let ids = allSelected.map((node)=>node[props.nodeKey])
            emit("change", ids, node)
            emit("update:modelValue",ids)
        }

        //改变节点下子级数据
        const treeChangeField = (list:Array<TreeNode>=[],field:string,value:any,ignoreDisabled:boolean = false,once:boolean=false) =>{
            let ids:selectIds[] = []
            list.map((node)=>{
                //忽略禁用项
                ids.push(node[props.nodeKey])
                if(!(node.disabled && ignoreDisabled)){
                    node[field] = value
                }
                if(!once && node[nodeChildren] && node[nodeChildren].length){
                    ids = [...ids,...treeChangeField(node[nodeChildren],field,value,ignoreDisabled)]
                }
            })
            return ids
        }

        //监听tree数据变化
        watch(()=>props.data,()=>{
            source = _.clone(props.data)
        })

        //监听modelValue变化
        watch(()=>props.modelValue,(newVal,oldVal)=>{
            let oldSelected = Array.from(selected.value).map(i=>i[props.nodeKey])
            if(!isEqual(newVal,oldSelected)){
                treeChangeField(source,'checked','uncheck')
                for(let i = 0;i<props.modelValue.length;i++){
                    let id = props.modelValue[i]
                    let target = nodeList.find((node:TreeNode)=>node[props.nodeKey]===id) as TreeNode
                    //如果父子关联 删除父级 子级同步删除
                    if(!props.checkStrictly && props.multiple && !props.lastStage){


                        // if(props.returnParentNode){
                        //     if(target.parent && (!props.modelValue.includes(target.parent[props.nodeKey]) || target.parent.checked==='uncheck')){
                        //         target.checked = 'uncheck'
                        //     }else{
                        //         if(target[nodeChildren]?.length){
                        //             let num = 0;
                        //             let children:Array<TreeNode> = target[nodeChildren]
                        //             children.forEach((node:TreeNode)=>{
                        //                 if(props.modelValue.includes(node[props.nodeKey])){
                        //                     num++
                        //                 }
                        //             })
                        //             let list = props.ignoreDisabled?children.filter(k=>!k.disabled):children
                        //             if(num===0){
                        //                 target.checked = 'uncheck'
                        //             }else if(num<0 || num!==list.length){
                        //                 target.checked = 'notNull'
                        //             }else{
                        //                 target.checked = 'checked'
                        //             }

                        //         }else{
                        //             target.checked = 'checked'
                        //         }
                        //     }
                        // }else{
                        //     !target[nodeChildren]?.length && (target.checked = 'checked')
                        // }

                        //逻辑修改父子联动情况下数据处理
                        if(!target[nodeChildren]?.length){
                            target.checked = 'checked'
                        }
                    }else{
                        target.checked = 'checked'
                    }
                }
                if(!props.checkStrictly && props.multiple && !props.lastStage){
                    updateTree()
                }
                updateSelected()
                emitChange()
            }
        },{immediate:true})


        //判断当前节点下可选项是否全部选中
        const allChecked = (node:TreeNode)=>{
            return node[nodeChildren].every((item:TreeNode)=>{
                if(!item.disabled && (!item.checked || item.checked==='uncheck')){
                    return false
                }
                if(item[nodeChildren]){
                    return allChecked(item)
                }
                return true
            })
        }

        //全部展开菜单
        if ( props.defaultExpandAll){
            treeChangeField(source,'open',true)
        }


        // 失去焦点事件
        useEventListener(mTree, 'blur', () => {
        })
        // active
        useEventListener(mTree, 'active', () => {
        })


        //节点点击事件
        //更新当前节点信息
        const updateCurrentNode = (node:TreeNode)=>{
            currentNode.value = node
            emit('currentChange',node)
        }
        //操作父级展开操作
        const handleOpen = (node:TreeNode)=>{
            if(node[nodeChildren]?.length){
                node.open = !node.open
                if(node.open){
                    treeChangeField(node[nodeChildren],'visible',true,false,true)
                }else{
                    treeChangeField(node[nodeChildren],'visible',false,false,false)
                    treeChangeField(node[nodeChildren],'open',false,false,false)
                }
            }
        }
        //两套点击事件处理方式
        const clickTypeOne = (e:Event,node:TreeNode,type:string)=>{
            e.stopPropagation()
            if(node.disabled && !node[nodeChildren]?.length)return
            switch (type) {
                case 'content':
                    updateCurrentNode(node)
                    if(props.detachHoverAction && !props.lastStage){
                        let className = (e.target as HTMLElement)?.className
                        if(className.includes('m-tree-node__content') || className.includes('icon')){
                            return
                        }
                    }
                    if(!props.multiple){
                        if(props.lastStage && node[nodeChildren]?.length){
                            node.open = !node.open
                        }else{
                            if(node.disabled || props.readonly)return
                            selected.value.forEach((node:TreeNode)=>node.checked='uncheck')
                            selected.value.clear()
                            node.checked = 'checked'
                            selected.value.add(node)
                            emitChange(node)
                        }
                    }else{
                        if(props.lastStage){
                            if(node[nodeChildren]?.length){
                                handleOpen(node)
                            }else{
                                !node.disabled && !props.readonly && clickCheckbox(node,e)
                            }
                        }else{
                            !node.disabled && !props.readonly && clickCheckbox(node,e)
                        }
                    }
                    break;
                case 'icon':
                    handleOpen(node)
                    break;
                default:
                    break;
            }
        }
        const clickTypeTwo = (e:Event,node:TreeNode,type:string)=>{
            e.stopPropagation()
            if(node.disabled && !node[nodeChildren]?.length)return
            switch (type) {
                case 'content':
                    updateCurrentNode(node)
                    if(props.detachHoverAction && !props.lastStage){
                        let className = (e.target as HTMLElement)?.className
                        if(className.includes('m-tree-node__content') || className.includes('icon')){
                            return
                        }
                    }
                    if(!props.multiple){
                        if(props.lastStage && node[nodeChildren]?.length){
                            node.open = !node.open
                        }else{
                            if(node.disabled || props.readonly)return
                            selected.value.forEach((node:TreeNode)=>node.checked='uncheck')
                            selected.value.clear()
                            node.checked = 'checked'
                            selected.value.add(node)
                            emitChange(node)
                        }
                    }else{
                        if(props.lastStage){
                            handleOpen(node)
                        }
                    }
                    break;
                case 'icon':
                    handleOpen(node)
                    break;
                default:
                    break;
            }
        }
        const handleClickItem = props.detachCheckAction?clickTypeTwo:clickTypeOne

        //pre处理
        const pre = (str:string)=>{
            return `m-tree-node__${str}`
        };

        //节点class名处理
        const nodeClass = (node:TreeNode) =>{
            const iClassNames = _.cloneDeep(nodeClassNames.value)
            node.open && iClassNames.add('is-expanded')
            // node===currentNode.value && iClassNames.add('is-current')
            node.disabled && iClassNames.add('is-disabled')
            !props.widthAuto && iClassNames.add('isBlock')
            return Array.from(iClassNames)
        }
        // 勾选当前节点
        const clickCheckbox = (node:TreeNode,e?:Event)=>{
            //判断是否需要关联父子状态
            if(!props.checkStrictly){
                if(node.checked === 'checked') {
                    treeChangeField([node],'checked','uncheck',true)
                }else if(node.checked === 'notNull'){
                    if(allChecked(node)){
                        treeChangeField([node],'checked','uncheck',true)
                    }else{
                        treeChangeField([node],'checked','checked',true)
                    }
                }else{
                    treeChangeField([node],'checked','checked',true)
                }
                //关联父子关系时更新状态
                !props.lastStage && updateTree()
            }else{
                node.checked=node.checked==='checked'?'uncheck':'checked'
            }
            e?.stopPropagation()
            updateSelected()
            emitChange(node)

        }

        //虚拟列表数据处理
        const filterItems = computed(()=>nodeList.filter((i)=>i.visible))
        const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
            ref(filterItems),
            {
              itemHeight: props.itemHeight,
              overscan: 10,
            },
        )

        //search列表数据处理
        const searchItems = computed(()=>nodeList.filter((i)=>{
            if(!i.disabled){
                if(typeof props.filterNodeMethod ==='function'){
                    return props.filterNodeMethod(i,nodeList,props.filterValue)
                }else if(props.filterNodeMethod || props.filterValue){
                    return i[nodeLabel].includes(props.filterNodeMethod || props.filterValue)
                }
            }
        }))
        const searchVirtualData = useVirtualList(
            ref(searchItems),
            {
              itemHeight: props.itemHeight,
              overscan: 30,
            },
        )
        const searchListData = searchVirtualData.list
        const searchContainer = searchVirtualData.containerProps
        const searchWrapper = searchVirtualData.wrapperProps
        const searchScrollTo = searchVirtualData.scrollTo



        //节点定位滚动
        let itemRefs = ref({})
        const setItemRef = (el:HTMLElement,key:string|number) => {
            if (el) {
                itemRefs.value[key] = el
            }
        }

         //搜索状态获取显示label
         const searchLabel = (node:TreeNode)=>{
            let current = node
            let keyword;
            if(typeof props.filterNodeMethod==='function'){
                keyword = props.filterValue
            }else{
                keyword = props.filterNodeMethod || props.filterValue
            }
            let list = [node[nodeLabel].replace(keyword,`<span class="search-keyword">${keyword}</span>`)]
            if(!props.checkStrictly){
                while(current.parent){
                    list.unshift(current.parent[nodeLabel].replace(keyword,`<span class="search-keyword">${keyword}</span>`))
                    current = current.parent
                }
            }

            return list.join('/')
        }
        //判断当前选中第一节点是否出现在视野中，否则滚动定位到当第一个选中项
        const scrollToSelected = (node?:TreeNode)=>{
            return new Promise((resolve,reject)=>{
                currentNode.value = null
                let firstNode = Array.from(selected.value).find(i=>!i[nodeChildren]?.length)
                let current = node || firstNode
                if(!current){
                    return
                }
                let tempList:Array<TreeNode> = []
                while (current?.parent) {
                    current.parent.open = true
                    tempList = [...tempList,...current.parent[nodeChildren]]
                    current = current.parent
                }
                if(props.virtual){
                    tempList.forEach((i)=>i.visible = true)
                    nextTick(()=>{
                        let index = (list.value.find((k:UseVirtualListItem<TreeNode>)=>k.data===firstNode) as UseVirtualListItem<TreeNode>).index
                        if(index*props.itemHeight>treeHeight){
                            scrollTo(index)
                            resolve(index*props.itemHeight)
                        }
                    })
                }else{
                    nextTick(()=>{
                        let top = itemRefs.value[(firstNode as TreeNode)[props.nodeKey]].offsetTop
                        if(top>treeHeight){
                            mTree.value.scrollTo(0,top)
                            resolve(top)
                        }
                    })
                }
            })

        }

        //全选操作
        const checkAll=(status?:boolean)=>{
            if(!props.multiple)return
            if(status!==undefined){
                treeChangeField(source,'checked',status?'checked':'uncheck')
            }else{
                if(nodeList.some(node=>node.checked==='uncheck' && !node.disabled && ((props.lastStage && (!node[nodeChildren] || node[nodeChildren].length===0) )|| !props.lastStage))){
                    treeChangeField(source,'checked','checked')
                }else{
                    treeChangeField(source,'checked','uncheck')
                }
            }
            updateSelected()
            emitChange()
        }
        const renderFn = () => {
            //icon 展开图标
            const icon = (node:TreeNode)=>(
                node[nodeChildren]?.length?
                <span class={['icon icon-arrow',node.open?'icon-open':'',(props.detachHoverAction && (!props.multiple || props.lastStage))?'icon-arrow-unset':'']} onClick={(e)=>handleClickItem(e,node,'icon')}>
                    <IconMeriComponentArrowDown size={16} color="#8B949E"></IconMeriComponentArrowDown>
                </span>
                :<span class="icon"></span>
            )

            const label = (text:string)=><span class="label">{text}</span>
            //复选框
            const checkbox = (node:TreeNode)=>(
                //只有末级可选时过滤非末级节点
                !props.readonly && props.multiple && ((props.lastStage && (!node[nodeChildren] || node[nodeChildren].length===0) )|| !props.lastStage)?<Checkbox class={pre('checkbox')} modelValue={(node.checked as State)} disabled={node.disabled} onClick={(status,e)=>clickCheckbox(node,e)}></Checkbox>:''
            )

            //节点样式处理
            const nodeStyle = (node:TreeNode,lv:number)=>{
                let style;
                if(lv===0){
                    style ={
                        'padding-left':'8px',
                    }
                }else{
                    style ={
                        // 'padding-left':lv*(props.indent+16)+8+'px',
                        'padding-left':lv*(props.indent)+8+'px',
                    }
                }

                return style
            }

            // 前插槽
            const prefixSlot = (node:TreeNode)=>{
                if (slots.nodePrefix) {
                    return <div class="prefix">{slots.nodePrefix(node)}</div>
                }else{
                    return null
                }
            }
            // 后插槽
            const suffixSlot = (node:TreeNode)=>{
                if (slots.nodeSuffix) {
                    return <div class="suffix">{slots.nodeSuffix(node)}</div>
                }else{
                    return null
                }
            }

            // 行后插槽
            const rowSuffixSlot = (node:TreeNode)=>{
                if (slots.rowSuffix) {
                    return <div class="rowSuffix">{slots.rowSuffix(node)}</div>
                }else{
                    return null
                }
            }

            //展开收起处理
            const on = {
                onBeforeEnter(el:Element) {
                  if(el instanceof HTMLElement){
                    if (!el.dataset) (el as any).dataset = {}
                    el.dataset.oldPaddingTop = el.style.paddingTop
                    el.dataset.oldPaddingBottom = el.style.paddingBottom

                    el.style.maxHeight = '0'
                    el.style.paddingTop = '0'
                    el.style.paddingBottom = '0'
                  }
                },

                onEnter(el:Element) {
                  if(el instanceof HTMLElement){
                    el.dataset.oldOverflow = el.style.overflow
                    if (el.scrollHeight !== 0) {
                        el.style.maxHeight = `${el.scrollHeight}px`
                        el.style.paddingTop = el.dataset.oldPaddingTop as string
                        el.style.paddingBottom = el.dataset.oldPaddingBottom as string
                    } else {
                        el.style.maxHeight = '0'
                        el.style.paddingTop = el.dataset.oldPaddingTop as string
                        el.style.paddingBottom = el.dataset.oldPaddingBottom as string
                    }
                    el.style.overflow = 'hidden'
                  }

                },

                onAfterEnter(el:Element) {
                    if(el instanceof HTMLElement){
                        el.style.maxHeight = ''
                        el.style.overflow = el.dataset.oldOverflow as string
                    }

                },

                onBeforeLeave(el:Element) {
                    if(el instanceof HTMLElement){
                        if (!el.dataset) (el as any).dataset = {}
                        el.dataset.oldPaddingTop = el.style.paddingTop
                        el.dataset.oldPaddingBottom = el.style.paddingBottom
                        el.dataset.oldOverflow = el.style.overflow

                        el.style.maxHeight = `${el.scrollHeight}px`
                        el.style.overflow = 'hidden'
                    }

                },

                onLeave(el:Element) {
                    if(el instanceof HTMLElement){
                        if (el.scrollHeight !== 0) {
                            el.style.maxHeight = '0'
                            el.style.paddingTop = '0'
                            el.style.paddingBottom = '0'
                          }
                    }

                },

                onAfterLeave(el:Element) {
                    if(el instanceof HTMLElement){
                        el.style.maxHeight = ''
                        el.style.overflow = el.dataset.oldOverflow as string
                        el.style.paddingTop = el.dataset.oldPaddingTop as string
                        el.style.paddingBottom = el.dataset.oldPaddingBottom as string
                    }
                },
              }


            //tree节点渲染


            const deepDom = (nodeList:Array<TreeNode>,lv:number) =>{
                return (
                    nodeList.map((node:TreeNode)=>{
                        const children = node[nodeChildren]
                        const open = children?.length
                        return (
                            <div class={nodeClass(node)} ref={(el)=>setItemRef(el as HTMLElement,node[props.nodeKey])} {...on}>
                                <div class={[pre('content'),node.checked==='checked'&&!props.multiple?'is-selected':'',props.detachHoverAction && !props.lastStage?'detach-content':'default-content']} onClick={(e)=>handleClickItem(e,node,'content')} style={nodeStyle(node,lv)}>
                                    {icon(node)}
                                    <div class="container">
                                        {checkbox(node)}
                                        {prefixSlot(node)}
                                        {label(node[nodeLabel])}
                                        {suffixSlot(node)}
                                        {rowSuffixSlot(node)}
                                    </div>
                                </div>
                                <Transition {...on} >
                                    {
                                        open && node.open?<div class={pre('children')}>
                                            {deepDom(children,lv+1)}
                                        </div>:null
                                    }
                                </Transition>
                            </div>

                        )
                    })
                )
            }


            //虚拟列表
            const virtualList = ():VNode =>{
                return <div {...containerProps} class="virtual-list-container" style={treeHeight>0?{height:`${treeHeight}px`}:{}}>
                    <div class={Array.from(classNames.value)} {...wrapperProps.value}>
                        {
                            list.value.map((node:UseVirtualListItem<TreeNode>)=>{
                                let {data,index} = node
                                const children = data[nodeChildren]
                                const open = children?.length
                                const option = {
                                    key:data.id,
                                    style:{
                                        height:`${props.itemHeight}px`
                                    }
                                }
                                return (
                                    <div class={nodeClass(data)} {...option}>
                                        <div class={[pre('content'),data.checked==='checked'&&!props.multiple?'is-selected':'',props.detachHoverAction && !props.lastStage?'detach-content':'default-content']} onClick={(e)=>handleClickItem(e,data,'content')} style={nodeStyle(data,data.lv)}>
                                            {icon(data)}
                                            <div class="container">
                                                {checkbox(data)}
                                                {prefixSlot(data)}
                                                {label(data[nodeLabel])}
                                                {suffixSlot(data)}
                                                {rowSuffixSlot(data)}
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            }



            //search列表
            const searchList = ():VNode =>{
                return <div {...searchContainer} style={treeHeight>0?{height:`${treeHeight}px`}:{}} class="search-list">
                    <div class={Array.from(classNames.value)} {...searchWrapper.value}>
                        {
                            searchListData.value.map((node:UseVirtualListItem<TreeNode>)=>{
                                let {data,index} = node
                                const children = data[nodeChildren]
                                const option = {
                                    key:data.id,
                                    style:{
                                        height:`${props.itemHeight}px`
                                    }
                                }
                                return (
                                    props.lastStage && children?.length?
                                    null:
                                    <div class={nodeClass(data)} {...option}>
                                        <div class={[pre('content'),data.checked==='checked'&&!props.multiple?'is-selected':'','default-content']} onClick={(e)=>handleClickItem(e,data,'content')}>
                                            {checkbox(data)}
                                            {prefixSlot(data)}
                                            <span v-html={searchLabel(data)}></span>
                                            {suffixSlot(data)}
                                            {rowSuffixSlot(data)}
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            }
            const treeStyle = props.virtual?{}:treeHeight>0?{height:`${treeHeight}px`}:{}
            const showSearch = typeof props.filterNodeMethod==='function'?props.filterValue:props.filterNodeMethod || props.filterValue
            return (
                <div class={["m-tree",props.isTreeSelect?'m-tree_select':'']} ref="mTree" style={{...treeStyle,...(props.widthAuto?{}:{display:'block'})}}>
                    {
                        showSearch?searchList():props.virtual?virtualList():deepDom(source,0)
                    }
                </div>
            )
        }
        return {
            renderFn,
            scrollToSelected,
            checkAll
        }
    },
    render(){
        return this.renderFn()
    }
})
export default Tree;