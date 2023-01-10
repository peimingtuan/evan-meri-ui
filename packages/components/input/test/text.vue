<template>
  <m-input v-model="value">
    <template #prepend> http:// </template>
  </m-input>

  <m-input v-model="value">
    <template #append> .com </template>
  </m-input>

  <m-input v-model="value" >
    <template #prepend> http:// </template>
    <template #append> .com </template>
  </m-input>

  <m-input v-model="value" >
    <template #prepend>
      <m-dropdown type="text" :options="list" text="Dropdown"></m-dropdown>
    </template>
  </m-input>

  <m-input v-model="value">
    <template #append>
      <m-dropdown type="text" :options="list" text="Dropdown"></m-dropdown>
    </template>
  </m-input>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
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
    return { value,list };
  },
});
</script>


<style lang="less" scoped>
.icon {
  cursor: pointer;
}
</style>
