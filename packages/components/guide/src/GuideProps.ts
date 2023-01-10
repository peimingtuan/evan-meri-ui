/*
 * @FilePath: GuideProps.ts
 * @Author: zhangjiaqi
 * @Date: 2022-07-14 19:23:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-20 09:40:08
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { PropType } from "vue";
import { MultipleFlow } from '../../utils/types';



export enum GuidStep {
    // 单步骤
    single = "single",
    // 多步骤
    multiple = "multiple"
}

const guideProps = {
    //三角偏移量，相对于触发器的左边或者上边位置
    deviationArrow: {
        type: Number as PropType<number>,
        default: 0
    },
    //弹窗偏移量,上下弹出生效,正向右偏移，负向左偏移，设置后，偏移计算相对于上左或者下左
    deviationLeft: {
        type: Number,
        default: 0
    },
    //弹窗偏移量,左右弹出生效，正向下偏移。负向上偏移，设置后，偏移计算相对于左上或者右上
    deviationTop: {
        type: Number,
        default: 0
    },
    // 弹出方向
    flow: {
        type: String as PropType<MultipleFlow | undefined>,
        default: 'rightTop'
    },
    //主题色
    effect: {
        type: String,
        default: 'blue'
    },
    //标题
    title: {
        type: String,
        default: ''
    },
    //内容
    content: {
        type: String,
        default: ''
    },
    //步骤
    step: {
        type: String as PropType<GuidStep>,
        default: GuidStep.single
    },
    //单步骤按钮文字
    singleText:{
        type: String,
        default: '我知道了'
    },
    //可见状态
    visible: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    //多步骤具体参数 多步骤默认参数
    stepTip: {
        type: Object,
        default: () => {
            return {
                gi: 1,
                count: 3,
                jumptext: '跳过全部',
                nexttext: '下一步'
            }
        }


    }
} as const;

export default guideProps;