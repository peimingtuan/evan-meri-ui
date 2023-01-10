<template>
	<div class="file">
	  <div class="upload-style">
		<m-image-upload action='https://gapmdev.persagy.com/api/upload/fms' ></m-image-upload>
		<m-image-upload action='https://gapmdev.persagy.com/api/upload/fms' :disabled="true"></m-image-upload>
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
	}
  }
  </style>