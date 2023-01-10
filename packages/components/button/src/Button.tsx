// @ts-nocheck
import { defineComponent, h } from 'vue'
import {ButtonType} from "./ButtonProps";
import buttonProps from "./ButtonProps"
import * as components from "meri-icon";
import "meri-icon/lib/style.css"
const Button = defineComponent({
    name: 'Button',
    props: buttonProps,
    emits: ['click'],
    setup(props,{slots,attrs,emit}){
        return ()=>{
            const onClick = (event: Event) => {
                if (props.disabled) {
                    event.preventDefault();
                    return;
                }
                emit('click', event);
            };

            // 获取按钮是Icon 合适对应得Button
            const classNames = ['m-button'];
            let iconClass:any = [];
            // 添加大小
            if(props.type=='icon'){
                classNames.push(props.size + '-icon');
            }else{
                classNames.push(props.size);
            }

            classNames.push(props.type);
            //主要按钮
            if (props.type == ButtonType.primary) {
                classNames.push("bg-blue");
                classNames.push("font-white");
                classNames.push("padding");
            }
            // 默认按钮
            if (props.type == ButtonType.default) {
                classNames.push("bg-white");
                classNames.push("border-gray");
                classNames.push("font-gray");
                classNames.push("padding");
            }
            // 警示按钮
            if (props.type == ButtonType.danger) {
                classNames.push("bg-red");
                classNames.push("font-white");
                classNames.push("padding");
            }
            // 文字按钮
            if (props.type == ButtonType.text) {
                // classNames.push("font-gray");
                classNames.push("text-icon-status");
                classNames.push("padding");
            }
            // 链接按钮
            if (props.type == ButtonType.link) {
                classNames.push("font-blue");
                classNames.push("text-icon-status");
                classNames.push("padding");
            }
            // 图标按钮
            if (props.type == ButtonType.icon) {
                classNames.push("text-icon-status");
                iconClass.push("display-none");
                if(props.iconBg){
                    classNames.push("icon-bg");
                }
            }
            //加载
            if (props.loading === true) {
                classNames.push("loading");
            }
            //禁用
            if (props.disabled) {
                classNames.push("disabled");
                classNames.push("border-white");
                classNames.splice(classNames.indexOf('text-icon-status'),1)

            }

            const buttonProps = {
                ...attrs,
                onClick,
                class: classNames,
            };
            const iconSizeEum = {
                large : 19,
                medium : 16,
                small: 12
            }
            const iconLoadingEum = {
                large : 15,
                medium : 13,
                small: 13
            }
            let iconSize = props.iconSize?props.iconSize:iconSizeEum[props.size];
            const CurrenIcon = components[attrs.icon];

            const loading = props.loading ?
                ( props.type=='primary'||props.type=='danger'?  <div class={props.type!='icon'?'loading-icon animation':'animation'}>
                    <svg class='svg' width={iconLoadingEum[props.size]} height={iconLoadingEum[props.size]}  viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3372 3.4748C10.5132 3.12635 9.62176 2.96657 8.72805 3.00715C7.83435 3.04774 6.96103 3.28766 6.17203 3.70936C5.80672 3.9046 5.3523 3.76674 5.15705 3.40143C4.96181 3.03612 5.09967 2.5817 5.46498 2.38645C6.45123 1.85933 7.54288 1.55943 8.66001 1.5087C9.77714 1.45797 10.8915 1.6577 11.9214 2.09326C12.9514 2.52882 13.8709 3.18919 14.6127 4.02604C15.3545 4.86288 15.8998 5.85501 16.2086 6.9298C16.5174 8.0046 16.582 9.13485 16.3976 10.2378C16.2131 11.3408 15.7844 12.3886 15.1427 13.3044C14.5011 14.2203 13.6627 14.9811 12.6891 15.5311C11.7154 16.0811 10.6311 16.4064 9.51542 16.4833C9.10218 16.5117 8.74412 16.1998 8.71567 15.7866C8.68722 15.3733 8.99914 15.0153 9.41238 14.9868C10.3049 14.9254 11.1724 14.6651 11.9513 14.2251C12.7302 13.7851 13.4009 13.1764 13.9142 12.4437C14.4276 11.711 14.7706 10.8728 14.9181 9.99045C15.0656 9.10807 15.014 8.20387 14.7669 7.34404C14.5199 6.48421 14.0837 5.6905 13.4902 5.02103C12.8968 4.35155 12.1612 3.82325 11.3372 3.4748Z" fill="white"/>
                    </svg></div>:<div class={props.type!='icon'?'loading-icon animation':' animation'}>
                    <svg class='svg' width={iconLoadingEum[props.size]} height={iconLoadingEum[props.size]} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3372 3.4748C10.5132 3.12635 9.62176 2.96657 8.72805 3.00715C7.83435 3.04774 6.96103 3.28766 6.17203 3.70936C5.80672 3.9046 5.3523 3.76674 5.15705 3.40143C4.96181 3.03612 5.09967 2.5817 5.46498 2.38645C6.45123 1.85933 7.54288 1.55943 8.66001 1.5087C9.77714 1.45797 10.8915 1.6577 11.9214 2.09326C12.9514 2.52882 13.8709 3.18919 14.6127 4.02604C15.3545 4.86288 15.8998 5.85501 16.2086 6.9298C16.5174 8.0046 16.582 9.13485 16.3976 10.2378C16.2131 11.3408 15.7844 12.3886 15.1427 13.3044C14.5011 14.2203 13.6627 14.9811 12.6891 15.5311C11.7154 16.0811 10.6311 16.4064 9.51542 16.4833C9.10218 16.5117 8.74412 16.1998 8.71567 15.7866C8.68722 15.3733 8.99914 15.0153 9.41238 14.9868C10.3049 14.9254 11.1724 14.6651 11.9513 14.2251C12.7302 13.7851 13.4009 13.1764 13.9142 12.4437C14.4276 11.711 14.7706 10.8728 14.9181 9.99045C15.0656 9.10807 15.014 8.20387 14.7669 7.34404C14.5199 6.48421 14.0837 5.6905 13.4902 5.02103C12.8968 4.35155 12.1612 3.82325 11.3372 3.4748Z" fill="#8B949E"/>
                    </svg></div>): null;
            const icon = props.type=='icon' && attrs.icon ? <div class='m-button-icon'> <CurrenIcon  class='svg' size={iconSize} ></CurrenIcon> </div>: null;
            const textClass = props.loading ? ["opacity-0"] : [];
            return (
                <button   {...buttonProps}>
                    {loading?loading:icon} <div  style={{width:props.width +'px'}} class={[textClass,iconClass,'m-button-span']}>
                  {slots.default?.()}
                </div>
                </button>
            )
        }
    }
})
export default Button;
