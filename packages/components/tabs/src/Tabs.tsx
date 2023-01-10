/**
 * @Description:
 * @author: 邓红军
 * @date: 2022/7/4
 * @fileName: Tabs
 */
import {defineComponent, h, PropType, ref, watch, nextTick, onUpdated,} from 'vue';
import {Size} from '../../utils/types';
import {useCurrentElement} from "@vueuse/core";

export const tabsProps = {
    // 类型
    type: {
        default: "line",
        type: String as PropType<'line' | 'segment' | 'border'>,
    },
    //大小
    size: {
        default: "medium",
        type: String as PropType<Size>,
    },
    //宽度
    itemWidth: {
        type: [String, Number],
    },
    // 选中的值
    modelValue: {
        type: String as PropType<string>,
        default: null
    },
    // 当前的选项
    data: {
        type: Array as PropType<any>,
        default: () => []
    },
    // 回调函数
    change: {
        type: Function as PropType<(value: string) => void>,
    }
};

const Tabs = defineComponent({
    name: "Tabs",
    props: tabsProps,
    emits: ["update:modelValue", "change"],

    setup(props, {slots, attrs, emit}) {


        // 当前组件
        const el = useCurrentElement();

        const barStyle = ref<any>({left: "0", width: "0", paddingLeft: "2px", paddingRight: "2px"});


        // props
        const tabsProps = {
            class: [
                `m-tabs`,
                `m-tabs--${props.type}`,
                `m-tabs--${props.type}-${props.size}`
            ],
        }


        // 点击事件
        function click(item: any, e: any) {
            if (item.disabled) return;
            emit("update:modelValue", item.id);
            emit("change", item, e);
        }

        function getBarSize(elActive: HTMLElement) {
            if (props.type === "line") {
                if (props.size === "medium") {
                    return 40;
                }
                return 96;
            }

            return elActive.offsetWidth;
        }

        // bar
        function updateBarStyle() {
            let elActive: HTMLElement = el.value?.querySelector(".m-tab__active") as HTMLElement;

            const index = Number(elActive.getAttribute("data-index"));

            let barSize = getBarSize(elActive) as number;


            let offsetLeft = elActive?.offsetLeft;
            let offsetWidth = elActive?.offsetWidth;

            if (elActive?.offsetWidth > barSize) {
                offsetLeft = (offsetLeft + (offsetWidth / 2)) - (barSize / 2);
            }

            barStyle.value.width = `${barSize}px`;
            barStyle.value.left = `${offsetLeft}px`;

            //特殊处理
            if (props.type === "segment") {

                barStyle.value.paddingLeft = "2px"

                barStyle.value.paddingRight = "2px"

                index === 0 ? barStyle.value.paddingLeft = 0 : "2px"

                index == props.data.length - 1 ? barStyle.value.paddingRight = 0 : "2px"

            }


        }

        // 获取slot
        function getSlot(item: any) {
            if (item?.renderSlot) {
                if (item?.renderSlot?.component) {
                    return (
                        <div
                            style={item?.renderSlot?.style}
                            class="m-tabs-renderSlot">
                            {item?.renderSlot?.component}
                        </div>
                    );
                }

                if (item?.renderSlot?.html) {
                    return (
                        <div
                            class="m-tabs-renderSlot"
                            style={item?.renderSlot?.style}
                            innerHTML={item?.renderSlot?.html}>
                        </div>
                    );
                }

            }
        }


        // 初始化bar left
        void nextTick(() => {
            updateBarStyle();
        })


        // onUpdated(() => {
        //     updateBarStyle();
        // })

        //监听props.modelValue
        watch(() => props.modelValue, async (cb) => {
            await nextTick()
            updateBarStyle();
        })


        return () => {

            // 获取style
            function getStyle() {
                return {width: props.itemWidth ? `${props.itemWidth}px` : ""}
            }

            // 获取item getClass
            function getClass(item: any) {
                const classNames = ["m-tab"];

                // 如果是选中的
                if (props?.modelValue === item.id) {
                    classNames.push("m-tab__active");
                }

                // 如果是禁用的
                if (item?.disabled) {
                    classNames.push("m-tab__disabled");
                }

                if (item?.name.length > 4 || item?.renderSlot) {
                    classNames.push("m-tabs-padding");
                }

                return classNames
            }


            return (
                <div  {...tabsProps}>
                    <div class="m-tabs-content">
                        {
                            props.data.map((item: any, index: number) => {
                                return (
                                    <div class={getClass(item)}
                                         style={getStyle()}
                                         data-index={index}
                                         onClick={(e) => click(item, e?.target)}>
                                        {item.name}
                                        {getSlot(item)}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <span class="m-tabs-bar" style={barStyle.value}></span>
                </div>
            )
        }
    }
})
export default Tabs;
