<template>
  <div class="select">
    <section>
      <div>基础用法</div>
      <m-date-picker
          type="daterange"
          v-model="selectValue1"
          @change="handleChange"
      ></m-date-picker>
    </section>
    <!--<section>-->
    <!--  <div>带默认值</div>-->
    <!--  <m-date-picker-->
    <!--      type="daterange"-->
    <!--      v-model="selectValue2"-->
    <!--      @change="handleChange"-->
    <!--  ></m-date-picker>-->
    <!--</section>-->
    <section>
      <div>带默认值</div>
      <m-date-picker
          type="daterange"
          v-model="selectValue3"
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
      selectValue2: '2022.09.22-2022.09.30',
      selectValue3: '2021.09.22-2022.10.30',
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