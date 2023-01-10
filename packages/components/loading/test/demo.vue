<template>


  <m-button @click="bar(true)">有进度条</m-button>
  <m-button @click="bar(false)">无进度条</m-button>
  <m-button @click="fail()">加载失败</m-button>


  <div style="width: 100%"> 效果预览</div>
  <div class="test">
    <div class="t1">
    </div>


    <div class="t3">
    </div>

  </div>
</template>


<script lang="ts">
import {defineComponent, onMounted} from "vue";
import loading from "../index";

export default defineComponent({
  setup() {

    loading.service({
      target: ".t1",
      fullscreen: false,
      progressBar: true,
      duration: 300,
    });


    const t3 = loading.service({
      target: ".t3",
      duration: 2,
      fullscreen: false,
      loadButton: () => {
        t3.reload();
      }
    });


    function bar(b: boolean) {
      const l = loading.service({
        progressBar: b,
      })

      setTimeout(() => {
        l.destroy();
      }, 1000)
    }

    function fail() {
      const l = loading.service({
        background: "rgba(255, 255, 255, 0.8)",
        duration: 1,
        loadButton: () => {
          // l.reload();

          l.destroy();
        }
      })
    }

    return {
      bar,
      fail
    }

  },
});
</script>

<style lang="less" scoped>
.test {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 48%;
    height: 300px;
    border: 1px solid var(--gray-300);
    overflow: hidden;
    margin: 10px;
    border-radius: 5px;
  }
}
</style>
