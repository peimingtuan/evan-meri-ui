<template>
  <m-input-number v-model="dataVal" placeholder="输入数字" controls="operator" size='medium'></m-input-number>
  <m-input-number v-model="dataVal" placeholder="输入数字" controls="operator" size='large'></m-input-number>
</template>
<script>
export default {
  data() {
    return {
      dataVal: 10,
    };
  },
  methods:{
    blur(){
      console.log('211')
    }
  }
}
</script>

