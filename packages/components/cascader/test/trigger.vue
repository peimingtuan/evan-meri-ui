<template>
  <div class="select">
    <section>
      <div>hover触发展开子集</div>
      <m-cascader
          v-model="selectValue"
          :options="list"
          caption="标签"
          trigger="hover"
          :clearable="false"
      >
      </m-cascader>
    </section>
  </div>
</template>

<script
    setup
    lang="ts"
>
import {ref} from 'vue'

const selectValue = ref()

const list = ref([
  {
    id: '1',
    name: '选项1',
    children: [
      {
        id: '1-1',
        name: '选项1-1',
        children: [
          {
            id: '1-1-1',
            name: '选项1-1-1'
          }
        ]
      },
      {
        id: '1-2',
        name: '选项1-2'
      },
      {
        id: '1-3',
        name: '选项1-3'
      }
    ]
  },
  {
    id: '2',
    name: '选项2',
    children: [
      {
        id: '2-1',
        name: '选项2-1'
      },
      {
        id: '2-2',
        name: '选项2-2'
      },
      {
        id: '2-3',
        name: '选项2-3'
      }
    ]
  },
  {
    id: '3',
    name: '选项3',
    children: [
      {
        id: '3-1',
        name: '选项3-1',
      },
      {
        id: '3-2',
        name: '选项3-2',
      },
      {
        id: '3-3',
        name: '选项3-3',
      }
    ]
  },
])
</script>

<style
    lang="less"
    scoped
>
.select {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-m);

  & > section {
    margin-right: 20px;

    > div {
      margin-bottom: 5px;
    }
  }
}
</style>
