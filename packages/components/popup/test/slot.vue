<template>
  <m-dropdown type="primary" :items="items"
    >primary
    <template v-slot:content>Hello Slot</template>
  </m-dropdown>
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

    return { items };
  },
});
</script>
