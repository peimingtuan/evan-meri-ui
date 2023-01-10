/*
 * @Description: 
 * @Author: Devin
 * @Date: 2022-09-05 17:35:57
 * @LastEditTime: 2022-09-06 17:20:29
 * @LastEditors: Devin
 * @Reference: 
 */
import { defineComponent, toRefs, ref, Teleport, Transition, watch, provide, withModifiers,h,Fragment } from 'vue';
import { FlexibleOverlay } from '../../overlay';
import { PopperTrigger } from './popper-trigger';
import { Placement, popoverProps, PopoverProps } from './popover-types';
import { POPPER_TRIGGER_TOKEN } from './popper-trigger/src/popper-trigger-types';
import { usePopover, usePopoverEvent } from './use-popover';

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  emits: ['show', 'hide'],
  setup(props: PopoverProps, { slots, attrs, emit, expose }) {
    const { content, offset, showAnimation } = toRefs(props);
    // 定义
    const origin = ref<HTMLElement>();
    const popoverRef = ref<HTMLElement>();
    const visible = ref(false);
    const { placement, handlePositionChange, onMouseenter, onMouseleave, manuallyHide } = usePopoverEvent(
      props,
      visible,
      origin
    );

    const { overlayStyles, popoverClass } = usePopover(props, visible, placement as any, origin, popoverRef);
    expose({ manuallyHide, popoverRef });
    // 将ortgin放到PopperTrigger组件进行赋值
    provide(POPPER_TRIGGER_TOKEN, origin);
    watch(visible, (newVal) => {
      newVal ? emit('show') : emit('hide');
    });

    const flexFun = {
      onClick: props.trigger === 'manually' ? null : withModifiers(() => ({}), ['stop']),
      onPositionChange: handlePositionChange,
      onPointerup: withModifiers(() => ({}), ['stop']),
      onMouseenter: props.trigger === 'manually' ? null : onMouseenter,
      onMouseleave: props.trigger === 'manually' ? null : onMouseleave
    };
    return () => (
      <>
        <PopperTrigger>{slots.default?.()}</PopperTrigger>
        <Teleport to="body">
          <Transition name={showAnimation.value ? props.transition || `m-popover--fade-${placement}` : ''}>
            <FlexibleOverlay
              v-model={visible.value}
              ref={popoverRef}
              origin={origin.value}
              placement={placement as any}
              offset={offset.value}
              class={popoverClass}
              is-arrow-center={false}
              style={overlayStyles.value}
              showArrow={props.showArrow}
              {...attrs}
              {...flexFun}
            >
              {slots.content?.() || <span>{content.value}</span>}
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </>
    );
  }
});
