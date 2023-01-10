// @ts-nocheck
/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 10:26:05
 * @Description: 时间组件
 */
import { ComputedRef, CSSProperties, defineComponent, h, PropType, StyleValue } from 'vue';
import { Disabled } from '../../utils/types';
import { TimePickerTriggerProps } from './TimePickerProps';
// import TimePickerTrigger from './TimePickerTrigger'
import { countNumber } from '../../utils/tools'
import { debounce } from "lodash";
import { nextTick } from 'vue';
import { ref } from 'vue';
import { templateRef } from '@vueuse/core';
import { computed } from 'vue';
import { usePreTime, toggleStr,queryDefaultTime } from '../utiles/index'
import { onMounted } from 'vue';

const TimeSelect = defineComponent({
    name: "TimeSelect",
    components: {
        // TimePickerTrigger
    },
    props: TimePickerTriggerProps,
    emits: ['update:modelValue'],
    setup(props, { slots, attrs, emit }) {
        const refH = templateRef<any>('refH', null);
        const refM = templateRef<any>('refM', null);
        const refS = templateRef<any>('refS', null);
        //时
        let htimer: NodeJS.Timer | null = null;
        //分
        let mtimer: NodeJS.Timer | null = null;
        //秒
        let stimer: NodeJS.Timer | null = null;
        const itemWith = computed(() => {
            return props.format.length !== 1 ? '56px' : '124px'
        })
        //预渲染time
        const isActive = (v: string, t: string) => {
            if (props.range) {
                return
            } else {
                if (t == 'h') {
                    return props.modelValue.slice(0, 2) == v

                } else if (t == 'm') {
                    return props.modelValue.slice(3, 5) == v
                } else {
                    return props.modelValue.slice(6, 8) == v
                }
            }

        }
        // const itemStyle: ComputedRef<any> = computed(() => {
        //     return props.format.length == 1 ? {
        //         width: '124px'
        //     } : {
        //         width: '56px'
        //     }
        // })
        onMounted(() => {
            
            //获取默认时间传入，设置默认滚动距离
            const defaultH = queryDefaultTime(0,2,props.modelValue);
            const defaultM = queryDefaultTime(3,5,props.modelValue);
            const defaultS = queryDefaultTime(6,8,props.modelValue);
            selH(defaultH)
            selM(defaultM)
            selS(defaultS)
        })
        //小时滚动
        const scrollH = debounce((e: Event,v) => {
            console.log(e,v);
            
            if (htimer) clearTimeout(htimer);
            const target = (e.target || e) as any;
            const st = Math.ceil(target.scrollTop / 30);
            if(v=='refM'){
                emit('update:modelValue',toggleStr(3, 5, props.modelValue, st))
            }else if(v == 'refH'){
                 emit('update:modelValue',toggleStr(0, 2, props.modelValue, st))
            }else{
                emit('update:modelValue',toggleStr(6, 8, props.modelValue, st))
            }
           
            //滚动后，根据滚动的距离，动态设置当前预渲染time
            htimer = setTimeout(() => {
                target.scrollTop = st * 30;
                clearTimeout(Number(htimer));
                htimer = null;
            }, 40);
        }, 60)
         //分滚动
         const scrollM = debounce((e: Event) => {
            if (mtimer) clearTimeout(mtimer);
            const target = (e.target || e) as any;
            const st = Math.ceil(target.scrollTop / 30);
            emit('update:modelValue',toggleStr(3, 5, props.modelValue, st))
            mtimer = setTimeout(() => {
                target.scrollTop = st * 30;
                clearTimeout(Number(mtimer));
                mtimer = null;
            }, 40);
        }, 60)
        //秒滚动
        const scrollS = debounce((e: Event) => {
            if (stimer) clearTimeout(stimer);
            const target = (e.target || e) as any;
            const st = Math.ceil(target.scrollTop / 30);
            emit('update:modelValue',toggleStr(6, 8, props.modelValue, st))
            stimer = setTimeout(() => {
                target.scrollTop = st * 30;
                clearTimeout(Number(stimer));
                stimer = null;
            }, 40);
        }, 60)
        //时选中
        const selH = (i: number,type?:string) => {
            const obj =  type?{ top: i * 30, behavior: 'smooth' }:{ top: i * 30}
            
            refH.value.scrollTo(obj)
        }
        //分选中
        const selM = (i: number,type?:string) => {
            const obj =  type?{ top: i * 30, behavior: 'smooth' }:{ top: i * 30}
            
            refM.value.scrollTo(obj)
        }
        //时选中
        const selS = (i: number,type?:string) => {
            const obj =  type?{ top: i * 30, behavior: 'smooth' }:{ top: i * 30}
            
            refS.value.scrollTo(obj)
        }
        return () => {
            //获取数据源
            const [hours, minutes, seconds] = countNumber();
            // 输入框
            const timeSelectH = (props.format.includes('h') || props.format === 'h') ? (
                <div style={{ 'width': itemWith.value }} class="time-content" >
                    <div class="time-content-scroll" ref="refH" onScroll={(e:Event) => {scrollH(e,'refH')}}>
                        <ul>
                            {hours.map((i, ci) => {
                                return (<li key={`${i.time}_${ci}`} onClick={() => selH(ci,'smooth')} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 'h') }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            ) : null
            const timeSelectM = props.format.includes('m') ? (
                <div style={{ 'width': itemWith.value }} class="time-content" >
                    <div class="time-content-scroll" ref="refM" onScroll={(e:Event) => {scrollH(e,'refM')}}>
                    <ul>
                        {minutes.map((i, ci) => {
                            return (<li key={`${i.time}_${ci}`} onClick={() => selM(ci,'smooth')} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 'm') }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
                        })}
                    </ul>
                    </div>
                </div>
            ) : null
            const timeSelectS = props.format.includes('s') ? (
                <div style={{ 'width': itemWith.value }} class="time-content" >
                    <div class="time-content-scroll" ref="refS" onScroll={(e:Event) => {scrollH(e,'refS')}}>
                        <ul>
                        {seconds.map((i, ci) => {
                            return (<li key={`${i.time}_${ci}`} onClick={() => selS(ci,'smooth')} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 's') }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
                        })}
                    </ul>
                    </div>
                </div>
            ) : null
            return (
                <div ref="target" class="m-time-picker-select">
                    {timeSelectH}
                    {timeSelectM}
                    {timeSelectS}
                </div>
            )
        }
    }
})
export default TimeSelect;