<template>
    <m-button @click="info(v)" v-for="(v,index) in dataList" :key="index">{{ v.title }}</m-button>
    <m-button @click="destroyAll">Destroy All</m-button>
    <m-button @click="open">Open Notification</m-button>
    <m-button @click="closeDefault">Close Notification</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent, h, ref } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const notification:any = ref();
        const dataList:object[] = [
            {
                title: "Default",
                content: "策略内容已成功刷新，请查收"
            },
            {
                title: "Duration 0",
                position: "topRight",
                content: "This is a message",
                duration: 0,
            },
            {
                title: "Hide close button",
                content: "This is a message without close button",
                showClose: false,
            },
        ]
        const info = (item: any) => {
            $notify.info({
                ...item,
                onClose: (props:any) => {
                    console.log(props);
                },
                onClick: (props:any) => {
                    console.log(props);
                },
            });
        }
        const destroyAll = (item: any) => {
            $notify.destroyAll();
        }
        //关闭指定的通知框
        const closeDefault = () => {
            if( notification.value ) {
                $notify.close(notification.value)
                notification.value = ""
            }
            
        }
        const open = () => {
            notification.value = $notify.info({
                title: 'close me',
                content: "Please click the close button",
            });
        }
        return {
            dataList,
            info,
            destroyAll,
            closeDefault,
            open
        }
    },
})
</script>
