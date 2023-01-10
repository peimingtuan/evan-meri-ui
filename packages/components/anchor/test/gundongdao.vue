<template>
  <div>
    <m-anchor :sections="sections" width="200px" ref="MAnchor"> </m-anchor>
    <m-button @click="scrollTo('基础用法')" style="margin-right:20px">滚动到基础用法</m-button>
    
    <m-button @click="scrollTo('大小层级设置')">滚动到大小层级设置</m-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, toRefs } from "vue";

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
    const MAnchor = ref<any>();
    return {
      ...toRefs(state),
      scrollTo: (id: string) => {
        
        MAnchor.value.scrollTo(id);
      },
      MAnchor
    };
  },
});
</script>
