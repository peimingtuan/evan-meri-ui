<!--
 * @FilePath: step.vue
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 19:06:36
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
-->
<template>
   <p>format s ---- stepS + scopeTime</p>
  <m-time-picker v-model="testTime3" :stepS="5" format="s" scopeTime="02-20"></m-time-picker>
  <p>format m ---- stepM</p>
  <m-time-picker v-model="testTime2" :stepM="4" format="m" ></m-time-picker>
  <p>format h ---- stepH</p>
  <m-time-picker v-model="testTime1" :stepH="2" format="h" ></m-time-picker>
</template>
<script lang="ts">
  import {
    defineComponent,
    reactive,
    ref,
    watch
  } from 'vue';

  export default defineComponent({
    setup() {
      const testTime3 = ref('')
     const testTime2 = ref('')
     const testTime1 = ref('')
      return {
        testTime3,testTime2,testTime1
      };
    }
  });
</script>

<style lang="less" scoped>
  .content {
    display: flex;
    padding: 30px;
  }
</style>