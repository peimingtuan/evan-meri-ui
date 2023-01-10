/*
 * @Author: Devin
 * @Date: 2022-06-28 17:38:38
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-29 00:23:55
 */
import { defineComponent, h, HTMLAttributes, PropType } from 'vue';

export default defineComponent({
  props: {
    label: String,
    key: String,
    disabled: Boolean,
    props: Object as PropType<HTMLAttributes>,
    active: String,
    value: String,
    showDropdown: Boolean,
    slotName: String
  },
  emits: ['select'],
  setup(props, { emit }) {
    const handleClick = () => {
      !props.disabled && emit('select', props.value);
    };
    return {
      handleClick
    };
  },
  render() {
    return (
      <div
        class={['m-dropdown-item m-ellipsis', this.disabled ? 'disabled' : '']}
        onClick={this.handleClick}
        v-ellipsis={{ time: 500 }}
      >
        {this.slotName ? this.$slots[this.slotName]?.(this.$props) : this.label}
      </div>
    );
  }
});
