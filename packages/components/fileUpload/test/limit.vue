<template>
  <div class="file">
    <div class="upload-style">
      <m-fileUpload :limit="3" :multiple='true' action='https://gapmdev.persagy.com/api/upload/fms'></m-fileUpload>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const change = (file: any) => {
      console.log(file, 'file')
    }
    const changList = (arrs: Array<string>) => {
      console.log(arrs, 'urllist')
    }
    return { changList, change }
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