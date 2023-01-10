<template>
  <m-button type="primary" size="medium" loading>主要按钮</m-button>
  <m-button type="default" size="medium" loading>默认按钮</m-button>
  <m-button type="icon" icon-bg icon="IconMeriActionAdd" size="medium" loading>图标按钮</m-button>
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
