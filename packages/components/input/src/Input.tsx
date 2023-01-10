// @ts-nocheck
import { templateRef, useEventListener } from '@vueuse/core';
import { defineComponent, h, inject, ref } from 'vue';
import inputProps from "./InputProps"
import { IconMeriComponentCancel, IconMeriActionLock } from 'meri-icon'
import * as components from "meri-icon";

import "meri-icon/lib/style.css"
import { FormItemContextKey } from '../../utils/InjectionKey';
const Input = defineComponent({
    name: "Input",
    props: inputProps,
    emits: ["input", "focus", "blur", "change", "keyup","update:modelValue","clear"],

    setup(props, { slots, attrs, emit }) {
        const formItemContext = inject(FormItemContextKey);
        const input = templateRef<HTMLElement>('input');
        const textarea = templateRef<HTMLElement>('textarea');
        const showPsd = templateRef<HTMLElement>('showPsd');
        const classNames = ref(new Set([]));
        const classNamesInner = ref(new Set([]));
        let show = ref(props.showPassword);

        if (props.type != 'textarea') {
            classNames.value.add('m-input');
            classNames.value.delete('m-input-textarea');
        } else {
            classNames.value.delete('m-input');
            classNames.value.add('m-input-textarea')
        };

        if (props.disabled) classNames.value.add("disabled");
        // 有错误信息是添加错误信息
        if (props.errorText) classNamesInner.value.add("error");

        // 绑定对应得事件回调
        useEventListener(input||textarea, 'input', (e: Event) => {

            if ((input.value.scrollTop + input.value.clientHeight) <= (input.value.scrollHeight - 18)) {
                input.value.scrollTop = input.value.scrollHeight - input.value.clientHeight;
            }

            if (e.target) emit("update:modelValue", (e.target as unknown as any).value);
            formItemContext && formItemContext?.validate('change').catch(()=>{})
            emit("input", (e.target as unknown as any).value)
        })
        // 获取焦点事件
        useEventListener(input||textarea, 'focus', (e) => {
            classNamesInner.value.add("focus");
            emit("focus", e)
        })
        // 失去焦点事件
        useEventListener(input||textarea, 'blur', (e) => {
            if ((e.target as unknown as any).value.length == 0) {
                show.value = false;
            }
            classNamesInner.value.delete("focus");
            formItemContext && formItemContext?.validate('blur').catch(()=>{})
            emit("blur", e)
        })
        // keyup
        useEventListener(input||textarea, 'keyup', (e) => {
            emit("keyup", e)
        })
        // active
        useEventListener(input||textarea, 'active', (e) => {
            classNamesInner.value.delete("active");
        })
        useEventListener(input||textarea, 'change', (e) => {
            emit("change", (e.target as unknown as any).value)
        })
        // 密码输入框
        useEventListener(showPsd, 'click', (e) => {
            show.value = !show.value;
        })
         let clear = ()=> {
             emit("update:modelValue", "");
             emit('clear', '');
         }

        return () => {

            // 前图标
            let prefixIcon;
            // 后图标
            let suffixIcon = null;
            // 前文字
            let prefixText;
            // 后文字
            let suffixText;
            //验证码
            let vericodeText = null;
            // 输入框的class
            let inputClassNames = ["input"];
             let showWordLimit = null;
            let message = null;
            // 前内容
            if (props.type !== "textarea") {

                // 前图标
                if ((props.prefixIcon || slots.prefix)) {
                    let type = props.prefixIcon;
                    const CurrenIcon = components[type];
                    prefixIcon = <div class={["prefix-icon",slots.prefix?'':'prefix-icon-right']}>{slots.prefix ? <div class='icon'>{slots.prefix()} </div> : null}  {props.prefixIcon ? <div class='icon'><CurrenIcon size={16}></CurrenIcon></div> : null} </div>
                }

                //清空图标 +  后图标
                const hasClear = props.clearable && props.modelValue?.length;
                if (props.suffixIcon || slots.suffix || hasClear) {
                    let type = props.suffixIcon;
                    const CurrenIcon = components[type];
                    suffixIcon = <div class={["suffix-icon",slots.suffix ?'':'suffix-icon-right']}>{slots.suffix ? <div class='icon'>{slots.suffix()}</div> : null} {props.suffixIcon ? <div class='icon'><CurrenIcon size={16}></CurrenIcon></div> : null} {hasClear ? <div class='icon clear' onClick={clear}> <IconMeriComponentCancel size={16} hoverColor={`var(--blue-500)`}></IconMeriComponentCancel></div> : null}</div>
                }

                // 前内容
                if (slots.prepend) {
                    prefixText = <div class="prefix-text">{slots.prepend()}</div>
                    classNamesInner.value.add("prefix-border");
                }

                if (slots.dropdown) {
                    prefixText = <div class="dropdown">{slots.dropdown()}</div>
                }

                // 后内容
                if (slots.append) {
                    suffixText = <div class="suffix-text">{slots.append()}</div>
                    classNamesInner.value.add("suffix-border");
                }
                // 验证码插槽
                if (slots.vericode) {
                    vericodeText = <div class='verification-code'>
                        <span>|</span>
                        <div class='verification-text'>{slots.vericode()}</div>
                    </div>
                }
            }
            if(props.maxlength){
                let totalClass=props.type=='textarea'?['total']:['error-total'];
                if( typeof props.maxlength == "object"){
                    if (props.modelValue.length / props.maxlength.length>1) {
                        totalClass.push("over-color");
                        // 报错信息
                        message = props.maxlength.errorText ? <span class="message">{props.maxlength.errorText}</span> : null;
                        classNamesInner.value.add("error");
                    } else {
                        // 报错信息
                        message = props.errorText ? <span class="message">{props.errorText}</span> : null;

                        if (props.errorText) {
                            classNamesInner.value.add("error");
                        } else {
                            classNamesInner.value.delete("error");
                        }
                    }
                    showWordLimit =props.showWordLimit? <div  class={totalClass}>{props.modelValue.length}/{props.maxlength.length}</div> :null
                }
                if( typeof props.maxlength == "number"){
                    showWordLimit =props.showWordLimit? <div class={totalClass}>{props.modelValue.length}/{props.maxlength}</div> :null;
                    if (props.modelValue.length / props.maxlength>1) {
                        showWordLimit =props.showWordLimit? <div class={totalClass}>{props.maxlength}/{props.maxlength}</div> :null;

                    }
                }
            }else{
                // 报错信息
                message = props.errorText ? <span class="message">{props.errorText}</span> : null;

                if (props.errorText) {
                    classNamesInner.value.add("error");
                } else {
                    classNamesInner.value.delete("error");
                }
            }

            const DomProps = {
                ...attrs,
                class: classNames.value,
            };

            // 输入框所有的属性
            const inputAttrs = {
                ...attrs,
                class: inputClassNames,
                style:{}
            }

            // 输入框
            let input = null;
            let total = null;
            let showPsdIcon = null;
            const type = show.value ? 'IconMeriActionHide' : 'IconMeriActionPreview';
            const CurrenIcon = components[type];
            if (props.type === "password") {
                showPsdIcon = props.modelValue?.length && props.showPassword ? <div class="suffix-icon" ref="showPsd" > <CurrenIcon size={16} hoverColor={`var(--blue-500)`}></CurrenIcon> </div> : null;
                input = <input ref="input" value={props.modelValue}    {...inputAttrs} type={show.value ? 'password' : 'text'} placeholder={props.placeholder} />;
            } else if (props.type === "vericode") {
                input = <input ref="input" value={props.modelValue}   {...inputAttrs} placeholder={props.placeholder} />;
            } else if (props.type === "textarea") {
                input = <textarea auto-height="true" style={{ minHeight: Number(props.height) - 2 + 'px', minWidth: Number(props.width) - 2 + 'px' }} value={props.modelValue} placeholder={props.placeholder} rows={props.rows} {...inputAttrs} ref="input" maxlength={typeof props.maxlength == "object"?'':props.maxlength}/>;
            } else {
                input = <input ref="input" value={props.modelValue} type={props.type}  {...inputAttrs} placeholder={props.placeholder} maxlength={typeof props.maxlength == "object"?'':props.maxlength}/>;

            }
            return (
                <div class={Array.from(classNames.value)} style={{ height: props.type !== "textarea" ?( props.type === "password" || props.type === "vericode"?(props.height || 40)+'px': props.height + 'px' ): '', width: props.type !== "textarea" ? props.width + 'px' : '' }} >
                    {prefixText}
                    <div class={["inner-input", Array.from(classNamesInner.value)]} >

                        {prefixIcon}
                        {input}
                        {total}
                        {suffixIcon}
                        {showPsdIcon}
                        {message}
                        {vericodeText}
                        {showWordLimit}
                    </div>
                    {suffixText}

                </div>
            )
        }
    }
})
export default Input;
