
<template>
  <div class="content">
    <m-modal type='info' v-model:visible='show' :title="'我是一个小弹窗'" :content='" This is a message. 弹窗最小高度144px，最大高度166px (该对话框仅用于删除)"'
      @close='close'>
    </m-modal>
    <m-modal type='info' v-model:visible='shows'  :content='"这个弹窗没有标题，只有内容。也可以没有有内容只有标题"'
      @close='close'>
      
    </m-modal>
	 <m-modal type='error' v-model:visible='showError'  :title="'默认的警告弹窗'" :content='"底部样式可以自定义，标题可以没有，只有内容"'
      @close='close'>
      
    </m-modal>
	<div>
    <m-button type="primary" @click="openModal">打开默认info弹窗</m-button>
	<m-button type="primary" @click="openModalError" style="margin-left:20px">打开默认error弹窗</m-button>
	<m-button type="primary" @click="openModals" style="margin-left:20px">二次弹窗没有标题，只有内容</m-button>
	</div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const show = ref(false)
		const shows = ref(false)
		const showError=ref(false)
		const openModalError=()=>{
			showError.value=true
		}
		const closeModal = () => {
			console.log('nimama')
			show.value = false
		}
		const closeModals = () => {
			console.log('nimama')
			shows.value = false
		}
		const close = () => {}
		const openModal = () => {
			console.log('dddddd')
			show.value = true
		}
		const openModals = () => {
			console.log('dddddd')
			shows.value = true
		}
		return { showError,openModalError,show, shows,openModals,closeModal,closeModals, close, openModal }
	}
})
</script>

<style lang="less" scoped>
html,
body,
#app,
.content {
	margin: 0;
	height: 100%;
	width: 100%;
}
.content {
	display: flex;
	.text {
		height: 100px;
		background-color: aqua;
	}
	.text1 {
		height: 1600px;
		background-color: #111;
	}
	.text2 {
		height: 100px;
		background-color: bisque;
	}
	.footers{
		padding: 20px;
		text-align: right;
	}
}
</style>
