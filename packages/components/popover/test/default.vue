<template>
  <m-popover content="我是提示文字">
    <m-button>hover</m-button>
  </m-popover>
  <m-popover content="我是提示文字" trigger="click">
    <m-button>click</m-button>
  </m-popover>
  <m-popover content="我是提示文字" :isOpen="isOpen" trigger="manually">
    <m-button @click="isOpen = !isOpen">manually</m-button>
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
