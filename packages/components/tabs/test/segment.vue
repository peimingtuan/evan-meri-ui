<template>
  <m-tabs :data="items" type="segment" v-model="on" size="large"></m-tabs>
  <div style="width: 100%"/>
  <m-tabs :data="items" type="segment" v-model="on" size="medium"></m-tabs>
  <div style="width: 100%"/>
  <m-tabs :data="items" type="segment" v-model="on" size="small"></m-tabs>
  <div style="width: 100%"/>
  <m-tabs :data="items" :item-width="150" type="segment" v-model="on" size="large"></m-tabs>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {

    const items = ref<any[]>([
      {
        id: "1",
        name: `标签一`,
        disabled: false,
      },
      {
        id: "2",
        name: `标签二`,
        disabled: true,
      },
      {
        id: "3",
        name: `选项二二二二`,
        disabled: false,
      },
      {
        id: "4",
        name: `标签四`,
        disabled: false,
        tip: 4,
      },
      {
        id: "5",
        name: `标签五`,
      },
    ]);

    const on = ref("1");


    return {items, on};
  },
});
</script>
