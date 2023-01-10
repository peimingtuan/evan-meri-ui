/*
 * @FilePath: index.ts
 * @Author: zhangjiaqi
 * @Date: 2022-08-01 15:07:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 16:06:00
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { TimeType } from '../../utils/types'
import { countNumber } from '../../utils/tools'
/**
 * 
 * @param type 时间类型
 * @param range 是否时间段
 * @returns 返回预展示时间初始值
 */
// 单个对象
export type Time = {
    starttime: string;
    endtime: string;
}
export type Item = {
    time: string;
    disabled: boolean;
}
const querTo = (fmt: string) => {
    const date = new Date()
    const o = {
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
};
export const usePreTime = (type: TimeType, range = false, currentTime: boolean, scopeTime: string, stepH: number, stepM: number, stepS: number): Time => {
    let initTime: Time = {
        starttime: '',
        endtime: ''
    };
    const scopeStart = scopeTime ? scopeTime.split('-')[0] : '';
    const scopeEnd = scopeTime ? scopeTime.split('-')[1] : '';
    switch (type) {
        case 'h':
        case 'm':
        case 's':
            if (range) {
                if (currentTime) {
                    const time = type == 'h' ? querTo('HH') : type == 'm' ? querTo('mm') : querTo('ss');
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                            initTime.endtime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                        } else {
                            initTime.starttime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                            initTime.endtime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                        }
                    } else {
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = time;
                            initTime.endtime = time;
                        } else {
                            initTime.starttime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                            initTime.endtime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                        }
                    }
                } else {
                    if (scopeTime) {
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = scopeStart;
                            initTime.endtime = scopeStart;
                        } else {
                            const [hours, minutes, seconds] = countNumber(stepH, stepM, stepS);
                            //根据scope修改数据源disabled属性，
                            const cusS = findSelTime(seconds, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            const cusM = findSelTime(minutes, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            const cusH = findSelTime(hours, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            initTime.starttime = type == 'h' ? cusH : type == 'm' ? cusM : cusS;
                            initTime.endtime = type == 'h' ? cusH : type == 'm' ? cusM : cusS
                        }
                    } else {
                        initTime.starttime = '00';
                        initTime.endtime = '00';
                    }
                }
            } else {
                //如果传入当前时间参数
                if (currentTime) {
                    // //如果传入scopeTime
                    const time = type == 'h' ? querTo('HH') : type == 'm' ? querTo('mm') : querTo('ss');
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                        } else {
                            initTime.starttime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                        }
                    } else {
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = type == 'h' ? querTo('HH') : type == 'm' ? querTo('mm') : querTo('ss')
                        } else {
                            initTime.starttime = queryStartTime(type, stepH, stepM, stepS, scopeStart, scopeEnd, time) || ''
                        }
                    }
                } else {
                    //如果传入scopeTime
                    if (scopeTime) {
                        //如果刻度都是1，那么就去第一个scopeTime为初始时间
                        if (stepH == 1 && stepM == 1 && stepS == 1) {
                            initTime.starttime = scopeStart;
                        } else {
                            const [hours, minutes, seconds] = countNumber(stepH, stepM, stepS);
                            //根据scope修改数据源disabled属性，
                            const cusS = findSelTime(seconds, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            const cusM = findSelTime(minutes, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            const cusH = findSelTime(hours, scopeStart, scopeEnd).find(i => !i.disabled)?.time as string;
                            initTime.starttime = type == 'h' ? cusH : type == 'm' ? cusM : cusS
                        }
                    } else {
                        initTime.starttime = '00';
                    }
                }
            }
            break;
        case 'hm':
        case 'ms':
            if (range) {
                if (currentTime) {
                    //如果传入scopeTime
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        const time = type == 'hm' ? querTo('HH:mm') : querTo('mm:ss')
                        initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                        initTime.endtime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                    } else {
                        initTime.starttime = type == 'hm' ? querTo('HH:mm') : querTo('mm:ss');
                        initTime.endtime = type == 'hm' ? querTo('HH:mm') : querTo('mm:ss')
                    }
                } else {
                    //如果传入scopeTime
                    if (scopeTime) {
                        initTime.starttime = scopeStart;
                        initTime.endtime = scopeStart;
                    } else {
                        initTime.starttime = '00:00';
                        initTime.endtime = '00:00';
                    }
                }
            } else {
                //如果传入当前时间参数
                if (currentTime) {
                    //如果传入scopeTime
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        const time = type == 'hm' ? querTo('HH:mm') : querTo('mm:ss')
                        initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                    } else {
                        initTime.starttime = type == 'hm' ? querTo('HH:mm') : querTo('mm:ss')
                    }
                } else {
                    //如果传入scopeTime
                    if (scopeTime) {
                        initTime.starttime = scopeStart;
                    } else {
                        initTime.starttime = '00:00';
                    }
                }

            }
            break;
        case 'hms':
            if (range) {
                if (currentTime) {
                    //如果传入scopeTime
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        const time = querTo('HH:mm:ss')
                        initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                        initTime.endtime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                    } else {
                        initTime.starttime = querTo('HH:mm:ss');
                        initTime.endtime = querTo('HH:mm:ss');
                    }
                } else {
                    //如果传入scopeTime
                    if (scopeTime) {
                        initTime.starttime = scopeStart;
                        initTime.endtime = scopeStart;
                    } else {
                        initTime.starttime = '00:00:00';
                        initTime.endtime = '00:00:00';
                    }
                }
            } else {
                //如果传入当前时间参数
                if (currentTime) {
                    //如果传入scopeTime
                    if (scopeTime) { //如果scopeTime时间开始值大于当前时间，默认展示scopeTime
                        const time = querTo('HH:mm:ss')
                        initTime.starttime = (time > scopeStart && time<scopeEnd) ? time : scopeStart;
                        // if (stepH == 1 && stepM == 1 && stepS == 1) {
                        //     initTime.starttime = scopeStart > time ? scopeStart : time;
                        // } else {
                        //     const [hours, minutes, seconds] = countNumber(stepH, stepM, stepS);
                        //     //找到第一个大于disabled得秒，为当前开始秒，
                        //     const scopeStartS = scopeStart.slice(6, 8);
                        //     const scopeEndS = scopeEnd.slice(6, 8);
                        //     const scopeStartH = scopeStart.slice(0, 2);
                        //     const scopeEndH = scopeEnd.slice(0, 2);
                        //     const scopeStartM = scopeStart.slice(3, 5);
                        //     const scopeEndM = scopeEnd.slice(3, 5);

                        //     //跟进scope属性修改disabled属性
                        //     const cusS = findSelTime(seconds, scopeStartS, scopeEndS);
                        //     const cusM = findSelTime(minutes, scopeStartM, scopeEndM);
                        //     const cusH = findSelTime(hours, scopeStartH, scopeEndH);
                        //     let curH = querTo('HH'),
                        //         curM = querTo('mm'),
                        //         curS = querTo('ss');
                        //     if (stepS > 1) {
                        //         // 找到第一个大于当前秒，而且不是disabled得，如果有，默认为找到得时间，如果没有找到，重置第一个时间为当前时间，分加一处理
                        //         const isIncludesS = cusS.find(i => i.time >= curS && !i.disabled);
                        //         if (isIncludesS) {
                        //             curS = isIncludesS.time
                        //         } else {
                        //             curS = cusS.find(i => !i.disabled)?.time as string;
                        //             //此时需要分进一位，而且进位之后在判断小时需要进位
                        //             curM = Number(curM) + 1 > 10 ? (Number(curM) + 1).toString() : '0' + (Number(curM) + 1);
                        //             const isIncludesM = cusM.find(i => i.time >= curM && !i.disabled);
                        //             //判断分进位之后是否在刻度内，如果不在，需要H进位，分为第一个可选，
                        //             if (!isIncludesM) {
                        //                 curM = cusM.find(i => !i.disabled)?.time as string;
                        //                 //  小时进位
                        //                 curH = Number(curH) + 1 > 10 ? (Number(curH) + 1).toString() : '0' + (Number(curH) + 1);
                        //             }
                        //             const isIncludesH = cusH.find(i => i.time >= curH && !i.disabled);
                        //             if (!isIncludesH) {
                        //                 curH = cusH.find(i => !i.disabled)?.time as string;
                        //             }
                        //         }

                        //     }
                        //     debugger
                        //     if(stepM>1){
                        //         // 找到第一个大于当前秒，而且不是disabled得，如果有，默认为找到得时间，如果没有找到，重置第一个时间为当前时间，分加一处理
                        //         // let isIncludesM = '';
                        //         const isIncludesM = cusM.find(i => i.time >= curM && !i.disabled);//需要结合小时，判断分，
                        //         //判断当前小时，是否在时得可选范围内，如果当前时等于可选开始，那么
                        //         // TODO
                        //         if (isIncludesM) {
                        //             curM = isIncludesM.time;
                        //         } else {
                        //             curM = cusM.find(i => !i.disabled)?.time as string;
                        //             //此时需要分进一位，而且进位之后在判断小时需要进位
                        //             curH = Number(curH) + 1 > 10 ? (Number(curH) + 1).toString() : '0' + (Number(curH) + 1);
                        //             const isIncludesH = cusH.find(i => i.time >= curH && !i.disabled);
                        //             //判断分进位之后是否在刻度内，如果不在，需要H进位，分为第一个可选，
                        //             if (!isIncludesH) {
                        //                 curH = cusH.find(i => !i.disabled)?.time as string;
                        //             }
                        //         }
                        //     }
                        //     if(stepH>1){
                        //         // 找到第一个大于当前秒，而且不是disabled得，如果有，默认为找到得时间，如果没有找到，重置第一个时间为当前时间，分加一处理
                        //         const isIncludesH = cusH.find(i => i.time >= curH && !i.disabled);
                        //         if (isIncludesH) {
                        //             curH = isIncludesH.time
                        //         } else {
                        //             curH = cusH.find(i => !i.disabled)?.time as string;
                        //         }
                        //     }
                        //     initTime.starttime = `${curH}:${curM}:${curS}`
                        // }
                    } else {
                        initTime.starttime = querTo('HH:mm:ss')
                        // if (stepH == 1 && stepM == 1 && stepS == 1) {
                        //     initTime.starttime = querTo('HH:mm:ss')
                        // } else {
                        //     const [hours, minutes, seconds] = countNumber(stepH, stepM, stepS);
                        //     let curH = querTo('HH'),
                        //         curM = querTo('mm'),
                        //         curS = querTo('ss');
                        //     if (stepS > 1) {
                        //         const isIncludesS = seconds.find(i => i.time >= curS)
                        //         if (isIncludesS) {
                        //             curS = isIncludesS.time;
                        //             //秒为当前秒，需要判断分是否在刻度内
                        //             const isIncludesM = minutes.find(i => i.time >= curM);
                        //             //判断分进位之后是否在刻度内，如果不在，需要H进位，分为00
                        //             if (!isIncludesM) {
                        //                 curM = '00';
                        //                 curH = Number(curH) + 1 > 10 ? (Number(curH) + 1).toString() : '0' + (Number(curH) + 1)

                        //             }
                        //             const isIncludesH = hours.find(i => i.time >= curH);
                        //             if (!isIncludesH) {
                        //                 curH = '00';
                        //             }
                        //         } else {
                        //             curS = '00';
                        //             //此时需要分进一位，而且进位之后在判断小时需要进位
                        //             curM = Number(curM) + 1 > 10 ? (Number(curM) + 1).toString() : '0' + (Number(curM) + 1);
                        //             const isIncludesM = minutes.find(i => i.time >= curM);
                        //             //判断分进位之后是否在刻度内，如果不在，需要H进位，分为00
                        //             if (!isIncludesM) {
                        //                 curM = '00';
                        //                 curH = Number(curH) + 1 > 10 ? (Number(curH) + 1).toString() : '0' + (Number(curH) + 1)

                        //             }
                        //             const isIncludesH = hours.find(i => i.time >= curH);
                        //             if (!isIncludesH) {
                        //                 curH = '00';
                        //             }

                        //         }

                        //     }
                        //     if (stepM > 1) { //如果分也存在刻度
                        //         const isIncludesM = minutes.find(i => i.time >= curM);
                        //         if (isIncludesM) {
                        //             curM = isIncludesM.time;
                        //         } else {
                        //             curM = '00';
                        //             curH = Number(curH) + 1 > 10 ? (Number(curH) + 1).toString() : '0' + (Number(curH) + 1)
                        //             const isIncludesH = hours.find(i => i.time >= curH);
                        //             if (!isIncludesH) {
                        //                 curH = '00';
                        //             }
                        //             //判断分进位之后是否在刻度内，如果不在，需要H进位，分为00

                        //         }
                        //     }
                        //     if (stepH > 1) {
                        //         // curH = hours.find(i => i.time >= curH)?.time as string
                        //         const isIncludesH = hours.find(i => i.time >= curH);
                        //         if (isIncludesH) {
                        //             curH = isIncludesH.time;
                        //         } else {
                        //             curH = '00';
                        //         }
                        //     }


                        //     initTime.starttime = `${curH}:${curM}:${curS}`
                        // }
                    }
                } else {
                    //如果传入scopeTime
                    if (scopeTime) {
                        initTime.starttime = scopeStart;
                    } else {
                        initTime.starttime = '00:00:00';
                    }
                }
            }
            break;
    }
    return initTime
}
/**
 * 
 * @param start 替换开始
 * @param end 替换结束位置
 * @param pri 替换之前原数据
 * @param togg 要替换的数据
 * @returns 替换之后的数据
 */
