<template>
  <m-popover content="我是提示文字" @show="show" @hide="hide" trigger="click">
    <m-button>methods</m-button>
  </m-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import $notify from '../../notification/src/NotificationProps';
export default defineComponent({
  setup() {
    const isOpen = ref<boolean>(false);
    return {
      isOpen,
      show() {
        $notify.success({ title: '打开', content: '显示时触发' });
      },
      hide() {
        $notify.success({ title: '关闭', content: '隐藏时触发' });
      }
    };
  }
});
</script>
