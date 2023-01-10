<template>
  <m-dropdown
    type="primary"
    :eventType="'click'"
    v-model:open="open"
    :items="items"
    >Click
  </m-dropdown>

  <p>当前open值:{{open}}</p>
</template>


<script lang="ts">
import { defineComponent, ref, Slot } from "vue";

export default defineComponent({
  setup() {
    const items = ref([
      {
        id: "1",
        name: "张三",
      },
      {
        id: "2",
        name: "李四",
      },
      {
        id: "3",
        name: "法外狂徒",
      },
    ]);

    const open = ref(false);

    return { items, open };
  },
});
</script>