/*
 * @Author: liutian
 * @Date: 2022-06-22 17:00
 * @LastEditors: liutian
 * @LastEditTime: 2022-06-22 17:00
 * @Description: 侧边栏
 */

import { defineComponent, h, ref, reactive, PropType, StyleValue, computed, onMounted, watch } from 'vue';
import { SidebarCustomProps } from './SidebarCustomProps'
import Lefta from "./icon/lefta"
import Righta from "./icon/righta"
import 'meri-icon/lib/style.css'
import _ from 'lodash';
import { useDraggable,useElementHover } from '@vueuse/core'
const typeObj = {
    lefta: <Lefta />,
    right: <Righta />
}
const SidebarCustom = defineComponent({
    name: "SidebarCustom",
    props: SidebarCustomProps,
    emits: ['click', "change", 'update:modelValue'],
    setup(props, { slots, attrs, emit }) {
        const num = ref(1)
        const ifButtonShow = ref(props.show) // 左侧还是右侧图标
        const rightPonsition = ref(props.width)
        const boxWidth = ref(0)
        const backgroundClick = ref('')
        const divDraggble = ref('')
        const widthO = ref(props.width) // 默认宽度
        const ifShowDivs = ref(true)
        const isResident=ref(props.resident)
        const isMove=ref(false);
        const el1:any = ref<HTMLElement | EventTarget>()
        const el2:any = ref<EventTarget>()
        // `style` will be a helper computed for `left: ?px; top: ?px;`
        if(!ifButtonShow.value){
            widthO.value=12;
        }
        const { x, y, style } = useDraggable(el1,{
            onStart(position, event){
                isMove.value=true;
            },
            onEnd(position, event){
                isMove.value=false;
            }
        })
        const hover1=useElementHover(el1)
        const hover2=useElementHover(el2)
        const isHovered=computed(()=>{
            if(isResident.value||isMove.value){
                return true
            }
            return ifButtonShow.value?hover1.value:hover2.value
        })
        watch([x], (newX: any, oldx) => {
            let neex = newX - 397
                let ass = newX - 397
                if (ass < 680 && neex > 0) {
                    rightPonsition.value = neex
                    if (ass < 240) {
                        rightPonsition.value = 240
                    } else {
                        rightPonsition.value = neex
                    }
                } else if (neex > 680) {
                    rightPonsition.value = 680
                }
                onMouns.clickDon = false
                widthO.value = rightPonsition.value
        })
        const onClickHideRight = () => { // 点击切换是否展示 侧边框
            ifButtonShow.value = !ifButtonShow.value
            if (ifButtonShow.value) {
                ifShowDivs.value = true
                num.value = 1
                widthO.value = props.width
                rightPonsition.value = widthO.value
            } else {
                setTimeout(() => {
                    widthO.value = 12
                    rightPonsition.value = widthO.value
                }, 400);
            }
            onMouns.clickDon = false
        }
        const onMouns = reactive({
            clickDon: false
        })
        const onMousedown = (ev: Event) => {
            onMouns.clickDon = true
            boxWidth.value = 100
            backgroundClick.value = '#246FE5'
        }
        return () => {
            let divDraggble: any = ''
            let divClick: any = ''
            if (!ifButtonShow.value) {
                ifShowDivs.value = false
            }
            if (props.changeSize) {
                if(ifButtonShow.value){
                    //   可拖动线条
                    divDraggble = <div ref={el1} class={['p-dragAnddrop',{backgroundClick:onMouns.clickDon,"p-dragAndMove":isMove.value}]} style={['left:' + (Number(widthO.value) + 12) + 'px']}></div>
                }else{
                    divDraggble=<div key="hide" ref={el2} class={["p-dragAnddropHide"]} style={['left:' + (Number(widthO.value) + 12) + 'px']}></div>
                }
            } else {
                divDraggble = <div style={['width:12px', 'height:100%', 'background:#F1F4F6;']}></div>
            }

            const iconRight = !ifButtonShow.value ? (
                <div class={'p-SidebarCustomProps-icon'} key="right">
                    <span class={['icon-img-right',{showIcon:isHovered.value}]} onClick={(onClickHideRight)}  > 
                        <Righta />
                    </span>
                </div>
            ) : <div class={'p-SidebarCustomProps-icon'} key="left"> 
                    <span class={['icon-img-left',{showIcon:isHovered.value}]} onClick={(onClickHideRight)} style={'left:' + (Number(widthO.value) - 25) + 'px'} >
                        <Lefta />
                    </span>
                </div>
            //   切换 左右icon
            const ifShowDiv = <div class={[ifButtonShow.value ? 'p-SidebarCustomProps' : 'p-SidebarCustomPropsHide']} style={'width:' + widthO.value + 'px'}><div class={['p-content']}>{slots.default && slots.default()} </div> {iconRight}</div>
            return (
                <div class={'p-SidebarCustomProps-box'} onDragenter={onMousedown} style={'width:' + Number(widthO.value) + 'px'}>
                    {ifShowDiv}
                    {divClick}
                    {divDraggble}
                </div>

            )
        }
    }
})
export default SidebarCustom;