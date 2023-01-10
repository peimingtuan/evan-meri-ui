/*
 * @Author: Devin
 * @Date: 2022-07-06 10:09:28
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-04 11:06:43
 */
import { defineComponent, reactive, ref, watchEffect, h } from "vue";
import { beInteger } from "../../../utils/tools";

export default defineComponent({
  name: "m-pagination-jumper",
  props: {
    currentPage: { type: [Number, String], default: 1 },
    pages: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
    tmpString: { type: String, default: "跳至{jumper}页" },
    size: { type: String, default: "small" },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const paramsStr = "{jumper}";
    const jumperValue = ref<number | string>("");
    const jumperText = reactive({ prefix: "", suffix: "" });

    const handleJumperBlur = () => {
      if (props.disabled || jumperValue.value === "") return;

      let val: number = beInteger(jumperValue.value);
      val < 1 && (jumperValue.value = 1);
      val > props.pages && (jumperValue.value = props.pages);
      emit("change", "page", jumperValue.value);
      // jumperValue.value = "";
    };

    watchEffect(() => {
      const str = props.tmpString.split(paramsStr);
      if (str.length > 1) {
        jumperText.prefix = str[0];
        jumperText.suffix = str[1];
      }
    });

    watchEffect(() => {
      jumperValue.value = props.currentPage;
    });
    return () => (
      <div class="m-page-jumper">
        {jumperText.prefix && <span class="page-text">{jumperText.prefix}</span>}
        <m-input
          value={jumperValue.value}
          size={props.size}
          disabled={props.disabled}
          onInput={(e: any) => {
            jumperValue.value = e.target.value;
          }}
          onBlur={() => {
            handleJumperBlur();
          }}
          placeholder=""
        />
        {jumperText.suffix && <span class="page-text">{jumperText.suffix}</span>}
      </div>
    );
  },
});
