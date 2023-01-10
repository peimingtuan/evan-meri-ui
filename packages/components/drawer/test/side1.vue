<template>
    <m-button type="primary" @click="click('显示内容一')">显示内容一</m-button>
    <m-button type="primary" @click="click('显示内容二')">显示内容二</m-button>
    <m-button type="primary" @click="click('显示内容三')">显示内容三</m-button>
    <m-drawer :show="drawerStatus" :shadowClick="false" :shadow="false" :footFixed="true" :title="`标题${message}`">
        <template #content>
            <div style="font-size: 20px;width: 500px; margin:16px 0">
                {{message}}
            </div>
        </template>
        <template #handle>
            <m-button type="primary" size="medium">自定义按钮</m-button>
        </template>
    </m-drawer>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import Drawer from "../index";

export default defineComponent({
    components: { Drawer },
    setup() {
        const drawerStatus = ref<boolean>(false);
        const click = (str: string) => {
            drawerStatus.value = true;
            message.value = str;
        };

        const message = ref("");



        return { click, drawerStatus, message }
    },
});
</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    .item {
        height: 30px;
        line-height: 30px;
    }
}
</style>
  