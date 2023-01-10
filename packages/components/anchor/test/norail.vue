<template>
  <m-anchor :sections="sections" width="200px" :showRail="false"> </m-anchor>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      sections: [
        {
					label: '基础用法测试超出隐藏tip显示',
					id: '基础用法',
				},
				{ label: '固定位置' },
				{ label: '大小层级设置' },
				{ label: '悬浮主题设置' },
				{ label: '显示背景' },
				{ label: '取消侧面的轨道' },
				{ label: '滚动到' }
      ],
    });
    return { ...toRefs(state) };
  },
});
</script>
