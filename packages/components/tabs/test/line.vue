<template>
  <m-tabs :data="items" v-model="on" size="large"/>
  <div style="width: 100%"/>
  <m-tabs :data="items" v-model="on"></m-tabs>
  <div style="width: 100%"/>
  <m-tabs :data="items" :item-width="158" v-model="on" size="large"/>
</template>

<script lang="ts">
import {defineComponent, ref, h} from "vue";
import MLogo from "../../logo";

export default defineComponent({
  setup() {


    const items = ref<any[]>([
      {
        id: "1",
        name: `标签一1221`,
        disabled: false,
      },
      {
        id: "2",
        name: `标签二`,
        disabled: true,
      },
      {
        id: "3",
        name: `标签三`,
        disabled: false,
        renderSlot: {
          html: `<div>(<span style="color: red">23</span>/100)</div>`,
        }
      },
      {
        id: "4",
        name: `标签四`,
        disabled: false,
        tip: 4,
        renderSlot: {
          component: h(MLogo, {count: 10}),
          style: "margin: -2px 0px 4px 8px"
        },
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
