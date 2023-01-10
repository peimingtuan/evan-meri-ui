<template>
  <m-popover content="我是提示文字">
    <m-button>Light</m-button>
  </m-popover>
  <m-popover content="我是提示文字" theme="dark" trigger="click">
    <m-button>Dark</m-button>
  </m-popover>
  <m-popover content="我是提示文字" theme="darkTransparent" trigger="click">
    <m-button>DarkTransparent</m-button>
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
