<template>
  <div style="display: flex;width: 100%;justify-content: space-around;">
    <m-search
      @change="handleChange"
      immediate
      default-value="MeriDesign"
    > </m-search>
    <m-search
      @change="handleChange"
      type="enter"
      :border="false"
    > </m-search>
  </div>
</template>



<script setup>
const handleChange = val => {
	console.log(val)
}
</script>
