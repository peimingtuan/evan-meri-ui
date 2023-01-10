/**
 * @Description:  Breadcrumb 组件
 * @author: 邓红军
 * @date: 2022/6/15
 * @fileName: Breadcrumb
 */

import {defineComponent, h, ref} from 'vue';
import {onClickOutside} from "@vueuse/core";
import * as components from "meri-icon";
import "meri-icon/lib/style.css"

const breadcrumbProps = {
    separator: {
        type: String,
        default: '>'
    },
    separatorIcon: {
        type: String,
        default: ''
    },
    data: {
        type: Array,
        default: () => []
    },
    nameKey: {
        type: String,
        default: 'name'
    },
    itemNum: {
        type: Number,
        default: 10
    }
};


export default defineComponent({
    name: "Breadcrumb",
    props: breadcrumbProps,
    emits: ['change'],
    render() {
        let tsx: any = null;

        const {$props: {separator, data, nameKey, separatorIcon}, change, trigger} = this;

        const CurrenIcon = components[separatorIcon];

        const scp = separatorIcon
            ? (<CurrenIcon/>)
            : (<span class="m-breadcrumb-item__separator">{separator}</span>);

        if (this.isItem) {
            let before: any = data.shift();
            let after: any = data.pop();

            tsx = (<ul>
                <li onClick={change.bind(this, before, 0)} class="m-breadcrumb-item m-breadcrumb-item__clickable">
                    <span class="m-breadcrumb-item__link">{before[nameKey]}</span>
                    {scp}
                </li>

                <li onClick={trigger}
                    ref="triggerRef"
                    class="m-breadcrumb-item m-breadcrumb-item__clickable m-breadcrumb-item__trigger">
                    <span class="m-breadcrumb-item__link">...</span>
                    {scp}
                    <div class="m-breadcrumb-item__trigger-box">
                        {
                            data?.map((item: any, index: number) =>
                                <span onClick={change.bind(this, item, index + 1)}
                                      class="trigger-item m-breadcrumb-item__clickable ">{item[nameKey]}</span>
                            )
                        }
                    </div>
                </li>

                <li class="m-breadcrumb-item">
                    <span class="m-breadcrumb-item__link">{after[nameKey]}</span>
                    {scp}
                </li>
            </ul>)
        } else {
            tsx = (
                <ul>
                    {data.map((item: any, index: number) => {
                        return (
                            <li onClick={(index < data.length - 1) ? change.bind(this, item, index) : () => {
                            }}
                                class={["m-breadcrumb-item", (index < data.length - 1) ? 'm-breadcrumb-item__clickable' : '']}>
                                <span class="m-breadcrumb-item__link">{item[nameKey]}</span>
                                {scp}
                            </li>
                        )
                    })}
                </ul>
            );
        }

        return (
            <nav class="m-breadcrumb" aria-labm="Breadcrumb">
                {tsx}
            </nav>
        )
    },
    setup(props: any, {emit}) {

        const triggerRef: any = ref(null)

        const isItem = props.data.length >= props.itemNum;


        //回调事件
        const change = (item: any, index: number, el: any) => {

            const triggerItem = el.target.classList.contains('trigger-item');

            if (triggerItem) {
                triggerRef.value.classList.remove('active');
            }

            emit('change', item, index);
        };

        // 打开关闭
        const trigger = (el: any) => {
            el.target.parentNode.classList.toggle('active');
        }

        //关闭 dropdown
        onClickOutside(triggerRef, (event: any) => {
            triggerRef.value.classList.remove('active');
        })

        return {
            change,
            trigger,
            isItem,
            triggerRef
        }
    },

})


