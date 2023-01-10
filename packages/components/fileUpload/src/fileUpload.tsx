/*
 * @Author: yaoyujian
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: yaoyujian
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 横幅组件
 */
import { defineComponent, h, ref, reactive, toRefs, watch, withModifiers, } from 'vue';
import Button from "../../button/src/Button";
import axios from 'axios';
import { IconMeriComponentFileTypeZip, IconMeriComponentFileTypeMov, IconMeriComponentFileTypeMp3, IconMeriComponentFileTypePpt, IconMeriComponentFileTypeExcel, IconMeriComponentFileTypePdf, IconMeriComponentFileTypeWord, IconMeriComponentFileTypePngjpggif, IconMeriComponentFileTypeUnknown, IconMeriComponentFileTypeCad, IconMeriActionDownload, IconMeriActionClose, IconMeriActionRefresh } from 'meri-icon'
import fileUploadProps, { FileType, FileMessage } from "./fileUploadProps"
import DropIcon from './icon/dropIcon';
import Preview from "../../imageUpload/src/preview";

const FileUpload = defineComponent({
    name: "FileUpload",
    props: fileUploadProps,
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
            size,
            type,
            disabled,
            fileSize,
            dropTitle,
            dropContent,
            files: propsFiles,
            fileListStyle,
            fileItemStyle,
            uplaodStlye
        } = toRefs(props);

        // 文件上传的DOM
        const refFile = ref<HTMLInputElement>();
        // 当前的文件列表
        let files = reactive<FileType[]>([]);

        let showFiles = reactive<FileType[]>([]);
        let showPreview = ref(false);

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
                    // 下载完成
                    item.state = "resolve";

                } catch (error) {
                    // 上传失败
                    item.state = "reject";
                }
            }
        }

        const getSrc = (item: FileType) => {

            let src = "";

            if (item.src) {
                src = item.src;
            }

            if (item.key && props.host) {
                src = `${props.host}${item.key}`;
            }

            if (item.file) {
                src = URL.createObjectURL(item.file);
            }

            return src;
        }

        // 进行下载
        const download = async (item: FileType) => {

            let href = getSrc(item);

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

        expose({
            files,
            input: refFile
        })

        return () => {
            // 渲染真实的文件组件
            const renderUploadInput = () => {
                return disabled.value ? null : <input ref={refFile} onChange={fileChange} class="m-file-upload-file-input" accept={accepts.value} multiple={multiple.value} type="file" />;
            }

            // 展示按钮的上传
            const renderButtonUpload = () => {
                return <Button disabled={disabled.value} size={size.value} style={uplaodStlye.value}>
                    <div class="m-file-upload-btn">
                        点击上传
                        <span class="desc">
                            {`${files.length || 0}/${limit.value || 1}`}
                        </span>
                        {renderUploadInput()}
                    </div>
                </Button>
            }

            // 展示拖拽的上传
            const renderDragUpload = () => {

                const desc = dropContent.value ? dropContent.value : `支持文件类型：${accepts.value}`;

                return <div class="m-file-upload-drag" style={uplaodStlye.value}>
                    <div class="m-file-upload-drag-title">
                        <span class="m-file-upload-drag-title-icon">
                            <DropIcon></DropIcon>
                        </span>
                        {`${dropTitle.value || "点击或将文件拖拽到此处上传"} ${files.length || 0}/${limit.value || 1}`}
                    </div>
                    <div class="m-file-upload-drag-desc" title={desc}>
                        {dropContent.value || accepts.value ? desc : ""}
                    </div>
                    {renderUploadInput()}
                </div>
            }

            const renderProgress = (item: FileType) => {

                if (item.state !== "pending") {
                    return null
                }

                const style = {
                    width: `${item.progress}%`
                }

                return <div class="m-file-upload-list-item-file-progress">
                    <div style={style} class="m-file-upload-list-item-file-progress-rate"></div>
                </div>
            }

            // 预览当前图片
            const previewImage = (item: FileType) => {
                console.log(item);
                if (item.state === "reject") return;

                if (isPdfByType(item)) {
                    const href = getSrc(item);
                    window.open(href);
                    // console.log(getSrc(item));
                }

                if (!isImageByType(item)) return;
                showFiles = [item];
                showPreview.value = true;
            }

            const isPdfByType = (item: FileType) => {

                if (!item.type && !item.suffix) return false;

                if (item.type) {
                    return /application\/pdf/.test(item.type);
                }

                if (item.suffix) {
                    return /\.(pdf)$/.test(item.suffix);
                }

                return false;
            }

            // 根据文件类型判断其是否是图片
            const isImageByType = (item: FileType) => {
                if (!item.type && !item.suffix) return false;

                if (item.type) {
                    return /image\/*/.test(item.type);
                }

                if (item.suffix) {
                    return /\.(jpg|png|gif)$/.test(item.suffix);
                }

                return false;
            }

            // 渲染下载的集合
            const renderFileList = (items: FileType[]) => {
                // 删除下载项
                const remove = (item: FileType) => {
                    const index = items.indexOf(item);
                    if (index != -1) {
                        items.splice(index, 1);
                    }

                    emit("delete", files, item)
                }


                return <div class="m-file-upload-list" style={fileListStyle.value}>
                    {
                        items.map(item => <div class={["m-file-upload-list-item", item.message ? "m-file-upload-list-item-error" : ""]} onClick={() => previewImage(item)} style={[fileItemStyle.value, {
                            cursor: item.state === "resolve" && (isImageByType(item) || isPdfByType(item)) ? "pointer" : void 0
                        }]}>
                            {
                                item.message ? <div class="m-file-upload-list-item-error-message">{item.message}</div> : null
                            }

                            <div class="m-file-upload-list-item-icon">
                                {renderFileIcon(item)}
                            </div>
                            <div class="m-file-upload-list-item-file">
                                {/* 文件名称 */}
                                <div class="m-file-upload-list-item-file-name" v-ellipsis={{ theme: 'dark' }}>
                                    {item.name}
                                </div>
                                {
                                    item.state !== "pending" ? <div class="m-file-upload-list-item-file-operate">
                                        {
                                            renderOperateIcon(item)
                                        }
                                    </div> : null
                                }

                                <div class="m-file-upload-list-item-file-delete" onClick={withModifiers(() => remove(item), ["stop"])}>
                                    <IconMeriActionClose size={16}></IconMeriActionClose>
                                </div>

                                {/* 渲染进度条 */}
                                {
                                    renderProgress(item)
                                }
                            </div>
                        </div>)
                    }
                </div >
            }

            // 渲染文件icon
            const renderFileIcon = (item: FileType) => {
                if (item.suffix) {
                    // CAD
                    if (/\.cad$/.test(item.suffix)) return <IconMeriComponentFileTypeCad width={20} height={24} />

                    if (/\.(xlsx|xls)$/.test(item.suffix)) return <IconMeriComponentFileTypeExcel width={20} height={24} />

                    if (/\.(jpg|png|gif)$/.test(item.suffix)) return <IconMeriComponentFileTypePngjpggif width={20} height={24} />

                    if (/\.(mov)$/.test(item.suffix)) return <IconMeriComponentFileTypeMov width={20} height={24} />

                    if (/\.(mp3)$/.test(item.suffix)) return <IconMeriComponentFileTypeMp3 width={20} height={24} />

                    if (/\.(pdf)$/.test(item.suffix)) return <IconMeriComponentFileTypePdf width={20} height={24} />

                    if (/\.(ppt|pptx)$/.test(item.suffix)) return <IconMeriComponentFileTypePpt width={20} height={24} />

                    if (/\.(docx|doc)$/.test(item.suffix)) return <IconMeriComponentFileTypeWord width={20} height={24} />

                    if (/\.(zip|rar)$/.test(item.suffix)) return <IconMeriComponentFileTypeZip width={20} height={24} />
                }

                return <IconMeriComponentFileTypeUnknown width={20} height={24} />
            }

            // 渲染操作图标
            const renderOperateIcon = (item: FileType) => {

                // 失败或者等待时可以进行上传
                if (item.state === "wait" || item.state === "reject") {
                    return <div class="m-file-upload-list-item-file-operate-icon" onClick={withModifiers(() => upload(item), ['stop'])}><IconMeriActionRefresh size={16}></IconMeriActionRefresh></div>
                }
                // 已经上传成功后进行下载
                if (item.state === "resolve") {
                    return <div class="m-file-upload-list-item-file-operate-icon" onClick={withModifiers(() => download(item), ["stop"])}><IconMeriActionDownload size={16}></IconMeriActionDownload></div>
                }

                return null;
            }

            return (
                <div class="m-file-upload">
                    <div class="m-file-upload-header">
                        {
                            type.value && type.value === "drop" ? renderDragUpload() : renderButtonUpload()
                        }
                    </div>
                    {
                        renderFileList(files)
                    }

                    {/* 展示图片 */}
                    {
                        showPreview.value ? <Preview  {...{ 'onUpdate:modelValue': (value) => showPreview.value = value }} files={showFiles} index={0} modelValue={showPreview.value} ></Preview> : null
                    }
                </div>
            )
        }
    }
})
export default FileUpload;