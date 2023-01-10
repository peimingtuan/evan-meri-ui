<template>
  <m-input-number v-model="dataVal" placeholder="输入数字" width="200px"></m-input-number>
  <m-input-number v-model="dataVal" placeholder="输入数字" width="350px"></m-input-number>
  <m-input-number v-model="dataVal" placeholder="输入数字" width="100%"></m-input-number>
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