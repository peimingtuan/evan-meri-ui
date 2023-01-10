<template>
  <div class="file">
    <div class="upload-style">
      <m-button @click="click">点我触发上传事件</m-button>
      <m-fileUpload ref="input" action='https://gapmdev.persagy.com/api/upload/fms'></m-fileUpload>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const input = ref();

    const click = () => {
      console.log("click");
      console.log(input.value.input.click());
    }

    return { input, click }
  }
})
</script>
<style scoped lang="less" >
.file {
  width: 100%;

  .upload-style {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &>* {
      margin: 0 20px;
    }
  }
}
</style>