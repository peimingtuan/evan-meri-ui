<template>
  <div style="display: flex;width: 100%;justify-content: space-around;">
    <m-search
      @change="handleChange"
      width="300"
    />
    <m-search
      width="100"
      height="22"
      type="enter"
      :border="false"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
const handleChange = val => {
	console.log(val)
}
</script>
