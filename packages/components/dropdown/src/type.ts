/*
 * @Author: Devin
 * @Date: 2022-06-29 16:01:57
 * @LastEditors: Devin
 * @LastEditTime: 2022-06-29 16:05:00
 */
import { HTMLAttributes, VNodeChild } from "vue";

export interface DropdownOption {
  icon?: () => VNodeChild;
  key: string | number;
  label: string | (() => VNodeChild);
  disabled: boolean;
  props: HTMLAttributes;
  children?: Array<DropdownOption>;
  type: "divider";
}
