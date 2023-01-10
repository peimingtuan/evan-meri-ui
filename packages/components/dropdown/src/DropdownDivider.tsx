/*
 * @Author: Devin
 * @Date: 2022-06-29 16:07:58
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-14 18:54:50
 */
import { h, defineComponent, Fragment } from "vue";

export default defineComponent({
  name: "DropdownDivider",
  render() {
    const left = () => {
      return this.$attrs.divider ? <div class="m-dropdown-divider-left"></div> : null;
    };
    const text = () => {
      return (
        <span class={["m-dropdown-divider-text", this.$attrs.divider ? "divider-center" : "divider-left"]}>
          {this.$attrs.label}
        </span>
      );
    };
    const right = () => {
      return this.$attrs.divider ? <span class="m-dropdown-divider-right"></span> : null;
    };
    const content = () => {
      return this.$attrs.label ? (
        <>
          {left()}
          {text()}
          {right()}
        </>
      ) : (
        <div class="m-dropdown-divider-line"></div>
      );
    };

    return (
      <div class={[`m-dropdown-divider`, this.$attrs.label ? "m-dropdown-divider-text" : "m-dropdown-divider-notext"]}>
        {content()}
      </div>
    );
  },
});
