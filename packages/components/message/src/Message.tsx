// @ts-nocheck
import { defineComponent, h, ref, PropType, computed, TransitionGroup, createApp, Teleport, createVNode, render, VNode, watch, watchEffect } from 'vue';
import { } from '../../utils/types';
import { reactive, nextTick } from 'vue';
import { IconMeriComponentClose, IconMeriComponentMessageSuccess, IconMeriComponentMessageError, IconMeriComponentMessageInfo } from 'meri-icon';
// import { IconMeriComponentClose} from 'meri-icon';
// import SuccessIcon from './success';
// import ErrorIcon from './error';
import MButton from '../../button/index';
import * as components from "meri-icon";
interface MessageList {
    type: string,       //类型
    title: string,       //标题
    button: string,      //按钮名称
    buttonClick: any,    //按钮点击时间
    showClose: boolean,  //是否显示关闭按钮
    className: string,   //自定义类名
    customIcon: string, //自定义icon名称
}


const messageProps = {
    messageList: {
        type: Object as PropType<MessageList[]>,
        default: () => [],
    }
} as const;
const state = reactive({
    arr: [], //存放message的高度，渲染时根据高度判断单行还是多行
    messageList: [], //存放message的props信息，渲染时用此数组
})

// let messageList = reactive<MessageList[]>([

