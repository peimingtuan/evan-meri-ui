<template>
  <m-button type="primary" size="medium" width="200">主主要按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按钮要按钮</m-button>

  <m-button type="text"  width="200" size="medium">文字按钮文字按钮文字按钮文字按钮文字按钮文字按钮文字按钮</m-button>

  <m-button type="link" size="medium"  width="200" >链接按钮链接按钮链接按钮链接按钮链接按钮链接按钮</m-button>
  <br />
  <br />
  <m-button type="text" size="large"  width="200"> <IconMeriActionAdd style="margin-right: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd> 图标按钮图标按钮图标按钮图标按钮</m-button>
  <br />
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { IconMeriActionAdd  } from 'meri-icon'
  import "meri-icon/lib/style.css"
  export default defineComponent({
    components:{IconMeriActionAdd },
    setup() {
    },
  });
</script>
