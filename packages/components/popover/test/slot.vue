<template>
	<div style="width: 100%" class="one">
		<div style="width: 200%" class="two">
			<m-popover content="我是提示文字" trigger="click" width="1000px" :shiftOffset="2" placement="top">
				<template #content>
					<m-tag color="#871951">我是提示文字</m-tag><br />
					<m-tag color="#8719aa">我是提示文字</m-tag><br />
					<m-tag color="#6611aa">我是提示文字</m-tag><br />
					<m-tag color="#cccccc">我是提示文字</m-tag><br />
					<m-tag color="#fffaaa">我是提示文字</m-tag><br />
					<m-tag color="#ffaaaa">我是提示文字</m-tag>
				</template>
				<m-button>tags</m-button>
			</m-popover>
			<m-popover content="我是提示文字" trigger="click" placement="right" :shiftOffset="2">
				<template #content>
					<table>
						<tr>
							<td>姓名</td>
							<td>年级</td>
							<td>班级</td>
						</tr>
						<tr>
							<td>王五</td>
							<td>18</td>
							<td>一班</td>
						</tr>
						<tr>
							<td>王五五</td>
							<td>28</td>
							<td>二班</td>
						</tr>
						<tr>
							<td>王五五五</td>
							<td>38</td>
							<td>三班</td>
						</tr>
					</table>
					<table>
						<tr>
							<td>姓名</td>
							<td>年级</td>
							<td>班级</td>
						</tr>
						<tr>
							<td>王五</td>
							<td>18</td>
							<td>一班</td>
						</tr>
						<tr>
							<td>王五五</td>
							<td>28</td>
							<td>二班</td>
						</tr>
						<tr>
							<td>王五五五</td>
							<td>38</td>
							<td>三班</td>
						</tr>
					</table>
					<table>
						<tr>
							<td>姓名</td>
							<td>年级</td>
							<td>班级</td>
						</tr>
						<tr>
							<td>王五</td>
							<td>18</td>
							<td>一班</td>
						</tr>
						<tr>
							<td>王五五</td>
							<td>28</td>
							<td>二班</td>
						</tr>
						<tr>
							<td>王五五五</td>
							<td>38</td>
							<td>三班</td>
						</tr>
					</table>
					<table>
						<tr>
							<td>姓名</td>
							<td>年级</td>
							<td>班级</td>
						</tr>
						<tr>
							<td>王五</td>
							<td>18</td>
							<td>一班</td>
						</tr>
						<tr>
							<td>王五五</td>
							<td>28</td>
							<td>二班</td>
						</tr>
						<tr>
							<td>王五五五</td>
							<td>38</td>
							<td>三班</td>
						</tr>
					</table>
				</template>
				<m-button style="margin-left: 50px">table</m-button>
			</m-popover>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const isOpen = ref<boolean>(false)
		return { isOpen }
	}
})
</script>
<style lang="less" scoped>
.one {
	overflow-y: auto;
	.two {
		display: flex;
		margin-left: 70%;
	}
}
</style>
