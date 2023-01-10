<template>
    <m-button @click="open"> Use HTML String</m-button>
</template>
<script lang="ts">
import { AnyTypeAnnotation } from '@babel/types';
import { defineComponent } from 'vue';
import $notify from "../index";

export default defineComponent({
    setup() {
        const open = (item: any) => {
            $notify.info({
                title: 'HTML String',
                dangerouslyUseHTMLString: true,
                content: "This is <i>HTML</i> string",
            });
        }
       
        return {
            open
        }
    },
})
</script>
