<template>
  <div class="main">
    <div class="fac">
      <m-popover content="我是提示文字" placement="top-start">
        <template #content>top-start</template>
        <m-button>top-start</m-button>
      </m-popover>
      <m-popover content="我是提示文字" placement="top">
        <template #content>top</template>
        <m-button>top</m-button>
      </m-popover>
      <m-popover content="我是提示文字" placement="top-end">
        <template #content>top-end</template>
        <m-button>top-end</m-button>
      </m-popover>
    </div>
    <div class="fab">
      <div class="fabcs">
        <m-popover content="我是提示文字" placement="left-start">
          <template #content>left-start<br />left-start</template>
          <m-button>left-start</m-button>
        </m-popover>
        <m-popover content="我是提示文字" placement="left">
          <template #content>left</template>
          <m-button>left</m-button>
        </m-popover>
        <m-popover content="我是提示文字" placement="left-end">
          <template #content>left-end<br />left-end</template>
          <m-button>left-end</m-button>
        </m-popover>
      </div>
      <div class="fabcd">
        <m-popover placement="right-start">
          <template #content>right-start<br />right-start</template>
          <m-button>right-start</m-button>
        </m-popover>
        <m-popover content="我是提示文字" placement="right">
          <template #content>right</template>
          <m-button>right</m-button>
        </m-popover>
        <m-popover content="我是提示文字" placement="right-end">
          <template #content>right-end<br />right-end</template>
          <m-button>right-end</m-button>
        </m-popover>
      </div>
    </div>
    <div class="fac">
      <m-popover placement="bottom-start">
        <template #content>bottom-start</template>
        <m-button>bottom-start</m-button>
      </m-popover>
      <m-popover placement="bottom">
        <template #content>bottom</template>
        <m-button>bottom</m-button>
      </m-popover>
      <m-popover placement="bottom-end">
        <template #content>bottom-end</template>
        <m-button>bottom-end</m-button>
      </m-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const isOpen = ref<boolean>(false);
    return { isOpen };
  }
});
</script>
<style lang="less" scoped>
.main {
  height: 300px;
  width: 100%;
}
.fac {
  display: flex;
  align-items: center;
  justify-content: center;
  .m-button + .m-button {
    margin-left: 12px;
  }
}
.fab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50%;
}
.fabcd {
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: space-around;
  flex-direction: column;
}
.fabcs {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
}
</style>
