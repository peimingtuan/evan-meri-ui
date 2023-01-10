<!--
 * @FilePath: default.vue
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 18:58:22
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
-->
<template>
   <p>errorText</p>
  <m-time-picker v-model="testTime3" errorText="超时了" :stepS="5" format="s" scopeTime="02-20"></m-time-picker>

  <p>placeholder</p>
  <m-time-picker v-model="testTime3" placeholder="请选择" :stepS="5" format="s" scopeTime="02-20"></m-time-picker>

  <p>disabled</p>
  <m-time-picker v-model="testTime3" disabled :stepS="5" format="s" scopeTime="02-20"></m-time-picker>
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
     
      return {
        testTime3,
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