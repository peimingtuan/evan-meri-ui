/*
 * @Author: yaoyujian
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: yaoyujian
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 横幅组件
 */
import { defineComponent, h, ref, computed, toRef, } from 'vue';
import { BannerType } from "./BannerProps"

import InfoIcon from "./icon/InfoIcon";
import WarnIcon from "./icon/WarnIcon";
import ErrorIcon from "./icon/ErrorIcon";
import bannerProps from "./BannerProps"
import CloseIcon from './icon/CloseIcon';
import { IconMeriComponentCancel } from 'meri-icon'
const iconRenderMap = {
    info: () => <InfoIcon />,
    warn: () => <WarnIcon />,
    error: () => <ErrorIcon />,
    close: () => <CloseIcon />
}
const Banner = defineComponent({
    name: "Banner",
    props: bannerProps,
    emits: ['close', "update:isShow"],
    setup(props, { slots, emit }) {
        const show = ref(true)
        return () => {
            const onClick = (event: Event) => {
                show.value = false
                // classNames.push('m-banner-none')
                emit('close', event);
            };

            // banner 整体样式
            const classNames = ['m-banner'];
            if (props.closable) {
                classNames.push('m-banner-padding')
            }
            // 添加默认背景
            if (props.type === BannerType.default) {
                classNames.push("bg-blue")

            }
            // 添加错误背景
            if (props.type === BannerType.error) {
                classNames.push("bg-red")

            }
            // 添加警告背景
            if (props.type === BannerType.warn) {
                classNames.push("bg-orange")

            }

            // const bannerProps = {

            //     class: classNames,
            // };

            const closable = props.closable ? <div class="m-banner-close" onClick={onClick}>{iconRenderMap.close()}</div> : null;
            const lineClose = (props.closable) && ((slots.line)) ? <div class="m-banner-closes" onClick={onClick}>{iconRenderMap.close()}</div> : null;
            return (
                <div class={[...classNames, !show.value ? "m-banner-none" : null, props.closable ? 'm-banner-left' : null, slots.line ? 'm-slot-right' : null]} style={{ maxWidth: props.width + 'px' }}>
                    <aside id='content_banner' class={['m-banner-content', props.closable && !slots.line ? 'm-banner-left' : null]}>

                        {slots.line ? null : closable}
                        <div class='m-icon-message'>
                            <div class="m-banner-icon" >{iconRenderMap[props.type]()}</div>
                            <div class="m-banner-message">{props.message} </div>
                        </div>
                        <div class='m-icon-slot'>
                            <div>{slots.line?.()}</div>
                            {lineClose}
                        </div>
                    </aside>
                    <div class='m-banner-footer'>
                        {slots.footer?.()}
                    </div>

                </div>
            )
        }

    }
})
export default Banner;