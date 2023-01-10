import { computed, defineComponent, h, ref } from "vue";

export default defineComponent({
  name: "more",
  props: {
    type: Number,
  },
  setup(props) {
    const isHover = ref(false);
    const mouseenterHandler = () => {
      isHover.value = true;
    };
    const mouseleaveHandler = () => {
      isHover.value = false;
    };
    const classes = computed(() => {
      const leftorright =
        props.type === 0 ? "m-zuo IconOpen" : "m-you IconOpen";
      return [
        "ri-more-fill",
        "m-icon",
        isHover.value ? leftorright : "IconMore more",
      ];
    });
    return {
      isHover,
      mouseenterHandler,
      classes,
      mouseleaveHandler,
    };
  },
  render() {
    return (
      <i
        onMouseenter={this.mouseenterHandler}
        onMouseleave={this.mouseleaveHandler}
        class={this.classes}
      ></i>
    );
  },
});
