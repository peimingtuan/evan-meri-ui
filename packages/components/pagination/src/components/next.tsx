/*
 * @Author: Devin
 * @Date: 2022-07-06 10:09:28
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-29 16:24:17
 */
import { defineComponent, computed, h, ref } from 'vue';
import { IconMeriComponentArrowRight } from 'meri-icon';
export default defineComponent({
  name: 'm-pagination-next',
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    background: { type: Boolean, default: false }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const className = computed(() => {
      let name = ['m-page-item', 'm-next-page', { 'page-item-disabled': props.disabled }];
      return name;
    });

    const onClick = () => {
      if (props.disabled) return;
      emit('click', 'next');
    };
    const color = ref<string>('var(--pagination-text-color)');
    return () => (
      <li
        class={className.value}
        onClick={onClick}
        onMouseenter={() => {
          color.value = 'var(--pagination-active)';
        }}
        onMouseleave={() => {
          color.value = 'var(--pagination-text-color)';
        }}
      >
        {props.text ? (
          <span class="page-text">{props.text}</span>
        ) : (
          <IconMeriComponentArrowRight
            color={
              props.disabled
                ? props.background
                  ? 'var(--pagination-disabled-bg-icon-color)'
                  : 'var(--pagination-disabled-icon-color)'
                : color.value
            }
          ></IconMeriComponentArrowRight>
        )}
      </li>
    );
  }
});
