/*
 * @Author: Devin
 * @Date: 2022-07-06 10:09:28
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-29 16:24:41
 */
import { computed, defineComponent, h, ref, watch } from 'vue';

import { IconMeriComponentArrowLeft } from 'meri-icon';
export default defineComponent({
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    background: { type: Boolean, default: false }
  },
  name: 'm-pagination-prev',
  emits: ['click'],
  setup(props, { emit }) {
    const className = computed(() => {
      let name = ['m-page-item', 'm-prev-page', { 'page-item-disabled': props.disabled }];
      return name;
    });

    const onClick = () => {
      if (props.disabled) return;
      emit('click', 'prev');
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
          <IconMeriComponentArrowLeft
            color={
              props.disabled
                ? props.background
                  ? 'var(--pagination-disabled-bg-icon-color)'
                  : 'var(--pagination-disabled-icon-color)'
                : color.value
            }
          />
        )}
      </li>
    );
  }
});
