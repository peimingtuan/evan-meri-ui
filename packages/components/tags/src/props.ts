/*
 * @Author: Devin
 * @Date: 2022-05-10 11:08:57
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-28 11:38:28
 */
import { PropType } from 'vue';

export type MaybeArray<T> = T | T[];
export type TagType = 'processing' | 'canceled' | 'completed' | 'rejected' | 'error' | 'dot';
export type TagSize = 'small' | 'medium' | 'large';
export const commonProps = {
  color: {
    type: String
  },
  bgColor: { type: String },
  size: {
    type: String as PropType<TagSize>,
    default: 'small'
  },
  type: {
    type: String as PropType<TagType>,
    default: ''
  },
  dot: Boolean,
  hasIcon: { type: Boolean, default: true },
  icon: String,
  onClose: [Array, Function] as PropType<MaybeArray<(e: MouseEvent) => void>>
};
