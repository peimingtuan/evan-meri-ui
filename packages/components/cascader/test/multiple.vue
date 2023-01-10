<template>
  <div class="select">
    <section>
      <div>基础多选tempalte风格</div>
      <m-cascader
          multiple
          showSelectCount
          :options="list"
      ></m-cascader>
    </section>
    <section>
      <div>回显tag模式(可自定义标签宽度)</div>
      <m-cascader
          :options="list1"
          multiple
          clearable
          :showSelectCount="false"
          :maxTagWidth="90"
      >
      </m-cascader>
    </section>
    <section>
      <div>带默认选中项</div>
      <m-cascader
          v-model="selectValue2"
          :options="list2"
          multiple
          clearable
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

const selectValue = ref([])
const selectValue1 = ref([])
const selectValue2 = ref(['1-1-1','1-3'])
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
const list1 = ref([
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
const list2 = ref([
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
