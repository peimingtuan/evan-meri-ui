<template>
  <div>
    输入页码跳转
    <m-pagination
      background
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next,jumper"
    ></m-pagination>
    控制每页条数
    <m-pagination
      background
      :page-num="pageNum"
      :total="200"
      layout="total,prev,pager,next,sizes"
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
