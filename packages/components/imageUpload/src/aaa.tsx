/*
 * @Author: yaoyujian
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: yaoyujian
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 横幅组件
 */
import { defineComponent, h, Fragment, ref, reactive, toRefs, watch, Teleport, PropType, CSSProperties, computed, } from 'vue';
import Button from "../../button/src/Button";
import axios from 'axios';
import { IconMeriActionAdd, IconMeriActionMinus, IconFrame48097332, IconMeriActionClose, IconMeriComponentChevronLeft, IconMeriComponentChevronRight } from 'meri-icon'
import imageUploadProps, { FileType, FileMessage } from "./ImageUploadProps"
import color from "../../utils/color";
import { useDraggable } from '@vueuse/core';
import { round } from 'lodash';

const Preview = defineComponent({
    name: "Preview",
    props: {
        // 上传数量限制
        index: {
            type: Number as PropType<number>,
            default: -1
        },
        // 上传数量限制
        files: {
            type: Array as PropType<FileType[]>,
            default: []
        },
        // 上传的Host
        host: {
            type: String as PropType<string>,
            default: false
        },
        modelValue: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    emits: ["update:modelValue"],
    setup(props, { slots, emit, expose }) {

        let {
            files,
        } = toRefs(props);

        const index = ref(props.index);

        let image = ref<HTMLElement>();
        let img = ref<HTMLImageElement>();

        // 当前加载的图片地址
        let src = ref<string>();

        //  获取图片地址
        const getSrc = (i: number) => {

            console.log(index.value);

            // i = i || index.value;

            const item = files.value[i];
            // 如果找不到则为空
            if (!item) return "";

            if (item.src) {
                src.value = item.src;
            }

            if (item.key && props.host) {
                src.value = `${props.host}${item.key}`;
            }

            if (item.file) {
                src.value = URL.createObjectURL(item.file);
            }

            return "";
        }

        // 左侧换控制
        const showLeft = computed(() => {
            return index.value !== 0;
        })
        // 右切换控制
        const showRight = computed(() => {
            return index.value < files.value.length - 1;
        })

        // 对应的定位信息
        let top = ref(0);
        let left = ref(0);
        // 放大缩小的比例
        let scale = ref(1);

        const style = computed<CSSProperties>(() => {
            return {
                transform: `translate(${left.value}px, ${top.value}px)`
            }
        })

        // 图片的宽高样式用于被放大缩小
        const scaleStyle = computed<CSSProperties>(() => {
            debugger;
            if (img.value) {
                debugger;
                const { width: imgW, height: imgH } = img.value;
                const width = imgW * scale.value;
                const height = imgH * scale.value;
                return {
                    transform: `translate(-50%, -50%)`,
                    width:`${width}px`,
                    height:`${height}px`,
                }
            }
            return {};
        })

        // 拖动定位
        useDraggable(image, {
            initialValue: { x: 40, y: 40 },
            onMove(x, e) {
                // left.value += e.movementX * (1 / scale.value);
                // top.value += e.movementY * (1 / scale.value);
                left.value += e.movementX;
                top.value += e.movementY;
            },
        })


        // 恢复比例
        let initScale = 1;
        const scaleInit = () => {
            scale.value = initScale;
        }

        // 放大
        const scaleAdd = () => {
            if (scale.value < 2) {
                scale.value += 0.2;
                scale.value = Math.min(round(scale.value, 1), 2);
            }
        }

        // 缩小
        const scaleSubtract = () => {
            if (scale.value > 0) {
                scale.value -= 0.2;
                scale.value = Math.max(round(scale.value, 1), 0.2);
            }
        }

        const onLoad = () => {
            if (img.value) {

                console.dir(img.value);
                debugger;
                // 获取图片的宽高
                const { width: imgW, height: imgH } = img.value;
                // 获取屏幕宽高
                const vw = document.documentElement.clientWidth;
                const vh = document.documentElement.clientHeight;
                // 判断图片的宽高是否大于屏幕
                if (imgW > vw || imgH > vh) {
                    // 屏幕占图片宽的比例
                    const scaleW = vw / imgW;
                    const scaleH = vh / imgH;
                    const min = Math.min(scaleW, scaleH, 1);
                    initScale = min;
                }

                // left.value = (document.documentElement.clientWidth - (img.value.width * initScale)) / 2;
                // top.value = (document.documentElement.clientHeight - (img.value.height * initScale)) / 2;

                left.value = (document.documentElement.clientWidth) / 2;
                top.value = (document.documentElement.clientHeight) / 2;
                // 重置比例
                scaleInit();
            }
        }

        const cancel = () => {
            emit("update:modelValue", false);
        }


        getSrc(index.value);

        return () => {

            return (
                <Teleport to="body">
                    <div class="m-image-preview">
                        {/* 遮罩层 */}
                        <div class="m-image-preview-mask" onClick={cancel}></div>

                        {/* 预览的图片 */}
                        {
                            src.value ? <div class="m-image-preview-image" style={[style.value]} >
                                <div class="m-image-preview-image-mask" style={scaleStyle.value} ref={image}>
                                    <img ref={img} onLoad={onLoad} style={scaleStyle.value} src={src.value} />
                                </div>
                            </div> : null
                        }


                        {/* 左右切换按钮 */}
                        {
                            showLeft.value ? <div class="m-image-preview-btn m-image-preview-btn-left" onClick={() => getSrc(--index.value)}>
                                <IconMeriComponentChevronLeft></IconMeriComponentChevronLeft>
                            </div> : null
                        }
                        {
                            showRight.value ? <div class="m-image-preview-btn m-image-preview-btn-right" onClick={() => getSrc(++index.value)}>
                                <IconMeriComponentChevronRight></IconMeriComponentChevronRight>
                            </div> : null
                        }

                        {/* 取消弹窗按钮 */}
                        <div class="m-image-preview-cancel" onClick={cancel}>
                            <div class="m-image-preview-cancel-back">

                            </div>
                            <IconMeriActionClose size={10}></IconMeriActionClose>
                        </div>

                        {/* 放大缩小 */}
                        <div class="m-image-preview-control">
                            <div class="m-image-preview-control-item" onClick={scaleInit}>
                                <IconFrame48097332 color={color.gray[900]}></IconFrame48097332>
                            </div>
                            <div class="m-image-preview-control-line"></div>
                            <div class="m-image-preview-control-item" onClick={scaleAdd}>
                                <IconMeriActionAdd color={color.gray[900]}></IconMeriActionAdd>
                            </div>
                            <div class="m-image-preview-control-line"></div>
                            <div class="m-image-preview-control-item" onClick={scaleSubtract}>
                                <IconMeriActionMinus color={color.gray[900]}></IconMeriActionMinus>
                            </div>
                        </div>
                    </div>
                </Teleport >
            )
        }
    }
})
export default Preview;
