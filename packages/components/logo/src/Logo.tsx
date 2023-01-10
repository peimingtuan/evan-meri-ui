// @ts-nocheck
import { defineComponent, h, PropType } from 'vue';
import { useElementSize, templateRef } from '@vueuse/core';


const logoProps = {
    // 尺寸
    count: {
        type: Number as PropType<number>,
        default: 0
    },
    show: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    type: {
        type: String,
        default: false
    }
} as const;

const Logo = defineComponent({
    name: "Logo",
    props: logoProps,
    emits: [],
    setup(props, { slots }) {

        const el = templateRef("el", null);
        const logo = templateRef("logo", null);
        const { width, } = useElementSize(el)
        const { width: logoWidth } = useElementSize(logo)

        return () => {
            // 大圆的半径
            const R = width.value / 2;
            // 小圆的半径
            const r = logoWidth.value / 2;

            const skip = Math.cos(Math.PI / 180 * 45) * R - r;

            const stlyeVars = (props.count&&props.type != "dot")? {
                top: `-6px`,
                right: `-${r - 1}px`,
            } : {
                    top: `-1px`,
                    right: `-1px`,
                }

            const countStr = (props.count&&props.type != "dot" ) ? (props.count > 99 ? "99+" : props.count) : "";

            const classList = ["logo"];
            if (props.count && props.type != "dot") {
                classList.push("has");
            }

            const logo = ( props.show) ? <div ref="logo" style={stlyeVars} class={classList} type={props.type}>{countStr}</div> : null;

            return (
                <div class="m-logo" ref="el" >
                    {logo}
                    {slots.default?.()}
                </div>
            )
        }
    }
})
export default Logo;