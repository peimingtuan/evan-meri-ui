<template>
  <m-switch
      v-model="status1.value"
      :loading="status1.loading"
      :before-change="beforeChange1"
  ></m-switch>
  <m-switch
      v-model="status2.value"
      :loading="status2.loading"
      :before-change="beforeChange2"
  ></m-switch>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";

export default defineComponent({
  setup() {
// loading - 切换成功
    const status1 = reactive({
      value: 'uncheck',
      loading: false,
    })

    const beforeChange1 = () => {
      status1.loading = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          status1.loading = false
          console.log("切换成功");
          return resolve(true)
        }, 2000)
      })
    }

// loading - 切换失败
    const status2 = reactive({
      value: 'uncheck',
      loading: false,
    })
    const beforeChange2 = () => {
      status2.loading = true;
      return new Promise((_, reject) => {
        setTimeout(() => {
          status2.loading = false
          console.log("切换失败");
          return reject(new Error('Error'))
        }, 2000)
      })
    }

    return { status1,status2,beforeChange1,beforeChange2 };
  }
});
</script>