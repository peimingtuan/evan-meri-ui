import { defineComponent, h, ref, computed, watch, reactive, Teleport, Transition, onMounted, nextTick, Ref } from 'vue';
import { templateRef, onClickOutside, useMouseInElement, useElementSize } from '@vueuse/core'
import { IconMeriActionSearch, IconMeriComponentCancel } from "meri-icon";
import searchProps, { SearchType } from './searchProps'
import { usePopupStyle } from '../../select/src/usePopupStyle'
import { debounce, escapeRegExp, isArray } from 'lodash';


const Search = defineComponent({
  name: 'Search',
  props: searchProps,
  emits: ['change', 'focus', 'blur', 'select'],
  components: { IconMeriActionSearch, IconMeriComponentCancel },
  setup(props, { slots, attrs, emit }) {
    // 计算文本长度用
    let canvasEl = document.createElement('canvas')
    let ctx = canvasEl.getContext('2d')

    const inputRef = templateRef<HTMLElement>('input', null)
    const containerRef = templateRef<HTMLElement>('container', null)
    const popupRef = templateRef<HTMLElement>('popup', null)

    const containerClassNames = ref(new Set(['m-search']))
    // 输入框值
    const modelValue = ref(props.defaultValue || '')
    // 下拉选项
    const suggestions = ref<Record<string, any>[]>([])
    // 前置省略号
    const showEllipsis = ref(false)
    // 外框大小
    const containerStyles = reactive({
      width: '',
      height: ''
    })
    // 省略号背景
    const ellipsisStyles = reactive({ background: '#fff' })
    // 展开选项
    const openPopup = ref(false)
    // 失焦状态下，显示清空icon
    const { isOutside } = useMouseInElement(containerRef)

    // 显示清空icon
    const hasClear = computed(() => {
      const hasValue = !!modelValue.value?.length && props.clearable
      const hasFocus = containerClassNames.value.has('focus')
      return hasValue && (hasFocus || !isOutside.value)
    })
    if (!props.border) containerClassNames.value.add('m-search-no-border')
    if (props.disabled) containerClassNames.value.add('disabled')

    const normalizeAttr = (attr: string | number) => {
      return `${attr}`.includes('px') ? `${attr}` : `${attr}px`
    }
    if (props.defaultWidth) {
      containerStyles.width = normalizeAttr(props.defaultWidth)
    }
    // width 替代 defaultWidth
    if (props.width) {
      containerStyles.width = normalizeAttr(props.width)
    }
    if (props.height) {
      containerStyles.height = normalizeAttr(props.height)
    }
    /**
     * 获取元素css
    */
    const getElStyles = (el: Ref<HTMLElement>, prop?: string) => {
      if (!el) return {}
      return prop ? window.getComputedStyle(el.value, null)[prop] : window.getComputedStyle(el.value, null)
    }
    /**
     * 计算文字长度
    */
    const calcWordLength = (word: string, el: Ref<HTMLElement>, fn: (w: number) => void) => {
      const { fontSize, fontFamily } = getElStyles(el)
      if (ctx) {
        ctx.font = `${fontSize} ${fontFamily}`
        let width = ctx.measureText(word).width
        fn(width)
      }
    }
    /**
     * 计算显示省略号
    */
    const setEllipsis = () => {
      if (!props.width || props.border) return
      const contWidth = parseInt(props.width + '') - 66
      calcWordLength(modelValue.value, inputRef, (width: number) => {
        showEllipsis.value = width > contWidth
        nextTick().then(() => { ellipsisStyles.background = getElStyles(inputRef, 'backgroundColor') })
      })
    }
    /**
     * 自动扩宽input宽度
    */
    const autoContainerWidth = () => {
      if (props.border || props.width) return
      calcWordLength(modelValue.value, inputRef, (width) => {
        if ((width + 74) > 200) {
          containerStyles.width = `${width + 74}px`
        } else {
          containerStyles.width = ''
        }
      })
    }

    /**
     * 获取输入建议
     */
    const getSuggestions = () => {
      props.fetchSuggestions?.(modelValue.value, (data: any) => {
        if (isArray(data)) {
          suggestions.value = data
          nextTick().then(() => {
            openPopup.value = true
          })
        } else {
          console.error('search suggestions must be an object array');
        }
      })
    }
    /**
     * 高亮选中的字体
     */
    const normalizeListItem = (item: Record<string, any>) => {
      const keyword = modelValue.value.trim()
      if (keyword === '') {
        return item[props.label]
      }
      const Reg = new RegExp(escapeRegExp(keyword), 'gi')
      return item[props.label].replace(Reg, `<span style="color:var(--primary-color)">$&</span>`)
    }

    watch(modelValue, () => {
      setEllipsis()
      autoContainerWidth()
      // TODO:什么时候显示建议
      // openPopup.value = !!suggestions.value.length && !!modelValue.value?.length && !props.triggerOnFocus
    })
    // input 事件监听
    const onInput = debounce((ev: Event) => {
      const val = (ev.target as any).value
      modelValue.value = val
      if (props.type === SearchType.REAL) {
        emit('change', modelValue.value)
      }
      getSuggestions()
    }, 50)
    const onFocus = (ev: Event) => {
      containerClassNames.value.add('focus')
      emit('focus', ev)
      setEllipsis()
      if (props.triggerOnFocus || modelValue.value) {
        getSuggestions()
      }
    }
    const onBlur = (ev: Event) => {
      containerClassNames.value.delete('focus')
      emit('blur', ev)
      setEllipsis()
    }
    const onKeyup = (ev: KeyboardEvent) => {
      if (ev.keyCode === 13 && props.type === SearchType.ENTER) {
        emit('change', modelValue.value)
      }
    }
    // input 输入框属性
    const inputAttrs = {
      placeholder: props.placeholder,
      onInput,
      onKeyup,
      onFocus,
      onBlur,
    }
    // 清空
    const clearInp = () => {
      modelValue.value = ''
      getSuggestions()
      inputRef.value.focus()
      if (props.type === SearchType.REAL) {
        emit('change', modelValue.value)
      }
    }
    // 点击建议项
    const onClickSuggest = (item: any) => {
      modelValue.value = item[props.label]
      openPopup.value = false
      emit('select', item)
    }
    // 关闭下拉
    onClickOutside(containerRef, () => {
      openPopup.value = false
    }, { ignore: [popupRef] })

    const { windowStyle } = usePopupStyle(containerRef, { topOffset: 10, align: props.placement })
    const { width: popupWidth } = useElementSize(containerRef)

    onMounted(() => {
      if (props.immediate) {
        emit('change', modelValue.value)
      }
    })

    const render = () => {
      const input = <input ref="input" type="text" value={modelValue.value} {...inputAttrs} />

      const searchIcon = <span class={'m-search-icon search'}><IconMeriActionSearch size={16} /></span>

      const ellipsis = showEllipsis.value ? <span class={'m-search-ellipsis'} style={ellipsisStyles}>...</span> : null

      const clearIcon = hasClear.value ? <span class={'m-search-icon clear'} onClick={clearInp}><IconMeriComponentCancel size={16} hoverColor={`var(--blue-500)`} /></span> : null

      const suggestion = (item: any) => {
        return slots.default
          ? <li class={'m-search-suggestion-item'} onClick={() => onClickSuggest(item)}>{slots.default({ ...item, [props.label]: normalizeListItem(item) })}</li>
          : <li class={'m-search-suggestion-item'} onClick={() => onClickSuggest(item)} innerHTML={normalizeListItem(item)} />
      }

      const popup = props.fetchSuggestions ? (
        <Teleport to="body">
          <div style={{ ...windowStyle, width: `${popupWidth.value + 2}px` }}>
            <Transition name="zoom-in-top">
              {openPopup.value ? (
                <div ref="popup" class="m-search-suggestion">
                  <ul class="m-search-suggestion-wrap" data-empty={!suggestions.value.length}>
                    {...suggestions.value.map(suggestion)}
                  </ul>
                </div>
              ) : null}
            </Transition>
          </div>
        </Teleport>
      ) : null

      return (
        <div ref="container" class={Array.from(containerClassNames.value)} style={containerStyles}>
          {searchIcon}
          {input}
          {ellipsis}
          {clearIcon}
          {popup}
        </div>
      )
    }
    return { render }

  },
  render() {
    return this.render()
  }
})

export default Search
