<template>
    <m-button @click="open1">Top Right</m-button>
    <m-button @click="open2">Bottom Right </m-button>
    <m-button @click="open3">Bottom Left</m-button>
    <m-button @click="open4">Top Lef</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const open1 = (item: any) => {
            $notify.info({
                title: 'Custom Position',
                content: "I'm at the top right corner",
                
            });
        }
        const open2 = (item: any) => {
            $notify.info({
                title: 'Custom Position',
                content: "I'm at the bottom right corner",
                position: 'bottomRight',
            });
        }
        const open3 = (item: any) => {
            $notify.info({
                title: 'Custom Position',
                content: 'This is a bottom left message',
                position: 'bottomLeft',
            });
        }
        const open4 = (item: any) => {
            $notify.info({
                title: 'Custom Position',
                content: 'This is a top left message',
                position: 'topLeft',
            });
        }
        return {
            open1,
            open2,
            open3,
            open4,
        }
    },
})
</script>
