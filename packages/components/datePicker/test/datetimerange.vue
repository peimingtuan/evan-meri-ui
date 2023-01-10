<template>
  <div class="select">
    <section>
      <div>基础用法</div>
      <m-date-picker
          :width="360"
          timeFormat="hm"
          type="datetimerange"
          v-model="selectValue1"
          @change="handleChange"
      ></m-date-picker>
    </section>
    <section>
      <div>带默认值</div>
      <m-date-picker
          :width="360"
          type="datetimerange"
          v-model="selectValue2"
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
      selectValue2: '2021.09.22 00:01:30-2021.10.01 10:11:12',
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