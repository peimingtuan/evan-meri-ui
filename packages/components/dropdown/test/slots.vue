<template>
  <div>
    <p>每项都可自定义</p>
    <m-dropdown :options="options" text="Dropdown List">
      <template #keyOne="data">
        <m-tag size="large" color="#982871"> {{ data.label }} </m-tag>
      </template>
      <template #keyFour="data">
        <m-tag size="large" color="#215DD9"> {{ data.label }} </m-tag>
      </template>
    </m-dropdown>
  </div>
  <div>
    <p>自定义空数据</p>
    <m-dropdown :options="options1" text="Dropdown List" showSearch trigger="click">
      <template #empty>
        <div class="empty"><m-tag size="large" color="#215DD9" bg-color="#D9EBFF"> 暂无数据哦 </m-tag></div>
      </template>
    </m-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: '他知我心',
          key: '1',
          slotName: 'keyOne'
        },
        {
          label: '流年染指心痛',
          key: '2'
        },
        {
          label: '袭月',
          key: '3'
        },
        {
          label: '只有自己强大，才不会被别人践踏。',
          key: '4',
          slotName: 'keyFour'
        }
      ],
      options1: [
        {
          label: '他知我心',
          key: '1'
        },
        {
          label: '流年染指心痛',
          key: '2'
        },
        {
          label: '袭月',
          key: '3'
        },
        {
          label: '只有自己强大，才不会被别人践踏。',
          key: '4'
        }
      ]
    });
    return { ...toRefs(state) };
  }
});
</script>
<style lang="less" scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>
