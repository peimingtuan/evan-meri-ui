/*
 * @Author: Devin
 * @Date: 2022-06-28 17:53:11
 * @LastEditors: Devin
 * @LastEditTime: 2022-11-14 10:39:58
 */
import { computed, defineComponent, h, PropType, ref, watch, Fragment } from 'vue'
import { resolveWrappedSlot } from '../../utils/resolve-slot'
import DropdownDivider from './DropdownDivider'
import DropdownItem from './DropdownItem'
import MInput from '../../input'
import { OptionType } from './props'
import Scorllbar from '../../scrollbar'
export default defineComponent({
	props: {
		options: {
			type: Array as PropType<OptionType[]>,
			default: () => []
		},
		onSelect: {
			type: Function
		},
		showDropdown: Boolean,
		activeItem: String,
		emptyText: String,
		showSearch: Boolean,
		search: {
			type: [String, Number],
			default: ''
		}
	},
	emits: ['select', 'active', 'updateSearch'],
	components: { MInput },
	setup(props, { emit, slots }) {
		const active: any = ref<string | undefined>(props.activeItem)
		const search = ref<string | number>(props.search)
		watch(active, () => {
			emit(
				'select',
				active.value,
				props.options.find((item: OptionType) => {
					return item.key === active.value
				})
			)
		})
		const searchFun = computed(() => {
			return (label: string) => {
				if (search.value) {
					return label.indexOf(search.value + '') !== -1
				} else {
					return true
				}
			}
		})
		const optionList = computed(() => {
			let list = props.options.filter((item: any) => {
				return searchFun.value(item.label) && !item.type
			})
			return list
		})
		return { active, search, searchFun, optionList }
	},
	render() {
		return (
			<>
				{this.showSearch ? (
					<div class="m-dropdown-input">
						<m-input
							value={this.search}
							onInput={(value: string) => {
								this.search = value
								this.$emit('updateSearch', this.search)
							}}
							prefix-icon="IconMeriActionSearch"
							style="width:100%"
						></m-input>
					</div>
				) : null}

				<div class="m-dropdown-menu">
					{this.optionList.length !== 0 ? (
						<Scorllbar scrollClass="m-dropdown-menu_warp">
							{this.options.map((dropdownitem: any) => {
								const classItem = {
									'is-active': this.active === dropdownitem.key,
									'm-dropdown__search': !this.searchFun(dropdownitem.label)
								}
								if (dropdownitem.type === 'divider') {
									return (
										<DropdownDivider
											{...dropdownitem}
											class={{ ['m-dropdown__search']: this.search }}
										></DropdownDivider>
									)
								} else {
									return (
										<DropdownItem
											{...dropdownitem}
											value={dropdownitem.key}
											class={classItem}
											onSelect={active => (this.active = active)}
											showDropdown={this.showDropdown}
										>
											{{
												...this.$slots
											}}
										</DropdownItem>
									)
								}
							})}
						</Scorllbar>
					) : (
						resolveWrappedSlot(this.$slots.empty, empty => empty) || (
							<div class="m-dropdown-empty">{this.emptyText}</div>
						)
					)}
				</div>
			</>
		)
	}
})
