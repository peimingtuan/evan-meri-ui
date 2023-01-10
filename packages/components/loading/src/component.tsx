/**
 * @Description:
 * @author: 邓红军
 * @date: 2022/7/4
 * @fileName: Loading
 */
import {
    defineComponent,
    h,
    PropType,
    ref,
    Teleport,
    nextTick,
    inject,
    Transition,
    watch,
} from 'vue';
import {useZIndex} from "../../utils/z-index";
import illustration from '../../illustration'
import button from "../../button";
import {isElement, random} from "lodash";
import lottie from './lottie'
// @ts-ignore
import planeJson from "../../../static/json/plane.json"
// @ts-ignore
import ballJson from "../../../static/json/ball.json"
// @ts-ignore
import circleJson from "../../../static/json/circle.json"


const animationDataMap = {
    plane: planeJson,
    ball: ballJson,
    circle: circleJson,
};

const loadingProps = {
    //挂载对象
    target: {
        default: "body"
    },
    // 是否全屏
    fullscreen: {
        type: Boolean,
        default: true
    },
    // 锁住屏幕 禁止滚动
    lock: {
        type: Boolean,
        default: false,
    },
    // 背景颜色
    background: {
        type: String,
        default: "rgba(255, 255, 255, 1)",
    },
    // 是否显示进度条
    progressBar: {
        type: Boolean,
        default: false
    },
    // 超时时间
    duration: {
        type: Number,
        default: 10
    },
    //lottieName
    lottieName: {
        type: String as PropType<"plane" | "ball" | "circle">,
        default: "plane",
    },
    failText: {
        type: String,
        default: "页面加载失败"
    },
    // 重新加载按钮
    loadButton: {
        type: Function
    },
    // 加载文案配置
    loadTextOptions: {
        default: {text: "", style: {}}
    },
    // 调用方式
    callMethod: {
        type: String as PropType<"service" | "directive">,
        default: "service"
    },
    // 自定类名
    customClass: {
        type: String,
    }
};


export default defineComponent({
    name: "Loading",
    props: loadingProps,
    inheritAttrs: false,
    components: {
        MIllustration: illustration,
        MButton: button,
        lottie
    },
    setup(props, ctx) {
        const state = ref(0); // 0 加载  1 加载失败

        const visible = ref(false); // 是否显示

        let target: HTMLElement | any; // 挂在的对象

        let timeoutTimer: any = null; //  超时定时器实例

        let progressBarTimer: any = null; // 进度条定时器实例

        let destroyComponentTimer: any = null; // 自我毁灭定时器

        const progress = ref(0); // 进度

        const randomProgress = ref(random(30, 75));  // 随机数 模拟加载进度

        const notice: any = inject("loading-notice-api") // 通知


        // 样式
        const style = ref({
            zIndex: useZIndex().nextZIndex(), //  获取index
            background: props.background,
        });


        // 添加class
        function addClass() {
            target?.classList?.add("m-loading-parent--relative"); // 添加父级class

            if (props.fullscreen || props.lock) document.body.classList.add("m-loading-parent--hidden"); // // 全屏或者锁住屏幕
        }

        // 移除class
        function removeClass() {
            getTarget();
            let removeTimer = setTimeout(() => {
                target?.classList?.remove("m-loading-parent--relative");
                if (props.fullscreen || props.lock) document.body.classList.remove("m-loading-parent--hidden");
                clearTimeout(removeTimer);
            }, 200)
        }

        // 超时
        function useTimeoutTimer() {
            timeoutTimer = setTimeout(() => {
                clearTimeout(timeoutTimer); // 清除定时器
                state.value = 1; // 设置状态
                if (props.progressBar) progress.value = 0; // 设置进度
            }, 1000 * props.duration);
        }

        // 进度条
        function useProgressBarTimer() {
            progressBarTimer = setInterval(() => {
                progress.value++;

                if (progress.value === randomProgress.value) {
                    clearInterval(progressBarTimer); // 清除定时器
                }

                // 进度条100%
                if (progress.value === 100) {
                    close();
                }

            }, random(10, 50));
        }

        // 回去挂载对象
        function getTarget() {
            isElement(props.target) ? target = props.target : target = document.querySelector(props.target as string);
        }

        // 加载
        function load() {
            getTarget();
            addClass();
            visible.value = true;

            if (props.callMethod === "service") { //服务方式调用才需要超时
                useTimeoutTimer();
                if (props.progressBar) useProgressBarTimer();
            }
        }


        // 重新加载
        function reload() {
            // 如果有进度条
            if (props.progressBar) {
                useProgressBarTimer();
            }

            state.value = 0; // 设置状态
            useTimeoutTimer();
        }

        //关闭
        function close() {
            visible.value = false;
            removeClass();
            notice();
        }

        // 未找到挂载对象 自我毁灭
        function destroyComponent() {
            destroyComponentTimer = setInterval(() => {
                getTarget();
                if (target === null) {
                    destroy();
                }
            }, 5000);
        }

        // 销毁
        function destroy() {
            if (props.callMethod === "service") { // 服务方式调用才需要清除定时器
                clearTimeout(timeoutTimer); // 清除超时定时器
                clearInterval(progressBarTimer); // 清除进度条定时器
                clearInterval(destroyComponentTimer); // 清除自我毁灭定时器
                if (props.progressBar) {
                    randomProgress.value = 100;
                    useProgressBarTimer();
                    return;
                }
            }
            close();
        }

        // watch(state, (ste) => {
        //     // console.log('ste', ste);
        // });

        void nextTick(() => {
            load();
            if (props.callMethod === "service") destroyComponent();
        })


        ctx.expose({
            reload,
            destroy,
        })

        return () => {
            return (
                visible.value ?
                    <Transition name="m-loading-fade">
                        <Teleport to={props.target}>
                            <div
                                ref="target"
                                class={["m-loading-mask", props.fullscreen ? "is-fullscreen" : null, props.customClass ? props.customClass : null]}
                                style={
                                    {
                                        ...style.value, ...{"--progress-bar": `${progress.value}%`},
                                    }
                                }
                            >
                                <div class="m-loading-spinner">

                                    {/*加载中状态*/}
                                    <div v-Show={state.value === 0} class="m-loading-load">
                                        <div class={['m-loading-animation', 'm-loading-lottieName-' + props.lottieName]}>
                                            <lottie animationData={animationDataMap[props.lottieName]}/>
                                        </div>
                                        {
                                            !props.progressBar && props?.loadTextOptions?.text ?
                                                <div style={props.loadTextOptions.style}
                                                     class="m-loading-load-text">加载中</div> : null
                                        }
                                    </div>

                                    {/*加载失败状态*/}
                                    <div v-Show={state.value === 1} class="m-loading-fail">
                                        <m-illustration
                                            v-slots={{
                                                footer: () =>
                                                    <m-button
                                                        size="small"
                                                        onClick={props.loadButton}
                                                        type="primary">重新加载
                                                    </m-button>
                                            }}
                                            type="pageLoadFailure"
                                            size="small"
                                            title={props.failText}>
                                        </m-illustration>
                                    </div>

                                    {/* 如果有进度条*/
                                        state.value === 0 && props.progressBar ?
                                            <div class="m-loading-bar"></div> : null
                                    }
                                </div>
                            </div>
                        </Teleport>
                    </Transition> : null
            )
        }
    }
})