export const toggleStr = (start: number, end: number, pri: string, togg: string | number, type: string): string => {
    let result: string = '';
    switch (type) {
        case 'h':
        case 'm':
        case 's':
            result = togg > 9 ? togg.toString() : '0' + togg
            break;
        case 'hm':
        case 'ms':
        case 'hms':
            const st = pri.slice(0, start);
            const et = pri.slice(end, pri.length)
            const ct = togg > 9 ? togg : '0' + togg
            result = `${st}${ct}${et}`
            break;
    }
    return result
}
/**
 * 
 * @param start 替换开始
 * @param end 替换结束位置
 * @param pri 替换之前原数据
 * @param togg 要替换的数据
 * @returns 替换之后的数据
 */
export const queryDefaultTime = (start: number, end: number, pri: string): number => {
    const st = pri.slice(start, end);
    return Number(st)
}
const findSelTime = (source: Array<Item>, scopeStart: string, scopeEnd: string) => {
    if (!scopeStart && !scopeEnd) return source
    return source.map((i: Item) => {
        return {
            time: i.time,
            disabled: Number(i.time) < Number(scopeStart) || Number(i.time) > Number(scopeEnd)
        }
    })

}
const queryCanselTime = (curtime: string, cus: Array<Item>) => {

    if (curtime < cus[0]?.time || curtime > cus[cus.length - 1]?.time) {
        return cus[0]?.time
    } else { //如果在范围内，默认取第一个大于或者等于当前的时间
        return cus.find(i => !i.disabled && i.time >= curtime)?.time as string;
    }
}
const queryStartTime = (type: string, stepH: number, stepM: number, stepS: number, scopeStart: string, scopeEnd: string, time: string) => {
    const [hours, minutes, seconds] = countNumber(stepH, stepM, stepS);

    //根据scope修改数据源disabled属性，
    const cusS = findSelTime(seconds, scopeStart, scopeEnd).filter(i => !i.disabled) || [];
    const cusM = findSelTime(minutes, scopeStart, scopeEnd).filter(i => !i.disabled) || [];
    const cusH = findSelTime(hours, scopeStart, scopeEnd).filter(i => !i.disabled) || [];
    if (type == 'h') {
        return queryCanselTime(time, cusH)
    }
    if (type == 'm') {
        return queryCanselTime(time, cusM)
    }
    if (type == 's') {
        return queryCanselTime(time, cusS)
    }

}