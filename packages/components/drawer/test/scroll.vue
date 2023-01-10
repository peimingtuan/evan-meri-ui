<template>
    <m-button type="primary" @click="openDrawer">显示弹窗</m-button>
    <m-drawer :show="drawerStatus" :shadowClick="true" :shadow="true" :footFixed="false">
        <template #title>
            自定义标题
            <!-- <m-button type="default" size="small">默认按钮</m-button> -->
        </template>
        <template #content>
            <div style="font-size: 20px;width: 500px; margin:16px 0">
                <m-button type="primary" @click="add">添加内容</m-button>
                <m-button type="primary" @click="subtraction">减少内容</m-button>
                <div class="list">
                    <div class="item" v-for="(item) in list" :key="item">第{{item+1}}行</div>
                </div>
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
        const openDrawer = () => {
            drawerStatus.value = true
        };

        const list = ref<number[]>([]);

        const add = () => {
            list.value.push(list.value.length);
        }

        const subtraction = () => {
            list.value.splice(-1, 1);
        }


        return { openDrawer, drawerStatus, list, add, subtraction }
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
  