
<template>
  <div class="guide">
    <m-guide  :stepTip="stepTip" @closeall="closeall" step="multiple" flow="rightTop" :visible="visible"
      @close="close">
      <template v-slot:guidtitle>
        <span>标题插槽</span>
      </template>
      <template v-slot:guidcontent>
        <p>内容插槽</p>
      </template>
      <template v-slot:guidstep>
        <p>底部插槽</p>
      </template>
      <template v-slot:default>
        <m-button type="primary">测试按435钮</m-button>
      </template>
    </m-guide>
  </div>
</template>


<script lang="ts">
  import {
    defineComponent,
    reactive,
    ref
  } from 'vue'
  export default defineComponent({
    setup() {
      const visible = ref(true)
      const stepTip = reactive({
        gi: 1, //当前步骤
        count: 3, //总步数
        jumptext: '跳过全部拉拉', //跳过全部文字
        nexttext: '下一步文字' //多步骤按钮文字
      })
      const close = () => {
        visible.value = false
        //后续步骤进行独自扩展，当前实现为了后续扩展，只实现多步骤中某一步
      }
      const closeall = () => {
        visible.value = false
        //跳过全部事件
        //后续步骤进行独自扩展，当前实现为了后续扩展，只实现多步骤中某一步
      }
      return {
        closeall,
        stepTip,
        close,
        visible
      }
    }
  })
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .guide {
    height: 300px;
  }
</style>