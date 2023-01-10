<template>

  <m-banner type="warn" closable='true' message='这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽' style="margin-bottom:10px" width='550'>
    <template #footer>
      <m-button type="primary" size="small" style="float:right;margin-top:8px">我是换行按钮</m-button>
    </template>
  </m-banner>
   <m-banner type="warn" message='这是常见的换行插槽这是常见的换行插槽这是常见的,换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽这是常见的换行插槽' style="margin-bottom:10px" width='550'>
    <template #footer>
      <m-button type="primary" size="small" style="float:right;margin:8px 10px 0 0;">我是换行按钮</m-button>
    </template>
  </m-banner>
  <m-banner  width='550' type="warn" closable='true' message='这是常见的不换行插槽' style="margin-bottom:10px">
    <template #line>
      <m-button type="primary" size="small" style="margin:-6px 10px -6px 50px;">不换行按钮</m-button>
    </template>
  </m-banner>
   <m-banner  width='550' type="warn" message='这是常见的不换行插槽这是常见的不换行插不换行插槽' style="margin-bottom:10px">
    <template #line>
      <m-button type="text" size="small" style="margin:-6px 10px -6px 50px;">不换行按钮</m-button>
    </template>
  </m-banner>
   <!-- <m-banner type="info" message='这是常见默认的横幅' style="margin-bottom:10px"  closable='true'>这是常见默认的横幅</m-banner>
  <m-banner type="error" message='这是错误类型的横幅' style="margin-bottom:10px"  closable='true'>这是错误类型的横幅</m-banner>
  <m-banner type="warn" message='这是警告类型的横幅' style="margin-bottom:10px"  closable='true'>这是警告类型的横幅</m-banner>
  <m-banner type="info" message='这是常见默认的横幅' style="margin-bottom:10px" >这是常见默认的横幅</m-banner>
  <m-banner type="error" message='这是错误类型的横幅' style="margin-bottom:10px" >这是错误类型的横幅</m-banner>
  <m-banner type="warn" message='这是警告类型的横幅' style="margin-bottom:10px" >这是警告类型的横幅</m-banner> -->
</template>