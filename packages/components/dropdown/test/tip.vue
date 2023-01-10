<template>
  <m-dropdown :options="options" text="Dropdown List" trigger="click"> </m-dropdown>
  <div style="width: 250px" class="m-ellipsis" v-ellipsis>
    {{ text }}
  </div>
  <m-button @click="add">增加字数</m-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: '他知',
          key: 'marina bay sands'
        },
        {
          label: '流年',
          key: "brown's hotel, london"
        },
        {
          label: '袭月袭月袭月袭月袭月袭月袭月袭月袭月袭月袭月袭月袭月袭月',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '只有',
          key: 'the beverly hills hotel, los angeles'
        },
        {
          label: '他知他知他知他知他知他知他知他知他知他知他知他知他知他知他知他知他知他知',
          key: 'marina bay sands2'
        },
        {
          label: '流年',
          key: "brown's hotel, london2"
        }
      ],
      text: '长路漫漫,惟剑做伴。'
    });
    const add = () => {
      state.text += '且随疾风前行,身后亦需留心。';
    };
    return { ...toRefs(state), add };
  }
});
</script>
