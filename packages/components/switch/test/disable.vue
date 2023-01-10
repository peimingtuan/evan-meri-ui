<template>
  <m-switch :disabled="true" v-model="value1"></m-switch>
  <m-switch :disabled="true" v-model="value2"></m-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value1 = ref('uncheck');
    const value2 = ref('checked');
    return { value1,value2 };
  },
});
</script>