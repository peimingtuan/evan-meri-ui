import { withInstall, SFCWithInstall } from '../utils/with-intall'
import FormItem from './src/FormItem'
export const MFormItem: SFCWithInstall<typeof FormItem> = withInstall(FormItem)
export default MFormItem;

export * from './src/FormItem'