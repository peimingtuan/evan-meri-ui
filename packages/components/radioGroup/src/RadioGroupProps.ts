import { PropType } from 'vue'
import { Item } from '../../utils/types'

const RadioGroupProps = {

  // 当前的选项
  items: {
      type: Array as PropType<Item[]>,
      default: () => []
  },
  // 当前选中的值
  modelValue: {
      type: String as PropType<string>,
      default: null
  }
} as const

// 类型
export enum State {
  // 默认
  checked = "checked",
  // 主要
  uncheck = "uncheck",
}

export default RadioGroupProps