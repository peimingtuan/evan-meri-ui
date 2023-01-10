<!--
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: gaoming
 * @LastEditTime: 2022-07-19 17:31:29
-->
<template>
    <m-tree
      :data="data"
      ref="tree"
			virtual
			:height="300"
    >

    </m-tree>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, watch } from 'vue'
import {TreeNode} from '../src/TreeProps'
export default defineComponent({
	setup() {
		const data:Ref<TreeNode[]> = ref([])
		function dig(path = '0', level = 3) {
			const list: TreeNode[] = [];
			for (let i = 0; i < 10; i += 1) {
				const key = `${path}-${i}`;
				const treeNode: TreeNode[][number] = {
					name: key,
					id:key,
				};

				if (level > 0) {
					treeNode.children = dig(key, level - 1);
				}

				list.push(treeNode);
			}
			return list;
		}
		data.value =dig()
		return { data }
	}
})
</script>

<style lang="less" scoped>
</style>
