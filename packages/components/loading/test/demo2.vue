<template>
  <div class="test">
    <div class="test1"></div>
    <div class="test3"></div>
    <div v-loading="show" element-loading-lottiename="circle" class="test2"></div>
  </div>
</template>


<script setup>
import {defineComponent, nextTick, onUnmounted, ref, render, onMounted} from "vue";
import loading from "../index";

const l = loading.service({
  target: ".test1",
  fullscreen: false,
  duration: 30000,
  lottieName: "ball",
  loadTextOptions: {
    text: "加载中",
  },
})
loading.service({
  target: ".test3",
  fullscreen: false,
  duration: 30000,
  lottieName: "ball",
})


const show = ref(true);


</script>


<style lang="less" scoped>

.test {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 48%;
    height: 300px;
    border: 1px solid var(--gray-300);
    overflow: hidden;
    margin: 10px;
    border-radius: 5px;
  }
}

</style>
