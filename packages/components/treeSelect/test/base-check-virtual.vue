<template>
  <m-tree-select
    :data="data"
    v-model="selected"
		multiple
		virtual
		defaultExpandAll
		menuSize="auto"
  >

  </m-tree-select>
</template>


<script lang="ts">
import { defineComponent, ref,watch,Ref } from "vue";
import {TreeNode} from '../../tree/src/TreeProps'
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
    const selected = ref([])
    watch(selected,()=>{
      console.log(selected.value)
    })
    return { data,selected };
  },
});
</script>