// @ts-nocheck
/**
 * @Description:  notification 组件
 * @author: Xiao'Hong
 * @date: 2022/6/15
 * @fileName: notification
 */

import {
    defineComponent,
    h,
    reactive,
    TransitionGroup,
    ref,
    onMounted,
    handleError,
    HtmlHTMLAttributes
} from 'vue';
import MButton from "../../button";

import { 
    IconMeriComponentClose, 
    IconMeriComponentNotificationSuccess,
    IconMeriComponentNotificationError,
    IconMeriComponentNotificationInfo,
    IconMeriComponentNotificationWarning
}  
from 'meri-icon';
import "meri-icon/lib/style.css"
// import { selectHeaderEmits } from '../../selectHeader/src/SelectHeaderProps';

const iconRenderMap = {
    info: () => <IconMeriComponentNotificationInfo size={24} />,
    success: () => <IconMeriComponentNotificationSuccess size={24} />,
    warning: () => <IconMeriComponentNotificationWarning size={24} />,
    error: () => <IconMeriComponentNotificationError size={24} />,
    // default: () => null
}
interface StyleAttr {
    top?: string,
    bottom?: string,
    left?: string,
    right?: string,
    position: string,
    marginTop?: string,
    marginBottom?: string,
}
export type IconType = 'success' | 'info' | 'error' | 'warning';

export default defineComponent({
    name: "Notification",
    inheritAttrs: false,
    components: {},
    render() {
        const {position, notices, close, mouseEnter, mouseLeave, addEvent,click} = this;
        let Vm = notices.map((item: any, index: number) => {
        const styleAttr = ref<StyleAttr>();
        if( item.offset ) {
            
            if( item.position.endsWith('Right') ) {
                styleAttr.value = {
                    top: item.offset+'px',
                    position: "fixed",
                    right: '0px',
                    marginTop: "0px"
                }
            }else if( item.position.endsWith('Left') ) {
                styleAttr.value = {
                    top: item.offset+'px',
                    position: "fixed",
                    left: '0px',
                    marginTop: "0px"
                }
            }
        }
        if (!item.visible) return null;
            let mainClasName = "m-notification-main";
            let contentClasName = "m-notification__content";
            let warpperCalssName = "m-notification-wrapper";
            if( item.type ) {
                mainClasName += ' m-notification-main--'+item.type
            }else {
                contentClasName += " m-notification__custom"
            }
            //是否有操作按钮
            if( item.footer && item.footer.length ) {
                mainClasName += ' m-notification-main--footer'
            }
            if( item.customClass ) {
                warpperCalssName += ' '+item.customClass
            }
            return (
                <div 
                    class={warpperCalssName}
                    key={item.id} 
                    id={item.id}
                    onMouseenter={() => {mouseEnter(item)}}
                    onMouseleave={() => {mouseLeave(item)}}
                    before-Leave={item.onClose && item.onClose(item)}
                    { ...styleAttr.value ? {"style":{...styleAttr.value}} : '' }
                    
                >
                    
                    <div class={mainClasName} onClick={() => {click(item)}}>
                        {
                            item.type ?
                            <div class="m-notification__icon">{iconRenderMap[item.type]()}</div>
                            :
                            ''
                        }
                        
                        {
                            item.showClose != false ? 
                            <div class="m-notification__close" onClick={(e) => {
                                close(index);
                                item.onClose && item.onClose(item);
                            }}>
                                <IconMeriComponentClose color={'#8D9399'} size={20} />
                            </div>
                            :
                            ''
                        }
                        
                        <div class={contentClasName}>
                            <div class="m-notification__content__header">{item.title}</div>
                            {
                                item.dangerouslyUseHTMLString ?
                                <div class="m-notification__content__text" v-html={item.content}></div> 
                                :
                                <div class="m-notification__content__text">{item.content}</div> 
                            }

                            
                        </div>
                        <div v-show={item.footer} class="m-notification__footer">
                            {   
                              item.footer?.map((itemFooter: any) => {
                                        return <div onClick={addEvent.bind(this,itemFooter,index,item)} class="m-notification__footer__item">
                                            <MButton 
                                            type={itemFooter.type ? itemFooter.type : 'link'} 
                                            size={itemFooter.size ? itemFooter.size : 'medium'}>
                                                {itemFooter.text}
                                            </MButton>
                                        </div>
                                }) 
                                
                            }
                        </div>
                    </div>
                </div>
            )
        })
        // 判断position是否是左侧
        let isLeft = position?.endsWith('Left');
        return (
            <div class={"m-notification-container  m-notification-container--" + position}>
                {
                    isLeft ?
                    <TransitionGroup 
                name={ "m-notification-fade"}>
                    {{
                        default: () => Vm
                    }}
                </TransitionGroup>
                :
                <TransitionGroup 
                name={ "m-notification-fade m-notification-fade-right"}>
                    {{
                        default: () => Vm
                    }}
                </TransitionGroup>

                }
                
            </div>
        )
    },
    emits: ['click'],
    setup() {
        let notices: any = ref([]); // 存放所有的通知
        let maxCount = 4; // 最大通知数量
        let position = ref(null); // 通知的位置
        let duration = ref<number>(5000);//通知时长
        let timer:any = ref(null);
        // 添加通知
        const add = (options: any) => {
            position.value = options.position || 'topRight';
            if( !options.duration && options.duration != 0 ) {
                options.duration = duration.value;
            }
            // 限制最多三个
            if( options.maxCount ) {
                maxCount = options.maxCount
            }
            notices.value.push({
                ...options,
                visible: true,
            });
            handletimer(notices.value[notices.value.length-1])
            if (notices.value.length > maxCount) {
                notices.value.shift();
            }
        }
        const handletimer = (item: any) => {
            // console.log(item.duration)
            if( item.duration > 0 ) {
                timer.value = setTimeout(() => {
                    item.visible = false;
                    timer.value = null;
                }, item.duration);
            }
            
        }
        //移出某个通知
        const remove = (id: string) => {
            let deleteIndex = -1;
            for (let index = 0; index < notices.value.length; index++) {
                const item = notices.value[index];
                if( item.id === id ) {
                    deleteIndex = index;
                    break;
                }
            }
            notices.value.splice(deleteIndex, 1)
        }
        // 关闭当前通知
        const close = (index: number) => {
            // console.log(index)
            notices.value.splice(index, 1)
        }
        //点击当前通知框
        const click = (item: any) => {
            if(item.onClick) {
                item.onClick(item)
            }
        }

        // 清空通知
        const destroyAll = () => {
            notices.value = []
        }
        //鼠标悬浮
        const mouseEnter = (item: any) => {
            item.visible = true;
            clearTimeout(timer.value)
            timer.value = null
        }
        //鼠标移开
        const mouseLeave = (item: object) => {
            handletimer(item);
        }
        const addEvent = (item: any, index: number,data: any,event:any) => {
            item.action && item.action({
                close: () => {
                    close(index)
                },
                data: data
            })
            event.stopImmediatePropagation();
            
        }

        return {
            notices,
            position,
            add,
            remove,
            close,
            destroyAll,
            mouseEnter,
            mouseLeave,
            duration,
            addEvent,
            click
        }
    },
})


