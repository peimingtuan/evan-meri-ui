<template>
  <m-dropdown type="primary" :items="items">primary</m-dropdown>
  <m-dropdown :items="items">default</m-dropdown>
  <m-dropdown :items="items" type="link">link</m-dropdown>
  <m-dropdown :items="items" type="text">text</m-dropdown>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";

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
