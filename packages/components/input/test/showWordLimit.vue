<template>
 <section>
   字数统计 maxlength 为对象时字数超出后仍可输入，且有文字提示；为number 类型时超出后不可输入
 </section>
 <ol>
   <li>
     短文本：超过限制字数允许输入
     <m-input @keyup.enter="hh"  :clearable="true" v-model="value" :maxlength="{length:10,errorText:'文字超出了'}" show-word-limit> </m-input>
   </li>
   <li>
     短文本：超过限制字数不允许输入
     <m-input  :clearable="true" v-model="value1" :maxlength="10" show-word-limit> </m-input>
   </li>
   <li>
     短文本：超过限制字数允许输入，且不显示字数限制
     <m-input  :clearable="true" v-model="value1" :maxlength="10" > </m-input>
   </li>
   <li>
     <div>长文本：超过限制字数不允许输入</div>
     <m-input
               :type="'textarea'"
               placeholder="请输ss入"
               :maxlength="10"
               v-model="value2"
               :width="100" :height="100" show-word-limit
     >
     </m-input>
   </li>
   <li>
     <div>长文本：超过限制字数允许输入</div>
     <m-input
               :type="'textarea'"
               placeholder="请输ss入"
               :maxlength="{length:10,errorText:'最多输入10个字符'}"
               v-model="value3"
               :width="100" :height="100" show-word-limit
     >
     </m-input>
   </li>
 </ol>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    let hh=()=>{
      console.log(1);
    }
    return { value ,value1,value2,value3,hh};
  },
});
</script>
<style scoped>
  li{
    margin-bottom: 20px;
  }
</style>
