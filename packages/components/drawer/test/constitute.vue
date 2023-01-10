<template>
    <m-button type="primary" @click="openDrawer">显示弹窗</m-button>
    <m-drawer :show="drawerStatus" shadowClick={true} shadow={true} footNotFixed={true}>
        <template #title>
            自定义标题
            <!-- <m-button type="default" size="small">默认按钮</m-button> -->
        </template>
        <template #content>
            <div style="font-size: 20px;width: 500px; margin: 16px 0;">
                自定义内容
            </div>
        </template>
        <template #handle>
            <m-button type="primary" size="medium">自定义按钮</m-button>
            <m-button type="default" size="medium">自定义按钮</m-button>
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
        const openDrawer = () => {
            drawerStatus.value = true
        };
        const closeDrawer = () => {
            drawerStatus.value = false
        }


        return { openDrawer, drawerStatus, closeDrawer }
    },
});
</script>
  