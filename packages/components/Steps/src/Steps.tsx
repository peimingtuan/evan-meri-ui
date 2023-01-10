// @ts-nocheck
/*
 * @Author: guoxiaohuan
 * @Date: 2022-06-24 10:42:07
 * @LastEditors: guoxiaohuan
 * @LastEditTime: 2022-09-03 15:31:31
 * @Description: 
 */
import { defineComponent, h, ref, PropType, computed, onMounted } from 'vue'

import { stepsProps } from './StepsProps'
import * as components from "meri-icon";
import "meri-icon/lib/style.css"
const Steps = defineComponent({
    name: "Steps",
    props: stepsProps,
    emits: ["update:modelValue", 'change'],
    setup(props, { slots, attrs, emit }) {
        const IconMeriActionDone = components['IconMeriActionDone'];
        let curIndex: Number
        onMounted(() => {
            props.source.forEach((_item: any, _index: number) => {
                _item.size = new Blob([_item.title]).size
                if (_item.id == props.modelValue) {
                    curIndex = _index
                }
            })
        })
        // item点击事件
        function itemChange(_item: any, _index: Number, e: any) {
            if (props.readonly == 'true' || props.modelValue == null) return
            // 将当前index赋值
            curIndex = _index
            emit("update:modelValue", _item.id);
            emit('change', _item, e)
        }
        // 设置间距padding
        const stylePadding = computed(() => {
            if (typeof props.space !== 'number') {
                Number(props.space)
            }
            return {
                '--padding-vertical': props.layout == 'vertical' ? props.space + 'px' : 0,
                '--padding-horizontal': props.layout == 'horizontal' ? (props.space / 2) + 'px' : 0
            }
        });
        return () => {
            let { modelValue, category, source, layout, size, lineType, defaultColor, readonly, space } = props;
            let classNames = ['m-steps', `is-${layout}`]
            const wrapperClassName = ['m-steps-item-wrapper', `is-${size}`]
            if (category != 'default') {
                if (readonly == 'false') {
                    wrapperClassName.push('m-steps-item-wrapper-hover')
                } else {
                    wrapperClassName.push('m-steps-item-wrapper-not')
                }
            }

            // 间距设置
            const stepsProps = {
                ...attrs,
                class: classNames
            }
            return (
                <div {...stepsProps} >
                    {source && source.map((_item: any, _index: Number) => {
                        let CurrenIcon: any;
                        if (category == 'icon') {
                            CurrenIcon = components[_item.icon];
                        }
                        return <div key={_index} class={[`m-steps-item-${layout}`]} onClick={(e) => itemChange(_item, _index, e?.target)} style={{ "--padding-vertical": stylePadding.value["--padding-vertical"], '--padding-horizontal': stylePadding.value["--padding-horizontal"] } as any}>
                            {_index != source.length - 1 ? <div class={[`m-steps-item-${size}-tail-${category}`, `m-steps-${lineType}`]}></div> : null}
                            <div class={['m-steps-item', `m-steps-item-${size}-${category}`, category != 'default' && readonly == 'true' && 'm-steps-item-label-not', category != 'default' && readonly == 'false' && 'm-steps-item-label-hover']} >
                                {
                                    category == 'icon' ? <CurrenIcon size={size == 'small' ? 16 : 20} color={modelValue == _item.id || _index < curIndex ? '#246FE5' : ''} /> :
                                        (defaultColor == 'false' && category == 'default' && _item.color
                                            ? <div class={[`m-steps-item-${size}-${category}-content`, category == 'default' && _item.status && `m-steps-${_item.status}`]} style={{ backgroundColor: _item.color }}></div>
                                            : <div class={[`m-steps-item-${size}-${category}-content`, category == 'default' && !_item.status && 'm-bg-default', category == 'default' && _item.status && `m-steps-${_item.status}`, modelValue == _item.id && "m-steps-item-active", _index < curIndex && "m-steps-item-success"]}>
                                                {category == 'number'
                                                    ? (_index < curIndex ? <svg width={size == 'small' ? 8 : 10} height={size == 'small' ? 8 : 10} viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9413 1.31435L3.31446 5.94119L1.00011 3.62684" stroke="#246FE5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg> : <span class={'m-steps-index'}>{_index + 1}</span>)
                                                    : null}</div>)
                                }
                            </div>
                            <div class={wrapperClassName} style={{ marginLeft: layout == 'vertical' ? category == 'default' ? '16px' : size == 'medium' ? '32px' : '24px' : 0, marginTop: layout == 'horizontal' ? category == 'default' ? '20px' : '30px' : 0 }}>
                                {_item.size >= 30 ? <m-tips content={_item.title} showArrow={false} placement={"top-start"}>
                                    <div class='m-steps-item-title' >{_item.title}</div>
                                </m-tips> : <div class='m-steps-item-title'>{_item.title}</div>}
                                <div class='m-steps-item-prompt'>{_item.tips}</div>
                            </div>
                        </div>
                    })}
                </div >
            )
        }
    }
})

export default Steps;