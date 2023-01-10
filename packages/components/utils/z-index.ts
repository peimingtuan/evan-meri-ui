/*
 * @Author: Devin
 * @Date: 2022-07-11 10:18:52
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-15 10:06:39
 */
import { computed, ref } from "vue";
const zIndex = ref(0);
function useGlobalConfig(key?: string, defaultValue: number | undefined = undefined) {
  const config = ref<number | undefined>(defaultValue);
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}
export const useZIndex = () => {
  const initialZIndex = useGlobalConfig("zIndex", 2000);

  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  };
};
