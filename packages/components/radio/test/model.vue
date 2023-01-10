<template>
  <m-radio v-model="value" label="radio" margin="30">radio</m-radio>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('checked')
    return { value }
  },
});
</script>
