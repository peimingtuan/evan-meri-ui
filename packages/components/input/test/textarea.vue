<template>
  textarea设置宽高为最小宽高
  <m-input  :rows="5"
          :type="'textarea'"
          placeholder="请输ss入"
          v-model="value"
            :width="200" :height="200"
  >
  </m-input>

  <m-input
    :type="'textarea'"
    placeholder="请输入"
    :disabled="true"
    :width="300"
    :maxlength="10"
    v-model="value"
  >
  </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    return { value };
  },
});
</script>
