<template>
    <m-button @click="open1">Success</m-button>
    <m-button @click="open2">Warning </m-button>
    <m-button @click="open3">Info </m-button>
    <m-button @click="open4">Error</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const open1 = (item: any) => {
            $notify.success({
                title: 'Success',
                content: 'This is a success message',
            });
        }
        const open2 = (item: any) => {
            $notify.warning({
                title: 'Warning',
                content: 'This is a success message',
            });
        }
        const open3 = (item: any) => {
            $notify.info({
                title: 'Info',
                content: 'This is a success message',
            });
        }
        const open4 = (item: any) => {
            $notify.error({
                title: 'Error',
                content: 'This is a success message',
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
