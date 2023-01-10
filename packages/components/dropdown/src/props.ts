/*
 * @Author: Devin
 * @Date: 2022-06-28 17:38:09
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-02 16:58:43
 */
import { Placement } from '@floating-ui/dom';
import { PropType } from 'vue';
import { TriggerType } from '../../popover';
export interface OptionType {
  label: String;
  key: String;
  disabled?: Boolean;
  type?: 'divider';
  divider?: Boolean;
  slotName?: String;
}
export default {
  options: {
    type: Array as PropType<OptionType[]>,
    default: () => []
  },
  search: {
    type: [String, Number],
    default: ''
  },
  show: Function,
  close: Function,
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'hover'
  },
  type: {
    type: String as PropType<'text' | 'button'>,
    default: 'text'
  },
  text: String,
  emptyText: {
    type: String,
    default: '无数据'
  },
  showSearch: Boolean,
  showArrow: Boolean,
  mouseEnterDelay: {
    type: Number,
    default: 150
  },
  mouseLeaveDelay: {
    type: Number,
    default: 100
  },
  disabled: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 7
  },
  // 当前输入框的值
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start'
  }
};
