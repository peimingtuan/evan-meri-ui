<template>
    <m-button type="primary" @click="drawerStatus=true">显示宽度为1100px</m-button>
    <m-button type="primary" @click="drawerStatus1=true">显示宽度为340px</m-button>
    <m-button type="primary" @click="drawerStatus2=true">显示宽度为180px</m-button>
    <m-drawer :show="drawerStatus" :shadowClick="true" :width="'1100px'" :shadow="false" :footFixed="true"
        :title="`标题一`">
        <template #content>
            <div style="font-size: 20px; margin:16px 0">
                设置宽度为1100px，实际宽度为最小值:960px
            </div>
        </template>
        <template #handle>
            <m-button type="primary" size="medium">自定义按钮</m-button>
        </template>
    </m-drawer>
    <m-drawer :show="drawerStatus1" :shadowClick="true" :width="'340px'" :shadow="false" :footFixed="true"
        :title="`标题二`">
        <template #content>
            <div style="font-size: 20px; margin:16px 0">
                设置宽度为340px，实际宽度为最小值:340px
            </div>
        </template>
        <template #handle>
            <m-button type="primary" size="medium">自定义按钮</m-button>
        </template>
    </m-drawer>
    <m-drawer :show="drawerStatus2" :shadowClick="true" :width="'180px'" :shadow="false" :footFixed="true"
        :title="`标题三`">
        <template #content>
            <div style="font-size: 20px; margin:16px 0">
                设置宽度为180px，实际宽度为最小值:240px
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
        const drawerStatus1 = ref<boolean>(false);
        const drawerStatus2 = ref<boolean>(false);


        return { drawerStatus2, drawerStatus, drawerStatus1 }
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
  