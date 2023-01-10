<template>
  <p> 普通文本框高度默认为32：</p>
  <m-input  :clearable="true" v-model="value"> </m-input>
  <br />
  <p> 普通文本框高度可通过height设置高度：</p>
  <m-input  :clearable="true" v-model="value" :height="40"> </m-input>
  <br />
  <p> 密码输（验证码）入框默认高度为40：</p>
  <m-input type="password" show-password :prefix-icon="'IconMeriActionLock'"  v-model="value" >
  </m-input>
  <br />
  <p> 密码输（验证码）入框通过height设置高度：</p>
  <m-input type="password" show-password :prefix-icon="'IconMeriActionLock'"  :height="42" v-model="value" >
  </m-input>
  <br />
  <p> 多行文本输入框可通过height设置最小高度且优先级高于rows：</p>
  <m-input
            :type="'textarea'"
            placeholder="请输ss入"
            :maxlength="50"
            v-model="value"   :height="200"
  >
  </m-input>

</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    return { value };
  },
});
</script>
