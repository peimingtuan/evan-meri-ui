<template>
  <m-input type="password" show-password :prefix-icon="'IconMeriActionLock'"  :height="40"  v-model="value" >
  </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";
import { IconMeriActionAdd,IconMeriActionSearch  } from 'meri-icon'
import "meri-icon/lib/style.css"
export default defineComponent({
  components:{IconMeriActionAdd,IconMeriActionSearch},
  setup() {
    const value = ref("");
    return { value };
  },
});
</script>


<style lang="less" scoped>
.icon {
  cursor: pointer;
}
</style>
