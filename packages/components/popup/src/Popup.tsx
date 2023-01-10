/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: wangyongcun
 * @LastEditTime: 2021-10-19 14:40:20
 * @Description: 头像组件
 */
import { defineComponent, h, ref, computed, Teleport, Component, StyleValue, CSSProperties, getCurrentInstance, onMounted, onBeforeUnmount, HTMLAttributes, Ref } from 'vue';
import position from "../../utils/position"
import popupProps from "./PopupProps";
import { Rect } from '../../utils/types';


const Popup = defineComponent({
    name: "Popup",
    props: popupProps,
    emits: ["onClickOutside", "update:open"],
    setup(props, { slots, attrs, emit }) {
        // 弹窗的定位布局
        const style = computed<CSSProperties>(() => {
            const { x, y } = position(props.target as Rect, props.flow, props.width, props!.height);
            return {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                width: `${props.width}px`,
                height: `${props.height}px`,
                display: 'block'
            }
        })

        return () => {

            return (
                <Teleport to="body" >
                    <div {...attrs} style={style.value}>
                        {/* x:{x.value}
                        y:{y.value} */}
                        {slots.default?.()}
                    </div>
                </Teleport>
            )
        }
    }
})
export default Popup;