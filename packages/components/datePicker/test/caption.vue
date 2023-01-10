<template>
  <div class="select">
    <section>
      <div>自定义提示语</div>
      <m-date-picker
          placeholder="请选择"
          v-model="selectValue1"
          @change="handleChange"
      ></m-date-picker>
    </section>
    <section>
      <div>自定义前缀标题</div>
      <m-date-picker
          caption="筛选时间："
          v-model="selectValue1"
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
      selectValue2: '2021.09.22',
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