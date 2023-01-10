<template>
  <div>
    <m-modal type='full'  v-model:visible='show' :title="'我是一个小弹窗'" @close='close'>
   
	  <template #content>
		  <div style="height:99px">
			  白马带著她一步步的回到中原。白马已经老了，只能慢慢的走，但终是能回到中原的。江南有杨柳、桃花，有燕子、金鱼……汉人中有的是英俊勇武的少年，倜傥潇洒的少年……但这个美丽的姑娘就像古高昌国人那样固执：那都是很好很好的，可是我偏不喜欢 
		  </div>
	  </template>
      <template #footer>
        <m-button type="default" @click='closeModal'>close</m-button>
        <m-button type="primary">primary</m-button>
      </template>
    </m-modal>
	
    <m-modal type='full'  v-model:visible='shows' :title="'我是一个小弹窗'" @close='closes'>
   
	  <template #content>
		  <div style="">
			  白马带著她一步步的回到中原。白马已经老了，只能慢慢的走，但终是能回到中原的。江南有杨柳、桃花，有燕子、金鱼……汉人中有的是英俊勇武的少年，倜傥潇洒的少年……但这个美丽的姑娘就像古高昌国人那样固执：那都是很好很好的，可是我偏不喜欢 
		  </div>
	  </template>
       <template #contentFooter>
		   <div style="text-align:right;margin-top:20px">
  <m-button type="default" @click='closeModals' style="margin-right:20px">取消</m-button>
        <m-button type="primary" style="margin-right:20px">关闭</m-button>
		   </div>
      
      </template>
    </m-modal>
	 <m-modal type='full'  v-model:visible='showl' :title="'我是一个小弹窗'" @close='closes'>
   
	  <template #content>
		  <div style="">
			  白马带著她一步步的回到中原。白马已经老了，只能慢慢的走，但终是能回到中原的。江南有杨柳、桃花，有燕子、金鱼……汉人中有的是英俊勇武的少年，倜傥潇洒的少年……但这个美丽的姑娘就像古高昌国人那样固执：那都是很好很好的，可是我偏不喜欢 
		  </div>
	  </template>
      
    </m-modal>
      <m-button type="primary" @click="openModal" style="margin-right:20px">打开内容撑满有底部弹窗</m-button>
	    <m-button type="primary" @click="openModals" style="margin-right:20px">打开内容没撑满弹窗</m-button>
		 <m-button type="primary" @click="openModall">打开没有底部弹窗</m-button>
  </div>
</template>


<script lang="ts">
import { log } from 'console'
import { defineComponent, ref } from 'vue'
import MButton from '../../button/index'
export default defineComponent({
  	components: { MButton },
	setup() {
		const show=ref(false)
		const closeModal=()=>{
			console.log('nimama')
			show.value=false
		}
		const close=()=>{
			show.value=false
		}
    const openModal = () => {
			console.log('dddddd')
			show.value = true
		}
		const shows=ref(false)
		const closeModals=()=>{
			console.log('nimama')
			shows.value=false
		}
		const closes=()=>{
			shows.value=false
		}
    const openModals = () => {
			console.log('dddddd')
			shows.value = true
		}
		const showl=ref(false)
		const closeModall=()=>{
			console.log('nimama')
			showl.value=false
		}
		const closel=()=>{
			shows.value=false
		}
    const openModall = () => {
			console.log('dddddd')
			showl.value = true
		}
		return {show,closeModal,close,openModal,shows,closeModals,closes,openModals,showl,closeModall,closel,openModall}
	}
})
</script>
<style>
html,
body,
#app {
	height: 100%;
	width: 100%;
	margin: 0;
}
* {
	box-sizing: border-box;
}
.aaa {
	width: 200px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
/* .ssssss {
  height: 100%;
  width: 100%;
  display: flex;
} */
.left {
	flex: 1;
	overflow: auto;
	margin-right: 20px;
}
.left > div {
	height: 200px;
}
.left > div:nth-of-type(even) {
	background-color: bisque;
}
.right {
	flex: 0 0 230px;
}
</style>
