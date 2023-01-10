import {createVNode, render, VNodeChild} from "vue";
import {
    isString,
  } from '@vue/shared'
import Notification, {IconType} from "./Notification";
import { property } from "lodash";
//判断是否是页面内的元素
const isElement = (e: unknown): e is Element => {
    if (typeof Element === 'undefined') return false
    return e instanceof Element
}
type NotificationPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type ButtonType = 'default ' | 'primary ' | 'error ' | 'link ' | 'text';
const NotificationVMObj = {
    topRight: '',
    topLeft: '',
    bottomLeft: '',
    bottomRight: ''
}
//获取id
let seed = 0;
const now = Date.now();
const getUuid = () => {
  const id = seed;
  seed += 1;
  return `rcNotification_${now}_${id}`;
}
let $notify:any;
$notify = (options: any) => {
    if(!options.position) {
      options.position = 'topRight'
    }
    //添加id
    options.id = getUuid()
    //获取实例
    const container = document.querySelector(".m-notification-container--"+options.position);
    
    //创建实例
    const div = document.createElement('div');

    if (NotificationVMObj[options.position]) {
      NotificationVMObj[options.position]?.component?.proxy?.add(options);
      return options;
    }
    //处理 appendTo
    let appendTo: HTMLElement | null = document.body
    if (isElement(options.appendTo)) {
      appendTo = options.appendTo
    } else if (isString(options.appendTo)) {
      appendTo = document.querySelector(options.appendTo)
    }

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      console.error(
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      )
      appendTo = document.body
    }

    const vm = createVNode(Notification, options);

    NotificationVMObj[options.position] = vm;

    render(vm, div);

    //判断是否有容器
    if (!container) {
        appendTo.appendChild(div.firstElementChild!);
    }
    NotificationVMObj[options.position]?.component?.proxy?.add(options);
    // console.log(vm)
    // return NotificationVMObj[options.position]?.component?.proxy
    return options
}
// 全部销毁
$notify.destroyAll = (): void => {
    for (const key in NotificationVMObj) {
        if(  NotificationVMObj[key] ) {
            NotificationVMObj[key]?.component?.proxy?.destroyAll();
        }
    }
}
//关闭指定的消息通知
$notify.close = (options: any) => {
  NotificationVMObj[options?.position]?.component?.proxy?.remove(options?.id);
}
//footer 
type FooterType = {
    type?: string;//按钮类型与按钮组件保持一致
    size?: ButtonType;//按钮大小
    text: string;//按钮的文本内容
    action?: (res: any) => void;//按钮点击事件的回调
};
export interface Options {
    type?: IconType;
    position?: NotificationPosition;//位置
    title: string | VNodeChild;//标题
    onClose?: (res:any) => void;//关闭回调
    offset?: number;//距上或下的偏移量
    duration?: number;//关闭前的时长，0不关闭
    content: string | VNodeChild;//描述内容
    dangerouslyUseHTMLString?: boolean;//是否将 message 属性作为 HTML 片段处理
    customClass?: string,//自定义类名
    onClick?: (res:any) => void;//点击消息通知的回调
    showClose?: boolean;//是否展示
    maxCount?: number;//单个类型最大展示数量
    footer?: Array<FooterType>;//底部操作按钮
    appendTo?: VNodeChild;//要插入的dom
}

const iconTypes: IconType[] = ['success', 'info', 'warning', 'error'];
iconTypes.forEach(type => {
  $notify[type] = (args: Options) => {
        return $notify({
            ...args,
            type,
        });
    }
});



export default  $notify ;