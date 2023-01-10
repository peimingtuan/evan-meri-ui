<template>
  <m-button type="icon" icon="IconMeriActionHelp" disabled size="large">图标按钮</m-button>
  <m-button type="icon" icon="IconMeriActionHelp" size="large">图标按钮</m-button>
  <m-button type="icon" icon="IconMeriActionHelp" size="medium">图标按钮</m-button>
  <m-button type="icon" icon="IconMeriActionHelp" size="small">图标按钮</m-button>
  <br />
  <br />
  <m-button type="icon" icon-bg icon="IconMeriActionHelp" :icon-size="30" disabled size="large">图标按钮</m-button>
  <m-button type="icon" icon-bg icon="IconMeriActionHelp" size="large">图标按钮</m-button>
  <m-button type="icon" icon-bg icon="IconMeriActionHelp" size="medium">图标按钮</m-button>
  <m-button type="icon" icon-bg icon="IconMeriActionHelp" size="small">图标按钮</m-button>
  <br />
  <br />
  <m-button type="text" disabled size="large"><IconMeriActionAdd style="margin-right: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd> 图标按钮</m-button>
  <m-button type="text" size="large"> <IconMeriActionAdd style="margin-right: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd> 图标按钮</m-button>
  <m-button type="text" size="medium"> <IconMeriActionAdd style="margin-right: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd> 图标按钮</m-button>
  <m-button type="text" size="small">图标按钮 <IconMeriActionAdd style="margin-left: 8px"  :size="12" :color="'#1B2129'" :hoverColor="'#1B2129'" ></IconMeriActionAdd></m-button>
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
