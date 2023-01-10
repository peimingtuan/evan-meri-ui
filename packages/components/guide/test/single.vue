

<template>
  <div class="guide">
    <m-guide title="这里是标题" flow="rightTop" :visible="visible" @close="close" singleText="自定义按钮名称"
      content="文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明文本说明">
      <m-button type="primary" @click="show">测试按钮</m-button>
    </m-guide>
  </div>
</template>


<script lang="ts">
  import {
    defineComponent,
    ref
  } from 'vue'
  export default defineComponent({
    setup() {
      const visible = ref(true)
      const close = () => {
        visible.value = false
      }
const show = () => {
        visible.value = true
      }
      return {
        close,
        visible,
        show
      }
    }
  })
</script>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
  .guide {
    height: 300px;
  }
</style>