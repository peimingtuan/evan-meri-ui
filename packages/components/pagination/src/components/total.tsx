import { defineComponent, PropType, ref, watchEffect,h } from "vue";
export default defineComponent({
  name: "m-pagination-total",
  props: {
    value: { type: [Number, String] as PropType<string>, default: 0 },
    tmpString: { type: String, default: "" },
  },
  setup(props) {
    const paramsStr = "{total}";
    const text = ref("");

    watchEffect(() => {
      text.value = props.tmpString.replace(paramsStr, props.value);
    });
    return () => (
      <div class="m-page-total">
        <p class="page-text">{text.value}</p>
      </div>
    );
  },
});
