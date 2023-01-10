/*
 * @Description: 
 * @Author: Devin
 * @Date: 2022-09-05 17:35:57
 * @LastEditTime: 2022-09-05 17:45:26
 * @LastEditors: Devin
 * @Reference: 
 */
import { defineComponent, SetupContext, toRefs, Transition ,h} from 'vue';
import { fixedOverlayProps, FixedOverlayProps } from './fixed-overlay-types';
import { useFixedOverlay } from './use-fixed-overlay';

export const FixedOverlay = defineComponent({
  name: 'MFixedOverlay',
  inheritAttrs: false,
  props: fixedOverlayProps,
  emits: ['update:modelValue', 'click'],
  setup(props: FixedOverlayProps, ctx: SetupContext) {
    const { modelValue } = toRefs(props);
    const { onClick } = useFixedOverlay(props, ctx);
    return () => (
      
      <Transition name="m-fixed-overlay--fade">
        {modelValue.value && (
          <div class="m-fixed-overlay" {...ctx.attrs} onClick={onClick}>
            {ctx.slots.default?.()}
          </div>
        )}
      </Transition>
    );
  },
});
