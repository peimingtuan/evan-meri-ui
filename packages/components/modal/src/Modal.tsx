/*
 * @Author: yaoyujian
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: yaoyujian
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 横幅组件
 */
import { defineComponent, h, ref, Transition, onMounted, nextTick } from 'vue';
import { templateRef } from '@vueuse/core';
import { IconMeriComponentDialogWarning, IconMeriComponentDialogDelete,IconMeriComponentClose } from 'meri-icon'
import ModalProps from "./ModalProps"


const Modal = defineComponent({
    name: "Modal",
    props: ModalProps,
    emits: ['close','update:visible'],
    setup(props, { slots, emit }) {
         const body = document.body
         const show = ref(false)
        const isShadow = ref(false)
        const topValue=ref('')
        const content = templateRef<HTMLElement>('content')
        const modal = templateRef<HTMLElement>('modal')
        let footerHeight = 0
        if (slots.footer) {
            footerHeight = 70
        }
        const limitHeight = window.innerHeight-256;
        let  minHeight = window.innerHeight
        if (slots.footer) {
            minHeight = window.innerHeight - 120
        }
        // const visible: any = ref<Boolean | undefined>(props.visible)
        onMounted(() => {
            nextTick(() => {
                console.log(content,'modal')
                if(props.escable){
                    document.addEventListener('keydown', (e)=> {
                        //此处填写你的业务逻辑即可
                        if(e.code=='Escape'){
                            emit('update:visible', false)
                        }
                    });
                }
               
            })

        })
       
        const closeModal = () => {
            console.log('nimmaa')
            emit('update:visible', false)
            // emit('close');
        }
        return () => {
            if (props.visible === true) {
                 
                body.style.overflow = 'hidden'
                show.value = true
                nextTick(() => {
                    console.log(content,'modal')
                    if(content?.value?.clientHeight){
                        if (content.value.clientHeight >= limitHeight) {
                            console.log('nishishabi')
                            isShadow.value = true
                        }
                    }  
                    if(modal?.value?.clientHeight&&props.topY){
                        console.log(modal?.value?.clientHeight,'height')
                        // const height=modal?.value?.clientHeight
                            if(props.topY.includes('%')){
                                topValue.value=props.topY
                            }else{
                                topValue.value=props.topY+'px'
                            }
                    }  
                })
    
            }
            if (props.visible === false) {
                setTimeout(() => {
                    show.value = false
                    body.style.overflow = 'overlay'
                }, 0)
            }
            // Modal 整体样式
            const typeObj = {
                info: 'info',
                error: 'info',
                default: 'default',
                full: 'full'
            }
        
            const modalType = () => {
               
                if ((props.type == 'info'||props.type=='error') && show.value) {
                    return <aside class='m-modal-main-type'>
                        <section class='m-modal-info-svg'>
                        {props.type == 'info' ? <IconMeriComponentDialogWarning size={24} /> : <IconMeriComponentDialogDelete size={24} />}
                        </section>
                        {props.title&&<div class="m-modal-title"><div class="m-title-text">{props.title}</div></div>}
                        <div class='m-modal-content'>
                            <section class="m-modal-content-main-text ">
                                {props.content}
                            </section>
                        </div>
                        { slots.footer ? <footer>
                           {slots.footer()} 
                        </footer>:
                        <div class='m-modal-footer'>
                            <m-button  onClick={closeModal}>取消</m-button>
                            <m-button type={props.type=='error'?'danger':'primary'} onClick={closeModal} >确定</m-button>
                        </div>}
                    </aside>
                } else if ((typeObj[props.type] == 'default') && show.value) {
                          console.log(props,'nihaha')
                    return <aside class='m-modal-main' style={{ marginLeft: -(props.width / 2) + 'px', width: props.width + 'px',top:topValue.value||'60px' }} ref='modal'>
                        <header>
                            <div class='m-modal-main-title'>{props.title}</div>
                            {props.closeable?<div class='m-modal-main-svg' onClick={closeModal}><IconMeriComponentClose size={24}/></div>:null}
                        </header>
                        <div class='m-modal-main-content' ref='content' >
                            {slots.content?.()}
                        </div>
                        {slots.footer ? <div class={['m-main-handle', isShadow.value ? 'm-main-handle-shadow' : null]} style='height:76px'>
                            {slots.footer?.()}
                        </div> :  <div class='m-modal-footer'>
                            <m-button  onClick={closeModal}>取消</m-button>
                            <m-button type={props.type=='error'?'danger':'primary'} onClick={closeModal}>确定</m-button>
                        </div>}
                    </aside>
                }
                else if ((typeObj[props.type] == 'full') && show.value) {
                    return <aside class='m-modal-full' >
                        <header>
                            <div class='m-modal-full-title'>{props.title}</div>
                            <div class='m-modal-full-svg' onClick={closeModal}><IconMeriComponentClose size={24} /></div>
                        </header>
                        <div class='m-modal-full-content' ref='content' style={{ minHeight: minHeight + 'px' }}>
                            {slots.content?.()}
                            {slots.contentFooter?.()}
                        </div>
                        {slots.footer ? <footer class={['m-full-handle', isShadow.value ? 'm-full-handle-shadow' : null]}>
                            {slots.footer?.()}
                        </footer> : null}
                    </aside>
                }
            }
            return (
                <div class="m-modal">
                    <Transition name='m-modalBox-fade'>
                        {show.value?<div class='m-modal-bg'></div>:null}
                    </Transition>
                    <Transition name='m-modal-fade'>
                    {modalType()}
                    </Transition>
                </div>
            )
        }
    }
})
export default Modal;