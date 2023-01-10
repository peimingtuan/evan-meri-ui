<template>
    <div class="file">
        <div class="upload-style">
            <m-fileUpload :type="'drop'" :multiple='true' action='https://gapmdev.persagy.com/api/upload/fms'>
            </m-fileUpload>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

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
    }
}
</style>