// ]);
const Message = defineComponent({
    components: { IconMeriComponentClose, MButton, },
    name: "Message",
    props: messageProps,
    emits: ['click', 'buttonClick'],
    setup(props, { slots, attrs, emit }) {


        const lisRef = ref<HTMLElement>([])
        const classNames = ['m-message'];

        const varsStlye = {
            class: classNames
        }
        watch(() => state.arr, (value) => {
            nextTick(() => {
                if (!value.length || value[0] !== 0) {
                    return
                } else {
                    state.arr[0] = lisRef.value[0]?.offsetHeight
                }
            })

        }, { immediate: true, deep: true })

        return () => {
            // console.log(state.arr)
            return (
                <ul class="m-message">
                    <TransitionGroup name="move">
                        {
                            props.messageList.map((item, index: any) => {
                                let CurrenIcon = components[item.customIcon];
                                return (
                                    (!state.arr[index] || state.arr[index] <= 48) ?
                                        //单行文本
                                        <li ref={el => { lisRef.value[index] = el }}  key={item.id} class={`message-item message-item-${item.type} ${item.className ? item.className : ''} ${!item.button ? 'oneButton' : ''}`}>
                                            <span>
                                                {
                                                    item.type == 'success' ? <IconMeriComponentMessageSuccess size={16} /> : ''
                                                    // <span class={'success_icon'}><IconMeriActionDone size={12} color='#3FBE72'/></span> : 
                                                    // <span class={'error_icon'}><IconMeriActionClose size={12} color='#F55047'/></span> 
                                                }
                                                {
                                                    item.type == 'info' ? <IconMeriComponentMessageInfo size={16} /> : ''
                                                }
                                                {
                                                    item.type == 'error' ? <IconMeriComponentMessageError size={16} /> : ''
                                                }
                                                {
                                                    item.type == 'default' ? <IconMeriComponentMessageInfo size={16} /> : ''
                                                }
                                                {
                                                    item.type == 'customIcon' ?
                                                        <CurrenIcon size={16} />
                                                        : ''
                                                }
                                                <p class='message-item-content'>{item.title}</p>
                                            </span>
                                            {
                                                <div className="message-item-whiteMask" style={{backgroundColor: `rgba(255, 255, 255, ${0 + (index * 0.2)})`}}>
                                                    <span class="message-item-closeIcon">
                                                        {item.button ? <m-button type="default" size="small" onClick={item.buttonClick}>{item.button}</m-button> : ''}
                                                        <span class='message-item-button_container'>
                                                            {item.showClose ? <IconMeriComponentClose size={16} color='#FFFFFF' hoverColor="#FFFFFF" onClick={closeMessage.bind(this, index, item.id)} /> : ''}
                                                        </span>
                                                    </span>
                                                </div>
                                            }
                                            {/* {
                                                (state.height > 41 && item.button) ? <m-button type="default" size="small" onClick={item.buttonClick}>{item.button}</m-button> : ''
                                            } */}
                                        </li>
                                        :

                                        //多行文本
                                        <li  key={item.id} class={`area-message-item message-item-${item.type} ${item.className ? item.className : ''} ${item.button ? 'buttonContainer' : ''}  `} >
                                            <div class={`${item.showClose ? 'area-message-item-cont seizeSseat' : 'area-message-item-cont'}`}>
                                                <span>
                                                    <span class="area-message-item-icon">
                                                        {
                                                            item.type == 'success' ? <IconMeriComponentMessageSuccess size={16} /> : ''
                                                            // <span class={'success_icon'}><IconMeriActionDone size={12} color='#3FBE72'/></span> : 
                                                            // <span class={'error_icon'}><IconMeriActionClose size={12} color='#F55047'/></span> 
                                                        }
                                                        {
                                                            item.type == 'info' ? <IconMeriComponentMessageInfo size={16} /> : ''
                                                        }
                                                        {
                                                            item.type == 'error' ? <IconMeriComponentMessageError size={16} /> : ''
                                                        }
                                                        {
                                                            item.type == 'default' ? <IconMeriComponentMessageInfo size={16} /> : ''
                                                        }
                                                        {
                                                            item.type == 'customIcon' ? <CurrenIcon size={16} /> : ''
                                                        }
                                                    </span>
                                                    <p class='area-message-item-content'>{item.title}</p>
                                                </span>
                                                {/* {
                                                    <span class="button_container">
                                                        {
                                                            item.showClose ? <IconMeriComponentClose size={12} color='#FFFFFF' onClick={closeMessage.bind(this, index, item.id)} /> : ''
                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                            <div className="message-item-whiteMask" style={{backgroundColor: `rgba(255, 255, 255, ${0 + (index * 0.2)})`}}>
                                                {
                                                    item.button ? <m-button class="right_flex" type="default" size="small" onClick={item.buttonClick}>{item.button}</m-button> : ''
                                                }
                                                {
                                                    item.showClose ? <span class="message-item-button_container">
                                                            <IconMeriComponentClose size={16} color='#FFFFFF' onClick={closeMessage.bind(this, index, item.id)} />
                                                    </span> : ''
                                                }
                                            </div>
                                        </li>
                                )
                            })
                        }
                    </TransitionGroup>
                </ul >
            )
        }
    }
})





const closeMessage = (index: any, id: string) => {
    if (state.messageList.length) {
        console.log(index, id, state.messageList)
        if (id) {
            let idx = state.messageList.findIndex(item => item.id == id)
            if (idx == -1) return;
            state.messageList.splice(idx, 1)
            state.arr.splice(idx, 1)
        } else {
            console.log(state.arr, state.messageList)
            state.messageList.splice(index, 1)
            state.arr.splice(index, 1)
        }
    }
    // 判断当前示例是否存在
    if (!instance.value) {
        const div = document.createElement('div');
        const root = document.body;
        root.appendChild(div);

        const vm = createVNode(Message, {
            messageList: state.messageList
        });

        // 挂在到容器
        render(vm, div);

        instance.value = vm;
    }
}

//创建uuid，删除时根据uuid判断是哪条数据
const create_uuid = function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// 消息显示时长
const timer = ref<number>(3000);

// 创建的示例
const instance = ref<VNode>();

// 处理数据
function handleData(type: string, obj: Object): void {
    // 数据添加
    if (state.messageList.length >= 5) {
        state.messageList.pop()
        state.arr.pop()
    };
    let id = create_uuid()
    state.arr.unshift(0)
    state.messageList.unshift({ type, ...obj, id });
    // 数据删除
    setTimeout(() => {
        if (state.messageList.length > 0) {
            closeMessage(0, id)
        }
    }, obj.duration || timer.value);

    // 判断当前示例是否存在
    if (!instance.value) {
        const div = document.createElement('div');
        const root = document.body;
        root.appendChild(div);

        const vm = createVNode(Message, {
            messageList: state.messageList
        });

        // 挂在到容器
        render(vm, div);

        instance.value = vm;
    }
}

interface MessageImplements {
    success(obj: object): void;
    error(obj: object): void;
}

class MessageClass implements MessageImplements {
    // 普通提示
    success(obj: object): void {
        handleData('success', { ...obj });
    }
    // 错误提示
    error(obj: object): void {
        handleData('error', { ...obj });
    }

    Info(obj: object): void {
        handleData('info', { ...obj });
    }

    Default(obj: object): void {
        handleData('default', { ...obj });
    }

    customIcon(obj: object): void {
        handleData('customIcon', { ...obj });
    }
}

export const $Message = new MessageClass();

export default Message;
