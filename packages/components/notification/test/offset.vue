<template>
    <m-button @click="open">Notification with offset</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const open = (item: any) => {
            $notify.info({
                title: 'Offset',
                content: "This is a success message",
                offset: 200,
            });
        }
       
        return {
            open
        }
    },
})
</script>
