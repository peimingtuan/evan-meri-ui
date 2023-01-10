<!--
 * @FilePath: format.vue
 * @Author: zhangjiaqi
 * @Date: 2022-08-04 16:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 16:30:18
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
-->
<template>
  <p>format hm</p>
  <m-time-picker v-model="testTime1" format="hm"></m-time-picker>
   <p>format hms</p>
  <m-time-picker v-model="testTime2" format="hms"></m-time-picker>
   <p>format s</p>
  <m-time-picker v-model="testTime3" format="s"></m-time-picker>
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
      const testTime = ref('01:20:59')
      const testTime2 = ref('')
      const testTime3 = ref('')
      const testTime4 = ref('01:00:09-01:34:12')
      const testTime1 = ref('')
      const timechange = (v: string) => {
        console.log(testTime.value);
        // testTime.value = v
      }
      const timechange1 = (v: string) => {
        console.log(v);
        testTime1.value = v
      }
      const timechange2 = (v: string) => {
        console.log('返回得时间', v);
        testTime2.value = v
      }
      const timechange3 = (v: string) => {
        console.log(v);
        testTime3.value = v
      }
      const timechange4 = (v: string) => {
        console.log(v);
        testTime4.value = v
      }
      const errtext = ref('32432')
      const changeerr = () => {
        errtext.value = ''
      }
      return {
        changeerr,
        errtext,
        testTime,
        testTime1,
        testTime2,
        testTime3,
        testTime4,
        timechange,
        timechange1,
        timechange2,
        timechange3,
        timechange4
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