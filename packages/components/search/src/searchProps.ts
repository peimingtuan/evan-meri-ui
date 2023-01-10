import { Flow } from './../../utils/types';
import { PropType } from 'vue'

export enum SearchType {
  REAL = 'real',
  ENTER = 'enter'
}

const searchProps = {
  // 默认值
  defaultValue: {
    type: String as PropType<string>,
    default: ''
  },
  immediate: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  width: {
    type: [Number,String] as PropType<string | number>
  },
  height: {
    type: [Number,String] as PropType<string | number>,
    default: ''
  },
  placeholder: {
    type: String as PropType<string>,
    default: '搜索'
  },
  border: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  defaultWidth: {
    type: [Number,String] as PropType<string | number>
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  type: {
    type: String as PropType<SearchType>,
    default: SearchType.REAL
  },
  placement: {
    type: String as PropType<Flow | undefined>,
    default: undefined
  },
  label: {
    type: String as PropType<string>,
    default: 'label'
  },
  highLightField: {
    type: Array as PropType<string[]>,
    default: ['label']
  },
  fetchSuggestions: {
    type: Function
  },
  triggerOnFocus: {
    type: Boolean as PropType<boolean>,
    default: false
  }
} as const

export default searchProps