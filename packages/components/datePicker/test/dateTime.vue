<template>
  <div class="select">
    <section>
      <div>基础用法</div>
      <m-date-picker
          type="datetime"
          timeFormat="hms"
          v-model="selectValue1"
          @change="handleChange"
      ></m-date-picker>
    </section>
    <section>
      <div>带默认值</div>
      <m-date-picker
          type="datetime"
          timeFormat="hm"
          v-model="selectValue2"
          @change="handleChange"
      ></m-date-picker>
    </section>
    <section>
      <div>时间格式类型</div>
      <m-date-picker
          type="datetime"
          timeFormat="h"
          @change="handleChange"
      ></m-date-picker>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  data() {
    return {
      selectValue1: '',
      selectValue2: '2021.09.22 10:30',
    }
  },
  methods: {
    handleChange(value) {
      console.log("时间变更", value);
    }
  }
});
</script>

<style
    lang="less"
    scoped
>
.select {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-m);

  & > section {
    margin-right: 20px;

    > div {
      margin-bottom: 5px;
    }
  }
}
</style>