<template>
  <div><m-dropdown :options="options" text="Dropdown List"> </m-dropdown></div>
  <div>
    <m-dropdown :options="options" text="Dropdown List" type="button" trigger="click" @change="change" placement="bottom-end"> </m-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { OptionType } from '../src/props';
import { $Message } from '../../message';
export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: '他知，大海无量。',
          key: 'marina bay sands'
        },
        {
          label: '流年',
          key: "brown's hotel, london"
        },
        {
          label: '袭月',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '只有',
          key: 'the beverly hills hotel, los angeles'
        },
        {
          label: '他知，大海无量',
          key: 'marina bay sands2'
        },
        {
          label: '流年',
          key: "brown's hotel, london2"
        },
        {
          label: '袭月',
          key: 'atlantis nahamas, nassau2'
        },
        {
          label: '只有',
          key: 'the beverly hills hotel, los angeles2'
        },
        {
          label: '他知，大海无量',
          key: 'marina bay sands3'
        },
        {
          label: '流年',
          key: "brown's hotel, london23"
        },
        {
          label: '袭月',
          key: 'atlantis nahamas, nassau23'
        },
        {
          label: '只有',
          key: 'the beverly hills hotel, los angeles23'
        },
        {
          label: '他知，大海无量',
          key: 'marina bay sands24'
        },
        {
          label: '流年',
          key: "brown's hotel, london24"
        },
        {
          label: '袭月',
          key: 'atlantis nahamas, nassau24'
        },
        {
          label: '只有',
          key: 'the beverly hills hotel, los angeles24'
        }
      ]
    });
    return {
      ...toRefs(state),
      change(data: string, obj: OptionType) {
        console.log(data);
        $Message.success({ title: obj.label });
      }
    };
  }
});
</script>
