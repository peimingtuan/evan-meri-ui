/*
 * @Author: Devin
 * @Date: 2022-07-05 16:11:48
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-04 11:00:51
 */
import { upperFirst } from 'lodash';
import { computed, defineComponent, h } from 'vue';
import { usePagination } from './pagination-tool';
import props from './Props';

export default defineComponent({
  name: 'Pagination',
  props,
  emits: ['page-change', 'size-change'],
  setup(props, { emit }) {
    const { componentsList, hidePagination } = usePagination(props, emit);
    const className = computed(() => {
      const name = [
        'm-page-container',
        { disabled: props.disabled },
        { 'container-background': props.background && !props.simple },
        { 'container-simple': props.simple }
      ];
      return name;
    });
    const cssVars = computed(() => {
      const activeColor = props.disabled ? 'var(--gray-400)' : 'var(--primary-color)';
      return {
        '--pagination-size': props.background ? '28px' : '24px',
        '--pagination-text-size': '14px',
        '--pagination-active': activeColor,
        '--pagination-border-active': activeColor,
        '--pagination-bg-active': props.disabled ? 'var(--gray-300)' : 'var(--blue-100)',
        '--pagination-text-color': props.disabled ? 'var(--disable-text-color)' : 'var(--gray-500)',
        '--pagination-icon-color': 'var(--gray-500)',
        '--pagination-nobg-disabled-active': 'var(--disable-bg-color)',
        '--pagination-border-color': props.disabled ? 'var(--gray-300)' : 'var(--border-color)',
        '--pagination-disabled-icon-color': 'var(--gray-400)',
        '--pagination-disabled-bg-icon-color': 'var(--gray-400)',
        '--pagination-disabled-bg-color': 'var(--gray-200)',
        '--pagination-nobg-color-hover': 'var(--gray-100)'
      };
    });
    return { componentsList, hidePagination, className, cssVars };
  },
  render() {
    if (this.hidePagination) {
    }
    return (
      <div
        class="m-pagination"
        style={{
          display: this.hidePagination ? 'none' : 'flex',
          ...this.cssVars
        }}
      >
        <ul class={this.className}>
          {this.componentsList.map((item: any) => {
            let event = {};
            if (item.event) {
              event = {
                ['on' + upperFirst(item.event)]: item.eventName
              };
            }
            return h(item.component, {
              disabled: this.disabled,
              ...item.bind,
              ...event
            });
          })}
        </ul>
      </div>
    );
  }
});
