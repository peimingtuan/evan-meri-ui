<template>
  <div class="file">
    <div class="upload-style">
      <m-image-upload :limit="3" :multiple='true' action='https://gapmdev.persagy.com/api/upload/fms'></m-image-upload>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

    return {}
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