/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: wangyongcun
 * @LastEditTime: 2022-01-20 10:51:27
 * @Description: 头像 Avatar
 */
import { h, computed, defineComponent, PropType } from "vue";
import avatarDefault from "../../../static/img/avatar_humen_default.png";
import MIcon from "../../icon";
import { isNumber } from "lodash";
import color from "../../utils/color";
const avatarProps = {
  type: {
    type: String as PropType<"image" | "logo" | "text">,
    default: "image",
  },
  iconName: String,
  src: {
    type: String,
    default: avatarDefault,
  },
  radius: String,
  fontSize: {
    type: Number,
    default: 14,
  },
  color: {
    type: String,
    default: "#8d9399",
  },
  bgColor: {
    type: String,
    default: "#eff0f1",
  },
  size: {
    type: [String, Number] as PropType<number | "small" | "medium" | "large">,
    default: "medium",
  },
  fit: {
    type: String as PropType<
      "fill" | "contain" | "cover" | "none" | "scale-down"
    >,
    default: "fill",
  },
  onError: Function as PropType<(e: Event) => void>,
} as const;

const Avatar = defineComponent({
  name: "Avatar",
  props: avatarProps,
  setup(props, { slots }) {
    const classVars = "m-avatar";
    const styleVars = computed(() => {
      let { size, radius, color, bgColor, fontSize, fit } = props;
      // 只取4的倍数
      if (isNumber(size)) {
        size = size - (size % 4);
      }
      let height: string;
      if (typeof size === "number") {
        height = `${size}`;
      } else {
        height = `var(--size-${size})`;
      }
      return {
        "--border-radius": radius || "100%",
        "--size": height,
        "--color": color,
        "--bgColor": bgColor,
        "--fontSize": fontSize,
        "--fit": fit,
      };
    });

    let { src, onError, type, iconName } = props;

    src = src || avatarDefault;
    let content: JSX.Element;
    if (type === "image") {
      content = <img src={src} onError={onError}></img>;
    } else if (type === "logo") {
      content = <MIcon type={iconName} />;
    } else if (slots.default) {
      content = (
        <span
          class="text"
          style={{ "--size": styleVars.value["--size"] } as any}
        >
          {slots.default()}
        </span>
      );
    } else {
      content = <div>示例</div>;
    }

    return () => (
      <span class={classVars} style={styleVars.value as any}>
        {content}
      </span>
    );
  },
});

export default Avatar;
