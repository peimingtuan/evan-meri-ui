<template>
  <m-input v-model="value" prefix-icon="IconMeriActionSearch">
  </m-input>
  <m-input v-model="value" suffixIcon="IconMeriActionSearch">
  </m-input>

  <m-input v-model="value" :clear="true">
    <template #prefix>
      <m-button style="margin-left: 8px" type="primary" size="small">主要按钮</m-button>
    </template>
  </m-input>
  <m-input v-model="value" :clear="true">
    <template #suffix>
      <m-button  style="margin-right: 8px" type="primary" size="small">主要按钮</m-button>
    </template>
  </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";
import { IconMeriActionAdd,IconMeriActionSearch  } from 'meri-icon'
import "meri-icon/lib/style.css"
export default defineComponent({
  components:{IconMeriActionAdd,IconMeriActionSearch},
  setup() {
    const list = ref([
      {
        key: 1,
        label: 11,
      },
      {
        key: 1,
        label: 22,
      },
      {
        key: 1,
        label: 33,
      },
    ]);
    const value = ref("");
    return { value ,list};
  },
});
</script>


<style lang="less" scoped>
.icon {
  cursor: pointer;
}
</style>
