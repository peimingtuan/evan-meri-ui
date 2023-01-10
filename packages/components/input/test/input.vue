<template>
  <m-input  :clearable="true" v-model="value" @clear="clear"> </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    let clear = ()=>{
      console.log('hhh');
    }
    return { value ,clear};
  },
});
</script>
