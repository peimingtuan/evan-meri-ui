/*
 * @Author: Devin
 * @Date: 2022-07-07 15:55:49
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-14 20:12:02
 */
import { defineComponent, PropType, ref, watchEffect,h } from "vue";

export default defineComponent({
  name: "m-page-totalPages",
  props: {
    value: { type: [Number, String] as PropType<string>, default: 0 },
    tmpString: { type: String, default: "" },
  },
  setup(props) {
    const paramsStr = "{totalPages}";
    const text = ref("");
    watchEffect(() => {
      text.value = props.tmpString.replace(paramsStr, props.value);
    });
    return {
      text,
    };
  },
  render() {
    return (
      <div class="m-page-totalPages">
        <p class="page-text">{this.text}</p>
      </div>
    );
  },
});
