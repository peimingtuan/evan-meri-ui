<template>
  <div>
    <m-pagination background :page-num="pageNum" :total="200" layout="total,prev,pager,next" disabled></m-pagination>
    <m-pagination :page-num="pageNum" :total="200" layout="total,prev,pager,next" disabled></m-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      pageNum: 1,
    });
    return { ...toRefs(state) };
  },
});
</script>
