/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: zhangxueting
 * @LastEditTime: 2022-07-21 09:36:42
 * @Description: 头像组件
 */
import { defineComponent, h, PropType, StyleValue, inject } from 'vue'
import { Disabled } from '../../utils/types'
import { State } from './RadioProps'

const CheckboxProps = {
  // 禁用
  disabled: {
    type: Boolean as PropType<Disabled>,
    default: false
  },
  modelValue: {
    type: String as PropType<State>,
    default: ''
  },
  size: {
    type: Number as PropType<number>,
    default: 16
  },
  label: {
    type: String,
    default: ''
  },
  margin: {
    type: Number,
    default: 36
  },
  middelMargin: {
    type: Number,
    default: 8
  },
} as const

const Radio = defineComponent({
  name: "Radio",
  props: CheckboxProps,
  emits: ['click', 'input', 'change', 'update:modelValue'],
  setup(props, { slots, attrs, emit }) {

    return () => {
      // const RadioGroupValue: any = inject('RadioGroupValue')?.value

      const style: StyleValue & any = {
        "--size": `${props.size}px`,
        "--margin": `${props.margin}px`,
        '--middelMargin': `${props.middelMargin}px`
      }

      const onClick = (event: Event) => {

        if (props.disabled) {
          event.preventDefault()
          return
        }
        // if (RadioGroupValue) {
        //   emit('click', event)
        //   emit('input', event)
        //   emit('change', event)
        //   emit('update:modelValue', props.label)
        // } else {
        emit('click', event)
        emit('input', event)
        emit('change', event)
        emit('update:modelValue', props.modelValue === State.checked ? State.uncheck : State.checked)
        // }
      }

      // 获取最上级的Class
      const classNames = ['m-radio']
      classNames.push('font-gray')

      // 添加边框
      const CheckboxProps = {
        ...attrs,
        onClick,
        style: style,
        class: classNames,
      }

      if (props.disabled) CheckboxProps['disabled'] = true

      // 添加checkbox 的状态和类型
      let checkedClass = ''
      // if (RadioGroupValue) {
      //   checkedClass = RadioGroupValue === props.label ? State.checked : State.uncheck
      // } else {
      //   checkedClass = props.modelValue
      // }

      const checkboxClass = ['radio', props.modelValue || State.uncheck, 'border-gray', 'bg-gray']

      return (
        <div {...CheckboxProps}>
          <span class={checkboxClass} data-txt={slots.default?.()[0].children || props.label}>
            <span class="icon bg-blue"></span>
          </span>
          <span>{slots.default?.() || props.label}</span>
        </div>
      )
    }
  }
})
export default Radio