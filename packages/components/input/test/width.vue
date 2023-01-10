<template>
  <p>输入框自定义宽度</p>
  <m-input  :clearable="true" v-model="value" :width="300"> </m-input>
  <p>多行输入框自定义宽度</p>
  <m-input  :rows="5" :width="300"
            :type="'textarea'"
            placeholder="请输ss入"
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
