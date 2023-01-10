/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-22 20:27:22
 * @Description: 时间组件
 */
import {  CSSProperties, defineComponent, h, } from 'vue';
import { TimePickerTriggerProps } from './TimePickerProps';
import { countNumber } from '../../utils/tools'
import { debounce } from "lodash";
import { nextTick } from 'vue';
import { ref } from 'vue';
import { templateRef } from '@vueuse/core';
import { computed } from 'vue';
import { usePreTime, toggleStr, queryDefaultTime } from '../utiles/index'
import { onMounted } from 'vue';

const TimeSelect = defineComponent({
    name: "TimeSelect",
    props: TimePickerTriggerProps,
    emits: ['update:modelValue','change'],
    setup(props, { slots, attrs, emit }) {
        const [hours, minutes, seconds] = countNumber(props.stepH,props.stepM,props.stepS);
        const refH = templateRef<any>('refH', null);
        const refM = templateRef<any>('refM', null);
        const refS = templateRef<any>('refS', null);
        //时
        let htimer: NodeJS.Timer | null = null;
        const contentClass = ['time-content']
        if (props.format.length == 1) {
            contentClass.push('time-content-single')
        } else {
            contentClass.push('time-content-mul')
        }

        const itemWith = computed(() => {
            return props.format.length !== 1 ? '56px' : '124px'
        })
        const ulWith = computed(() => {
            return props.format.length !== 1 ? '64px' : '132px'
        })
        //预渲染time
        const isActive = (v: string, t: string) => {
            if (t == 'h') {
                return props.modelValue.slice(0, 2) == v
            } else if (t == 'm') {
                return props.format == 'm' || props.format == 'ms' ? props.modelValue.slice(0, 2) == v : props.modelValue.slice(3, 5) == v
            } else {
                return props.format == 's' ? props.modelValue.slice(0, 2) == v : props.format == 'ms' ? props.modelValue.slice(3, 5) == v : props.modelValue.slice(6, 8) == v
            }

        }
        onMounted(() => {
            //获取默认时间传入，设置默认滚动距离
            if (props.format.includes('h')) {
                const defaultH = queryDefaultTime(0, 2, props.modelValue);
                if(props.stepH>1){
                    //判断小时是否在初始化数据中
                    // if(hours.filter( i => Number(i.time) == defaultH).length){
                    //     setTime(refH, defaultH,'',props.stepH)
                    // }else{
                        // debugger
                        const defa:any = hours.find( i => Number(i.time)>=defaultH);
                        setTime(refH, Number(defa.time),'',props.stepH)
                    // }
                }else{
                    setTime(refH, defaultH,'',props.stepH)
                }
                
            }
            if (props.format.includes('m')) {
                const defaultM = props.format === 'm' || props.format === 'ms' ? queryDefaultTime(0, 2, props.modelValue) : queryDefaultTime(3, 5, props.modelValue);
                if(props.stepM>1){
                    //判断小时是否在初始化数据中
                    if(minutes.filter( i => Number(i.time) == defaultM).length){
                        setTime(refM, defaultM,'',props.stepM)
                    }else{
                        const defa:any = minutes.find( i => Number(i.time)>defaultM);
                        setTime(refM, Number(defa.time),'',props.stepM)
                    }
                }else{
                    setTime(refM, defaultM,'',props.stepM)
                }
            }
            if (props.format.includes('s')) {
                const defaultS = props.format === 's' ? queryDefaultTime(0, 2, props.modelValue) : props.format === 'ms' ? queryDefaultTime(3, 5, props.modelValue) : queryDefaultTime(6, 8, props.modelValue);
                // setTime(refS, defaultS,'',props.stepS)
                if(props.stepS>1){
                    //判断小时是否在初始化数据中
                    if(seconds.filter( i => Number(i.time) == defaultS).length){
                        setTime(refS, defaultS,'',props.stepS)
                    }else{
                        const defa:any = seconds.find( i => Number(i.time)>defaultS);
                        setTime(refS, Number(defa.time),'',props.stepS)
                    }
                }else{
                    setTime(refS, defaultS,'',props.stepS)
                }
            }


        })
        //小时滚动
        const scrollH = debounce((e: Event, v) => {
            if (htimer) clearTimeout(htimer);
            const target = (e.target || e) as any;
            const setpType = v=='refM'?props.stepM:v=="refH"?props.stepH:props.stepS;
            const st = Math.ceil(target.scrollTop / 34)*Number(setpType);
            const cust = st < 10 ? '0' + st : st.toString();
            if (v == 'refM') {
                //如果滚动到disbled，不触发emit
                if (!isDisabledM(cust)) {
                    //滚动分的时候判断是否有秒，如果有而有scope，且秒不在scoped内部，需要重置秒为第一个可选的的值
                    if (props.scopeTime && props.format.includes('s')) {
                        if (props.format == 'ms' && isDisabledS(props.modelValue.slice(3, 5), cust)) {
                            // 判断当前时间的分和scoped的分是否相等，如果相等，需要定位秒为第一个可选的的秒，
                            if (props.scopeTime.split('-')[0].slice(0, 2) == cust) {
                                const t = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).starttime.slice(3, 5);
                                const sindex = seconds.findIndex(i => t == i.time)
                                setTime(refS, sindex,'',props.stepS)
                            } else if (props.scopeTime.split('-')[1].slice(0, 2) == cust) {
                                setTime(refS, 0,'',props.stepS)
                            } else {
                                setTime(refS, st,'',props.stepS)
                            }
                        } else if (props.format == 'hms') {
                            if (isDisabledS(props.modelValue.slice(6, 8), cust)) {
                                if (props.scopeTime.split('-')[0].slice(3, 5) == cust) {
                                    const t = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).starttime.slice(6, 8);
                                    const sindex = seconds.findIndex(i => t == i.time)
                                    setTime(refS, sindex,'',props.stepS)
                                } else if (props.scopeTime.split('-')[1].slice(3, 5) == cust) {
                                    setTime(refS, 0,'',props.stepS)
                                } else {
                                    setTime(refS, st,'',props.stepS)
                                }
                            } else {
                                setTime(refS, queryDefaultTime(6, 8, props.modelValue),'',props.stepS)
                            }
                        }
                    }
                    if (props.format == 'ms') {
                        // emit('update:modelValue', toggleStr(0, 2, props.modelValue, st, props.format))
                        emitList(toggleStr(0, 2, props.modelValue, st, props.format))
                    } else {
                        // emit('update:modelValue', toggleStr(3, 5, props.modelValue, st, props.format))
                        emitList(toggleStr(3, 5, props.modelValue, st, props.format))
                    }
                }

            } else if (v == 'refH') {
                //如果滚动到disbled，不触发emit
                if (!isDisabledH(cust)) {
                    //滚动时的时候判断是否有分，如果有而有scope，且分不在scoped内部，需要重置分为第一个可选的的值
                    if (props.scopeTime && props.format.includes('m')) {
                        if (isDisabledM(props.modelValue.slice(3, 5), cust)) {
                            // 判断当前时间的时和scoped的时是否相等，如果相等，需要定位分为第一个可选的的分，
                            if (props.scopeTime.split('-')[0].slice(0, 2) == cust) {
                                const t = usePreTime(props.format, props.range, props.currentTime, props.scopeTime,props.stepH,props.stepM,props.stepS).starttime.slice(3, 5);
                                const mindex = minutes.findIndex(i => t == i.time)
                                setTime(refM, mindex,'',props.stepM)
                            } else if (props.scopeTime.split('-')[1].slice(0, 2) == cust) {
                                setTime(refM, 0,'',props.stepM)
                            } else {
                                setTime(refM, st,'',props.stepM)
                            }
                        } else {
                            setTime(refM, queryDefaultTime(3, 5, props.modelValue),'',props.stepM)
                        }
                    }
                    if (props.scopeTime && props.format.includes('s')) {
                        //判断当前秒是否可选，如果可选状态，直接滚动秒为props.modelValue 的秒
                        setTime(refS, queryDefaultTime(6, 8, props.modelValue),'',props.stepS)
                    }
                    // emit('update:modelValue', toggleStr(0, 2, props.modelValue, st, props.format))
                    emitList(toggleStr(0, 2, props.modelValue, st, props.format))
                }

            } else {
                //如果滚动到disbled，不触发emit
                if (!isDisabledS(cust)) {
                    if (props.format == 'ms') {
                        // emit('update:modelValue', toggleStr(3, 5, props.modelValue, st, props.format))
                        emitList(toggleStr(3, 5, props.modelValue, st, props.format))
                    } else {
                        // emit('update:modelValue', toggleStr(6, 8, props.modelValue, st, props.format))
                        emitList(toggleStr(6, 8, props.modelValue, st, props.format))
                    }
                }

            }

            //滚动后，根据滚动的距离，动态设置当前预渲染time
            htimer = setTimeout(() => {
                target.scrollTop = st * 34/Number(setpType);
                clearTimeout(Number(htimer));
                htimer = null;
            }, 40);
        }, 60)
        const emitList = (v:string) => {
            emit('update:modelValue',v)
            emit('change')
        }
        //选中时刻
        const setTime = (target: any, i: number, type?: string,step?:number) => {
            // const setpType = target=='refM'?props.stepM:target=="refH"?props.stepH:props.stepS;
            const obj = type ? { top: i * 34/Number(type?1:step), behavior: 'smooth' } : { top: i * 34/Number(type?1:step) }
            target.value.scrollTo(obj)
        }
        //判断小时禁用
        const isDisabledH = (v: string) => {
            if (props.scopeTime) {
                const scopeStart = props.scopeTime.split('-')[0];
                const scopeEnd = props.scopeTime.split('-')[1];
                //如果当前时刻小于开始或者大于结束，那么禁用
                return v < scopeStart.slice(0, 2) || v > scopeEnd.slice(0, 2)
            } else {
                return false
            }
        }
        //判断分禁用
        const isDisabledM = (v: string, h?: string) => {
            if (props.scopeTime) {
                const scopeStart = props.scopeTime.split('-')[0];
                const scopeEnd = props.scopeTime.split('-')[1];
                // 先判断有没有H
                if (props.format.includes('h')) {
                    //获取当前时，如果当前时和scoped的开始时相等，
                    const H = h ? h : props.modelValue.slice(0, 2)
                    //获取scoped开始时和结束
                    const startH = scopeStart.slice(0, 2);
                    const endH = scopeEnd.slice(0, 2);
                    const startM = scopeStart.slice(3, 5);
                    const endM = scopeEnd.slice(3, 5)
                    //如果相等，那么分根据传入的来disabled

                    if (H == startH && H == endH) {  //如果scoped的开始和结束相等，那么分在 startM 和endM 直接的可选
                        return v < startM || v > endM
                    } else if (H == startH) {
                        return v < startM
                    } else if (H == endH) {
                        return v > endM
                    } else {
                        return false
                    }

                } else {
                    //如果当前秒小于开始或者大于结束，那么禁用
                    return v < scopeStart.slice(0, 2) || v > scopeEnd.slice(0, 2)
                }
            } else {
                return false
            }
        }
        //判断秒禁用
        const isDisabledS = (v: string, m?: string) => {
            if (props.scopeTime) {
                const scopeStart = props.scopeTime.split('-')[0];
                const scopeEnd = props.scopeTime.split('-')[1];
                // 先判断有没有分
                if (props.format == 'ms') {
                    //获取当前分，如果当前分和scoped的开始分相等，
                    const M = m ? m : props.modelValue.slice(0, 2)
                    //获取scoped开始时和结束
                    const startM = scopeStart.slice(0, 2);
                    const endM = scopeEnd.slice(0, 2);
                    const startS = scopeStart.slice(3, 5);
                    const endS = scopeEnd.slice(3, 5)
                    //如果相等，那么分根据传入的来disabled
                    if (M == startM && M == endM) {  //如果scoped的开始和结束相等，那么分在 startM 和endM 直接的可选
                        return v < startS || v > endS
                    } else if (M == startM) {
                        return v < startS
                    } else if (M == endM) {
                        return v > endS
                    } else {
                        return false
                    }

                } else if (props.format == 'hms') {//如果是时分秒
                    //获取当前时
                    const H = props.modelValue.slice(0, 2)
                    //获取scoped时
                    const SstartH = scopeStart.slice(0, 2)
                    const SendH = scopeEnd.slice(0, 2)
                    //获取当前分，如果当前分和scoped的开始分相等，
                    const M = m ? m : props.modelValue.slice(3, 5)
                    //获取scoped开始时和结束
                    const startM = scopeStart.slice(3, 5);
                    const endM = scopeEnd.slice(3, 5);
                    const startS = scopeStart.slice(6, 8);
                    const endS = scopeEnd.slice(6, 8)
                    //如果相等，那么分根据传入的来disabled
                    if (M == startM && M == endM && H == SstartH && H == SendH) {  //如果当前时和scoped的开始时结束时相等，而且分也相等，秒需要在scoped 中的秒内部可选
                        return v < startS || v > endS
                    } else if (M == startM && H == SstartH) { //如果当前时和当前分相等，那么秒需要在大于scoped的开始秒
                        return v < startS
                    } else if (M == endM && H == SendH) {
                        return v > endS
                    } else {
                        return false
                    }

                } else {
                    //如果当前分小于开始或者大于结束，那么禁用
                    return v < scopeStart.slice(0, 2) || v > scopeEnd.slice(0, 2)
                }
            } else {
                return false
            }
        }
        return () => {
            const timeSelectH = (props.format.includes('h') || props.format === 'h') ? (
                <div style={{ 'width': itemWith.value }} class={contentClass} >
                    <div class="time-content-scroll" style={{ 'width': ulWith.value }} ref="refH" onScroll={(e: Event) => { scrollH(e, 'refH') }}>
                        <ul>
                            {hours.map((i, ci) => {
                                return (<li key={`${i.time}_${ci}`} onClick={() => setTime(refH, ci, 'smooth',props.stepH)} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 'h'), 'disabled': isDisabledH(i.time) }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            ) : null
            const timeSelectM = props.format.includes('m') ? (
                <div style={{ 'width': itemWith.value }} class={contentClass} >
                    <div class="time-content-scroll" style={{ 'width': ulWith.value }} ref="refM" onScroll={(e: Event) => { scrollH(e, 'refM') }}>
                        <ul>
                            {minutes.map((i, ci) => {
                                return (<li key={`${i.time}_${ci}`} onClick={() => setTime(refM, ci, 'smooth',props.stepM)} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 'm'), 'disabled': isDisabledM(i.time) }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            ) : null
            const timeSelectS = props.format.includes('s') ? (
                <div style={{ 'width': itemWith.value }} class={contentClass} >
                    <div class="time-content-scroll" style={{ 'width': ulWith.value }} ref="refS" onScroll={(e: Event) => { scrollH(e, 'refS') }}>
                        <ul>
                            {seconds.map((i, ci) => {
                                return (<li key={`${i.time}_${ci}`} onClick={() => setTime(refS, ci, 'smooth',props.stepS)} class={["time-item", { 'time-item-iscurrent': isActive(i.time, 's'), 'disabled': isDisabledS(i.time) }]} style={{ 'width': itemWith.value }}>{i.time}</li>)
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