<template>
  <div class="file">
    当前限制的文件的大小为 40 * 1024 B = 40KB,只有体积为40KB以下的组件才能进行上传
    <div class="upload-style">
      <m-fileUpload :fileSize="40960" :limit="3" :multiple='true' action='https://gapmdev.persagy.com/api/upload/fms'></m-fileUpload>
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