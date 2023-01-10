<template>
  <m-button type="primary" size="medium">主要按钮</m-button>
  <m-button type="default" size="medium">默认按钮</m-button>

  <m-button type="danger" size="medium">警示按钮</m-button>
  <m-button type="text" size="medium">文字按钮</m-button>

  <m-button type="link" size="medium" >链接按钮</m-button>

  <m-button type="icon" icon="IconMeriActionAdd" size="medium">图标按钮</m-button>
  <m-button type="icon" icon-bg icon="IconMeriActionAdd" size="medium">图标按钮</m-button>
  <br />
  <br />
  <m-button type="text" > <IconMeriActionAdd style="margin-right: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd> 图标按钮</m-button>
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
