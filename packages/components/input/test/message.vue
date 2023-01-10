<template>
  <m-input :errorText="value.length > 10 ? '长度大于十报错提示文案' : ''" v-model="value">
  </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("12345678901");
    return { value };
  },
});
</script>
