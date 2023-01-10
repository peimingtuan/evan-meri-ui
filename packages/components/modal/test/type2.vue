<template>
  <div>
    <m-modal type='default'  v-model:visible='show'  :title="'我是一个小弹窗'" @close='close' :width="550">
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
        <m-button type="default" @click.stop='closeModal'>close</m-button>
        <m-button type="primary">primary</m-button>
      </template>
    </m-modal>
	 <m-modal type='default'  v-model:visible='shows'  :title="'我是一个小弹窗'" @close='close' :topY='"20%"'>
      <template #content>
        <div>
          高度固定的话这里可以设置，top值，可以百分比，也可以固定值。
        </div>
      </template>
      <template #footer>
        <m-button type="default" @click.stop='closeModals'>取消</m-button>
        <m-button type="primary"  @click.stop='closeModals'>确定</m-button>
      </template>
    </m-modal>
    <m-button type="primary" @click="openModal"  style="margin-right:20px">打开高度不固定弹窗</m-button>
	<m-button type="primary" @click="openModals" style="margin-right:20px">打开高度固定弹窗</m-button>
  </div>
</template>


<script lang="ts">
import { log } from 'console'
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const show = ref(false)
		const shows = ref(false)
		const closeModal = () => {
			console.log('nimama')
			show.value = false
		}
		const closeModals = () => {
			console.log('nimama')
			shows.value = false
		}
		const close = () => {
			show.value = false
		}
		const openModal = () => {
			console.log('dddddd')
			show.value = true
		}
		const openModals = () => {
			console.log('dddddd')
			shows.value = true
		}
		return { show, openModals,closeModals,shows,closeModal, close, openModal }
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
