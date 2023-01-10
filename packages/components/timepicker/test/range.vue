<!--
 * @FilePath: range.vue
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 19:03:21
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
-->
<template>
   <p>range</p>
  <m-time-picker v-model="testTime3" range format="hms" ></m-time-picker>

    <p>range + scopeTime</p>
  <m-time-picker v-model="testTime2" range format="hms" scopeTime="08:30:20-16:45:20"></m-time-picker>
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
      return {
        testTime3,
        testTime2
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