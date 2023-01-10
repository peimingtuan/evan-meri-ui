/*
 * @Author: yaoyujian
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: yaoyujian
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 横幅组件
 */
import { defineComponent, h, Fragment, ref, reactive, toRefs, watch, Teleport, } from 'vue';
import Button from "../../button/src/Button";
import axios from 'axios';
import { IconMeriActionAdd, IconMeriComponentCancel } from 'meri-icon'
import imageUploadProps, { FileType, FileMessage } from "./ImageUploadProps"
import color from "../../utils/color";
import { useDraggable } from '@vueuse/core';
import Preview from "./preview";

const ImageUpload = defineComponent({
    name: "ImageUpload",
    props: imageUploadProps,
    emits: ['delete', 'upload'],
    components: {
        Button,
    },
    setup(props, { slots, emit, expose }) {

        let {
            limit,
            multiple,
            host,
            accepts,
            action,
            disabled,
            fileSize,
            dropTitle,
            files: propsFiles,
        } = toRefs(props);

        console.log(accepts);


        // 文件上传的DOM
        const refFile = ref<HTMLInputElement>();
        // 当前的文件列表
        let files = reactive<FileType[]>([]);
        // 是否展示预览框
        let showPreview = ref(false);
        let showPreviewIndex = ref(-1);

        watch([propsFiles], ([propsFiles]) => {

            files = propsFiles.map(item => {

                let { name, key = "", src = "", size = 0, suffix, type } = item;

                return {
                    name,
                    key,
                    src,
                    size,
                    type,
                    suffix: suffix ? suffix : getSuffixByName(name),
                    state: "resolve",
                    progress: 100
                }
            })
        })

        // 上传方法
        const upload = async (item: FileType) => {

            if (action.value && item.file) {

                if (fileSize.value) {
                    if (item.file.size > fileSize.value) {
                        return;
                    }
                }

                // 创建表单
                const formData = new FormData();
                formData.append("file", item.file);
                // 修改状态
                item.state = "pending";

                try {
                    // 进行上传
                    const res = await axios(action.value, {
                        method: "post",
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' },
                        onUploadProgress(e) {
                            item.progress = ((e.loaded / e.total) * 100) >>> 0;
                        }
                    })

                    try {

                    } catch (error) {

                    }

                    // 下载完成
                    item.state = "resolve";

                } catch (error) {
                    // 上传失败
                    item.state = "reject";
                }
            }
        }

        // 进行下载
        const download = async (item: FileType) => {

            let href;

            if (item.file) {
                let aTag = document.createElement('a');
                aTag.download = item.name;
                let href = URL.createObjectURL(item.file);//获取url
                aTag.href = href;
                aTag.click();
                URL.revokeObjectURL(href);//释放url
            } else if (item.src) {
                href = item.src;
            } else if (item.key) {
                href = `${props.host}${item.key}`;
            }

            if (href) {
                let aTag = document.createElement('a');
                aTag.download = item.name;
                aTag.href = href;
                aTag.click();
                URL.revokeObjectURL(href);//释放url
            }
        }

        /**
         * 通过文件名称获取对应的后缀
         * @param name 文件名称
         */
        const getSuffixByName = (name: string) => {
            const res = /\.\w+$/.exec(name);
            return res ? res[0] : "";
        }

        // 文件改变的回调
        const fileChange = (...argu: any) => {
            if (refFile.value && refFile.value.files) {
                const fileList = Array.from(refFile.value.files).map(file => {
                    const item: FileType = {
                        name: file.name,
                        size: file.size,
                        state: "wait",
                        progress: 0,
                        type: file.type,
                        suffix: getSuffixByName(file.name),
                        file
                    }
                    return reactive(item);
                });

                // 判断文件超出数量限制
                if (limit.value) {
                    // 剩余可以上传的数量
                    const residue = limit.value - files.length;
                    // 上传的数量超过剩余的数量则不可以进行上传
                    if (fileList.length > residue) {
                        return;
                    }
                }

                // 判断文件大小超过文件大小限制
                if (fileSize.value) {
                    fileList.forEach(item => {
                        if (item.size && item.size > fileSize.value) {
                            item.state = "reject";
                            item.message = FileMessage.oversize;
                        }
                    });
                }

                if (props.valite) {
                    for (const file of fileList) {
                        const message = props.valite(file);
                        if (message) {
                            file.message = message;
                        }
                    }
                }

                // 清空当前的文件
                refFile.value.value = "";
                // 返回当前的文件集合
                fileList.forEach(file => {
                    files.push(file);
                    props.upload ? props.upload(file) : upload(file);
                });

                emit("upload", files, fileList);
            }
        }

        // 渲染真实的文件组件
        const renderUploadInput = () => {
            // 禁用是不使用上传组件
            return disabled.value ? null : <input ref={refFile} onChange={fileChange} class="m-image-upload-item-file" accept={accepts.value} multiple={multiple.value} type="file" />;
        }

        // 渲染上传模块
        const renderUpload = () => {
            // 判断是否还可以进行上传，剩余上传的文件数量是否正确
            const result = limit.value ? ((limit.value - files.length > 0)) : false;

            const classList = ["m-image-upload-item", "m-image-upload-item-input"];

            if (disabled.value) {
                classList.push("m-image-upload-item-disabled")
            }

            return result ? <div class={classList}>
                {/* 渲染上传文件组件 */}
                {renderUploadInput()}
                <div class="m-image-upload-item-input-icon">
                    <IconMeriActionAdd color={color.gray[500]}></IconMeriActionAdd>
                </div>
                <div class="m-image-upload-item-input-tilte">{dropTitle.value}</div>
                <div class="m-image-upload-item-input-num">{`${files.length || 0}/${limit.value || 1}`}</div>
            </div> : null;
        }

        // 删除下载项
        const remove = (item: FileType) => {
            const index = files.indexOf(item);
            if (index != -1) {
                files.splice(index, 1);
            }

            emit("delete", files, item)
        }

        // 获取图片地址
        const getSrc = (item: FileType) => {
            let src;

            if (item.file) {
                let aTag = document.createElement('a');
                aTag.download = item.name;
                src = URL.createObjectURL(item.file);//获取url
            } else if (item.src) {
                src = item.src;
            } else if (item.key) {
                src = `${props.host}${item.key}`;
            }

            return src;
        }

        // 渲染对应的文件图片
        const renderImage = (item: FileType) => {

            // 判断状态
            const classList = ["m-image-upload-item", "m-image-upload-item-image"];

            if (item.state === "pending" || item.state === "wait") {
                classList.push("m-image-upload-item-image-upload")
            }

            //  上传进度的状态
            const style = {
                width: `${item.progress}%`
            };

            const src = getSrc(item);

            return <div class={classList}>
                {/* 删除按钮 */}
                <div class="m-image-upload-item-image-delete" onClick={() => remove(item)}>
                    <IconMeriComponentCancel size={16}></IconMeriComponentCancel>
                </div>
                {/* 上传中 */}
                {
                    item.state === "pending" ? <><div class="m-image-upload-item-image-title">
                        上传中
                    </div>
                        <div class="m-image-upload-item-image-progress">
                            <div class="m-image-upload-item-image-progress-rate" style={style}></div>
                        </div></> : null
                }
                <div class="m-image-upload-item-image-img" onClick={() => previewImage(item)}>
                    <img src={src} />
                </div>
            </div>;
        }

        // 预览当前图片
        const previewImage = (item: FileType) => {
            const index = files.indexOf(item);
            showPreviewIndex.value = index;
            showPreview.value = true;
        }



        expose({
            files,
            input: refFile
        })

        let image = ref<HTMLElement>();
        const { x, y, style } = useDraggable(image, {
            initialValue: { x: 40, y: 40 },
        })

        return () => {


            return (
                <div class="m-image-upload">
                    {/* 上传控件 */}
                    {
                        renderUpload()
                    }
                    {/* 已长传的文件文件列表 */}
                    {
                        files.map(item => renderImage(item))
                    }

                    {/* 展示图片 */}
                    {
                        showPreview.value ? <Preview  {...{ 'onUpdate:modelValue': (value) => showPreview.value = value }} files={files} index={showPreviewIndex.value} modelValue={showPreview.value} ></Preview> : null
                    }

                </div>
            )
        }
    }
})
export default ImageUpload;