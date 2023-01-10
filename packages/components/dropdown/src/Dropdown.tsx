/*
 * @Author: Devin
 * @Date: 2022-06-28 17:38:25
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-08 17:01:44
 */
import { computed, defineComponent, Fragment, h, ref } from 'vue';
import Popover from '../../popover';
import { resolveWrappedSlot } from '../../utils/resolve-slot';
import DropdownMenu from './DropdownMenu';
import props, { OptionType } from './props';
import { IconMeriComponentArrowDown } from 'meri-icon';

export default defineComponent({
  name: 'Dropdown',
  props,
  inheritAttrs: false,
  emits: ['show', 'close', 'btnClick', 'update:search', 'update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    // 下拉菜单的props
    const menuProps: any = computed(() => {
      return {
        ...props,
        options: props.options,
        onSelect: onSelect
      };
    });
    // 下拉菜单的显示隐藏状态
    const showDropdown = ref<boolean>(false);
    // 激活的每项
    const activeItem = ref('');
    // 弹框的实例
    const Popover = ref<HTMLElement | any>(null);
    // 按钮点击事件
    const btnClick = (event: MouseEvent) => {
      event?.stopPropagation();
      emit('btnClick');
    };
    // 显示弹框的返回方法
    const show = () => {
      showDropdown.value = true;
      emit('show');
      updateValue(true);
    };
    // 隐藏弹框的返回方法
    const hide = () => {
      showDropdown.value = false;
      emit('close');
      updateValue(false);
    };
    const updateValue = (data: boolean) => {
      if (props.trigger === 'manually') {
        emit('update:modelValue', data);
      }
    };
    // 激活的事件
    const onSelect = (data: string, option: OptionType) => {
      activeItem.value = data;
      Popover.value.manuallyHide();
      emit('change', data, option);
    };
    // 按钮是否移入鼠标的状态标识
    const isHover = ref<boolean>(false);
    // icon的属性值
    const iconAttrs = computed(() => {
      return {
        color: showDropdown.value ? 'var(--primary-color)' : isHover.value ? 'var(--primary-color)' : 'var(--gray-400)'
      };
    });
    // 更新搜索字段
    const updateSearch = (data: string) => {
      // 更新弹框位置
      Popover.value.popoverRef.updatePosition().then(() => {
        emit('update:search', data);
      });
    };

    return {
      menuProps,
      showDropdown,
      show,
      hide,
      activeItem,
      Popover,
      btnClick,
      iconAttrs,
      isHover,
      updateSearch
    };
  },
  render() {
    const arrow = () => {
      return (
        <div class="m-dropdown-arrow">
          <IconMeriComponentArrowDown {...this.iconAttrs}></IconMeriComponentArrowDown>
        </div>
      );
    };
    const text = () => {
      return (
        <>
          <div class="m-dropdown-text">{this.text}</div>
          {arrow()}
        </>
      );
    };
    const button = () => {
      return (
        <>
          <button class="m-dropdown-button m-button" onClick={this.btnClick}>
            {this.text}
          </button>
          <button class="m-dropdown-button m-button">{arrow()}</button>
        </>
      );
    };
    const content = this.type === 'text' ? text() : button();
    const tirggerAttrs = {
      ...this.$attrs,
      class: ['m-dropdown', this.showDropdown ? 'open' : ''],
      onMouseenter: () => {
        this.isHover = true;
      },
      onMouseleave: () => {
        this.isHover = false;
      }
    };
    return (
      <Popover
        ref="Popover"
        trigger={this.trigger}
        isOpen={this.modelValue}
        placement={this.placement}
        mouse-enter-delay={this.mouseEnterDelay}
        mouse-leave-delay={this.mouseLeaveDelay}
        disabled={this.disabled}
        show-arrow={this.showArrow}
        offset={this.offset}
        class={['d-popover__dropdown']}
        onShow={this.show}
        onHide={this.hide}
        transition="m-select-zoom"
        display-directive="if"
        {...this.$attrs}
      >
        {{
          content: () => (
            <DropdownMenu
              {...this.menuProps}
              showDropdown={this.showDropdown}
              activeItem={this.activeItem}
              onUpdateSearch={this.updateSearch}
              search={this.search}
            >
              {{
                ...this.$slots
              }}
            </DropdownMenu>
          ),
          default: () => (
            <div {...tirggerAttrs}>{resolveWrappedSlot(this.$slots.default, (children) => children) || content}</div>
          )
        }}
      </Popover>
    );
  }
});
