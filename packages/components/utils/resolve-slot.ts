/*
 * @Author: Devin
 * @Date: 2022-06-10 15:01:06
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-11 17:03:30
 */
import {
  Fragment,
  isVNode,
  Slot,
  Comment,
  VNodeArrayChildren,
  VNodeChild,
} from "vue";

function ensureValidVNode(
  vnodes: VNodeArrayChildren
): VNodeArrayChildren | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    ) {
      return false;
    }
    return true;
  })
    ? vnodes
    : null;
}

export function resolveSlot(
  slot: Slot | undefined,
  fallback: () => VNodeArrayChildren
): VNodeArrayChildren {
  return (slot && ensureValidVNode(slot())) || fallback();
}

export function resolveSlotWithProps<T>(
  slot: Slot | undefined,
  props: T,
  fallback: (props: T) => VNodeArrayChildren
): VNodeArrayChildren {
  return (slot && ensureValidVNode(slot(props))) || fallback(props);
}

/**
 * 如果内容存在，则使用包装器解析插槽，无回退
 */
export function resolveWrappedSlot(
  slot: Slot | undefined,
  wrapper: (children: VNodeArrayChildren | null) => VNodeChild
): VNodeChild {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}

export function isSlotEmpty(slot: Slot | undefined): boolean {
  return !(slot && ensureValidVNode(slot()));
}
