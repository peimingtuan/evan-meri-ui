<template>
<!-- /operator 是两侧有button的按钮 operatorIcon两侧只有图标的类型  rightButton 是右侧带单位输入框 -->
  <m-input-number v-model="dataVal" placeholder="输入数字" controls="operator" :step="2"></m-input-number>
  <m-input-number v-model="dataVal" placeholder="输入数字" controls="operatorIcon" :step="2"></m-input-number>
  <m-input-number textAlign='left' placeholder="输入数字" controls="rightButton" :step="6">
     <template #suffix>
        元
      </template>
  </m-input-number>
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
