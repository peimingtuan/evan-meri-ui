
<template>
  <div class="content">
    <m-modal type='info' v-model:visible='shows' :title="'我是一个小弹窗'" :content='" This is a message. 弹窗最小高度144px，最大高度166px (该对话框仅用于删除)"'
      @close='close'>
       <template #footer>
        <div>
          <div class='footers'>
            <m-button @click="closeModals"  type="primary">关闭弹窗</m-button>
          </div>
        </div>
      </template>
    </m-modal>
   <m-modal type='default'  v-model:visible='show'  :title="'demo设置有esc按键关闭'" @close='close' :width="550">
      <template #content>
        <div>
          1、哥行哥有理 你行哥揍你
          2、你强归你强 我做我的王
          3、握不住的沙，不如扬了它
          4、社会路难走，有人也有狗
          5、天热脾气燥我不微笑你别闹
          6、百因必有果,漂亮妹妹属于我
          7、你可以说我坏，但你不是我的菜
          8、天热脾气爆，我不微笑，你别闹
          9、精神小伙路难走必须学会摇花手
          10、天热脾气爆，我不微笑你别闹!
          11、别爱我，没结果，除非花手摇过我
          12、只要小伙精神在，到哪都是实力派
          13、社会语录网上抄,小心钢棍身上飘
          14、做人不要太攀比,要比就比激光雨
          15、精神小伙路难走 必须学会摇花手
          16、精神小伙别趴下,村里大妈会笑话
          17、拜过把子发过誓,这顿咱先AA制
          18、辉煌一刻谁都有,别拿一刻当永久
          19、城南城北一条街，打听打听谁是爹
          20、万丈高楼平地起 辉煌还得靠自己
          21、抽烟只抽炫赫门，一生只爱一个人
          22、做人不要太攀比，要比就比激光雨
          23、拜过把子发过誓，这顿咱先AA制
          24、多年出征战蛮夷 人生如梦一盘棋
          25、交友别摆鸿门宴，社会玩的是排面
          26、得不到就是得不到，别总说你不想要
          27、都是第一次做人 我他妈凭什么让你
		   1、哥行哥有理 你行哥揍你
          2、你强归你强 我做我的王
          3、握不住的沙，不如扬了它
          4、社会路难走，有人也有狗
          5、天热脾气燥我不微笑你别闹
          6、百因必有果,漂亮妹妹属于我
          7、你可以说我坏，但你不是我的菜
          8、天热脾气爆，我不微笑，你别闹
          9、精神小伙路难走必须学会摇花手
          10、天热脾气爆，我不微笑你别闹!
          11、别爱我，没结果，除非花手摇过我
          12、只要小伙精神在，到哪都是实力派
          13、社会语录网上抄,小心钢棍身上飘
          14、做人不要太攀比,要比就比激光雨
          15、精神小伙路难走 必须学会摇花手
          16、精神小伙别趴下,村里大妈会笑话
          17、拜过把子发过誓,这顿咱先AA制
          18、辉煌一刻谁都有,别拿一刻当永久
          19、城南城北一条街，打听打听谁是爹
          20、万丈高楼平地起 辉煌还得靠自己
          21、抽烟只抽炫赫门，一生只爱一个人
          22、做人不要太攀比，要比就比激光雨
          23、拜过把子发过誓，这顿咱先AA制
          24、多年出征战蛮夷 人生如梦一盘棋
          25、交友别摆鸿门宴，社会玩的是排面
          26、得不到就是得不到，别总说你不想要
          27、都是第一次做人 我他妈凭什么让你
		    1、哥行哥有理 你行哥揍你
          2、你强归你强 我做我的王
          3、握不住的沙，不如扬了它
          4、社会路难走，有人也有狗
          5、天热脾气燥我不微笑你别闹
          6、百因必有果,漂亮妹妹属于我
          7、你可以说我坏，但你不是我的菜
          8、天热脾气爆，我不微笑，你别闹
          9、精神小伙路难走必须学会摇花手
          10、天热脾气爆，我不微笑你别闹!
          11、别爱我，没结果，除非花手摇过我
          12、只要小伙精神在，到哪都是实力派
          13、社会语录网上抄,小心钢棍身上飘
          14、做人不要太攀比,要比就比激光雨
          15、精神小伙路难走 必须学会摇花手
          16、精神小伙别趴下,村里大妈会笑话
          17、拜过把子发过誓,这顿咱先AA制
          18、辉煌一刻谁都有,别拿一刻当永久
          19、城南城北一条街，打听打听谁是爹
          20、万丈高楼平地起 辉煌还得靠自己
          21、抽烟只抽炫赫门，一生只爱一个人
          22、做人不要太攀比，要比就比激光雨
          23、拜过把子发过誓，这顿咱先AA制
          24、多年出征战蛮夷 人生如梦一盘棋
          25、交友别摆鸿门宴，社会玩的是排面
          26、得不到就是得不到，别总说你不想要
          27、都是第一次做人 我他妈凭什么让你
        </div>
      </template>
      <template #footer>
          
         <m-button @click="closeModal"  type="danger">关闭弹窗</m-button>
      </template>
    </m-modal>
	
	<div>
    <m-button type="primary" @click="openModals" style="margin-right:10px">打开二次弹窗类型的</m-button>
    <m-button type="primary" @click="openModal">打开普通类型的</m-button>

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
		padding: 24px 32px 20px;
		text-align: right;
	}
}
.deafult-button{
    margin-right: 10px;
    background: green;
    color: yellow;
    border-radius:2px ;
    padding: 10px;
}
</style>
