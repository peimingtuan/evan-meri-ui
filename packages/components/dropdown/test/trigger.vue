<!--
 * @Description: 
 * @Author: Devin
 * @Date: 2022-07-28 23:46:49
 * @LastEditTime: 2022-07-29 00:00:46
 * @LastEditors: Devin
 * @Reference: 
-->
<template>
  <div style="display: flex; align-items: center">
    <m-dropdown :options="options" text="悬浮！！！！" style="margin-right: 30px"> </m-dropdown>
    <m-dropdown :options="options" text="点我哦！" style="margin-right: 30px" trigger="click"> </m-dropdown>
    <m-dropdown
      :options="options"
      text="我需要你的帮助"
      style="margin-right: 30px"
      trigger="manually"
      v-model="isOpen"
    >
    </m-dropdown>
    <m-button style="display: inline-block" @click="click">{{isOpen ? '关闭' : '展开'}}</m-button>
    <!-- <m-dropdown :options="options" text="Dropdown List" trigger> </m-dropdown> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: '他知我心',
          key: 'marina bay sands'
        },
        {
          label: '流年染指心痛',
          key: "brown's hotel, london"
        },
        {
          label: '袭月',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '只有自己强大，才不会被别人践踏。',
          key: 'the beverly hills hotel, los angeles'
        }
      ],
      value: 'uncheck',
      isOpen: false
    });
    const click = () => {
      state.isOpen = !state.isOpen;
      state.value = state.isOpen ? 'checked' : 'uncheck';
    };
    return { ...toRefs(state), click };
  }
});
</script>
