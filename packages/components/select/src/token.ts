import type { InjectionKey } from 'vue'

interface SelectGroupContext {
	disabled: boolean
}
export type ItemType = {
	id: string | number
	name: string
	disabled?: boolean
	html?: string
	showName?: string
}

export interface SelectContext {
	props: {
		multiple?: boolean
		multipleLimit?: number
		modelValue?: string | number | unknown | unknown[]
	}
	searchVal: string
	getSelectIds: string | (string | number)[]
	getSelectIdsArray: (string | number)[]
	optionsArray: ItemType[]
	getSearchOptions: ItemType[]
	handleClickItem(event: MouseEvent, el: ItemType): void
	handleCheckBoxClick(event: MouseEvent, el: ItemType): void
	setCacheOptions(el: ItemType): void
	removeCacheOptions(el: ItemType): void
}

// For individual build sharing injection key, we had to make `Symbol` to string
export const selectGroupKey = 'MSelectGroup' as unknown as InjectionKey<SelectGroupContext>

export const selectKey = 'MSelect' as unknown as InjectionKey<SelectContext>
