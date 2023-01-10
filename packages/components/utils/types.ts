/*
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 15:18:47
 */
import { Ref } from "vue";

// 尺寸
export enum Size {
    // 大
    large = "large",
    // 中
    medium = "medium",
    // 小
    small = "small",
}

// 状态
export type Loading = boolean;

// disabled
export type Disabled = boolean;

// icon
export type Icon = string;

export enum Flow {
    // leftTop = "leftTop",
    // leftBottom = "leftBottom",
    // rightTop = "rightTop",
    // rightBottom = "rightBottom",
    topLeft = "topLeft",
    topRight = "topRight",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight",
    topCenter = "topCenter",
}
export enum MultipleFlow {
    // leftTop = "leftTop",
    // leftBottom = "leftBottom",
    // rightTop = "rightTop",
    // rightBottom = "rightBottom",
    topLeft = "topLeft",
    topCenter = "topCenter",
    topRight = "topRight",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight",
    bottomCenter="bottomCenter",
    leftTop="leftTop",
    leftCenter="leftCenter",
    leftBottom="leftBottom",
    rightTop="rightTop",
    rightBottom="rightBottom",
    rightCenter="rightCenter"
    
}

// 矩形的信息
export type Rect = {
    height: Ref<number>;
    bottom: Ref<number>;
    left: Ref<number>;
    right: Ref<number>;
    top: Ref<number>;
    width: Ref<number>;
    x: Ref<number>;
    y: Ref<number>;
}

// 单个对象
export type Item = {
    id: string;
    name: string;
    label?: string;
    disabled?: boolean;
    checked?: string;
}

// 单个对象
export enum TimeType {
    h= 'h',
    m='m',
    s='s',
    hm='hm',
    hms= 'hms',
    ms='ms'
}
