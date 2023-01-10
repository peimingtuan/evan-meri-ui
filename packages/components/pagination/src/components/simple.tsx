import { defineComponent,h } from "vue";
import Jumper from "./jumper";
export default defineComponent({
  name: "m-paginoation-simple",
  props: {
    currentPage: { type: [Number, String], default: 1 },
    pages: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const change = (type: string, val: number | string) => {
      emit("change", type, Number(val));
    };
    return () => (
      <div class="m-page-simple">
        <Jumper
          size="mini"
          pages={props.pages}
          currentPage={props.currentPage}
          disabled={props.disabled}
          tmpString="{jumper}"
          onChange={change}
        ></Jumper>
        <li class="m-page-item simple-separator">/</li>
        <li class="m-page-item">{props.pages}</li>
      </div>
    );
  },
});
