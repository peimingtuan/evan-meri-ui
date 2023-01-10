<template>
  <m-switch v-model="value1"></m-switch>
  <m-switch v-model="value2" size="small"></m-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value1 = ref('uncheck');
    const value2 = ref('uncheck');
    return { value1,value2 };
  },
});
</script>