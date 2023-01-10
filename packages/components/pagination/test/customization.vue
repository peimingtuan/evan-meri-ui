<template>
  <div>
    <m-pagination
      background
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next"
      totalTmpString="这里一共有{total}条"
    ></m-pagination>
    <m-pagination
      background
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next,jumper"
      jumperTmpString="快来输入{jumper}页"
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
