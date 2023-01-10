<template>
  <m-checkbox v-model="value">checkbox</m-checkbox>
  <m-checkbox v-model="value">checkbox1</m-checkbox>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref('uncheck');
    return { value };
  },
});
</script>
