<template>
  <m-radio-group v-model="radio">
    <m-radio label="选项1">选项1</m-radio>
    <m-radio label="选项2">选项2</m-radio>
  </m-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Item } from "../../utils/types";

export default defineComponent({
  setup() {
    const items = ref<Item[]>([
      {
        id: "1",
        label: "苹果",
        disabled: false,
        checked: "uncheck",
      },
      {
        id: "1",
        label: "香蕉",
        disabled: false,
        checked: "uncheck",
      },
    ]);

    const radio = ref("选项1");

    return { items, radio };
  },
});
</script>