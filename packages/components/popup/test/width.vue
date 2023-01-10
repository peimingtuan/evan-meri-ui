<template>
  <m-dropdown type="primary" :width="500" :height="400" :items="items"
    >primary
    <template v-slot:content>
      <div class="content">
          123123
      </div>
    </template>
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

<style lang="less" scoped>
.content{
  height: 100%;
  width: 100%;
  background: var(--blue-500);
}
</style>
