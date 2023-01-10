<template>
  <m-logo :count="0">
    <m-avatar type="text" color="#fff" bgColor="#0091ff" size="medium">1</m-avatar>
  </m-logo>

  <m-logo :show="false" type="num" :count="10">
    <m-avatar type="text" color="#fff" bgColor="#0091ff">挺</m-avatar>
  </m-logo>
  <m-logo :show="true" type="dot" :count="1">
    <m-avatar type="text" color="#fff" bgColor="#0091ff">挺</m-avatar>
  </m-logo>
   <m-logo type="dot" :count="1">
    <m-avatar type="text" color="#fff" bgColor="#0091ff">挺</m-avatar>
  </m-logo>
  <m-logo :count="11">
    <m-avatar type="text" color="#fff" bgColor="#0091ff">挺</m-avatar>
  </m-logo>
  <m-logo :count="100">
    <m-avatar type="text" color="#fff" bgColor="#0091ff">挺</m-avatar>
  </m-logo>

  <m-logo :count="0">
    <m-avatar radius="50%" size="small" src="/meri-plus/avatar-default.png"></m-avatar>
  </m-logo>
  <m-logo :count="1">
    <m-avatar radius="50%" size="medium" src="/meri-plus/avatar-default.png"></m-avatar>
  </m-logo>
  <m-logo :count="11">
    <m-avatar radius="50%" size="large" src="/meri-plus/avatar-default.png"></m-avatar>
  </m-logo>
  <m-logo :count="100">
    <m-avatar radius="50%" :size="56" src="/meri-plus/avatar-default.png"></m-avatar>
  </m-logo>

  <m-logo :count="100">
    <m-button type="primary" size="medium">默认按钮</m-button>
  </m-logo>
  <m-logo :count="100" type="dot">
    <m-button type="primary" size="medium">默认按钮</m-button>
  </m-logo>
</template>
