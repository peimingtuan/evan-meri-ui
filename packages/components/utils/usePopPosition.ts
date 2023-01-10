/*
 * @FilePath: usePopPosition.ts
 * @Author: zhangjiaqi
 * @Date: 2022-07-18 19:58:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-20 10:37:53
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { MaybeElementRef, useElementBounding, useWindowScroll, useWindowSize } from "@vueuse/core";
import { CSSProperties, reactive, Ref, RendererElement, RendererNode, unref, VNode } from "vue";
import { MultipleFlow } from "./types";



export const usePopPosition = (refpop: MaybeElementRef | Readonly<Ref<HTMLElement>>, slotsDom: VNode<RendererNode, RendererElement, { [key: string]: any; }>[] | undefined, popflow: MultipleFlow | undefined, margin = 8, deviationLeft: Number, deviationTop: Number, deviationArrow?: Number) => {
    const reattt = reactive(useElementBounding(refpop))
    const { width: widthScreen, height: heightScreen } = useWindowSize()
    // 再获取滚动条的水平滚动距离和垂直滚动距离
    const scrollBarTop = document.body.scrollTop || document.documentElement.scrollTop;
    const { left:offsetLeft, top:offsetTop, height:clientHeight,width:clientWidth } = (slotsDom as any)[0].el.getBoundingClientRect();
    const customLeft = offsetLeft + deviationLeft;
    const customTop = offsetTop + deviationTop;

    // 计算弹窗位置
    const useGuideStyle: CSSProperties = {};
    // 计算三角位置
    const useArrowStyle: CSSProperties = {};
    //获取插槽中心点
    switch (popflow) {
        //上左
        case 'topLeft':
            useGuideStyle.left = customLeft + 'px';
            useGuideStyle.bottom = heightScreen.value - offsetTop + margin-scrollBarTop + 'px'
            useArrowStyle.left = deviationArrow ? offsetLeft + deviationArrow + 'px' : offsetLeft + Math.floor(clientWidth / 3) + 'px';
            useArrowStyle.bottom = heightScreen.value - offsetTop + margin / 2-scrollBarTop + 'px'
            break;
        //上右
        case 'topRight':
            useGuideStyle.right = widthScreen.value - customLeft - clientWidth + 'px'
            useGuideStyle.bottom = heightScreen.value - offsetTop + margin-scrollBarTop + 'px'
            useArrowStyle.right = deviationArrow ? offsetLeft + deviationArrow + 'px' : widthScreen.value - offsetLeft - clientWidth + Math.floor(clientWidth / 3) + 'px';
            useArrowStyle.bottom = heightScreen.value - offsetTop + margin / 2-scrollBarTop + 'px'
            break;
        //上中
        case 'topCenter':
            useGuideStyle.left = customLeft + Math.floor(clientWidth / 2) - reattt.width / 2 + 'px'
            useGuideStyle.bottom = heightScreen.value - offsetTop + margin-scrollBarTop + 'px'
            useArrowStyle.left = deviationArrow ? offsetLeft + deviationArrow + 'px' : offsetLeft + Math.floor(clientWidth / 2) - 4 + 'px';
            useArrowStyle.bottom = heightScreen.value - offsetTop + margin / 2-scrollBarTop + 'px'
            break;
        //下左
        case 'bottomLeft':
            useGuideStyle.left = customLeft + 'px';
            useGuideStyle.top = offsetTop + clientHeight + margin+scrollBarTop + 'px'
            useArrowStyle.left = deviationArrow ? offsetLeft + deviationArrow + 'px' : offsetLeft + Math.floor(clientWidth / 3) + 'px';
            useArrowStyle.top = offsetTop + clientHeight + margin / 2 +scrollBarTop + 'px'
            break;
        //下右
        case 'bottomRight':
            useGuideStyle.right = widthScreen.value - customLeft - clientWidth + 'px'
            useGuideStyle.top = offsetTop + clientHeight + margin+scrollBarTop + 'px'
            useArrowStyle.right = deviationArrow ? offsetLeft + deviationArrow + 'px' : widthScreen.value - offsetLeft - clientWidth + Math.floor(clientWidth / 3) + 'px';
            useArrowStyle.top = offsetTop + clientHeight + margin / 2 +scrollBarTop + 'px'
            break;
        //下中
        case 'bottomCenter':
            useGuideStyle.left = customLeft + Math.floor(clientWidth / 2) - reattt.width / 2 + 'px'
            useGuideStyle.top = offsetTop + clientHeight + margin+scrollBarTop + 'px'
            useArrowStyle.left = deviationArrow ? offsetLeft + deviationArrow + 'px' : offsetLeft + Math.floor(clientWidth / 2) - 4 + 'px';
            useArrowStyle.top = offsetTop + clientHeight + margin / 2+scrollBarTop + 'px'
            break;
        //左上
        case 'leftTop':
            useGuideStyle.left = offsetLeft - reattt.width - margin + 'px'
            useGuideStyle.top = customTop+scrollBarTop + 'px'
            useArrowStyle.left = offsetLeft - margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop+scrollBarTop + deviationArrow + 'px' : offsetTop+scrollBarTop + Math.floor(clientHeight / 3) + 'px';
            break;
        //左下
        case 'leftBottom':
            useGuideStyle.left = offsetLeft - reattt.width - margin + 'px'
            useGuideStyle.bottom = heightScreen.value - customTop - clientHeight -scrollBarTop + 'px'
            useArrowStyle.left = offsetLeft - margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop+scrollBarTop + deviationArrow + 'px' : offsetTop +scrollBarTop + Math.floor(clientHeight / 3) * 2 + 'px';
            break;
        //左中
        case 'leftCenter':
            useGuideStyle.left = offsetLeft - reattt.width - margin + 'px'
            useGuideStyle.top = customTop+scrollBarTop + Math.floor(clientHeight / 2) - reattt.height / 2 + 'px'
            useArrowStyle.left = offsetLeft - margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop+scrollBarTop + deviationArrow + 'px' : offsetTop +scrollBarTop+ Math.floor(clientHeight / 2) - 4 + 'px';
            break;
        //右上
        case 'rightTop':
            useGuideStyle.left = offsetLeft + clientWidth + margin + 'px'
            useGuideStyle.top = customTop+scrollBarTop + 'px'
            useArrowStyle.left = offsetLeft + clientWidth + margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop+scrollBarTop + deviationArrow + 'px' : offsetTop+scrollBarTop + Math.floor(clientHeight / 3) + 'px';
            break;
        //右下
        case 'rightBottom':
            useGuideStyle.left = offsetLeft + clientWidth + margin + 'px'
            useGuideStyle.bottom = heightScreen.value - customTop - clientHeight -scrollBarTop + 'px'
            useArrowStyle.left = offsetLeft + clientWidth + margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop + deviationArrow+scrollBarTop + 'px' : offsetTop+scrollBarTop + Math.floor(clientHeight / 3) * 2 + 'px';
            break;
        //右中
        case 'rightCenter':
            useGuideStyle.left = offsetLeft + clientWidth + margin + 'px'
            useGuideStyle.top = customTop+scrollBarTop + Math.floor(clientHeight / 2) - reattt.height / 2 + 'px'
            useArrowStyle.left = offsetLeft + clientWidth + margin - 4 + 'px'
            useArrowStyle.top = deviationArrow ? offsetTop+scrollBarTop + deviationArrow + 'px' : offsetTop+scrollBarTop + Math.floor(clientHeight / 2) - 4 + 'px';
            break;

        default:
            break;
    }
    return { useGuideStyle, useArrowStyle }
}
