<template>
  <div>
    <m-pagination
      background
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next"
    ></m-pagination>
    <m-pagination
      background
      :pagerCount="5"
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next"
    ></m-pagination>
    <m-pagination
      background
      :pagerCount="10"
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next"
    ></m-pagination>
    
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
