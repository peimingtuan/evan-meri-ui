<template>
  <m-input-number
    placeholder="输入数字"
    :errorText="dataVal > 10 ? '输入数字不能大于10' : ''"
    v-model="dataVal"
    controls="operator"
  ></m-input-number>
    <m-input-number
    placeholder="输入数字"
    :errorText="dataVal > 10 ? '输入数字不能大于10' : ''"
    v-model="dataVal"
    controls="operatorIcon"
  ></m-input-number>
    <m-input-number
    placeholder="输入数字"
    controls="rightButton"
    :errorText="dataVal > 10 ? '输入数字不能大于10' : ''"
    v-model="dataVal"
  >
        <template #suffix>
        元
      </template>
  </m-input-number>
</template>
<script>
export default {
  data() {
    return {
      dataVal: 12,
    };
  },
};
</script>
