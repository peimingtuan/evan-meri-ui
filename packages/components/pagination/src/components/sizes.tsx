import { defineComponent, onMounted, ref, watch, watchEffect,h } from 'vue';

export default defineComponent({
  name: 'm-pagination-size',
  props: {
    currentPageSize: { type: [String, Number], default: 10 },
    disabled: { type: Boolean, default: false },
    pageSize: { type: [Number, String], default: () => 10 },
    sizesList: { type: Array, default: () => [10, 20, 50, 100] },
    tmpString: { type: String, default: '' }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const paramsStr = '{value}';

    const sizeValue = ref(props.currentPageSize);
    const sizeList = ref<any>([]);
    
    watch(
      () => sizeValue.value,
      (val) => emit('change', val)
    );
    watchEffect(() => {
      let arr: any[] = [];
      for (let i = 0; i < props.sizesList.length; i++) {
        const value: any = props.sizesList[i];
        arr.push({ name: `${props.tmpString.replace(paramsStr, value)}`, id: value });
      }
      sizeList.value = arr;
    });
		onMounted(()=>{
			// sizeValue.value = props.currentPageSize;
		})
    return { sizeList, sizeValue };
  },
  render() {
    return (
      <div class="m-page-sizes">
        <m-select
          v-model={this.sizeValue}
          disabled={this.disabled}
          options={this.sizeList}
          menuSize={120}
          size={102}
        ></m-select>
      </div>
    );
  }
});
