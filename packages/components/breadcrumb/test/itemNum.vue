<template>
  <m-breadcrumb  @change="change" :data="data"  :itemNum="2"/>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const data = reactive([
  {
    name: "全部",
    url: "/"
  },
  {
    name: "强电专业",
    url: "/"
  },
  {
    name: "变配电系统",
    url: "/"
  },
  {
    name: "配电箱",
    url: "/"
  }
]);


const change = (item: object, i: number) => {
  console.log(item, i);
}

</script>
