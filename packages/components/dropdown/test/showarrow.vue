<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-07-27 22:37:50
 * @LastEditTime: 2022-07-28 23:59:59
 * @LastEditors: Devin
 * @Reference: 
-->
<template>
  <div><m-dropdown :options="options" text="指向前方的道路" showArrow trigger="click"> </m-dropdown></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: "他知我心",
          key: "marina bay sands",
        },
        {
          label: "流年染指心痛",
          key: "brown's hotel, london",
        },
        {
          label: "袭月",
          key: "atlantis nahamas, nassau",
        },
        {
          label: "只有自己强大，才不会被别人践踏。",
          key: "the beverly hills hotel, los angeles",
        },
      ],
    });
    return { ...toRefs(state) };
  },
});
</script>
