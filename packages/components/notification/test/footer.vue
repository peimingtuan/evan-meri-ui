<template>
    <m-button @click="open">Footer Button</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const open = (item: any) => {
            $notify.info({
                title: 'Title',
                content: "This is a success message",
                duration: 0,
                footer: [
                    {
                        type: 'link',
                        text: '查看详情',
                        action: (res: any) => {
                            console.log(res.data)
                        }
                    },
                    {
                        type: '',
                        text: "关闭",
                        action: (res: any) => {
                        // console.log(res)
                            res.close()
                        }
                    }
                ]
            });
        }
       
        return {
            open
        }
    },
})
</script>
