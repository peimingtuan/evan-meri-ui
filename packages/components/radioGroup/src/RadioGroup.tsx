import { defineComponent, h, PropType, provide, ref } from 'vue'
import { Disabled } from '../../utils/types'
const CheckboxProps = {
  // 禁用
  disabled: {
      type: Boolean as PropType<Disabled>,
      default: false
  },
  modelValue: {
      type: String,
      default: ''
  },
  size: {
      type: Number as PropType<number>,
      default: 16
  }
} as const

const RadioGroup = defineComponent({
  name: 'RadioGroup',
  props: CheckboxProps,
  emits: ['click', 'input', 'change', 'update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const RadioGroupValue = ref(props.modelValue)

    provide ('RadioGroupValue', RadioGroupValue)
    const onClick = (event: any) => {
      
      if (props.disabled) {
        event.preventDefault()
        return
      }
      emit('click', event)
      emit('input', event)
      emit('change', event)
      
      if (event.target.innerText) {
        emit('update:modelValue', event.target.innerText)
        RadioGroupValue.value = event.target.innerText
      } else {
        emit('update:modelValue', event.target.dataset.txt)
        RadioGroupValue.value = event.target.dataset.txt
      }

    }
    return () => {

      const CheckboxProps = {
        ...attrs,
        onClick,
        // style: style,
        // class: classNames,
      }

      // const checkboxClass = ['radio', checkedClass, 'border-gray', 'bg-gray']
      return (
        <div {...CheckboxProps}>
          {/* <span class={checkboxClass}>
              <span class="icon bg-blue"></span>
          </span> */}
          {slots.default?.()}
        </div>
      )
    }
  }
})
export default RadioGroup