/*
 * @Author: zhangjiaqi
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-21 10:10:57
 * @Description: 头像组件
 */
import { CSSProperties, defineComponent, h, Teleport, Transition, watchEffect, reactive, Fragment } from 'vue';
import { usePopPosition } from '../../utils/usePopPosition'
import guideProps from "./GuideProps"
import Button from '../../button/src/Button';
import { templateRef } from '@vueuse/core';
import { Size } from '../../utils/types'
const Guide = defineComponent({
    name: "Guide",
    props: guideProps,
    emits: ['close', 'closeall'],
    setup(props, { attrs, slots, emit }) {
        // class list 
        const classNames = ['m-guide-pop'];
        if (props.effect == 'blue') {
            classNames.push('bg-blue')
        }
        const cssStyleVars: CSSProperties = reactive({})
        const arrowStyleVars: CSSProperties = reactive({})
        // 当前显示的弹窗  
        const refpop = templateRef<HTMLElement>('popup', null);
        const toggle = (e: Event) => {
            emit('close', e)
        }
        const closeall = (e: Event) => {
            emit('closeall', e)
        }
        const slotsDom = slots?.default?.();
        let timer: NodeJS.Timer | null = null;

        const computedStyle = () => {
            const { useGuideStyle } = usePopPosition(refpop, slotsDom, props.flow, 8, props.deviationLeft, props.deviationTop);
            Object.keys(useGuideStyle).forEach((key) => {
                cssStyleVars[key] = useGuideStyle[key];
            })
            const { useArrowStyle } = usePopPosition(refpop, slotsDom, props.flow, 8, props.deviationLeft, props.deviationTop, props.deviationArrow);
            Object.keys(useArrowStyle).forEach((key) => {
                arrowStyleVars[key] = useArrowStyle[key];
            })
        }

        watchEffect(() => {
            if (props.visible) {
                timer = setInterval(() => {
                    computedStyle()
                }, 300)
            } else {
                clearInterval(Number(timer))
            }
        })
        return () => {
            // 标题
            const title = props.title ? (<p class="m-guide-pop-title">{props.title}</p>) : null;
            // 内容
            const content = props.content ? (<p class={props.title ? "m-guide-pop-contentOpcity" : "m-guide-pop-content"}>{props.content}</p>) : null;
            // 单步骤
            const single = (<div class="m-guide-pop-bottom"><Button onClick={(e: Event) => toggle(e)}>{props.singleText}</Button></div>);
            //多步骤
            const multiple = (<div class="m-guide-pop-multiple">
                <section>
                    <span>{props.stepTip.gi}</span><span class="m-guide-pop-multiple-lspan">/{props.stepTip.count}</span>
                </section>
                <section>
                    <span class="m-guide-pop-multiple-rspan" onClick={(e: Event) => closeall(e)}>{props.stepTip.jumptext}</span>
                    <Button size={Size.small} onClick={(e: Event) => toggle(e)}>{props.stepTip.nexttext}</Button>
                </section>
            </div>);
            //三角位置
            // const arrow = 
            const window = (
                props.visible ? <Teleport to="body">
                    <Transition name="zoom-in-top">
                        {
                            <div>
                                <div
                                    ref="popup"
                                    class={classNames}
                                    style={{ ...cssStyleVars }}
                                >
                                    {slots.guidtitle ? slots?.guidtitle?.() : title}
                                    {slots.guidcontent ? slots.guidcontent?.() : content}
                                    {slots.guidstep ? slots.guidstep?.() : props.step === "single" ? single : multiple}

                                </div>
                                <div style={{ ...arrowStyleVars }} class="m-guide-arrow"></div>
                            </div>
                        }
                    </Transition>
                </Teleport> : null
            )
            const trigerOptions = {
                ...attrs,
            }

            return (
                <>
                    <div  {...trigerOptions}>
                        {slotsDom}
                    </div>
                    {window}
                </>
            )
        }
    }
})
export default Guide;
