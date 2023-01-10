<template>
  <m-button type="primary" @click="openDrawer">底部跟随</m-button>
  <m-drawer :show='drawerStatus' @close="closeDrawer" shadowClick={true} shadow={true} footNotFixed={true}>
    <template #title>
        标题111
        <!-- <m-button type="default" size="small">默认按钮</m-button> -->
    </template>
    <template #content>
        <div style="font-size: 20px;width: 500px; margin:16px 0">
          标题11122
        </div>
    </template>
    <template #handle>
        <m-button type="primary" size="medium" >主要按钮</m-button>
        <m-button type="default" size="medium">主要按钮</m-button>
    </template>
  </m-drawer>



  <m-button type="primary" @click="openDrawer2">底部固定+mask高度</m-button>
  <m-drawer :show='drawerStatus2' @close="closeDrawer2" shadowClick={true} shadow={true} height='calc(100vh - 60px)'>
    <template #title>
        标题222
        <!-- <m-button type="default" size="small">默认按钮</m-button> -->
    </template>
    <template #content>
        <div style="font-size: 20px;width: 500px;height:100vh; padding: 16px">
          标题222
        </div>
    </template>
    <template #handle>
        <m-button type="primary" size="medium" >主要按钮</m-button>
        <m-button type="default" size="medium">主要按钮</m-button>
    </template>
  </m-drawer>




  <m-button type="primary" @click="openDrawer3">无蒙层</m-button>
  <m-drawer :show='drawerStatus3' @close="closeDrawer3" shadowClick={true}>
    <template #title>
        标题222
        <!-- <m-button type="default" size="small">默认按钮</m-button> -->
    </template>
    <template #content>
        <div style="font-size: 20px;width: 500px;height:100vh; padding: 16px">
          标题222
        </div>
    </template>
    <template #handle>
        <m-button type="primary" size="medium" >主要按钮</m-button>
        <m-button type="default" size="medium">主要按钮</m-button>
    </template>
  </m-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Drawer from "../index";

export default defineComponent({
  components: {Drawer},
  setup() {
    const drawerStatus = ref<boolean>(false)
    const drawerStatus2 = ref<boolean>(false)
    const drawerStatus3 = ref<boolean>(false)
    const openDrawer =()=>{
      drawerStatus.value = true
    };
    const closeDrawer = () =>{
      drawerStatus.value = false
    }
    
    const openDrawer2 =()=>{
      drawerStatus2.value = true
    };
    const closeDrawer2 = () =>{
      drawerStatus2.value = false
    }


    const openDrawer3 =()=>{
      drawerStatus3.value = true
    };
    const closeDrawer3 = () =>{
      drawerStatus3.value = false
    }
    return {openDrawer, drawerStatus, closeDrawer, openDrawer2, closeDrawer2, drawerStatus2, drawerStatus3, closeDrawer3, openDrawer3}
  },
});
</script>
