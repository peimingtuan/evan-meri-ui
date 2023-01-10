<template>
  <m-popover content="我是提示文字" :mouse-enter-delay="500">
    <template #content>
      <m-tag color="#981811">Mouse enter 500ms later.</m-tag>
    </template>
    <m-button  type="primary">Mouse enter 500ms later.</m-button>
  </m-popover>
  <m-popover content="我是提示文字" :mouse-leave-delay="2000">
    <template #content>
      <m-tag color="#018471">MouseLeave delay 2000ms</m-tag>
    </template>
    <m-button >MouseLeave delay 2000ms</m-button>
  </m-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const isOpen = ref<boolean>(false);
    return { isOpen };
  }
});
</script>
