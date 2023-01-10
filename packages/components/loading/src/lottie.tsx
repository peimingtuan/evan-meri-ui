/**
 * @Description: lottie
 * @author: 邓红军
 * @date: 2022/9/7
 * @fileName: lottie
 */
import {defineComponent, h} from 'vue'
import {Vue3Lottie} from 'vue3-lottie'
import "vue3-lottie/dist/style.css"

export default defineComponent({
    name: 'Lottie',
    components: {
        Vue3Lottie,
    },
    props: {
        animationData: {
            default: {}
        },
    },
    render() {
        return (
            <Vue3Lottie
                class="m-loading-animation--lottie"
                animationData={this.$props.animationData}
                loop={true}
                height="220px"
                width="220px"/>
        );
    },
})
