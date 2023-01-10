<template>
  <div class="file">
    <div class="upload-style">
      <m-fileUpload ref="input" :multiple="true" :limit="9" :fileListStyle="fileListStyle"
        :fileItemStyle="fileItemStyle" action='https://gapmdev.persagy.com/api/upload/fms'></m-fileUpload>
    </div>
  </div>
</template>
<script lang="ts">
import { CSSProperties, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const fileListStyle: CSSProperties = {
      "flex-direction": "row",
      "flex-wrap": "wrap"
    }

    const fileItemStyle: CSSProperties = {
      "max-width": "300px",
      "min-width": "200px",
      "margin-right": "20px",
      "height":"50px"
    }

    return { fileListStyle, fileItemStyle }
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