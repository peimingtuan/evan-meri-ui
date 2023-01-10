<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-07-27 22:37:50
 * @LastEditTime: 2022-07-28 23:52:00
 * @LastEditors: Devin
 * @Reference: 
-->
<template>
  <div><m-dropdown :options="options" text="Dropdown List" trigger="click"> </m-dropdown></div>
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
          type: "divider",
          key: "d1",
          label: "分割线无横线",
          divider: false,
        },
        {
          label: "流年染指心痛",
          key: "brown's hotel, london",
        },
        {
          type: "divider",
          key: "2",
          label: "嘻嘻",
          divider: true,
        },
        {
          label: "袭月",
          key: "atlantis nahamas, nassau",
        },
        {
          type: "divider",
          key: "d3",
          label: "欧",
          divider: true,
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
