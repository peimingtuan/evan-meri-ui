// @ts-nocheck
import { defineComponent, h, ref, PropType, computed, TransitionGroup, createApp, Teleport, createVNode, render, VNode, nextTick } from 'vue';
import MButton from '../../button/index';
import { IconMeriActionClose } from 'meri-icon'
import color from "../../utils/color";
import { onClickOutside, useMutationObserver } from '@vueuse/core'


const DrawerProps = {
    //组件是否显示
    show: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    //宽度
    width: {
        type: Number as PropType<number>,
    },
    // 弹窗的标题
    title: {
        type: String as PropType<string>,
        default: ""
    },
    //蒙层是否显示
    shadow: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    //是否开启点击蒙层关闭
    shadowClick: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    //底部是否固定 
    footFixed: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    // 是否显示侧弹窗
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    height: {
        type: String as PropType<string>
    }
} as const;

const Drawer = defineComponent({
    components: { MButton, IconMeriActionClose },
    name: "Drawer",
    props: DrawerProps,
    emits: ['close', "update:modelValue"],
    setup(props, { slots, attrs, emit }) {

        const onCloseDrawer: any = (event: Event) => {

            emit("update:modelValue", false);
            emit('close', event)
        }
        const clickShadow: any = (event: Event) => {
            if (!props.shadowClick) return;

            emit("update:modelValue", false);
            emit('close', event)
        }

        // 整个弹窗的组件
        const drawerRef = ref();

        if (!props.shadow && props.shadowClick) {
            onClickOutside(drawerRef, () => {
                onCloseDrawer();
            })
        }

        // 内容对象用来计算的是否有滚动条
        const contentRef = ref();
        // 是否有滚动条
        const isScroll = ref(false);

        const initScroll = () => {
            const el = contentRef.value;
            let bool = false;
            if (el) {
                const { scrollHeight, clientHeight } = el;
                console.log(`scrollHeight:${scrollHeight}, clientHeight:${clientHeight}`)
                bool = scrollHeight > clientHeight;
            } else {
                console.error("el is null")
            }
            isScroll.value = bool;
        }

        nextTick(() => {
            console.log(drawerRef.value);
            initScroll();
        })


        useMutationObserver(contentRef, (mutations) => {
            // 初始胡滚动条
            initScroll()
        }, {
            childList: true, // 子节点的变动（新增、删除或者更改）
            attributes: true, // 属性的变动
            characterData: true, // 节点内容或节点文本的变动
            subtree: true // 是否将观察器应用于该节点的所有后代节点
        })

        return () => {

            const classList = [];
            if (props.footFixed) {
                classList.push("shadow");
            } else if (isScroll.value) {
                classList.push("shadow");
            } else {
                classList.push("line");
            }


            return (
                (props.show || props.modelValue) ?
                    <Teleport to="body">
                        <TransitionGroup class="m-drawer" name="m-drawer" tag='div'>
                            {/* 遮罩层 */}
                            {
                                props.shadow ? <div className="m-drawer-mask" onClick={clickShadow} style={{height: props.height ? props.height : '100%'}}></div> : null
                            }
                            <div class="m-drawer-container" ref={drawerRef} style={{ width: props.width ? props.width : 'auto', height: props.height ? props.height : '100%'}}>
                                {/* 头部 */}
                                <div className="m-drawer-container-header">
                                    <span className="m-drawer-container-header-title">
                                        {slots.title ? slots.title() : props.title}
                                    </span>
                                    <span className="m-drawer-container-header-icon" onclick={onCloseDrawer}>
                                        {slots.icon ? slots.icon() : <IconMeriActionClose size={14} color={color.gray[500]} />}
                                    </span>
                                </div>
                                {/* 内容部分 */}
                                <div ref={contentRef} class={["m-drawer-container-content", props.footFixed ? 'draw_fixed' : '']}>
                                    {slots.content ? slots.content() : null}
                                </div>
                                {
                                    slots.handle ?
                                        <div class={['m-drawer-container-footer', classList]}>
                                            {slots.handle ? slots.handle() : null}
                                        </div> : null
                                }
                            </div>
                        </TransitionGroup>
                    </Teleport>
                    : ''
            )
        }
    }
})

interface DrawerProps {
    closeDrawer: any
}

class DrawerClass implements DrawerProps {
    closeDrawer() {

    }
}

export default Drawer;
