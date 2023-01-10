<template>
  <m-switch
      v-model="status1.value"
      :loading="status2.loading"
  ></m-switch>
  <m-switch
      v-model="status2.value"
      size="small"
      :loading="status2.loading"
  ></m-switch>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";

export default defineComponent({
  setup() {
    const status1 = reactive({
      value: 'uncheck',
      loading: true,
    })
    const status2 = reactive({
      value: 'uncheck',
      loading: true,
    })
    return {status1, status2}
  },
});
</script>